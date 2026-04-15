export type DualComboboxLocation = 'above' | 'below';
export type DualComboboxActiveInput = 'leading' | 'trailing' | null;
export type DualComboboxNavigationDirection = 'down' | 'up';
export type DualComboboxFilterMode = 'auto' | 'manual';
export type DualComboboxIconNameType = 'expand-show-less' | 'expand-show-more';
export interface DualComboboxValueItem {
    id: string;
    value: string;
    label: string;
}
export interface DualComboboxItemElement extends HTMLElement {
    value: string;
    label: string;
    selected: boolean;
    disabled: boolean;
    isFocused: boolean;
    isHidden: boolean;
    description?: string;
    hideDivider?: () => Promise<void>;
    showDivider?: () => Promise<void>;
    hideItem?: () => Promise<void>;
    showItem?: () => Promise<void>;
}
export declare function isDualComboboxItemElement(el: HTMLElement): el is DualComboboxItemElement;
