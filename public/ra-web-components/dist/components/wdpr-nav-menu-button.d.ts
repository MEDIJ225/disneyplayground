import type { Components, JSX } from "../types/components";

interface WdprNavMenuButton extends Components.WdprNavMenuButton, HTMLElement {}
export const WdprNavMenuButton: {
    prototype: WdprNavMenuButton;
    new (): WdprNavMenuButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
