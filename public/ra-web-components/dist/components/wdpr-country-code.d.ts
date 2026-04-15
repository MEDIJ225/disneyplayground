import type { Components, JSX } from "../types/components";

interface WdprCountryCode extends Components.WdprCountryCode, HTMLElement {}
export const WdprCountryCode: {
    prototype: WdprCountryCode;
    new (): WdprCountryCode;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
