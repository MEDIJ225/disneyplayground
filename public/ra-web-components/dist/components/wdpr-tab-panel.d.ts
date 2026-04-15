import type { Components, JSX } from "../types/components";

interface WdprTabPanel extends Components.WdprTabPanel, HTMLElement {}
export const WdprTabPanel: {
    prototype: WdprTabPanel;
    new (): WdprTabPanel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
