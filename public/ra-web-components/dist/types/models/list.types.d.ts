export type ListStyle = 'text-only' | 'with-leading-icon' | 'with-trailing-icon' | 'checkbox' | 'radio' | 'swap';
export type Spacing = 'condensed' | 'expanded' | 'default';
export interface ListItem {
    id: string | number;
    text: string;
    value: string;
    checked: boolean;
    icon?: string;
}
export interface ListGroup {
    id: string | number;
    label: string;
    items: ListItem[];
}
