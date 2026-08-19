# DSH Plugin Store

[English](README.md)

面向 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的原生插件市场。它使用 [DSH Plugin Leaderboard](https://dshpluginleaderboard.com/) 的社区目录数据，在 Harness Web UI 内提供插件发现、Tag 筛选、本地安装和已安装插件管理。

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

当前原生集成面向 DeepSeek Harness `0.1.0-rc.5` 源码工作区。请先将本仓库克隆到 Harness checkout，再构建 Host 与 Web client：

```bash
cd /path/to/deepseek-harness
git clone https://github.com/sandbaseai/dsh-plugin-store.git packages/plugins/dsh-store
pnpm install
pnpm --filter @sandbaseai/dsh-plugin-store typecheck
pnpm --filter @sandbaseai/dsh-plugin-store bundle
dsh web
```

启动后打开 DSH Settings，选择 **Store**。

等公开 DSH package 版本与当前集成 API 对齐后，再提供稳定 package 安装命令；目前不应把 `dsh plugin add` 描述为已经验证的稳定路径。

## 配置

```yaml
- name: '@sandbaseai/dsh-plugin-store'
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
- 新插件需要重启 DSH 后生效

## 开发

```bash
pnpm install
pnpm --dir packages/plugins/dsh-store run typecheck
pnpm --dir packages/plugins/dsh-store run bundle
pnpm dsh web
```

## 相关项目

- [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
- [DSH Plugin Leaderboard](https://dshpluginleaderboard.com/)
- [Cordis](https://github.com/cordiverse/cordis)

## License

MIT
