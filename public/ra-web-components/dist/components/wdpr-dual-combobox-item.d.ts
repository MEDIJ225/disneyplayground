import type { Components, JSX } from "../types/components";

interface WdprDualComboboxItem extends Components.WdprDualComboboxItem, HTMLElement {}
export const WdprDualComboboxItem: {
    prototype: WdprDualComboboxItem;
    new (): WdprDualComboboxItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
