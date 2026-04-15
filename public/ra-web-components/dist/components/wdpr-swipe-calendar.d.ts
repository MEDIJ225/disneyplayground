import type { Components, JSX } from "../types/components";

interface WdprSwipeCalendar extends Components.WdprSwipeCalendar, HTMLElement {}
export const WdprSwipeCalendar: {
    prototype: WdprSwipeCalendar;
    new (): WdprSwipeCalendar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
