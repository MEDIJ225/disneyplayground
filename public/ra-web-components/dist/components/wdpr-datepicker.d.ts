import type { Components, JSX } from "../types/components";

interface WdprDatepicker extends Components.WdprDatepicker, HTMLElement {}
export const WdprDatepicker: {
    prototype: WdprDatepicker;
    new (): WdprDatepicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
