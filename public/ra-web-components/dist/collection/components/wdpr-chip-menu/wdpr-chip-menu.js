import { h, Host } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { getInitialFocusIndex, findNextEnabledIndex } from "./wdpr-chip-menu.utils";
import { generateRandId } from "../../utils/utils";
export class WdprChipMenu {
    _listId;
    _dropdownId;
    _slotObserver;
    _resizeObserver;
    _listEl = null;
    _cachedItems = null;
    el;
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
        this._listId = `wdpr-chip-menu-list-${generateRandId()}`;
        this._dropdownId = `wdpr-chip-menu-${generateRandId()}`;
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
        return (h("div", { ref: el => (this._listEl = el), class: "listbox", role: "listbox", id: this._listId, tabindex: isScrollable ? 0 : undefined, "aria-label": this.a11yListLabel || undefined }, h("slot", null)));
    }
    _renderChipDropdown() {
        return (h("div", { class: "chip-menu", tabindex: this.disabled ? -1 : 0, id: this._dropdownId, role: "combobox", "aria-haspopup": "listbox", "aria-disabled": this.disabled.toString(), "aria-expanded": this._expanded.toString(), "aria-controls": this._listId, "aria-label": this.a11yChipLabel || undefined, "aria-activedescendant": this._activeDescendantId, onClick: this._handleComboboxClick }, this._leadingSlot && (h("span", { class: "chip-menu__icon" }, h("slot", { name: "leading-icon", onSlotchange: this._updateSlots }))), h("span", { class: "chip-menu__display-value" }, this._displayValue), this._trailingSlot && (h("span", { class: "chip-menu__icon" }, h("slot", { name: "trailing-icon", onSlotchange: this._updateSlots })))));
    }
    _renderListWrapper() {
        const listContainerClasses = this._isListVisible ? 'chip-menu-list-container-visible' : 'chip-menu-list-container-invisible';
        return (h("div", { class: `chip-menu-list-container ${listContainerClasses}`, style: { height: this._measuredMaxHeight } }, this._renderList()));
    }
    _renderStatusMessage() {
        const isEmpty = this._getAllListItems().length === 0;
        if (!this._expanded)
            return null;
        if (this.isLoading)
            return (h("div", { class: "loading-container", role: "status", "aria-live": "polite", "aria-atomic": "true" }, h("wdpr-radial-loader", { size: this.loaderSize, label: this.loadingText, labelPlacement: this.loaderLabelPlacement, showLabel: this.showLoaderLabel })));
        if (isEmpty && !this.isErrorLoading && !this.isLoading)
            return (h("div", { class: "empty-container" }, h("wdpr-inline-message", { variant: "informational", size: this.emptyTextSize, role: "status", a11yLive: "polite" }, this.emptyText)));
        if (this.isErrorLoading && !this.isLoading)
            return (h("div", { class: "error-container" }, h("wdpr-inline-message", { variant: "error", size: this.errorTextSize, role: "status", a11yLive: "polite" }, this.errorText)));
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
        if (ev.key === KEYBOARD_KEYS.ENTER || ev.key === KEYBOARD_KEYS.SPACE) {
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
        if (ev.key === KEYBOARD_KEYS.ARROW_DOWN) {
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
        if (ev.key === KEYBOARD_KEYS.ARROW_UP) {
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
        if (ev.key === KEYBOARD_KEYS.ESCAPE && this._expanded) {
            ev.preventDefault();
            ev.stopPropagation();
            this._closeDropdown();
        }
        if (ev.key === KEYBOARD_KEYS.TAB) {
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
        return (h(Host, { key: '092450cd05258d94db280b07efb22b7f5a957ecd', onKeyDown: this._handleKeydown }, h("div", { key: '661de2de4104bd9538cf90f721ed137d5f3d79ca', class: `chip-menu-wrapper ${this.alignment === 'left' ? 'chip-menu-align-start' : 'chip-menu-align-end'}` }, this._renderChipDropdown(), this._renderListWrapper(), this._renderStatusMessage())));
    }
    static get is() { return "wdpr-chip-menu"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-chip-menu.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-chip-menu.css"]
        };
    }
    static get properties() {
        return {
            "value": {
                "type": "string",
                "attribute": "value",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "''"
            },
            "alignment": {
                "type": "string",
                "attribute": "alignment",
                "mutable": false,
                "complexType": {
                    "original": "ChipMenuAligment",
                    "resolved": "\"left\" | \"right\"",
                    "references": {
                        "ChipMenuAligment": {
                            "location": "import",
                            "path": "./wdpr-chip-menu.model",
                            "id": "src/components/wdpr-chip-menu/wdpr-chip-menu.model.ts::ChipMenuAligment"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'left'"
            },
            "maxViewableItems": {
                "type": "number",
                "attribute": "max-viewable-items",
                "mutable": false,
                "complexType": {
                    "original": "number | null",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "null"
            },
            "disabled": {
                "type": "boolean",
                "attribute": "disabled",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "noDivider": {
                "type": "boolean",
                "attribute": "no-divider",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "a11yChipLabel": {
                "type": "string",
                "attribute": "a11y-chip-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "a11yListLabel": {
                "type": "string",
                "attribute": "a11y-list-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "isLoading": {
                "type": "boolean",
                "attribute": "is-loading",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "loadingText": {
                "type": "string",
                "attribute": "loading-text",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Loading...'"
            },
            "loaderSize": {
                "type": "string",
                "attribute": "loader-size",
                "mutable": false,
                "complexType": {
                    "original": "RadialLoaderSize",
                    "resolved": "\"large\" | \"medium\" | \"small\"",
                    "references": {
                        "RadialLoaderSize": {
                            "location": "import",
                            "path": "../wdpr-radial-loader/wdpr-radial-loader.model",
                            "id": "src/components/wdpr-radial-loader/wdpr-radial-loader.model.ts::RadialLoaderSize"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'medium'"
            },
            "loaderLabelPlacement": {
                "type": "string",
                "attribute": "loader-label-placement",
                "mutable": false,
                "complexType": {
                    "original": "RadialLabelPlacement",
                    "resolved": "\"inline\" | \"stacked\"",
                    "references": {
                        "RadialLabelPlacement": {
                            "location": "import",
                            "path": "../wdpr-radial-loader/wdpr-radial-loader.model",
                            "id": "src/components/wdpr-radial-loader/wdpr-radial-loader.model.ts::RadialLabelPlacement"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'inline'"
            },
            "showLoaderLabel": {
                "type": "boolean",
                "attribute": "show-loader-label",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "emptyText": {
                "type": "string",
                "attribute": "empty-text",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'No results.'"
            },
            "emptyTextSize": {
                "type": "string",
                "attribute": "empty-text-size",
                "mutable": false,
                "complexType": {
                    "original": "InlineMessageSize",
                    "resolved": "\"default\" | \"small\"",
                    "references": {
                        "InlineMessageSize": {
                            "location": "import",
                            "path": "../wdpr-inline-message/wdpr-inline-message.model",
                            "id": "src/components/wdpr-inline-message/wdpr-inline-message.model.ts::InlineMessageSize"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'default'"
            },
            "isErrorLoading": {
                "type": "boolean",
                "attribute": "is-error-loading",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "errorText": {
                "type": "string",
                "attribute": "error-text",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Failed to load items. Please try again.'"
            },
            "errorTextSize": {
                "type": "string",
                "attribute": "error-text-size",
                "mutable": false,
                "complexType": {
                    "original": "InlineMessageSize",
                    "resolved": "\"default\" | \"small\"",
                    "references": {
                        "InlineMessageSize": {
                            "location": "import",
                            "path": "../wdpr-inline-message/wdpr-inline-message.model",
                            "id": "src/components/wdpr-inline-message/wdpr-inline-message.model.ts::InlineMessageSize"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'default'"
            }
        };
    }
    static get states() {
        return {
            "_leadingSlot": {},
            "_trailingSlot": {},
            "_expanded": {},
            "_selectedValue": {},
            "_readyToShow": {},
            "_focusedIndex": {},
            "_measuredMaxHeight": {},
            "_activeDescendantId": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprSelectionChange",
                "name": "wdprSelectionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ selectedValue: { id: string; value: string; label: string } | null }",
                    "resolved": "{ selectedValue: { id: string; value: string; label: string; }; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "handleValueChanged"
            }, {
                "propName": "_selectedValue",
                "methodName": "updateSelectedValue"
            }, {
                "propName": "_expanded",
                "methodName": "handleExpandedChange"
            }, {
                "propName": "maxViewableItems",
                "methodName": "handleMaxViewableItemsChange"
            }];
    }
    static get listeners() {
        return [{
                "name": "wdprSelect",
                "method": "handleItemSelect",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "click",
                "method": "handleDocumentClick",
                "target": "document",
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-chip-menu.js.map
