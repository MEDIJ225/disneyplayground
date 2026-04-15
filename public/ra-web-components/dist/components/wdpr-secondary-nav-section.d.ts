import type { Components, JSX } from "../types/components";

interface WdprSecondaryNavSection extends Components.WdprSecondaryNavSection, HTMLElement {}
export const WdprSecondaryNavSection: {
    prototype: WdprSecondaryNavSection;
    new (): WdprSecondaryNavSection;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
