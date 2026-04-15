import type { Components, JSX } from "../types/components";

interface WdprPaginationReadonly extends Components.WdprPaginationReadonly, HTMLElement {}
export const WdprPaginationReadonly: {
    prototype: WdprPaginationReadonly;
    new (): WdprPaginationReadonly;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
