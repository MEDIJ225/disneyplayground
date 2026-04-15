import type { Components, JSX } from "../types/components";

interface WdprTextArea extends Components.WdprTextArea, HTMLElement {}
export const WdprTextArea: {
    prototype: WdprTextArea;
    new (): WdprTextArea;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
