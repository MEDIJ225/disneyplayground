import type { Components, JSX } from "../types/components";

interface WdprAccordion extends Components.WdprAccordion, HTMLElement {}
export const WdprAccordion: {
    prototype: WdprAccordion;
    new (): WdprAccordion;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
