import type { Components, JSX } from "../types/components";

interface WdprIndicatorDots extends Components.WdprIndicatorDots, HTMLElement {}
export const WdprIndicatorDots: {
    prototype: WdprIndicatorDots;
    new (): WdprIndicatorDots;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
