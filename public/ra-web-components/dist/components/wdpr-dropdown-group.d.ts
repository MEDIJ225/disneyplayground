import type { Components, JSX } from "../types/components";

interface WdprDropdownGroup extends Components.WdprDropdownGroup, HTMLElement {}
export const WdprDropdownGroup: {
    prototype: WdprDropdownGroup;
    new (): WdprDropdownGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
