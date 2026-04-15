import type { Components, JSX } from "../types/components";

interface WdprFab extends Components.WdprFab, HTMLElement {}
export const WdprFab: {
    prototype: WdprFab;
    new (): WdprFab;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
