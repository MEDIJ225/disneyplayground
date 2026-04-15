import type { Components, JSX } from "../types/components";

interface WdprDoubleCalendar extends Components.WdprDoubleCalendar, HTMLElement {}
export const WdprDoubleCalendar: {
    prototype: WdprDoubleCalendar;
    new (): WdprDoubleCalendar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
