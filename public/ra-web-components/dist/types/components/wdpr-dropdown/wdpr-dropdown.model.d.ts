export type DropdownVariants = 'error' | 'noError';
export type DropdownLocation = 'above' | 'below';
export type DropdownSelectionMode = 'single' | 'multiple';
export type DropdownNavigationDirection = 'down' | 'up';
export type DropdownRequirementIndicator = 'required' | 'optional' | 'none';
export interface DropdownValueItem {
    id: string;
    value: string;
    label: string;
}
export interface DropdownItemElement extends HTMLElement {
    value: string;
    label: string;
    selected: boolean;
    disabled: boolean;
    mode: string;
    isFocused: boolean;
    hideDivider?: () => Promise<void>;
}
export declare function isDropdownItemElement(el: HTMLElement): el is DropdownItemElement;
