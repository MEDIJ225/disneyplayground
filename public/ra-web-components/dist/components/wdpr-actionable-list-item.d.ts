import type { Components, JSX } from "../types/components";

interface WdprActionableListItem extends Components.WdprActionableListItem, HTMLElement {}
export const WdprActionableListItem: {
    prototype: WdprActionableListItem;
    new (): WdprActionableListItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
