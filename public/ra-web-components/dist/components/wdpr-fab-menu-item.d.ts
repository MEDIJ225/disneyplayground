import type { Components, JSX } from "../types/components";

interface WdprFabMenuItem extends Components.WdprFabMenuItem, HTMLElement {}
export const WdprFabMenuItem: {
    prototype: WdprFabMenuItem;
    new (): WdprFabMenuItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
