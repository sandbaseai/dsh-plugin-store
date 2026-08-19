import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-api-remotes/client'
import { useEffect, useMemo, useState } from 'react'
import css from './StoreSection.module.css'

interface CommunityPlugin {
  repository: string
  name: string
  description: string
  categories: string[]
  stars: number
  stars7dDelta: number
  rank: number
}

type CatalogState = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; items: CommunityPlugin[]; total: number; categories: string[] }
type InventoryEntry = { entryId: string; moduleName: string; enabled: boolean; fiberPhase: string | null }

async function json<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)
  const body = await response.json() as T & { error?: string }
  if (!response.ok) throw new Error(body.error ?? `HTTP ${response.status}`)
  return body
}

function StoreSection({ listInstalled }: { listInstalled: () => Promise<InventoryEntry[]> }) {
  const [tab, setTab] = useState<'community' | 'installed'>('community')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<'rank' | 'stars' | 'growth'>('rank')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [catalog, setCatalog] = useState<CatalogState>({ status: 'loading' })
  const [installed, setInstalled] = useState<InventoryEntry[]>([])
  const [installing, setInstalling] = useState<string>()
  const [loadingMore, setLoadingMore] = useState(false)
  const [notice, setNotice] = useState<string>()

  const loadCatalog = (selectedCategory = category) => {
    setCatalog({ status: 'loading' })
    const categoryParam = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ''
    void json<{ items: CommunityPlugin[]; total: number; categories: string[] }>(`/api/plugin-store/catalog?limit=50&offset=0${categoryParam}`).then(
      value => { setCategories(value.categories); setCatalog({ status: 'ready', items: value.items, total: value.total, categories: value.categories }) },
      error => { setCatalog({ status: 'error', message: error instanceof Error ? error.message : String(error) }) },
    )
  }
  const loadMore = async () => {
    if (catalog.status !== 'ready' || loadingMore) return
    setLoadingMore(true)
    try {
      const categoryParam = category ? `&category=${encodeURIComponent(category)}` : ''
      const value = await json<{ items: CommunityPlugin[]; total: number; categories: string[] }>(`/api/plugin-store/catalog?limit=50&offset=${catalog.items.length}${categoryParam}`)
      setCatalog({ status: 'ready', items: [...catalog.items, ...value.items], total: value.total, categories: value.categories.length > 0 ? value.categories : catalog.categories })
    } catch (error) {
      setNotice(`Could not load more plugins: ${error instanceof Error ? error.message : String(error)}`)
    } finally { setLoadingMore(false) }
  }
  const loadInstalled = () => { void listInstalled().then(setInstalled, () => { setInstalled([]) }) }

  useEffect(loadCatalog, [])
  useEffect(loadInstalled, [listInstalled])

  const normalized = query.trim().toLocaleLowerCase()
  const visible = useMemo(() => {
    if (catalog.status !== 'ready') return []
    const filtered = catalog.items.filter(item => (normalized.length === 0 || [item.name, item.repository, item.description, ...item.categories]
        .some(value => value.toLocaleLowerCase().includes(normalized))))
    return [...filtered].sort((a, b) => sort === 'stars'
      ? b.stars - a.stars
      : sort === 'growth' ? b.stars7dDelta - a.stars7dDelta : a.rank - b.rank)
  }, [catalog, category, normalized, sort])
  const installedNames = useMemo(() => new Set(installed.map(item => item.moduleName.toLocaleLowerCase())), [installed])

  const install = async (plugin: CommunityPlugin) => {
    setInstalling(plugin.repository)
    setNotice(undefined)
    try {
      await json('/api/plugin-store/install', {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ repository: plugin.repository }),
      })
      setNotice(`${plugin.name} was installed to the web profile. Restart DSH to activate it.`)
      loadInstalled()
    } catch (error) {
      setNotice(`Installation failed: ${error instanceof Error ? error.message : String(error)}`)
    } finally { setInstalling(undefined) }
  }

  return <div className={css.store}>
    <header className={css.header}><h2>Plugin Store</h2><p>Discover and install extensions built by the DSH community.</p></header>
    <div className={css.tabs} role="tablist" aria-label="Store views">
      <button type="button" role="tab" aria-selected={tab === 'community'} onClick={() => { setTab('community') }}>Community</button>
      <button type="button" role="tab" aria-selected={tab === 'installed'} onClick={() => { setTab('installed'); loadInstalled() }}>Installed <span>{installed.length}</span></button>
    </div>
    {notice ? <div className={css.notice} role="status">{notice}</div> : null}
    {tab === 'community' ? <section className={css.content}>
      <div className={css.toolbar}>
        <label className={css.search}><span>Search</span><input type="search" value={query} placeholder="Name or repository" onChange={event => { setQuery(event.currentTarget.value) }} /></label>
        <label className={css.sort}><span>Tag</span><select value={category} onChange={event => { const value = event.currentTarget.value; setCategory(value); loadCatalog(value) }}><option value="">All tags</option>{categories.map(value => <option value={value} key={value}>{value}</option>)}</select></label>
        <label className={css.sort}><span>Sort</span><select value={sort} onChange={event => { setSort(event.currentTarget.value as typeof sort) }}><option value="rank">Leaderboard rank</option><option value="stars">Most stars</option><option value="growth">Trending this week</option></select></label>
      </div>
      {catalog.status === 'loading' ? <div className={css.skeletons} aria-label="Loading the community catalog">{Array.from({ length: 5 }, (_, index) => <div className={css.skeleton} key={index}><i /><span /><b /></div>)}</div> : null}
      {catalog.status === 'error' ? <div className={css.state}><p>Could not load the catalog: {catalog.message}</p><button type="button" onClick={() => { loadCatalog() }}>Retry</button></div> : null}
      {catalog.status === 'ready' ? <>
        <div className={css.summary}><span><strong>{catalog.items.length.toLocaleString()}</strong> of {catalog.total.toLocaleString()} plugins loaded</span>{normalized || category ? <span>{visible.length.toLocaleString()} matches</span> : null}</div>
        {visible.length === 0 ? <p className={css.state}>No matching plugins.</p> : <ul className={css.grid}>{visible.map(plugin => {
          const isInstalled = installedNames.has(plugin.name.toLocaleLowerCase()) || installedNames.has(plugin.repository.toLocaleLowerCase())
          return <li className={css.card} key={plugin.repository}>
            <span className={css.rank}>#{plugin.rank || '-'}</span>
            <div className={css.plugin}><div className={css.titleLine}><h3>{plugin.name}</h3><code>{plugin.repository}</code></div><p>{plugin.description || 'No description available.'}</p><div className={css.tags}>{plugin.categories.slice(0, 2).map(category => <span key={category}>{category}</span>)}</div></div>
            <div className={css.metrics}><strong>{plugin.stars.toLocaleString()}</strong><span>stars</span>{plugin.stars7dDelta > 0 ? <small>+{plugin.stars7dDelta.toLocaleString()} this week</small> : null}</div>
            <div className={css.actions}><a href={`https://github.com/${plugin.repository}`} target="_blank" rel="noreferrer">Source</a><button type="button" disabled={isInstalled || installing !== undefined} onClick={() => { void install(plugin) }}>{isInstalled ? 'Installed' : installing === plugin.repository ? 'Installing...' : 'Install'}</button></div>
          </li>
        })}</ul>}
        {catalog.items.length < catalog.total && normalized.length === 0 ? <div className={css.loadMore}><button type="button" disabled={loadingMore} onClick={() => { void loadMore() }}>{loadingMore ? 'Loading…' : 'Load more'}</button></div> : null}
      </> : null}
    </section> : <section className={css.content}>
      <div className={css.summary}><strong>{installed.length}</strong> Loader plugins</div>
      {installed.length === 0 ? <p className={css.state}>No installed plugins are available.</p> : <ul className={css.installed}>{installed.map(item => <li key={item.entryId}><div><strong>{item.moduleName}</strong><code>{item.entryId}</code></div><span data-enabled={item.enabled}>{item.enabled ? item.fiberPhase === 'active' ? 'Running' : 'Enabled' : 'Disabled'}</span></li>)}</ul>}
    </section>}
  </div>
}

export const inject = ['slots', 'remote', 'remote.pluginInventory'] as const

export function apply(ctx: ClientContext): void {
  const listInstalled = async (): Promise<InventoryEntry[]> => {
    const result = await ctx.remote.pluginInventory.list()
    if (!result.ok) throw new Error(result.error.message)
    return [...result.value.entries]
  }
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section', id: 'plugin-store', order: 120, label: () => 'Store',
    inject: () => ({ listInstalled }),
  }, StoreSection))
}
