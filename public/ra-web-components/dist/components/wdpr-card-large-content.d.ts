import type { Components, JSX } from "../types/components";

interface WdprCardLargeContent extends Components.WdprCardLargeContent, HTMLElement {}
export const WdprCardLargeContent: {
    prototype: WdprCardLargeContent;
    new (): WdprCardLargeContent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
