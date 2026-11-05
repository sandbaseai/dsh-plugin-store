import { expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { runInNewContext } from 'node:vm'

it('registers Store in the current Plugins page', () => {
  let client: { apply: (ctx: unknown) => void } | undefined
  runInNewContext(readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8'), {
    window: { __ModuleLoader__: { load: ({ factory }: { factory: (require: unknown) => typeof client }) => {
      client = factory(createRequire(import.meta.url))
    } } },
    document: { querySelector: () => null, createElement: () => ({ dataset: {} }), head: { appendChild: () => {} } },
  })
  const register = vi.fn()
  client!.apply({
    slots: { inject: (_slot: string, callback: () => void) => callback(), register },
    remote: { pluginInventory: { list: async () => ({ ok: true, value: { entries: [] } }) } },
  })
  expect(register).toHaveBeenCalledWith(expect.objectContaining({ name: 'plugins.tab', id: 'plugin-store' }), expect.any(Function))
})
