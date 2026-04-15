import type { Components, JSX } from "../types/components";

interface WdprPageWideMessage extends Components.WdprPageWideMessage, HTMLElement {}
export const WdprPageWideMessage: {
    prototype: WdprPageWideMessage;
    new (): WdprPageWideMessage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
