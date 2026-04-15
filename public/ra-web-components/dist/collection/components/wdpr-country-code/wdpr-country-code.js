import { Host, h, Fragment } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { generateRandId } from "../../utils/utils";
import { findNextEnabledIndex, getInitialFocusIndex, itemMatchesFilter } from "./wdpr-country-code.utils";
import { FLAG_SVGS } from "../../utils/flags";
export class WdprCountryCode {
    _listId = '';
    _textFieldId = '';
    _defaultSelectedId = null;
    _slotObserver;
    _listEl = null;
    _cachedItems = null;
    _measureDebounceTimer;
    el;
    internals;
    label = '';
    helperText = '';
    disabled = false;
    error = false;
    location = 'below';
    showCountryCodeOnly = false;
    required = false;
    name;
    value = '';
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
    _expanded = false;
    _inputValue = '';
    _focusedIndex = -1;
    _activeDescendantId = undefined;
    _selectedValue = null;
    _readyToShow = false;
    _measuredMaxHeight = null;
    _flagToDisplay = null;
    wdprValueChanged;
    wdprSelectionChange;
    handleValueChanged() {
        this._applyValue();
    }
    handleExpandedChange(newValue) {
        if (!newValue) {
            this._activeDescendantId = undefined;
            this._setFocusIndex(null);
        }
    }
    handleMaxViewableItemsChange() {
        requestAnimationFrame(() => {
            this._measureItemHeights();
        });
    }
    handleInputValueChange() {
        clearTimeout(this._measureDebounceTimer);
        this._measureDebounceTimer = setTimeout(() => {
            this._applyFilter();
            requestAnimationFrame(() => this._measureItemHeights());
        }, 100);
    }
    updateSelectedValue() {
        this._syncSelectionItemsState();
        this._applyFilter();
        this._updateFormValue();
        this._setSelectedFlag();
    }
    formPropsChanged() {
        this._updateFormValue();
    }
    handleItemSelect(event) {
        event.stopPropagation();
        this._updateSelection(event.detail);
        this._closeDropdown();
    }
    handleClickOutside(event) {
        if (this._expanded && this.el && !event.composedPath().includes(this.el)) {
            this._closeDropdown();
        }
    }
    handleResetForm() {
        this._updateFormValue();
    }
    componentWillLoad() {
        this._listId = `wdpr-country-code-list-${generateRandId()}`;
        this._textFieldId = `wdpr-country-code-input-${generateRandId()}`;
        this._updateFormValue();
    }
    componentDidLoad() {
        requestAnimationFrame(() => {
            this._invalidateItemsCache();
            this._applyValue();
            this._measureItemHeights();
            if (this._listEl) {
                this._slotObserver.observe(this._listEl, { childList: true, subtree: true });
            }
        });
        this._slotObserver = new MutationObserver(mutations => {
            const nodes = mutations.flatMap(m => Array.from(m.addedNodes)).filter((n) => n.nodeType === Node.ELEMENT_NODE);
            if (nodes.length === 0)
                return;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Promise.all(nodes.map(el => ('componentOnReady' in el ? el.componentOnReady() : Promise.resolve()))).then(() => {
                this._invalidateItemsCache();
                if (this.value && !this._selectedValue) {
                    this._applyValue();
                }
                this._measureItemHeights();
            });
        });
    }
    connectedCallback() {
        this.internals?.form?.addEventListener('reset', this._handleFormReset);
    }
    disconnectedCallback() {
        this.internals?.form?.removeEventListener('reset', this._handleFormReset);
        this._slotObserver?.disconnect();
    }
    _getAllListItems() {
        if (!this._cachedItems?.length) {
            this._cachedItems = Array.from(this.el.querySelectorAll('wdpr-country-code-item'));
        }
        return this._cachedItems;
    }
    _invalidateItemsCache() {
        this._cachedItems = null;
    }
    _getAllVisibleItems() {
        return this._getAllListItems().filter(item => !item.isHidden);
    }
    _applyValue() {
        const allItems = this._getAllListItems();
        if (!this.value) {
            this._selectedValue = null;
            this._inputValue = '';
            return;
        }
        const matchedItem = allItems.find(item => !item.disabled && (item.label === this.value || item.callingCode === this.value));
        if (matchedItem) {
            this._selectedValue = { value: matchedItem.value, label: matchedItem.label, id: matchedItem.id, isoCode: matchedItem.isoCode, callingCode: matchedItem.callingCode };
            this._setInputFromLabel(matchedItem.label, matchedItem.callingCode);
        }
        else {
            this._selectedValue = null;
            this._inputValue = this.value;
        }
        this._defaultSelectedId = this._selectedValue?.id ?? null;
    }
    _applyFilter() {
        const items = this._getAllListItems();
        if (!items.length)
            return;
        const visibleItems = [];
        items.forEach(item => {
            const matches = itemMatchesFilter(item, this._inputValue);
            item.isHidden = !matches;
            if (matches)
                visibleItems.push(item);
        });
    }
    _updateSelection(item) {
        const { selected, value, label, id, isoCode, callingCode } = item;
        if (selected) {
            this._selectedValue = { value, label, id, isoCode, callingCode };
            this._setInputFromLabel(label, callingCode);
        }
        else {
            this._selectedValue = null;
            this._clearInput();
        }
        this.wdprSelectionChange.emit({ selectedValue: this._selectedValue });
        this.wdprValueChanged.emit(this._inputValue);
    }
    _syncSelectionItemsState() {
        this._getAllListItems().forEach(item => {
            item.selected = this._selectedValue?.id === item.id;
        });
    }
    _setInputFromLabel(label, code) {
        this._inputValue = this.showCountryCodeOnly ? code : `${code} ${label}`;
    }
    _clearInput() {
        this._inputValue = '';
    }
    _closeDropdown() {
        this._expanded = false;
        if (this._selectedValue) {
            this._setInputFromLabel(this._selectedValue.label, this._selectedValue.callingCode);
        }
    }
    _updateFormValue() {
        const selectedValue = this._selectedValue?.value || '';
        const shouldSubmit = !this.disabled && !!this.name && !!selectedValue;
        this.internals?.setFormValue?.(shouldSubmit ? selectedValue : null);
        this._updateValidity();
    }
    _updateValidity() {
        if (this.disabled || !this.required) {
            this.internals?.setValidity?.({});
            return;
        }
        if (!this._selectedValue?.value) {
            this.internals?.setValidity?.({ valueMissing: true }, 'This field is required');
            return;
        }
        this.internals?.setValidity?.({});
    }
    _focusItemAtIndex(index, items) {
        this._setFocusIndex(index);
        this._activeDescendantId = items[index]?.id ?? undefined;
        const focusedItem = items[index];
        if (focusedItem) {
            const listbox = this.el?.querySelector('.listbox');
            if (listbox) {
                focusedItem.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }
        }
    }
    _setFocusIndex(index) {
        this._getAllListItems().forEach((item, i) => {
            item.isFocused = i === index;
        });
        this._focusedIndex = index == null ? -1 : index;
    }
    _measureItemHeights() {
        this._readyToShow = false;
        if (this.maxViewableItems == null || this.maxViewableItems <= 0) {
            this._measuredMaxHeight = null;
            this._readyToShow = true;
            return;
        }
        const visibleItems = this._getAllVisibleItems();
        const listbox = this.el?.querySelector('.listbox');
        if (!listbox || visibleItems.length === 0) {
            this._readyToShow = true;
            return;
        }
        if (visibleItems.length <= this.maxViewableItems) {
            this._measuredMaxHeight = null;
            this._readyToShow = true;
            return;
        }
        const targetItem = visibleItems[this.maxViewableItems - 1];
        const wrapperRect = listbox.getBoundingClientRect();
        const itemRect = targetItem.getBoundingClientRect();
        let calculatedHeight = Math.ceil(itemRect.bottom - wrapperRect.top);
        const style = window.getComputedStyle(listbox);
        calculatedHeight += parseFloat(style.paddingBottom) || 0;
        this._measuredMaxHeight = `${calculatedHeight}px`;
        this._readyToShow = true;
    }
    _handleFormReset = () => {
        if (this._defaultSelectedId) {
            const defaultItem = this._getAllListItems().find(i => i.id === this._defaultSelectedId);
            if (defaultItem) {
                this._selectedValue = { value: defaultItem.value, label: defaultItem.label, id: defaultItem.id, isoCode: defaultItem.isoCode, callingCode: defaultItem.callingCode };
                this._setInputFromLabel(defaultItem.label, defaultItem.callingCode);
                this._updateFormValue();
                return;
            }
        }
        this._selectedValue = null;
        this._clearInput();
        this._updateFormValue();
    };
    _handleKeydown = (ev) => {
        if (this.disabled)
            return;
        const items = this._getAllListItems();
        if (!items.length)
            return;
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
                this._focusItemAtIndex(getInitialFocusIndex(items, 'down'), items);
                return;
            }
            this._focusItemAtIndex(findNextEnabledIndex(items, this._focusedIndex, 'down'), items);
        }
        if (ev.key === KEYBOARD_KEYS.ARROW_UP) {
            ev.preventDefault();
            if (!this._expanded) {
                this._expanded = true;
                this._focusItemAtIndex(getInitialFocusIndex(items, 'up'), items);
                return;
            }
            this._focusItemAtIndex(findNextEnabledIndex(items, this._focusedIndex, 'up'), items);
        }
        if (ev.key === KEYBOARD_KEYS.ESCAPE || ev.key === KEYBOARD_KEYS.TAB) {
            this._closeDropdown();
        }
    };
    _handleInput = (event) => {
        event.stopPropagation();
        const value = event.target.value;
        this._inputValue = value;
        if (this._selectedValue) {
            this._selectedValue = null;
            this.wdprSelectionChange.emit({ selectedValue: null });
            this._updateFormValue();
        }
        if (!this._expanded)
            this._expanded = true;
        this.wdprValueChanged.emit(value);
    };
    _handleWrapperClick = () => {
        if (this.disabled)
            return;
        if (!this._expanded)
            this._expanded = true;
    };
    _handleArrowClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (this.disabled)
            return;
        this._expanded = !this._expanded;
    };
    _setSelectedFlag() {
        if (!this._selectedValue) {
            this._flagToDisplay = null;
            return;
        }
        const item = this._getAllListItems().find(i => i.id === this._selectedValue.id);
        const isWindows = typeof window !== 'undefined' && navigator.userAgent.includes('Windows');
        if (item && item.isoCode) {
            if (isWindows && FLAG_SVGS[item.isoCode]) {
                this._flagToDisplay = FLAG_SVGS[item.isoCode];
            }
            else {
                this._flagToDisplay = this._countryCodeToFlag(item.isoCode);
            }
        }
    }
    _countryCodeToFlag(isoCode) {
        if (!isoCode || isoCode.length !== 2)
            return '';
        const codePoints = isoCode
            .toUpperCase()
            .split('')
            .map(char => 0x1f1e6 + char.charCodeAt(0) - 65);
        return String.fromCodePoint(...codePoints);
    }
    _renderFlagDisplay() {
        if (!this._flagToDisplay) {
            return (h("span", { class: "country-code-empty-flag", "aria-hidden": "true" }, "--"));
        }
        if (this._flagToDisplay.startsWith('<svg')) {
            return h("span", { class: "country-code-flag-svg", "aria-hidden": "true", innerHTML: this._flagToDisplay });
        }
        return (h("span", { class: "country-code-flag", "aria-hidden": "true" }, this._flagToDisplay));
    }
    _renderCombobox() {
        return (h(Fragment, null, h("div", { class: "country-code-wrapper" }, h("div", { class: "country-code-container" }, h("div", { class: "country-code-flag-wrapper" }, this._renderFlagDisplay()), h("div", { class: "country-code-divider" }, h("wdpr-divider", { orientation: "vertical" })), h("div", { class: "country-code-input-wrapper" }, h("input", { id: this._textFieldId, type: "text", class: "input", value: this._inputValue, placeholder: this.label, disabled: this.disabled, onClick: this._handleWrapperClick, onInput: this._handleInput, onKeyDown: this._handleKeydown, autocomplete: "off", role: "combobox", "aria-autocomplete": "list", "aria-expanded": this._expanded.toString(), "aria-invalid": this.error.toString(), "aria-controls": this._listId, "aria-haspopup": "listbox", "aria-activedescendant": this._activeDescendantId || undefined, "aria-required": this.required.toString(), "aria-describedby": this.helperText ? `${this._textFieldId}-helper-text` : undefined, "aria-label": this.label })), h("div", { class: "icon-wrapper" }, h("wdpr-icon-button", { iconName: this._getIconName(), disabled: this.disabled, a11yLabel: this._getIconButtonAriaLabel(), onClick: this._handleArrowClick })))), this._renderInlineMessage()));
    }
    _renderInlineMessage() {
        return (this.helperText && (h("div", { class: "inline-message-wrapper" }, h("wdpr-inline-message", { id: `${this._textFieldId}-helper-text`, variant: this.error ? 'error' : 'informational', size: "small", role: "status" }, this.helperText))));
    }
    _renderList() {
        return (h("div", { ref: el => (this._listEl = el), class: "listbox", role: "listbox", id: this._listId, "aria-label": this.label }, h("slot", null)));
    }
    _renderListWrapper() {
        const visibilityClass = this._isListVisible ? 'country-code-list-container-visible' : 'country-code-list-container-invisible';
        return (h("div", { class: `country-code-list-container ${visibilityClass}`, style: { height: this._measuredMaxHeight } }, this._renderList()));
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
    _getIconName() {
        return this._expanded ? 'expand-show-less' : 'expand-show-more';
    }
    _getIconButtonAriaLabel() {
        const closedLabel = 'Open list';
        const openLabel = 'Close list';
        return this._expanded ? openLabel : closedLabel;
    }
    get _isListVisible() {
        return this._readyToShow && this._expanded && !this.isLoading && this._getAllListItems().length > 0 && !this.isErrorLoading;
    }
    render() {
        return (h(Host, { key: '55aaa1987a6d9bc6d62639b387a9b79a3ca3a4e9' }, this._renderCombobox(), this._renderListWrapper(), this._renderStatusMessage()));
    }
    static get is() { return "wdpr-country-code"; }
    static get encapsulation() { return "scoped"; }
    static get formAssociated() { return true; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-country-code.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-country-code.css"]
        };
    }
    static get properties() {
        return {
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
            "location": {
                "type": "string",
                "attribute": "location",
                "mutable": false,
                "complexType": {
                    "original": "CountryCodeLocation",
                    "resolved": "\"above\" | \"below\"",
                    "references": {
                        "CountryCodeLocation": {
                            "location": "import",
                            "path": "./wdpr-country-code.model",
                            "id": "src/components/wdpr-country-code/wdpr-country-code.model.ts::CountryCodeLocation"
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
            "showCountryCodeOnly": {
                "type": "boolean",
                "attribute": "show-country-code-only",
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
            "_inputValue": {},
            "_focusedIndex": {},
            "_activeDescendantId": {},
            "_selectedValue": {},
            "_readyToShow": {},
            "_measuredMaxHeight": {},
            "_flagToDisplay": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprValueChanged",
                "name": "wdprValueChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
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
                    "original": "{ selectedValue: CountryCodeValueItem | null }",
                    "resolved": "{ selectedValue: CountryCodeValueItem; }",
                    "references": {
                        "CountryCodeValueItem": {
                            "location": "import",
                            "path": "./wdpr-country-code.model",
                            "id": "src/components/wdpr-country-code/wdpr-country-code.model.ts::CountryCodeValueItem"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "handleValueChanged"
            }, {
                "propName": "_expanded",
                "methodName": "handleExpandedChange"
            }, {
                "propName": "maxViewableItems",
                "methodName": "handleMaxViewableItemsChange"
            }, {
                "propName": "_inputValue",
                "methodName": "handleInputValueChange"
            }, {
                "propName": "_selectedValue",
                "methodName": "updateSelectedValue"
            }, {
                "propName": "name",
                "methodName": "formPropsChanged"
            }, {
                "propName": "required",
                "methodName": "formPropsChanged"
            }, {
                "propName": "disabled",
                "methodName": "formPropsChanged"
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
            }, {
                "name": "resetform",
                "method": "handleResetForm",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=wdpr-country-code.js.map
