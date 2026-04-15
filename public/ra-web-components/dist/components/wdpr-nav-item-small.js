import { p as proxyCustomElement, H, c as createEvent, h, F as Fragment } from './p-BRIGwGQo.js';
import { c as customTwMerge, g as generateRandId } from './p-CXZGMLMW.js';
import { g as getNavItemLinkRel } from './p-DNQAvgKe.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { d as defineCustomElement$2 } from './p-BOubPl_u.js';

const getLabelClass = (colorClass, allowBoldText) => {
    const boldClass = allowBoldText ? 'font-component-default' : 'font-component-alt';
    return customTwMerge(labelBaseClass, colorClass, boldClass);
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
    return customTwMerge(containerBaseClass, paddingYClass, inverseClass);
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

const WdprNavItemSmall$1 = /*@__PURE__*/ proxyCustomElement(class WdprNavItemSmall extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprNavItemSmallClick = createEvent(this, "wdprNavItemSmallClick", 7);
    }
    get el() { return this; }
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
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleWindowResize() {
        this._updateClampState();
    }
    componentWillLoad() {
        this._updateSlots();
        this._internalId = this.itemId || `wdpr-nav-item-small-${generateRandId()}`;
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
        return customTwMerge(this._containerClass, 'no-underline');
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
        if (ev.key === KEYBOARD_KEYS.ENTER || ev.key === KEYBOARD_KEYS.SPACE) {
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
        const body = (h(Fragment, null, h("section", { class: `flex min-w-0 flex-1 gap-100 ${this._contentAlignmentClass}` }, this._leadingSlot && (h("div", { class: `shrink-0 flex items-center ${this._paddingClass} ${this.labelAvatarAligned} ${this._colorClass}` }, h("slot", { name: "leading-icon", onSlotchange: this._updateSlots }))), h("span", { class: this._labelClass, ref: el => (this._labelElement = el) }, this.label)), h("section", { class: `flex shrink-0 ${this._trailingSectionAlignmentClass} ${this._trailingAlignmentOffsetClass} ${this._contentAlignmentClass}` }, this.showNotificationBadge && (h("span", { class: `flex items-center ${this._sideAlignmentClass} px-075` }, h("wdpr-notification-indicator", { size: "small", number: this.notificationNumber, decorative: true }))), this._trailingSlot && (h("div", { class: `flex items-center ${this._sideAlignmentClass} ${this._colorClass}` }, h("slot", { name: "trailing-icon", onSlotchange: this._updateSlots }))))));
        if (this._isNavLink) {
            return (h("a", { class: this._anchorClass, href: this.href.trim(), id: this._internalId, "aria-label": this._accessibleLabel, target: this.target, rel: getNavItemLinkRel(this.target, this.rel), onClick: this._onLinkClick }, body));
        }
        return (h("div", { tabIndex: this.disabled ? -1 : 0, class: this._containerClass, id: this._internalId, role: "button", "aria-disabled": this.disabled ? 'true' : undefined, "aria-label": this._accessibleLabel, onClick: this._onItemInteraction, onKeyDown: this._onItemKeyDown }, body));
    }
}, [257, "wdpr-nav-item-small", {
        "label": [1],
        "variant": [513],
        "disabled": [516],
        "inverse": [516],
        "allowBoldText": [516, "allow-bold-text"],
        "showNotificationBadge": [516, "show-notification-badge"],
        "notificationNumber": [2, "notification-number"],
        "itemId": [1, "item-id"],
        "a11yLabel": [1, "a11y-label"],
        "href": [513],
        "target": [513],
        "rel": [513],
        "_internalId": [32],
        "_isTwoLineClamp": [32]
    }, [[0, "keydown", "handleKeyDown"], [0, "window:resize", "handleWindowResize"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-nav-item-small", "wdpr-notification-indicator"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-nav-item-small":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprNavItemSmall$1);
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprNavItemSmall = WdprNavItemSmall$1;
const defineCustomElement = defineCustomElement$1;

export { WdprNavItemSmall, defineCustomElement };
//# sourceMappingURL=wdpr-nav-item-small.js.map

//# sourceMappingURL=wdpr-nav-item-small.js.map