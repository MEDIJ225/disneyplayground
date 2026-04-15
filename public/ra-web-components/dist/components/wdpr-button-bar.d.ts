import type { Components, JSX } from "../types/components";

interface WdprButtonBar extends Components.WdprButtonBar, HTMLElement {}
export const WdprButtonBar: {
    prototype: WdprButtonBar;
    new (): WdprButtonBar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
