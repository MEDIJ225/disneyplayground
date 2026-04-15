import type { Components, JSX } from "../types/components";

interface WdprPagination extends Components.WdprPagination, HTMLElement {}
export const WdprPagination: {
    prototype: WdprPagination;
    new (): WdprPagination;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
