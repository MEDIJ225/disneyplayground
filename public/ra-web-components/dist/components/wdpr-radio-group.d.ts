import type { Components, JSX } from "../types/components";

interface WdprRadioGroup extends Components.WdprRadioGroup, HTMLElement {}
export const WdprRadioGroup: {
    prototype: WdprRadioGroup;
    new (): WdprRadioGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
