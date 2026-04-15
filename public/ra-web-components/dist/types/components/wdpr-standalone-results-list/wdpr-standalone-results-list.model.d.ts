export interface StandaloneResultsListItemElement extends HTMLElement {
    value: string;
    selected: boolean;
    disabled: boolean;
    mode: string;
    hideDivider?: () => Promise<void>;
}
export declare function isStandaloneResultsListItemElement(el: HTMLElement): el is StandaloneResultsListItemElement;
export type StandaloneResultListSelectionMode = 'single' | 'multiple';
