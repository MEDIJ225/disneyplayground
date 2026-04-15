import type { Components, JSX } from "../types/components";

interface WdprCalendarDot extends Components.WdprCalendarDot, HTMLElement {}
export const WdprCalendarDot: {
    prototype: WdprCalendarDot;
    new (): WdprCalendarDot;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
