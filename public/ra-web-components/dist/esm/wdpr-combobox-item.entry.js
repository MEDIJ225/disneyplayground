import { r as registerInstance, c as createEvent, a as getElement, h, F as Fragment, H as Host } from './index-CykM8GCN.js';
import { g as generateRandId, c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const wdprComboboxItemCss = ":host(.hidden){display:none}";

const WdprComboboxItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprSelect = createEvent(this, "wdprSelect", 7);
    }
    _internalId;
    get el() { return getElement(this); }
    _hideDivider = false;
    itemId;
    value;
    label;
    description;
    disabled = false;
    selected = false;
    mode = 'single';
    isFocused = false;
    isHidden = false;
    wdprSelect;
    async hideDivider() {
        this._hideDivider = true;
    }
    async showDivider() {
        this._hideDivider = false;
    }
    componentWillLoad() {
        this._internalId = this.itemId || `wdpr-combobox-item-${generateRandId()}`;
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
            return (h(Fragment, null, h("div", { class: this._singleSelectionClasses }, h("slot", { name: "icon" }), h("div", { class: "flex flex-col gap-050 items-start" }, this.label && h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && h("span", { class: "body-small text-start line-clamp-2" }, this.description))), !this._hideDivider && (h("div", { class: "mx-100", "aria-hidden": "true" }, h("wdpr-divider", null)))));
        }
        if (this.mode === 'multiple') {
            return (h(Fragment, null, h("div", { class: this._multipleSelectionClasses }, h("wdpr-checkbox", { checked: this.selected, disabled: this.disabled, labelPosition: "none", customTabindex: -1, onWdprChange: this._handleMultipleCheckboxChange, onClick: this._suppressCheckboxClickBubble }), h("div", { class: "flex flex-col gap-050 items-start" }, this.label && h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && h("span", { class: "body-small text-start line-clamp-2" }, this.description))), !this._hideDivider && (h("div", { class: "mx-100", "aria-hidden": "true" }, h("wdpr-divider", null)))));
        }
    }
    get _singleSelectionClasses() {
        return customTwMerge(itemClasses, this.selected ? itemSelectedClasses : itemUnselectedBaseClasses, this.isFocused && itemFocusedClasses, this.disabled && itemDisabledClasses, !this.disabled && itemEnabledClasses);
    }
    get _multipleSelectionClasses() {
        return customTwMerge(itemClasses, itemUnselectedBaseClasses, this.isFocused && itemFocusedClasses, this.disabled && itemDisabledClasses, !this.disabled && multipleItemEnabledClasses);
    }
    render() {
        return (h(Host, { key: '453f316e86f398e7623d53c2902af491e2628eb5', id: this._internalId, role: "option", "data-combobox-item": true, "aria-selected": this.selected.toString(), "aria-disabled": this.disabled.toString(), onClick: () => this._handleSelection(), class: `${this.isHidden ? 'hidden' : ''}` }, this._renderVariant()));
    }
};
const itemClasses = `item flex items-start gap-100 p-100 w-full rounded-100 cursor-pointer transition-colors bg-surface-transparent text-text-actionable-alt-default`;
const itemFocusedClasses = `outline-037 outline-solid outline-offset-1 outline-stroke-actionable-alt-focused`;
const itemDisabledClasses = 'bg-color-surface-transparent text-text-actionable-alt-disabled cursor-not-allowed';
const itemUnselectedBaseClasses = `bg-surface-transparent text-text-actionable-alt-default`;
const itemSelectedClasses = `bg-surface-actionable-alt-pressed text-text-actionable-inverse-default`;
const itemEnabledClasses = `hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
active:bg-surface-actionable-alt-pressed active:text-text-actionable-inverse-default`;
const multipleItemEnabledClasses = ` hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
  active:bg-surface-actionable-alt-pressed active:text-text-actionable-inverse-default`;
WdprComboboxItem.style = wdprComboboxItemCss;

export { WdprComboboxItem as wdpr_combobox_item };
//# sourceMappingURL=wdpr-combobox-item.entry.js.map

//# sourceMappingURL=wdpr-combobox-item.entry.js.map