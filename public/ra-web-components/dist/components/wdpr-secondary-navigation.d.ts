import type { Components, JSX } from "../types/components";

interface WdprSecondaryNavigation extends Components.WdprSecondaryNavigation, HTMLElement {}
export const WdprSecondaryNavigation: {
    prototype: WdprSecondaryNavigation;
    new (): WdprSecondaryNavigation;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
