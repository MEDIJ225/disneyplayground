import type { Components, JSX } from "../types/components";

interface WdprNavigationHeader extends Components.WdprNavigationHeader, HTMLElement {}
export const WdprNavigationHeader: {
    prototype: WdprNavigationHeader;
    new (): WdprNavigationHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
