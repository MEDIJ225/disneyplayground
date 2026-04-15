import type { Components, JSX } from "../types/components";

interface WdprChipGroup extends Components.WdprChipGroup, HTMLElement {}
export const WdprChipGroup: {
    prototype: WdprChipGroup;
    new (): WdprChipGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
