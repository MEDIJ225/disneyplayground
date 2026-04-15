import type { Components, JSX } from "../types/components";

interface WdprProgressIndicator extends Components.WdprProgressIndicator, HTMLElement {}
export const WdprProgressIndicator: {
    prototype: WdprProgressIndicator;
    new (): WdprProgressIndicator;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
