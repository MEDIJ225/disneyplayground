import type { Components, JSX } from "../types/components";

interface WdprModalFooter extends Components.WdprModalFooter, HTMLElement {}
export const WdprModalFooter: {
    prototype: WdprModalFooter;
    new (): WdprModalFooter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
