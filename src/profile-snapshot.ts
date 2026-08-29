/**
 * File-state truth for the local profile transaction (issue #7, slice 1):
 * capture an explicit set of profile files before the first mutation, diff
 * against that capture, and restore byte-equivalent state on failure while
 * preserving the failed state as its own evidence.
 *
 * The primitive knows nothing about DSH semantics on purpose — the caller
 * names the files (profile manifest, lockfile, Cordis overlay, bundle
 * activation state), and this module owns confinement, capture, comparison,
 * and restoration. Gate 7 of the issue's evaluation matrix holds by
 * construction: zero dependencies, no lifecycle scripts, and no process is
 * ever spawned — only node:fs, node:path, and node:crypto are used.
 *
 * @module @sandbaseai/dsh-plugin-store/profile-snapshot
 */

import { createHash, randomUUID } from 'node:crypto'
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs'
import { basename, dirname, isAbsolute, join, relative, resolve } from 'node:path'

export type SnapshotKind = 'capture' | 'evidence'

export interface SnapshotEntry {
  path: string
  state: 'present' | 'absent'
  hash?: string
}

export interface SnapshotRecord {
  id: string
  kind: SnapshotKind
  label: string
  createdAt: string
  root: string
  files: SnapshotEntry[]
}

export interface SnapshotDiff {
  changed: string[]
  added: string[]
  removed: string[]
}

const RESTORE_TEMP_PATTERN = /\.restore-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.tmp$/

// Timestamps only order snapshots; identical millisecond reads are bumped so
// that creation order, and therefore pruning order, stays deterministic.
let lastTimestamp = 0

function nowStamp(): string {
  const current = Date.now()
  lastTimestamp = current > lastTimestamp ? current : lastTimestamp + 1
  return new Date(lastTimestamp).toISOString()
}

/**
 * Normalize one snapshot path: relative to the profile root, no `..`
 * segments, forward-slash separated. Absolute paths and traversal are
 * rejected before any filesystem access.
 */
function normalizeRelativePath(root: string, path: string): string {
  if (path.length === 0) throw new Error('Snapshot paths cannot be empty')
  if (isAbsolute(path)) throw new Error(`Snapshot path must be relative to the profile root: ${path}`)
  const rel = relative(root, resolve(root, path))
  if (rel.length === 0 || rel.startsWith('..') || isAbsolute(rel)) {
    throw new Error(`Snapshot path escapes the profile root: ${path}`)
  }
  return rel.split('\\').join('/')
}

/**
 * Nearest existing ancestor of a path. An absent file has no realpath, so it
 * resolves through its nearest existing ancestor — for a new file directly
 * under the root that is the root itself, which is the common fresh-profile
 * case and must not be treated as an escape.
 */
function nearestExistingAncestor(full: string): string {
  let current = full
  for (;;) {
    if (existsSync(current)) return current
    const parent = dirname(current)
    if (parent === current) throw new Error(`Snapshot root disappeared: ${full}`)
    current = parent
  }
}

/**
 * Lexical plus real-path confinement. The path and its nearest existing
 * ancestor are resolved before they are trusted, so a symlink inside the
 * root that points outside it is rejected; callers re-run this at write
 * time because a tree can gain a symlink between capture and restore.
 */
function assertConfined(root: string, path: string): void {
  const realRoot = realpathSync(root)
  const realPath = realpathSync(nearestExistingAncestor(resolve(root, path)))
  // An absent file resolves to its nearest existing ancestor; when that
  // ancestor is the root itself, relative() returns '' and that is the
  // legitimate fresh-profile case, not an escape.
  const rel = relative(realRoot, realPath)
  if (rel.startsWith('..') || isAbsolute(rel)) {
    throw new Error(`Snapshot path escapes the profile root: ${path}`)
  }
}

function hashBytes(bytes: Buffer): string {
  return createHash('sha256').update(bytes).digest('hex')
}

function loadSnapshotRecord(storeDir: string, id: string): SnapshotRecord {
  const record = JSON.parse(readFileSync(join(storeDir, id, 'snapshot.json'), 'utf8')) as SnapshotRecord
  if (record.id !== id) throw new Error(`Snapshot record identity mismatch: ${id}`)
  return record
}

/**
 * Capture the requested paths without changing any of them. The capture set
 * is exactly the paths passed — no discovery, no globbing. Identical content
 * captured twice still yields distinct snapshot identities, so one capture's
 * history can never be overwritten by another's.
 */
export function takeSnapshot(
  storeDir: string,
  root: string,
  label: string,
  paths: readonly string[],
  kind: SnapshotKind = 'capture',
): SnapshotRecord {
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    throw new Error(`Snapshot root is not a directory: ${root}`)
  }
  const normalized = [...new Set(paths)]
    .map(path => normalizeRelativePath(root, path))
    .sort()
  for (const path of normalized) assertConfined(root, path)

  const id = randomUUID()
  const snapshotDir = join(storeDir, id)
  mkdirSync(join(snapshotDir, 'content'), { recursive: true })
  const files: SnapshotEntry[] = []
  for (const path of normalized) {
    const full = resolve(root, path)
    if (!existsSync(full)) {
      files.push({ path, state: 'absent' })
      continue
    }
    if (!statSync(full).isFile()) throw new Error(`Snapshot path is not a regular file: ${path}`)
    const bytes = readFileSync(full)
    const hash = hashBytes(bytes)
    writeFileSync(join(snapshotDir, 'content', hash), bytes)
    files.push({ path, state: 'present', hash })
  }
  const record: SnapshotRecord = {
    id,
    kind,
    label,
    createdAt: nowStamp(),
    root: resolve(root),
    files,
  }
  writeFileSync(join(snapshotDir, 'snapshot.json'), JSON.stringify(record, null, 2))
  return record
}

export function listSnapshots(storeDir: string): SnapshotRecord[] {
  if (!existsSync(storeDir)) return []
  const records: SnapshotRecord[] = []
  for (const entry of readdirSync(storeDir)) {
    try {
      records.push(loadSnapshotRecord(storeDir, entry))
    } catch {
      // Unrelated or partially written directories are not snapshots.
    }
  }
  return records.sort((left, right) =>
    left.createdAt === right.createdAt ? (left.id < right.id ? 1 : -1) : left.createdAt < right.createdAt ? 1 : -1,
  )
}

/**
 * Compare the current profile state against a capture. The capture set is
 * the authority: anything else in the profile is out of scope for the diff.
 */
export function diffAgainstSnapshot(storeDir: string, root: string, id: string): SnapshotDiff {
  const record = loadSnapshotRecord(storeDir, id)
  const diff: SnapshotDiff = { changed: [], added: [], removed: [] }
  for (const entry of record.files) {
    assertConfined(root, entry.path)
    const full = resolve(root, entry.path)
    if (entry.state === 'absent') {
      if (existsSync(full)) diff.added.push(entry.path)
      continue
    }
    if (!existsSync(full) || !statSync(full).isFile()) {
      diff.removed.push(entry.path)
      continue
    }
    if (hashBytes(readFileSync(full)) !== entry.hash) diff.changed.push(entry.path)
  }
  return diff
}

/**
 * Restore a capture. Before touching the profile, the current (failed) state
 * is preserved as its own evidence snapshot with a separate identity and
 * retention budget, and that evidence is itself restorable. Restores are
 * idempotently retryable: temp files are unique per attempt, stale temps from
 * an interrupted run are swept from the transaction directories first, and
 * every restored file is re-hashed after writing so a restore that did not
 * converge throws instead of reporting success.
 */
export function restoreSnapshot(storeDir: string, root: string, id: string): void {
  const record = loadSnapshotRecord(storeDir, id)
  for (const entry of record.files) assertConfined(root, entry.path)

  const transactionDirs = [...new Set(record.files.map(entry => dirname(resolve(root, entry.path))))]
  for (const dir of transactionDirs) {
    for (const name of readdirSync(dir)) {
      if (!RESTORE_TEMP_PATTERN.test(name)) continue
      try {
        rmSync(join(dir, name), { force: true })
      } catch {
        // A temp that cannot be removed now is retried by the next run.
      }
    }
  }

  takeSnapshot(
    storeDir,
    root,
    `pre-restore:${record.label}`,
    record.files.map(entry => entry.path),
    'evidence',
  )

  for (const entry of record.files) {
    const full = resolve(root, entry.path)
    if (entry.state === 'absent') {
      if (existsSync(full)) {
        if (!statSync(full).isFile()) throw new Error(`Cannot remove non-file path created by the install: ${entry.path}`)
        unlinkSync(full)
      }
      continue
    }
    const bytes = readFileSync(join(storeDir, record.id, 'content', entry.hash!))
    if (!existsSync(dirname(full))) throw new Error(`Parent directory of a captured file disappeared: ${entry.path}`)
    const temp = join(dirname(full), `${basename(full)}.restore-${randomUUID()}.tmp`)
    writeFileSync(temp, bytes)
    renameSync(temp, full)
    if (hashBytes(readFileSync(full)) !== entry.hash) {
      throw new Error(`Restore did not converge for ${entry.path}`)
    }
  }
}

/**
 * Prune captures and evidence on separate budgets. Evidence is never counted
 * against the capture budget, so a "keep the last N" policy cannot discard
 * the record of a failed transaction.
 */
export function pruneSnapshots(storeDir: string, budgets: { captures: number; evidence: number }): string[] {
  const ordered = listSnapshots(storeDir)
  const pruned: string[] = []
  const counters: Record<SnapshotKind, number> = { capture: 0, evidence: 0 }
  for (const record of ordered) {
    counters[record.kind] += 1
    const budget = record.kind === 'capture' ? budgets.captures : budgets.evidence
    if (counters[record.kind] > budget) {
      rmSync(join(storeDir, record.id), { recursive: true, force: true })
      pruned.push(record.id)
    }
  }
  return pruned
}
