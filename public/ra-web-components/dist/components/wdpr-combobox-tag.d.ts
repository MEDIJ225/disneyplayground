import type { Components, JSX } from "../types/components";

interface WdprComboboxTag extends Components.WdprComboboxTag, HTMLElement {}
export const WdprComboboxTag: {
    prototype: WdprComboboxTag;
    new (): WdprComboboxTag;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
