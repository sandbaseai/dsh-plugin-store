import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

async function read(relativePath) {
  return readFile(new URL(relativePath, root), 'utf8')
}

test('build configuration stays inside the standalone repository', async () => {
  const manifest = JSON.parse(await read('package.json'))
  const dependencySections = [
    manifest.dependencies ?? {},
    manifest.devDependencies ?? {},
    manifest.optionalDependencies ?? {},
    manifest.peerDependencies ?? {},
  ]

  for (const dependencies of dependencySections) {
    for (const [name, range] of Object.entries(dependencies)) {
      assert.doesNotMatch(range, /^workspace:/, `${name} must use a public package range`)
    }
  }

  assert.equal(manifest.packageManager, 'pnpm@11.7.0')
  assert.equal(typeof manifest.scripts?.verify, 'string')
  assert.match(await read('pnpm-lock.yaml'), /^lockfileVersion:/m)

  const tsconfig = JSON.parse(await read('tsconfig.json'))
  assert.equal(tsconfig.extends, undefined, 'tsconfig must not extend a Harness-owned file')
  assert.deepEqual(tsconfig.references ?? [], [], 'tsconfig must not reference Harness workspace projects')

  const tsdownConfig = await read('tsdown.config.ts')
  assert.doesNotMatch(tsdownConfig, /from\s+['"]\.\.\//, 'tsdown config must not import a Harness-owned preset')
})

test('standalone build preserves the published Host and Web contracts', async () => {
  const [host, client, hostTypes, clientTypes] = await Promise.all([
    read('lib/index.js'),
    read('lib/client.js'),
    read('lib/types/index.d.ts'),
    read('lib/types/client/index.d.ts'),
  ])

  assert.match(host, /export\s*\{[^}]*apply[^}]*\}/)
  assert.match(client, /window\.__ModuleLoader__\.load/)
  assert.match(client, /dataset\.pluginCss/)
  const clientRequires = [...client.matchAll(/require\("([^"]+)"\)/g)].map(match => match[1]).sort()
  assert.deepEqual(clientRequires, ['react', 'react/jsx-runtime'])
  assert.doesNotMatch(
    client,
    /(?:[A-Za-z]:\\|\/(?:Users|home)\/)[^'"\n]*StoreSection\.module\.css/,
    'client bundle must not contain an absolute checkout path',
  )
  assert.match(hostTypes, /export declare function apply/)
  assert.match(clientTypes, /export declare function apply/)
})
