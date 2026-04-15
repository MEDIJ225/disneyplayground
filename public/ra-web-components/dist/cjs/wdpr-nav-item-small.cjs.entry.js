'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
var navItemLink = require('./nav-item-link-DTiQV5Qm.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
require('./bundle-cjs-Cajw0YnV.js');

const getLabelClass = (colorClass, allowBoldText) => {
    const boldClass = allowBoldText ? 'font-component-default' : 'font-component-alt';
    return utils.customTwMerge(labelBaseClass, colorClass, boldClass);
};
const getColorClass = (disabled, isInverse) => {
    const baseClass = 'text-text-actionable-alt-default group-hover:text-text-actionable-alt-hover group-active:text-text-actionable-alt-pressed';
    const disabledClass = 'text-text-actionable-alt-disabled cursor-not-allowed';
    const inverseDisabledClass = 'text-text-actionable-inverse-disabled group-hover:text-text-actionable-inverse-disabled group-active:text-text-actionable-inverse-disabled cursor-not-allowed';
    const inverseClass = 'text-text-actionable-inverse-default group-hover:text-text-actionable-inverse-hover group-active:text-text-actionable-inverse-pressed';
    if (disabled)
        return isInverse ? inverseDisabledClass : disabledClass;
    if (isInverse)
        return inverseClass;
    return baseClass;
};
const getContainerClass = (variant, isInverse) => {
    const paddingYClass = ['label-icon', 'icon-avatar-aligned'].includes(variant) ? 'pt-100 pb-075' : variant === 'avatar' ? 'pt-[4px] h-[37px]' : 'py-100';
    const inverseClass = isInverse ? 'focus-visible:outline-stroke-inverse' : '';
    return utils.customTwMerge(containerBaseClass, paddingYClass, inverseClass);
};
const labelBaseClass = 'block min-w-0 leading-component-medium-alt text-component-large tracking-default line-clamp-2';
const containerBaseClass = `
  flex justify-between rounded-050 group cursor-pointer
  border-012 border-solid border-transparent mx-025
  focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid
  focus-visible:outline-offset-[1px]
  focus-visible:outline-025
`;

const WdprNavItemSmall = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprNavItemSmallClick = index.createEvent(this, "wdprNavItemSmallClick", 7);
    }
    get el() { return index.getElement(this); }
    _internalId;
    _isTwoLineClamp = false;
    label;
    variant = 'label';
    disabled = false;
    inverse = false;
    allowBoldText = false;
    showNotificationBadge = false;
    notificationNumber = 0;
    itemId;
    a11yLabel;
    href;
    target;
    rel;
    wdprNavItemSmallClick;
    _leadingSlot;
    _trailingSlot;
    _labelElement;
    _resizeObserver;
    handleKeyDown(ev) {
        if (ev.key == keycodes_model.KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleWindowResize() {
        this._updateClampState();
    }
    componentWillLoad() {
        this._updateSlots();
        this._internalId = this.itemId || `wdpr-nav-item-small-${utils.generateRandId()}`;
    }
    componentDidLoad() {
        this._updateClampState();
        if (typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver(() => this._updateClampState());
            this._resizeObserver.observe(this.el);
            if (this._labelElement) {
                this._resizeObserver.observe(this._labelElement);
            }
        }
    }
    componentDidRender() {
        this._updateClampState();
    }
    disconnectedCallback() {
        this._resizeObserver?.disconnect();
    }
    get _labelClass() {
        return getLabelClass(this._colorClass, this.allowBoldText);
    }
    get _containerClass() {
        return getContainerClass(this.variant, this.inverse);
    }
    get _contentAlignmentClass() {
        return this._isTwoLineClamp ? 'items-start' : 'items-center';
    }
    get _colorClass() {
        return getColorClass(this.disabled, this.inverse);
    }
    get _paddingClass() {
        if (this.variant === 'label-icon' && this._isTwoLineClamp) {
            return '';
        }
        return ['label-icon', 'icon-avatar-aligned'].includes(this.variant) ? '-mt-025' : '';
    }
    get _trailingAlignmentOffsetClass() {
        return '-mt-025';
    }
    get _trailingSectionAlignmentClass() {
        return this._isTwoLineClamp ? 'self-start' : '';
    }
    get _sideAlignmentClass() {
        return this._isTwoLineClamp ? 'self-start' : '';
    }
    get labelAvatarAligned() {
        return this.variant === 'icon-avatar-aligned' ? 'px-075 ml-075' : '';
    }
    get _accessibleLabel() {
        return this.a11yLabel || this.label;
    }
    get _isNavLink() {
        return Boolean(this.href?.trim()) && !this.disabled;
    }
    get _anchorClass() {
        return utils.customTwMerge(this._containerClass, 'no-underline');
    }
    _emitClick() {
        this.wdprNavItemSmallClick.emit(this._internalId);
    }
    _onItemInteraction = (ev) => {
        ev.preventDefault();
        if (this.disabled)
            return;
        this._emitClick();
    };
    _onItemKeyDown = (ev) => {
        if (ev.key === keycodes_model.KEYBOARD_KEYS.ENTER || ev.key === keycodes_model.KEYBOARD_KEYS.SPACE) {
            this._onItemInteraction(ev);
        }
    };
    _onLinkClick = () => {
        if (this.disabled)
            return;
        this._emitClick();
    };
    _updateSlots = () => {
        this._leadingSlot = this.el.querySelector('[slot="leading-icon"]');
        this._trailingSlot = this.el.querySelector('[slot="trailing-icon"]');
    };
    _updateClampState = () => {
        if (!this._labelElement || typeof window === 'undefined')
            return;
        // keep explicit calculation to not hardcode the line height value
        const lineHeight = Number.parseFloat(window.getComputedStyle(this._labelElement).lineHeight);
        const isTwoLineClamp = this._labelElement.scrollHeight > lineHeight * 1.5;
        if (isTwoLineClamp !== this._isTwoLineClamp) {
            this._isTwoLineClamp = isTwoLineClamp;
        }
    };
    render() {
        const body = (index.h(index.Fragment, null, index.h("section", { class: `flex min-w-0 flex-1 gap-100 ${this._contentAlignmentClass}` }, this._leadingSlot && (index.h("div", { class: `shrink-0 flex items-center ${this._paddingClass} ${this.labelAvatarAligned} ${this._colorClass}` }, index.h("slot", { name: "leading-icon", onSlotchange: this._updateSlots }))), index.h("span", { class: this._labelClass, ref: el => (this._labelElement = el) }, this.label)), index.h("section", { class: `flex shrink-0 ${this._trailingSectionAlignmentClass} ${this._trailingAlignmentOffsetClass} ${this._contentAlignmentClass}` }, this.showNotificationBadge && (index.h("span", { class: `flex items-center ${this._sideAlignmentClass} px-075` }, index.h("wdpr-notification-indicator", { size: "small", number: this.notificationNumber, decorative: true }))), this._trailingSlot && (index.h("div", { class: `flex items-center ${this._sideAlignmentClass} ${this._colorClass}` }, index.h("slot", { name: "trailing-icon", onSlotchange: this._updateSlots }))))));
        if (this._isNavLink) {
            return (index.h("a", { class: this._anchorClass, href: this.href.trim(), id: this._internalId, "aria-label": this._accessibleLabel, target: this.target, rel: navItemLink.getNavItemLinkRel(this.target, this.rel), onClick: this._onLinkClick }, body));
        }
        return (index.h("div", { tabIndex: this.disabled ? -1 : 0, class: this._containerClass, id: this._internalId, role: "button", "aria-disabled": this.disabled ? 'true' : undefined, "aria-label": this._accessibleLabel, onClick: this._onItemInteraction, onKeyDown: this._onItemKeyDown }, body));
    }
};

exports.wdpr_nav_item_small = WdprNavItemSmall;
//# sourceMappingURL=wdpr-nav-item-small.entry.cjs.js.map

//# sourceMappingURL=wdpr-nav-item-small.cjs.entry.js.map