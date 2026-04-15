import type { Components, JSX } from "../types/components";

interface WdprAvatarGroup extends Components.WdprAvatarGroup, HTMLElement {}
export const WdprAvatarGroup: {
    prototype: WdprAvatarGroup;
    new (): WdprAvatarGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
