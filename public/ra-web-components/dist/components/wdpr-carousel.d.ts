import type { Components, JSX } from "../types/components";

interface WdprCarousel extends Components.WdprCarousel, HTMLElement {}
export const WdprCarousel: {
    prototype: WdprCarousel;
    new (): WdprCarousel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
