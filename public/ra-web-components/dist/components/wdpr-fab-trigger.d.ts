import type { Components, JSX } from "../types/components";

interface WdprFabTrigger extends Components.WdprFabTrigger, HTMLElement {}
export const WdprFabTrigger: {
    prototype: WdprFabTrigger;
    new (): WdprFabTrigger;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
