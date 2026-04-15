import type { Components, JSX } from "../types/components";

interface WdprComboboxGroup extends Components.WdprComboboxGroup, HTMLElement {}
export const WdprComboboxGroup: {
    prototype: WdprComboboxGroup;
    new (): WdprComboboxGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
