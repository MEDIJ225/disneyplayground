import type { Components, JSX } from "../types/components";

interface WdprNavItemSmall extends Components.WdprNavItemSmall, HTMLElement {}
export const WdprNavItemSmall: {
    prototype: WdprNavItemSmall;
    new (): WdprNavItemSmall;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
