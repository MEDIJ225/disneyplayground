import type { Components, JSX } from "../types/components";

interface WdprInlineMessage extends Components.WdprInlineMessage, HTMLElement {}
export const WdprInlineMessage: {
    prototype: WdprInlineMessage;
    new (): WdprInlineMessage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
