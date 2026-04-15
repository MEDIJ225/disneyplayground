import type { Components, JSX } from "../types/components";

interface WdprCardFooter extends Components.WdprCardFooter, HTMLElement {}
export const WdprCardFooter: {
    prototype: WdprCardFooter;
    new (): WdprCardFooter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
