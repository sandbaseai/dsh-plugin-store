interface ClientContext {
    slots: {
        inject(name: string, callback: () => unknown): void;
        register(slot: {
            name: string;
            id: string;
            order: number;
            label: () => string;
            inject: () => {
                listInstalled: () => Promise<InventoryEntry[]>;
            };
        }, component: typeof StoreSection): unknown;
    };
    remote: {
        pluginInventory: {
            list(): Promise<{
                ok: true;
                value: {
                    entries: InventoryEntry[];
                };
            } | {
                ok: false;
                error: {
                    message: string;
                };
            }>;
        };
    };
}
type InventoryEntry = {
    entryId: string;
    moduleName: string;
    enabled: boolean;
    fiberPhase: string | null;
};
declare function StoreSection({ listInstalled }: {
    listInstalled: () => Promise<InventoryEntry[]>;
}): import("react").JSX.Element;
export declare const inject: readonly ["slots", "remote", "remote.pluginInventory"];
export declare function apply(ctx: ClientContext): void;
export {};
