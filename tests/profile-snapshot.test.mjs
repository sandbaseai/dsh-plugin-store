import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, symlinkSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  diffAgainstSnapshot,
  listSnapshots,
  pruneSnapshots,
  restoreSnapshot,
  takeSnapshot,
} from '../src/profile-snapshot.ts'

function makeProfile() {
  return mkdtempSync(join(tmpdir(), 'dsh-store-snapshot-'))
}

function writeFile(root, relative, contents) {
  const full = join(root, relative)
  mkdirSync(join(full, '..'), { recursive: true })
  writeFileSync(full, contents)
}

test('captures exactly the requested paths and nothing else', () => {
  const root = makeProfile()
  const store = makeProfile()
  writeFile(root, 'package.json', '{}')
  writeFile(root, 'pnpm-lock.yaml', 'lockfile: v9')
  writeFile(root, 'unrelated.txt', 'not part of the transaction')

  const snapshot = takeSnapshot(store, root, 'pre-install', ['package.json', 'pnpm-lock.yaml'])

  assert.deepEqual([...snapshot.files].map(entry => entry.path).sort(), ['package.json', 'pnpm-lock.yaml'])
})

test('captures without changing any file', () => {
  const root = makeProfile()
  const store = makeProfile()
  writeFile(root, 'package.json', '{"captured":true}')

  takeSnapshot(store, root, 'pre-install', ['package.json'])

  assert.equal(readFileSync(join(root, 'package.json'), 'utf8'), '{"captured":true}')
})

test('records an absent file as absent and removes what the failed install created', () => {
  const root = makeProfile()
  const store = makeProfile()
  writeFile(root, 'package.json', '{}')

  const snapshot = takeSnapshot(store, root, 'pre-install', ['package.json', 'cordis.patch.yml'])
  const absent = snapshot.files.find(entry => entry.path === 'cordis.patch.yml')
  assert.equal(absent?.state, 'absent')

  // A failed install left half of itself behind.
  writeFile(root, 'cordis.patch.yml', 'leftover: true')
  restoreSnapshot(store, root, snapshot.id)
  assert.equal(existsSync(join(root, 'cordis.patch.yml')), false)
})

test('returns every file to byte-equivalent pre-install state', () => {
  const root = makeProfile()
  const store = makeProfile()
  writeFile(root, 'package.json', '{"version":1}')
  writeFile(root, 'pnpm-workspace.yaml', 'packages:\n  - .')

  const snapshot = takeSnapshot(store, root, 'pre-install', ['package.json', 'pnpm-workspace.yaml'])
  writeFile(root, 'package.json', '{"version":2}')
  writeFile(root, 'pnpm-workspace.yaml', 'packages:\n  - .\n  - injected')

  restoreSnapshot(store, root, snapshot.id)

  assert.equal(readFileSync(join(root, 'package.json'), 'utf8'), '{"version":1}')
  assert.equal(readFileSync(join(root, 'pnpm-workspace.yaml'), 'utf8'), 'packages:\n  - .')
  assert.deepEqual(diffAgainstSnapshot(store, root, snapshot.id), { changed: [], added: [], removed: [] })
})

test('throws instead of reporting a restore that did not converge', () => {
  const root = makeProfile()
  const store = makeProfile()
  writeFile(root, 'package.json', '{"version":1}')

  const snapshot = takeSnapshot(store, root, 'pre-install', ['package.json'])
  // Corrupt the stored content so the post-write byte verification fails.
  const storeDir = join(store, snapshot.id)
  const record = JSON.parse(readFileSync(join(storeDir, 'snapshot.json'), 'utf8'))
  writeFileSync(join(storeDir, 'content', record.files[0].hash), '{"tampered":true}')

  assert.throws(() => restoreSnapshot(store, root, snapshot.id))
})

test('preserves the failed state as its own restorable evidence snapshot', () => {
  const root = makeProfile()
  const store = makeProfile()
  writeFile(root, 'package.json', '{"version":1}')

  const snapshot = takeSnapshot(store, root, 'pre-install', ['package.json'])
  writeFile(root, 'package.json', '{"version":2,"broken":true}')

  restoreSnapshot(store, root, snapshot.id)

  assert.equal(readFileSync(join(root, 'package.json'), 'utf8'), '{"version":1}')
  // The failed state must survive as its own snapshot, restorable for diagnosis.
  const evidence = listSnapshots(store).find(record => record.kind === 'evidence')
  assert.notEqual(evidence, undefined)
  writeFile(root, 'package.json', '{"version":3}')
  restoreSnapshot(store, root, evidence.id)
  assert.equal(readFileSync(join(root, 'package.json'), 'utf8'), '{"version":2,"broken":true}')
})

test('recovers from an interrupted rollback by running again', () => {
  const root = makeProfile()
  const store = makeProfile()
  writeFile(root, 'package.json', '{"version":1}')

  const snapshot = takeSnapshot(store, root, 'pre-install', ['package.json'])
  writeFile(root, 'package.json', '{"version":2}')
  // A previous restore died between temp write and rename.
  writeFileSync(join(root, 'package.json.restore-interrupted-1.tmp'), '{"partial":')

  restoreSnapshot(store, root, snapshot.id)

  assert.equal(readFileSync(join(root, 'package.json'), 'utf8'), '{"version":1}')
  assert.deepEqual(diffAgainstSnapshot(store, root, snapshot.id), { changed: [], added: [], removed: [] })
})

test('gives identical captures distinct identities', () => {
  const root = makeProfile()
  const store = makeProfile()
  writeFile(root, 'package.json', '{}')

  const first = takeSnapshot(store, root, 'before', ['package.json'])
  const second = takeSnapshot(store, root, 'after', ['package.json'])

  assert.notEqual(first.id, second.id)
  writeFile(root, 'package.json', '{"changed":true}')
  restoreSnapshot(store, root, first.id)
  assert.equal(readFileSync(join(root, 'package.json'), 'utf8'), '{}')
})

test('keeps capture and evidence pruning on separate budgets', () => {
  const root = makeProfile()
  const store = makeProfile()
  writeFile(root, 'package.json', '{}')

  const evidence = takeSnapshot(store, root, 'failed-install', ['package.json'], 'evidence')
  const captures = Array.from({ length: 3 }, () => takeSnapshot(store, root, 'capture', ['package.json']))

  pruneSnapshots(store, { captures: 2, evidence: 1 })

  assert.equal(existsSync(join(store, evidence.id, 'snapshot.json')), true, 'evidence must survive its own budget')
  assert.equal(existsSync(join(store, captures[0].id, 'snapshot.json')), false)
  assert.equal(existsSync(join(store, captures[2].id, 'snapshot.json')), true)
})

test('rejects paths that escape the snapshot root', () => {
  const root = makeProfile()
  const store = makeProfile()
  writeFile(root, 'package.json', '{}')

  assert.throws(() => takeSnapshot(store, root, 'escape', ['../outside.txt']))
  assert.throws(() => takeSnapshot(store, root, 'escape', ['nested/../../outside.txt']))
  const absolute = join(makeProfile(), 'elsewhere.txt')
  assert.throws(() => takeSnapshot(store, root, 'escape', [absolute]))
})

test('confines symlinked paths to the snapshot root', () => {
  const root = makeProfile()
  const store = makeProfile()
  const outside = makeProfile()
  writeFile(outside, 'secret.txt', 'outside')
  writeFile(root, 'package.json', '{}')

  let linked = false
  try {
    symlinkSync(join(outside, 'secret.txt'), join(root, 'link.txt'))
    linked = true
  } catch {
    // Creating symlinks on Windows requires elevated privileges or developer
    // mode; the confinement logic is still exercised on capable platforms.
  }
  if (!linked) return

  assert.throws(() => takeSnapshot(store, root, 'escape', ['link.txt']))
  rmSync(join(root, 'link.txt'))
})
