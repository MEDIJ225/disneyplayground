import type { Components, JSX } from "../types/components";

interface WdprDropdown extends Components.WdprDropdown, HTMLElement {}
export const WdprDropdown: {
    prototype: WdprDropdown;
    new (): WdprDropdown;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
