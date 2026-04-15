import { h, Host } from "@stencil/core";
import { isDropdownItemElement } from "./wdpr-dropdown.model";
import { generateRandId } from "../../utils/utils";
import { findNextEnabledIndex, getInitialFocusIndex } from "./wdpr-dropdown.utils";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
export class WdprDropdown {
    _listId;
    _dropdownId;
    _defaultCheckedIds = [];
    _slotObserver;
    _resizeObserver;
    _listEl = null;
    _cachedItems = null;
    el;
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
        this._listId = `wdpr-dropdown-list-${generateRandId()}`;
        this._dropdownId = `wdpr-dropdown-${generateRandId()}`;
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
        return (h("div", { class: "dropdown", tabindex: this.disabled ? -1 : 0, id: this._dropdownId, role: "combobox", "data-has-value": this._hasValueAttr, "aria-invalid": this.error.toString(), "aria-disabled": this.disabled.toString(), "aria-readonly": this.readonly.toString(), "aria-expanded": this._expanded.toString(), "aria-controls": this._listId, "aria-labelledby": `${this._dropdownId}-label`, "aria-required": this.required.toString(), "aria-haspopup": "listbox", "aria-describedby": this.helperText ? `${this._dropdownId}-helper-text` : undefined, "aria-activedescendant": this._activeDescendantId, onClick: this._handleComboboxClick }, this._leadingIcon && !this.readonly && (h("span", { onClick: this._onLeadingClick, class: "dropdown__icon-wrapper" }, h("slot", { onSlotchange: this._handleLeadingIconSlotChange, name: "leading-icon" }))), h("div", { class: "dropdown__inner-wrapper" }, h("span", { class: "dropdown__display-value" }, this._displayValue), h("span", { class: "dropdown__label", id: `${this._dropdownId}-label` }, this.label, " ", this._requirementLabel)), !this.readonly && (h("span", { class: "dropdown__icon-wrapper" }, h("wdpr-icon-library", { icon: this._dropdownIcon, size: "medium", decorative: true })))));
    }
    _renderList() {
        const isScrollable = this.maxViewableItems != null && this.maxViewableItems > 0;
        return (h("div", { ref: el => (this._listEl = el), class: "listbox", role: "listbox", "aria-multiselectable": this._isMultipleMode ? 'true' : undefined, id: this._listId, tabindex: isScrollable ? 0 : undefined, "aria-label": this.a11yLabel }, h("slot", null)));
    }
    _renderInlineMessage() {
        return (this.helperText && (h("div", { class: "dropdown-inline-message-wrapper" }, h("wdpr-inline-message", { id: `${this._dropdownId}-helper-text`, variant: this.error ? 'error' : 'informational', size: "small", role: "status" }, this.helperText))));
    }
    _renderListWrapper() {
        const listContainerClasses = this._isListVisible ? 'dropdown-list-container-visible' : 'dropdown-list-container-invisible';
        return (h("div", { class: `dropdown-list-container ${listContainerClasses}`, style: { height: this._measuredMaxHeight } }, this._renderList()));
    }
    _renderStatusMessage() {
        const isEmpty = this._getAllListItems().length === 0;
        if (!this._expanded)
            return null;
        if (this.isLoading)
            return (h("div", { class: "loading-container" }, h("wdpr-radial-loader", { size: this.loaderSize, label: this.loadingText, labelPlacement: this.loaderLabelPlacement, showLabel: this.showLoaderLabel })));
        if (isEmpty && !this.isErrorLoading && !this.isLoading)
            return (h("div", { class: "empty-container" }, h("wdpr-inline-message", { variant: "informational", size: this.emptyTextSize }, this.emptyText)));
        if (this.isErrorLoading && !this.isLoading)
            return (h("div", { class: "error-container" }, h("wdpr-inline-message", { variant: "error", size: this.errorTextSize }, this.errorText)));
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
            return h("span", { "aria-hidden": "true" }, "*");
        if (this.requirementIndicator === 'optional')
            return h("span", null, "(Optional)");
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
        return (h(Host, { key: '5964293cf0c8538a621fdc556664734e3df13deb', onKeyDown: this._handleKeydown }, h("div", { key: 'b315bb57e8d7a2c9cfcee5f97fbd3c5c1a56e549', class: "dropdown-wrapper" }, this._renderDropdown(), this._renderInlineMessage(), this._renderListWrapper(), this._renderStatusMessage())));
    }
    static get is() { return "wdpr-dropdown"; }
    static get encapsulation() { return "scoped"; }
    static get formAssociated() { return true; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-dropdown.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-dropdown.css"]
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
                    "text": "The value to set/clear in the dropdown.\nUse the item's **label** (display text), not the item's `value` attribute.\nExamples: \"New York\", \"London\" \u2014 not \"new-york\", \"london\""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "''"
            },
            "mode": {
                "type": "string",
                "attribute": "mode",
                "mutable": false,
                "complexType": {
                    "original": "DropdownSelectionMode",
                    "resolved": "\"multiple\" | \"single\"",
                    "references": {
                        "DropdownSelectionMode": {
                            "location": "import",
                            "path": "./wdpr-dropdown.model",
                            "id": "src/components/wdpr-dropdown/wdpr-dropdown.model.ts::DropdownSelectionMode"
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
                "defaultValue": "'single'"
            },
            "label": {
                "type": "string",
                "attribute": "label",
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
                "defaultValue": "''"
            },
            "helperText": {
                "type": "string",
                "attribute": "helper-text",
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
                "defaultValue": "''"
            },
            "location": {
                "type": "string",
                "attribute": "location",
                "mutable": false,
                "complexType": {
                    "original": "DropdownLocation",
                    "resolved": "\"above\" | \"below\"",
                    "references": {
                        "DropdownLocation": {
                            "location": "import",
                            "path": "./wdpr-dropdown.model",
                            "id": "src/components/wdpr-dropdown/wdpr-dropdown.model.ts::DropdownLocation"
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
                "defaultValue": "'below'"
            },
            "required": {
                "type": "boolean",
                "attribute": "required",
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
            "name": {
                "type": "string",
                "attribute": "name",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "readonly": {
                "type": "boolean",
                "attribute": "readonly",
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
            "error": {
                "type": "boolean",
                "attribute": "error",
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
                "defaultValue": "false"
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
            "requirementIndicator": {
                "type": "string",
                "attribute": "requirement-indicator",
                "mutable": false,
                "complexType": {
                    "original": "DropdownRequirementIndicator",
                    "resolved": "\"none\" | \"optional\" | \"required\"",
                    "references": {
                        "DropdownRequirementIndicator": {
                            "location": "import",
                            "path": "./wdpr-dropdown.model",
                            "id": "src/components/wdpr-dropdown/wdpr-dropdown.model.ts::DropdownRequirementIndicator"
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
                "defaultValue": "'none'"
            },
            "a11yLabel": {
                "type": "string",
                "attribute": "a11y-label",
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
            "_expanded": {},
            "_measuredMaxHeight": {},
            "_readyToShow": {},
            "_selectedValues": {},
            "_focusedIndex": {},
            "_leadingIcon": {},
            "_activeDescendantId": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprLeadingIconClick",
                "name": "wdprLeadingIconClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
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
                    "original": "{ selectedValues: { id: string; value: string; label: string }[] }",
                    "resolved": "{ selectedValues: { id: string; value: string; label: string; }[]; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "_selectedValues",
                "methodName": "updateSelectedValues"
            }, {
                "propName": "_expanded",
                "methodName": "handleExpandedChange"
            }, {
                "propName": "maxViewableItems",
                "methodName": "handleMaxViewableItemsChange"
            }, {
                "propName": "name",
                "methodName": "formPropsChanged"
            }, {
                "propName": "required",
                "methodName": "formPropsChanged"
            }, {
                "propName": "disabled",
                "methodName": "formPropsChanged"
            }, {
                "propName": "mode",
                "methodName": "formPropsChanged"
            }, {
                "propName": "value",
                "methodName": "handleValueChanged"
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
                "method": "handleClickOutside",
                "target": "document",
                "capture": false,
                "passive": false
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=wdpr-dropdown.js.map
