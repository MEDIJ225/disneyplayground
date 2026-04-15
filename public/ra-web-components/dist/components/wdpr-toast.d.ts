import type { Components, JSX } from "../types/components";

interface WdprToast extends Components.WdprToast, HTMLElement {}
export const WdprToast: {
    prototype: WdprToast;
    new (): WdprToast;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
