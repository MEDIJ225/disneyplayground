import type { Components, JSX } from "../types/components";

interface WdprRadioButton extends Components.WdprRadioButton, HTMLElement {}
export const WdprRadioButton: {
    prototype: WdprRadioButton;
    new (): WdprRadioButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
