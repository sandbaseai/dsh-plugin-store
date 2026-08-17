# DSH Plugin Store

> 在 DeepSeek Harness 里直接浏览和安装插件

## 功能介绍

DSH Plugin Store 连接 [dshpluginleaderboard.com](https://dshpluginleaderboard.com)，在 DSH 里提供 3 个工具：

| 工具 | 功能 |
|------|------|
| `store_search` | 搜索插件（按名称/描述/分类） |
| `store_catalog` | 浏览完整目录，按评分/星标/最新排序 |
| `store_install` | 获取任意插件的安装命令 |

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

## 使用

启用后，Agent 可以直接调用：

```
> 搜索 UI 相关的插件
→ store_search(query: "UI", category: "UI Enhancements")

> 安装 dsh-status-rotator
→ store_install(name: "dsh-status-rotator")
```
