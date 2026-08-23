export type InstallSourceKind = 'npm' | 'github-subdir' | 'manual' | 'unsupported' | 'invalid'

export interface InstallSourceClassification {
  kind: InstallSourceKind
  spec?: string
  reason?: string
}

export type InstallAvailability = 'installable' | 'manual' | 'unverified' | 'conflict' | 'unsupported'

export function getInstallAvailability(
  catalogVerificationStatus: string,
  detailVerificationStatus: string,
  sourceKind: InstallSourceKind,
): InstallAvailability {
  const catalogVerified = catalogVerificationStatus === 'verified'
  const detailVerified = detailVerificationStatus === 'runtime_verified'
  const conflict = catalogVerified !== detailVerified
  if (!catalogVerified && !detailVerified) return 'unverified'
  if (sourceKind === 'npm') return conflict ? 'conflict' : 'installable'
  if (sourceKind === 'github-subdir' || sourceKind === 'manual') {
    return detailVerified ? 'manual' : conflict ? 'conflict' : 'unsupported'
  }
  return conflict ? 'conflict' : 'unsupported'
}

const COMMAND_RE = /^dsh plugin --profile web add (?:"([^"\r\n]+)"|'([^'\r\n]+)'|(\S+))$/
const NPM_SPEC_RE = /^(?:@[a-z0-9][a-z0-9._~-]*\/)?[a-z0-9][a-z0-9._~-]*(?:@[a-z0-9][a-z0-9._+~-]*)?$/i
const GITHUB_REPO_RE = /^github:[a-z0-9_.-]+\/[a-z0-9_.-]+$/i
const GITHUB_REF_RE = /^github:[a-z0-9_.-]+\/[a-z0-9_.-]+#[a-z0-9][a-z0-9._/-]*$/i
const GITHUB_SUBDIR_RE = /^github:[a-z0-9_.-]+\/[a-z0-9_.-]+#(?:(?:[a-z0-9][a-z0-9._/-]*)&)?path:(\/?[a-z0-9._/-]+)$/i

function hasUnsafePathSegment(value: string): boolean {
  const segments = value.split('/')
  return segments.some((segment, index) => segment === '..' || (segment.length === 0 && index !== 0))
}

function extractSpec(installPath: string): string | undefined {
  const match = COMMAND_RE.exec(installPath.trim())
  return match?.[1] ?? match?.[2] ?? match?.[3]
}

export function formatInstallCommand(spec: string): string {
  const command = `dsh plugin --profile web add ${spec}`
  return spec.startsWith('github:') ? `dsh plugin --profile web add '${spec}'` : command
}

export function classifyInstallPath(installPath: string | undefined): InstallSourceClassification {
  if (typeof installPath !== 'string' || installPath.trim().length === 0) {
    return { kind: 'invalid', reason: 'The verified install command is missing' }
  }

  const spec = extractSpec(installPath)
  if (spec === undefined) {
    return { kind: 'invalid', reason: 'The verified install command has an unsupported shape' }
  }
  if (NPM_SPEC_RE.test(spec)) return { kind: 'npm', spec }

  const githubSubdir = GITHUB_SUBDIR_RE.exec(spec)
  if (githubSubdir !== null) {
    const path = githubSubdir[1]
    if (path !== undefined && !hasUnsafePathSegment(path)) return { kind: 'github-subdir', spec }
    return { kind: 'unsupported', reason: 'The verified source contains an unsafe path' }
  }
  if (GITHUB_REPO_RE.test(spec) || GITHUB_REF_RE.test(spec)) return { kind: 'manual', spec }

  return { kind: 'unsupported', reason: 'The verified source is not supported by the native installer' }
}
