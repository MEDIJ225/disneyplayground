import type { Components, JSX } from "../types/components";

interface WdprChipMenuGroup extends Components.WdprChipMenuGroup, HTMLElement {}
export const WdprChipMenuGroup: {
    prototype: WdprChipMenuGroup;
    new (): WdprChipMenuGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
