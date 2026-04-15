import type { Components, JSX } from "../types/components";

interface WdprRive extends Components.WdprRive, HTMLElement {}
export const WdprRive: {
    prototype: WdprRive;
    new (): WdprRive;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
