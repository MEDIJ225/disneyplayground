import type { Components, JSX } from "../types/components";

interface WdprDetailedCountdownTimer extends Components.WdprDetailedCountdownTimer, HTMLElement {}
export const WdprDetailedCountdownTimer: {
    prototype: WdprDetailedCountdownTimer;
    new (): WdprDetailedCountdownTimer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
