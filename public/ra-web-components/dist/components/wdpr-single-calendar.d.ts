import type { Components, JSX } from "../types/components";

interface WdprSingleCalendar extends Components.WdprSingleCalendar, HTMLElement {}
export const WdprSingleCalendar: {
    prototype: WdprSingleCalendar;
    new (): WdprSingleCalendar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
