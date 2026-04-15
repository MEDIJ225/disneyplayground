import type { Components, JSX } from "../types/components";

interface WdprIcon extends Components.WdprIcon, HTMLElement {}
export const WdprIcon: {
    prototype: WdprIcon;
    new (): WdprIcon;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
