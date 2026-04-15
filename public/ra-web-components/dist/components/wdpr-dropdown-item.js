import { p as proxyCustomElement, H, c as createEvent, h, F as Fragment, d as Host } from './p-BRIGwGQo.js';
import { g as generateRandId, c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$6 } from './p-DTaaOZwt.js';
import { d as defineCustomElement$5 } from './p-QL-JXwKm.js';
import { d as defineCustomElement$4 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$3 } from './p-_QubyXiP.js';
import { d as defineCustomElement$2 } from './p-DsPXJJ-e.js';

const WdprDropdownItem$1 = /*@__PURE__*/ proxyCustomElement(class WdprDropdownItem extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprSelect = createEvent(this, "wdprSelect", 7);
    }
    _internalId;
    get el() { return this; }
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
        this._internalId = this.itemId || `wdpr-dropdown-item-${generateRandId()}`;
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
            return (h(Fragment, null, h("div", { class: this._singleSelectionClasses }, h("slot", { name: "icon" }), h("div", { class: "flex flex-col gap-050 items-start" }, this.label && h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && h("span", { class: "body-small text-start line-clamp-2" }, this.description))), !this._hideDivider && (h("div", { class: "mx-100", "aria-hidden": "true" }, h("wdpr-divider", null)))));
        }
        if (this.mode === 'multiple') {
            return (h(Fragment, null, h("div", { class: this._multipleSelectionClasses }, h("wdpr-checkbox", { checked: this.selected, disabled: this.disabled, labelPosition: "none", customTabindex: -1, onWdprChange: this._handleMultipleCheckboxChange, onClick: this._suppressCheckboxClickBubble }), h("div", { class: "flex flex-col gap-050 items-start" }, this.label && h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && h("span", { class: "body-small text-start line-clamp-2" }, this.description))), !this._hideDivider && (h("div", { class: "mx-100", "aria-hidden": "true" }, h("wdpr-divider", null)))));
        }
    }
    get _singleSelectionClasses() {
        return customTwMerge(itemClasses, this.selected ? singleItemSelectedClasses : singleItemUnselectedBaseClasses, this.isFocused && itemFocusedClasses, this.disabled && itemDisabledClasses, !this.disabled && singleItemEnabledClasses);
    }
    get _multipleSelectionClasses() {
        return customTwMerge(itemClasses, singleItemUnselectedBaseClasses, this.isFocused && itemFocusedClasses, this.disabled && itemDisabledClasses, !this.disabled && multipleItemEnabledClasses);
    }
    render() {
        return (h(Host, { key: '166a49c987d1a0e88d1d31d5a0b0f1753701eb84', id: this._internalId, role: "option", "data-dropdown-item": true, "aria-selected": this.selected.toString(), "aria-disabled": this.disabled.toString(), onClick: () => this._handleSelection() }, this._renderVariant()));
    }
}, [257, "wdpr-dropdown-item", {
        "itemId": [1, "item-id"],
        "value": [1],
        "label": [1],
        "description": [1],
        "disabled": [516],
        "selected": [516],
        "mode": [513],
        "isFocused": [4, "is-focused"],
        "_hideDivider": [32],
        "hideDivider": [64]
    }]);
const itemClasses = `item flex items-start gap-100 p-100 w-full rounded-100 cursor-pointer transition-colors bg-surface-transparent text-text-actionable-alt-default`;
const itemFocusedClasses = `outline-037 outline-solid outline-offset-1 outline-stroke-actionable-alt-focused`;
const itemDisabledClasses = 'bg-color-surface-transparent text-text-actionable-alt-disabled cursor-not-allowed';
const singleItemUnselectedBaseClasses = `bg-surface-transparent text-text-actionable-alt-default`;
const singleItemSelectedClasses = `bg-surface-actionable-alt-pressed text-text-actionable-inverse-default`;
const singleItemEnabledClasses = `hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
active:bg-surface-actionable-alt-pressed active:text-text-actionable-inverse-default`;
const multipleItemEnabledClasses = ` hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
  active:bg-surface-actionable-alt-pressed active:text-text-actionable-inverse-default`;
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-dropdown-item", "wdpr-checkbox", "wdpr-divider", "wdpr-icon-library", "wdpr-inline-message", "wdpr-status-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-dropdown-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprDropdownItem$1);
            }
            break;
        case "wdpr-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "wdpr-divider":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-inline-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-status-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprDropdownItem = WdprDropdownItem$1;
const defineCustomElement = defineCustomElement$1;

export { WdprDropdownItem, defineCustomElement };
//# sourceMappingURL=wdpr-dropdown-item.js.map

//# sourceMappingURL=wdpr-dropdown-item.js.map