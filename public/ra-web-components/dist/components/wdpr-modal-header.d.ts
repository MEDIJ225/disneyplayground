import type { Components, JSX } from "../types/components";

interface WdprModalHeader extends Components.WdprModalHeader, HTMLElement {}
export const WdprModalHeader: {
    prototype: WdprModalHeader;
    new (): WdprModalHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
