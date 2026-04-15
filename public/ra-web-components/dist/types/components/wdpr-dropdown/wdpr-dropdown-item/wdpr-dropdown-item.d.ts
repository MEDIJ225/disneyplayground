import { EventEmitter } from '../../../stencil-public-runtime';
import { DropdownSelectionMode } from '../wdpr-dropdown.model';
export declare class WdprDropdownItem {
    private _internalId;
    el: HTMLWdprDropdownItemElement;
    _hideDivider: boolean;
    itemId: string;
    value: string;
    label: string;
    description: string;
    disabled: boolean;
    selected: boolean;
    mode: DropdownSelectionMode;
    isFocused: boolean;
    wdprSelect: EventEmitter<{
        value: string;
        label: string;
        selected: boolean;
        id: string;
    }>;
    componentWillLoad(): void;
    hideDivider(): Promise<void>;
    private _handleSelection;
    private _handleMultipleCheckboxChange;
    private _suppressCheckboxClickBubble;
    private _renderVariant;
    private get _singleSelectionClasses();
    private get _multipleSelectionClasses();
    render(): any;
}
