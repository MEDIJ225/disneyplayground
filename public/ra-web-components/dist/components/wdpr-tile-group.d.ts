import type { Components, JSX } from "../types/components";

interface WdprTileGroup extends Components.WdprTileGroup, HTMLElement {}
export const WdprTileGroup: {
    prototype: WdprTileGroup;
    new (): WdprTileGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
