import type { Components, JSX } from "../types/components";

interface WdprMediaPlayer extends Components.WdprMediaPlayer, HTMLElement {}
export const WdprMediaPlayer: {
    prototype: WdprMediaPlayer;
    new (): WdprMediaPlayer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
