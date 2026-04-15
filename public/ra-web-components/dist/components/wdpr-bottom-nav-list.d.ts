import type { Components, JSX } from "../types/components";

interface WdprBottomNavList extends Components.WdprBottomNavList, HTMLElement {}
export const WdprBottomNavList: {
    prototype: WdprBottomNavList;
    new (): WdprBottomNavList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
