/**
 * Typed evidence helpers for the Plugin Store: install-source classification,
 * semver comparison, and the installed-version freshness state.
 *
 * Pure functions only — the Host route and the client both depend on these
 * decisions, and the contract tests in tests/plugin-evidence.test.mjs pin the
 * downgrade rules: missing, stale, or contradictory evidence degrades to
 * `unknown`, and non-registry sources never receive an npm freshness claim.
 *
 * @module @sandbaseai/dsh-plugin-store/plugin-evidence
 */

export type InstallSourceKind = 'npm' | 'non-npm'

export type FreshnessState = 'current' | 'update-available' | 'unknown' | 'non-registry'

/**
 * npm package name grammar shared by the install gate and inventory lookups.
 * Full-match only: anything containing git specs, URLs, paths, whitespace, or
 * shell metacharacters fails, so a crafted inventory name cannot steer
 * module resolution or registry URLs.
 */
const NPM_PACKAGE_NAME = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/i

/**
 * npm package spec grammar (name plus optional @version range), matching the
 * install gate in src/index.ts.
 */
const NPM_PACKAGE_SPEC = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*(?:@[a-z0-9][a-z0-9._+-]*)?$/i

const SEMVER = /^[vV]?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/

export interface Semver {
  major: number
  minor: number
  patch: number
  prerelease: string[]
}

export function isNpmPackageName(value: string): boolean {
  return NPM_PACKAGE_NAME.test(value)
}

/**
 * Classify an install spec by source type. Only npm package specs can carry
 * registry freshness; every other supported form (git, GitHub subdirectory,
 * URL, path) must be reported as non-registry.
 */
export function classifyInstallSource(spec: string): InstallSourceKind {
  return NPM_PACKAGE_SPEC.test(spec) ? 'npm' : 'non-npm'
}

/**
 * Parse a version into comparable fields. Build metadata is ignored for
 * precedence. Returns null for anything that is not a strict x.y.z version
 * with an optional prerelease, so partial or fabricated versions cannot be
 * compared into a trusted state.
 */
export function parseSemver(value: unknown): Semver | null {
  if (typeof value !== 'string') return null
  const match = SEMVER.exec(value.trim())
  if (match === null) return null
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] === undefined ? [] : match[4].split('.'),
  }
}

function comparePrerelease(left: string[], right: string[]): number {
  if (left.length === 0 && right.length === 0) return 0
  // A release version outranks any prerelease of the same x.y.z.
  if (left.length === 0) return 1
  if (right.length === 0) return -1
  const length = Math.max(left.length, right.length)
  for (let index = 0; index < length; index += 1) {
    const leftPart = left[index]
    const rightPart = right[index]
    if (leftPart === undefined) return -1
    if (rightPart === undefined) return 1
    const leftNumeric = /^\d+$/.test(leftPart)
    const rightNumeric = /^\d+$/.test(rightPart)
    if (leftNumeric && rightNumeric) {
      const delta = Number(leftPart) - Number(rightPart)
      if (delta !== 0) return delta
    } else if (leftNumeric !== rightNumeric) {
      // Numeric identifiers always rank below alphanumeric ones.
      return leftNumeric ? -1 : 1
    } else if (leftPart !== rightPart) {
      return leftPart < rightPart ? -1 : 1
    }
  }
  return 0
}

/**
 * Compare two versions by semver precedence. Returns null when either side
 * is not a parseable version; callers must treat null as `unknown`, never as
 * an ordering.
 */
export function compareSemver(left: string, right: string): number | null {
  const a = parseSemver(left)
  const b = parseSemver(right)
  if (a === null || b === null) return null
  if (a.major !== b.major) return a.major - b.major
  if (a.minor !== b.minor) return a.minor - b.minor
  if (a.patch !== b.patch) return a.patch - b.patch
  return comparePrerelease(a.prerelease, b.prerelease)
}

export interface FreshnessInput {
  source: InstallSourceKind
  installedVersion?: string | undefined
  latestVersion?: string | undefined
}

/**
 * Derive the deterministic freshness state for an installed plugin.
 *
 * - `non-registry`: the source is not an npm package; no npm freshness claim
 *   is made regardless of any version strings.
 * - `unknown`: installed or latest version is missing, unparsable, or the
 *   installed version is newer than the registry latest (contradictory with
 *   the registry being the freshness source of truth).
 * - `update-available`: the registry latest is strictly newer.
 * - `current`: installed matches the registry latest by precedence.
 */
export function deriveFreshness(input: FreshnessInput): { state: FreshnessState } {
  if (input.source !== 'npm') return { state: 'non-registry' }
  const installed = typeof input.installedVersion === 'string' ? input.installedVersion : ''
  const latest = typeof input.latestVersion === 'string' ? input.latestVersion : ''
  if (installed.length === 0 || latest.length === 0) return { state: 'unknown' }
  const ordering = compareSemver(installed, latest)
  if (ordering === null) return { state: 'unknown' }
  if (ordering > 0) return { state: 'unknown' }
  return { state: ordering < 0 ? 'update-available' : 'current' }
}
