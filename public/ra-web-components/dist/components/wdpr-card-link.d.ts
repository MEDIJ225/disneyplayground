import type { Components, JSX } from "../types/components";

interface WdprCardLink extends Components.WdprCardLink, HTMLElement {}
export const WdprCardLink: {
    prototype: WdprCardLink;
    new (): WdprCardLink;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
