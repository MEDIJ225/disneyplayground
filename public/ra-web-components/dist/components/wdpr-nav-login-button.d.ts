import type { Components, JSX } from "../types/components";

interface WdprNavLoginButton extends Components.WdprNavLoginButton, HTMLElement {}
export const WdprNavLoginButton: {
    prototype: WdprNavLoginButton;
    new (): WdprNavLoginButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
