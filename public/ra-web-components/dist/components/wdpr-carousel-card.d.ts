import type { Components, JSX } from "../types/components";

interface WdprCarouselCard extends Components.WdprCarouselCard, HTMLElement {}
export const WdprCarouselCard: {
    prototype: WdprCarouselCard;
    new (): WdprCarouselCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
