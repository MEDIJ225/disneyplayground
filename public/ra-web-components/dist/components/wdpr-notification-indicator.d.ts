import type { Components, JSX } from "../types/components";

interface WdprNotificationIndicator extends Components.WdprNotificationIndicator, HTMLElement {}
export const WdprNotificationIndicator: {
    prototype: WdprNotificationIndicator;
    new (): WdprNotificationIndicator;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
