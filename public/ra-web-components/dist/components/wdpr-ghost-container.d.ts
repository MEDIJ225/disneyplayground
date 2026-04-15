import type { Components, JSX } from "../types/components";

interface WdprGhostContainer extends Components.WdprGhostContainer, HTMLElement {}
export const WdprGhostContainer: {
    prototype: WdprGhostContainer;
    new (): WdprGhostContainer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
