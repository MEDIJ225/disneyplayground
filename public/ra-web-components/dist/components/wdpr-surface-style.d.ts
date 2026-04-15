import type { Components, JSX } from "../types/components";

interface WdprSurfaceStyle extends Components.WdprSurfaceStyle, HTMLElement {}
export const WdprSurfaceStyle: {
    prototype: WdprSurfaceStyle;
    new (): WdprSurfaceStyle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
