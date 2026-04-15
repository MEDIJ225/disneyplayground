import type { Components, JSX } from "../types/components";

interface WdprTile extends Components.WdprTile, HTMLElement {}
export const WdprTile: {
    prototype: WdprTile;
    new (): WdprTile;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
