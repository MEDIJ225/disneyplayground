import { EventEmitter } from '../../../stencil-public-runtime';
export declare class WdprChipMenuItem {
    private _internalId;
    el: HTMLWdprChipMenuItemElement;
    _hideDivider: boolean;
    itemId: string;
    value: string;
    label: string;
    description: string;
    disabled: boolean;
    selected: boolean;
    isFocused: boolean;
    wdprSelect: EventEmitter<{
        value: string;
        label: string;
        id: string;
    }>;
    componentWillLoad(): void;
    hideDivider(): Promise<void>;
    private _handleSelection;
    private get _selectionClasses();
    render(): any;
}
