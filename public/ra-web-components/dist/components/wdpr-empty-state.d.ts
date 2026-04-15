import type { Components, JSX } from "../types/components";

interface WdprEmptyState extends Components.WdprEmptyState, HTMLElement {}
export const WdprEmptyState: {
    prototype: WdprEmptyState;
    new (): WdprEmptyState;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
