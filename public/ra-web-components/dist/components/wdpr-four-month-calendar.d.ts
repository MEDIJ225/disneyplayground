import type { Components, JSX } from "../types/components";

interface WdprFourMonthCalendar extends Components.WdprFourMonthCalendar, HTMLElement {}
export const WdprFourMonthCalendar: {
    prototype: WdprFourMonthCalendar;
    new (): WdprFourMonthCalendar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
