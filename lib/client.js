window.__ModuleLoader__.load({ id: "@sandbaseai/dsh-plugin-store", factory: (require) => { var module = { exports: {} }; var exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");

// css-module:src/client/StoreSection.module.css
var tagId = "@sandbaseai/dsh-plugin-store/StoreSection.module.css";
if (!document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]")) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "@sandbaseai/dsh-plugin-store";
  tag.dataset.pluginCss = tagId;
  tag.textContent = '._37Di2q_store{--accent:#2563eb;--line:#e5e7eb;--muted:#6b7280;--subtle:#f6f7f8;max-width:1100px;color:var(--color-text-primary,#171717)}._37Di2q_header{margin-bottom:20px}._37Di2q_header h2{letter-spacing:-.025em;margin:0 0 5px;font-size:23px}._37Di2q_header p{color:var(--muted);margin:0;font-size:13px;line-height:1.5}._37Di2q_tabs{border-bottom:1px solid var(--line);gap:24px;display:flex}._37Di2q_tabs button{color:var(--muted);cursor:pointer;background:0 0;border:0;padding:9px 1px 12px;font:600 13px/1 inherit;position:relative}._37Di2q_tabs button[aria-selected=true]{color:inherit}._37Di2q_tabs button[aria-selected=true]:after{background:var(--accent);content:"";height:2px;position:absolute;bottom:-1px;left:0;right:0}._37Di2q_tabs button:focus-visible,._37Di2q_card button:focus-visible,._37Di2q_loadMore button:focus-visible,._37Di2q_search input:focus-visible,._37Di2q_sort select:focus-visible{outline:2px solid var(--accent);outline-offset:2px}._37Di2q_tabs span{background:var(--subtle);border-radius:6px;margin-left:5px;padding:1px 6px;font-size:10px}._37Di2q_content{padding-top:16px}._37Di2q_toolbar{grid-template-columns:minmax(240px,1.4fr) minmax(150px,.75fr) minmax(190px,.9fr);gap:12px;margin-bottom:14px;display:grid}._37Di2q_search,._37Di2q_sort{min-width:0;color:var(--muted);flex-direction:column;gap:5px;font-size:10px;font-weight:600;display:flex}._37Di2q_search input,._37Di2q_sort select{box-sizing:border-box;border:1px solid var(--line);background:var(--color-bg,#fff);width:100%;height:36px;color:inherit;border-radius:8px;font:12px inherit}._37Di2q_search input{padding:0 11px}._37Di2q_search input::placeholder{color:#9ca3af}._37Di2q_sort select{padding:0 28px 0 10px}._37Di2q_summary{color:var(--muted);justify-content:space-between;margin-bottom:9px;font-size:11px;display:flex}._37Di2q_summary strong{color:inherit;font-variant-numeric:tabular-nums}._37Di2q_notice{color:#1e40af;background:#eff6ff;border:1px solid #bfdbfe;border-radius:9px;margin-top:14px;padding:10px 12px;font-size:12px}._37Di2q_grid{border:1px solid var(--line);background:var(--color-bg,#fff);border-radius:10px;margin:0;padding:0;list-style:none;overflow:hidden}._37Di2q_card{border-bottom:1px solid var(--line);grid-template-columns:42px minmax(360px,1fr) 96px 132px;align-items:center;gap:14px;min-height:88px;padding:11px 13px;transition:background-color .12s;display:grid}._37Di2q_card:last-child{border-bottom:0}._37Di2q_card:hover{background:var(--subtle)}._37Di2q_rank{color:#9ca3af;font-variant-numeric:tabular-nums;align-self:start;padding-top:1px;font:10px/1.4 ui-monospace,SFMono-Regular,monospace}._37Di2q_plugin{min-width:0}._37Di2q_titleLine{grid-template-columns:minmax(110px,max-content) minmax(0,1fr);align-items:baseline;gap:10px;min-width:0;display:grid}._37Di2q_titleLine h3{letter-spacing:-.01em;text-overflow:ellipsis;white-space:nowrap;margin:0;font-size:13px;overflow:hidden}._37Di2q_titleLine code{color:#9ca3af;text-overflow:ellipsis;white-space:nowrap;font:10px/1.4 ui-monospace,SFMono-Regular,monospace;overflow:hidden}._37Di2q_plugin p{color:#5f6368;text-overflow:ellipsis;white-space:nowrap;margin:5px 0 7px;font-size:11px;line-height:1.4;overflow:hidden}._37Di2q_tags{gap:5px;display:flex}._37Di2q_tags span{background:var(--subtle);color:var(--muted);border-radius:5px;padding:2px 6px;font-size:9px;line-height:1.4}._37Di2q_metrics{color:var(--muted);flex-direction:column;align-items:flex-end;font-size:10px;display:flex}._37Di2q_metrics strong{color:inherit;font:600 12px/1.2 ui-monospace,SFMono-Regular,monospace}._37Di2q_metrics small{color:#15803d;white-space:nowrap;margin-top:4px;font-size:8px}._37Di2q_actions{justify-content:flex-end;align-items:center;gap:9px;display:flex}._37Di2q_actions a{color:var(--muted);font-size:10px;text-decoration:none}._37Di2q_actions a:hover{color:inherit}._37Di2q_actions button,._37Di2q_loadMore button,._37Di2q_state button{background:var(--accent);color:#fff;white-space:nowrap;cursor:pointer;border:1px solid #1d4ed8;border-radius:7px;height:29px;padding:0 10px;font:600 10px/1 inherit}._37Di2q_actions button:active,._37Di2q_loadMore button:active,._37Di2q_state button:active{transform:translateY(1px)}._37Di2q_actions button:disabled{border-color:var(--line);background:var(--subtle);color:#9ca3af;cursor:default}._37Di2q_loadMore{justify-content:center;padding:18px 0 4px;display:flex}._37Di2q_loadMore button{border-color:var(--line);background:var(--color-bg,#fff);height:35px;color:inherit}._37Di2q_loadMore button:hover:not(:disabled){border-color:#9ca3af}._37Di2q_loadMore button:disabled{opacity:.55}._37Di2q_state{text-align:center;color:var(--muted);padding:64px 20px;font-size:13px}._37Di2q_skeletons{border:1px solid var(--line);border-radius:11px;overflow:hidden}._37Di2q_skeleton{border-bottom:1px solid var(--line);grid-template-columns:34px 1fr 90px;gap:16px;padding:20px 15px;display:grid}._37Di2q_skeleton:last-child{border-bottom:0}._37Di2q_skeleton>*{background:#eceef1;border-radius:4px;height:10px;animation:1.4s ease-in-out infinite _37Di2q_pulse;display:block}._37Di2q_skeleton span{width:70%}._37Di2q_skeleton b{justify-self:end;width:70px}._37Di2q_installed{border:1px solid var(--line);border-radius:11px;margin:0;padding:0;list-style:none;overflow:hidden}._37Di2q_installed li{border-bottom:1px solid var(--line);justify-content:space-between;align-items:center;gap:20px;padding:12px 14px;display:flex}._37Di2q_installed li:last-child{border-bottom:0}._37Di2q_installed li div{flex-direction:column;gap:3px;min-width:0;display:flex}._37Di2q_installed strong{text-overflow:ellipsis;white-space:nowrap;font-size:12px;overflow:hidden}._37Di2q_installed code{color:#9ca3af;text-overflow:ellipsis;white-space:nowrap;font:10px/1.5 ui-monospace,SFMono-Regular,monospace;overflow:hidden}._37Di2q_installed li>span{background:var(--subtle);color:var(--muted);border-radius:6px;flex:none;padding:3px 7px;font-size:10px}._37Di2q_installed li>span[data-enabled=true]{color:#047857;background:#ecfdf5}._37Di2q_visuallyHidden{clip:rect(0,0,0,0);white-space:nowrap;width:1px;height:1px;position:absolute;overflow:hidden}@keyframes _37Di2q_pulse{0%,to{opacity:.55}50%{opacity:1}}@media (prefers-reduced-motion:reduce){._37Di2q_skeleton>*{animation:none}._37Di2q_card{transition:none}}@media (width<=900px){._37Di2q_toolbar{grid-template-columns:1fr 1fr}._37Di2q_search{grid-column:1/-1}._37Di2q_card{grid-template-columns:32px minmax(0,1fr) 86px 112px}._37Di2q_titleLine{grid-template-columns:1fr}._37Di2q_titleLine code{display:none}}@media (width<=680px){._37Di2q_toolbar{grid-template-columns:1fr}._37Di2q_search{grid-column:auto}._37Di2q_card{grid-template-columns:28px minmax(0,1fr);gap:8px}._37Di2q_metrics{display:none}._37Di2q_actions{grid-column:2;justify-content:space-between}._37Di2q_titleLine{display:block}}@media (prefers-color-scheme:dark){._37Di2q_store{--line:#303236;--muted:#a0a4ab;--subtle:#222428}._37Di2q_search input,._37Di2q_sort select,._37Di2q_grid,._37Di2q_loadMore button{background:#18191b}._37Di2q_plugin p{color:#b1b4ba}._37Di2q_notice{color:#bfdbfe;background:#17243a;border-color:#1e3a5f}._37Di2q_skeleton>*{background:#292c30}._37Di2q_installed li>span[data-enabled=true]{color:#6ee7b7;background:#123127}}';
  document.head.appendChild(tag);
}
var StoreSection_default = { "loadMore": "_37Di2q_loadMore", "content": "_37Di2q_content", "plugin": "_37Di2q_plugin", "card": "_37Di2q_card", "search": "_37Di2q_search", "summary": "_37Di2q_summary", "skeletons": "_37Di2q_skeletons", "header": "_37Di2q_header", "skeleton": "_37Di2q_skeleton", "actions": "_37Di2q_actions", "grid": "_37Di2q_grid", "sort": "_37Di2q_sort", "toolbar": "_37Di2q_toolbar", "pulse": "_37Di2q_pulse", "metrics": "_37Di2q_metrics", "store": "_37Di2q_store", "tabs": "_37Di2q_tabs", "rank": "_37Di2q_rank", "notice": "_37Di2q_notice", "titleLine": "_37Di2q_titleLine", "installed": "_37Di2q_installed", "visuallyHidden": "_37Di2q_visuallyHidden", "state": "_37Di2q_state", "tags": "_37Di2q_tags" };

// src/client/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
async function json(url, init) {
  const response = await fetch(url, init);
  const body = await response.json();
  if (!response.ok) throw new Error(body.error ?? `HTTP ${response.status}`);
  return body;
}
function StoreSection({ listInstalled }) {
  const [tab, setTab] = (0, import_react.useState)("community");
  const [query, setQuery] = (0, import_react.useState)("");
  const [sort, setSort] = (0, import_react.useState)("rank");
  const [category, setCategory] = (0, import_react.useState)("");
  const [categories, setCategories] = (0, import_react.useState)([]);
  const [catalog, setCatalog] = (0, import_react.useState)({ status: "loading" });
  const [installed, setInstalled] = (0, import_react.useState)([]);
  const [installing, setInstalling] = (0, import_react.useState)();
  const [loadingMore, setLoadingMore] = (0, import_react.useState)(false);
  const [notice, setNotice] = (0, import_react.useState)();
  const loadCatalog = (selectedCategory = category) => {
    setCatalog({ status: "loading" });
    const categoryParam = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : "";
    void json(`/api/plugin-store/catalog?limit=50&offset=0${categoryParam}`).then(
      (value) => {
        setCategories(value.categories);
        setCatalog({ status: "ready", items: value.items, total: value.total, categories: value.categories });
      },
      (error) => {
        setCatalog({ status: "error", message: error instanceof Error ? error.message : String(error) });
      }
    );
  };
  const loadMore = async () => {
    if (catalog.status !== "ready" || loadingMore) return;
    setLoadingMore(true);
    try {
      const categoryParam = category ? `&category=${encodeURIComponent(category)}` : "";
      const value = await json(`/api/plugin-store/catalog?limit=50&offset=${catalog.items.length}${categoryParam}`);
      setCatalog({ status: "ready", items: [...catalog.items, ...value.items], total: value.total, categories: value.categories.length > 0 ? value.categories : catalog.categories });
    } catch (error) {
      setNotice(`Could not load more plugins: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoadingMore(false);
    }
  };
  const loadInstalled = () => {
    void listInstalled().then(setInstalled, () => {
      setInstalled([]);
    });
  };
  (0, import_react.useEffect)(loadCatalog, []);
  (0, import_react.useEffect)(loadInstalled, [listInstalled]);
  const normalized = query.trim().toLocaleLowerCase();
  const visible = (0, import_react.useMemo)(() => {
    if (catalog.status !== "ready") return [];
    const filtered = catalog.items.filter((item) => normalized.length === 0 || [item.name, item.repository, item.description, ...item.categories].some((value) => value.toLocaleLowerCase().includes(normalized)));
    return [...filtered].sort((a, b) => sort === "stars" ? b.stars - a.stars : sort === "growth" ? b.stars7dDelta - a.stars7dDelta : a.rank - b.rank);
  }, [catalog, category, normalized, sort]);
  const installedNames = (0, import_react.useMemo)(() => new Set(installed.map((item) => item.moduleName.toLocaleLowerCase())), [installed]);
  const install = async (plugin) => {
    setInstalling(plugin.repository);
    setNotice(void 0);
    try {
      const installed2 = await json("/api/plugin-store/install", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ repository: plugin.repository })
      });
      setNotice(`${plugin.name} was installed to the ${installed2.profile} profile.${installed2.application === "restart-required" ? " Restart DSH to activate it." : ""}`);
      loadInstalled();
    } catch (error) {
      setNotice(`Installation failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setInstalling(void 0);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: StoreSection_default.store, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: StoreSection_default.header, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Plugin Store" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Discover and install extensions built by the DSH community." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: StoreSection_default.tabs, role: "tablist", "aria-label": "Store views", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", role: "tab", "aria-selected": tab === "community", onClick: () => {
        setTab("community");
      }, children: "Community" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { type: "button", role: "tab", "aria-selected": tab === "installed", onClick: () => {
        setTab("installed");
        loadInstalled();
      }, children: [
        "Installed ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: installed.length })
      ] })
    ] }),
    notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: StoreSection_default.notice, role: "status", children: notice }) : null,
    tab === "community" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: StoreSection_default.content, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: StoreSection_default.toolbar, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: StoreSection_default.search, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Search" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "search", value: query, placeholder: "Name or repository", onChange: (event) => {
            setQuery(event.currentTarget.value);
          } })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: StoreSection_default.sort, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tag" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: category, onChange: (event) => {
            const value = event.currentTarget.value;
            setCategory(value);
            loadCatalog(value);
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "All tags" }),
            categories.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value, children: value }, value))
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: StoreSection_default.sort, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sort" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: sort, onChange: (event) => {
            setSort(event.currentTarget.value);
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "rank", children: "Leaderboard rank" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "stars", children: "Most stars" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "growth", children: "Trending this week" })
          ] })
        ] })
      ] }),
      catalog.status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: StoreSection_default.skeletons, "aria-label": "Loading the community catalog", children: Array.from({ length: 5 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: StoreSection_default.skeleton, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {})
      ] }, index)) }) : null,
      catalog.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: StoreSection_default.state, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
          "Could not load the catalog: ",
          catalog.message
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", onClick: () => {
          loadCatalog();
        }, children: "Retry" })
      ] }) : null,
      catalog.status === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: StoreSection_default.summary, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: catalog.items.length.toLocaleString() }),
            " of ",
            catalog.total.toLocaleString(),
            " plugins loaded"
          ] }),
          normalized || category ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
            visible.length.toLocaleString(),
            " matches"
          ] }) : null
        ] }),
        visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: StoreSection_default.state, children: "No matching plugins." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: StoreSection_default.grid, children: visible.map((plugin) => {
          const isInstalled = installedNames.has(plugin.name.toLocaleLowerCase()) || installedNames.has(plugin.repository.toLocaleLowerCase());
          const isVerified = plugin.verificationStatus === "verified";
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: StoreSection_default.card, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: StoreSection_default.rank, children: [
              "#",
              plugin.rank || "-"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: StoreSection_default.plugin, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: StoreSection_default.titleLine, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: plugin.name }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: plugin.repository })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: plugin.description || "No description available." }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: StoreSection_default.tags, children: plugin.categories.slice(0, 2).map((category2) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: category2 }, category2)) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: StoreSection_default.metrics, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: plugin.stars.toLocaleString() }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "stars" }),
              plugin.stars7dDelta > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
                "+",
                plugin.stars7dDelta.toLocaleString(),
                " this week"
              ] }) : null
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: StoreSection_default.actions, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: `https://github.com/${plugin.repository}`, target: "_blank", rel: "noreferrer", children: "Source" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", disabled: isInstalled || !isVerified || installing !== void 0, title: isVerified ? "Install the runtime-verified package" : "Leaderboard runtime verification is required", onClick: () => {
                void install(plugin);
              }, children: isInstalled ? "Installed" : !isVerified ? "Unverified" : installing === plugin.repository ? "Installing..." : "Install" })
            ] })
          ] }, plugin.repository);
        }) }),
        catalog.items.length < catalog.total && normalized.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: StoreSection_default.loadMore, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", disabled: loadingMore, onClick: () => {
          void loadMore();
        }, children: loadingMore ? "Loading\u2026" : "Load more" }) }) : null
      ] }) : null
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: StoreSection_default.content, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: StoreSection_default.summary, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: installed.length }),
        " Loader plugins"
      ] }),
      installed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: StoreSection_default.state, children: "No installed plugins are available." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: StoreSection_default.installed, children: installed.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.moduleName }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: item.entryId })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "data-enabled": item.enabled, children: item.enabled ? item.fiberPhase === "active" ? "Running" : "Enabled" : "Disabled" })
      ] }, item.entryId)) })
    ] })
  ] });
}
var inject = ["slots", "remote", "remote.pluginInventory"];
function apply(ctx) {
  const listInstalled = async () => {
    const result = await ctx.remote.pluginInventory.list();
    if (!result.ok) throw new Error(result.error.message);
    return [...result.value.entries];
  };
  ctx.slots.inject("plugins.tab", () => ctx.slots.register({
    name: "plugins.tab",
    id: "plugin-store",
    order: 120,
    label: () => "Store",
    inject: () => ({ listInstalled })
  }, StoreSection));
}
return module.exports; } });
