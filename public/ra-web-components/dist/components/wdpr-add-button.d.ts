import type { Components, JSX } from "../types/components";

interface WdprAddButton extends Components.WdprAddButton, HTMLElement {}
export const WdprAddButton: {
    prototype: WdprAddButton;
    new (): WdprAddButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
