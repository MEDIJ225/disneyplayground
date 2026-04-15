'use strict';

var index = require('./index-4gPM_TYz.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
var utils = require('./utils-CARbI7sq.js');
var navItemLink = require('./nav-item-link-DTiQV5Qm.js');
require('./bundle-cjs-Cajw0YnV.js');

const containerBaseClass = `
  flex items-center gap-150 rounded-075 w-full
  border-012 border-solid
  focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid
  focus-visible:outline-offset-[1px]
  focus-visible:outline-025
`;
const defaultClass = `
  text-text-actionable-alt-default border-transparent cursor-pointer
  hover:text-text-actionable-alt-hover
  active:text-text-actionable-alt-pressed
`;
const disabledClass = 'text-text-actionable-alt-disabled border-transparent cursor-not-allowed';
const inverseDisabledClass = 'text-text-actionable-inverse-disabled border-transparent cursor-not-allowed';
const inverseClass = `
  text-text-actionable-inverse-default border-transparent cursor-pointer
  hover:text-text-actionable-inverse-hover
  active:text-text-actionable-inverse-pressed
`;
const inverseOutlineClass = 'focus-visible:outline-stroke-inverse';
const labelBaseClass = 'block min-w-0 leading-heading-small text-heading-small tracking-05 py-200 line-clamp-2';
const labelDefaultClass = 'font-heading-alt';
const labelBoldClass = 'font-heading-default';
const mediaSizeClassMap = {
    medium: 'w-[40px] h-[40px] rounded-100',
    large: 'w-[56px] h-[56px] rounded-150',
    xlarge: 'w-[64px] h-[64px] rounded-150',
};
const getContainerClass = (disabled, isInverse) => {
    if (disabled) {
        return utils.customTwMerge(containerBaseClass, isInverse ? inverseDisabledClass : disabledClass, isInverse ? inverseOutlineClass : '');
    }
    if (isInverse) {
        return utils.customTwMerge(containerBaseClass, inverseClass, inverseOutlineClass);
    }
    return utils.customTwMerge(containerBaseClass, defaultClass);
};
const getLabelClass = (customLabelClass, allowBoldText) => {
    return utils.customTwMerge(labelBaseClass, allowBoldText ? labelBoldClass : labelDefaultClass, customLabelClass);
};
const getMediaClass = (mediaSize) => {
    return utils.customTwMerge('overflow-hidden shrink-0', mediaSizeClassMap[mediaSize]);
};

const WdprNavItemMedium = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprNavItemMediumClick = index.createEvent(this, "wdprNavItemMediumClick", 7);
    }
    get el() { return index.getElement(this); }
    _hasMedia = false;
    _internalId;
    _isTwoLineClamp = false;
    /**
     * Size of the media element (only applies when mediaType is 'image')
     */
    mediaSize = 'medium';
    /**
     * Optional prop for custom label styling
     * Consistency across media types, as icons may require different label styling than images
     */
    customLabelClass = '';
    allowBoldText = false;
    label;
    mediaType = 'image';
    disabled = false;
    inverse = false;
    itemId;
    a11yLabel;
    href;
    target;
    rel;
    wdprNavItemMediumClick;
    _labelElement;
    _resizeObserver;
    componentWillLoad() {
        this._updateSlots();
        this._internalId = this.itemId || `wdpr-nav-item-medium-${utils.generateRandId()}`;
    }
    componentDidLoad() {
        this._updateClampState();
        if (typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver(() => this._updateClampState());
            this._resizeObserver.observe(this.el);
        }
    }
    disconnectedCallback() {
        this._resizeObserver?.disconnect();
    }
    handleKeyDown(ev) {
        if (ev.key === keycodes_model.KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleWindowResize() {
        this._updateClampState();
    }
    get _containerClass() {
        return getContainerClass(this.disabled, this.inverse);
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
    get _labelClass() {
        return utils.customTwMerge(getLabelClass(this.customLabelClass, this.allowBoldText), this._isTwoLineClamp && '!py-0 -mt-025');
    }
    get _mediaClass() {
        return utils.customTwMerge('self-start', this.mediaType === 'image' && getMediaClass(this.mediaSize));
    }
    _updateSlots = () => {
        const mediaSlot = this.el.querySelector('[slot="media"]');
        this._hasMedia = !!mediaSlot;
    };
    _updateClampState = () => {
        if (!this._labelElement || typeof window === 'undefined')
            return;
        const lineHeight = Number.parseFloat(window.getComputedStyle(this._labelElement).lineHeight);
        const isTwoLineClamp = this._labelElement.scrollHeight > lineHeight * 1.5;
        if (isTwoLineClamp !== this._isTwoLineClamp) {
            this._isTwoLineClamp = isTwoLineClamp;
        }
    };
    _onClick = () => {
        if (this.disabled)
            return;
        this.wdprNavItemMediumClick.emit(this._internalId);
    };
    _onLinkClick = () => {
        if (this.disabled)
            return;
        this.wdprNavItemMediumClick.emit(this._internalId);
    };
    _renderMedia() {
        if (!this._hasMedia)
            return null;
        if (this.mediaType === 'icon') {
            return (index.h("div", { class: this._mediaClass }, index.h("slot", { name: "media", onSlotchange: this._updateSlots })));
        }
        return (index.h("div", { class: this._mediaClass }, index.h("slot", { name: "media", onSlotchange: this._updateSlots })));
    }
    render() {
        const body = (index.h(index.Fragment, null, this._renderMedia(), index.h("div", { class: this._labelClass, ref: el => (this._labelElement = el) }, this.label)));
        if (this._isNavLink) {
            return (index.h("a", { class: this._anchorClass, href: this.href.trim(), id: this._internalId, "aria-label": this._accessibleLabel, target: this.target, rel: navItemLink.getNavItemLinkRel(this.target, this.rel), onClick: this._onLinkClick }, body));
        }
        return (index.h("button", { type: "button", disabled: this.disabled, class: this._containerClass, "aria-label": this._accessibleLabel, id: this._internalId, onClick: this._onClick }, body));
    }
};
WdprNavItemMedium.style = ":host([media-type='image']) ::slotted(*) {\n      display: block;\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n    }";

exports.wdpr_nav_item_medium = WdprNavItemMedium;
//# sourceMappingURL=wdpr-nav-item-medium.entry.cjs.js.map

//# sourceMappingURL=wdpr-nav-item-medium.cjs.entry.js.map