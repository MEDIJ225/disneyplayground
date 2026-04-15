import type { Components, JSX } from "../types/components";

interface WdprTextField extends Components.WdprTextField, HTMLElement {}
export const WdprTextField: {
    prototype: WdprTextField;
    new (): WdprTextField;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
