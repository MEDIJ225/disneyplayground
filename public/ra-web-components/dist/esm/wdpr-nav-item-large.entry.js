import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CykM8GCN.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import { c as customTwMerge, g as generateRandId } from './utils-B2sDCMk6.js';
import { g as getNavItemLinkRel } from './nav-item-link-DNQAvgKe.js';
import './bundle-cjs-CF3xLdU_.js';

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

const WdprNavItemLarge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprNavItemLargeClick = createEvent(this, "wdprNavItemLargeClick", 7);
    }
    get el() { return getElement(this); }
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
};

export { WdprNavItemLarge as wdpr_nav_item_large };
//# sourceMappingURL=wdpr-nav-item-large.entry.js.map

//# sourceMappingURL=wdpr-nav-item-large.entry.js.map