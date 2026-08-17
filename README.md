# DSH Plugin Store

> 在 DeepSeek Harness 里直接浏览和安装插件

## Web UI

🌐 **[sandbaseai.github.io/dsh-plugin-store](https://sandbaseai.github.io/dsh-plugin-store)**

完全复刻 [dshpluginleaderboard.com](https://dshpluginleaderboard.com) 的设计，展示 Sandbase 出品的 102 个 Cordis 插件。

## 安装

```bash
pnpm add @sandbaseai/dsh-plugin-store
```

在 `cordis.patch.yml` 中启用：

```yaml
- name: '@sandbaseai/dsh-plugin-store'
  config:
    enabled: true
    catalogUrl: https://dshpluginleaderboard.com/api/catalog
```

## 工具

| 工具 | 功能 |
|------|------|
| `store_search` | 搜索插件（按名称/描述/分类） |
| `store_catalog` | 浏览完整目录，按评分/星标/最新排序 |
| `store_install` | 获取任意插件的安装命令 |

启用后 Agent 可以直接调用这些工具从 leaderboard 拉取数据。
