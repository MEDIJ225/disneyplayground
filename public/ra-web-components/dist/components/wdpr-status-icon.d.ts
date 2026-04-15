import type { Components, JSX } from "../types/components";

interface WdprStatusIcon extends Components.WdprStatusIcon, HTMLElement {}
export const WdprStatusIcon: {
    prototype: WdprStatusIcon;
    new (): WdprStatusIcon;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
