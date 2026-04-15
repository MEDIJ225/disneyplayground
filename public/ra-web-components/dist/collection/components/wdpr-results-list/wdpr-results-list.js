import { h, Host } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
export class WdprResultsList {
    // ------------------------------------------------------------------
    // List Props
    // ------------------------------------------------------------------
    /**
     * Reference to the host element.
     */
    el;
    /**
     * The items to display in the list.
     */
    items = [];
    /**
     * Groups of items to display with headers.
     */
    groups = [];
    /**
     * Selection mode: 'single' for single selection, 'multiple' for checkboxes, 'none' for no selection.
     */
    selectionMode = 'single';
    /**
     * Whether to show dividers between items.
     */
    showDivider = true;
    /**
     * The ID of the element that labels the list.
     */
    labelledBy;
    /**
     * Maximum number of items to display before scrolling.
     */
    maxViewableItems = null;
    isLoading = false;
    loadingText = 'Loading...';
    loaderSize = 'medium';
    loaderLabelPlacement = 'inline';
    showLoaderLabel = true;
    isEmpty = false;
    emptyText = 'No results.';
    emptyIcon = 'search';
    emptyIconSize = 'large';
    errorOnLoad = false;
    errorText = 'Failed to load items. Please try again.';
    errorTextSize = 'default';
    _selectedItems = new Set();
    _focusedIndex = -1;
    /** Whether to show the visual focus ring (only true for keyboard navigation) */
    _showFocusRing = false;
    /** Measured max height for scrollable container */
    _measuredMaxHeight = null;
    /** Track if Shift key was pressed (for Shift+Tab focus direction) */
    _shiftKeyPressed = false;
    /** Track if a pointer (mouse/touch) is down - used to skip focus ring on click */
    _pointerDown = false;
    wdprSelectionChange;
    itemsChanged(newItems, oldItems) {
        this._syncSelectedItemsFromProps();
        // Only re-measure height when item count changes, not when just checked state changes
        // This prevents the flash/scroll reset when selecting items
        const oldCount = oldItems?.length ?? 0;
        const newCount = newItems?.length ?? 0;
        if (oldCount !== newCount) {
            this._measuredMaxHeight = null;
            this._measureItemHeights();
        }
    }
    groupsChanged(newGroups, oldGroups) {
        this._syncSelectedItemsFromProps();
        // Only re-measure height when total item count changes
        const oldCount = oldGroups?.reduce((sum, g) => sum + g.items.length, 0) ?? 0;
        const newCount = newGroups?.reduce((sum, g) => sum + g.items.length, 0) ?? 0;
        if (oldCount !== newCount) {
            this._measuredMaxHeight = null;
            this._measureItemHeights();
        }
    }
    componentWillLoad() {
        this._syncSelectedItemsFromProps();
    }
    componentDidLoad() {
        // Track shift key state for Shift+Tab focus direction
        document.addEventListener('keydown', this._trackShiftKey);
        document.addEventListener('keyup', this._trackShiftKeyUp);
        // Measure item heights for scrolling
        this._measureItemHeights();
    }
    /**
     * Measures actual rendered item heights and calculates max-height for scrolling.
     */
    _measureItemHeights() {
        if (this.maxViewableItems == null || this.maxViewableItems <= 0) {
            this._measuredMaxHeight = null;
            return;
        }
        // Use setTimeout to ensure items are rendered
        setTimeout(() => {
            const listItems = this.el.shadowRoot?.querySelectorAll('wdpr-results-list-item');
            if (!listItems || listItems.length === 0)
                return;
            const totalItems = listItems.length;
            if (totalItems <= this.maxViewableItems) {
                this._measuredMaxHeight = null;
                return;
            }
            // Measure the height of the first N items
            let totalHeight = 0;
            const itemCount = Math.min(this.maxViewableItems, listItems.length);
            for (let i = 0; i < itemCount; i++) {
                const item = listItems[i];
                totalHeight += item.offsetHeight;
            }
            // Add gap spacing between items (gap-y-100 = 4px)
            const gapSpacing = 4;
            totalHeight += (itemCount - 1) * gapSpacing;
            this._measuredMaxHeight = `${totalHeight}px`;
        }, 0);
    }
    /**
     * Syncs the internal _selectedItems state from the items prop.
     * Items with checked=true or selected=true will be added to the selection.
     */
    _syncSelectedItemsFromProps() {
        const allItems = this._getAllItems();
        const newSelectedItems = new Set();
        allItems.forEach(item => {
            if (item.checked || item.selected) {
                newSelectedItems.add(item.id);
            }
        });
        this._selectedItems = newSelectedItems;
    }
    disconnectedCallback() {
        document.removeEventListener('keydown', this._trackShiftKey);
        document.removeEventListener('keyup', this._trackShiftKeyUp);
    }
    _trackShiftKey = (ev) => {
        if (ev.key === KEYBOARD_KEYS.SHIFT) {
            this._shiftKeyPressed = true;
        }
    };
    _trackShiftKeyUp = (ev) => {
        if (ev.key === KEYBOARD_KEYS.SHIFT) {
            this._shiftKeyPressed = false;
        }
    };
    /**
     * Handles keyboard events for the results list.
     * Arrow Up/Down for focus navigation, Home/End for first/last, Enter/Space for selection.
     * Tab moves between selected items in multiple selection mode.
     * @param {KeyboardEvent} ev The keyboard event.
     */
    handleKeyDown(ev) {
        const allItems = this._getAllItems();
        if (allItems.length === 0)
            return;
        switch (ev.key) {
            case KEYBOARD_KEYS.TAB:
                // In multiple selection mode with selected items, Tab moves between selected items
                if (this.selectionMode === 'multiple' && this._selectedItems.size > 1) {
                    if (ev.shiftKey) {
                        const moved = this._focusPreviousSelectedItem();
                        if (moved) {
                            ev.preventDefault();
                        }
                        else {
                            // No more selected items, clear focus so list exits cleanly
                            this._clearFocus();
                        }
                    }
                    else {
                        const moved = this._focusNextSelectedItem();
                        if (moved) {
                            ev.preventDefault();
                        }
                        else {
                            // No more selected items, clear focus so list exits cleanly
                            this._clearFocus();
                        }
                    }
                }
                else {
                    // Single selection or no selections - clear focus and let Tab exit
                    this._clearFocus();
                }
                break;
            case KEYBOARD_KEYS.ARROW_DOWN:
                ev.preventDefault();
                this._focusNextItem();
                break;
            case KEYBOARD_KEYS.ARROW_UP:
                ev.preventDefault();
                this._focusPreviousItem();
                break;
            case KEYBOARD_KEYS.HOME:
                ev.preventDefault();
                this._focusFirstItem();
                break;
            case KEYBOARD_KEYS.END:
                ev.preventDefault();
                this._focusLastItem();
                break;
            // Note: Enter/Space selection is handled by the item's _handleKeyDown → _handleClick → wdprChange/wdprSelect
            // which calls _handleItemSelect. We don't handle it here to avoid double-toggling.
        }
    }
    _focusNextItem = () => {
        const allItems = this._getAllItems();
        if (allItems.length === 0)
            return;
        const nextIndex = this._focusedIndex + 1 < allItems.length ? this._focusedIndex + 1 : 0;
        this._setFocusedItem(nextIndex);
    };
    _focusPreviousItem = () => {
        const allItems = this._getAllItems();
        if (allItems.length === 0)
            return;
        const prevIndex = this._focusedIndex - 1 >= 0 ? this._focusedIndex - 1 : allItems.length - 1;
        this._setFocusedItem(prevIndex);
    };
    /**
     * Focus the next selected item (for Tab navigation in multiple selection mode)
     * Returns true if moved to another selected item, false if no more selected items
     */
    _focusNextSelectedItem = () => {
        const allItems = this._getAllItems();
        if (allItems.length === 0)
            return false;
        // Find selected items after current focus
        for (let i = this._focusedIndex + 1; i < allItems.length; i++) {
            if (this._selectedItems.has(allItems[i].id)) {
                this._setFocusedItem(i);
                return true;
            }
        }
        // No more selected items after current, allow Tab to exit
        return false;
    };
    /**
     * Focus the previous selected item (for Shift+Tab navigation in multiple selection mode)
     * Returns true if moved to another selected item, false if no more selected items
     */
    _focusPreviousSelectedItem = () => {
        const allItems = this._getAllItems();
        if (allItems.length === 0)
            return false;
        // Find selected items before current focus
        for (let i = this._focusedIndex - 1; i >= 0; i--) {
            if (this._selectedItems.has(allItems[i].id)) {
                this._setFocusedItem(i);
                return true;
            }
        }
        // No more selected items before current, allow Shift+Tab to exit
        return false;
    };
    _focusFirstItem = () => {
        this._setFocusedItem(0);
    };
    _focusLastItem = () => {
        const allItems = this._getAllItems();
        if (allItems.length > 0) {
            this._setFocusedItem(allItems.length - 1);
        }
    };
    _setFocusedItem = (index) => {
        this._focusedIndex = index;
        this._showFocusRing = true; // Always show focus ring when using keyboard navigation
        this._focusItemElement(index);
    };
    _focusItemElement = (index) => {
        // Clear focus from all items first
        const allItems = Array.from(this.el.shadowRoot?.querySelectorAll('wdpr-results-list-item') ?? []);
        allItems.forEach(item => {
            item.isFocused = false;
        });
        // Set focus on the target item
        if (allItems[index]) {
            const itemElement = allItems[index];
            itemElement.isFocused = true;
        }
    };
    /**
     * Find the index of the first selected item, or -1 if none
     */
    _getFirstSelectedItemIndex = () => {
        const allItems = this._getAllItems();
        return allItems.findIndex(item => this._selectedItems.has(item.id));
    };
    /**
     * Find the index of the last selected item, or -1 if none
     */
    _getLastSelectedItemIndex = () => {
        const allItems = this._getAllItems();
        for (let i = allItems.length - 1; i >= 0; i--) {
            if (this._selectedItems.has(allItems[i].id)) {
                return i;
            }
        }
        return -1;
    };
    /**
     * Focus on the selected item if one exists, otherwise focus on the first item
     * For Shift+Tab with multiple selections, focus the last selected item
     * For Tab or when nothing is selected, focus the first selected/first item
     */
    _focusSelectedOrFirstItem = () => {
        const firstSelectedIndex = this._getFirstSelectedItemIndex();
        if (this._shiftKeyPressed && this._selectedItems.size > 1) {
            // Shift+Tab with multiple selections: focus last selected item
            const lastSelectedIndex = this._getLastSelectedItemIndex();
            if (lastSelectedIndex >= 0) {
                this._setFocusedItem(lastSelectedIndex);
            }
            else {
                this._focusFirstItem();
            }
        }
        else {
            // Tab or no/single selection: focus first selected item or first item
            if (firstSelectedIndex >= 0) {
                this._setFocusedItem(firstSelectedIndex);
            }
            else {
                this._focusFirstItem();
            }
        }
    };
    /**
     * Initialize focus on selected item (or first item) when list receives focus via keyboard
     */
    _handleListFocus = () => {
        // Only initialize focus if no item is currently focused AND focus came from keyboard (not pointer)
        if (this._focusedIndex === -1 && !this._pointerDown) {
            this._focusSelectedOrFirstItem();
        }
    };
    /**
     * Track pointer down to distinguish keyboard vs pointer focus
     */
    _handlePointerDown = () => {
        this._pointerDown = true;
    };
    /**
     * Reset pointer down flag after click has been processed
     */
    _handleClick = () => {
        // Reset after a microtask to allow selection handlers to run first
        setTimeout(() => {
            this._pointerDown = false;
        }, 0);
    };
    /**
     * Clear focus when the list loses focus
     */
    _handleListBlur = (event) => {
        // Check if focus is moving outside the component
        const relatedTarget = event.relatedTarget;
        if (!relatedTarget || !this.el.contains(relatedTarget)) {
            this._clearFocus();
        }
    };
    /**
     * Clear focus from all items
     */
    _clearFocus = () => {
        this._focusedIndex = -1;
        this._showFocusRing = false;
        const allItems = Array.from(this.el.shadowRoot?.querySelectorAll('wdpr-results-list-item') ?? []);
        allItems.forEach(item => {
            item.isFocused = false;
        });
    };
    _handleItemSelect = (event, item, index) => {
        event.stopPropagation();
        if (this.selectionMode === 'none')
            return;
        if (this.selectionMode === 'single') {
            this._selectedItems.clear();
            if (event.detail.selected) {
                this._selectedItems.add(item.id);
            }
        }
        else {
            if (event.detail.checked) {
                this._selectedItems.add(item.id);
            }
            else {
                this._selectedItems.delete(item.id);
            }
        }
        this._selectedItems = new Set(this._selectedItems);
        // Only show visual focus indicator for keyboard interactions, not mouse clicks
        const triggeredByKeyboard = event.detail.triggeredByKeyboard === true;
        this._focusedIndex = index;
        this._showFocusRing = triggeredByKeyboard;
        if (triggeredByKeyboard) {
            this._focusItemElement(index);
        }
        const selectedItemsArray = this._getAllItems().filter(i => this._selectedItems.has(i.id));
        this.wdprSelectionChange.emit({ selectedItems: selectedItemsArray });
    };
    _getAllItems() {
        if (this.groups && this.groups.length > 0) {
            return this.groups.flatMap(group => group.items);
        }
        return this.items;
    }
    _getSpacingClass() {
        return 'gap-y-100';
    }
    _getVariantForItem(item) {
        if (this.selectionMode === 'multiple') {
            return 'checkbox';
        }
        if (item.icon) {
            return 'label-with-icon';
        }
        return 'label';
    }
    _renderListItem(item, index, totalItems) {
        const variant = this._getVariantForItem(item);
        const isSelected = this._selectedItems.has(item.id);
        // Only show focus ring when _showFocusRing is true (keyboard navigation)
        const isFocused = this._focusedIndex === index && this._showFocusRing;
        const shouldShowDivider = this.showDivider && index < totalItems - 1;
        // For checkbox variant, use _selectedItems state for checked; otherwise use item.checked
        const isChecked = this.selectionMode === 'multiple' ? isSelected : item.checked;
        return (h("div", { key: item.id }, h("wdpr-results-list-item", { variant: variant, label: item.label, description: item.description, icon: item.icon, selected: isSelected, disabled: item.disabled, checked: isChecked, value: item.value, itemId: item.id, isFocused: isFocused, onWdprSelect: e => this._handleItemSelect(e, item, index), onWdprChange: e => this._handleItemSelect(e, item, index) }), shouldShowDivider && (h("div", { class: "mx-100" }, h("wdpr-divider", null)))));
    }
    _renderGroupHeader(label) {
        return (h("div", { class: "px-050 py-100" }, h("span", { class: "body-medium-alt text-text-heading" }, label)));
    }
    _renderGroups() {
        let globalIndex = 0;
        return (h("div", { class: customTwMerge('flex flex-col', this._getSpacingClass()) }, this.groups.map(group => (h("div", { key: group.id }, this._renderGroupHeader(group.label), h("div", { class: customTwMerge('flex flex-col', this._getSpacingClass()) }, group.items.map((item, itemIndex) => {
            const itemElement = this._renderGroupListItem(item, globalIndex, itemIndex, group.items.length);
            globalIndex++;
            return itemElement;
        })))))));
    }
    _renderGroupListItem(item, globalIndex, itemIndex, groupItemCount) {
        const variant = this._getVariantForItem(item);
        const isSelected = this._selectedItems.has(item.id);
        // Only show focus ring when _showFocusRing is true (keyboard navigation)
        const isFocused = this._focusedIndex === globalIndex && this._showFocusRing;
        const shouldShowDivider = this.showDivider && itemIndex < groupItemCount - 1;
        // For checkbox variant, use _selectedItems state for checked; otherwise use item.checked
        const isChecked = this.selectionMode === 'multiple' ? isSelected : item.checked;
        return (h("div", { key: item.id }, h("wdpr-results-list-item", { variant: variant, label: item.label, description: item.description, icon: item.icon, selected: isSelected, disabled: item.disabled, checked: isChecked, value: item.value, itemId: item.id, isFocused: isFocused, onWdprSelect: e => this._handleItemSelect(e, item, globalIndex), onWdprChange: e => this._handleItemSelect(e, item, globalIndex) }), shouldShowDivider && (h("div", { class: "mx-100" }, h("wdpr-divider", null)))));
    }
    _renderItems() {
        return h("div", { class: customTwMerge('flex flex-col', this._getSpacingClass()) }, this.items.map((item, index) => this._renderListItem(item, index, this.items.length)));
    }
    _renderContent() {
        if (this.groups && this.groups.length > 0) {
            return this._renderGroups();
        }
        return this._renderItems();
    }
    render() {
        // Use measured height for scrolling if available
        const needsScrollbar = this._measuredMaxHeight !== null;
        return (h(Host, { key: '5e3db383c8b8522d09eda2f4ce2022c50e64226d', role: "listbox", tabindex: 0, "aria-labelledby": this.labelledBy, onFocus: this._handleListFocus, onBlur: this._handleListBlur, onPointerDown: this._handlePointerDown, onClick: this._handleClick, part: "results-list" }, !this.isLoading && !this.errorOnLoad && !this.isEmpty && (h("wdpr-surface-style", { key: '6f51693b5e1e8a00b7169e78ea8d330a373bfa62', variant: "basic", customClass: "elevation-xsmall-soft p-200" }, needsScrollbar ? (h("div", { style: { height: this._measuredMaxHeight } }, h("wdpr-scrollbar", { orientation: "vertical", size: "small" }, this._renderContent()))) : (this._renderContent()), h("slot", { key: '77411825a1c421347f325be670a30c34c8afbb59' }))), this.isLoading && this.loadingText && (h("wdpr-surface-style", { key: '74ed9f5e0e9ab762a274211550fc5c6a9da021a4', variant: "basic", customClass: "elevation-xsmall-soft py-300 px-200 flex flex-col items-center justify-center" }, h("wdpr-radial-loader", { key: '559c5090a5f7ff80f04fd923cd644216f49d5ce1', label: this.loadingText, size: this.loaderSize, labelPlacement: this.loaderLabelPlacement, showLabel: this.showLoaderLabel }))), !this.isLoading && this.isEmpty && this.emptyText && (h("wdpr-surface-style", { key: '92750c77cb0ba37201d52cb0f7e68e966b4a7bd5', variant: "basic", customClass: "elevation-xsmall-soft py-600 px-200" }, h("div", { key: '2ada71bf5e6e41945eec6b73a0bf58f6784167dd', class: "flex flex-col items-center justify-center gap-100 text-text-disabled" }, h("wdpr-icon-library", { key: '0afcab0e0b333c6df36b7f78a67ca5434658da4c', icon: this.emptyIcon, size: this.emptyIconSize, decorative: true }), h("p", { key: 'aa84c7e46c5b8602bad24e066412479729197961', class: "text-body-large text-text-disclaimer" }, this.emptyText)))), !this.isLoading && this.errorOnLoad && this.errorText && (h("wdpr-surface-style", { key: '5b16e58a969ac153bcdf1bdfaa5491f9b35e9ab3', variant: "basic", customClass: "elevation-xsmall-soft py-600 px-200 flex flex-col items-center justify-center" }, h("wdpr-inline-message", { key: '5dd594828995da9925a786bd287bb72ebd320a08', variant: "error", size: this.errorTextSize }, this.errorText)))));
    }
    static get is() { return "wdpr-results-list"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host {\n      display: block;\n      outline: none;\n    }"; }
    static get properties() {
        return {
            "items": {
                "type": "unknown",
                "attribute": "items",
                "mutable": false,
                "complexType": {
                    "original": "ResultsListItemConfig[]",
                    "resolved": "ResultsListItemConfig[]",
                    "references": {
                        "ResultsListItemConfig": {
                            "location": "import",
                            "path": "../wdpr-results-list-item/wdpr-results-list-item.model",
                            "id": "src/components/wdpr-results-list-item/wdpr-results-list-item.model.ts::ResultsListItemConfig"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The items to display in the list."
                },
                "getter": false,
                "setter": false,
                "defaultValue": "[]"
            },
            "groups": {
                "type": "unknown",
                "attribute": "groups",
                "mutable": false,
                "complexType": {
                    "original": "ResultsListGroup[]",
                    "resolved": "ResultsListGroup[]",
                    "references": {
                        "ResultsListGroup": {
                            "location": "import",
                            "path": "../wdpr-results-list-item/wdpr-results-list-item.model",
                            "id": "src/components/wdpr-results-list-item/wdpr-results-list-item.model.ts::ResultsListGroup"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Groups of items to display with headers."
                },
                "getter": false,
                "setter": false,
                "defaultValue": "[]"
            },
            "selectionMode": {
                "type": "string",
                "attribute": "selection-mode",
                "mutable": false,
                "complexType": {
                    "original": "SelectionMode",
                    "resolved": "\"multiple\" | \"none\" | \"single\"",
                    "references": {
                        "SelectionMode": {
                            "location": "import",
                            "path": "../wdpr-results-list-item/wdpr-results-list-item.model",
                            "id": "src/components/wdpr-results-list-item/wdpr-results-list-item.model.ts::SelectionMode"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Selection mode: 'single' for single selection, 'multiple' for checkboxes, 'none' for no selection."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'single'"
            },
            "showDivider": {
                "type": "boolean",
                "attribute": "show-divider",
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
                    "text": "Whether to show dividers between items."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "labelledBy": {
                "type": "string",
                "attribute": "labelled-by",
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
                    "text": "The ID of the element that labels the list."
                },
                "getter": false,
                "setter": false,
                "reflect": false
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
                    "text": "Maximum number of items to display before scrolling."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "null"
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
            "isEmpty": {
                "type": "boolean",
                "attribute": "is-empty",
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
            "emptyIcon": {
                "type": "string",
                "attribute": "empty-icon",
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
                "defaultValue": "'search'"
            },
            "emptyIconSize": {
                "type": "string",
                "attribute": "empty-icon-size",
                "mutable": false,
                "complexType": {
                    "original": "IconLibrarySize",
                    "resolved": "\"large\" | \"medium\" | \"medium-alt\" | \"small\" | \"xlarge\" | \"xsmall\" | \"xxsmall\"",
                    "references": {
                        "IconLibrarySize": {
                            "location": "import",
                            "path": "../wdpr-icon-library/wdpr-icon-library.model",
                            "id": "src/components/wdpr-icon-library/wdpr-icon-library.model.ts::IconLibrarySize"
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
                "defaultValue": "'large'"
            },
            "errorOnLoad": {
                "type": "boolean",
                "attribute": "error-on-load",
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
            "_selectedItems": {},
            "_focusedIndex": {},
            "_showFocusRing": {},
            "_measuredMaxHeight": {}
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
                    "original": "{\n    selectedItems: ResultsListItemConfig[];\n  }",
                    "resolved": "{ selectedItems: ResultsListItemConfig[]; }",
                    "references": {
                        "ResultsListItemConfig": {
                            "location": "import",
                            "path": "../wdpr-results-list-item/wdpr-results-list-item.model",
                            "id": "src/components/wdpr-results-list-item/wdpr-results-list-item.model.ts::ResultsListItemConfig"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "items",
                "methodName": "itemsChanged"
            }, {
                "propName": "groups",
                "methodName": "groupsChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "keydown",
                "method": "handleKeyDown",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-results-list.js.map
