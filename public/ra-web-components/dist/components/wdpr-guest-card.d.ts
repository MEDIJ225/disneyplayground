import type { Components, JSX } from "../types/components";

interface WdprGuestCard extends Components.WdprGuestCard, HTMLElement {}
export const WdprGuestCard: {
    prototype: WdprGuestCard;
    new (): WdprGuestCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
