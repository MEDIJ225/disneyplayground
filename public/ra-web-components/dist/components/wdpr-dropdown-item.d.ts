import type { Components, JSX } from "../types/components";

interface WdprDropdownItem extends Components.WdprDropdownItem, HTMLElement {}
export const WdprDropdownItem: {
    prototype: WdprDropdownItem;
    new (): WdprDropdownItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
