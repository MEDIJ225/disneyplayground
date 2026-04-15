import type { Components, JSX } from "../types/components";

interface WdprBreadcrumb extends Components.WdprBreadcrumb, HTMLElement {}
export const WdprBreadcrumb: {
    prototype: WdprBreadcrumb;
    new (): WdprBreadcrumb;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
