import type { Components, JSX } from "../types/components";

interface WdprBadge extends Components.WdprBadge, HTMLElement {}
export const WdprBadge: {
    prototype: WdprBadge;
    new (): WdprBadge;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
