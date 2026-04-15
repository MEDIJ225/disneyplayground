import type { Components, JSX } from "../types/components";

interface WdprMonthHeader extends Components.WdprMonthHeader, HTMLElement {}
export const WdprMonthHeader: {
    prototype: WdprMonthHeader;
    new (): WdprMonthHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
