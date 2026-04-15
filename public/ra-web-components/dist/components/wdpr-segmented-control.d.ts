import type { Components, JSX } from "../types/components";

interface WdprSegmentedControl extends Components.WdprSegmentedControl, HTMLElement {}
export const WdprSegmentedControl: {
    prototype: WdprSegmentedControl;
    new (): WdprSegmentedControl;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
