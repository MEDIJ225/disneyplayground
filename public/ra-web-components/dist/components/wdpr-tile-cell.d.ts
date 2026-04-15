import type { Components, JSX } from "../types/components";

interface WdprTileCell extends Components.WdprTileCell, HTMLElement {}
export const WdprTileCell: {
    prototype: WdprTileCell;
    new (): WdprTileCell;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
