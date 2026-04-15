import { r as registerInstance, c as createEvent, a as getElement, h, H as Host } from './index-CykM8GCN.js';
import { g as generateRandId, c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const wdprCountryCodeItemCss = ":host(.hidden){display:none}";

const WdprCountryCodeItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprSelect = createEvent(this, "wdprSelect", 7);
    }
    _internalId;
    get el() { return getElement(this); }
    itemId;
    value;
    label;
    callingCode;
    isoCode;
    disabled = false;
    selected = false;
    isFocused = false;
    isHidden = false;
    wdprSelect;
    componentWillLoad() {
        this._internalId = this.itemId || `wdpr-country-code-item-${generateRandId()}`;
    }
    _handleSelection() {
        if (this.disabled)
            return;
        this.wdprSelect.emit({ value: this.value, label: this.label, selected: !this.selected, id: this._internalId, isoCode: this.isoCode, callingCode: this.callingCode });
    }
    get _itemClasses() {
        return customTwMerge(baseClasses, this.selected ? selectedClasses : unselectedClasses, this.isFocused && focusedClasses, this.disabled && disabledClasses, !this.disabled && enabledClasses);
    }
    render() {
        return (h(Host, { key: '6503978c5e079902074301841281541c3e7e0c5d', id: this._internalId, role: "option", "aria-selected": this.selected.toString(), "aria-disabled": this.disabled.toString(), onClick: () => this._handleSelection(), class: `${this.isHidden ? 'hidden' : ''}` }, h("div", { key: 'b5d7e308fe247191dbfd83f3e3e73bcb81c36c1e', class: this._itemClasses }, this.label && (h("span", { key: 'dc7b7b6d07cef9c38e91b4c9af903363a2abcd90', class: "body-large text-start line-clamp-2" }, this.callingCode, " ", this.label)))));
    }
};
const baseClasses = 'item flex items-center gap-100 p-100 w-full rounded-100 cursor-pointer transition-colors bg-surface-transparent text-text-actionable-alt-default';
const focusedClasses = 'outline-037 outline-solid outline-offset-1 outline-stroke-actionable-alt-focused';
const disabledClasses = 'bg-color-surface-transparent text-text-actionable-alt-disabled cursor-not-allowed';
const unselectedClasses = 'bg-surface-transparent text-text-actionable-alt-default';
const selectedClasses = 'bg-surface-actionable-alt-pressed text-text-actionable-inverse-default';
const enabledClasses = `hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
active:bg-surface-actionable-alt-pressed active:text-text-actionable-inverse-default`;
WdprCountryCodeItem.style = wdprCountryCodeItemCss;

export { WdprCountryCodeItem as wdpr_country_code_item };
//# sourceMappingURL=wdpr-country-code-item.entry.js.map

//# sourceMappingURL=wdpr-country-code-item.entry.js.map