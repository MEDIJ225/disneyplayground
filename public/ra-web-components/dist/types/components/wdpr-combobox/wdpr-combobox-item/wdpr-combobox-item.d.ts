import { EventEmitter } from '../../../stencil-public-runtime';
import { ComboboxSelectionMode } from '../wdpr-combobox.model';
export declare class WdprComboboxItem {
    private _internalId;
    el: HTMLWdprComboboxItemElement;
    _hideDivider: boolean;
    itemId: string;
    value: string;
    label: string;
    description: string;
    disabled: boolean;
    selected: boolean;
    mode: ComboboxSelectionMode;
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
    private _handleMultipleCheckboxChange;
    private _suppressCheckboxClickBubble;
    private _renderVariant;
    private get _singleSelectionClasses();
    private get _multipleSelectionClasses();
    render(): any;
}
