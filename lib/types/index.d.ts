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
import type { Context } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
import { type InstallSourceClassification } from './install-source';
export declare const name = "dsh_plugin_store";
export declare const inject: readonly ["tools", "web", "webServer"];
export interface Config {
    enabled?: boolean;
    catalogUrl?: string;
    timeoutMs?: number;
}
export declare const Config: z<Config>;
export interface InstallSourceInfo {
    repository: string;
    detailPath: string;
    catalogVerificationStatus: string;
    detailVerificationStatus: string;
    verificationConflict: boolean;
    availability: 'installable' | 'manual' | 'unverified' | 'conflict' | 'unsupported';
    source: InstallSourceClassification;
    installPath?: string;
    prerequisites?: string[];
}
export declare function apply(ctx: Context, config?: Config): void;
//# sourceMappingURL=index.d.ts.map