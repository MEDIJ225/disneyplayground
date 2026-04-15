import type { Components, JSX } from "../types/components";

interface WdprButton extends Components.WdprButton, HTMLElement {}
export const WdprButton: {
    prototype: WdprButton;
    new (): WdprButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
