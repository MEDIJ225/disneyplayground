import type { Components, JSX } from "../types/components";

interface WdprTileRow extends Components.WdprTileRow, HTMLElement {}
export const WdprTileRow: {
    prototype: WdprTileRow;
    new (): WdprTileRow;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
