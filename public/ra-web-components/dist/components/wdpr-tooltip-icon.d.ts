import type { Components, JSX } from "../types/components";

interface WdprTooltipIcon extends Components.WdprTooltipIcon, HTMLElement {}
export const WdprTooltipIcon: {
    prototype: WdprTooltipIcon;
    new (): WdprTooltipIcon;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
