import type { Components, JSX } from "../types/components";

interface WdprCardMicroContent extends Components.WdprCardMicroContent, HTMLElement {}
export const WdprCardMicroContent: {
    prototype: WdprCardMicroContent;
    new (): WdprCardMicroContent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
