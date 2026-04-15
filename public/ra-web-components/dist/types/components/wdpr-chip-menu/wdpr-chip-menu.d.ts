import { EventEmitter } from '../../stencil-public-runtime';
import { ChipMenuAligment, ChipMenuValueItem } from './wdpr-chip-menu.model';
import { InlineMessageSize } from '../wdpr-inline-message/wdpr-inline-message.model';
import { RadialLoaderSize, RadialLabelPlacement } from '../wdpr-radial-loader/wdpr-radial-loader.model';
export declare class WdprChipMenu {
    private _listId;
    private _dropdownId;
    private _slotObserver;
    private _resizeObserver;
    private _listEl;
    private _cachedItems;
    el: HTMLElement;
    _leadingSlot: HTMLElement | null;
    _trailingSlot: HTMLElement | null;
    _expanded: boolean;
    _selectedValue: ChipMenuValueItem | null;
    _readyToShow: boolean;
    _focusedIndex: number;
    _measuredMaxHeight: string | null;
    _activeDescendantId?: string;
    value: string;
    alignment: ChipMenuAligment;
    maxViewableItems: number | null;
    disabled: boolean;
    noDivider: boolean;
    a11yChipLabel: string;
    a11yListLabel: string;
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
    wdprSelectionChange: EventEmitter<{
        selectedValue: {
            id: string;
            value: string;
            label: string;
        } | null;
    }>;
    handleValueChanged(): void;
    updateSelectedValue(): void;
    handleExpandedChange(newValue: boolean): void;
    handleMaxViewableItemsChange(): void;
    handleItemSelect(event: CustomEvent<{
        value: string;
        label: string;
        id: string;
    }>): void;
    handleDocumentClick(event: MouseEvent): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    private _getAllListItems;
    private _groupLastItems;
    private _initAllItems;
    private _closeDropdown;
    /**
     * Measures the height of the dropdown list and sets the max height for scrollable lists.
     * Calculates based on the number of visible items and their bounding rectangles.
     */
    private _measureItemHeights;
    private _renderList;
    private _renderChipDropdown;
    private _renderListWrapper;
    private _renderStatusMessage;
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
    private _scrollIntoItem;
    private _setFocusIndex;
    private _updateAriaActivedescendant;
    private _removeAriaActivedescendant;
    private _invalidateItemsCache;
    private _syncSelectionFromValue;
    private _syncSelectionItemsState;
    private _updateSlots;
    private _handleComboboxClick;
    private _updateSelectedValue;
    private get _hasSelection();
    private get _displayValue();
    private get _isListVisible();
    render(): any;
}
