'use strict';

var index = require('./index-4gPM_TYz.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
var utils = require('./utils-CARbI7sq.js');
var navItemLink = require('./nav-item-link-DTiQV5Qm.js');
require('./bundle-cjs-Cajw0YnV.js');

const getLabelClass = (colorClass, allowBoldText) => {
    return utils.customTwMerge(labelBaseClass, allowBoldText ? labelBoldClass : labelDefaultClass, colorClass);
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
        index.registerInstance(this, hostRef);
        this.wdprNavItemLargeClick = index.createEvent(this, "wdprNavItemLargeClick", 7);
    }
    get el() { return index.getElement(this); }
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
        this._internalId = this.itemId || `wdpr-nav-item-large-${utils.generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == keycodes_model.KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
            return;
        }
        if (this._isNavLink) {
            return;
        }
        if (ev.key == keycodes_model.KEYBOARD_KEYS.ENTER || ev.key == keycodes_model.KEYBOARD_KEYS.SPACE) {
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
        return utils.customTwMerge(containerBaseClass, this.inverse ? 'focus-visible:outline-stroke-inverse' : '');
    }
    get _isNavLink() {
        return Boolean(this.href?.trim()) && !this.disabled;
    }
    get _anchorClass() {
        return utils.customTwMerge(this._containerClass, 'no-underline');
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
            return (index.h("a", { class: this._anchorClass, href: this.href.trim(), id: this._internalId, "aria-current": this.selected ? 'page' : undefined, target: this.target, rel: navItemLink.getNavItemLinkRel(this.target, this.rel), onClick: this._onLinkClick }, index.h("span", { class: this._labelClass }, this.label)));
        }
        return (index.h("div", { class: this._containerClass, tabIndex: this.disabled ? -1 : 0, role: "button", "aria-pressed": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : 'false', id: this._internalId, onClick: this._itemClick.bind(this) }, index.h("span", { class: this._labelClass }, this.label)));
    }
};

exports.wdpr_nav_item_large = WdprNavItemLarge;
//# sourceMappingURL=wdpr-nav-item-large.entry.cjs.js.map

//# sourceMappingURL=wdpr-nav-item-large.cjs.entry.js.map