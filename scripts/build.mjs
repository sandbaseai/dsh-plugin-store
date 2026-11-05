import { build } from 'esbuild'
import { transform } from 'lightningcss'
import { readFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'

const id = '@sandbaseai/dsh-plugin-store'
await build({
  entryPoints: ['src/index.ts'], outfile: 'lib/index.js', bundle: true,
  platform: 'node', format: 'esm', target: 'node22', packages: 'external',
})
await build({
  entryPoints: ['src/client/index.tsx'], outfile: 'lib/client.js', bundle: true,
  platform: 'browser', format: 'cjs', target: 'es2022',
  external: ['react', 'react/jsx-runtime'],
  define: { 'process.env.NODE_ENV': '"production"' },
  banner: { js: `window.__ModuleLoader__.load({ id: ${JSON.stringify(id)}, factory: (require) => { var module = { exports: {} }; var exports = module.exports;` },
  footer: { js: 'return module.exports; } });' },
  plugins: [{
    name: 'inline-css-modules',
    setup(builder) {
      builder.onResolve({ filter: /\.module\.css$/ }, args => ({ path: resolve(args.resolveDir, args.path), namespace: 'css-module' }))
      builder.onLoad({ filter: /.*/, namespace: 'css-module' }, async args => {
        const result = transform({ filename: basename(args.path), code: await readFile(args.path), cssModules: true, minify: true })
        const classes = Object.fromEntries(Object.entries(result.exports ?? {}).map(([name, value]) => [name, value.name]))
        const tagId = `${id}/${basename(args.path)}`
        return { loader: 'js', contents: `
          const tagId = ${JSON.stringify(tagId)};
          if (!document.querySelector('style[data-plugin-css=' + JSON.stringify(tagId) + ']')) {
            const tag = document.createElement('style');
            tag.dataset.plugin = ${JSON.stringify(id)};
            tag.dataset.pluginCss = tagId;
            tag.textContent = ${JSON.stringify(result.code.toString())};
            document.head.appendChild(tag);
          }
          export default ${JSON.stringify(classes)};
        ` }
      })
    },
  }],
})
