import type { Components, JSX } from "../types/components";

interface WdprDayCountdownTimer extends Components.WdprDayCountdownTimer, HTMLElement {}
export const WdprDayCountdownTimer: {
    prototype: WdprDayCountdownTimer;
    new (): WdprDayCountdownTimer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
