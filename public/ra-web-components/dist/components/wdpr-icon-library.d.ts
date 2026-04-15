import type { Components, JSX } from "../types/components";

interface WdprIconLibrary extends Components.WdprIconLibrary, HTMLElement {}
export const WdprIconLibrary: {
    prototype: WdprIconLibrary;
    new (): WdprIconLibrary;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
