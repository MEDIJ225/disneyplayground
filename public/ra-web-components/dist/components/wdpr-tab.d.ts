import type { Components, JSX } from "../types/components";

interface WdprTab extends Components.WdprTab, HTMLElement {}
export const WdprTab: {
    prototype: WdprTab;
    new (): WdprTab;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
