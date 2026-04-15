import type { Components, JSX } from "../types/components";

interface WdprDate extends Components.WdprDate, HTMLElement {}
export const WdprDate: {
    prototype: WdprDate;
    new (): WdprDate;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
