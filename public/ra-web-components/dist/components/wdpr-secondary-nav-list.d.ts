import type { Components, JSX } from "../types/components";

interface WdprSecondaryNavList extends Components.WdprSecondaryNavList, HTMLElement {}
export const WdprSecondaryNavList: {
    prototype: WdprSecondaryNavList;
    new (): WdprSecondaryNavList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
