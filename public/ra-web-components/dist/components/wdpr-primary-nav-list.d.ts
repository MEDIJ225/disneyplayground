import type { Components, JSX } from "../types/components";

interface WdprPrimaryNavList extends Components.WdprPrimaryNavList, HTMLElement {}
export const WdprPrimaryNavList: {
    prototype: WdprPrimaryNavList;
    new (): WdprPrimaryNavList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
