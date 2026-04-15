import type { Components, JSX } from "../types/components";

interface WdprMediaHero extends Components.WdprMediaHero, HTMLElement {}
export const WdprMediaHero: {
    prototype: WdprMediaHero;
    new (): WdprMediaHero;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
