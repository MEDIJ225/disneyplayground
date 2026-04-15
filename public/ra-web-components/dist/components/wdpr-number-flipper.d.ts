import type { Components, JSX } from "../types/components";

interface WdprNumberFlipper extends Components.WdprNumberFlipper, HTMLElement {}
export const WdprNumberFlipper: {
    prototype: WdprNumberFlipper;
    new (): WdprNumberFlipper;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
