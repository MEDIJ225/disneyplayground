import type { Components, JSX } from "../types/components";

interface WdprIconButton extends Components.WdprIconButton, HTMLElement {}
export const WdprIconButton: {
    prototype: WdprIconButton;
    new (): WdprIconButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
