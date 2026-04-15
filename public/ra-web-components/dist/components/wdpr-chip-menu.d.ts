import type { Components, JSX } from "../types/components";

interface WdprChipMenu extends Components.WdprChipMenu, HTMLElement {}
export const WdprChipMenu: {
    prototype: WdprChipMenu;
    new (): WdprChipMenu;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
