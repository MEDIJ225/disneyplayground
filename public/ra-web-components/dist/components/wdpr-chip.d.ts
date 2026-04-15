import type { Components, JSX } from "../types/components";

interface WdprChip extends Components.WdprChip, HTMLElement {}
export const WdprChip: {
    prototype: WdprChip;
    new (): WdprChip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
