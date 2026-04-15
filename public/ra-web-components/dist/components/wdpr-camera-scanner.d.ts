import type { Components, JSX } from "../types/components";

interface WdprCameraScanner extends Components.WdprCameraScanner, HTMLElement {}
export const WdprCameraScanner: {
    prototype: WdprCameraScanner;
    new (): WdprCameraScanner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
