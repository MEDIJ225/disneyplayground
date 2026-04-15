import type { Components, JSX } from "../types/components";

interface WdprNavItemLarge extends Components.WdprNavItemLarge, HTMLElement {}
export const WdprNavItemLarge: {
    prototype: WdprNavItemLarge;
    new (): WdprNavItemLarge;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
