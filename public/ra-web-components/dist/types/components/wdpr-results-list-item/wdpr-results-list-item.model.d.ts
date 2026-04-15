export type ResultsListItemVariant = 'label' | 'label-with-icon' | 'checkbox' | 'slot';
export interface ResultsListItemConfig {
    id: string | number;
    label: string;
    description?: string;
    icon?: string;
    value: string;
    selected?: boolean;
    disabled?: boolean;
    checked?: boolean;
}
export interface ResultsListGroup {
    id: string | number;
    label: string;
    items: ResultsListItemConfig[];
}
export type SelectionMode = 'single' | 'multiple' | 'none';
