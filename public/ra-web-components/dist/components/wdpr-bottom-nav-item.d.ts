import type { Components, JSX } from "../types/components";

interface WdprBottomNavItem extends Components.WdprBottomNavItem, HTMLElement {}
export const WdprBottomNavItem: {
    prototype: WdprBottomNavItem;
    new (): WdprBottomNavItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
