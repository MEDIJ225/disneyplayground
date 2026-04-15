import type { Components, JSX } from "../types/components";

interface WdprPageHeader extends Components.WdprPageHeader, HTMLElement {}
export const WdprPageHeader: {
    prototype: WdprPageHeader;
    new (): WdprPageHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
