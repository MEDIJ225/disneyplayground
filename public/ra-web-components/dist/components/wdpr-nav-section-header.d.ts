import type { Components, JSX } from "../types/components";

interface WdprNavSectionHeader extends Components.WdprNavSectionHeader, HTMLElement {}
export const WdprNavSectionHeader: {
    prototype: WdprNavSectionHeader;
    new (): WdprNavSectionHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
