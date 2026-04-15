import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { c as customTwMerge, g as generateRandId } from './p-CXZGMLMW.js';
import { g as getNavItemLinkRel } from './p-DNQAvgKe.js';

const getLabelClass = (colorClass, allowBoldText) => {
    return customTwMerge(labelBaseClass, allowBoldText ? labelBoldClass : labelDefaultClass, colorClass);
};
const getColorClass = (disabled, isInverse) => {
    const baseClass = 'text-text-actionable-alt-default hover:text-text-actionable-alt-hover active:text-text-actionable-alt-pressed';
    const disabledClass = 'text-text-actionable-alt-disabled cursor-not-allowed';
    const inverseDisabledClass = 'text-text-actionable-inverse-disabled hover:text-text-actionable-inverse-disabled active:text-text-actionable-inverse-disabled cursor-not-allowed';
    const inverseClass = 'text-text-actionable-inverse-default hover:text-text-actionable-inverse-hover active:text-text-actionable-inverse-pressed';
    if (disabled)
        return isInverse ? inverseDisabledClass : disabledClass;
    if (isInverse)
        return inverseClass;
    return baseClass;
};
const labelBaseClass = 'leading-[24px] text-[20px] tracking-05 px-025 py-100';
const labelDefaultClass = 'font-heading-alt';
const labelBoldClass = 'font-heading-default';
const containerBaseClass = `
  flex items-center justify-between rounded-075 h-full group cursor-pointer
  border-012 border-solid border-transparent
  focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid
  focus-visible:outline-offset-[1px]
  focus-visible:outline-025
`;

const WdprNavItemLarge$1 = /*@__PURE__*/ proxyCustomElement(class WdprNavItemLarge extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprNavItemLargeClick = createEvent(this, "wdprNavItemLargeClick", 7);
    }
    get el() { return this; }
    _internalId;
    label;
    disabled = false;
    inverse = false;
    allowBoldText = false;
    selected = false;
    itemId;
    href;
    target;
    rel;
    wdprNavItemLargeClick;
    componentWillLoad() {
        this._internalId = this.itemId || `wdpr-nav-item-large-${generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
            return;
        }
        if (this._isNavLink) {
            return;
        }
        if (ev.key == KEYBOARD_KEYS.ENTER || ev.key == KEYBOARD_KEYS.SPACE) {
            ev.preventDefault();
            this._itemClick();
        }
    }
    get _labelClass() {
        return getLabelClass(this._colorClass, this.allowBoldText);
    }
    get _colorClass() {
        return getColorClass(this.disabled, this.inverse);
    }
    get _containerClass() {
        return customTwMerge(containerBaseClass, this.inverse ? 'focus-visible:outline-stroke-inverse' : '');
    }
    get _isNavLink() {
        return Boolean(this.href?.trim()) && !this.disabled;
    }
    get _anchorClass() {
        return customTwMerge(this._containerClass, 'no-underline');
    }
    _itemClick() {
        if (this.disabled)
            return;
        this.selected = !this.selected;
        this.wdprNavItemLargeClick.emit(this._internalId);
    }
    _onLinkClick = () => {
        if (this.disabled)
            return;
        this.wdprNavItemLargeClick.emit(this._internalId);
    };
    render() {
        if (this._isNavLink) {
            return (h("a", { class: this._anchorClass, href: this.href.trim(), id: this._internalId, "aria-current": this.selected ? 'page' : undefined, target: this.target, rel: getNavItemLinkRel(this.target, this.rel), onClick: this._onLinkClick }, h("span", { class: this._labelClass }, this.label)));
        }
        return (h("div", { class: this._containerClass, tabIndex: this.disabled ? -1 : 0, role: "button", "aria-pressed": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : 'false', id: this._internalId, onClick: this._itemClick.bind(this) }, h("span", { class: this._labelClass }, this.label)));
    }
}, [257, "wdpr-nav-item-large", {
        "label": [1],
        "disabled": [516],
        "inverse": [516],
        "allowBoldText": [516, "allow-bold-text"],
        "selected": [516],
        "itemId": [1, "item-id"],
        "href": [513],
        "target": [513],
        "rel": [513],
        "_internalId": [32]
    }, [[0, "keydown", "handleKeyDown"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-nav-item-large"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-nav-item-large":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprNavItemLarge$1);
            }
            break;
    } });
}

const WdprNavItemLarge = WdprNavItemLarge$1;
const defineCustomElement = defineCustomElement$1;

export { WdprNavItemLarge, defineCustomElement };
//# sourceMappingURL=wdpr-nav-item-large.js.map

//# sourceMappingURL=wdpr-nav-item-large.js.map