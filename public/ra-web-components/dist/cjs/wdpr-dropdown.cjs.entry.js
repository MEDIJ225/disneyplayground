'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
require('./bundle-cjs-Cajw0YnV.js');

function isDropdownItemElement(el) {
    return el.hasAttribute('data-dropdown-item') &&
        typeof el.value === 'string' &&
        'value' in el &&
        'label' in el &&
        'selected' in el &&
        'disabled' in el &&
        'mode' in el &&
        'isFocused' in el;
}

/**
 * Finds the next enabled index in the items array, given a start index and direction ('up' or 'down').
 * Returns the original index if all items are disabled.
 */
function findNextEnabledIndex(items, start, direction) {
    if (!items.length)
        return start;
    if (items.every(item => item.disabled))
        return -1;
    const increment = direction === 'down' ? 1 : -1;
    let idx = start;
    let attempts = 0;
    // This block finds the next enabled item in the desired direction,
    // wrapping around the array if necessary, and stops if all items are disabled.
    do {
        idx = (idx + increment + items.length) % items.length;
        attempts++;
    } while (items[idx].disabled && attempts < items.length);
    return items[idx].disabled ? -1 : idx;
}
/**
 * Determines the initial index to focus within a dropdown list based on the current selection and navigation direction.
 *
 * - If there is a selected and enabled item, its index is returned.
 * - If navigating 'down', returns the index of the first enabled item, or 0 if none are enabled.
 * - If navigating 'up', returns the index of the last enabled item by searching backwards.
 */
function getInitialFocusIndex(items, direction) {
    // If there is a selected and enabled item, its index is returned.
    const selectedIndex = items.findIndex(item => item.selected && !item.disabled);
    if (selectedIndex !== -1) {
        return selectedIndex;
    }
    // If navigating 'down', returns the index of the first enabled item, or -1 if none are enabled.
    if (direction === 'down') {
        const firstEnabled = items.findIndex(item => !item.disabled);
        return firstEnabled !== -1 ? firstEnabled : -1;
    }
    // If navigating 'up', returns the index of the last enabled item by searching backwards.
    for (let i = items.length - 1; i >= 0; i--) {
        if (!items[i].disabled)
            return i;
    }
    return -1;
}

const wdprDropdownCss = ".dropdown-wrapper.sc-wdpr-dropdown{position:relative;display:flex;flex-direction:column;align-items:start;font-family:var(--theme-font-family-default)}.dropdown.sc-wdpr-dropdown{position:relative;display:flex;align-items:center;width:100%;box-sizing:border-box;background-color:var(--theme-color-surface-default);gap:var(--theme-spacing-200);padding-inline:var(--theme-spacing-200);padding-block:var(--theme-spacing-050);height:var(--theme-dimension-700);cursor:pointer;border-width:var(--theme-stroke-012);border-style:solid;border-color:var(--theme-color-stroke-actionable-alt-default);border-radius:var(--theme-radius-150);transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    border-color 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    outline-color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.dropdown.sc-wdpr-dropdown:hover{border-color:var(--theme-color-stroke-actionable-alt-hover)}.dropdown.sc-wdpr-dropdown:focus-visible{outline-width:var(--theme-stroke-037);outline-style:solid;outline-offset:-2px;outline-color:var(--theme-color-stroke-actionable-focused)}.dropdown[aria-disabled='true'].sc-wdpr-dropdown{cursor:not-allowed;border-color:var(--theme-color-icon-actionable-alt-disabled);background-color:var(--theme-color-surface-disabled)}.dropdown[aria-readonly='true'].sc-wdpr-dropdown{cursor:default;border-color:var(--theme-color-stroke-disabled)}.dropdown[aria-invalid='true'].sc-wdpr-dropdown,.dropdown[aria-invalid='true'].sc-wdpr-dropdown:hover,.dropdown[aria-invalid='true'].sc-wdpr-dropdown:active{border-color:var(--theme-color-stroke-status-critical-alt)}.dropdown__inner-wrapper.sc-wdpr-dropdown{position:relative;flex:1;align-self:stretch;min-width:0}.dropdown__display-value.sc-wdpr-dropdown{display:block;color:var(--theme-color-text-body);padding-top:19px;font-size:var(--theme-typography-font-size-body-large);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-large);letter-spacing:var(--theme-typography-letter-spacing-default);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:all 150ms cubic-bezier(0.4, 0, 0.2, 1)}.dropdown__label.sc-wdpr-dropdown{position:absolute;display:block;width:100%;top:var(--theme-spacing-150);pointer-events:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--theme-color-text-disclaimer);font-size:var(--theme-typography-font-size-body-large);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-large);letter-spacing:var(--theme-typography-letter-spacing-default);transition:all 150ms cubic-bezier(0.4, 0, 0.2, 1)}.dropdown[aria-disabled='true'].sc-wdpr-dropdown .dropdown__label.sc-wdpr-dropdown{color:var(--theme-color-text-disabled)}.dropdown[data-has-value='true'].sc-wdpr-dropdown .dropdown__label.sc-wdpr-dropdown{top:var(--theme-spacing-062);font-size:var(--theme-typography-font-size-label-small);font-weight:var(--theme-typography-font-weight-label-default);line-height:var(--theme-typography-line-height-label-small);height:calc(var(--theme-typography-line-height-label-small) + 2px);letter-spacing:var(--theme-typography-letter-spacing-default)}.dropdown[aria-disabled='true'].sc-wdpr-dropdown .dropdown__display-value.sc-wdpr-dropdown{color:var(--theme-color-text-disabled)}.dropdown__icon-wrapper.sc-wdpr-dropdown{color:var(--theme-color-icon-actionable-alt-default)}.dropdown-inline-message-wrapper.sc-wdpr-dropdown{margin-left:var(--theme-spacing-050);margin-top:var(--theme-spacing-050)}.dropdown-list-container.sc-wdpr-dropdown{position:absolute;overflow-y:auto;left:var(--theme-spacing-000);right:var(--theme-spacing-000);z-index:10;border-radius:var(--theme-radius-150);border-width:var(--theme-stroke-012);border-color:var(--theme-color-stroke-neutral-light);border-style:solid;box-shadow:var(--theme-elevation-medium-soft);background-color:var(--theme-color-surface-default)}[location='above'].sc-wdpr-dropdown-h .dropdown-list-container.sc-wdpr-dropdown,[location='above'].sc-wdpr-dropdown-h .loading-container.sc-wdpr-dropdown,[location='above'].sc-wdpr-dropdown-h .empty-container.sc-wdpr-dropdown,[location='above'].sc-wdpr-dropdown-h .error-container.sc-wdpr-dropdown{bottom:calc(100% + var(--theme-spacing-100))}[location='below'].sc-wdpr-dropdown-h .dropdown-list-container.sc-wdpr-dropdown,[location='below'].sc-wdpr-dropdown-h .loading-container.sc-wdpr-dropdown,[location='below'].sc-wdpr-dropdown-h .empty-container.sc-wdpr-dropdown,[location='below'].sc-wdpr-dropdown-h .error-container.sc-wdpr-dropdown{top:calc(100% + var(--theme-spacing-100))}.loading-container.sc-wdpr-dropdown,.empty-container.sc-wdpr-dropdown,.error-container.sc-wdpr-dropdown{position:absolute;left:var(--theme-spacing-000);right:var(--theme-spacing-000);z-index:10;background:var(--theme-color-surface-default);border-width:var(--theme-stroke-012);border-color:var(--theme-color-stroke-neutral-light);border-style:solid;box-shadow:var(--theme-elevation-medium-soft);border-radius:var(--theme-radius-150);padding-inline:var(--theme-spacing-200)}.loading-container.sc-wdpr-dropdown{padding-block:var(--theme-spacing-300)}.empty-container.sc-wdpr-dropdown,.error-container.sc-wdpr-dropdown{padding-block:var(--theme-spacing-600)}.dropdown-list-container-visible.sc-wdpr-dropdown{visibility:visible}.dropdown-list-container-invisible.sc-wdpr-dropdown{visibility:hidden}.listbox.sc-wdpr-dropdown{display:flex;flex-direction:column;row-gap:var(--theme-spacing-100);padding:var(--theme-spacing-200)}";

const WdprDropdown = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprLeadingIconClick = index.createEvent(this, "wdprLeadingIconClick", 7);
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
    _dropdownId;
    _defaultCheckedIds = [];
    _slotObserver;
    _resizeObserver;
    _listEl = null;
    _cachedItems = null;
    get el() { return index.getElement(this); }
    internals;
    _expanded = false;
    _measuredMaxHeight = null;
    _readyToShow = false;
    _selectedValues = new Set();
    _focusedIndex = -1;
    _leadingIcon;
    _activeDescendantId = undefined;
    /**
     * The value to set/clear in the dropdown.
     * Use the item's **label** (display text), not the item's `value` attribute.
     * Examples: "New York", "London" — not "new-york", "london"
     */
    value = '';
    mode = 'single';
    label = '';
    helperText = '';
    location = 'below';
    required = false;
    name;
    readonly = false;
    disabled = false;
    error = false;
    noDivider = false;
    maxViewableItems = null;
    requirementIndicator = 'none';
    a11yLabel;
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
    wdprLeadingIconClick;
    wdprSelectionChange;
    updateSelectedValues() {
        this._syncSelectionItemsState();
        this._updateFormValue();
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
    formPropsChanged() {
        this._updateFormValue();
    }
    handleValueChanged() {
        this._syncSelectionFromValue();
    }
    handleItemSelect(event) {
        event.stopPropagation();
        const { detail: { value, label, selected, id }, } = event;
        this._updateSelectedValues(value, label, selected, id);
        if (!this._isMultipleMode) {
            this._closeDropdown();
        }
    }
    handleClickOutside(event) {
        if (this._expanded && this.el && !event.composedPath().includes(this.el)) {
            this._closeDropdown();
        }
    }
    componentWillLoad() {
        this._listId = `wdpr-dropdown-list-${utils.generateRandId()}`;
        this._dropdownId = `wdpr-dropdown-${utils.generateRandId()}`;
        this._resizeObserver = new ResizeObserver(() => this._measureItemHeights());
        this._leadingIcon = this.el.querySelector('[slot="leading-icon"]');
    }
    componentDidLoad() {
        requestAnimationFrame(() => {
            this._initAllItems();
            this._measureItemHeights();
            this._syncSelectionFromValue();
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
                this._invalidateItemsCache();
                this._initAllItems();
                this._measureItemHeights();
                this._syncSelectionFromValue();
            });
        });
    }
    connectedCallback() {
        this.internals?.form?.addEventListener('reset', this._handleFormReset);
    }
    disconnectedCallback() {
        this.internals?.form?.removeEventListener('reset', this._handleFormReset);
        this._slotObserver?.disconnect();
        this._resizeObserver?.disconnect();
    }
    _getSelectedFormValues() {
        return Array.from(this._selectedValues).map(item => item.value);
    }
    _updateValidity(selectedValues) {
        if (this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        const values = selectedValues ?? this._getSelectedFormValues();
        if (this.required && values.length === 0) {
            this.internals?.setValidity?.({ valueMissing: true }, 'An option is required');
            return;
        }
        this.internals?.setValidity?.({});
    }
    _updateFormValue() {
        const selectedValues = this._getSelectedFormValues();
        const formValue = this._isMultipleMode ? selectedValues.join(',') : selectedValues[0] ?? '';
        const hasValue = !!formValue;
        const shouldSubmit = !this.disabled && !!this.name && hasValue;
        this.internals?.setFormValue?.(shouldSubmit ? formValue : null);
        this._updateValidity(selectedValues);
    }
    _handleFormReset = () => {
        const defaultChecked = new Set(this._defaultCheckedIds);
        this._selectedValues = new Set(Array.from(this._selectedValues).filter(item => defaultChecked.has(item.id)));
    };
    _closeDropdown() {
        this._expanded = false;
    }
    _getAllListItems() {
        if (!this._cachedItems?.length) {
            this._cachedItems = Array.from(this.el?.querySelectorAll('[data-dropdown-item]')).filter(isDropdownItemElement);
        }
        return this._cachedItems;
    }
    async _initAllItems() {
        const allItems = this._getAllListItems();
        if (allItems.length === 0)
            return;
        this._resizeObserver.disconnect();
        this._resizeObserver.observe(allItems[0]);
        const lastItem = allItems[allItems.length - 1];
        const groupLastItems = this._groupLastItems();
        for (const item of allItems) {
            item.mode = this.mode;
            if (this.noDivider || item === lastItem || groupLastItems.has(item)) {
                if (typeof item.hideDivider === 'function') {
                    await item.hideDivider();
                }
            }
        }
    }
    _syncSelectionFromValue() {
        const allItems = this._getAllListItems();
        const selectedLabels = this._isMultipleMode
            ? this.value
                .split(',')
                .map(v => v.trim())
                .filter(Boolean)
            : [this.value];
        const selectedSet = new Set();
        for (const item of allItems) {
            if (selectedLabels.includes(item.label) && !item.disabled) {
                selectedSet.add({ value: item.value, label: item.label, id: item.id });
            }
        }
        this._selectedValues = selectedSet;
        this._defaultCheckedIds = Array.from(selectedSet).map(item => item.id);
    }
    _groupLastItems() {
        const groupElements = Array.from(this.el.querySelectorAll('wdpr-dropdown-group'));
        const lastItems = [];
        for (const group of groupElements) {
            const items = Array.from(group.querySelectorAll('[data-dropdown-item]')).filter(isDropdownItemElement);
            const lastItem = items[items.length - 1];
            if (lastItem) {
                lastItems.push(lastItem);
            }
        }
        return new Set(lastItems);
    }
    _handleLeadingIconSlotChange = () => {
        this._leadingIcon = this.el.querySelector('[slot="leading-icon"]');
    };
    _updateSelectedValues(value, label, selected, id) {
        if (!this._isMultipleMode) {
            this._updateValuesFromSingleSelection(value, label, selected, id);
        }
        else {
            this._updateValuesFromMultipleSelection(value, label, selected, id);
        }
        this.wdprSelectionChange.emit({ selectedValues: Array.from(this._selectedValues) });
    }
    _updateValuesFromSingleSelection(value, label, selected, id) {
        this._selectedValues = selected ? new Set([{ value, label, id }]) : new Set();
    }
    _updateValuesFromMultipleSelection(value, label, selected, id) {
        const newSelectedValues = new Set(this._selectedValues);
        if (selected) {
            newSelectedValues.add({ value, label, id });
        }
        else {
            Array.from(newSelectedValues).forEach(item => {
                if (item.value === value && item.id === id)
                    newSelectedValues.delete(item);
            });
        }
        this._selectedValues = newSelectedValues;
    }
    _syncSelectionItemsState() {
        const selectedIds = new Set(Array.from(this._selectedValues).map(s => s.id));
        this._getAllListItems().forEach(item => {
            item.selected = selectedIds.has(item.id);
        });
    }
    /**
     * Measures the height of the dropdown list and sets the max height for scrollable lists.
     * Calculates based on the number of visible items and their bounding rectangles.
     */
    _measureItemHeights() {
        this._readyToShow = false;
        if (this.maxViewableItems == null || this.maxViewableItems <= 0) {
            this._measuredMaxHeight = null;
            this._readyToShow = true;
            return;
        }
        const allListItems = this._getAllListItems();
        const listbox = this.el?.querySelector('.listbox');
        if (!listbox || allListItems.length === 0) {
            this._readyToShow = true;
            return;
        }
        if (allListItems.length <= this.maxViewableItems) {
            this._measuredMaxHeight = null;
            this._readyToShow = true;
            return;
        }
        const targetItem = allListItems[this.maxViewableItems - 1];
        const wrapperRect = listbox.getBoundingClientRect();
        const itemRect = targetItem.getBoundingClientRect();
        const itemHeight = targetItem.offsetHeight;
        if (itemHeight === 0)
            return;
        let calculatedHeight = Math.ceil(itemRect.bottom - wrapperRect.top);
        // Add Wrapper Padding (if available)
        const style = window.getComputedStyle(listbox);
        const paddingBottom = parseFloat(style.paddingBottom) || 0;
        calculatedHeight += paddingBottom;
        const newHeight = `${calculatedHeight}px`;
        if (this._measuredMaxHeight !== newHeight) {
            this._measuredMaxHeight = newHeight;
        }
        this._readyToShow = true;
    }
    _renderDropdown() {
        return (index.h("div", { class: "dropdown", tabindex: this.disabled ? -1 : 0, id: this._dropdownId, role: "combobox", "data-has-value": this._hasValueAttr, "aria-invalid": this.error.toString(), "aria-disabled": this.disabled.toString(), "aria-readonly": this.readonly.toString(), "aria-expanded": this._expanded.toString(), "aria-controls": this._listId, "aria-labelledby": `${this._dropdownId}-label`, "aria-required": this.required.toString(), "aria-haspopup": "listbox", "aria-describedby": this.helperText ? `${this._dropdownId}-helper-text` : undefined, "aria-activedescendant": this._activeDescendantId, onClick: this._handleComboboxClick }, this._leadingIcon && !this.readonly && (index.h("span", { onClick: this._onLeadingClick, class: "dropdown__icon-wrapper" }, index.h("slot", { onSlotchange: this._handleLeadingIconSlotChange, name: "leading-icon" }))), index.h("div", { class: "dropdown__inner-wrapper" }, index.h("span", { class: "dropdown__display-value" }, this._displayValue), index.h("span", { class: "dropdown__label", id: `${this._dropdownId}-label` }, this.label, " ", this._requirementLabel)), !this.readonly && (index.h("span", { class: "dropdown__icon-wrapper" }, index.h("wdpr-icon-library", { icon: this._dropdownIcon, size: "medium", decorative: true })))));
    }
    _renderList() {
        const isScrollable = this.maxViewableItems != null && this.maxViewableItems > 0;
        return (index.h("div", { ref: el => (this._listEl = el), class: "listbox", role: "listbox", "aria-multiselectable": this._isMultipleMode ? 'true' : undefined, id: this._listId, tabindex: isScrollable ? 0 : undefined, "aria-label": this.a11yLabel }, index.h("slot", null)));
    }
    _renderInlineMessage() {
        return (this.helperText && (index.h("div", { class: "dropdown-inline-message-wrapper" }, index.h("wdpr-inline-message", { id: `${this._dropdownId}-helper-text`, variant: this.error ? 'error' : 'informational', size: "small", role: "status" }, this.helperText))));
    }
    _renderListWrapper() {
        const listContainerClasses = this._isListVisible ? 'dropdown-list-container-visible' : 'dropdown-list-container-invisible';
        return (index.h("div", { class: `dropdown-list-container ${listContainerClasses}`, style: { height: this._measuredMaxHeight } }, this._renderList()));
    }
    _renderStatusMessage() {
        const isEmpty = this._getAllListItems().length === 0;
        if (!this._expanded)
            return null;
        if (this.isLoading)
            return (index.h("div", { class: "loading-container" }, index.h("wdpr-radial-loader", { size: this.loaderSize, label: this.loadingText, labelPlacement: this.loaderLabelPlacement, showLabel: this.showLoaderLabel })));
        if (isEmpty && !this.isErrorLoading && !this.isLoading)
            return (index.h("div", { class: "empty-container" }, index.h("wdpr-inline-message", { variant: "informational", size: this.emptyTextSize }, this.emptyText)));
        if (this.isErrorLoading && !this.isLoading)
            return (index.h("div", { class: "error-container" }, index.h("wdpr-inline-message", { variant: "error", size: this.errorTextSize }, this.errorText)));
        return null;
    }
    _onLeadingClick = (event) => {
        event.stopPropagation();
        this.wdprLeadingIconClick.emit();
    };
    _handleComboboxClick = () => {
        if (this.disabled || this.readonly)
            return;
        this._expanded = !this._expanded;
    };
    /**
     * Handles keyboard navigation and accessibility for the dropdown.
     * Supports arrow keys, Enter, Space, Escape, and Tab for navigation and selection.
     * @param ev The keyboard event
     */
    _handleKeydown = (ev) => {
        if (this.disabled || this.readonly)
            return;
        const items = this._getAllListItems();
        // Handle Enter and Space for toggle/selection
        if (ev.key === keycodes_model.KEYBOARD_KEYS.ENTER || ev.key === keycodes_model.KEYBOARD_KEYS.SPACE) {
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
            // Move focus to next enabled item
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
            // Move focus to previous enabled item
            const prevIndex = findNextEnabledIndex(items, this._focusedIndex, 'up');
            this._focusItemAtIndex(prevIndex, items);
        }
        if (ev.key === keycodes_model.KEYBOARD_KEYS.ESCAPE && this._expanded) {
            ev.preventDefault();
            ev.stopPropagation();
            this._closeDropdown();
        }
        if (ev.key === keycodes_model.KEYBOARD_KEYS.TAB) {
            this._closeDropdown();
        }
    };
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
    _scrollIntoItem(item) {
        const listbox = this.el?.querySelector('.listbox');
        if (listbox) {
            item.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }
    _invalidateItemsCache() {
        this._cachedItems = null;
    }
    get _requirementLabel() {
        if (this.requirementIndicator === 'required')
            return index.h("span", { "aria-hidden": "true" }, "*");
        if (this.requirementIndicator === 'optional')
            return index.h("span", null, "(Optional)");
        return null;
    }
    get _isMultipleMode() {
        return this.mode === 'multiple';
    }
    get _hasSelection() {
        return this._selectedValues.size > 0;
    }
    get _emptyDisplayValue() {
        return this.readonly ? '--' : '';
    }
    get _displayValue() {
        if (!this._hasSelection)
            return this._emptyDisplayValue;
        return Array.from(this._selectedValues)
            .map(item => item.label)
            .join(', ');
    }
    get _hasValueAttr() {
        return this.readonly || this._hasSelection ? 'true' : 'false';
    }
    get _dropdownIcon() {
        return this._expanded ? 'expand-show-less' : 'expand-show-more';
    }
    get _isListVisible() {
        return this._readyToShow && this._expanded && !this.isLoading && this._getAllListItems().length > 0 && !this.isErrorLoading;
    }
    render() {
        return (index.h(index.Host, { key: '5964293cf0c8538a621fdc556664734e3df13deb', onKeyDown: this._handleKeydown }, index.h("div", { key: 'b315bb57e8d7a2c9cfcee5f97fbd3c5c1a56e549', class: "dropdown-wrapper" }, this._renderDropdown(), this._renderInlineMessage(), this._renderListWrapper(), this._renderStatusMessage())));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "_selectedValues": ["updateSelectedValues"],
        "_expanded": ["handleExpandedChange"],
        "maxViewableItems": ["handleMaxViewableItemsChange"],
        "name": ["formPropsChanged"],
        "required": ["formPropsChanged"],
        "disabled": ["formPropsChanged"],
        "mode": ["formPropsChanged"],
        "value": ["handleValueChanged"]
    }; }
};
WdprDropdown.style = wdprDropdownCss;

exports.wdpr_dropdown = WdprDropdown;
//# sourceMappingURL=wdpr-dropdown.entry.cjs.js.map

//# sourceMappingURL=wdpr-dropdown.cjs.entry.js.map