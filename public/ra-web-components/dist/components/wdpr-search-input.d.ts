import type { Components, JSX } from "../types/components";

interface WdprSearchInput extends Components.WdprSearchInput, HTMLElement {}
export const WdprSearchInput: {
    prototype: WdprSearchInput;
    new (): WdprSearchInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
