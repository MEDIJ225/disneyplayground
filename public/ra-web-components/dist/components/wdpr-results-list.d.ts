import type { Components, JSX } from "../types/components";

interface WdprResultsList extends Components.WdprResultsList, HTMLElement {}
export const WdprResultsList: {
    prototype: WdprResultsList;
    new (): WdprResultsList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
