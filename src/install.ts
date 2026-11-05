import type { Context } from '@deepseek-ai/cordis'

interface ProfileContext {
  name: string
}

interface InstallResult {
  application: string
  error?: { code?: string }
}

interface PluginManager {
  installBundle(spec: string): Promise<InstallResult>
}

export function currentProfile(ctx: Context): string {
  const profile = ctx.get('profileContext') as ProfileContext | undefined
  if (!profile?.name) throw new Error('The current DSH profile is unavailable')
  return profile.name
}

export function installCommand(profile: string, spec: string): string {
  const quoted = /^[a-zA-Z0-9._-]+$/.test(profile)
    ? profile
    : "'" + profile.replaceAll("'", "'\"'\"'") + "'"
  return `dsh plugin --profile ${quoted} add -w ${spec}`
}

export async function installPackage(ctx: Context, spec: string) {
  const profile = currentProfile(ctx)
  const manager = ctx.get('pluginManager') as PluginManager | undefined
  if (!manager) throw new Error('The DSH plugin manager is unavailable')
  // The host manager owns the active profile, package manager, locking and rollback.
  const result = await manager.installBundle(spec)
  if (result.application !== 'applied' && result.application !== 'restart-required') {
    throw new Error(`Plugin installation ${result.application}: ${result.error?.code ?? 'activation incomplete'}`)
  }
  return { profile, application: result.application }
}
