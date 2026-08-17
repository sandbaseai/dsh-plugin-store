/**
 * DSH Plugin Store — Browse and install plugins from the DSH Plugin Leaderboard.
 *
 * Tools:
 *   - store_search: Search the plugin catalog
 *   - store_install: Get install instructions for a plugin
 *   - store_catalog: Browse the full catalog by category
 *
 * @module @sandbaseai/dsh-plugin-store
 */

import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import type {} from '@deepseek-ai/dsh-web'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { handleUpstreamError } from '@sandbaseai/dsh-plugin-shared'

export const name = 'dsh_plugin_store'
export const inject = ['tools', 'web'] as const

export interface Config {
  enabled?: boolean
  catalogUrl?: string
  timeoutMs?: number
}

export const Config: z<Config> = z.object({
  enabled: z.boolean().default(true),
  catalogUrl: z.string().default('https://dshpluginleaderboard.com/api/catalog'),
  timeoutMs: z.number().default(30000),
})

interface StorePlugin {
  id: string
  name: string
  repository: string
  description: string
  categories: string[]
  installPath: string
  verificationStatus: string
  stars: number
  forks: number
  overallScore: number
  stars7dDelta: number
  createdAt: string
  updatedAt: string
}

interface StoreCatalog {
  plugins: StorePlugin[]
  total: number
  updatedAt: string
}

let cachedCatalog: StoreCatalog | null = null
let cacheTime = 0
const CACHE_TTL = 300_000

async function getCatalog(catalogUrl: string): Promise<StoreCatalog> {
  const now = Date.now()
  if (cachedCatalog && (now - cacheTime) < CACHE_TTL) return cachedCatalog

  const response = await fetch(catalogUrl)
  if (!response.ok) {
    if (cachedCatalog) return cachedCatalog
    throw new Error(`Catalog fetch failed: HTTP ${response.status}`)
  }
  const data = await response.json() as StoreCatalog
  cachedCatalog = data
  cacheTime = now
  return data
}

export function apply(ctx: Context, config: Config = {}) {
  if (config.enabled === false) return

  const catalogUrl = config.catalogUrl ?? 'https://dshpluginleaderboard.com/api/catalog'

  void (async () => {
    // ── store_search ──
    ctx.tools.register(defineTool({
      name: 'store_search',
      description: 'Search the DSH Plugin Store for plugins. Find plugins by name, description, or category. Returns matching plugins with install instructions.',
      parameters: {
        query: { type: 'string', required: true, description: 'Search query — matches plugin name and description.' },
        category: { type: 'string', description: 'Filter by category (e.g., "UI Enhancements", "Dev Tools", "Productivity").' },
        limit: { type: 'number', description: 'Max results (default 10).', minimum: 1, maximum: 25 },
      },
      output: {
        schema: { type: 'string' },
        render: (_args, value) => [{ type: 'text', text: value }],
      },
      async execute(args, _exec) {
        try {
          const catalog = await getCatalog(catalogUrl)
          const q = (args.query || '').toLowerCase()
          const cat = args.category?.toLowerCase()
          let results = catalog.plugins.filter(p => {
            const matchQ = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
            const matchCat = !cat || p.categories?.some(c => c.toLowerCase() === cat)
            return matchQ && matchCat
          })
          results.sort((a, b) => b.overallScore - a.overallScore)
          const limit = args.limit || 10
          results = results.slice(0, limit)

          const lines = [`# Plugin Store Search: "${args.query}"`, `Found ${results.length} plugin(s):\n`]
          for (const p of results) {
            lines.push(`## ${p.name} (Stars: ${p.stars}, Score: ${p.overallScore.toFixed(0)})`)
            lines.push(`- **Repository**: ${p.repository}`)
            lines.push(`- **Description**: ${p.description}`)
            lines.push(`- **Categories**: ${p.categories?.join(', ') || 'None'}`)
            lines.push(`- **Install**: \`${p.installPath || `dsh plugin --profile web add github:${p.repository}`}\``)
            lines.push(`- **Status**: ${p.verificationStatus}`)
            lines.push('')
          }
          return lines.join('\n')
        } catch (err) {
          handleUpstreamError(err, 'store_search')
          throw new Error('unreachable')
        }
      },
    }))

    // ── store_catalog ──
    ctx.tools.register(defineTool({
      name: 'store_catalog',
      description: 'Browse the full DSH Plugin Store catalog. List all available plugins, optionally filtered by category.',
      parameters: {
        category: { type: 'string', description: 'Filter by category (e.g., "UI Enhancements", "Dev Tools"). Leave empty for all.' },
        sort: { type: 'string', description: 'Sort by: "score" (default), "stars", "newest".', enum: ['score', 'stars', 'newest'] },
        limit: { type: 'number', description: 'Max results (default 20).', minimum: 1, maximum: 50 },
      },
      output: {
        schema: { type: 'string' },
        render: (_args, value) => [{ type: 'text', text: value }],
      },
      async execute(args, _exec) {
        try {
          const catalog = await getCatalog(catalogUrl)
          const cat = args.category?.toLowerCase()
          let results = catalog.plugins.filter(p => {
            return !cat || p.categories?.some(c => c.toLowerCase() === cat)
          })

          switch (args.sort) {
            case 'stars': results.sort((a, b) => b.stars - a.stars); break
            case 'newest': results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break
            default: results.sort((a, b) => b.overallScore - a.overallScore)
          }
          const limit = args.limit || 20
          results = results.slice(0, limit)

          const lines = [`# Plugin Store Catalog`, `Total: ${catalog.total} plugins | Showing: ${results.length}\n`]
          for (const p of results) {
            lines.push(`- **${p.name}** Stars:${p.stars} | Score:${p.overallScore.toFixed(0)} | ${p.description}`)
            lines.push(`  Install: \`${p.installPath || `dsh plugin --profile web add github:${p.repository}`}\``)
            lines.push(`  Categories: ${p.categories?.join(', ') || 'None'}\n`)
          }
          return lines.join('\n')
        } catch (err) {
          handleUpstreamError(err, 'store_catalog')
          throw new Error('unreachable')
        }
      },
    }))

    // ── store_install ──
    ctx.tools.register(defineTool({
      name: 'store_install',
      description: 'Get the install instructions for a specific plugin from the DSH Plugin Store.',
      parameters: {
        name: { type: 'string', required: true, description: 'The plugin name (e.g., "dsh-status-rotator") or repository (e.g., "01Virex/dsh-status-rotator").' },
      },
      output: {
        schema: { type: 'string' },
        render: (_args, value) => [{ type: 'text', text: value }],
      },
      async execute(args, _exec) {
        try {
          const catalog = await getCatalog(catalogUrl)
          const q = args.name.toLowerCase()
          const plugin = catalog.plugins.find(p =>
            p.name.toLowerCase() === q ||
            p.repository.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q),
          )

          if (!plugin) {
            return `Plugin "${args.name}" not found in the store. Try store_search to find plugins.`
          }

          const installCmd = plugin.installPath || `dsh plugin --profile web add github:${plugin.repository}`
          return [
            `# ${plugin.name}`,
            `**Description**: ${plugin.description}`,
            `**Repository**: https://github.com/${plugin.repository}`,
            `**Stars**: ${plugin.stars} (+${plugin.stars7dDelta} this week)`,
            `**Score**: ${plugin.overallScore.toFixed(0)}/100`,
            `**Status**: ${plugin.verificationStatus}`,
            '',
            `## Install`,
            '```bash',
            installCmd,
            '```',
            '',
            `Copy and run this command in your terminal to install the plugin.`,
          ].join('\n')
        } catch (err) {
          handleUpstreamError(err, 'store_install')
          throw new Error('unreachable')
        }
      },
    }))
  })()
}
