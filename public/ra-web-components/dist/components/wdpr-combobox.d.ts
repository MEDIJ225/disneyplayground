import type { Components, JSX } from "../types/components";

interface WdprCombobox extends Components.WdprCombobox, HTMLElement {}
export const WdprCombobox: {
    prototype: WdprCombobox;
    new (): WdprCombobox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
