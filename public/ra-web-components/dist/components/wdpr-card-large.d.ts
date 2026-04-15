import type { Components, JSX } from "../types/components";

interface WdprCardLarge extends Components.WdprCardLarge, HTMLElement {}
export const WdprCardLarge: {
    prototype: WdprCardLarge;
    new (): WdprCardLarge;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
