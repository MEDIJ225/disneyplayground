import type { Components, JSX } from "../types/components";

interface WdprProgressSegment extends Components.WdprProgressSegment, HTMLElement {}
export const WdprProgressSegment: {
    prototype: WdprProgressSegment;
    new (): WdprProgressSegment;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
