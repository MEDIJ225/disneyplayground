import type { Components, JSX } from "../types/components";

interface WdprChipMenuItem extends Components.WdprChipMenuItem, HTMLElement {}
export const WdprChipMenuItem: {
    prototype: WdprChipMenuItem;
    new (): WdprChipMenuItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
