import type { Components, JSX } from "../types/components";

interface WdprLinearLoader extends Components.WdprLinearLoader, HTMLElement {}
export const WdprLinearLoader: {
    prototype: WdprLinearLoader;
    new (): WdprLinearLoader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
