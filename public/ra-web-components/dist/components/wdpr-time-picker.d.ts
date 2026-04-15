import type { Components, JSX } from "../types/components";

interface WdprTimePicker extends Components.WdprTimePicker, HTMLElement {}
export const WdprTimePicker: {
    prototype: WdprTimePicker;
    new (): WdprTimePicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
