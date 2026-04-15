import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprBottomNavItem {
    el: HTMLWdprBottomNavItemElement;
    label: string;
    mediaType?: 'icon' | 'avatar';
    mediaSize?: 'small' | 'medium' | 'large';
    iconName?: string;
    iconBackground?: 'circle' | 'square' | 'none';
    iconVariant?: 'primary' | 'secondary';
    customLabelClass?: string;
    imageUrl?: string;
    disabled?: boolean;
    selected?: boolean;
    itemSelected: EventEmitter<boolean>;
    handleKeyDown(ev: KeyboardEvent): void;
    private get _labelClass();
    private get _colorClass();
    private _itemClick;
    render(): any;
}
