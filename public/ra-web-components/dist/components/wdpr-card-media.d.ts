import type { Components, JSX } from "../types/components";

interface WdprCardMedia extends Components.WdprCardMedia, HTMLElement {}
export const WdprCardMedia: {
    prototype: WdprCardMedia;
    new (): WdprCardMedia;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
