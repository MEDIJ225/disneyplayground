export type ComboboxLocation = 'above' | 'below';
export type ComboboxSelectionMode = 'single' | 'multiple';
export type ComboboxNavigationDirection = 'down' | 'up';
export type ComboboxFilterMode = 'auto' | 'manual';
export type ComboboxIconNameType = 'expand-show-less' | 'expand-show-more';
export interface ComboboxValueItem {
    id: string;
    value: string;
    label: string;
}
export interface ComboboxItemElement extends HTMLElement {
    value: string;
    label: string;
    mode: string;
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
export declare function isComboboxItemElement(el: HTMLElement): el is ComboboxItemElement;
