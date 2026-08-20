# DSH Plugin Store

[English](README.md)

面向 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的原生插件市场。它使用 [DSH Plugin Leaderboard](https://dshpluginleaderboard.com/) 的社区目录数据，在 Harness Web UI 内提供插件发现、Tag 筛选、本地安装和已安装插件管理。本项目已进入 [Leaderboard 公开目录](https://dshpluginleaderboard.com/plugins/sandbaseai-dsh-plugin-store)。

## 核心能力

- 原生集成到 DSH Settings，不嵌入外部网页
- 按名称、GitHub 仓库、描述和分类搜索
- 使用 Leaderboard API 的完整 Tag Facet 做服务端筛选
- 按排行榜、Stars 和周增长排序
- 使用 `limit`、`offset` 分页加载社区插件
- 一键安装到本地 `web` profile
- 查看 Cordis Loader 中的插件、启用状态和 Fiber 状态
- 为 Agent 提供插件搜索、目录浏览和安装说明工具
- 通过 Host 同源代理获取目录，避免浏览器 CORS 依赖

## 安装

将预构建的 Preview 5 tarball 安装到本地 DSH Web profile：

```bash
curl -fL https://github.com/sandbaseai/dsh-plugin-store/releases/download/v0.1.0-preview.5/sandbaseai-dsh-plugin-store-0.1.0-preview.5.tgz -o /tmp/sandbaseai-dsh-plugin-store-0.1.0-preview.5.tgz
dsh plugin --profile web add -w /tmp/sandbaseai-dsh-plugin-store-0.1.0-preview.5.tgz
```

版本化 tarball 可避免 `main` 后续更新悄然改变实际安装的代码，并绕开 git 依赖的构建授权；`-w` 明确确认 Web profile 是 pnpm workspace 根目录。Preview 5 面向公开的 DeepSeek Harness `0.1.0-rc.8` 运行时。重启 DSH Web 后打开 **Settings → Store**。当前仍是预览集成，安装前请检查源码。

## 可复现的开发安装

如需重新构建产物，请将本仓库克隆到 DeepSeek Harness 源码工作区，再构建 Host 与 Web client：

```bash
cd /path/to/deepseek-harness
git clone https://github.com/sandbaseai/dsh-plugin-store.git packages/plugins/dsh-store
pnpm install
pnpm --filter @sandbaseai/dsh-plugin-store typecheck
pnpm --filter @sandbaseai/dsh-plugin-store bundle
dsh web
```

启动后打开 DSH Settings，选择 **Store**。

Release tarball 安装仓库中已提交的 Host 与 Web client 构建产物。Preview 5 已改用公开 rc.8 运行时 peer 与 rc.8 `insert` patch schema，并且只允许安装 Leaderboard 已完成运行时验证的 npm package spec；package graph、Host 入口、profile 配置合成与 Store 按钮安装路径均在隔离 DSH 环境中验证。源码 checkout 仍用于在 Harness 工作区内重新构建这些产物。

## 配置

```yaml
- insert:
    - id: sandbase-plugin-store
      name: '@sandbaseai/dsh-plugin-store'
      config:
        enabled: true
        catalogUrl: https://dshpluginleaderboard.com/api/catalog
        timeoutMs: 30000
```

## 页面结构

### Community

浏览社区插件，支持搜索、Tag 筛选、排序、分页、源码访问和本地安装。Tag 和分页均使用 Leaderboard 服务端接口，因此筛选结果不局限于当前已经加载的数据。

### Installed

通过类型化的 `pluginInventory` Remote 读取当前 Cordis Loader 清单，展示模块名、Loader Entry ID、启用状态和实时 Fiber 状态。

## Agent Tools

- `store_search`：搜索插件目录
- `store_catalog`：按分类和排序方式浏览插件
- `store_install`：返回指定插件的安装信息

浏览器中的安装按钮会执行本地安装；Agent Tool 默认只返回安装说明，避免 Agent 静默修改运行环境。

## 安全说明

插件安装可能下载并执行第三方代码及 package lifecycle scripts。安装前应检查源码，只使用可信目录，并在企业部署中通过审核和 allowlist 管理 catalog。

- 仅安装到本地 `web` profile
- 仓库必须符合 GitHub `owner/repository` 格式
- 仓库必须先出现在已加载的社区目录中
- 仅允许 Leaderboard 已完成运行时验证的插件
- 安装 spec 必须来自详情 API，且只能是 npm package spec；拒绝 URL、git spec 与 shell 语法
- 新插件需要重启 DSH 后生效

## 开发

```bash
pnpm install
pnpm --dir packages/plugins/dsh-store run typecheck
pnpm --dir packages/plugins/dsh-store run bundle
pnpm dsh web
```

## 生态验证

本项目已被以下社区维护的 DeepSeek Harness 目录独立收录：

- [awesome-deepseek-harness — Plugin Ecosystem & Development](https://github.com/0xsline/awesome-deepseek-harness#plugin-ecosystem--development)
- [awesome-dsh-plugin — 开发与运行时](https://github.com/beancookie/awesome-dsh-plugin)
- [dshfind — 公开插件详情页](https://dshfind.com/zh/plugins/sandbaseai/dsh-plugin-store)
- [DSH 1024Store — 源目录条目](https://github.com/imsai-sh/awesome-deepseek-harness-plugins/blob/main/catalog/plugins/sandbaseai--dsh-plugin-store.json)
- [DSH Plugin Leaderboard](https://dshpluginleaderboard.com/plugins/sandbaseai-dsh-plugin-store)

这些收录用于提升项目发现能力，并不构成安全背书。插件是否允许安装，仍由 Store 的运行时验证和包来源校验决定。

## 相关项目

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
- [DSH Plugin Leaderboard](https://dshpluginleaderboard.com/)
- [Cordis](https://github.com/cordiverse/cordis)

## License

MIT
