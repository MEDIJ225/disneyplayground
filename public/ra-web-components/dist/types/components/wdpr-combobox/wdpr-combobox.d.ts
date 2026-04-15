import { EventEmitter } from '../../stencil-public-runtime';
import { ComboboxFilterMode, ComboboxLocation, ComboboxSelectionMode, ComboboxValueItem } from './wdpr-combobox.model';
import { RadialLabelPlacement, RadialLoaderSize } from '../wdpr-radial-loader/wdpr-radial-loader.model';
import { InlineMessageSize } from '../wdpr-inline-message/wdpr-inline-message.model';
import { TextFieldRequirementIndicator } from '../wdpr-text-field/wdpr-text-field.model';
export declare class WdprCombobox {
    private _listId;
    private _textFieldId;
    private _tagsContainerRef?;
    private _resizeObserver?;
    private _slotObserver;
    private _defaultCheckedIds;
    private _listEl;
    private _cachedItems;
    private _measureDebounceTimer;
    el: HTMLWdprComboboxElement;
    internals: ElementInternals;
    _expanded: boolean;
    _inputValue: string;
    _highlightedChipIndex: number;
    _maxVisibleTags: number;
    _focusedIndex: number;
    _selectedValues: Set<ComboboxValueItem>;
    _readyToShow: boolean;
    _activeDescendantId?: string;
    _measuredMaxHeight: string | null;
    value: string;
    label: string;
    helperText: string;
    disabled: boolean;
    required: boolean;
    error: boolean;
    readonly: boolean;
    a11yLabel: string;
    name?: string;
    filterMode: ComboboxFilterMode;
    location: ComboboxLocation;
    toggleButtonAriaLabelClosed: string;
    toggleButtonAriaLabelOpen: string;
    hideIcon: boolean;
    mode: ComboboxSelectionMode;
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
    requirementIndicator: TextFieldRequirementIndicator;
    wdprValueChanged: EventEmitter<string>;
    wdprSelectionChange: EventEmitter<{
        selectedValues: {
            id: string;
            value: string;
            label: string;
        }[];
    }>;
    handleValueChanged(): void;
    handleExpandedChange(newValue: boolean): void;
    handleMaxViewableItemsChange(): void;
    handleLeadingInputValueChange(): void;
    updateSelectedValues(): void;
    formPropsChanged(): void;
    handleItemSelect(event: CustomEvent<{
        value: string;
        label: string;
        selected: boolean;
        id: string;
    }>): void;
    handleClickOutside(event: MouseEvent): void;
    handleResetForm(): void;
    handleTagFocus(event: FocusEvent): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _updateFormValue;
    private _updateValidity;
    private _resetForm;
    private _handleValueChanged;
    private _getDisplayValue;
    private _handleInput;
    private _closeDropdown;
    private _resetInputSingleSelection;
    /**
     * Handles keyboard navigation and accessibility for the dropdown.
     * Supports arrow keys, Enter, Space, Escape, and Tab for navigation and selection.
     * @param ev The keyboard event
     */
    private _handleTagNavigation;
    private _handleKeydown;
    private _handleIconButtonClick;
    private _getAllListItems;
    private _invalidateItemsCache;
    private _getAllVisibleListItems;
    private _getSelectedValues;
    private _groupLastItems;
    /**
     * Handles item configuration: sets mode, applies divider logic.
     * Does NOT touch value, _inputValue, or _selectedValues.
     * Called on load and whenever slot items change.
     */
    private _initAllItems;
    /**
     * Resolves the controlled value prop against available items.
     * Sets _selectedValues and _inputValue accordingly.
     * Called only from @Watch('value'), on initial load and when slotObserver emits events.
     */
    private _applyValue;
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
    private _handleInputClick;
    /**
     * Filters items by calling hideItem/showItem on each DOM item.
     */
    private _applyFilter;
    private _updateSelectedValues;
    private _updateValuesFromSingleSelection;
    private _updateValuesFromMultipleSelection;
    private _syncSelectionItemsState;
    private _renderTags;
    private _focusTag;
    private _focusInput;
    private _calculateVisibleTags;
    private _setupResizeObserver;
    private _handleFormReset;
    private _renderMultiSelectInput;
    private _getIconName;
    private _getIconButtonAriaLabel;
    private _setInputFromLabel;
    private _clearInput;
    private _renderList;
    private _renderListWrapper;
    private _renderStatusMessage;
    get isMultiSelect(): boolean;
    private get _isListVisible();
    render(): any;
}
