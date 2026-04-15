import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { c as customTwMerge, g as generateRandId } from './p-CXZGMLMW.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { d as defineCustomElement$2 } from './p-BOubPl_u.js';

const getLabelClass = (colorClass, allowBoldText) => {
    return customTwMerge(labelBaseClass, allowBoldText ? labelBoldClass : labelDefaultClass, colorClass);
};
const getColorClass = (disabled, selected, isInverse) => {
    const altBase = 'text-text-actionable-alt-default group-hover:text-text-actionable-alt-hover group-active:text-text-actionable-alt-pressed';
    const altDisabled = 'text-text-actionable-alt-disabled cursor-not-allowed';
    const altSelected = 'text-text-inverse';
    const inverseBase = 'text-text-actionable-inverse-default group-hover:text-text-actionable-inverse-hover group-active:text-text-actionable-inverse-pressed';
    const inverseDisabled = 'text-text-actionable-inverse-disabled group-hover:text-text-actionable-inverse-disabled group-active:text-text-actionable-inverse-disabled cursor-not-allowed';
    const inverseSelected = 'text-text-inverse group-hover:text-text-inverse group-active:text-text-inverse';
    if (disabled)
        return isInverse ? inverseDisabled : altDisabled;
    if (selected)
        return isInverse ? inverseSelected : altSelected;
    return isInverse ? inverseBase : altBase;
};
const selectedSurfaceClass = `
  bg-surface-actionable-alt-selected
  hover:bg-surface-actionable-alt-hover
  active:bg-surface-actionable-alt-pressed
`;
/** Keeps selected row visually flat on inverse (no selected/hover/pressed surface fill). */
const inverseSelectedSurfaceClass = `
  bg-transparent
  hover:bg-transparent
  active:bg-transparent
`;
const getContainerClass = (disabled, selected, isInverse) => {
    const inverseOutline = isInverse ? 'focus-visible:outline-stroke-inverse' : '';
    if (disabled || !selected) {
        return customTwMerge(containerBaseClass, inverseOutline);
    }
    if (isInverse) {
        return customTwMerge(containerBaseClass, inverseSelectedSurfaceClass, inverseOutline);
    }
    return customTwMerge(containerBaseClass, selectedSurfaceClass, inverseOutline);
};
const labelBaseClass = 'block min-w-0 leading-component-medium-alt text-component-large tracking-default line-clamp-2';
const labelDefaultClass = 'font-component-alt';
const labelBoldClass = 'font-component-default';
const containerBaseClass = `
  flex justify-between rounded-075 group cursor-pointer
  border-012 border-solid border-transparent
  px-100 py-100
  focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid
  focus-visible:outline-offset-[3px]
  focus-visible:outline-025
`;

const WdprNavItemSelectable$1 = /*@__PURE__*/ proxyCustomElement(class WdprNavItemSelectable extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprSelectChange = createEvent(this, "wdprSelectChange", 7);
    }
    get el() { return this; }
    _internalId;
    _internalSelected = false;
    _isTwoLineClamp = false;
    label;
    componentId = null;
    disabled = false;
    inverse = false;
    allowBoldText = false;
    selected;
    showNotificationBadge = false;
    notificationNumber = 0;
    itemId;
    a11yLabel;
    wdprSelectChange;
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
        this._internalId = this.componentId || `wdpr-nav-item-selectable-${generateRandId()}`;
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
        return getContainerClass(this.disabled, this._isSelected, this.inverse);
    }
    get _colorClass() {
        return getColorClass(this.disabled, this._isSelected, this.inverse);
    }
    get _contentAlignmentClass() {
        return this._isTwoLineClamp ? 'items-start' : 'items-center';
    }
    get _paddingClass() {
        return !this._isTwoLineClamp ? '-mt-025' : '';
    }
    get _trailingSectionAlignmentClass() {
        return this._isTwoLineClamp ? 'self-start' : '';
    }
    get _isSelected() {
        return this.selected !== undefined ? this.selected : this._internalSelected;
    }
    get _accessibleLabel() {
        return this.a11yLabel || this.label;
    }
    get _resolvedItemId() {
        return this.itemId || this.componentId || this._internalId;
    }
    _toggleSelectable() {
        const nextValue = !this._isSelected;
        if (this.selected === undefined) {
            this._internalSelected = nextValue;
        }
        this.wdprSelectChange.emit({
            selected: nextValue,
            itemId: this._resolvedItemId,
        });
    }
    _onItemInteraction = (ev) => {
        ev.preventDefault();
        if (this.disabled)
            return;
        this._toggleSelectable();
    };
    _onItemKeyDown = (ev) => {
        if (ev.key === KEYBOARD_KEYS.ENTER || ev.key === KEYBOARD_KEYS.SPACE) {
            this._onItemInteraction(ev);
        }
    };
    _updateSlots = () => {
        this._leadingSlot = this.el.querySelector('[slot="leading-icon"]');
        this._trailingSlot = this.el.querySelector('[slot="trailing-icon"]');
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
    render() {
        return (h("div", { key: '3e3f9c9d6ea419db39b66df123de8dd70417321d', tabIndex: this.disabled ? -1 : 0, class: this._containerClass, id: this._internalId, role: "button", "aria-disabled": this.disabled ? 'true' : undefined, "aria-pressed": this._isSelected ? 'true' : 'false', "aria-label": this._accessibleLabel, onClick: this._onItemInteraction, onKeyDown: this._onItemKeyDown }, h("section", { key: 'a588d42f29ae406ec97027b5fb23d368c142c6ba', class: `flex min-w-0 flex-1 gap-100 ${this._contentAlignmentClass}` }, this._leadingSlot && (h("div", { key: '160cf423dcf05893f7477a26d8113f4c7b4f2818', class: `flex shrink-0 ${this._contentAlignmentClass} ${this._paddingClass} ${this._colorClass}` }, h("slot", { key: '9e66da0503594597876d402fd5a955e12969e321', name: "leading-icon", onSlotchange: this._updateSlots }))), h("span", { key: 'e53a6da17cf545e79e79201c411332b4d4f8c9fb', class: this._labelClass, ref: el => (this._labelElement = el) }, this.label)), h("section", { key: 'b0493cfb472cba9553b849a6f7a2bdad47cc7f1e', class: `flex shrink-0 ${this._trailingSectionAlignmentClass} ${this._paddingClass} ${this._contentAlignmentClass}` }, this.showNotificationBadge && (h("span", { key: 'c2a97e9e72715aa53d2697113eadd214aea29425', class: `flex px-075 ${this._contentAlignmentClass}` }, h("wdpr-notification-indicator", { key: 'af779c9f03c1384a380eabda24e0e3cb99620ba1', size: "small", number: this.notificationNumber, decorative: true }))), this._trailingSlot && (h("div", { key: 'dc841437b24ddf81d9ca2ba48d43cda6e9853545', class: `flex ${this._contentAlignmentClass} ${this._colorClass}` }, h("slot", { key: '4b4c2c2c5b827480f601d07b98f45b0b71d6b10c', name: "trailing-icon", onSlotchange: this._updateSlots }))))));
    }
}, [257, "wdpr-nav-item-selectable", {
        "label": [1],
        "componentId": [1, "component-id"],
        "disabled": [516],
        "inverse": [516],
        "allowBoldText": [516, "allow-bold-text"],
        "selected": [1540],
        "showNotificationBadge": [516, "show-notification-badge"],
        "notificationNumber": [2, "notification-number"],
        "itemId": [1, "item-id"],
        "a11yLabel": [1, "a11y-label"],
        "_internalId": [32],
        "_internalSelected": [32],
        "_isTwoLineClamp": [32]
    }, [[0, "keydown", "handleKeyDown"], [0, "window:resize", "handleWindowResize"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-nav-item-selectable", "wdpr-notification-indicator"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-nav-item-selectable":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprNavItemSelectable$1);
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprNavItemSelectable = WdprNavItemSelectable$1;
const defineCustomElement = defineCustomElement$1;

export { WdprNavItemSelectable, defineCustomElement };
//# sourceMappingURL=wdpr-nav-item-selectable.js.map

//# sourceMappingURL=wdpr-nav-item-selectable.js.map