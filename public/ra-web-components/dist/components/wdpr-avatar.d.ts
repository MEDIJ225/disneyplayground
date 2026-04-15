import type { Components, JSX } from "../types/components";

interface WdprAvatar extends Components.WdprAvatar, HTMLElement {}
export const WdprAvatar: {
    prototype: WdprAvatar;
    new (): WdprAvatar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
