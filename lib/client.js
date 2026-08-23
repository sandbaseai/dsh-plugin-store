window.__ModuleLoader__.load({
	id: "@sandbaseai/dsh-plugin-store",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		//#region \0dsh-css:C:\Users\谦友Lee\Desktop\Project\deepseek-harness\packages\plugins\dsh-store\src\client\StoreSection.module.css.mjs
		const css = ".Gp0BcG_store{--accent:#2563eb;--line:#e5e7eb;--muted:#6b7280;--subtle:#f6f7f8;max-width:1100px;color:var(--color-text-primary,#171717)}.Gp0BcG_header{margin-bottom:20px}.Gp0BcG_header h2{letter-spacing:-.025em;margin:0 0 5px;font-size:23px}.Gp0BcG_header p{color:var(--muted);margin:0;font-size:13px;line-height:1.5}.Gp0BcG_tabs{border-bottom:1px solid var(--line);gap:24px;display:flex}.Gp0BcG_tabs button{color:var(--muted);cursor:pointer;background:0 0;border:0;padding:9px 1px 12px;font:600 13px/1 inherit;position:relative}.Gp0BcG_tabs button[aria-selected=true]{color:inherit}.Gp0BcG_tabs button[aria-selected=true]:after{background:var(--accent);content:\"\";height:2px;position:absolute;bottom:-1px;left:0;right:0}.Gp0BcG_tabs button:focus-visible,.Gp0BcG_card button:focus-visible,.Gp0BcG_loadMore button:focus-visible,.Gp0BcG_search input:focus-visible,.Gp0BcG_sort select:focus-visible{outline:2px solid var(--accent);outline-offset:2px}.Gp0BcG_tabs span{background:var(--subtle);border-radius:6px;margin-left:5px;padding:1px 6px;font-size:10px}.Gp0BcG_content{padding-top:16px}.Gp0BcG_toolbar{grid-template-columns:minmax(240px,1.4fr) minmax(150px,.75fr) minmax(190px,.9fr);gap:12px;margin-bottom:14px;display:grid}.Gp0BcG_search,.Gp0BcG_sort{min-width:0;color:var(--muted);flex-direction:column;gap:5px;font-size:10px;font-weight:600;display:flex}.Gp0BcG_search input,.Gp0BcG_sort select{box-sizing:border-box;border:1px solid var(--line);background:var(--color-bg,#fff);width:100%;height:36px;color:inherit;border-radius:8px;font:12px inherit}.Gp0BcG_search input{padding:0 11px}.Gp0BcG_search input::placeholder{color:#9ca3af}.Gp0BcG_sort select{padding:0 28px 0 10px}.Gp0BcG_summary{color:var(--muted);justify-content:space-between;margin-bottom:9px;font-size:11px;display:flex}.Gp0BcG_summary strong{color:inherit;font-variant-numeric:tabular-nums}.Gp0BcG_notice{color:#1e40af;background:#eff6ff;border:1px solid #bfdbfe;border-radius:9px;margin-top:14px;padding:10px 12px;font-size:12px}.Gp0BcG_grid{border:1px solid var(--line);background:var(--color-bg,#fff);border-radius:10px;margin:0;padding:0;list-style:none;overflow:hidden}.Gp0BcG_card{border-bottom:1px solid var(--line);grid-template-columns:42px minmax(360px,1fr) 96px 132px;align-items:center;gap:14px;min-height:88px;padding:11px 13px;transition:background-color .12s;display:grid}.Gp0BcG_card:last-child{border-bottom:0}.Gp0BcG_card:hover{background:var(--subtle)}.Gp0BcG_rank{color:#9ca3af;font-variant-numeric:tabular-nums;align-self:start;padding-top:1px;font:10px/1.4 ui-monospace,SFMono-Regular,monospace}.Gp0BcG_plugin{min-width:0}.Gp0BcG_titleLine{grid-template-columns:minmax(110px,max-content) minmax(0,1fr);align-items:baseline;gap:10px;min-width:0;display:grid}.Gp0BcG_titleLine h3{letter-spacing:-.01em;text-overflow:ellipsis;white-space:nowrap;margin:0;font-size:13px;overflow:hidden}.Gp0BcG_titleLine code{color:#9ca3af;text-overflow:ellipsis;white-space:nowrap;font:10px/1.4 ui-monospace,SFMono-Regular,monospace;overflow:hidden}.Gp0BcG_plugin p{color:#5f6368;text-overflow:ellipsis;white-space:nowrap;margin:5px 0 7px;font-size:11px;line-height:1.4;overflow:hidden}.Gp0BcG_tags{gap:5px;display:flex}.Gp0BcG_tags span{background:var(--subtle);color:var(--muted);border-radius:5px;padding:2px 6px;font-size:9px;line-height:1.4}.Gp0BcG_manual{color:#92400e;background:#fffbeb;border:1px solid #fde68a;border-radius:6px;gap:3px;margin-top:8px;padding:7px 8px;font-size:10px;display:grid}.Gp0BcG_manual code{text-overflow:ellipsis;white-space:nowrap;font:10px/1.4 ui-monospace,SFMono-Regular,monospace;overflow:hidden}.Gp0BcG_manual small{color:#a16207;font-size:9px}.Gp0BcG_manual button{height:24px;color:inherit;cursor:pointer;background:0 0;border:1px solid #d97706;border-radius:5px;justify-self:start;padding:0 7px;font:600 9px/1 inherit}.Gp0BcG_sourceWarning{color:#a16207;margin-top:7px;font-size:10px;line-height:1.4;display:block}.Gp0BcG_sourceError{color:#b91c1c;margin-top:7px;font-size:10px;display:block}.Gp0BcG_metrics{color:var(--muted);flex-direction:column;align-items:flex-end;font-size:10px;display:flex}.Gp0BcG_metrics strong{color:inherit;font:600 12px/1.2 ui-monospace,SFMono-Regular,monospace}.Gp0BcG_metrics small{color:#15803d;white-space:nowrap;margin-top:4px;font-size:8px}.Gp0BcG_actions{justify-content:flex-end;align-items:center;gap:9px;display:flex}.Gp0BcG_actions a{color:var(--muted);font-size:10px;text-decoration:none}.Gp0BcG_actions a:hover{color:inherit}.Gp0BcG_actions button,.Gp0BcG_loadMore button,.Gp0BcG_state button{background:var(--accent);color:#fff;white-space:nowrap;cursor:pointer;border:1px solid #1d4ed8;border-radius:7px;height:29px;padding:0 10px;font:600 10px/1 inherit}.Gp0BcG_actions button:active,.Gp0BcG_loadMore button:active,.Gp0BcG_state button:active{transform:translateY(1px)}.Gp0BcG_actions button:disabled{border-color:var(--line);background:var(--subtle);color:#9ca3af;cursor:default}.Gp0BcG_loadMore{justify-content:center;padding:18px 0 4px;display:flex}.Gp0BcG_loadMore button{border-color:var(--line);background:var(--color-bg,#fff);height:35px;color:inherit}.Gp0BcG_loadMore button:hover:not(:disabled){border-color:#9ca3af}.Gp0BcG_loadMore button:disabled{opacity:.55}.Gp0BcG_state{text-align:center;color:var(--muted);padding:64px 20px;font-size:13px}.Gp0BcG_skeletons{border:1px solid var(--line);border-radius:11px;overflow:hidden}.Gp0BcG_skeleton{border-bottom:1px solid var(--line);grid-template-columns:34px 1fr 90px;gap:16px;padding:20px 15px;display:grid}.Gp0BcG_skeleton:last-child{border-bottom:0}.Gp0BcG_skeleton>*{background:#eceef1;border-radius:4px;height:10px;animation:1.4s ease-in-out infinite Gp0BcG_pulse;display:block}.Gp0BcG_skeleton span{width:70%}.Gp0BcG_skeleton b{justify-self:end;width:70px}.Gp0BcG_installed{border:1px solid var(--line);border-radius:11px;margin:0;padding:0;list-style:none;overflow:hidden}.Gp0BcG_installed li{border-bottom:1px solid var(--line);justify-content:space-between;align-items:center;gap:20px;padding:12px 14px;display:flex}.Gp0BcG_installed li:last-child{border-bottom:0}.Gp0BcG_installed li div{flex-direction:column;gap:3px;min-width:0;display:flex}.Gp0BcG_installed strong{text-overflow:ellipsis;white-space:nowrap;font-size:12px;overflow:hidden}.Gp0BcG_installed code{color:#9ca3af;text-overflow:ellipsis;white-space:nowrap;font:10px/1.5 ui-monospace,SFMono-Regular,monospace;overflow:hidden}.Gp0BcG_installed li>span{background:var(--subtle);color:var(--muted);border-radius:6px;flex:none;padding:3px 7px;font-size:10px}.Gp0BcG_installed li>span[data-enabled=true]{color:#047857;background:#ecfdf5}.Gp0BcG_visuallyHidden{clip:rect(0,0,0,0);white-space:nowrap;width:1px;height:1px;position:absolute;overflow:hidden}@keyframes Gp0BcG_pulse{0%,to{opacity:.55}50%{opacity:1}}@media (prefers-reduced-motion:reduce){.Gp0BcG_skeleton>*{animation:none}.Gp0BcG_card{transition:none}}@media (width<=900px){.Gp0BcG_toolbar{grid-template-columns:1fr 1fr}.Gp0BcG_search{grid-column:1/-1}.Gp0BcG_card{grid-template-columns:32px minmax(0,1fr) 86px 112px}.Gp0BcG_titleLine{grid-template-columns:1fr}.Gp0BcG_titleLine code{display:none}}@media (width<=680px){.Gp0BcG_toolbar{grid-template-columns:1fr}.Gp0BcG_search{grid-column:auto}.Gp0BcG_card{grid-template-columns:28px minmax(0,1fr);gap:8px}.Gp0BcG_metrics{display:none}.Gp0BcG_actions{grid-column:2;justify-content:space-between}.Gp0BcG_titleLine{display:block}}@media (prefers-color-scheme:dark){.Gp0BcG_store{--line:#303236;--muted:#a0a4ab;--subtle:#222428}.Gp0BcG_search input,.Gp0BcG_sort select,.Gp0BcG_grid,.Gp0BcG_loadMore button{background:#18191b}.Gp0BcG_plugin p{color:#b1b4ba}.Gp0BcG_notice{color:#bfdbfe;background:#17243a;border-color:#1e3a5f}.Gp0BcG_skeleton>*{background:#292c30}.Gp0BcG_installed li>span[data-enabled=true]{color:#6ee7b7;background:#123127}}";
		const tagId = "@sandbaseai/dsh-plugin-store/StoreSection.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@sandbaseai/dsh-plugin-store";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var StoreSection_module_css_default = {
			"actions": "Gp0BcG_actions",
			"card": "Gp0BcG_card",
			"content": "Gp0BcG_content",
			"grid": "Gp0BcG_grid",
			"header": "Gp0BcG_header",
			"installed": "Gp0BcG_installed",
			"loadMore": "Gp0BcG_loadMore",
			"manual": "Gp0BcG_manual",
			"metrics": "Gp0BcG_metrics",
			"notice": "Gp0BcG_notice",
			"plugin": "Gp0BcG_plugin",
			"pulse": "Gp0BcG_pulse",
			"rank": "Gp0BcG_rank",
			"search": "Gp0BcG_search",
			"skeleton": "Gp0BcG_skeleton",
			"skeletons": "Gp0BcG_skeletons",
			"sort": "Gp0BcG_sort",
			"sourceError": "Gp0BcG_sourceError",
			"sourceWarning": "Gp0BcG_sourceWarning",
			"state": "Gp0BcG_state",
			"store": "Gp0BcG_store",
			"summary": "Gp0BcG_summary",
			"tabs": "Gp0BcG_tabs",
			"tags": "Gp0BcG_tags",
			"titleLine": "Gp0BcG_titleLine",
			"toolbar": "Gp0BcG_toolbar",
			"visuallyHidden": "Gp0BcG_visuallyHidden"
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
			const [sourceStates, setSourceStates] = (0, react.useState)({});
			const [copiedSource, setCopiedSource] = (0, react.useState)();
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
			const loadSource = async (plugin) => {
				const key = plugin.detailPath ?? plugin.repository;
				setSourceStates((current) => ({
					...current,
					[key]: { status: "loading" }
				}));
				try {
					const value = await json("/api/plugin-store/source", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							repository: plugin.repository,
							detailPath: plugin.detailPath
						})
					});
					setSourceStates((current) => ({
						...current,
						[key]: {
							status: "ready",
							value
						}
					}));
					return value;
				} catch (error) {
					const message = error instanceof Error ? error.message : String(error);
					setSourceStates((current) => ({
						...current,
						[key]: {
							status: "error",
							message
						}
					}));
					setNotice(`Could not inspect ${plugin.name}: ${message}`);
					return;
				}
			};
			const install = async (plugin) => {
				setInstalling(plugin.repository);
				setNotice(void 0);
				try {
					await json("/api/plugin-store/install", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							repository: plugin.repository,
							detailPath: plugin.detailPath
						})
					});
					setNotice(`${plugin.name} was installed to the web profile. Restart DSH to activate it.`);
					loadInstalled();
				} catch (error) {
					setNotice(`Installation failed: ${error instanceof Error ? error.message : String(error)}`);
				} finally {
					setInstalling(void 0);
				}
			};
			const copyManualCommand = async (plugin, command) => {
				try {
					await navigator.clipboard.writeText(command);
					setCopiedSource(plugin.repository);
					setNotice("Manual install command copied. Review it before running.");
					window.setTimeout(() => setCopiedSource((current) => current === plugin.repository ? void 0 : current), 2e3);
				} catch (error) {
					setNotice(`Could not copy the command: ${error instanceof Error ? error.message : String(error)}`);
				}
			};
			const handleAction = async (plugin) => {
				const current = sourceStates[plugin.detailPath ?? plugin.repository];
				const source = current?.status === "ready" ? current.value : await loadSource(plugin);
				if (!source) return;
				if (source.availability === "installable") await install(plugin);
				else if (source.availability === "manual") {
					const command = source.installPath ?? "No verified install command is available.";
					setNotice(`Manual install only.${source.prerequisites?.length ? ` Prerequisites: ${source.prerequisites.join(", ")}.` : ""} Review the source and run: ${command}`);
				} else if (source.availability === "conflict") setNotice("Installation blocked: catalog and detail verification results conflict.");
				else if (source.availability === "unverified") setNotice("Installation blocked: this plugin is not runtime-verified.");
				else setNotice(`Installation blocked: ${source.source.reason ?? "unsupported source"}.`);
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
										const sourceState = sourceStates[plugin.detailPath ?? plugin.repository];
										const source = sourceState?.status === "ready" ? sourceState.value : void 0;
										const isLoadingSource = sourceState?.status === "loading";
										const actionLabel = isInstalled ? "Installed" : isLoadingSource ? "Checking..." : source?.availability === "installable" ? installing === plugin.repository ? "Installing..." : "Install" : source?.availability === "manual" ? "Manual install" : source?.availability === "conflict" ? "Verification conflict" : source?.availability === "unverified" ? "Unverified" : source?.availability === "unsupported" ? "Unsupported source" : "Check source";
										const actionTitle = source?.availability === "manual" ? "Show the verified command for manual installation" : source?.availability === "installable" ? "Install the runtime-verified npm package" : "Inspect the verified install source before taking action";
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
														}),
														source?.verificationConflict ? (0, react_jsx_runtime.jsxs)("small", {
															className: StoreSection_module_css_default.sourceWarning,
															children: [
																"Catalog status: ",
																source.catalogVerificationStatus,
																"; detail status: ",
																source.detailVerificationStatus,
																". The evidence does not agree."
															]
														}) : null,
														source?.availability === "manual" || source?.availability === "unsupported" ? (0, react_jsx_runtime.jsxs)("div", {
															className: StoreSection_module_css_default.manual,
															children: [
																(0, react_jsx_runtime.jsx)("strong", { children: source.availability === "manual" ? "Manual install" : "Unsupported source" }),
																(0, react_jsx_runtime.jsx)("code", { children: source.installPath ?? "No verified command available." }),
																source.prerequisites?.length ? (0, react_jsx_runtime.jsxs)("small", { children: ["Requires: ", source.prerequisites.join(", ")] }) : null,
																source.installPath ? (0, react_jsx_runtime.jsx)("button", {
																	type: "button",
																	onClick: () => {
																		copyManualCommand(plugin, source.installPath ?? "");
																	},
																	children: copiedSource === plugin.repository ? "Copied" : "Copy command"
																}) : null
															]
														}) : null,
														sourceState?.status === "error" ? (0, react_jsx_runtime.jsx)("small", {
															className: StoreSection_module_css_default.sourceError,
															children: sourceState.message
														}) : null
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
														disabled: isInstalled || isLoadingSource || installing !== void 0 || source?.availability === "conflict" || source?.availability === "unverified" || source?.availability === "unsupported",
														title: actionTitle,
														onClick: () => {
															handleAction(plugin);
														},
														children: actionLabel
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