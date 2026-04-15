import type { Components, JSX } from "../types/components";

interface WdprNavIconButton extends Components.WdprNavIconButton, HTMLElement {}
export const WdprNavIconButton: {
    prototype: WdprNavIconButton;
    new (): WdprNavIconButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
