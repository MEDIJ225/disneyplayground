import { EventEmitter } from '../../stencil-public-runtime';
import { DropdownLocation, DropdownRequirementIndicator, DropdownSelectionMode, DropdownValueItem } from './wdpr-dropdown.model';
import { InlineMessageSize } from '../wdpr-inline-message/wdpr-inline-message.model';
import { RadialLoaderSize, RadialLabelPlacement } from '../wdpr-radial-loader/wdpr-radial-loader.model';
export declare class WdprDropdown {
    private _listId;
    private _dropdownId;
    private _defaultCheckedIds;
    private _slotObserver;
    private _resizeObserver;
    private _listEl;
    private _cachedItems;
    el: HTMLWdprDropdownElement;
    internals: ElementInternals;
    _expanded: boolean;
    _measuredMaxHeight: string | null;
    _readyToShow: boolean;
    _selectedValues: Set<DropdownValueItem>;
    _focusedIndex: number;
    _leadingIcon?: HTMLSlotElement | null;
    _activeDescendantId?: string;
    /**
     * The value to set/clear in the dropdown.
     * Use the item's **label** (display text), not the item's `value` attribute.
     * Examples: "New York", "London" — not "new-york", "london"
     */
    value: string;
    mode: DropdownSelectionMode;
    label: string;
    helperText: string;
    location: DropdownLocation;
    required: boolean;
    name?: string;
    readonly: boolean;
    disabled: boolean;
    error: boolean;
    noDivider: boolean;
    maxViewableItems: number | null;
    requirementIndicator: DropdownRequirementIndicator;
    a11yLabel: string;
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
    wdprLeadingIconClick: EventEmitter<void>;
    wdprSelectionChange: EventEmitter<{
        selectedValues: {
            id: string;
            value: string;
            label: string;
        }[];
    }>;
    updateSelectedValues(): void;
    handleExpandedChange(newValue: boolean): void;
    handleMaxViewableItemsChange(): void;
    formPropsChanged(): void;
    handleValueChanged(): void;
    handleItemSelect(event: CustomEvent<{
        value: string;
        label: string;
        selected: boolean;
        id: string;
    }>): void;
    handleClickOutside(event: MouseEvent): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _getSelectedFormValues;
    private _updateValidity;
    private _updateFormValue;
    private _handleFormReset;
    private _closeDropdown;
    private _getAllListItems;
    private _initAllItems;
    private _syncSelectionFromValue;
    private _groupLastItems;
    private _handleLeadingIconSlotChange;
    private _updateSelectedValues;
    private _updateValuesFromSingleSelection;
    private _updateValuesFromMultipleSelection;
    private _syncSelectionItemsState;
    /**
     * Measures the height of the dropdown list and sets the max height for scrollable lists.
     * Calculates based on the number of visible items and their bounding rectangles.
     */
    private _measureItemHeights;
    private _renderDropdown;
    private _renderList;
    private _renderInlineMessage;
    private _renderListWrapper;
    private _renderStatusMessage;
    private _onLeadingClick;
    private _handleComboboxClick;
    /**
     * Handles keyboard navigation and accessibility for the dropdown.
     * Supports arrow keys, Enter, Space, Escape, and Tab for navigation and selection.
     * @param ev The keyboard event
     */
    private _handleKeydown;
    /**
     * Sets focus to the item at the given index, updates ARIA attributes, and scrolls it into view.
     * @param index The index of the item to focus
     * @param items The array of dropdown items
     */
    private _focusItemAtIndex;
    private _setFocusIndex;
    private _updateAriaActivedescendant;
    private _removeAriaActivedescendant;
    private _scrollIntoItem;
    private _invalidateItemsCache;
    private get _requirementLabel();
    private get _isMultipleMode();
    private get _hasSelection();
    private get _emptyDisplayValue();
    private get _displayValue();
    private get _hasValueAttr();
    private get _dropdownIcon();
    private get _isListVisible();
    render(): any;
}
