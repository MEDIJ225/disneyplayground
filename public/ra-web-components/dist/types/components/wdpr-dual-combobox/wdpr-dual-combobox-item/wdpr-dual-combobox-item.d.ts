import { EventEmitter } from '../../../stencil-public-runtime';
export declare class WdprDualComboboxItem {
    private _internalId;
    el: HTMLWdprDualComboboxItemElement;
    _hideDivider: boolean;
    itemId: string;
    value: string;
    label: string;
    description: string;
    disabled: boolean;
    selected: boolean;
    isFocused: boolean;
    isHidden: boolean;
    wdprSelect: EventEmitter<{
        value: string;
        label: string;
        selected: boolean;
        id: string;
    }>;
    hideDivider(): Promise<void>;
    showDivider(): Promise<void>;
    componentWillLoad(): void;
    private _handleSelection;
    private get _singleSelectionClasses();
    render(): any;
}
