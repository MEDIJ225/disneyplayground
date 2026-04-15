import type { Components, JSX } from "../types/components";

interface WdprPaginationItem extends Components.WdprPaginationItem, HTMLElement {}
export const WdprPaginationItem: {
    prototype: WdprPaginationItem;
    new (): WdprPaginationItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
