import type { Components, JSX } from "../types/components";

interface WdprCalendar extends Components.WdprCalendar, HTMLElement {}
export const WdprCalendar: {
    prototype: WdprCalendar;
    new (): WdprCalendar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
