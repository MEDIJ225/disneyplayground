import type { Components, JSX } from "../types/components";

interface WdprToggle extends Components.WdprToggle, HTMLElement {}
export const WdprToggle: {
    prototype: WdprToggle;
    new (): WdprToggle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
