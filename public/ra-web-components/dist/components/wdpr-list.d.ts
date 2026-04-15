import type { Components, JSX } from "../types/components";

interface WdprList extends Components.WdprList, HTMLElement {}
export const WdprList: {
    prototype: WdprList;
    new (): WdprList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
