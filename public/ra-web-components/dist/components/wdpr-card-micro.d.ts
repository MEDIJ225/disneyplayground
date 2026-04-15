import type { Components, JSX } from "../types/components";

interface WdprCardMicro extends Components.WdprCardMicro, HTMLElement {}
export const WdprCardMicro: {
    prototype: WdprCardMicro;
    new (): WdprCardMicro;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
