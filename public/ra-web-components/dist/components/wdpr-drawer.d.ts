import type { Components, JSX } from "../types/components";

interface WdprDrawer extends Components.WdprDrawer, HTMLElement {}
export const WdprDrawer: {
    prototype: WdprDrawer;
    new (): WdprDrawer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
