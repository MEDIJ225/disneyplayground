import type { Components, JSX } from "../types/components";

interface WdprButtonGroup extends Components.WdprButtonGroup, HTMLElement {}
export const WdprButtonGroup: {
    prototype: WdprButtonGroup;
    new (): WdprButtonGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
