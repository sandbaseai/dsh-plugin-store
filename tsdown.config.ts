import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { basename, dirname, relative, resolve, sep } from 'node:path'
import { transform } from 'lightningcss'
import { defineConfig } from 'tsdown'

const packageId = '@sandbaseai/dsh-plugin-store'
const cssPrefix = '\0dsh-css:'
const cssSuffix = '.mjs'
const typesMarker = `${sep}lib${sep}types${sep}`
const clientExternals = new Set(['react', 'react/jsx-runtime'])
const cssFiles = new Map<string, string>()

function sourceAssetPath(source: string, importer: string): string {
  const emittedPath = resolve(dirname(importer), source)
  if (existsSync(emittedPath)) return emittedPath

  const boundary = emittedPath.indexOf(typesMarker)
  if (boundary < 0) return emittedPath
  return resolve(
    emittedPath.slice(0, boundary),
    'src',
    emittedPath.slice(boundary + typesMarker.length),
  )
}

function cssModule(id: string, source: string, classes: Readonly<Record<string, string>>): string {
  const tagId = `${packageId}/${basename(id)}`
  return [
    `const css = ${JSON.stringify(source)};`,
    `const tagId = ${JSON.stringify(tagId)};`,
    'if (typeof document !== \'undefined\' && document.querySelector(\'style[data-plugin-css=\' + JSON.stringify(tagId) + \']\') === null) {',
    '  const tag = document.createElement(\'style\');',
    `  tag.dataset.plugin = ${JSON.stringify(packageId)};`,
    '  tag.dataset.pluginCss = tagId;',
    '  tag.textContent = css;',
    '  document.head.appendChild(tag);',
    '}',
    `export default ${JSON.stringify(classes)};`,
  ].join('\n')
}

export default defineConfig([
  {
    name: packageId,
    entry: ['lib/types/index.js'],
    outDir: 'lib',
    format: 'esm',
    platform: 'node',
    target: 'es2024',
    fixedExtension: false,
    dts: false,
    clean: false,
    deps: { neverBundle: true },
  },
  {
    name: `${packageId}/client`,
    entry: { client: 'lib/types/client/index.js' },
    outDir: 'lib',
    format: 'cjs',
    platform: 'browser',
    target: 'es2024',
    dts: false,
    sourcemap: true,
    clean: false,
    deps: {
      neverBundle: specifier => clientExternals.has(specifier),
      alwaysBundle: specifier => !clientExternals.has(specifier),
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
      'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV ?? 'production'),
      'import.meta.env': JSON.stringify({ MODE: process.env.NODE_ENV ?? 'production' }),
    },
    plugins: [{
      name: 'dsh-css-modules-inline',
      resolveId(source, importer) {
        if (!source.endsWith('.module.css') || importer === undefined) return null
        const file = sourceAssetPath(source, importer)
        const logicalPath = relative(process.cwd(), file).split(sep).join('/')
        const virtualId = cssPrefix + logicalPath + cssSuffix
        cssFiles.set(virtualId, file)
        return virtualId
      },
      async load(virtualId) {
        if (!virtualId.startsWith(cssPrefix)) return null
        const file = cssFiles.get(virtualId)
        if (file === undefined) throw new Error(`Unknown CSS module: ${virtualId}`)
        const logicalPath = virtualId.slice(cssPrefix.length, -cssSuffix.length)
        this.addWatchFile(file)
        const result = transform({
          filename: logicalPath,
          code: await readFile(file),
          cssModules: { pattern: '[hash]_[local]' },
          minify: true,
        })
        const classes: Record<string, string> = {}
        const entries = Object.entries(result.exports ?? {}).sort(([left], [right]) => left.localeCompare(right))
        for (const [local, value] of entries) {
          classes[local] = value.name
        }
        return cssModule(logicalPath, result.code.toString(), classes)
      },
    }],
    outputOptions: {
      entryFileNames: 'client.js',
      banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(packageId)}, factory: (require) => {`,
      footer: 'return module.exports; } });',
      intro: 'var module = { exports: {} }; var exports = module.exports;',
    },
  },
])
