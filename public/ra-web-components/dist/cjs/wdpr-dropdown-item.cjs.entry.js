'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprDropdownItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprSelect = index.createEvent(this, "wdprSelect", 7);
    }
    _internalId;
    get el() { return index.getElement(this); }
    _hideDivider = false;
    itemId;
    value;
    label;
    description;
    disabled = false;
    selected = false;
    mode = 'single';
    isFocused = false;
    wdprSelect;
    componentWillLoad() {
        this._internalId = this.itemId || `wdpr-dropdown-item-${utils.generateRandId()}`;
    }
    async hideDivider() {
        this._hideDivider = true;
    }
    _handleSelection() {
        if (this.disabled)
            return;
        this.wdprSelect.emit({ value: this.value, label: this.label, selected: !this.selected, id: this._internalId });
    }
    _handleMultipleCheckboxChange = (event) => {
        event.stopPropagation();
        if (this.disabled)
            return;
        this.wdprSelect.emit({
            value: this.value,
            label: this.label,
            selected: event.detail.checked,
            id: this._internalId,
        });
    };
    _suppressCheckboxClickBubble = (event) => {
        event.stopPropagation();
    };
    _renderVariant() {
        if (this.mode === 'single') {
            return (index.h(index.Fragment, null, index.h("div", { class: this._singleSelectionClasses }, index.h("slot", { name: "icon" }), index.h("div", { class: "flex flex-col gap-050 items-start" }, this.label && index.h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && index.h("span", { class: "body-small text-start line-clamp-2" }, this.description))), !this._hideDivider && (index.h("div", { class: "mx-100", "aria-hidden": "true" }, index.h("wdpr-divider", null)))));
        }
        if (this.mode === 'multiple') {
            return (index.h(index.Fragment, null, index.h("div", { class: this._multipleSelectionClasses }, index.h("wdpr-checkbox", { checked: this.selected, disabled: this.disabled, labelPosition: "none", customTabindex: -1, onWdprChange: this._handleMultipleCheckboxChange, onClick: this._suppressCheckboxClickBubble }), index.h("div", { class: "flex flex-col gap-050 items-start" }, this.label && index.h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && index.h("span", { class: "body-small text-start line-clamp-2" }, this.description))), !this._hideDivider && (index.h("div", { class: "mx-100", "aria-hidden": "true" }, index.h("wdpr-divider", null)))));
        }
    }
    get _singleSelectionClasses() {
        return utils.customTwMerge(itemClasses, this.selected ? singleItemSelectedClasses : singleItemUnselectedBaseClasses, this.isFocused && itemFocusedClasses, this.disabled && itemDisabledClasses, !this.disabled && singleItemEnabledClasses);
    }
    get _multipleSelectionClasses() {
        return utils.customTwMerge(itemClasses, singleItemUnselectedBaseClasses, this.isFocused && itemFocusedClasses, this.disabled && itemDisabledClasses, !this.disabled && multipleItemEnabledClasses);
    }
    render() {
        return (index.h(index.Host, { key: '166a49c987d1a0e88d1d31d5a0b0f1753701eb84', id: this._internalId, role: "option", "data-dropdown-item": true, "aria-selected": this.selected.toString(), "aria-disabled": this.disabled.toString(), onClick: () => this._handleSelection() }, this._renderVariant()));
    }
};
const itemClasses = `item flex items-start gap-100 p-100 w-full rounded-100 cursor-pointer transition-colors bg-surface-transparent text-text-actionable-alt-default`;
const itemFocusedClasses = `outline-037 outline-solid outline-offset-1 outline-stroke-actionable-alt-focused`;
const itemDisabledClasses = 'bg-color-surface-transparent text-text-actionable-alt-disabled cursor-not-allowed';
const singleItemUnselectedBaseClasses = `bg-surface-transparent text-text-actionable-alt-default`;
const singleItemSelectedClasses = `bg-surface-actionable-alt-pressed text-text-actionable-inverse-default`;
const singleItemEnabledClasses = `hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
active:bg-surface-actionable-alt-pressed active:text-text-actionable-inverse-default`;
const multipleItemEnabledClasses = ` hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
  active:bg-surface-actionable-alt-pressed active:text-text-actionable-inverse-default`;

exports.wdpr_dropdown_item = WdprDropdownItem;
//# sourceMappingURL=wdpr-dropdown-item.entry.cjs.js.map

//# sourceMappingURL=wdpr-dropdown-item.cjs.entry.js.map