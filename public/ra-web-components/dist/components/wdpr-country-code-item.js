import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-BRIGwGQo.js';
import { g as generateRandId, c as customTwMerge } from './p-CXZGMLMW.js';

const wdprCountryCodeItemCss = ":host(.hidden){display:none}";

const WdprCountryCodeItem$1 = /*@__PURE__*/ proxyCustomElement(class WdprCountryCodeItem extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprSelect = createEvent(this, "wdprSelect", 7);
    }
    _internalId;
    get el() { return this; }
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
    static get style() { return wdprCountryCodeItemCss; }
}, [257, "wdpr-country-code-item", {
        "itemId": [1, "item-id"],
        "value": [1],
        "label": [1],
        "callingCode": [1, "calling-code"],
        "isoCode": [1, "iso-code"],
        "disabled": [516],
        "selected": [516],
        "isFocused": [4, "is-focused"],
        "isHidden": [4, "is-hidden"]
    }]);
const baseClasses = 'item flex items-center gap-100 p-100 w-full rounded-100 cursor-pointer transition-colors bg-surface-transparent text-text-actionable-alt-default';
const focusedClasses = 'outline-037 outline-solid outline-offset-1 outline-stroke-actionable-alt-focused';
const disabledClasses = 'bg-color-surface-transparent text-text-actionable-alt-disabled cursor-not-allowed';
const unselectedClasses = 'bg-surface-transparent text-text-actionable-alt-default';
const selectedClasses = 'bg-surface-actionable-alt-pressed text-text-actionable-inverse-default';
const enabledClasses = `hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
active:bg-surface-actionable-alt-pressed active:text-text-actionable-inverse-default`;
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-country-code-item"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-country-code-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCountryCodeItem$1);
            }
            break;
    } });
}

const WdprCountryCodeItem = WdprCountryCodeItem$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCountryCodeItem, defineCustomElement };
//# sourceMappingURL=wdpr-country-code-item.js.map

//# sourceMappingURL=wdpr-country-code-item.js.map