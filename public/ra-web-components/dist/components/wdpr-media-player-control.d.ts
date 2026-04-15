import type { Components, JSX } from "../types/components";

interface WdprMediaPlayerControl extends Components.WdprMediaPlayerControl, HTMLElement {}
export const WdprMediaPlayerControl: {
    prototype: WdprMediaPlayerControl;
    new (): WdprMediaPlayerControl;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
