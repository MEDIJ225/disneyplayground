import { h, F as Fragment, r as registerInstance, c as createEvent, a as getElement, H as Host } from './index-CykM8GCN.js';
import { g as generateRandId } from './utils-B2sDCMk6.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import './bundle-cjs-CF3xLdU_.js';

function isComboboxItemElement(el) {
    return el.hasAttribute('data-combobox-item') &&
        typeof el.value === 'string' &&
        'value' in el &&
        'label' in el &&
        'mode' in el &&
        'selected' in el &&
        'disabled' in el &&
        'isFocused' in el &&
        'isHidden' in el;
}

/**
 * Renders the multi-select tags/chips.
 *
 * @param config - Tag rendering configuration
 * @returns JSX fragment with tags and overflow indicator
 */
function renderTags(config) {
    const { selectedItems, maxVisibleTags } = config;
    if (selectedItems.length === 0) {
        return null;
    }
    const visibleTags = selectedItems.slice(0, maxVisibleTags);
    const overflowCount = Math.max(0, selectedItems.length - maxVisibleTags);
    return (h(Fragment, null,
        visibleTags.map((item) => (h("wdpr-combobox-tag", { key: item.id, label: item.label }))),
        overflowCount > 0 && (h("span", { class: "inline-flex items-center justify-center h-250 px-100 body-medium-alt text-text-status-neutral bg-surface-status-neutral rounded-050 shrink-0" },
            "+",
            overflowCount))));
}
/**
 * Calculates how many tags can fit in the container using estimation.
 *
 * @param config - Configuration for the calculation
 */
function calculateVisibleTags(config) {
    const { tagsContainerRef, showIcon, currentMaxVisibleTags, onMaxVisibleTagsChange } = config;
    if (!tagsContainerRef)
        return;
    const containerWidth = tagsContainerRef.offsetWidth;
    if (!containerWidth || !Number.isFinite(containerWidth))
        return;
    const wrapperPadding = 32;
    const wrapperGap = showIcon ? 16 : 0;
    const iconButtonWidth = showIcon ? 32 : 0;
    const inputMinWidth = 50;
    const overflowBadgeWidth = 32;
    const avgTagWidth = 60;
    const tagGap = 4;
    const reservedSpace = wrapperPadding + wrapperGap + iconButtonWidth + inputMinWidth + overflowBadgeWidth;
    const availableWidth = containerWidth - reservedSpace;
    const estimatedMaxTags = Math.max(1, Math.floor(availableWidth / (avgTagWidth + tagGap)));
    if (estimatedMaxTags !== currentMaxVisibleTags) {
        onMaxVisibleTagsChange(estimatedMaxTags);
    }
}
/**
 * Creates a ResizeObserver for the tags container.
 *
 * @param config - Configuration for the observer
 * @returns The ResizeObserver instance or undefined
 */
function createTagsResizeObserver(config) {
    const { tagsContainerRef, onResize } = config;
    if (!tagsContainerRef)
        return undefined;
    const observer = new ResizeObserver(() => {
        onResize();
    });
    observer.observe(tagsContainerRef);
    return observer;
}

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

const wdprComboboxCss = ".combobox-wrapper.sc-wdpr-combobox{display:flex;flex-direction:column;width:100%;position:relative;font-family:var(--theme-font-family-default)}.combobox-list-container-visible.sc-wdpr-combobox{visibility:visible}.combobox-list-container-invisible.sc-wdpr-combobox{visibility:hidden}.combobox-list-container.sc-wdpr-combobox{position:absolute;overflow-y:auto;left:var(--theme-spacing-000);right:var(--theme-spacing-000);z-index:10;border-radius:var(--theme-radius-150);border-width:var(--theme-stroke-012);border-color:var(--theme-color-stroke-neutral-light);border-style:solid;box-shadow:var(--theme-elevation-medium-soft);background-color:var(--theme-color-surface-default)}[location='above'].sc-wdpr-combobox-h .combobox-list-container.sc-wdpr-combobox,[location='above'].sc-wdpr-combobox-h .loading-container.sc-wdpr-combobox,[location='above'].sc-wdpr-combobox-h .empty-container.sc-wdpr-combobox,[location='above'].sc-wdpr-combobox-h .error-container.sc-wdpr-combobox{bottom:calc(100% + var(--theme-spacing-100))}[location='below'].sc-wdpr-combobox-h .combobox-list-container.sc-wdpr-combobox,[location='below'].sc-wdpr-combobox-h .loading-container.sc-wdpr-combobox,[location='below'].sc-wdpr-combobox-h .empty-container.sc-wdpr-combobox,[location='below'].sc-wdpr-combobox-h .error-container.sc-wdpr-combobox{top:calc(100% + var(--theme-spacing-100))}.loading-container.sc-wdpr-combobox,.empty-container.sc-wdpr-combobox,.error-container.sc-wdpr-combobox{position:absolute;left:var(--theme-spacing-000);right:var(--theme-spacing-000);z-index:10;background:var(--theme-color-surface-default);border-radius:var(--theme-radius-150);border-width:var(--theme-stroke-012);border-color:var(--theme-color-stroke-neutral-light);border-style:solid;box-shadow:var(--theme-elevation-medium-soft);padding-inline:var(--theme-spacing-200)}.loading-container.sc-wdpr-combobox{padding-block:var(--theme-spacing-300)}.empty-container.sc-wdpr-combobox,.error-container.sc-wdpr-combobox{padding-block:var(--theme-spacing-600)}.listbox.sc-wdpr-combobox{display:flex;flex-direction:column;row-gap:var(--theme-spacing-100);padding:var(--theme-spacing-200)}.multi-selection-input.sc-wdpr-combobox{flex:1;min-width:60px;border:none;outline:none;background-color:transparent;color:var(--theme-color-text-body);padding:0;font-size:var(--theme-typography-font-size-body-large);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-large);letter-spacing:var(--theme-typography-letter-spacing-default);font-family:var(--theme-font-family-default)}.multi-selection-wrapper.sc-wdpr-combobox{display:flex;flex-direction:column;width:100%}.multi-selection-container.sc-wdpr-combobox{display:flex;align-items:center;box-sizing:border-box;background-color:var(--theme-color-surface-default);border-color:var(--theme-color-stroke-actionable-alt-default);border-radius:var(--theme-radius-150);border-width:var(--theme-stroke-012);border-style:solid;gap:var(--theme-spacing-050);padding:var(--theme-spacing-200);height:var(--theme-dimension-700);min-width:140px;transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    border-color 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    outline-color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.multi-selection-container.sc-wdpr-combobox:has(.multi-selection-input:focus),.multi-selection-container.has-tags.sc-wdpr-combobox{padding-inline:var(--theme-spacing-200);padding-block:var(--theme-spacing-112)}.multi-selection-container.sc-wdpr-combobox:has(.multi-selection-input:focus-visible){outline-style:solid;outline-width:var(--theme-stroke-037);outline-offset:-2px;outline-color:var(--theme-color-stroke-actionable-focused)}.multi-selection-container.sc-wdpr-combobox:has(.multi-selection-input:disabled){border-color:var(--theme-color-icon-actionable-alt-disabled);cursor:not-allowed;color:var(--theme-color-text-disabled);background-color:var(--theme-color-surface-disabled)}.multi-selection-container.sc-wdpr-combobox:has(.multi-selection-input[aria-invalid='true']),.multi-selection-container.sc-wdpr-combobox:has(.multi-selection-input[aria-invalid='true']):hover,.multi-selection-container.sc-wdpr-combobox:has(.multi-selection-input[aria-invalid='true']):active{border-color:var(--theme-color-stroke-status-critical-alt)}.multi-selection-container.sc-wdpr-combobox:has(.multi-selection-input[aria-invalid='true']:focus-visible){outline-color:var(--theme-color-stroke-status-critical-alt)}.multi-selection-tags-input-wrapper.sc-wdpr-combobox{position:relative;flex:1;min-width:0;align-self:stretch;display:flex;align-items:center;gap:var(--theme-spacing-050);overflow:hidden}.multi-selection-tags-input-wrapper.sc-wdpr-combobox:has(.multi-selection-input:focus-visible),.multi-selection-tags-input-wrapper.tags-input-floated.sc-wdpr-combobox,.multi-selection-tags-input-wrapper.sc-wdpr-combobox:has(.multi-selection-input:not(:placeholder-shown)){padding-top:var(--theme-spacing-175)}.multi-selection-input.sc-wdpr-combobox:disabled{cursor:not-allowed;color:var(--theme-text-disabled-alt)}.multi-selection-input-label.sc-wdpr-combobox{position:absolute;left:0;pointer-events:none;display:block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:text;transition:all 150ms cubic-bezier(0.4, 0, 0.2, 1);color:var(--theme-color-text-disclaimer)}.multi-selection-input-label.label-floated.sc-wdpr-combobox,.multi-selection-input.sc-wdpr-combobox:focus-visible+.multi-selection-input-label.sc-wdpr-combobox,.multi-selection-input.sc-wdpr-combobox:not(:placeholder-shown)+.multi-selection-input-label.sc-wdpr-combobox{top:var(--theme-spacing-000);font-size:var(--theme-typography-font-size-label-small);font-weight:var(--theme-typography-font-weight-label-default);line-height:var(--theme-typography-line-height-label-small);height:calc(var(--theme-typography-line-height-label-small) + 2px);letter-spacing:var(--theme-typography-letter-spacing-default)}.multi-selection-input-label.label-not-floated.sc-wdpr-combobox{font-size:var(--theme-typography-font-size-body-large);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-large);letter-spacing:var(--theme-typography-letter-spacing-default)}.multi-selection-input.sc-wdpr-combobox:disabled+.multi-selection-input-label.sc-wdpr-combobox{cursor:not-allowed;color:var(--theme-color-text-disabled)}.multi-selection-input.sc-wdpr-combobox:read-only+.multi-selection-input-label.sc-wdpr-combobox{pointer-events:none}.icon-wrapper.sc-wdpr-combobox{height:var(--theme-dimension-250)}.inline-message-wrapper.sc-wdpr-combobox{margin-left:var(--theme-spacing-050);margin-top:var(--theme-spacing-050)}";

const WdprCombobox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprValueChanged = createEvent(this, "wdprValueChanged", 7);
        this.wdprSelectionChange = createEvent(this, "wdprSelectionChange", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    _listId;
    _textFieldId;
    _tagsContainerRef;
    _resizeObserver;
    _slotObserver;
    _defaultCheckedIds = [];
    _listEl = null;
    _cachedItems = null;
    _measureDebounceTimer;
    get el() { return getElement(this); }
    internals;
    _expanded = false;
    _inputValue = '';
    _highlightedChipIndex = -1;
    _maxVisibleTags = 100;
    _focusedIndex = -1;
    _selectedValues = new Set();
    _readyToShow = false;
    _activeDescendantId = undefined;
    _measuredMaxHeight = null;
    value = '';
    label = '';
    helperText = '';
    disabled = false;
    required = false;
    error = false;
    readonly = false;
    a11yLabel;
    name;
    filterMode = 'auto';
    location = 'below';
    toggleButtonAriaLabelClosed = '';
    toggleButtonAriaLabelOpen = '';
    hideIcon = false;
    mode = 'single';
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
    requirementIndicator = 'none';
    wdprValueChanged;
    wdprSelectionChange;
    handleValueChanged() {
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
    handleLeadingInputValueChange() {
        clearTimeout(this._measureDebounceTimer);
        this._measureDebounceTimer = setTimeout(() => {
            this._applyFilter();
            requestAnimationFrame(() => this._measureItemHeights());
        }, 100);
    }
    updateSelectedValues() {
        this._syncSelectionItemsState();
        this._applyFilter();
        this._updateFormValue();
    }
    formPropsChanged() {
        this._updateFormValue();
    }
    handleItemSelect(event) {
        event.stopPropagation();
        const { detail: { value, label, selected, id }, } = event;
        this._updateSelectedValues(value, label, selected, id);
        if (!this.isMultiSelect) {
            this._closeDropdown();
        }
        this._resetInputSingleSelection();
    }
    handleClickOutside(event) {
        if (this._expanded && this.el && !event.composedPath().includes(this.el)) {
            this._closeDropdown();
            this._resetInputSingleSelection();
        }
    }
    handleResetForm() {
        this._resetForm();
    }
    handleTagFocus(event) {
        const target = event.target;
        if (target.closest('wdpr-combobox-tag')) {
            this._closeDropdown();
            this._resetInputSingleSelection();
        }
    }
    componentWillLoad() {
        this._listId = `wdpr-combobox-list-${generateRandId()}`;
        this._textFieldId = `wdpr-text-field-${generateRandId()}`;
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
                if (this.value && this._selectedValues.size === 0) {
                    this._applyValue();
                }
                this._measureItemHeights();
            });
        });
    }
    componentDidRender() {
        if (this.isMultiSelect && this._tagsContainerRef) {
            this._setupResizeObserver();
            this._calculateVisibleTags();
        }
    }
    connectedCallback() {
        this.internals?.form?.addEventListener('reset', this._handleFormReset);
    }
    disconnectedCallback() {
        this.internals?.form?.removeEventListener('reset', this._handleFormReset);
        this._resizeObserver?.disconnect();
        this._slotObserver?.disconnect();
    }
    _updateFormValue() {
        const shouldSubmit = !this.disabled;
        const selectedValues = this._getSelectedValues();
        const selectedItemsValue = this.isMultiSelect ? selectedValues.map(i => i.value).join(',') : selectedValues[0]?.value || '';
        const formValue = shouldSubmit ? selectedItemsValue : null;
        queueMicrotask(() => {
            if (this.internals && this.name != null) {
                this.internals?.setFormValue?.(formValue);
            }
        });
        this._updateValidity();
    }
    _updateValidity() {
        const isInvalid = this.required && this._getSelectedValues().length === 0;
        if (this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        const validityError = isInvalid ? { valueMissing: true } : {};
        const errorMessage = isInvalid ? 'A value is required' : '';
        this.internals?.setValidity?.(validityError, errorMessage);
    }
    _resetForm() {
        this._updateFormValue();
        this._updateValidity();
    }
    _handleValueChanged = (event) => {
        const value = event.detail;
        event.stopPropagation();
        if (value !== undefined && value !== this._inputValue) {
            this._inputValue = value;
            if (!this._expanded)
                this._expanded = true;
            if (!this.isMultiSelect && this._selectedValues.size > 0) {
                this._selectedValues = new Set([]);
                this.wdprSelectionChange.emit({ selectedValues: [] });
            }
        }
        this.wdprValueChanged.emit(value);
        this._updateFormValue();
    };
    _getDisplayValue(rawValue) {
        return this.readonly && !rawValue ? '--' : rawValue ?? '';
    }
    _handleInput = (event) => {
        const input = event.target;
        const nextValue = this._getDisplayValue(input.value);
        if (nextValue !== undefined && nextValue !== this._inputValue) {
            this._inputValue = nextValue;
        }
        this.wdprValueChanged.emit(nextValue);
        this._updateFormValue();
    };
    _closeDropdown() {
        this._expanded = false;
    }
    _resetInputSingleSelection() {
        if (!this.isMultiSelect) {
            // Reset input to match selection state when closing (single-select only)
            if (this._selectedValues.size === 1) {
                const { label } = Array.from(this._selectedValues)[0];
                if (label === this._inputValue)
                    return;
                this._setInputFromLabel(label);
                this.wdprValueChanged.emit(this._inputValue);
            }
            else {
                if (this._inputValue === '')
                    return;
                this._clearInput();
                this.wdprValueChanged.emit(this._inputValue);
            }
        }
    }
    /**
     * Handles keyboard navigation and accessibility for the dropdown.
     * Supports arrow keys, Enter, Space, Escape, and Tab for navigation and selection.
     * @param ev The keyboard event
     */
    _handleTagNavigation = async (ev) => {
        if (!this.isMultiSelect)
            return;
        const selectedValues = this._getSelectedValues();
        const tagCount = Math.min(selectedValues.length, this._maxVisibleTags);
        if (ev.key === KEYBOARD_KEYS.ARROW_LEFT) {
            const input = this.el.querySelector('.multi-selection-input');
            const cursorAtStart = input?.selectionStart === 0 && input?.selectionEnd === 0;
            if (this._highlightedChipIndex >= 0) {
                ev.preventDefault();
                this._highlightedChipIndex = Math.max(0, this._highlightedChipIndex - 1);
                await this._focusTag(this._highlightedChipIndex);
            }
            else if (cursorAtStart && tagCount > 0) {
                ev.preventDefault();
                this._highlightedChipIndex = tagCount - 1;
                await this._focusTag(this._highlightedChipIndex);
            }
            return true;
        }
        if (ev.key === KEYBOARD_KEYS.ARROW_RIGHT && this._highlightedChipIndex >= 0) {
            ev.preventDefault();
            if (this._highlightedChipIndex >= tagCount - 1) {
                this._highlightedChipIndex = -1;
                this._focusInput();
            }
            else {
                this._highlightedChipIndex = this._highlightedChipIndex + 1;
                await this._focusTag(this._highlightedChipIndex);
            }
            return true;
        }
        if (ev.key === KEYBOARD_KEYS.BACKSPACE || ev.key === KEYBOARD_KEYS.ENTER || ev.key === KEYBOARD_KEYS.SPACE) {
            if (this._highlightedChipIndex >= 0) {
                ev.preventDefault();
                const toRemove = selectedValues[this._highlightedChipIndex];
                if (toRemove) {
                    this._updateSelectedValues(toRemove.value, toRemove.label, false, toRemove.id);
                    const nextIndex = Math.min(this._highlightedChipIndex, tagCount - 2);
                    this._highlightedChipIndex = nextIndex;
                    if (nextIndex >= 0) {
                        await this._focusTag(nextIndex);
                    }
                    else {
                        this._focusInput();
                    }
                }
                return true;
            }
            else if (this._inputValue === '' && tagCount > 0 && ev.key === KEYBOARD_KEYS.BACKSPACE) {
                ev.preventDefault();
                this._highlightedChipIndex = tagCount - 1;
                await this._focusTag(this._highlightedChipIndex);
                return true;
            }
        }
        if (this._highlightedChipIndex >= 0 && ev.key !== KEYBOARD_KEYS.ESCAPE && ev.key !== KEYBOARD_KEYS.TAB) {
            this._highlightedChipIndex = -1;
            this._focusInput();
        }
        return false;
    };
    _handleKeydown = async (ev) => {
        if (this.disabled || this.readonly)
            return;
        const tagNavigationHandled = await this._handleTagNavigation(ev);
        if (tagNavigationHandled)
            return;
        const items = this._getAllListItems();
        // Handle Enter and Space for toggle/selection
        if (ev.key === KEYBOARD_KEYS.ENTER || (ev.key === KEYBOARD_KEYS.SPACE && this._focusedIndex >= 0)) {
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
            this._resetInputSingleSelection();
        }
        if (ev.key === KEYBOARD_KEYS.TAB) {
            this._closeDropdown();
            this._resetInputSingleSelection();
        }
    };
    _handleIconButtonClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (this.disabled || this.readonly)
            return;
        this._expanded = !this._expanded;
    };
    _getAllListItems() {
        if (!this._cachedItems?.length) {
            this._cachedItems = Array.from(this.el?.querySelectorAll('[data-combobox-item]')).filter(isComboboxItemElement);
        }
        return this._cachedItems;
    }
    _invalidateItemsCache() {
        this._cachedItems = null;
    }
    _getAllVisibleListItems() {
        return this._getAllListItems().filter(item => !item.isHidden);
    }
    _getSelectedValues() {
        return Array.from(this._selectedValues);
    }
    _groupLastItems() {
        const groupElements = Array.from(this.el.querySelectorAll('wdpr-combobox-group'));
        const lastItems = [];
        for (const group of groupElements) {
            const items = Array.from(group.querySelectorAll('[data-combobox-item]')).filter(isComboboxItemElement);
            const lastItem = items[items.length - 1];
            if (lastItem) {
                lastItems.push(lastItem);
            }
        }
        return new Set(lastItems);
    }
    /**
     * Handles item configuration: sets mode, applies divider logic.
     * Does NOT touch value, _inputValue, or _selectedValues.
     * Called on load and whenever slot items change.
     */
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
            item.mode = this.mode;
        }
    }
    /**
     * Resolves the controlled value prop against available items.
     * Sets _selectedValues and _inputValue accordingly.
     * Called only from @Watch('value'), on initial load and when slotObserver emits events.
     */
    _applyValue() {
        const allItems = this._getAllListItems();
        if (!this.isMultiSelect) {
            if (this.value) {
                const matchedItem = allItems.find(item => (item.label === this.value || item.description === this.value) && !item.disabled);
                if (matchedItem) {
                    this._selectedValues = new Set([{ value: matchedItem.value, label: matchedItem.label, id: matchedItem.id }]);
                    this._setInputFromLabel(matchedItem.label);
                }
                else {
                    this._selectedValues = new Set();
                    this._setInputFromLabel(this.value);
                }
            }
            else {
                this._selectedValues = new Set();
                this._setInputFromLabel('');
            }
        }
        else {
            const selectedSet = new Set();
            if (this.value) {
                const values = this.value
                    .split(',')
                    .map(t => t.trim())
                    .filter(Boolean);
                values.forEach(value => {
                    const matchedItem = allItems.find(item => (item.label === value || item.description === value) && !item.disabled);
                    if (matchedItem) {
                        selectedSet.add({ value: matchedItem.value, label: matchedItem.label, id: matchedItem.id });
                    }
                });
            }
            this._selectedValues = selectedSet;
        }
        this._defaultCheckedIds = Array.from(this._selectedValues).map(i => i.id);
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
        this._readyToShow = false;
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
    _handleInputClick = () => {
        if (this.disabled || this.readonly)
            return;
        this._expanded = true;
    };
    /**
     * Filters items by calling hideItem/showItem on each DOM item.
     */
    _applyFilter = () => {
        if (this.filterMode === 'manual')
            return;
        const domItems = this._getAllListItems();
        if (!domItems.length)
            return;
        const visibleItems = [];
        domItems.forEach(item => {
            const matches = itemMatchesFilter(item, this._inputValue);
            item.isHidden = !matches;
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
        const groups = Array.from(this.el.querySelectorAll('wdpr-combobox-group'));
        groups.forEach(async (group) => {
            const groupItems = Array.from(group.querySelectorAll('[data-combobox-item]')).filter(isComboboxItemElement);
            const allHidden = groupItems.every(item => item.isHidden);
            if (allHidden) {
                await group.hideGroup();
            }
            else {
                await group.showGroup();
            }
        });
    };
    _updateSelectedValues(value, label, selected, id) {
        if (!this.isMultiSelect) {
            this._updateValuesFromSingleSelection(value, label, selected, id);
        }
        else {
            this._updateValuesFromMultipleSelection(value, label, selected, id);
        }
        this.wdprSelectionChange.emit({ selectedValues: Array.from(this._selectedValues) });
    }
    _updateValuesFromSingleSelection(value, label, selected, id) {
        if (selected) {
            this._selectedValues = new Set([{ value, label, id }]);
            this._setInputFromLabel(label);
        }
        else {
            this._selectedValues = new Set();
            this._clearInput();
        }
        this.wdprValueChanged.emit(this._inputValue);
    }
    _updateValuesFromMultipleSelection(value, label, selected, id) {
        const newSelectedValues = new Set(this._selectedValues);
        if (selected) {
            newSelectedValues.add({ value, label, id });
        }
        else {
            Array.from(newSelectedValues).forEach(selected => {
                if (selected.value === value && selected.id === id) {
                    newSelectedValues.delete(selected);
                }
            });
        }
        this._selectedValues = newSelectedValues;
        if (this._inputValue !== '') {
            this._clearInput();
            this.wdprValueChanged.emit(this._inputValue);
        }
        this._focusInput();
    }
    _syncSelectionItemsState() {
        const selectedIds = new Set(Array.from(this._selectedValues).map(s => s.id));
        this._getAllListItems().forEach(item => {
            item.selected = selectedIds.has(item.id);
        });
    }
    _renderTags() {
        return renderTags({
            selectedItems: this._getSelectedValues(),
            maxVisibleTags: this._maxVisibleTags,
        });
    }
    _focusTag(index) {
        const tags = Array.from(this.el.querySelectorAll('wdpr-combobox-tag'));
        tags[index]?.focusTag();
    }
    _focusInput() {
        this.el.querySelector('.multi-selection-input')?.focus();
    }
    _calculateVisibleTags = () => {
        calculateVisibleTags({
            tagsContainerRef: this._tagsContainerRef,
            showIcon: !this.hideIcon,
            currentMaxVisibleTags: this._maxVisibleTags,
            onMaxVisibleTagsChange: count => {
                this._maxVisibleTags = count;
            },
        });
    };
    _setupResizeObserver() {
        if (this._resizeObserver || !this._tagsContainerRef)
            return;
        this._resizeObserver = createTagsResizeObserver({
            tagsContainerRef: this._tagsContainerRef,
            onResize: this._calculateVisibleTags,
        });
    }
    _handleFormReset = () => {
        // Restore default selection
        const allItems = this._getAllListItems();
        const selectedSet = new Set();
        for (const item of allItems) {
            if (this._defaultCheckedIds.includes(item.id)) {
                selectedSet.add({ value: item.value, label: item.label, id: item.id });
            }
        }
        this._selectedValues = selectedSet;
        this._setInputFromLabel(this.isMultiSelect ? '' : selectedSet.size === 1 ? Array.from(selectedSet)[0].label : '');
        this._resetForm();
    };
    _renderMultiSelectInput() {
        const selectedValues = this._getSelectedValues();
        const hasContent = selectedValues.length > 0;
        return (h("div", { class: "multi-selection-wrapper" }, h("div", { ref: el => (this._tagsContainerRef = el), class: `multi-selection-container ${hasContent ? 'has-tags' : ''}` }, h("div", { class: `multi-selection-tags-input-wrapper ${hasContent ? 'tags-input-floated' : ''}` }, this._renderTags(), h("input", { type: "text", value: this._inputValue, placeholder: " ", id: this._textFieldId, class: "multi-selection-input", disabled: this.disabled, name: this.name, tabindex: this.disabled ? -1 : 0, readonly: this.readonly, "aria-invalid": this.error.toString(), role: "combobox", "aria-haspopup": "listbox", "aria-autocomplete": "list", "aria-expanded": this._expanded.toString(), "aria-controls": this._listId, "aria-disabled": this.disabled.toString(), "aria-activedescendant": this._activeDescendantId, "aria-required": this.required.toString(), "aria-describedby": this.helperText ? `${this._textFieldId}-helper-text` : undefined, onClick: this._handleInputClick, onInput: this._handleInput }), h("label", { class: `multi-selection-input-label ${hasContent ? 'label-floated' : 'label-not-floated'}`, htmlFor: this._textFieldId, innerHTML: this.label })), !this.hideIcon && !this.readonly && (h("span", { class: "icon-wrapper" }, h("wdpr-icon-button", { buttonId: this._listId, iconName: this._getIconName(), a11yLabel: this._getIconButtonAriaLabel(), disabled: this.disabled, onClicked: this._handleIconButtonClick })))), this.helperText && (h("div", { class: "inline-message-wrapper" }, h("wdpr-inline-message", { id: `${this._textFieldId}-helper-text`, variant: this.error ? 'error' : 'informational', size: "small", role: "status" }, this.helperText)))));
    }
    _getIconName() {
        return this._expanded ? 'expand-show-less' : 'expand-show-more';
    }
    _getIconButtonAriaLabel() {
        const closedLabel = this.toggleButtonAriaLabelClosed || 'Open list';
        const openLabel = this.toggleButtonAriaLabelOpen || 'Close list';
        return this._expanded ? openLabel : closedLabel;
    }
    _setInputFromLabel(label) {
        this._inputValue = label;
    }
    _clearInput() {
        this._setInputFromLabel('');
    }
    _renderList() {
        const isScrollable = this.maxViewableItems != null && this.maxViewableItems > 0;
        return (h("div", { ref: el => (this._listEl = el), class: "listbox", role: "listbox", id: this._listId, tabindex: isScrollable ? 0 : undefined, "aria-label": this.a11yLabel, "aria-multiselectable": this.isMultiSelect ? 'true' : undefined }, h("slot", null)));
    }
    _renderListWrapper() {
        const listContainerClasses = this._isListVisible ? 'combobox-list-container-visible' : 'combobox-list-container-invisible';
        return (h("div", { class: `combobox-list-container ${listContainerClasses}`, style: { height: this._measuredMaxHeight } }, this._renderList()));
    }
    _renderStatusMessage() {
        const isEmpty = this._getAllListItems().length === 0 || this._getAllVisibleListItems().length === 0;
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
    get isMultiSelect() {
        return this.mode === 'multiple';
    }
    get _isListVisible() {
        return this._readyToShow && this._expanded && !this.isLoading && this._getAllListItems().length > 0 && !this.isErrorLoading;
    }
    render() {
        return (h(Host, { key: 'b04ef968f350eb5a72aba008b8c17eec1550b5f9', onKeyDown: this._handleKeydown }, h("div", { key: '6ad1a361155757e68beec9f8c6a9f1dfe5014c40', class: "combobox-wrapper" }, this.isMultiSelect ? (this._renderMultiSelectInput()) : (h("wdpr-text-field", { label: this.label, helperText: this.helperText, value: this._inputValue, disabled: this.disabled, inputId: this._textFieldId, error: this.error, readonly: this.readonly, requirementIndicator: this.requirementIndicator, onWdprValueChanged: this._handleValueChanged, onWdprInputClick: this._handleInputClick, a11yRole: "combobox", a11yHasPopup: "listbox", a11yAutoComplete: "list", a11yExpanded: this._expanded ? 'true' : 'false', a11yControls: this._listId, a11yDisabled: this.disabled ? 'true' : 'false', a11yRequired: this.required ? 'true' : 'false', a11yDescribedBy: this.helperText ? `${this._textFieldId}-helper` : undefined, a11yActiveDescendant: this._activeDescendantId }, !this.hideIcon && !this.readonly && (h("wdpr-icon-button", { slot: "trailing-icon-button", iconName: this._getIconName(), a11yLabel: this._getIconButtonAriaLabel(), disabled: this.disabled, onClicked: this._handleIconButtonClick })))), this._renderListWrapper(), this._renderStatusMessage())));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["handleValueChanged"],
        "_expanded": ["handleExpandedChange"],
        "maxViewableItems": ["handleMaxViewableItemsChange"],
        "_inputValue": ["handleLeadingInputValueChange"],
        "_selectedValues": ["updateSelectedValues"],
        "name": ["formPropsChanged"],
        "required": ["formPropsChanged"],
        "disabled": ["formPropsChanged"]
    }; }
};
WdprCombobox.style = wdprComboboxCss;

export { WdprCombobox as wdpr_combobox };
//# sourceMappingURL=wdpr-combobox.entry.js.map

//# sourceMappingURL=wdpr-combobox.entry.js.map