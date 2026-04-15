import type { Components, JSX } from "../types/components";

interface WdprTextHeader extends Components.WdprTextHeader, HTMLElement {}
export const WdprTextHeader: {
    prototype: WdprTextHeader;
    new (): WdprTextHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
