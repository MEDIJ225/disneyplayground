import { p as proxyCustomElement, H, c as createEvent, h, F as Fragment } from './p-BRIGwGQo.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { c as customTwMerge, g as generateRandId } from './p-CXZGMLMW.js';
import { g as getNavItemLinkRel } from './p-DNQAvgKe.js';

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
        return customTwMerge(containerBaseClass, isInverse ? inverseDisabledClass : disabledClass, isInverse ? inverseOutlineClass : '');
    }
    if (isInverse) {
        return customTwMerge(containerBaseClass, inverseClass, inverseOutlineClass);
    }
    return customTwMerge(containerBaseClass, defaultClass);
};
const getLabelClass = (customLabelClass, allowBoldText) => {
    return customTwMerge(labelBaseClass, allowBoldText ? labelBoldClass : labelDefaultClass, customLabelClass);
};
const getMediaClass = (mediaSize) => {
    return customTwMerge('overflow-hidden shrink-0', mediaSizeClassMap[mediaSize]);
};

const WdprNavItemMedium$1 = /*@__PURE__*/ proxyCustomElement(class WdprNavItemMedium extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprNavItemMediumClick = createEvent(this, "wdprNavItemMediumClick", 7);
    }
    get el() { return this; }
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
        this._internalId = this.itemId || `wdpr-nav-item-medium-${generateRandId()}`;
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
        if (ev.key === KEYBOARD_KEYS.ESCAPE) {
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
        return customTwMerge(this._containerClass, 'no-underline');
    }
    get _labelClass() {
        return customTwMerge(getLabelClass(this.customLabelClass, this.allowBoldText), this._isTwoLineClamp && '!py-0 -mt-025');
    }
    get _mediaClass() {
        return customTwMerge('self-start', this.mediaType === 'image' && getMediaClass(this.mediaSize));
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
            return (h("div", { class: this._mediaClass }, h("slot", { name: "media", onSlotchange: this._updateSlots })));
        }
        return (h("div", { class: this._mediaClass }, h("slot", { name: "media", onSlotchange: this._updateSlots })));
    }
    render() {
        const body = (h(Fragment, null, this._renderMedia(), h("div", { class: this._labelClass, ref: el => (this._labelElement = el) }, this.label)));
        if (this._isNavLink) {
            return (h("a", { class: this._anchorClass, href: this.href.trim(), id: this._internalId, "aria-label": this._accessibleLabel, target: this.target, rel: getNavItemLinkRel(this.target, this.rel), onClick: this._onLinkClick }, body));
        }
        return (h("button", { type: "button", disabled: this.disabled, class: this._containerClass, "aria-label": this._accessibleLabel, id: this._internalId, onClick: this._onClick }, body));
    }
    static get style() { return ":host([media-type='image']) ::slotted(*) {\n      display: block;\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n    }"; }
}, [257, "wdpr-nav-item-medium", {
        "mediaSize": [513, "media-size"],
        "customLabelClass": [1, "custom-label-class"],
        "allowBoldText": [516, "allow-bold-text"],
        "label": [1],
        "mediaType": [513, "media-type"],
        "disabled": [516],
        "inverse": [516],
        "itemId": [1, "item-id"],
        "a11yLabel": [1, "a11y-label"],
        "href": [513],
        "target": [513],
        "rel": [513],
        "_hasMedia": [32],
        "_internalId": [32],
        "_isTwoLineClamp": [32]
    }, [[0, "keydown", "handleKeyDown"], [0, "window:resize", "handleWindowResize"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-nav-item-medium"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-nav-item-medium":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprNavItemMedium$1);
            }
            break;
    } });
}

const WdprNavItemMedium = WdprNavItemMedium$1;
const defineCustomElement = defineCustomElement$1;

export { WdprNavItemMedium, defineCustomElement };
//# sourceMappingURL=wdpr-nav-item-medium.js.map

//# sourceMappingURL=wdpr-nav-item-medium.js.map