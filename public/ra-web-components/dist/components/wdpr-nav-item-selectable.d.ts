import type { Components, JSX } from "../types/components";

interface WdprNavItemSelectable extends Components.WdprNavItemSelectable, HTMLElement {}
export const WdprNavItemSelectable: {
    prototype: WdprNavItemSelectable;
    new (): WdprNavItemSelectable;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
