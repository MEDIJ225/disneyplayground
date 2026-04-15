import type { Components, JSX } from "../types/components";

interface WdprTabBar extends Components.WdprTabBar, HTMLElement {}
export const WdprTabBar: {
    prototype: WdprTabBar;
    new (): WdprTabBar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
