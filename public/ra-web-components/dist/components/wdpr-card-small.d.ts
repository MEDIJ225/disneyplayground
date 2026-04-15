import type { Components, JSX } from "../types/components";

interface WdprCardSmall extends Components.WdprCardSmall, HTMLElement {}
export const WdprCardSmall: {
    prototype: WdprCardSmall;
    new (): WdprCardSmall;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
