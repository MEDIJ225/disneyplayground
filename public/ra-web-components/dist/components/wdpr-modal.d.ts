import type { Components, JSX } from "../types/components";

interface WdprModal extends Components.WdprModal, HTMLElement {}
export const WdprModal: {
    prototype: WdprModal;
    new (): WdprModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
