import type { Components, JSX } from "../types/components";

interface WdprPanel extends Components.WdprPanel, HTMLElement {}
export const WdprPanel: {
    prototype: WdprPanel;
    new (): WdprPanel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
