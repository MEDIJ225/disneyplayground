import type { Components, JSX } from "../types/components";

interface WdprMapPin extends Components.WdprMapPin, HTMLElement {}
export const WdprMapPin: {
    prototype: WdprMapPin;
    new (): WdprMapPin;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
