# DSH Plugin Store

> A native plugin marketplace for DeepSeek Harness.

[简体中文](README.zh.md)

[![GitHub stars](https://img.shields.io/github/stars/sandbaseai/dsh-plugin-store?style=flat-square)](https://github.com/sandbaseai/dsh-plugin-store/stargazers)
[![Preview release](https://img.shields.io/github/v/release/sandbaseai/dsh-plugin-store?include_prereleases&style=flat-square&label=preview)](https://github.com/sandbaseai/dsh-plugin-store/releases/tag/v0.1.0-preview.5)
[![DeepSeek Harness](https://img.shields.io/badge/DeepSeek-Harness-2563eb?style=flat-square)](https://github.com/deepseek-ai/deepseek-harness)
[![DSH Plugin Leaderboard](https://img.shields.io/badge/DSH_Leaderboard-listed-111827?style=flat-square)](https://dshpluginleaderboard.com/plugins/sandbaseai-dsh-plugin-store)
[![Catalog](https://img.shields.io/badge/catalog-4%2C000%2B_packages-111827?style=flat-square)](https://dshpluginleaderboard.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-16a34a?style=flat-square)](LICENSE)

![DSH Plugin Store: Discover. Install. Extend.](assets/dsh-plugin-store-social-preview.png)

**Discover, filter, install, and manage community plugins without leaving DeepSeek Harness.**

DSH Plugin Store turns the growing DeepSeek Harness plugin ecosystem into a searchable product experience. It uses live catalog data from [DSH Plugin Leaderboard](https://dshpluginleaderboard.com/) and adds Agent tools for programmatic discovery.

[Preview release](https://github.com/sandbaseai/dsh-plugin-store/releases/tag/v0.1.0-preview.5) · [Leaderboard listing](https://dshpluginleaderboard.com/plugins/sandbaseai-dsh-plugin-store) · [Open the catalog](https://dshpluginleaderboard.com/) · [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) · [Report an issue](https://github.com/sandbaseai/dsh-plugin-store/issues)

## Try the preview

Install the prebuilt Preview 5 tarball into a public DeepSeek Harness
`0.1.0-rc.8` Web profile:

```bash
curl -fL https://github.com/sandbaseai/dsh-plugin-store/releases/download/v0.1.0-preview.5/sandbaseai-dsh-plugin-store-0.1.0-preview.5.tgz -o /tmp/sandbaseai-dsh-plugin-store-0.1.0-preview.5.tgz
dsh plugin --profile web add -w /tmp/sandbaseai-dsh-plugin-store-0.1.0-preview.5.tgz
```

The versioned tarball prevents a later change on `main` from silently changing
the code you install and avoids git dependency build permissions. `-w` confirms
that the Web profile is the pnpm workspace root. Restart DSH Web, open
**Settings**, and select **Store**. This is a preview integration: review the
source before installation.

## What it solves

The DSH ecosystem is growing quickly, but finding a plugin still means searching GitHub, checking compatibility, and copying install commands by hand. DSH Plugin Store creates one discovery layer for developers and agents.

- Browse more than 4,000 plugin packages across 3,400 community repositories
- Search by name, repository, description, or category
- Filter with the complete leaderboard tag taxonomy
- Sort by leaderboard rank, GitHub stars, or weekly growth
- Install catalog entries into a local DSH Web profile
- Inspect plugins already loaded by Cordis
- Let agents search the same catalog through native tools

## Native Store experience

The current native Settings integration targets the public DeepSeek Harness
`0.1.0-rc.8` package boundary and is prepared for upstream collaboration. It includes:

<p align="center">
  <img src="assets/dsh-plugin-store-community-view.png" alt="DSH Plugin Store Community view filtered by the Desktop tag" width="760">
</p>

<p align="center"><em>Real preview: the Community view filtered by the Desktop tag.</em></p>

- `Community` and `Installed` tabs
- Server-side tag filtering and pagination
- Same-origin catalog proxy without browser CORS dependency
- Local profile installation with validation and error feedback
- Live Cordis Loader inventory
- Responsive light and dark UI

The hosted catalog remains available while the native integration is finalized against the public Harness package release.

## Agent tools

| Tool | Purpose |
| --- | --- |
| `store_search` | Search by name, description, and category. |
| `store_catalog` | Browse and rank catalog entries. |
| `store_install` | Return reviewed installation instructions. |

## Reproducible development installation

DeepSeek Harness is evolving rapidly. For the current source integration, clone
this repository into a Harness checkout, install the workspace, and build the
host and Web client faces:

```bash
cd /path/to/deepseek-harness
git clone https://github.com/sandbaseai/dsh-plugin-store.git packages/plugins/dsh-store
pnpm install
pnpm --filter @sandbaseai/dsh-plugin-store typecheck
pnpm --filter @sandbaseai/dsh-plugin-store bundle
```

Then enable the bundle in the Web profile:

```yaml
- insert:
    - id: sandbase-plugin-store
      name: '@sandbaseai/dsh-plugin-store'
      config:
        enabled: true
        catalogUrl: https://dshpluginleaderboard.com/api/catalog
        timeoutMs: 30000
```

The release tarball installs the committed Host and Web client artifacts.
Preview 5 declares public rc.8 runtime peers, uses the rc.8 `insert` patch
schema, and installs only Leaderboard runtime-verified npm package specs. Its
package graph, Host entrypoint, composed profile configuration, and Store-button
installation path are verified in an isolated DSH environment. The
source-checkout path above remains the development route for rebuilding
artifacts inside the Harness workspace.

## Architecture

```mermaid
flowchart LR
  Catalog[Leaderboard API] --> Host[Store Host plugin]
  Host --> Tools[Agent tools]
  Host --> Proxy[Same-origin catalog proxy]
  Proxy --> UI[Native Store UI]
  Inventory[Cordis plugin inventory] --> UI
  UI --> Profile[Local DSH Web profile]
```

## Security

Installing a plugin may download and execute third-party code, including package lifecycle scripts. Review source repositories before installation. Enterprise deployments should place the catalog behind an organizational review and allowlist process.

The native installer validates GitHub repository identifiers, requires the selected catalog entry to be runtime-verified, resolves its exact npm package spec from the Leaderboard detail API, and rejects URLs, git specs, shell syntax, and unverified entries.

Report security issues through GitHub's
[private vulnerability reporting](https://github.com/sandbaseai/dsh-plugin-store/security/advisories/new),
not a public issue. See the full [security policy](SECURITY.md) for supported
versions, trust boundaries, and disclosure guidance.

## Roadmap

- [x] Searchable community catalog
- [x] Agent discovery tools
- [x] Native Community and Installed tabs
- [x] Tag filters, sorting, and pagination
- [x] Local Web profile installer
- [ ] Upstream review with DeepSeek Harness
- [ ] Stable npm release aligned with public DSH packages
- [ ] Update, disable, and uninstall workflows
- [ ] Enterprise catalog allowlists and audit events

## Help us reach 100 stars

If a native plugin marketplace would make DeepSeek Harness more useful for you, [star this repository](https://github.com/sandbaseai/dsh-plugin-store) and share one plugin workflow you want supported.

We are looking for:

- Plugin authors who want better distribution
- Harness users willing to test the native Store
- Enterprise teams with private catalog and audit requirements

Open an [issue](https://github.com/sandbaseai/dsh-plugin-store/issues) or join the discussion through the repository.

## Ecosystem validation

The Store is independently discoverable in community-maintained DeepSeek Harness directories:

- [awesome-deepseek-harness — Plugin Ecosystem & Development](https://github.com/0xsline/awesome-deepseek-harness#plugin-ecosystem--development)
- [awesome-dsh-plugin — Development & Runtime](https://github.com/beancookie/awesome-dsh-plugin)
- [dshfind — public plugin profile](https://dshfind.com/en/plugins/sandbaseai/dsh-plugin-store)
- [DSH 1024Store — source catalog entry](https://github.com/imsai-sh/awesome-deepseek-harness-plugins/blob/main/catalog/plugins/sandbaseai--dsh-plugin-store.json)
- [DSH Plugin Leaderboard](https://dshpluginleaderboard.com/plugins/sandbaseai-dsh-plugin-store)

These listings improve discovery; they are not security endorsements. Install eligibility is determined by the Store's runtime-verification and package-provenance checks.

## Related projects

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
- [DSH Plugin Leaderboard](https://dshpluginleaderboard.com/)
- [Sandbase Harness](https://github.com/sandbaseai/sandbase-harness)
- [DeepSeek Harness Handbook](https://github.com/sandbaseai/deepseek-harness-handbook)

## License

MIT
