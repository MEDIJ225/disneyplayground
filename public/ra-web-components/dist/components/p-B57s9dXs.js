import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { c as customTwMerge, b as forwardCommonHostAttributes } from './p-CXZGMLMW.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';

const WdprFavoritesButton = /*@__PURE__*/ proxyCustomElement(class WdprFavoritesButton extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprFavoritesToggle = createEvent(this, "wdprFavoritesToggle", 7);
        this.internals = this.attachInternals();
    }
    get el() { return this; }
    internals;
    /**
     * Marks the favorites button as selected (toggles `aria-pressed`)
     * @default false
     * @type {boolean}
     */
    selected = false;
    /**
     * Disables interactivity and applies disabled styling
     * @default false
     * @type {boolean}
     */
    disabled = false;
    required = false;
    name;
    value = 'favorite';
    /**
     * ARIA label for accessibility
     * @type {string}
     */
    ariaLabel;
    /**
     * On favorite button toggled. Sends the state of the button (selected or not selected).
     * @event
     * @type {{ selected: boolean }}
     */
    wdprFavoritesToggle;
    componentWillLoad() {
        this._updateFormValue();
    }
    formPropsChanged() {
        this._updateFormValue();
    }
    get selectedIconClass() {
        return this.disabled
            ? customTwMerge(selectedIconDisabledClasses)
            : customTwMerge(selectedIconBaseClasses, selectedIconHoverClasses, selectedIconActiveClasses);
    }
    get unselectedIconClass() {
        return this.disabled
            ? customTwMerge(unselectedIconDisabledClasses)
            : customTwMerge(unselectedIconBaseClasses, unselectedIconHoverClasses, unselectedIconActiveClasses);
    }
    get buttonClasses() {
        return customTwMerge(buttonBaseClasses, buttonFocusClasses);
    }
    handleClick = () => {
        if (this.disabled)
            return;
        this.selected = !this.selected;
        this._updateFormValue();
        this.wdprFavoritesToggle.emit({ selected: this.selected });
    };
    _updateFormValue() {
        const shouldSubmit = !this.disabled && !!this.name && this.selected;
        this.internals?.setFormValue?.(shouldSubmit ? this.value : null);
        this._updateValidity();
    }
    _updateValidity() {
        if (this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        if (this.required && !this.selected) {
            this.internals?.setValidity?.({ valueMissing: true }, 'This field is required');
            return;
        }
        this.internals?.setValidity?.({});
    }
    render() {
        return (h("button", { key: '458c0244c6b337cd47432cff37be8bfff0eb7d94', type: "button", ...forwardCommonHostAttributes(this.el), class: this.buttonClasses, onClick: this.handleClick, "aria-label": this.ariaLabel || undefined, "aria-pressed": this.selected ? 'true' : 'false', disabled: this.disabled, "aria-disabled": this.disabled ? 'true' : undefined }, this.selected && h("wdpr-icon-library", { key: 'bb9b0e1a93ac6661af737ab8cd20d2cd8c53e0b9', class: this.selectedIconClass, icon: "wishlist-filled", size: "medium", decorative: true }), !this.selected && h("wdpr-icon-library", { key: '978726c61ddb0ba22822ff669fdc52a80e0d76e5', class: this.unselectedIconClass, icon: "wishlist-empty-thick", size: "medium", decorative: true })));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "selected": ["formPropsChanged"],
        "disabled": ["formPropsChanged"],
        "required": ["formPropsChanged"],
        "name": ["formPropsChanged"],
        "value": ["formPropsChanged"]
    }; }
}, [321, "wdpr-favorites-button", {
        "selected": [1540],
        "disabled": [516],
        "required": [4],
        "name": [1],
        "value": [1],
        "ariaLabel": [1, "aria-label"]
    }, undefined, {
        "selected": ["formPropsChanged"],
        "disabled": ["formPropsChanged"],
        "required": ["formPropsChanged"],
        "name": ["formPropsChanged"],
        "value": ["formPropsChanged"]
    }]);
const selectedIconBaseClasses = 'text-component-favorite-default';
const selectedIconHoverClasses = 'group-hover:text-component-favorite-hover';
const selectedIconActiveClasses = 'group-active:text-component-favorite-pressed';
const selectedIconDisabledClasses = 'text-component-favorite-disabled';
const unselectedIconBaseClasses = 'text-icon-body';
const unselectedIconHoverClasses = 'group-hover:text-icon-actionable-alt-hover';
const unselectedIconActiveClasses = 'group-active:text-icon-actionable-alt-pressed';
const unselectedIconDisabledClasses = 'text-text-disabled';
const buttonBaseClasses = 'bg-surface-default elevation-xsmall-soft p-125 rounded-pill cursor-pointer pointer-events-auto group disabled:cursor-not-allowed disabled:bg-surface-disabled';
const buttonFocusClasses = 'focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2';
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-favorites-button", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-favorites-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprFavoritesButton);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprFavoritesButton as W, defineCustomElement as d };
//# sourceMappingURL=p-B57s9dXs.js.map

//# sourceMappingURL=p-B57s9dXs.js.map