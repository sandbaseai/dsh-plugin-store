import { afterEach, describe, expect, it, vi } from 'vitest'
import { Readable } from 'node:stream'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Context } from '@deepseek-ai/cordis'
import { apply } from '../src/index.js'

type Handler = (req: IncomingMessage, res: ServerResponse) => Promise<void>

afterEach(() => vi.unstubAllGlobals())

describe('catalog installation route', () => {
  it.each(['desktop', 'web', 'custom profile'])('installs the verified package through the %s manager', async profile => {
    const handlers = new Map<string, Handler>()
    const installBundle = vi.fn(async () => ({ application: 'restart-required' }))
    const services = { profileContext: { name: profile }, pluginManager: { installBundle } }
    const ctx = {
      get: (key: keyof typeof services) => services[key],
      effect: (effect: () => unknown) => effect(),
      webServer: { register: (route: { path: string; handler: Handler }) => handlers.set(route.path, route.handler) },
      tools: { register: () => {} },
    } as unknown as Context
    apply(ctx, { catalogUrl: 'https://catalog.example/api/catalog' })
    vi.stubGlobal('fetch', vi.fn(async (url: string | URL) => new Response(JSON.stringify(
      String(url).includes('/api/plugins/')
        ? { plugin: { repository: 'example/plugin', verificationStatus: 'runtime_verified', installPath: 'dsh plugin --profile web add @example/plugin@1.2.3' } }
        : { items: [{ repository: 'example/plugin', href: '/plugins/example-plugin', installVerificationStatus: 'verified' }], total: 1 },
    ), { status: 200 })))
    const request = async (path: string, method: string, body = '') => {
      const req = Readable.from([body]) as IncomingMessage
      req.method = method
      req.url = path
      let status = 0
      let text = ''
      const res = { writeHead: (code: number) => { status = code }, end: (data: string) => { text = data } } as unknown as ServerResponse
      await handlers.get(path)!(req, res)
      return { status, body: JSON.parse(text) }
    }
    const catalog = await request('/api/plugin-store/catalog', 'GET')
    expect(catalog.body.items[0].verificationStatus).toBe('verified')
    const result = await request('/api/plugin-store/install', 'POST', JSON.stringify({ repository: 'example/plugin' }))
    expect(result.status).toBe(200)
    expect(result.body).toMatchObject({ profile, application: 'restart-required', package: '@example/plugin@1.2.3' })
    expect(installBundle).toHaveBeenCalledExactlyOnceWith('@example/plugin@1.2.3')
  })
})
