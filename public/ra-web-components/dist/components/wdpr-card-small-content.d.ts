import type { Components, JSX } from "../types/components";

interface WdprCardSmallContent extends Components.WdprCardSmallContent, HTMLElement {}
export const WdprCardSmallContent: {
    prototype: WdprCardSmallContent;
    new (): WdprCardSmallContent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
