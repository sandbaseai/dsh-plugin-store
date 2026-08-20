window.__ModuleLoader__.load({
	id: "@sandbaseai/dsh-plugin-store",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		//#region \0dsh-css:/Users/liyb/deepseek/deepseek-harness/packages/plugins/dsh-store/src/client/StoreSection.module.css.mjs
		const css = ".pF5vrG_store{--accent:#2563eb;--line:#e5e7eb;--muted:#6b7280;--subtle:#f6f7f8;max-width:1100px;color:var(--color-text-primary,#171717)}.pF5vrG_header{margin-bottom:20px}.pF5vrG_header h2{letter-spacing:-.025em;margin:0 0 5px;font-size:23px}.pF5vrG_header p{color:var(--muted);margin:0;font-size:13px;line-height:1.5}.pF5vrG_tabs{border-bottom:1px solid var(--line);gap:24px;display:flex}.pF5vrG_tabs button{color:var(--muted);cursor:pointer;background:0 0;border:0;padding:9px 1px 12px;font:600 13px/1 inherit;position:relative}.pF5vrG_tabs button[aria-selected=true]{color:inherit}.pF5vrG_tabs button[aria-selected=true]:after{background:var(--accent);content:\"\";height:2px;position:absolute;bottom:-1px;left:0;right:0}.pF5vrG_tabs button:focus-visible,.pF5vrG_card button:focus-visible,.pF5vrG_loadMore button:focus-visible,.pF5vrG_search input:focus-visible,.pF5vrG_sort select:focus-visible{outline:2px solid var(--accent);outline-offset:2px}.pF5vrG_tabs span{background:var(--subtle);border-radius:6px;margin-left:5px;padding:1px 6px;font-size:10px}.pF5vrG_content{padding-top:16px}.pF5vrG_toolbar{grid-template-columns:minmax(240px,1.4fr) minmax(150px,.75fr) minmax(190px,.9fr);gap:12px;margin-bottom:14px;display:grid}.pF5vrG_search,.pF5vrG_sort{min-width:0;color:var(--muted);flex-direction:column;gap:5px;font-size:10px;font-weight:600;display:flex}.pF5vrG_search input,.pF5vrG_sort select{box-sizing:border-box;border:1px solid var(--line);background:var(--color-bg,#fff);width:100%;height:36px;color:inherit;border-radius:8px;font:12px inherit}.pF5vrG_search input{padding:0 11px}.pF5vrG_search input::placeholder{color:#9ca3af}.pF5vrG_sort select{padding:0 28px 0 10px}.pF5vrG_summary{color:var(--muted);justify-content:space-between;margin-bottom:9px;font-size:11px;display:flex}.pF5vrG_summary strong{color:inherit;font-variant-numeric:tabular-nums}.pF5vrG_notice{color:#1e40af;background:#eff6ff;border:1px solid #bfdbfe;border-radius:9px;margin-top:14px;padding:10px 12px;font-size:12px}.pF5vrG_grid{border:1px solid var(--line);background:var(--color-bg,#fff);border-radius:10px;margin:0;padding:0;list-style:none;overflow:hidden}.pF5vrG_card{border-bottom:1px solid var(--line);grid-template-columns:42px minmax(360px,1fr) 96px 132px;align-items:center;gap:14px;min-height:88px;padding:11px 13px;transition:background-color .12s;display:grid}.pF5vrG_card:last-child{border-bottom:0}.pF5vrG_card:hover{background:var(--subtle)}.pF5vrG_rank{color:#9ca3af;font-variant-numeric:tabular-nums;align-self:start;padding-top:1px;font:10px/1.4 ui-monospace,SFMono-Regular,monospace}.pF5vrG_plugin{min-width:0}.pF5vrG_titleLine{grid-template-columns:minmax(110px,max-content) minmax(0,1fr);align-items:baseline;gap:10px;min-width:0;display:grid}.pF5vrG_titleLine h3{letter-spacing:-.01em;text-overflow:ellipsis;white-space:nowrap;margin:0;font-size:13px;overflow:hidden}.pF5vrG_titleLine code{color:#9ca3af;text-overflow:ellipsis;white-space:nowrap;font:10px/1.4 ui-monospace,SFMono-Regular,monospace;overflow:hidden}.pF5vrG_plugin p{color:#5f6368;text-overflow:ellipsis;white-space:nowrap;margin:5px 0 7px;font-size:11px;line-height:1.4;overflow:hidden}.pF5vrG_tags{gap:5px;display:flex}.pF5vrG_tags span{background:var(--subtle);color:var(--muted);border-radius:5px;padding:2px 6px;font-size:9px;line-height:1.4}.pF5vrG_metrics{color:var(--muted);flex-direction:column;align-items:flex-end;font-size:10px;display:flex}.pF5vrG_metrics strong{color:inherit;font:600 12px/1.2 ui-monospace,SFMono-Regular,monospace}.pF5vrG_metrics small{color:#15803d;white-space:nowrap;margin-top:4px;font-size:8px}.pF5vrG_actions{justify-content:flex-end;align-items:center;gap:9px;display:flex}.pF5vrG_actions a{color:var(--muted);font-size:10px;text-decoration:none}.pF5vrG_actions a:hover{color:inherit}.pF5vrG_actions button,.pF5vrG_loadMore button,.pF5vrG_state button{background:var(--accent);color:#fff;white-space:nowrap;cursor:pointer;border:1px solid #1d4ed8;border-radius:7px;height:29px;padding:0 10px;font:600 10px/1 inherit}.pF5vrG_actions button:active,.pF5vrG_loadMore button:active,.pF5vrG_state button:active{transform:translateY(1px)}.pF5vrG_actions button:disabled{border-color:var(--line);background:var(--subtle);color:#9ca3af;cursor:default}.pF5vrG_loadMore{justify-content:center;padding:18px 0 4px;display:flex}.pF5vrG_loadMore button{border-color:var(--line);background:var(--color-bg,#fff);height:35px;color:inherit}.pF5vrG_loadMore button:hover:not(:disabled){border-color:#9ca3af}.pF5vrG_loadMore button:disabled{opacity:.55}.pF5vrG_state{text-align:center;color:var(--muted);padding:64px 20px;font-size:13px}.pF5vrG_skeletons{border:1px solid var(--line);border-radius:11px;overflow:hidden}.pF5vrG_skeleton{border-bottom:1px solid var(--line);grid-template-columns:34px 1fr 90px;gap:16px;padding:20px 15px;display:grid}.pF5vrG_skeleton:last-child{border-bottom:0}.pF5vrG_skeleton>*{background:#eceef1;border-radius:4px;height:10px;animation:1.4s ease-in-out infinite pF5vrG_pulse;display:block}.pF5vrG_skeleton span{width:70%}.pF5vrG_skeleton b{justify-self:end;width:70px}.pF5vrG_installed{border:1px solid var(--line);border-radius:11px;margin:0;padding:0;list-style:none;overflow:hidden}.pF5vrG_installed li{border-bottom:1px solid var(--line);justify-content:space-between;align-items:center;gap:20px;padding:12px 14px;display:flex}.pF5vrG_installed li:last-child{border-bottom:0}.pF5vrG_installed li div{flex-direction:column;gap:3px;min-width:0;display:flex}.pF5vrG_installed strong{text-overflow:ellipsis;white-space:nowrap;font-size:12px;overflow:hidden}.pF5vrG_installed code{color:#9ca3af;text-overflow:ellipsis;white-space:nowrap;font:10px/1.5 ui-monospace,SFMono-Regular,monospace;overflow:hidden}.pF5vrG_installed li>span{background:var(--subtle);color:var(--muted);border-radius:6px;flex:none;padding:3px 7px;font-size:10px}.pF5vrG_installed li>span[data-enabled=true]{color:#047857;background:#ecfdf5}.pF5vrG_visuallyHidden{clip:rect(0,0,0,0);white-space:nowrap;width:1px;height:1px;position:absolute;overflow:hidden}@keyframes pF5vrG_pulse{0%,to{opacity:.55}50%{opacity:1}}@media (prefers-reduced-motion:reduce){.pF5vrG_skeleton>*{animation:none}.pF5vrG_card{transition:none}}@media (width<=900px){.pF5vrG_toolbar{grid-template-columns:1fr 1fr}.pF5vrG_search{grid-column:1/-1}.pF5vrG_card{grid-template-columns:32px minmax(0,1fr) 86px 112px}.pF5vrG_titleLine{grid-template-columns:1fr}.pF5vrG_titleLine code{display:none}}@media (width<=680px){.pF5vrG_toolbar{grid-template-columns:1fr}.pF5vrG_search{grid-column:auto}.pF5vrG_card{grid-template-columns:28px minmax(0,1fr);gap:8px}.pF5vrG_metrics{display:none}.pF5vrG_actions{grid-column:2;justify-content:space-between}.pF5vrG_titleLine{display:block}}@media (prefers-color-scheme:dark){.pF5vrG_store{--line:#303236;--muted:#a0a4ab;--subtle:#222428}.pF5vrG_search input,.pF5vrG_sort select,.pF5vrG_grid,.pF5vrG_loadMore button{background:#18191b}.pF5vrG_plugin p{color:#b1b4ba}.pF5vrG_notice{color:#bfdbfe;background:#17243a;border-color:#1e3a5f}.pF5vrG_skeleton>*{background:#292c30}.pF5vrG_installed li>span[data-enabled=true]{color:#6ee7b7;background:#123127}}";
		const tagId = "@sandbaseai/dsh-plugin-store/StoreSection.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@sandbaseai/dsh-plugin-store";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var StoreSection_module_css_default = {
			"skeletons": "pF5vrG_skeletons",
			"installed": "pF5vrG_installed",
			"rank": "pF5vrG_rank",
			"header": "pF5vrG_header",
			"loadMore": "pF5vrG_loadMore",
			"content": "pF5vrG_content",
			"tabs": "pF5vrG_tabs",
			"plugin": "pF5vrG_plugin",
			"pulse": "pF5vrG_pulse",
			"store": "pF5vrG_store",
			"metrics": "pF5vrG_metrics",
			"toolbar": "pF5vrG_toolbar",
			"summary": "pF5vrG_summary",
			"titleLine": "pF5vrG_titleLine",
			"grid": "pF5vrG_grid",
			"search": "pF5vrG_search",
			"tags": "pF5vrG_tags",
			"skeleton": "pF5vrG_skeleton",
			"notice": "pF5vrG_notice",
			"actions": "pF5vrG_actions",
			"visuallyHidden": "pF5vrG_visuallyHidden",
			"sort": "pF5vrG_sort",
			"card": "pF5vrG_card",
			"state": "pF5vrG_state"
		};
		//#endregion
		//#region lib/types/client/index.js
		async function json(url, init) {
			const response = await fetch(url, init);
			const body = await response.json();
			if (!response.ok) throw new Error(body.error ?? `HTTP ${response.status}`);
			return body;
		}
		function StoreSection({ listInstalled }) {
			const [tab, setTab] = (0, react.useState)("community");
			const [query, setQuery] = (0, react.useState)("");
			const [sort, setSort] = (0, react.useState)("rank");
			const [category, setCategory] = (0, react.useState)("");
			const [categories, setCategories] = (0, react.useState)([]);
			const [catalog, setCatalog] = (0, react.useState)({ status: "loading" });
			const [installed, setInstalled] = (0, react.useState)([]);
			const [installing, setInstalling] = (0, react.useState)();
			const [loadingMore, setLoadingMore] = (0, react.useState)(false);
			const [notice, setNotice] = (0, react.useState)();
			const loadCatalog = (selectedCategory = category) => {
				setCatalog({ status: "loading" });
				json(`/api/plugin-store/catalog?limit=50&offset=0${selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ""}`).then((value) => {
					setCategories(value.categories);
					setCatalog({
						status: "ready",
						items: value.items,
						total: value.total,
						categories: value.categories
					});
				}, (error) => {
					setCatalog({
						status: "error",
						message: error instanceof Error ? error.message : String(error)
					});
				});
			};
			const loadMore = async () => {
				if (catalog.status !== "ready" || loadingMore) return;
				setLoadingMore(true);
				try {
					const categoryParam = category ? `&category=${encodeURIComponent(category)}` : "";
					const value = await json(`/api/plugin-store/catalog?limit=50&offset=${catalog.items.length}${categoryParam}`);
					setCatalog({
						status: "ready",
						items: [...catalog.items, ...value.items],
						total: value.total,
						categories: value.categories.length > 0 ? value.categories : catalog.categories
					});
				} catch (error) {
					setNotice(`Could not load more plugins: ${error instanceof Error ? error.message : String(error)}`);
				} finally {
					setLoadingMore(false);
				}
			};
			const loadInstalled = () => {
				listInstalled().then(setInstalled, () => {
					setInstalled([]);
				});
			};
			(0, react.useEffect)(loadCatalog, []);
			(0, react.useEffect)(loadInstalled, [listInstalled]);
			const normalized = query.trim().toLocaleLowerCase();
			const visible = (0, react.useMemo)(() => {
				if (catalog.status !== "ready") return [];
				return [...catalog.items.filter((item) => normalized.length === 0 || [
					item.name,
					item.repository,
					item.description,
					...item.categories
				].some((value) => value.toLocaleLowerCase().includes(normalized)))].sort((a, b) => sort === "stars" ? b.stars - a.stars : sort === "growth" ? b.stars7dDelta - a.stars7dDelta : a.rank - b.rank);
			}, [
				catalog,
				category,
				normalized,
				sort
			]);
			const installedNames = (0, react.useMemo)(() => new Set(installed.map((item) => item.moduleName.toLocaleLowerCase())), [installed]);
			const install = async (plugin) => {
				setInstalling(plugin.repository);
				setNotice(void 0);
				try {
					await json("/api/plugin-store/install", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({ repository: plugin.repository })
					});
					setNotice(`${plugin.name} was installed to the web profile. Restart DSH to activate it.`);
					loadInstalled();
				} catch (error) {
					setNotice(`Installation failed: ${error instanceof Error ? error.message : String(error)}`);
				} finally {
					setInstalling(void 0);
				}
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: StoreSection_module_css_default.store,
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: StoreSection_module_css_default.header,
						children: [(0, react_jsx_runtime.jsx)("h2", { children: "Plugin Store" }), (0, react_jsx_runtime.jsx)("p", { children: "Discover and install extensions built by the DSH community." })]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: StoreSection_module_css_default.tabs,
						role: "tablist",
						"aria-label": "Store views",
						children: [(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": tab === "community",
							onClick: () => {
								setTab("community");
							},
							children: "Community"
						}), (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							role: "tab",
							"aria-selected": tab === "installed",
							onClick: () => {
								setTab("installed");
								loadInstalled();
							},
							children: ["Installed ", (0, react_jsx_runtime.jsx)("span", { children: installed.length })]
						})]
					}),
					notice ? (0, react_jsx_runtime.jsx)("div", {
						className: StoreSection_module_css_default.notice,
						role: "status",
						children: notice
					}) : null,
					tab === "community" ? (0, react_jsx_runtime.jsxs)("section", {
						className: StoreSection_module_css_default.content,
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								className: StoreSection_module_css_default.toolbar,
								children: [
									(0, react_jsx_runtime.jsxs)("label", {
										className: StoreSection_module_css_default.search,
										children: [(0, react_jsx_runtime.jsx)("span", { children: "Search" }), (0, react_jsx_runtime.jsx)("input", {
											type: "search",
											value: query,
											placeholder: "Name or repository",
											onChange: (event) => {
												setQuery(event.currentTarget.value);
											}
										})]
									}),
									(0, react_jsx_runtime.jsxs)("label", {
										className: StoreSection_module_css_default.sort,
										children: [(0, react_jsx_runtime.jsx)("span", { children: "Tag" }), (0, react_jsx_runtime.jsxs)("select", {
											value: category,
											onChange: (event) => {
												const value = event.currentTarget.value;
												setCategory(value);
												loadCatalog(value);
											},
											children: [(0, react_jsx_runtime.jsx)("option", {
												value: "",
												children: "All tags"
											}), categories.map((value) => (0, react_jsx_runtime.jsx)("option", {
												value,
												children: value
											}, value))]
										})]
									}),
									(0, react_jsx_runtime.jsxs)("label", {
										className: StoreSection_module_css_default.sort,
										children: [(0, react_jsx_runtime.jsx)("span", { children: "Sort" }), (0, react_jsx_runtime.jsxs)("select", {
											value: sort,
											onChange: (event) => {
												setSort(event.currentTarget.value);
											},
											children: [
												(0, react_jsx_runtime.jsx)("option", {
													value: "rank",
													children: "Leaderboard rank"
												}),
												(0, react_jsx_runtime.jsx)("option", {
													value: "stars",
													children: "Most stars"
												}),
												(0, react_jsx_runtime.jsx)("option", {
													value: "growth",
													children: "Trending this week"
												})
											]
										})]
									})
								]
							}),
							catalog.status === "loading" ? (0, react_jsx_runtime.jsx)("div", {
								className: StoreSection_module_css_default.skeletons,
								"aria-label": "Loading the community catalog",
								children: Array.from({ length: 5 }, (_, index) => (0, react_jsx_runtime.jsxs)("div", {
									className: StoreSection_module_css_default.skeleton,
									children: [
										(0, react_jsx_runtime.jsx)("i", {}),
										(0, react_jsx_runtime.jsx)("span", {}),
										(0, react_jsx_runtime.jsx)("b", {})
									]
								}, index))
							}) : null,
							catalog.status === "error" ? (0, react_jsx_runtime.jsxs)("div", {
								className: StoreSection_module_css_default.state,
								children: [(0, react_jsx_runtime.jsxs)("p", { children: ["Could not load the catalog: ", catalog.message] }), (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										loadCatalog();
									},
									children: "Retry"
								})]
							}) : null,
							catalog.status === "ready" ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								(0, react_jsx_runtime.jsxs)("div", {
									className: StoreSection_module_css_default.summary,
									children: [(0, react_jsx_runtime.jsxs)("span", { children: [
										(0, react_jsx_runtime.jsx)("strong", { children: catalog.items.length.toLocaleString() }),
										" of ",
										catalog.total.toLocaleString(),
										" plugins loaded"
									] }), normalized || category ? (0, react_jsx_runtime.jsxs)("span", { children: [visible.length.toLocaleString(), " matches"] }) : null]
								}),
								visible.length === 0 ? (0, react_jsx_runtime.jsx)("p", {
									className: StoreSection_module_css_default.state,
									children: "No matching plugins."
								}) : (0, react_jsx_runtime.jsx)("ul", {
									className: StoreSection_module_css_default.grid,
									children: visible.map((plugin) => {
										const isInstalled = installedNames.has(plugin.name.toLocaleLowerCase()) || installedNames.has(plugin.repository.toLocaleLowerCase());
										const isVerified = plugin.verificationStatus === "verified";
										return (0, react_jsx_runtime.jsxs)("li", {
											className: StoreSection_module_css_default.card,
											children: [
												(0, react_jsx_runtime.jsxs)("span", {
													className: StoreSection_module_css_default.rank,
													children: ["#", plugin.rank || "-"]
												}),
												(0, react_jsx_runtime.jsxs)("div", {
													className: StoreSection_module_css_default.plugin,
													children: [
														(0, react_jsx_runtime.jsxs)("div", {
															className: StoreSection_module_css_default.titleLine,
															children: [(0, react_jsx_runtime.jsx)("h3", { children: plugin.name }), (0, react_jsx_runtime.jsx)("code", { children: plugin.repository })]
														}),
														(0, react_jsx_runtime.jsx)("p", { children: plugin.description || "No description available." }),
														(0, react_jsx_runtime.jsx)("div", {
															className: StoreSection_module_css_default.tags,
															children: plugin.categories.slice(0, 2).map((category) => (0, react_jsx_runtime.jsx)("span", { children: category }, category))
														})
													]
												}),
												(0, react_jsx_runtime.jsxs)("div", {
													className: StoreSection_module_css_default.metrics,
													children: [
														(0, react_jsx_runtime.jsx)("strong", { children: plugin.stars.toLocaleString() }),
														(0, react_jsx_runtime.jsx)("span", { children: "stars" }),
														plugin.stars7dDelta > 0 ? (0, react_jsx_runtime.jsxs)("small", { children: [
															"+",
															plugin.stars7dDelta.toLocaleString(),
															" this week"
														] }) : null
													]
												}),
												(0, react_jsx_runtime.jsxs)("div", {
													className: StoreSection_module_css_default.actions,
													children: [(0, react_jsx_runtime.jsx)("a", {
														href: `https://github.com/${plugin.repository}`,
														target: "_blank",
														rel: "noreferrer",
														children: "Source"
													}), (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														disabled: isInstalled || !isVerified || installing !== void 0,
														title: isVerified ? "Install the runtime-verified package" : "Leaderboard runtime verification is required",
														onClick: () => {
															install(plugin);
														},
														children: isInstalled ? "Installed" : !isVerified ? "Unverified" : installing === plugin.repository ? "Installing..." : "Install"
													})]
												})
											]
										}, plugin.repository);
									})
								}),
								catalog.items.length < catalog.total && normalized.length === 0 ? (0, react_jsx_runtime.jsx)("div", {
									className: StoreSection_module_css_default.loadMore,
									children: (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: loadingMore,
										onClick: () => {
											loadMore();
										},
										children: loadingMore ? "Loading…" : "Load more"
									})
								}) : null
							] }) : null
						]
					}) : (0, react_jsx_runtime.jsxs)("section", {
						className: StoreSection_module_css_default.content,
						children: [(0, react_jsx_runtime.jsxs)("div", {
							className: StoreSection_module_css_default.summary,
							children: [(0, react_jsx_runtime.jsx)("strong", { children: installed.length }), " Loader plugins"]
						}), installed.length === 0 ? (0, react_jsx_runtime.jsx)("p", {
							className: StoreSection_module_css_default.state,
							children: "No installed plugins are available."
						}) : (0, react_jsx_runtime.jsx)("ul", {
							className: StoreSection_module_css_default.installed,
							children: installed.map((item) => (0, react_jsx_runtime.jsxs)("li", { children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: item.moduleName }), (0, react_jsx_runtime.jsx)("code", { children: item.entryId })] }), (0, react_jsx_runtime.jsx)("span", {
								"data-enabled": item.enabled,
								children: item.enabled ? item.fiberPhase === "active" ? "Running" : "Enabled" : "Disabled"
							})] }, item.entryId))
						})]
					})
				]
			});
		}
		const inject = [
			"slots",
			"remote",
			"remote.pluginInventory"
		];
		function apply(ctx) {
			const listInstalled = async () => {
				const result = await ctx.remote.pluginInventory.list();
				if (!result.ok) throw new Error(result.error.message);
				return [...result.value.entries];
			};
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "plugin-store",
				order: 120,
				label: () => "Store",
				inject: () => ({ listInstalled })
			}, StoreSection));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map