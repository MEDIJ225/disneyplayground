import type { Components, JSX } from "../types/components";

interface WdprWeekHeader extends Components.WdprWeekHeader, HTMLElement {}
export const WdprWeekHeader: {
    prototype: WdprWeekHeader;
    new (): WdprWeekHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
