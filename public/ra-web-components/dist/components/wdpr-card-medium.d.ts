import type { Components, JSX } from "../types/components";

interface WdprCardMedium extends Components.WdprCardMedium, HTMLElement {}
export const WdprCardMedium: {
    prototype: WdprCardMedium;
    new (): WdprCardMedium;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
