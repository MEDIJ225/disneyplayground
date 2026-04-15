import type { Components, JSX } from "../types/components";

interface WdprOverlay extends Components.WdprOverlay, HTMLElement {}
export const WdprOverlay: {
    prototype: WdprOverlay;
    new (): WdprOverlay;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
