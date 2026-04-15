import type { Components, JSX } from "../types/components";

interface WdprMultiStepLoader extends Components.WdprMultiStepLoader, HTMLElement {}
export const WdprMultiStepLoader: {
    prototype: WdprMultiStepLoader;
    new (): WdprMultiStepLoader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
