import type { Components, JSX } from "../types/components";

interface WdprMedia extends Components.WdprMedia, HTMLElement {}
export const WdprMedia: {
    prototype: WdprMedia;
    new (): WdprMedia;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
