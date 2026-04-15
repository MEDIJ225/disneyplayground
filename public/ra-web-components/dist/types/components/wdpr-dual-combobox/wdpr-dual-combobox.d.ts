import { EventEmitter } from '../../stencil-public-runtime';
import { DualComboboxLocation, DualComboboxActiveInput, DualComboboxValueItem, DualComboboxFilterMode } from './wdpr-dual-combobox.model';
import { RadialLabelPlacement, RadialLoaderSize } from '../wdpr-radial-loader/wdpr-radial-loader.model';
import { InlineMessageSize } from '../wdpr-inline-message/wdpr-inline-message.model';
import { DualTextFieldRequirementIndicator } from '../wdpr-dual-text-field/wdpr-dual-text-field.model';
export declare class WdprDualCombobox {
    private _listId;
    private _slotObserver;
    private _listEl;
    private _cachedItems;
    private _measureDebounceTimer;
    el: HTMLWdprDualComboboxElement;
    internals: ElementInternals;
    _activeInput: DualComboboxActiveInput;
    _leadingInputValue: string;
    _trailingInputValue: string;
    _expanded: boolean;
    _readyToShow: boolean;
    _focusedIndex: number;
    _measuredMaxHeight: string | null;
    _activeDescendantId?: string;
    _selectedValue: DualComboboxValueItem | null;
    leadingValue: string;
    leadingLabel: string;
    leadingRequirementIndicator: DualTextFieldRequirementIndicator;
    trailingValue: string;
    trailingLabel: string;
    trailingRequirementIndicator: DualTextFieldRequirementIndicator;
    helperText: string;
    disabled: boolean;
    required: boolean;
    error: boolean;
    readonly: boolean;
    name?: string;
    a11yLabel: string;
    filterMode: DualComboboxFilterMode;
    location: DualComboboxLocation;
    toggleButtonAriaLabelClosed: string;
    toggleButtonAriaLabelOpen: string;
    hideIcon: boolean;
    noDivider: boolean;
    maxViewableItems: number | null;
    isLoading: boolean;
    loadingText: string;
    loaderSize: RadialLoaderSize;
    loaderLabelPlacement: RadialLabelPlacement;
    showLoaderLabel: boolean;
    emptyText: string;
    emptyTextSize: InlineMessageSize;
    isErrorLoading: boolean;
    errorText: string;
    errorTextSize: InlineMessageSize;
    wdprValueChanged: EventEmitter<{
        leadingValue?: string;
        trailingValue?: string;
    }>;
    wdprSelectionChange: EventEmitter<{
        selectedValue: {
            id: string;
            value: string;
            label: string;
        } | null;
    }>;
    handleItemSelect(event: CustomEvent<{
        value: string;
        label: string;
        selected: boolean;
        id: string;
    }>): void;
    handleControlledValueChange(): void;
    handleExpandedChange(newValue: boolean): void;
    handleMaxViewableItemsChange(): void;
    updateSelectedValues(): void;
    formPropsChanged(): void;
    handleInputValueChange(): void;
    handleClickOutside(event: MouseEvent): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    private _applyValue;
    private _getSelectedFormValue;
    private _updateFormValue;
    private _updateValidity;
    private _handleSearchChange;
    /**
     * Filters items based on both input values by calling hideItem/showItem on each DOM item.
     */
    private _applyFilter;
    private _updateSelectedValues;
    private _handleInputClick;
    private _handleInputFocus;
    private _handleValueChanged;
    private _syncSelectionItemsState;
    private _closeDropdown;
    /**
     * Handles keyboard navigation and accessibility for the dropdown.
     * Supports arrow keys, Enter, Space, Escape, and Tab for navigation and selection.
     * @param ev The keyboard event
     */
    private _handleKeydown;
    private _handleIconButtonClick;
    private _getAllListItems;
    private _invalidateItemsCache;
    private _getAllVisibleListItems;
    private _groupLastItems;
    private _initAllItems;
    /**
     * Sets focus to the item at the given index, updates ARIA attributes, and scrolls it into view.
     * @param index The index of the item to focus
     * @param items The array of dropdown items
     */
    private _focusItemAtIndex;
    private _scrollIntoItem;
    private _setFocusIndex;
    private _updateAriaActivedescendant;
    private _removeAriaActivedescendant;
    /**
     * Measures the height of the dropdown list and sets the max height for scrollable lists.
     * Calculates based on the number of visible items and their bounding rectangles.
     */
    private _measureItemHeights;
    private _getIconName;
    private _getIconButtonAriaLabel;
    private _setInputsFromLabel;
    private _clearInputs;
    private _renderList;
    private _renderListWrapper;
    private _renderStatusMessage;
    private get _isListVisible();
    render(): any;
}
