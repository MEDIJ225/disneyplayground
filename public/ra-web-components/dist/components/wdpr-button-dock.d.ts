import type { Components, JSX } from "../types/components";

interface WdprButtonDock extends Components.WdprButtonDock, HTMLElement {}
export const WdprButtonDock: {
    prototype: WdprButtonDock;
    new (): WdprButtonDock;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
