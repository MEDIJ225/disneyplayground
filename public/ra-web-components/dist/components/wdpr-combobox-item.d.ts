import type { Components, JSX } from "../types/components";

interface WdprComboboxItem extends Components.WdprComboboxItem, HTMLElement {}
export const WdprComboboxItem: {
    prototype: WdprComboboxItem;
    new (): WdprComboboxItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
