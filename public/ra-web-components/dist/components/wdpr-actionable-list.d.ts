import type { Components, JSX } from "../types/components";

interface WdprActionableList extends Components.WdprActionableList, HTMLElement {}
export const WdprActionableList: {
    prototype: WdprActionableList;
    new (): WdprActionableList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
