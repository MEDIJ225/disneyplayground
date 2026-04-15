import type { Components, JSX } from "../types/components";

interface WdprSegment extends Components.WdprSegment, HTMLElement {}
export const WdprSegment: {
    prototype: WdprSegment;
    new (): WdprSegment;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
