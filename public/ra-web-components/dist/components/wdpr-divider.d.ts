import type { Components, JSX } from "../types/components";

interface WdprDivider extends Components.WdprDivider, HTMLElement {}
export const WdprDivider: {
    prototype: WdprDivider;
    new (): WdprDivider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
