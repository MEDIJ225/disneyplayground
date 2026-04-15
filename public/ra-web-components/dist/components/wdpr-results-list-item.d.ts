import type { Components, JSX } from "../types/components";

interface WdprResultsListItem extends Components.WdprResultsListItem, HTMLElement {}
export const WdprResultsListItem: {
    prototype: WdprResultsListItem;
    new (): WdprResultsListItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
