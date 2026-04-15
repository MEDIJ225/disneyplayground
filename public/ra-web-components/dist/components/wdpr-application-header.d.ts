import type { Components, JSX } from "../types/components";

interface WdprApplicationHeader extends Components.WdprApplicationHeader, HTMLElement {}
export const WdprApplicationHeader: {
    prototype: WdprApplicationHeader;
    new (): WdprApplicationHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
