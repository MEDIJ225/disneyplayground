import { r as registerInstance, c as createEvent, a as getElement, h, F as Fragment } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

function isStandaloneResultsListItemElement(el) {
    return el.hasAttribute('data-standalone-results-list-item') && typeof el.value === 'string' && 'selected' in el && 'mode' in el && 'disabled' in el;
}

const WdprStandaloneResultsList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprSelectionChange = createEvent(this, "wdprSelectionChange", 7);
    }
    get el() { return getElement(this); }
    _measuredMaxHeight = null;
    _readyToShow = false;
    _selectedValues = new Set();
    mode = 'single';
    maxViewableItems = null;
    showDivider = true;
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
    wdprSelectionChange;
    updateSelectedValues() {
        this._syncSelectionItemsState();
    }
    handleMaxViewableItemsChange() {
        requestAnimationFrame(() => {
            this._measureItemHeights();
        });
    }
    handleItemSelect(event) {
        event.stopPropagation();
        const { detail: { value, selected }, } = event;
        this._updateSelectedValues(value, selected);
    }
    componentDidLoad() {
        requestAnimationFrame(() => {
            this._initAllItems();
            this._measureItemHeights();
        });
    }
    _getAllListItems() {
        const slot = this.el.shadowRoot?.querySelector('slot');
        if (!slot)
            return [];
        const assigned = slot.assignedElements({ flatten: true });
        const allItems = [];
        for (const el of assigned) {
            if (el.tagName === 'WDPR-STANDALONE-RESULTS-LIST-GROUP') {
                const groupShadow = el.shadowRoot;
                if (groupShadow) {
                    const groupSlot = groupShadow.querySelector('slot');
                    if (groupSlot) {
                        const groupAssigned = groupSlot.assignedElements({ flatten: true });
                        allItems.push(...groupAssigned.filter(isStandaloneResultsListItemElement));
                    }
                }
            }
            else if (isStandaloneResultsListItemElement(el)) {
                allItems.push(el);
            }
        }
        return allItems;
    }
    async _initAllItems() {
        const allItems = this._getAllListItems();
        if (allItems.length === 0)
            return;
        const lastItem = allItems[allItems.length - 1];
        const selectedSet = new Set();
        for (const item of allItems) {
            if (!this.showDivider || item === lastItem) {
                if (typeof item.hideDivider === 'function') {
                    await item.hideDivider();
                }
            }
            if (item.selected) {
                selectedSet.add(item.value);
            }
            item.mode = this.mode;
        }
        this._selectedValues = selectedSet;
    }
    _updateSelectedValues(value, selected) {
        if (this.mode === 'single') {
            this._updateValuesFromSingleSelection(value, selected);
        }
        if (this.mode === 'multiple') {
            this._updateValuesFromMultipleSelection(value, selected);
        }
        this.wdprSelectionChange.emit({ selectedValues: Array.from(this._selectedValues) });
    }
    _updateValuesFromSingleSelection(value, selected) {
        if (selected) {
            this._selectedValues = new Set([value]);
        }
        else {
            this._selectedValues = new Set();
        }
    }
    _updateValuesFromMultipleSelection(value, selected) {
        const newSelectedValues = new Set(this._selectedValues);
        if (selected) {
            newSelectedValues.add(value);
        }
        else {
            newSelectedValues.delete(value);
        }
        this._selectedValues = newSelectedValues;
    }
    _syncSelectionItemsState() {
        const items = this._getAllListItems();
        items.forEach(item => {
            item.selected = this._selectedValues.has(item.value);
        });
    }
    /**
     * Measures the height of the standalone result list and sets the max height for scrollable lists.
     * Calculates based on the number of visible items and their bounding rectangles.
     */
    _measureItemHeights() {
        if (this.maxViewableItems == null || this.maxViewableItems <= 0) {
            this._measuredMaxHeight = null;
            this._readyToShow = true;
            return;
        }
        const allListItems = this._getAllListItems();
        const wrapper = this.el.shadowRoot?.querySelector('.wrapper');
        if (!wrapper || allListItems.length === 0) {
            this._readyToShow = true;
            return;
        }
        if (allListItems.length <= this.maxViewableItems) {
            this._measuredMaxHeight = null;
            this._readyToShow = true;
            return;
        }
        const targetItem = allListItems[this.maxViewableItems - 1];
        const wrapperRect = wrapper.getBoundingClientRect();
        const itemRect = targetItem.getBoundingClientRect();
        let calculatedHeight = Math.ceil(itemRect.bottom - wrapperRect.top);
        // Add Wrapper Padding (if available)
        const style = window.getComputedStyle(wrapper);
        const paddingBottom = parseFloat(style.paddingBottom) || 0;
        calculatedHeight += paddingBottom;
        this._measuredMaxHeight = `${calculatedHeight}px`;
        this._readyToShow = true;
    }
    _handleSlotChange = async () => {
        this._initAllItems();
        this._measureItemHeights();
    };
    _renderContent() {
        const slot = this.el.shadowRoot?.querySelector('slot');
        let TagType = 'ul';
        if (slot) {
            const assigned = slot.assignedElements({ flatten: true });
            const onlyGroups = assigned.length > 0 && assigned.every(el => el.tagName === 'WDPR-STANDALONE-RESULTS-LIST-GROUP');
            TagType = onlyGroups ? 'div' : 'ul';
        }
        return (h(TagType, { class: "wrapper flex flex-col gap-y-100 p-200" }, h("slot", { onSlotchange: this._handleSlotChange })));
    }
    get _wrapperClasses() {
        return customTwMerge('overflow-y-auto', this._readyToShow ? 'visible' : 'invisible');
    }
    render() {
        const needsScrollbar = this._measuredMaxHeight !== null;
        return (h("div", { key: '9ec00f42f2239507ce0f3591922cdd1f9e07b2db', class: this._wrapperClasses, style: { height: this._measuredMaxHeight } }, !this.isLoading && !this.errorOnLoad && !this.isEmpty && (h(Fragment, { key: '7b42b28c6327e7bc993998fb70decce4ec3b3107' }, needsScrollbar ? (h("wdpr-scrollbar", { orientation: "vertical", size: "small" }, this._renderContent())) : (this._renderContent()))), this.isLoading && this.loadingText && (h("wdpr-surface-style", { key: '2a175f961613a4064018d903c84fbd620e36d43f', variant: "basic", customClass: "elevation-xsmall-soft py-300 px-200 flex flex-col items-center justify-center" }, h("wdpr-radial-loader", { key: 'd9b087d3cc624d0ca8b3803736876b9e966586b6', label: this.loadingText, size: this.loaderSize, labelPlacement: this.loaderLabelPlacement, showLabel: this.showLoaderLabel }))), !this.isLoading && this.isEmpty && this.emptyText && (h("wdpr-surface-style", { key: '6274a07bdf76900d2cc9adbd3f021dafe420be6f', variant: "basic", customClass: "elevation-xsmall-soft py-600 px-200" }, h("div", { key: '17b0fa9b59f70279d500ea6a841615a914723dca', class: "flex flex-col items-center justify-center gap-100 text-text-disabled" }, h("wdpr-icon-library", { key: '99afb29036007a312ffe25bb4a5f569235cafbc6', icon: this.emptyIcon, size: this.emptyIconSize, decorative: true }), h("p", { key: 'ee6d0c0366efdfbccdaa9df73a15f9a6a9ccfc9a', class: "text-body-large text-text-disclaimer" }, this.emptyText)))), !this.isLoading && this.errorOnLoad && this.errorText && (h("wdpr-surface-style", { key: '530272a739f9309e540541949062000a91a9bc18', variant: "basic", customClass: "elevation-xsmall-soft py-600 px-200 flex flex-col items-center justify-center" }, h("wdpr-inline-message", { key: '5e57cc41a5e8f79bcaaf2c1969034f40e4f37585', variant: "error", size: this.errorTextSize }, this.errorText)))));
    }
    static get watchers() { return {
        "_selectedValues": ["updateSelectedValues"],
        "maxViewableItems": ["handleMaxViewableItemsChange"]
    }; }
};

export { WdprStandaloneResultsList as wdpr_standalone_results_list };
//# sourceMappingURL=wdpr-standalone-results-list.entry.js.map

//# sourceMappingURL=wdpr-standalone-results-list.entry.js.map