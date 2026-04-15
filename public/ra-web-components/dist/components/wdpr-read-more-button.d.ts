import type { Components, JSX } from "../types/components";

interface WdprReadMoreButton extends Components.WdprReadMoreButton, HTMLElement {}
export const WdprReadMoreButton: {
    prototype: WdprReadMoreButton;
    new (): WdprReadMoreButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
