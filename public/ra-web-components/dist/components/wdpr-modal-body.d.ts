import type { Components, JSX } from "../types/components";

interface WdprModalBody extends Components.WdprModalBody, HTMLElement {}
export const WdprModalBody: {
    prototype: WdprModalBody;
    new (): WdprModalBody;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
