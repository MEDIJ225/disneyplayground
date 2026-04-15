import type { Components, JSX } from "../types/components";

interface WdprFavoritesButton extends Components.WdprFavoritesButton, HTMLElement {}
export const WdprFavoritesButton: {
    prototype: WdprFavoritesButton;
    new (): WdprFavoritesButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
