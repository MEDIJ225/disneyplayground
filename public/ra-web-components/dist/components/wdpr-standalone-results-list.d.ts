import type { Components, JSX } from "../types/components";

interface WdprStandaloneResultsList extends Components.WdprStandaloneResultsList, HTMLElement {}
export const WdprStandaloneResultsList: {
    prototype: WdprStandaloneResultsList;
    new (): WdprStandaloneResultsList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
