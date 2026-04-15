import type { Components, JSX } from "../types/components";

interface WdprClusterPin extends Components.WdprClusterPin, HTMLElement {}
export const WdprClusterPin: {
    prototype: WdprClusterPin;
    new (): WdprClusterPin;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
