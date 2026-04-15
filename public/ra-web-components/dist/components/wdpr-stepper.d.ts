import type { Components, JSX } from "../types/components";

interface WdprStepper extends Components.WdprStepper, HTMLElement {}
export const WdprStepper: {
    prototype: WdprStepper;
    new (): WdprStepper;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
