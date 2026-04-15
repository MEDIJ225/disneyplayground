import type { Components, JSX } from "../types/components";

interface WdprTimeUnit extends Components.WdprTimeUnit, HTMLElement {}
export const WdprTimeUnit: {
    prototype: WdprTimeUnit;
    new (): WdprTimeUnit;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
