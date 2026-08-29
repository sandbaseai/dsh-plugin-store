import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import z from "@deepseek-ai/schemastery";
import { defineTool } from "@deepseek-ai/dsh-tools";
//#region lib/types/plugin-evidence.js
/**
* Typed evidence helpers for the Plugin Store: install-source classification,
* semver comparison, and the installed-version freshness state.
*
* Pure functions only — the Host route and the client both depend on these
* decisions, and the contract tests in tests/plugin-evidence.test.mjs pin the
* downgrade rules: missing, stale, or contradictory evidence degrades to
* `unknown`, and non-registry sources never receive an npm freshness claim.
*
* @module @sandbaseai/dsh-plugin-store/plugin-evidence
*/
/**
* npm package name grammar shared by the install gate and inventory lookups.
* Full-match only: anything containing git specs, URLs, paths, whitespace, or
* shell metacharacters fails, so a crafted inventory name cannot steer
* module resolution or registry URLs.
*/
const NPM_PACKAGE_NAME = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/i;
/**
* npm package spec grammar (name plus optional @version range), matching the
* install gate in src/index.ts.
*/
const NPM_PACKAGE_SPEC = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*(?:@[a-z0-9][a-z0-9._+-]*)?$/i;
const SEMVER = /^[vV]?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/;
function isNpmPackageName(value) {
	return NPM_PACKAGE_NAME.test(value);
}
/**
* Classify an install spec by source type. Only npm package specs can carry
* registry freshness; every other supported form (git, GitHub subdirectory,
* URL, path) must be reported as non-registry.
*/
function classifyInstallSource(spec) {
	return NPM_PACKAGE_SPEC.test(spec) ? "npm" : "non-npm";
}
/**
* Parse a version into comparable fields. Build metadata is ignored for
* precedence. Returns null for anything that is not a strict x.y.z version
* with an optional prerelease, so partial or fabricated versions cannot be
* compared into a trusted state.
*/
function parseSemver(value) {
	if (typeof value !== "string") return null;
	const match = SEMVER.exec(value.trim());
	if (match === null) return null;
	return {
		major: Number(match[1]),
		minor: Number(match[2]),
		patch: Number(match[3]),
		prerelease: match[4] === void 0 ? [] : match[4].split(".")
	};
}
function comparePrerelease(left, right) {
	if (left.length === 0 && right.length === 0) return 0;
	if (left.length === 0) return 1;
	if (right.length === 0) return -1;
	const length = Math.max(left.length, right.length);
	for (let index = 0; index < length; index += 1) {
		const leftPart = left[index];
		const rightPart = right[index];
		if (leftPart === void 0) return -1;
		if (rightPart === void 0) return 1;
		const leftNumeric = /^\d+$/.test(leftPart);
		const rightNumeric = /^\d+$/.test(rightPart);
		if (leftNumeric && rightNumeric) {
			const delta = Number(leftPart) - Number(rightPart);
			if (delta !== 0) return delta;
		} else if (leftNumeric !== rightNumeric) return leftNumeric ? -1 : 1;
		else if (leftPart !== rightPart) return leftPart < rightPart ? -1 : 1;
	}
	return 0;
}
/**
* Compare two versions by semver precedence. Returns null when either side
* is not a parseable version; callers must treat null as `unknown`, never as
* an ordering.
*/
function compareSemver(left, right) {
	const a = parseSemver(left);
	const b = parseSemver(right);
	if (a === null || b === null) return null;
	if (a.major !== b.major) return a.major - b.major;
	if (a.minor !== b.minor) return a.minor - b.minor;
	if (a.patch !== b.patch) return a.patch - b.patch;
	return comparePrerelease(a.prerelease, b.prerelease);
}
/**
* Derive the deterministic freshness state for an installed plugin.
*
* - `non-registry`: the source is not an npm package; no npm freshness claim
*   is made regardless of any version strings.
* - `unknown`: installed or latest version is missing, unparsable, or the
*   installed version is newer than the registry latest (contradictory with
*   the registry being the freshness source of truth).
* - `update-available`: the registry latest is strictly newer.
* - `current`: installed matches the registry latest by precedence.
*/
function deriveFreshness(input) {
	if (input.source !== "npm") return { state: "non-registry" };
	const installed = typeof input.installedVersion === "string" ? input.installedVersion : "";
	const latest = typeof input.latestVersion === "string" ? input.latestVersion : "";
	if (installed.length === 0 || latest.length === 0) return { state: "unknown" };
	const ordering = compareSemver(installed, latest);
	if (ordering === null) return { state: "unknown" };
	if (ordering > 0) return { state: "unknown" };
	return { state: ordering < 0 ? "update-available" : "current" };
}
//#endregion
//#region lib/types/index.js
/**
* DSH Plugin Store — Browse and install plugins from the DSH Plugin Leaderboard.
*
* Tools:
*   - store_search: Search the plugin catalog
*   - store_install: Get install instructions for a plugin
*   - store_catalog: Browse the full catalog by category
*
* @module @sandbaseai/dsh-plugin-store
*/
const name = "dsh_plugin_store";
const inject = [
	"tools",
	"web",
	"webServer"
];
const Config = z.object({
	enabled: z.boolean().default(true),
	catalogUrl: z.string().default("https://dshpluginleaderboard.com/api/catalog"),
	timeoutMs: z.number().default(3e4)
});
let cachedCatalog = null;
let cacheTime = 0;
const CACHE_TTL = 3e5;
const knownCatalogRepositories = /* @__PURE__ */ new Map();
function handleUpstreamError(err, toolName) {
	const message = err instanceof Error ? err.message : String(err);
	throw new Error(`${toolName}: ${message}`);
}
async function getCatalog(catalogUrl, timeoutMs = 3e4) {
	const now = Date.now();
	if (cachedCatalog && now - cacheTime < CACHE_TTL) return cachedCatalog;
	const response = await fetch(catalogUrl, { signal: AbortSignal.timeout(timeoutMs) });
	if (!response.ok) {
		if (cachedCatalog) return cachedCatalog;
		throw new Error(`Catalog fetch failed: HTTP ${response.status}`);
	}
	const raw = await response.json();
	const source = raw.catalog ?? (raw.items ?? []).map((item) => ({
		id: item.repository,
		name: item.repository.split("/").at(-1) ?? item.repository,
		repository: item.repository,
		description: item.description ?? "",
		categories: item.categories ?? [],
		installPath: "",
		verificationStatus: item.installVerificationStatus ?? "unknown",
		stars: item.stars ?? 0,
		forks: 0,
		overallScore: Math.max(0, 1e3 - (item.rank ?? 1e3)),
		stars7dDelta: item.stars7dDelta ?? 0,
		createdAt: "",
		updatedAt: ""
	}));
	for (const item of raw.items ?? []) if (item.href?.startsWith("/plugins/") === true) knownCatalogRepositories.set(item.repository, {
		href: item.href,
		verificationStatus: item.installVerificationStatus ?? ""
	});
	cachedCatalog = {
		catalog: source,
		metrics: { pluginsTracked: raw.metrics?.pluginsTracked ?? source.length },
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	cacheTime = now;
	return cachedCatalog;
}
async function getCatalogPage(catalogUrl, limit, offset, category = "", timeoutMs = 3e4) {
	const url = new URL(catalogUrl);
	url.searchParams.set("limit", String(limit));
	url.searchParams.set("offset", String(offset));
	if (category.length > 0) url.searchParams.set("category", category);
	const response = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
	if (!response.ok) throw new Error(`Catalog fetch failed: HTTP ${response.status}`);
	const raw = await response.json();
	const items = raw.catalog ?? (raw.items ?? []).map((item) => ({
		id: item.repository,
		name: item.repository.split("/").at(-1) ?? item.repository,
		repository: item.repository,
		description: item.description ?? "",
		categories: item.categories ?? [],
		installPath: "",
		verificationStatus: item.installVerificationStatus ?? "unknown",
		stars: item.stars ?? 0,
		forks: 0,
		overallScore: Math.max(0, 1e3 - (item.rank ?? 1e3)),
		stars7dDelta: item.stars7dDelta ?? 0,
		createdAt: "",
		updatedAt: ""
	}));
	for (const item of raw.items ?? []) if (item.href?.startsWith("/plugins/") === true) knownCatalogRepositories.set(item.repository, {
		href: item.href,
		verificationStatus: item.installVerificationStatus ?? ""
	});
	return {
		items,
		total: raw.total ?? raw.metrics?.pluginsTracked ?? items.length,
		limit: raw.limit ?? limit,
		offset: raw.offset ?? offset,
		categories: raw.facets?.categories ?? []
	};
}
function sendJson(res, status, value) {
	res.writeHead(status, {
		"content-type": "application/json; charset=utf-8",
		"cache-control": "no-store"
	});
	res.end(JSON.stringify(value));
}
async function readBody(req) {
	const chunks = [];
	let size = 0;
	for await (const chunk of req) {
		const value = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
		size += value.length;
		if (size > 16384) throw new Error("Request body is too large");
		chunks.push(value);
	}
	return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
async function resolveInstallSpec(repository, catalogUrl, timeoutMs) {
	const catalogEntry = knownCatalogRepositories.get(repository);
	if (catalogEntry === void 0) throw new Error("Load this repository from the community catalog before installing it");
	if (catalogEntry.verificationStatus !== "verified") throw new Error("This plugin has not passed the leaderboard runtime installation check");
	if (!/^\/plugins\/[a-z0-9-]+$/i.test(catalogEntry.href)) throw new Error("The catalog returned an invalid plugin detail path");
	const detailUrl = new URL(`/api${catalogEntry.href}`, new URL(catalogUrl).origin);
	const response = await fetch(detailUrl, { signal: AbortSignal.timeout(timeoutMs) });
	if (!response.ok) throw new Error(`Plugin detail fetch failed: HTTP ${response.status}`);
	const plugin = (await response.json()).plugin;
	if (plugin?.repository !== repository) throw new Error("Plugin detail does not match the selected repository");
	if (plugin.verificationStatus !== "runtime_verified") throw new Error("This plugin is not runtime-verified");
	const spec = /^dsh plugin --profile web add ([^\s]+)$/.exec(plugin.installPath ?? "")?.[1];
	if (spec === void 0 || classifyInstallSource(spec) !== "npm") throw new Error("The verified install command is not a supported npm package spec");
	return spec;
}
async function installPackage(spec) {
	const entry = process.argv[1];
	if (entry === void 0) throw new Error("Cannot resolve the current DSH entrypoint");
	await new Promise((resolve, reject) => {
		const entryArgs = entry.endsWith(".ts") ? [
			"--import",
			"tsx/esm",
			entry
		] : [entry];
		const child = spawn(process.execPath, [
			...entryArgs,
			"plugin",
			"--profile",
			"web",
			"add",
			"-w",
			spec
		], {
			cwd: process.cwd(),
			env: process.env,
			stdio: [
				"ignore",
				"pipe",
				"pipe"
			]
		});
		let output = "";
		const append = (chunk) => {
			output = `${output}${String(chunk)}`.slice(-65536);
		};
		child.stdout.on("data", append);
		child.stderr.on("data", append);
		const timer = setTimeout(() => {
			child.kill("SIGTERM");
		}, 12e4);
		child.once("error", (error) => {
			clearTimeout(timer);
			reject(error);
		});
		child.once("close", (code) => {
			clearTimeout(timer);
			code === 0 ? resolve() : reject(new Error(output.trim() || `Installer exited with code ${String(code)}`));
		});
	});
}
const LATEST_VERSION_TTL = 6e5;
const latestVersionCache = /* @__PURE__ */ new Map();
/**
* Read the installed version of a package from the profile's node_modules.
* The Store itself is installed in the same tree, so resolving from this
* module finds sibling packages under both hoisted and symlinked pnpm
* layouts; the walk up to the package root reads only package.json manifests
* and never executes package code. Any failure degrades to undefined, which
* the freshness derivation reports as `unknown`.
*/
function readInstalledVersion(moduleName) {
	if (!isNpmPackageName(moduleName)) return void 0;
	try {
		let current = dirname(createRequire(import.meta.url).resolve(moduleName));
		for (let depth = 0; depth < 15; depth += 1) {
			const manifestPath = join(current, "package.json");
			if (existsSync(manifestPath)) {
				const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
				if (manifest.name === moduleName && typeof manifest.version === "string" && parseSemver(manifest.version) !== null) return manifest.version;
			}
			const parent = dirname(current);
			if (parent === current) return void 0;
			current = parent;
		}
		return;
	} catch {
		return;
	}
}
/**
* Latest version for an npm package from the registry. Failures and missing
* packages are cached like successes so a flaky network or unregistered name
* cannot turn into per-render request storms; callers degrade to `unknown`.
*/
async function fetchLatestVersion(moduleName, timeoutMs) {
	if (!isNpmPackageName(moduleName)) return void 0;
	const now = Date.now();
	const cached = latestVersionCache.get(moduleName);
	if (cached && now - cached.time < LATEST_VERSION_TTL) return cached.value;
	let value;
	try {
		const response = await fetch(`https://registry.npmjs.org/${moduleName}/latest`, {
			signal: AbortSignal.timeout(timeoutMs),
			headers: { accept: "application/json" }
		});
		if (response.ok) {
			const body = await response.json();
			if (typeof body.version === "string" && parseSemver(body.version) !== null) value = body.version;
		}
	} catch {
		value = void 0;
	}
	latestVersionCache.set(moduleName, {
		value,
		time: now
	});
	return value;
}
/**
* Public leaderboard page holding the verification evidence for a repository,
* when the catalog supplied a well-formed detail path this session.
*/
function evidenceUrlFor(repository, catalogUrl) {
	const entry = knownCatalogRepositories.get(repository);
	if (entry === void 0 || !/^\/plugins\/[a-z0-9-]+$/i.test(entry.href)) return void 0;
	try {
		return new URL(entry.href, new URL(catalogUrl).origin).toString();
	} catch {
		return;
	}
}
function apply(ctx, config = {}) {
	if (config.enabled === false) return;
	const catalogUrl = config.catalogUrl ?? "https://dshpluginleaderboard.com/api/catalog";
	const timeoutMs = Math.max(1e3, config.timeoutMs ?? 3e4);
	ctx.effect(() => ctx.webServer.register({
		kind: "exact",
		path: "/api/plugin-store/catalog",
		handler: async (req, res) => {
			if (req.method !== "GET") return sendJson(res, 405, { error: "Method not allowed" });
			try {
				const requestUrl = new URL(req.url ?? "/", "http://localhost");
				const page = await getCatalogPage(catalogUrl, Math.min(100, Math.max(1, Number(requestUrl.searchParams.get("limit")) || 50)), Math.max(0, Number(requestUrl.searchParams.get("offset")) || 0), requestUrl.searchParams.get("category") ?? "", timeoutMs);
				sendJson(res, 200, {
					total: page.total,
					limit: page.limit,
					offset: page.offset,
					categories: page.categories,
					items: page.items.map((plugin) => ({
						repository: plugin.repository,
						name: plugin.name,
						description: plugin.description,
						categories: plugin.categories,
						stars: plugin.stars,
						stars7dDelta: plugin.stars7dDelta,
						rank: Math.max(0, 1e3 - plugin.overallScore),
						verificationStatus: plugin.verificationStatus,
						evidenceUrl: evidenceUrlFor(plugin.repository, catalogUrl)
					}))
				});
			} catch (error) {
				sendJson(res, 502, { error: error instanceof Error ? error.message : String(error) });
			}
		}
	}), "dsh-store: catalog route");
	ctx.effect(() => ctx.webServer.register({
		kind: "exact",
		path: "/api/plugin-store/install",
		handler: async (req, res) => {
			if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });
			try {
				const body = await readBody(req);
				const repository = typeof body.repository === "string" ? body.repository : "";
				if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new Error("Invalid GitHub repository");
				const spec = await resolveInstallSpec(repository, catalogUrl, timeoutMs);
				await installPackage(spec);
				sendJson(res, 200, {
					ok: true,
					package: spec
				});
			} catch (error) {
				sendJson(res, 400, { error: error instanceof Error ? error.message : String(error) });
			}
		}
	}), "dsh-store: install route");
	ctx.effect(() => ctx.webServer.register({
		kind: "exact",
		path: "/api/plugin-store/freshness",
		handler: async (req, res) => {
			if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });
			try {
				const body = await readBody(req);
				if (!Array.isArray(body.packages)) throw new Error("Request body must include a packages array");
				const names = [...new Set(body.packages.filter((value) => typeof value === "string" && value.length > 0 && value.length <= 214))].slice(0, 50);
				sendJson(res, 200, { packages: await Promise.all(names.map(async (name) => {
					const source = classifyInstallSource(name) === "npm" ? "npm" : "non-npm";
					const installedVersion = source === "npm" ? readInstalledVersion(name) : void 0;
					const latestVersion = source === "npm" ? await fetchLatestVersion(name, timeoutMs) : void 0;
					return {
						name,
						source,
						installedVersion,
						latestVersion,
						freshness: deriveFreshness({
							source,
							installedVersion,
							latestVersion
						}).state
					};
				})) });
			} catch (error) {
				sendJson(res, 400, { error: error instanceof Error ? error.message : String(error) });
			}
		}
	}), "dsh-store: freshness route");
	(async () => {
		ctx.tools.register(defineTool({
			name: "store_search",
			description: "Search the DSH Plugin Store for plugins. Find plugins by name, description, or category. Returns matching plugins with install instructions.",
			parameters: {
				query: {
					type: "string",
					required: true,
					description: "Search query — matches plugin name and description."
				},
				category: {
					type: "string",
					description: "Filter by category (e.g., \"UI Enhancements\", \"Dev Tools\", \"Productivity\")."
				},
				limit: {
					type: "number",
					description: "Max results (default 10)."
				}
			},
			output: {
				schema: { type: "string" },
				render: (_args, value) => [{
					type: "text",
					text: value
				}]
			},
			async execute(args, _exec) {
				try {
					const catalog = await getCatalog(catalogUrl, timeoutMs);
					const q = String(args.query || "").toLowerCase();
					const cat = args.category ? String(args.category).toLowerCase() : "";
					let results = catalog.catalog.filter((p) => {
						const matchQ = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
						const matchCat = !cat || p.categories?.some((c) => c.toLowerCase() === cat);
						return matchQ && matchCat;
					});
					results.sort((a, b) => b.overallScore - a.overallScore);
					const limit = Math.min(25, Math.max(1, Number(args.limit) || 10));
					results = results.slice(0, limit);
					const lines = [`# Plugin Store Search: "${args.query}"`, `Found ${results.length} plugin(s):\n`];
					for (const p of results) {
						lines.push(`## ${p.name} (Stars: ${p.stars}, Score: ${p.overallScore.toFixed(0)})`);
						lines.push(`- **Repository**: ${p.repository}`);
						lines.push(`- **Description**: ${p.description}`);
						lines.push(`- **Categories**: ${p.categories?.join(", ") || "None"}`);
						lines.push(`- **Install**: Open **Settings → Store**; installation is enabled only after runtime verification.`);
						lines.push(`- **Status**: ${p.verificationStatus}`);
						lines.push("");
					}
					return lines.join("\n");
				} catch (err) {
					handleUpstreamError(err, "store_search");
					throw new Error("unreachable");
				}
			}
		}));
		ctx.tools.register(defineTool({
			name: "store_catalog",
			description: "Browse the full DSH Plugin Store catalog. List all available plugins, optionally filtered by category.",
			parameters: {
				category: {
					type: "string",
					description: "Filter by category (e.g., \"UI Enhancements\", \"Dev Tools\"). Leave empty for all."
				},
				sort: {
					type: "string",
					description: "Sort by: \"score\" (default), \"stars\", \"newest\".",
					enum: [
						"score",
						"stars",
						"newest"
					]
				},
				limit: {
					type: "number",
					description: "Max results (default 20)."
				}
			},
			output: {
				schema: { type: "string" },
				render: (_args, value) => [{
					type: "text",
					text: value
				}]
			},
			async execute(args, _exec) {
				try {
					const catalog = await getCatalog(catalogUrl, timeoutMs);
					const cat = args.category ? String(args.category).toLowerCase() : "";
					let results = catalog.catalog.filter((p) => {
						return !cat || p.categories?.some((c) => c.toLowerCase() === cat);
					});
					switch (args.sort) {
						case "stars":
							results.sort((a, b) => b.stars - a.stars);
							break;
						case "newest":
							results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
							break;
						default: results.sort((a, b) => b.overallScore - a.overallScore);
					}
					const limit = Math.min(50, Math.max(1, Number(args.limit) || 20));
					results = results.slice(0, limit);
					const lines = [`# Plugin Store Catalog`, `Total: ${catalog.metrics?.pluginsTracked ?? catalog.catalog.length} plugins | Showing: ${results.length}\n`];
					for (const p of results) {
						lines.push(`- **${p.name}** Stars:${p.stars} | Score:${p.overallScore.toFixed(0)} | ${p.description}`);
						lines.push(`  Install: Open Settings → Store (runtime verification required)`);
						lines.push(`  Categories: ${p.categories?.join(", ") || "None"}\n`);
					}
					return lines.join("\n");
				} catch (err) {
					handleUpstreamError(err, "store_catalog");
					throw new Error("unreachable");
				}
			}
		}));
		ctx.tools.register(defineTool({
			name: "store_install",
			description: "Get the install instructions for a specific plugin from the DSH Plugin Store.",
			parameters: { name: {
				type: "string",
				required: true,
				description: "The plugin name (e.g., \"dsh-status-rotator\") or repository (e.g., \"01Virex/dsh-status-rotator\")."
			} },
			output: {
				schema: { type: "string" },
				render: (_args, value) => [{
					type: "text",
					text: value
				}]
			},
			async execute(args, _exec) {
				try {
					const catalog = await getCatalog(catalogUrl, timeoutMs);
					const q = String(args.name).toLowerCase();
					const plugin = catalog.catalog.find((p) => p.name.toLowerCase() === q || p.repository.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
					if (!plugin) return `Plugin "${args.name}" not found in the store. Try store_search to find plugins.`;
					const installCmd = `dsh plugin --profile web add -w ${await resolveInstallSpec(plugin.repository, catalogUrl, timeoutMs)}`;
					return [
						`# ${plugin.name}`,
						`**Description**: ${plugin.description}`,
						`**Repository**: https://github.com/${plugin.repository}`,
						`**Stars**: ${plugin.stars} (+${plugin.stars7dDelta} this week)`,
						`**Score**: ${plugin.overallScore.toFixed(0)}/100`,
						`**Status**: runtime verified`,
						"",
						`## Install`,
						"```bash",
						installCmd,
						"```",
						"",
						`Copy and run this command in your terminal to install the plugin.`
					].join("\n");
				} catch (err) {
					handleUpstreamError(err, "store_install");
					throw new Error("unreachable");
				}
			}
		}));
	})();
}
//#endregion
export { Config, apply, inject, name };
