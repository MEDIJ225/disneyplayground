import type { Components, JSX } from "../types/components";

interface WdprReadMore extends Components.WdprReadMore, HTMLElement {}
export const WdprReadMore: {
    prototype: WdprReadMore;
    new (): WdprReadMore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
