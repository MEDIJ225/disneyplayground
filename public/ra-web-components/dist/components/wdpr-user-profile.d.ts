import type { Components, JSX } from "../types/components";

interface WdprUserProfile extends Components.WdprUserProfile, HTMLElement {}
export const WdprUserProfile: {
    prototype: WdprUserProfile;
    new (): WdprUserProfile;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
