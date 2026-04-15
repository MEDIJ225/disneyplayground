import type { Components, JSX } from "../types/components";

interface WdprMonth extends Components.WdprMonth, HTMLElement {}
export const WdprMonth: {
    prototype: WdprMonth;
    new (): WdprMonth;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
