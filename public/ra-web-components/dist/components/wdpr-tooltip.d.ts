import type { Components, JSX } from "../types/components";

interface WdprTooltip extends Components.WdprTooltip, HTMLElement {}
export const WdprTooltip: {
    prototype: WdprTooltip;
    new (): WdprTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
