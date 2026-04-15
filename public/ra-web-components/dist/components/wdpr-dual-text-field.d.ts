import type { Components, JSX } from "../types/components";

interface WdprDualTextField extends Components.WdprDualTextField, HTMLElement {}
export const WdprDualTextField: {
    prototype: WdprDualTextField;
    new (): WdprDualTextField;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
