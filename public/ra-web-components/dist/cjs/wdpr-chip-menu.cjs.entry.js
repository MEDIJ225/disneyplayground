'use strict';

var index = require('./index-4gPM_TYz.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

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

const wdprChipMenuCss = ".chip-menu-wrapper.sc-wdpr-chip-menu{position:relative;display:flex;flex-direction:row;align-items:start;font-family:var(--theme-font-family-default)}.chip-menu-align-start.sc-wdpr-chip-menu{justify-content:start}.chip-menu-align-end.sc-wdpr-chip-menu{justify-content:end}.chip-menu.sc-wdpr-chip-menu{position:relative;display:inline-flex;align-items:center;justify-content:center;border-radius:var(--theme-radius-pill);border-style:solid;user-select:none;padding:var(--theme-spacing-125);gap:var(--theme-spacing-100);transition:colors 150ms cubic-bezier(0.4, 0, 0.2, 1)}.chip-menu[aria-expanded='false'].sc-wdpr-chip-menu{background-color:var(--theme-color-surface-transparent);color:var(--theme-color-text-actionable-alt-default);border-color:var(--theme-color-stroke-actionable-alt-default);cursor:pointer}.chip-menu[aria-expanded='false'].sc-wdpr-chip-menu:hover{color:var(--theme-color-text-actionable-alt-hover);border-color:var(--theme-color-stroke-actionable-alt-hover)}.chip-menu[aria-expanded='false'].sc-wdpr-chip-menu:active{color:var(--theme-color-text-actionable-alt-pressed);border-color:var(--theme-color-stroke-actionable-alt-pressed)}.chip-menu[aria-expanded='false'][aria-disabled='true'].sc-wdpr-chip-menu{background-color:var(--theme-color-surface-disabled);color:var(--theme-color-text-disabled);border-color:var(--theme-color-stroke-actionable-alt-disabled);cursor:not-allowed}.chip-menu[aria-expanded='true'].sc-wdpr-chip-menu{background-color:var(--theme-color-surface-actionable-alt-selected);color:var(--theme-color-text-inverse);border-color:transparent;cursor:pointer}.chip-menu[aria-expanded='true'].sc-wdpr-chip-menu:hover{background-color:var(--theme-color-text-actionable-alt-hover)}.chip-menu[aria-expanded='true'].sc-wdpr-chip-menu:active{background-color:var(--theme-color-text-actionable-alt-pressed)}.chip-menu[aria-expanded='true'][aria-disabled='true'].sc-wdpr-chip-menu{background-color:var(--theme-color-surface-actionable-alt-disabled);color:var(--theme-color-text-inverse);border-color:transparent;cursor:not-allowed}.chip-menu.sc-wdpr-chip-menu:focus-visible{outline-width:var(--theme-stroke-037);outline-color:var(--theme-color-stroke-actionable-alt-focused);outline-style:solid;outline-offset:2px}.chip-menu__display-value.sc-wdpr-chip-menu{font-size:var(--theme-typography-font-size-component-small);font-weight:var(--theme-typography-font-weight-component-accent);line-height:var(--theme-typography-line-height-component-medium);letter-spacing:var(--theme-typography-letter-spacing-default)}.chip-menu__icon.sc-wdpr-chip-menu{display:flex;align-items:center;justify-content:center;color:currentColor}.chip-menu-list-container.sc-wdpr-chip-menu{position:absolute;overflow-y:auto;z-index:10;border-radius:var(--theme-radius-150);border-width:var(--theme-stroke-012);border-style:solid;border-color:var(--theme-color-stroke-neutral-light);box-shadow:var(--theme-elevation-medium-soft);background-color:var(--theme-color-surface-default);width:max-content;top:calc(100% + var(--theme-spacing-200))}.loading-container.sc-wdpr-chip-menu,.empty-container.sc-wdpr-chip-menu,.error-container.sc-wdpr-chip-menu{position:absolute;z-index:10;border-radius:var(--theme-radius-150);border-width:var(--theme-stroke-012);border-style:solid;border-color:var(--theme-color-stroke-neutral-light);box-shadow:var(--theme-elevation-medium-soft);background:var(--theme-color-surface-default);padding-inline:var(--theme-spacing-200);top:calc(100% + var(--theme-spacing-200))}.loading-container.sc-wdpr-chip-menu{padding-block:var(--theme-spacing-300)}.empty-container.sc-wdpr-chip-menu,.error-container.sc-wdpr-chip-menu{padding-block:var(--theme-spacing-600)}[alignment='left'].sc-wdpr-chip-menu-h .chip-menu-list-container.sc-wdpr-chip-menu,[alignment='left'].sc-wdpr-chip-menu-h .loading-container.sc-wdpr-chip-menu,[alignment='left'].sc-wdpr-chip-menu-h .empty-container.sc-wdpr-chip-menu,[alignment='left'].sc-wdpr-chip-menu-h .error-container.sc-wdpr-chip-menu{left:var(--theme-spacing-000)}[alignment='right'].sc-wdpr-chip-menu-h .chip-menu-list-container.sc-wdpr-chip-menu,[alignment='right'].sc-wdpr-chip-menu-h .loading-container.sc-wdpr-chip-menu,[alignment='right'].sc-wdpr-chip-menu-h .empty-container.sc-wdpr-chip-menu,[alignment='right'].sc-wdpr-chip-menu-h .error-container.sc-wdpr-chip-menu{right:var(--theme-spacing-000)}.chip-menu-list-container-visible.sc-wdpr-chip-menu{visibility:visible}.chip-menu-list-container-invisible.sc-wdpr-chip-menu{visibility:hidden}.listbox.sc-wdpr-chip-menu{display:flex;flex-direction:column;row-gap:var(--theme-spacing-100);padding:var(--theme-spacing-200)}";

const WdprChipMenu = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprSelectionChange = index.createEvent(this, "wdprSelectionChange", 7);
    }
    _listId;
    _dropdownId;
    _slotObserver;
    _resizeObserver;
    _listEl = null;
    _cachedItems = null;
    get el() { return index.getElement(this); }
    _leadingSlot = null;
    _trailingSlot = null;
    _expanded = false;
    _selectedValue = null;
    _readyToShow = false;
    _focusedIndex = -1;
    _measuredMaxHeight = null;
    _activeDescendantId = undefined;
    value = '';
    alignment = 'left';
    maxViewableItems = null;
    disabled = false;
    noDivider = true;
    a11yChipLabel;
    a11yListLabel;
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
    wdprSelectionChange;
    handleValueChanged() {
        this._syncSelectionFromValue();
    }
    updateSelectedValue() {
        this._syncSelectionItemsState();
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
    handleItemSelect(event) {
        event.stopPropagation();
        const { detail: { value, label, id }, } = event;
        this._updateSelectedValue(value, label, id);
        this._closeDropdown();
    }
    handleDocumentClick(event) {
        const path = (event.composedPath && event.composedPath()) || [];
        const clickInsideChipMenu = path.some(node => node === this.el);
        if (!clickInsideChipMenu && this._expanded)
            this._expanded = false;
    }
    componentWillLoad() {
        this._listId = `wdpr-chip-menu-list-${utils.generateRandId()}`;
        this._dropdownId = `wdpr-chip-menu-${utils.generateRandId()}`;
        this._resizeObserver = new ResizeObserver(() => this._measureItemHeights());
        this._updateSlots();
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
    disconnectedCallback() {
        this._slotObserver?.disconnect();
        this._resizeObserver?.disconnect();
    }
    _getAllListItems() {
        if (!this._cachedItems?.length) {
            this._cachedItems = Array.from(this.el?.querySelectorAll('wdpr-chip-menu-item'));
        }
        return this._cachedItems;
    }
    _groupLastItems() {
        const groupElements = Array.from(this.el.querySelectorAll('wdpr-chip-menu-group'));
        const lastItems = [];
        for (const group of groupElements) {
            const items = Array.from(group.querySelectorAll('wdpr-chip-menu-item'));
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
        this._resizeObserver.disconnect();
        this._resizeObserver.observe(allItems[0]);
        const lastItem = allItems[allItems.length - 1];
        const groupLastItems = this._groupLastItems();
        for (const item of allItems) {
            if (this.noDivider || item === lastItem || groupLastItems.has(item)) {
                if (typeof item.hideDivider === 'function') {
                    await item.hideDivider();
                }
            }
        }
    }
    _closeDropdown() {
        this._expanded = false;
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
    _renderList() {
        const isScrollable = this.maxViewableItems != null && this.maxViewableItems > 0;
        return (index.h("div", { ref: el => (this._listEl = el), class: "listbox", role: "listbox", id: this._listId, tabindex: isScrollable ? 0 : undefined, "aria-label": this.a11yListLabel || undefined }, index.h("slot", null)));
    }
    _renderChipDropdown() {
        return (index.h("div", { class: "chip-menu", tabindex: this.disabled ? -1 : 0, id: this._dropdownId, role: "combobox", "aria-haspopup": "listbox", "aria-disabled": this.disabled.toString(), "aria-expanded": this._expanded.toString(), "aria-controls": this._listId, "aria-label": this.a11yChipLabel || undefined, "aria-activedescendant": this._activeDescendantId, onClick: this._handleComboboxClick }, this._leadingSlot && (index.h("span", { class: "chip-menu__icon" }, index.h("slot", { name: "leading-icon", onSlotchange: this._updateSlots }))), index.h("span", { class: "chip-menu__display-value" }, this._displayValue), this._trailingSlot && (index.h("span", { class: "chip-menu__icon" }, index.h("slot", { name: "trailing-icon", onSlotchange: this._updateSlots })))));
    }
    _renderListWrapper() {
        const listContainerClasses = this._isListVisible ? 'chip-menu-list-container-visible' : 'chip-menu-list-container-invisible';
        return (index.h("div", { class: `chip-menu-list-container ${listContainerClasses}`, style: { height: this._measuredMaxHeight } }, this._renderList()));
    }
    _renderStatusMessage() {
        const isEmpty = this._getAllListItems().length === 0;
        if (!this._expanded)
            return null;
        if (this.isLoading)
            return (index.h("div", { class: "loading-container", role: "status", "aria-live": "polite", "aria-atomic": "true" }, index.h("wdpr-radial-loader", { size: this.loaderSize, label: this.loadingText, labelPlacement: this.loaderLabelPlacement, showLabel: this.showLoaderLabel })));
        if (isEmpty && !this.isErrorLoading && !this.isLoading)
            return (index.h("div", { class: "empty-container" }, index.h("wdpr-inline-message", { variant: "informational", size: this.emptyTextSize, role: "status", a11yLive: "polite" }, this.emptyText)));
        if (this.isErrorLoading && !this.isLoading)
            return (index.h("div", { class: "error-container" }, index.h("wdpr-inline-message", { variant: "error", size: this.errorTextSize, role: "status", a11yLive: "polite" }, this.errorText)));
        return null;
    }
    /**
     * Handles keyboard navigation and accessibility for the dropdown.
     * Supports arrow keys, Enter, Space, Escape, and Tab for navigation and selection.
     * @param ev The keyboard event
     */
    _handleKeydown = (ev) => {
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
    _invalidateItemsCache() {
        this._cachedItems = null;
    }
    _syncSelectionFromValue() {
        const allItems = this._getAllListItems();
        for (const item of allItems) {
            if (this.value === item.label && !item.disabled) {
                this._selectedValue = { value: item.value, label: item.label, id: item.id };
                return;
            }
        }
    }
    _syncSelectionItemsState() {
        if (!this._selectedValue)
            return;
        const items = this._getAllListItems();
        items.forEach(item => {
            item.selected = this._selectedValue.value === item.value && this._selectedValue.id === item.id;
        });
    }
    _updateSlots = () => {
        this._leadingSlot = this.el.querySelector('[slot="leading-icon"]');
        this._trailingSlot = this.el.querySelector('[slot="trailing-icon"]');
    };
    _handleComboboxClick = () => {
        if (this.disabled)
            return;
        this._expanded = !this._expanded;
    };
    _updateSelectedValue(value, label, id) {
        this._selectedValue = { value, label, id };
        this.wdprSelectionChange.emit({ selectedValue: this._selectedValue });
    }
    get _hasSelection() {
        return this._selectedValue != null;
    }
    get _displayValue() {
        if (!this._hasSelection)
            return this.value;
        return this._selectedValue.label;
    }
    get _isListVisible() {
        return this._readyToShow && this._expanded && !this.isLoading && this._getAllListItems().length > 0 && !this.isErrorLoading;
    }
    render() {
        return (index.h(index.Host, { key: '092450cd05258d94db280b07efb22b7f5a957ecd', onKeyDown: this._handleKeydown }, index.h("div", { key: '661de2de4104bd9538cf90f721ed137d5f3d79ca', class: `chip-menu-wrapper ${this.alignment === 'left' ? 'chip-menu-align-start' : 'chip-menu-align-end'}` }, this._renderChipDropdown(), this._renderListWrapper(), this._renderStatusMessage())));
    }
    static get watchers() { return {
        "value": ["handleValueChanged"],
        "_selectedValue": ["updateSelectedValue"],
        "_expanded": ["handleExpandedChange"],
        "maxViewableItems": ["handleMaxViewableItemsChange"]
    }; }
};
WdprChipMenu.style = wdprChipMenuCss;

exports.wdpr_chip_menu = WdprChipMenu;
//# sourceMappingURL=wdpr-chip-menu.entry.cjs.js.map

//# sourceMappingURL=wdpr-chip-menu.cjs.entry.js.map