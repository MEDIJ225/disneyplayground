import type { Components, JSX } from "../types/components";

interface WdprQrcode extends Components.WdprQrcode, HTMLElement {}
export const WdprQrcode: {
    prototype: WdprQrcode;
    new (): WdprQrcode;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
