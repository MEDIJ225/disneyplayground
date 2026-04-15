import { r as registerInstance, c as createEvent, a as getElement, h, H as Host } from './index-CykM8GCN.js';
import { g as generateRandId, c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprChipMenuItem = class {
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
    isFocused = false;
    wdprSelect;
    componentWillLoad() {
        this._internalId = this.itemId || `wdpr-chip-menu-item-${generateRandId()}`;
    }
    async hideDivider() {
        this._hideDivider = true;
    }
    _handleSelection() {
        if (this.disabled)
            return;
        this.wdprSelect.emit({ value: this.value, label: this.label, id: this._internalId });
    }
    get _selectionClasses() {
        return customTwMerge(itemClasses, this.selected ? singleItemSelectedClasses : singleItemUnselectedBaseClasses, this.isFocused && itemFocusedClasses, this.disabled && itemDisabledClasses, !this.disabled && singleItemEnabledClasses);
    }
    render() {
        return (h(Host, { key: 'dc28c460b84a4f535d1d6ce28d6f8e971aac5c38', id: this._internalId, role: "option", "aria-selected": this.selected.toString(), "aria-disabled": this.disabled.toString(), onClick: () => this._handleSelection() }, h("div", { key: 'ec30093ce72325136d9778aba26d85e4cb1b22ad', class: this._selectionClasses }, h("slot", { key: '9a23d5fd62145e44696766dc893d4cd3c207e9c9', name: "icon" }), h("div", { key: '22eeac150834489121a72b97c3f27b45392c3e90', class: "flex flex-col gap-050 items-start" }, this.label && h("span", { key: 'ca995e2c6ce54625b991b55a244219f67e657b7c', class: "body-large text-start line-clamp-2" }, this.label), this.description && h("span", { key: 'b9c76634803e49957f71a730f27143caddd6961c', class: "body-small text-start line-clamp-2" }, this.description))), !this._hideDivider && (h("div", { key: '89d332ad6223c8d5dc1009c949fdc10b64683fa8', class: "mx-100", "aria-hidden": "true" }, h("wdpr-divider", { key: '39d4300f1d6b8dd5e5e63d2552328c2a1a735b62' })))));
    }
};
const itemClasses = `item flex items-start gap-100 p-100 w-full rounded-100 cursor-pointer transition-colors bg-surface-transparent text-text-actionable-alt-default`;
const itemFocusedClasses = `outline-037 outline-solid outline-offset-1 outline-stroke-actionable-alt-focused`;
const itemDisabledClasses = 'bg-color-surface-transparent text-text-actionable-alt-disabled cursor-not-allowed';
const singleItemUnselectedBaseClasses = `bg-surface-transparent text-text-actionable-alt-default`;
const singleItemSelectedClasses = `bg-surface-actionable-alt-pressed text-text-actionable-inverse-default`;
const singleItemEnabledClasses = `hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
active:bg-surface-actionable-alt-pressed active:text-text-actionable-inverse-default`;

export { WdprChipMenuItem as wdpr_chip_menu_item };
//# sourceMappingURL=wdpr-chip-menu-item.entry.js.map

//# sourceMappingURL=wdpr-chip-menu-item.entry.js.map