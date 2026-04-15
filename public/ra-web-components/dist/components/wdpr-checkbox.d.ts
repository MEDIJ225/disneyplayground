import type { Components, JSX } from "../types/components";

interface WdprCheckbox extends Components.WdprCheckbox, HTMLElement {}
export const WdprCheckbox: {
    prototype: WdprCheckbox;
    new (): WdprCheckbox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
