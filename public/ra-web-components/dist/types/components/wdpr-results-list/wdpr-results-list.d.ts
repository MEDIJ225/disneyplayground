import { EventEmitter } from '../../stencil-public-runtime';
import type { ResultsListItemConfig, ResultsListGroup, SelectionMode } from '../wdpr-results-list-item/wdpr-results-list-item.model';
import { RadialLabelPlacement, RadialLoaderSize } from '../wdpr-radial-loader/wdpr-radial-loader.model';
import { InlineMessageSize } from '../wdpr-inline-message/wdpr-inline-message.model';
import { IconLibrarySize } from '../wdpr-icon-library/wdpr-icon-library.model';
export declare class WdprResultsList {
    /**
     * Reference to the host element.
     */
    el: HTMLElement;
    /**
     * The items to display in the list.
     */
    items: ResultsListItemConfig[];
    /**
     * Groups of items to display with headers.
     */
    groups: ResultsListGroup[];
    /**
     * Selection mode: 'single' for single selection, 'multiple' for checkboxes, 'none' for no selection.
     */
    selectionMode: SelectionMode;
    /**
     * Whether to show dividers between items.
     */
    showDivider: boolean;
    /**
     * The ID of the element that labels the list.
     */
    labelledBy?: string;
    /**
     * Maximum number of items to display before scrolling.
     */
    maxViewableItems: number | null;
    isLoading: boolean;
    loadingText: string;
    loaderSize: RadialLoaderSize;
    loaderLabelPlacement: RadialLabelPlacement;
    showLoaderLabel: boolean;
    isEmpty: boolean;
    emptyText: string;
    emptyIcon: string;
    emptyIconSize: IconLibrarySize;
    errorOnLoad: boolean;
    errorText: string;
    errorTextSize: InlineMessageSize;
    private _selectedItems;
    private _focusedIndex;
    /** Whether to show the visual focus ring (only true for keyboard navigation) */
    private _showFocusRing;
    /** Measured max height for scrollable container */
    private _measuredMaxHeight;
    /** Track if Shift key was pressed (for Shift+Tab focus direction) */
    private _shiftKeyPressed;
    /** Track if a pointer (mouse/touch) is down - used to skip focus ring on click */
    private _pointerDown;
    wdprSelectionChange: EventEmitter<{
        selectedItems: ResultsListItemConfig[];
    }>;
    itemsChanged(newItems: ResultsListItemConfig[], oldItems: ResultsListItemConfig[]): void;
    groupsChanged(newGroups: ResultsListGroup[], oldGroups: ResultsListGroup[]): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    /**
     * Measures actual rendered item heights and calculates max-height for scrolling.
     */
    private _measureItemHeights;
    /**
     * Syncs the internal _selectedItems state from the items prop.
     * Items with checked=true or selected=true will be added to the selection.
     */
    private _syncSelectedItemsFromProps;
    disconnectedCallback(): void;
    private _trackShiftKey;
    private _trackShiftKeyUp;
    /**
     * Handles keyboard events for the results list.
     * Arrow Up/Down for focus navigation, Home/End for first/last, Enter/Space for selection.
     * Tab moves between selected items in multiple selection mode.
     * @param {KeyboardEvent} ev The keyboard event.
     */
    handleKeyDown(ev: KeyboardEvent): void;
    private _focusNextItem;
    private _focusPreviousItem;
    /**
     * Focus the next selected item (for Tab navigation in multiple selection mode)
     * Returns true if moved to another selected item, false if no more selected items
     */
    private _focusNextSelectedItem;
    /**
     * Focus the previous selected item (for Shift+Tab navigation in multiple selection mode)
     * Returns true if moved to another selected item, false if no more selected items
     */
    private _focusPreviousSelectedItem;
    private _focusFirstItem;
    private _focusLastItem;
    private _setFocusedItem;
    private _focusItemElement;
    /**
     * Find the index of the first selected item, or -1 if none
     */
    private _getFirstSelectedItemIndex;
    /**
     * Find the index of the last selected item, or -1 if none
     */
    private _getLastSelectedItemIndex;
    /**
     * Focus on the selected item if one exists, otherwise focus on the first item
     * For Shift+Tab with multiple selections, focus the last selected item
     * For Tab or when nothing is selected, focus the first selected/first item
     */
    private _focusSelectedOrFirstItem;
    /**
     * Initialize focus on selected item (or first item) when list receives focus via keyboard
     */
    private _handleListFocus;
    /**
     * Track pointer down to distinguish keyboard vs pointer focus
     */
    private _handlePointerDown;
    /**
     * Reset pointer down flag after click has been processed
     */
    private _handleClick;
    /**
     * Clear focus when the list loses focus
     */
    private _handleListBlur;
    /**
     * Clear focus from all items
     */
    private _clearFocus;
    private _handleItemSelect;
    private _getAllItems;
    private _getSpacingClass;
    private _getVariantForItem;
    private _renderListItem;
    private _renderGroupHeader;
    private _renderGroups;
    private _renderGroupListItem;
    private _renderItems;
    private _renderContent;
    render(): any;
}
