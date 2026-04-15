import type { Components, JSX } from "../types/components";

interface WdprBreadcrumbItem extends Components.WdprBreadcrumbItem, HTMLElement {}
export const WdprBreadcrumbItem: {
    prototype: WdprBreadcrumbItem;
    new (): WdprBreadcrumbItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
