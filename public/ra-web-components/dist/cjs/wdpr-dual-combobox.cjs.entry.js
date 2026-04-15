'use strict';

var index = require('./index-4gPM_TYz.js');
var wdprDualCombobox_model = require('./wdpr-dual-combobox.model-fwta1-FG.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

/**
 * Finds the next enabled and visible index in the items array, given a start index and direction ('up' or 'down').
 * Returns -1 if all items are disabled or hidden.
 */
function findNextEnabledIndex(items, start, direction) {
    if (!items.length)
        return start;
    if (items.every(item => item.disabled || item.isHidden))
        return -1;
    const increment = direction === 'down' ? 1 : -1;
    let idx = start;
    let attempts = 0;
    // This block finds the next enabled and visible item in the desired direction,
    // wrapping around the array if necessary, and stops if all items are disabled or hidden.
    do {
        idx = (idx + increment + items.length) % items.length;
        attempts++;
    } while ((items[idx].disabled || items[idx].isHidden) && attempts < items.length);
    return items[idx].disabled || items[idx].isHidden ? -1 : idx;
}
/**
 * Determines the initial index to focus within a dropdown list based on the current selection and navigation direction.
 *
 * - If there is a selected, enabled, and visible item, its index is returned.
 * - If navigating 'down', returns the index of the first enabled and visible item, or -1 if none are enabled or visible.
 * - If navigating 'up', returns the index of the last enabled and visible item by searching backwards.
 */
function getInitialFocusIndex(items, direction) {
    // If there is a selected, enabled, and visible item, its index is returned.
    const selectedIndex = items.findIndex(item => item.selected && !item.disabled && !item.isHidden);
    if (selectedIndex !== -1) {
        return selectedIndex;
    }
    // If navigating 'down', returns the index of the first enabled and visible item, or -1 if none are enabled or visible.
    if (direction === 'down') {
        const firstEnabled = items.findIndex(item => !item.disabled && !item.isHidden);
        return firstEnabled !== -1 ? firstEnabled : -1;
    }
    // If navigating 'up', returns the index of the last enabled and visible item by searching backwards.
    for (let i = items.length - 1; i >= 0; i--) {
        if (!items[i].disabled && !items[i].isHidden)
            return i;
    }
    return -1;
}
function itemMatchesFilter(item, filterText) {
    if (!filterText)
        return true;
    const lowerFilter = filterText.toLowerCase();
    const labelMatches = item.label.toLowerCase().includes(lowerFilter);
    const descriptionMatches = item.description ?
        item.description.toLowerCase().includes(lowerFilter) : false;
    return labelMatches || descriptionMatches;
}
function splitLabel(label) {
    const [leading = '', trailing = ''] = label.split(' ');
    return [leading, trailing];
}

const wdprDualComboboxCss = ".dual-combobox-wrapper.sc-wdpr-dual-combobox{display:flex;flex-direction:column;width:100%;position:relative;font-family:var(--theme-font-family-default)}.dual-combobox-list-container-visible.sc-wdpr-dual-combobox{visibility:visible}.dual-combobox-list-container-invisible.sc-wdpr-dual-combobox{visibility:hidden}.dual-combobox-list-container.sc-wdpr-dual-combobox{position:absolute;overflow-y:auto;left:var(--theme-spacing-000);right:var(--theme-spacing-000);z-index:10;border-radius:var(--theme-radius-150);border-width:var(--theme-stroke-012);border-color:var(--theme-color-stroke-neutral-light);border-style:solid;box-shadow:var(--theme-elevation-medium-soft);background-color:var(--theme-color-surface-default)}[location='above'].sc-wdpr-dual-combobox-h .dual-combobox-list-container.sc-wdpr-dual-combobox,[location='above'].sc-wdpr-dual-combobox-h .loading-container.sc-wdpr-dual-combobox,[location='above'].sc-wdpr-dual-combobox-h .empty-container.sc-wdpr-dual-combobox,[location='above'].sc-wdpr-dual-combobox-h .error-container.sc-wdpr-dual-combobox{bottom:calc(100% + var(--theme-spacing-100))}[location='below'].sc-wdpr-dual-combobox-h .dual-combobox-list-container.sc-wdpr-dual-combobox,[location='below'].sc-wdpr-dual-combobox-h .loading-container.sc-wdpr-dual-combobox,[location='below'].sc-wdpr-dual-combobox-h .empty-container.sc-wdpr-dual-combobox,[location='below'].sc-wdpr-dual-combobox-h .error-container.sc-wdpr-dual-combobox{top:calc(100% + var(--theme-spacing-100))}.loading-container.sc-wdpr-dual-combobox,.empty-container.sc-wdpr-dual-combobox,.error-container.sc-wdpr-dual-combobox{position:absolute;left:var(--theme-spacing-000);right:var(--theme-spacing-000);z-index:10;background:var(--theme-color-surface-default);border-radius:var(--theme-radius-150);border-width:var(--theme-stroke-012);border-color:var(--theme-color-stroke-neutral-light);border-style:solid;box-shadow:var(--theme-elevation-medium-soft);padding-inline:var(--theme-spacing-200)}.loading-container.sc-wdpr-dual-combobox{padding-block:var(--theme-spacing-300)}.empty-container.sc-wdpr-dual-combobox,.error-container.sc-wdpr-dual-combobox{padding-block:var(--theme-spacing-600)}.listbox.sc-wdpr-dual-combobox{display:flex;flex-direction:column;row-gap:var(--theme-spacing-100);padding:var(--theme-spacing-200)}";

const WdprDualCombobox = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprValueChanged = index.createEvent(this, "wdprValueChanged", 7);
        this.wdprSelectionChange = index.createEvent(this, "wdprSelectionChange", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    _listId;
    _slotObserver;
    _listEl = null;
    _cachedItems = null;
    _measureDebounceTimer;
    get el() { return index.getElement(this); }
    internals;
    _activeInput = null;
    _leadingInputValue = '';
    _trailingInputValue = '';
    _expanded = false;
    _readyToShow = false;
    _focusedIndex = -1;
    _measuredMaxHeight = null;
    _activeDescendantId = undefined;
    _selectedValue = null;
    leadingValue = '';
    leadingLabel = '';
    leadingRequirementIndicator = 'none';
    trailingValue = '';
    trailingLabel = '';
    trailingRequirementIndicator = 'none';
    helperText = '';
    disabled = false;
    required = false;
    error = false;
    readonly = false;
    name;
    a11yLabel;
    filterMode = 'auto';
    location = 'below';
    toggleButtonAriaLabelClosed = '';
    toggleButtonAriaLabelOpen = '';
    hideIcon = false;
    noDivider = false;
    maxViewableItems = null;
    isLoading = false;
    loadingText = 'Loading...';
    loaderSize = 'medium';
    loaderLabelPlacement = 'inline';
    showLoaderLabel = true;
    emptyText = 'No results.';
    emptyTextSize = 'default';
    isErrorLoading = false;
    errorText = 'Failed to load items. Please try again.';
    errorTextSize = 'default';
    wdprValueChanged;
    wdprSelectionChange;
    handleItemSelect(event) {
        event.stopPropagation();
        const { detail: { value, label, selected, id }, } = event;
        this._updateSelectedValues(value, label, selected, id);
        this._closeDropdown();
    }
    handleControlledValueChange() {
        this._applyValue();
    }
    handleExpandedChange(newValue) {
        if (!newValue) {
            this._removeAriaActivedescendant();
            this._setFocusIndex(null);
        }
    }
    handleMaxViewableItemsChange() {
        requestAnimationFrame(() => {
            this._measureItemHeights();
        });
    }
    updateSelectedValues() {
        this._syncSelectionItemsState();
        this._applyFilter();
        this._updateFormValue();
    }
    formPropsChanged() {
        this._updateFormValue();
    }
    handleInputValueChange() {
        this._handleSearchChange();
    }
    handleClickOutside(event) {
        if (this._expanded && this.el && !event.composedPath().includes(this.el)) {
            this._closeDropdown();
        }
    }
    componentWillLoad() {
        this._listId = `wdpr-dual-combobox-list-${utils.generateRandId()}`;
        this._updateFormValue();
    }
    componentDidLoad() {
        requestAnimationFrame(() => {
            this._initAllItems();
            this._applyValue();
            this._measureItemHeights();
            if (this._listEl) {
                this._slotObserver.observe(this._listEl, { childList: true, subtree: true });
            }
        });
        this._slotObserver = new MutationObserver(mutations => {
            const items = mutations.flatMap(m => Array.from(m.addedNodes)).filter((n) => n.nodeType === Node.ELEMENT_NODE);
            if (items.length === 0)
                return;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Promise.all(items.map(el => ('componentOnReady' in el ? el.componentOnReady() : Promise.resolve()))).then(() => {
                this._initAllItems();
                if ((this.leadingValue || this.trailingValue) && this._selectedValue === null) {
                    this._applyValue();
                }
                this._measureItemHeights();
            });
        });
    }
    disconnectedCallback() {
        this._slotObserver?.disconnect();
    }
    _applyValue() {
        const allItems = this._getAllListItems();
        if (!this.leadingValue && !this.trailingValue) {
            this._selectedValue = null;
            this._clearInputs();
            return;
        }
        const matchedItem = allItems.find(item => !item.disabled && splitLabel(item.label)[0] === this.leadingValue && splitLabel(item.label)[1] === this.trailingValue);
        if (matchedItem) {
            this._selectedValue = { value: matchedItem.value, label: matchedItem.label, id: matchedItem.id };
            this._setInputsFromLabel(matchedItem.label);
        }
        else {
            this._selectedValue = null;
            this._leadingInputValue = this.leadingValue;
            this._trailingInputValue = this.trailingValue;
        }
    }
    _getSelectedFormValue() {
        if (!this._selectedValue)
            return null;
        const { value } = this._selectedValue;
        return value;
    }
    _updateFormValue() {
        const hasValue = !!this._selectedValue;
        const shouldSubmit = !this.disabled && !!this.name && hasValue;
        this.internals?.setFormValue?.(shouldSubmit ? this._getSelectedFormValue() : null);
        this._updateValidity();
    }
    _updateValidity() {
        if (this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        if (this.required && !this._selectedValue) {
            this.internals?.setValidity?.({ valueMissing: true }, 'An option is required');
            return;
        }
        this.internals?.setValidity?.({});
    }
    _handleSearchChange() {
        clearTimeout(this._measureDebounceTimer);
        this._measureDebounceTimer = setTimeout(() => {
            this._applyFilter();
            this._focusedIndex = -1;
            requestAnimationFrame(() => this._measureItemHeights());
        }, 100);
    }
    /**
     * Filters items based on both input values by calling hideItem/showItem on each DOM item.
     */
    _applyFilter() {
        if (this.filterMode === 'manual')
            return;
        const domItems = this._getAllListItems();
        if (!domItems.length)
            return;
        const leadingFilter = this._leadingInputValue;
        const trailingFilter = this._trailingInputValue;
        const visibleItems = [];
        domItems.forEach(item => {
            const matchesLeading = itemMatchesFilter(item, leadingFilter);
            const matchesTrailing = itemMatchesFilter(item, trailingFilter);
            const matches = matchesLeading && matchesTrailing;
            if (matches) {
                item.isHidden = false;
            }
            else {
                item.isHidden = true;
            }
            if (matches)
                visibleItems.push(item);
        });
        const groupLastItems = this._groupLastItems();
        const lastVisible = visibleItems[visibleItems.length - 1];
        visibleItems.forEach(async (item) => {
            const shouldHideDivider = this.noDivider || item === lastVisible || groupLastItems.has(item);
            if (shouldHideDivider) {
                await item.hideDivider();
            }
            else {
                await item.showDivider();
            }
        });
        const groups = Array.from(this.el.querySelectorAll('wdpr-dual-combobox-group'));
        groups.forEach(async (group) => {
            const groupItems = Array.from(group.querySelectorAll('[data-dual-combobox-item]')).filter(wdprDualCombobox_model.isDualComboboxItemElement);
            const allHidden = groupItems.every(item => item.isHidden);
            if (allHidden) {
                await group.hideGroup();
            }
            else {
                await group.showGroup();
            }
        });
    }
    _updateSelectedValues(value, label, selected, id) {
        this._selectedValue = selected ? { value, label, id } : null;
        if (selected) {
            this._setInputsFromLabel(label);
        }
        this.wdprSelectionChange.emit({ selectedValue: this._selectedValue });
    }
    _handleInputClick = () => {
        if (this.disabled)
            return;
        this._expanded = true;
    };
    _handleInputFocus = () => {
        if (this.disabled)
            return;
        this._applyFilter();
    };
    _handleValueChanged = (event) => {
        const { leadingValue, trailingValue } = event.detail;
        event.stopPropagation();
        if (leadingValue !== undefined && leadingValue !== this._leadingInputValue) {
            this._leadingInputValue = leadingValue;
            this._activeInput = 'leading';
            if (!this._expanded)
                this._expanded = true;
            if (this._selectedValue) {
                this._selectedValue = null;
                this.wdprSelectionChange.emit({ selectedValue: this._selectedValue });
            }
        }
        if (trailingValue !== undefined && trailingValue !== this._trailingInputValue) {
            this._trailingInputValue = trailingValue;
            this._activeInput = 'trailing';
            if (!this._expanded)
                this._expanded = true;
            if (this._selectedValue) {
                this._selectedValue = null;
                this.wdprSelectionChange.emit({ selectedValue: this._selectedValue });
            }
        }
        this.wdprValueChanged.emit({ leadingValue, trailingValue });
        this._updateFormValue();
    };
    _syncSelectionItemsState() {
        const items = this._getAllListItems();
        items.forEach(item => {
            item.selected = this._selectedValue?.value === item.value && this._selectedValue?.id === item.id;
        });
    }
    _closeDropdown() {
        this._expanded = false;
        // Reset inputs to match selection state when closing
        if (this._selectedValue) {
            this._setInputsFromLabel(this._selectedValue.label);
        }
        else {
            this._clearInputs();
        }
        this.wdprValueChanged.emit({ leadingValue: this._leadingInputValue, trailingValue: this._trailingInputValue });
    }
    /**
     * Handles keyboard navigation and accessibility for the dropdown.
     * Supports arrow keys, Enter, Space, Escape, and Tab for navigation and selection.
     * @param ev The keyboard event
     */
    _handleKeydown = (ev) => {
        if (this.disabled || this.readonly)
            return;
        const items = this._getAllListItems();
        if (!items.length)
            return;
        // Handle Enter and Space for toggle/selection
        if (ev.key === keycodes_model.KEYBOARD_KEYS.ENTER || (ev.key === keycodes_model.KEYBOARD_KEYS.SPACE && this._focusedIndex >= 0)) {
            ev.preventDefault();
            if (!this._expanded) {
                this._expanded = true;
                const startIndex = getInitialFocusIndex(items, 'down');
                this._focusItemAtIndex(startIndex, items);
            }
            else {
                const focusedItem = items[this._focusedIndex];
                if (focusedItem && !focusedItem.disabled) {
                    focusedItem.click();
                }
            }
            return;
        }
        if (ev.key === keycodes_model.KEYBOARD_KEYS.ARROW_DOWN) {
            ev.preventDefault();
            if (!this._expanded) {
                this._expanded = true;
                const startIndex = getInitialFocusIndex(items, 'down');
                this._focusItemAtIndex(startIndex, items);
                return;
            }
            const nextIndex = findNextEnabledIndex(items, this._focusedIndex, 'down');
            this._focusItemAtIndex(nextIndex, items);
        }
        if (ev.key === keycodes_model.KEYBOARD_KEYS.ARROW_UP) {
            ev.preventDefault();
            if (!this._expanded) {
                this._expanded = true;
                const startIndex = getInitialFocusIndex(items, 'up');
                this._focusItemAtIndex(startIndex, items);
                return;
            }
            const prevIndex = findNextEnabledIndex(items, this._focusedIndex, 'up');
            this._focusItemAtIndex(prevIndex, items);
        }
        if (ev.key === keycodes_model.KEYBOARD_KEYS.ESCAPE) {
            this._closeDropdown();
        }
        if (ev.key === keycodes_model.KEYBOARD_KEYS.TAB) {
            this._closeDropdown();
        }
    };
    _handleIconButtonClick = (event) => {
        event.stopPropagation();
        if (this.disabled || this.readonly)
            return;
        this._expanded = !this._expanded;
    };
    _getAllListItems() {
        if (!this._cachedItems?.length) {
            this._cachedItems = Array.from(this.el?.querySelectorAll('[data-dual-combobox-item]')).filter(wdprDualCombobox_model.isDualComboboxItemElement);
        }
        return this._cachedItems;
    }
    _invalidateItemsCache() {
        this._cachedItems = null;
    }
    _getAllVisibleListItems() {
        return this._getAllListItems().filter(item => !item.isHidden);
    }
    _groupLastItems() {
        const groupElements = Array.from(this.el.querySelectorAll('wdpr-dual-combobox-group'));
        const lastItems = [];
        for (const group of groupElements) {
            const items = Array.from(group.querySelectorAll('[data-dual-combobox-item]')).filter(wdprDualCombobox_model.isDualComboboxItemElement);
            const lastItem = items[items.length - 1];
            if (lastItem) {
                lastItems.push(lastItem);
            }
        }
        return new Set(lastItems);
    }
    async _initAllItems() {
        this._invalidateItemsCache();
        const allItems = this._getAllListItems();
        if (allItems.length === 0)
            return;
        const lastItem = allItems[allItems.length - 1];
        const groupLastItems = this._groupLastItems();
        for (const item of allItems) {
            if (this.noDivider || item === lastItem || groupLastItems.has(item)) {
                if (typeof item.hideDivider === 'function') {
                    await item.hideDivider();
                }
            }
        }
        const preSelected = allItems.find(item => item.selected && !item.disabled);
        if (preSelected) {
            this._selectedValue = { value: preSelected.value, label: preSelected.label, id: preSelected.id };
            this._setInputsFromLabel(preSelected.label);
        }
        else {
            this._selectedValue = null;
        }
    }
    /**
     * Sets focus to the item at the given index, updates ARIA attributes, and scrolls it into view.
     * @param index The index of the item to focus
     * @param items The array of dropdown items
     */
    _focusItemAtIndex(index, items) {
        this._setFocusIndex(index);
        this._updateAriaActivedescendant(items[index]);
        // Scroll the focused item into view
        const focusedItem = items[index];
        if (focusedItem) {
            this._scrollIntoItem(focusedItem);
        }
    }
    _scrollIntoItem(item) {
        const listbox = this.el?.querySelector('.listbox');
        if (listbox) {
            item.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }
    _setFocusIndex(index) {
        const items = this._getAllListItems();
        items.forEach((item, i) => {
            item.isFocused = i === index;
        });
        this._focusedIndex = index == null ? -1 : index;
    }
    _updateAriaActivedescendant(item) {
        this._activeDescendantId = item?.id;
    }
    _removeAriaActivedescendant() {
        this._activeDescendantId = undefined;
    }
    /**
     * Measures the height of the dropdown list and sets the max height for scrollable lists.
     * Calculates based on the number of visible items and their bounding rectangles.
     */
    _measureItemHeights() {
        if (this.maxViewableItems == null || this.maxViewableItems <= 0) {
            this._measuredMaxHeight = null;
            this._readyToShow = true;
            return;
        }
        // As we hide items by setting display: none, we need to filter those out when calculating heights
        const allVisibleListItems = this._getAllVisibleListItems();
        const listbox = this.el?.querySelector('.listbox');
        if (!listbox || allVisibleListItems.length === 0) {
            this._readyToShow = true;
            return;
        }
        if (allVisibleListItems.length <= this.maxViewableItems) {
            this._measuredMaxHeight = null;
            this._readyToShow = true;
            return;
        }
        const targetItem = allVisibleListItems[this.maxViewableItems - 1];
        const wrapperRect = listbox.getBoundingClientRect();
        const itemRect = targetItem.getBoundingClientRect();
        let calculatedHeight = Math.ceil(itemRect.bottom - wrapperRect.top);
        // Add Wrapper Padding (if available)
        const style = window.getComputedStyle(listbox);
        const paddingBottom = parseFloat(style.paddingBottom) || 0;
        calculatedHeight += paddingBottom;
        this._measuredMaxHeight = `${calculatedHeight}px`;
        this._readyToShow = true;
    }
    _getIconName() {
        return this._expanded ? 'expand-show-less' : 'expand-show-more';
    }
    _getIconButtonAriaLabel() {
        const closedLabel = this.toggleButtonAriaLabelClosed || 'Open list';
        const openLabel = this.toggleButtonAriaLabelOpen || 'Close list';
        return this._expanded ? openLabel : closedLabel;
    }
    _setInputsFromLabel(label) {
        const [leading, trailing] = splitLabel(label);
        this._leadingInputValue = leading;
        this._trailingInputValue = trailing;
    }
    _clearInputs() {
        this._leadingInputValue = '';
        this._trailingInputValue = '';
    }
    _renderList() {
        const isScrollable = this.maxViewableItems != null && this.maxViewableItems > 0;
        return (index.h("div", { ref: el => (this._listEl = el), class: "listbox", role: "listbox", id: this._listId, tabindex: isScrollable ? 0 : undefined, "aria-label": this.a11yLabel }, index.h("slot", null)));
    }
    _renderListWrapper() {
        const listContainerClasses = this._isListVisible ? 'dual-combobox-list-container-visible' : 'dual-combobox-list-container-invisible';
        return (index.h("div", { class: `dual-combobox-list-container ${listContainerClasses}`, style: { height: this._measuredMaxHeight } }, this._renderList()));
    }
    _renderStatusMessage() {
        const locationClass = `results-list-${this.location}`;
        const isEmpty = this._getAllListItems().length === 0 || this._getAllVisibleListItems().length === 0;
        if (!this._expanded)
            return null;
        if (this.isLoading)
            return (index.h("div", { class: `loading-container ${locationClass}` }, index.h("wdpr-radial-loader", { size: this.loaderSize, label: this.loadingText, labelPlacement: this.loaderLabelPlacement, showLabel: this.showLoaderLabel })));
        if (isEmpty && !this.isErrorLoading && !this.isLoading)
            return (index.h("div", { class: `empty-container ${locationClass}` }, index.h("wdpr-inline-message", { variant: "informational", size: this.emptyTextSize }, this.emptyText)));
        if (this.isErrorLoading && !this.isLoading)
            return (index.h("div", { class: `error-container ${locationClass}` }, index.h("wdpr-inline-message", { variant: "error", size: this.errorTextSize }, this.errorText)));
        return null;
    }
    get _isListVisible() {
        return this._readyToShow && this._expanded && !this.isLoading && this._getAllListItems().length > 0 && !this.isErrorLoading;
    }
    render() {
        return (index.h(index.Host, { key: 'd5a2233ec3affc73a5b14c8a366fab7406e93797', onKeyDown: this._handleKeydown }, index.h("div", { key: 'ba6998a50094e1fb877994cd22cf180f1557d8ac', class: "dual-combobox-wrapper" }, index.h("wdpr-dual-text-field", { key: 'd05d29410f91597eca740064f34c3d96db35b00e', leadingLabel: this.leadingLabel, trailingLabel: this.trailingLabel, leadingValue: this._leadingInputValue, trailingValue: this._trailingInputValue, leadingRequirementIndicator: this.leadingRequirementIndicator, trailingRequirementIndicator: this.trailingRequirementIndicator, disabled: this.disabled, error: this.error, readonly: this.readonly, helperText: this.helperText, onWdprInputClick: this._handleInputClick, onWdprInputFocus: this._handleInputFocus, onWdprValueChanged: this._handleValueChanged, a11yRole: "combobox", a11yHasPopup: "listbox", a11yAutoComplete: "list", a11yExpanded: this._expanded ? 'true' : 'false', a11yControls: this._expanded ? this._listId : undefined, a11yActiveDescendant: this._activeDescendantId }, !this.hideIcon && !this.readonly && (index.h("wdpr-icon-button", { key: 'dccbf67de3d6779a9036b70d6325ba80fb66c0e4', slot: "trailing-icon-button", iconName: this._getIconName(), a11yLabel: this._getIconButtonAriaLabel(), disabled: this.disabled, onClicked: this._handleIconButtonClick }))), this._renderListWrapper(), this._renderStatusMessage())));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "leadingValue": ["handleControlledValueChange"],
        "trailingValue": ["handleControlledValueChange"],
        "_expanded": ["handleExpandedChange"],
        "maxViewableItems": ["handleMaxViewableItemsChange"],
        "_selectedValue": ["updateSelectedValues"],
        "name": ["formPropsChanged"],
        "required": ["formPropsChanged"],
        "disabled": ["formPropsChanged"],
        "_leadingInputValue": ["handleInputValueChange"],
        "_trailingInputValue": ["handleInputValueChange"]
    }; }
};
WdprDualCombobox.style = wdprDualComboboxCss;

exports.wdpr_dual_combobox = WdprDualCombobox;
//# sourceMappingURL=wdpr-dual-combobox.entry.cjs.js.map

//# sourceMappingURL=wdpr-dual-combobox.cjs.entry.js.map