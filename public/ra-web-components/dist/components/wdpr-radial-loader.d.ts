import type { Components, JSX } from "../types/components";

interface WdprRadialLoader extends Components.WdprRadialLoader, HTMLElement {}
export const WdprRadialLoader: {
    prototype: WdprRadialLoader;
    new (): WdprRadialLoader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
