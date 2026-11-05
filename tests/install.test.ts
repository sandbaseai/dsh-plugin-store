import { describe, expect, it, vi } from 'vitest'
import type { Context } from '@deepseek-ai/cordis'
import { currentProfile, installCommand, installPackage } from '../src/install.js'

function host(profile: string, application = 'applied') {
  const installBundle = vi.fn(async () => ({ application }))
  const services = { profileContext: { name: profile }, pluginManager: { installBundle } }
  const ctx = { get: (key: keyof typeof services) => services[key] } as unknown as Context
  return { ctx, installBundle }
}

describe('current-profile installation', () => {
  it.each(['web', 'desktop', 'custom profile'])('uses the %s host manager', async profile => {
    const { ctx, installBundle } = host(profile)
    expect(await installPackage(ctx, '@example/plugin@1.2.3')).toEqual({ profile, application: 'applied' })
    expect(installBundle).toHaveBeenCalledExactlyOnceWith('@example/plugin@1.2.3')
    expect(currentProfile(ctx)).toBe(profile)
  })
  it('retains restart-required status', async () => {
    const { ctx } = host('desktop', 'restart-required')
    expect(await installPackage(ctx, 'plugin')).toEqual({ profile: 'desktop', application: 'restart-required' })
  })
  it.each(['failed', 'cancelled', 'overridden'])('reports %s instead of success', async state => {
    const { ctx } = host('desktop', state)
    await expect(installPackage(ctx, 'plugin')).rejects.toThrow(state)
  })
  it('rejects a missing host context', async () => {
    const ctx = { get: () => undefined } as unknown as Context
    await expect(installPackage(ctx, 'plugin')).rejects.toThrow('profile is unavailable')
  })
  it('does not fall back to a different installer', async () => {
    const ctx = { get: (key: string) => key === 'profileContext' ? { name: 'desktop' } : undefined } as unknown as Context
    await expect(installPackage(ctx, 'plugin')).rejects.toThrow('manager is unavailable')
  })
  it('quotes custom profile names in instructions', () => {
    expect(installCommand('desktop', '@example/plugin@1')).toBe('dsh plugin --profile desktop add -w @example/plugin@1')
    expect(installCommand('custom profile', 'plugin')).toBe("dsh plugin --profile 'custom profile' add -w plugin")
  })
})
