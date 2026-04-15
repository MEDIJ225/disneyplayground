import type { Components, JSX } from "../types/components";

interface WdprTextLink extends Components.WdprTextLink, HTMLElement {}
export const WdprTextLink: {
    prototype: WdprTextLink;
    new (): WdprTextLink;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
