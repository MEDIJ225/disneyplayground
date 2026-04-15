import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CykM8GCN.js';
import { c as customTwMerge, b as forwardCommonHostAttributes } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprAddButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprAddToggle = createEvent(this, "wdprAddToggle", 7);
    }
    get el() { return getElement(this); }
    /**
     * Marks the add button as selected (toggles `aria-pressed`)
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
    /**
     * ARIA label for accessibility
     * @type {string}
     */
    a11yLabel = '';
    /**
     * On add button toggled. Sends the state of the button (selected or not selected).
     * @event
     * @type {{ selected: boolean }}
     */
    wdprAddToggle;
    _onButtonClick = () => {
        if (this.disabled)
            return;
        this.selected = !this.selected;
        this.wdprAddToggle.emit({ selected: this.selected });
    };
    _getButtonBaseClasses() {
        const bgClass = this.selected ? 'disabled:bg-surface-default bg-surface-actionable-alt-selected hover:bg-surface-actionable-alt-hover active:bg-surface-actionable-alt-pressed' : 'bg-surface-default';
        return customTwMerge(bgClass, 'elevation-xsmall-soft', 'p-125', 'rounded-pill', 'cursor-pointer', 'pointer-events-auto', 'group', 'disabled:cursor-not-allowed', 'disabled:bg-surface-disabled');
    }
    get _buttonClasses() {
        return customTwMerge(this._getButtonBaseClasses(), buttonFocusClasses$1);
    }
    get _selectedIconClass() {
        return this.disabled ? customTwMerge(selectedIconDisabledClasses$1) : customTwMerge(selectedIconBaseClasses$1, selectedIconHoverClasses$1, selectedIconActiveClasses$1);
    }
    get _unselectedIconClass() {
        return this.disabled ? customTwMerge(unselectedIconDisabledClasses$1) : customTwMerge(unselectedIconBaseClasses$1, unselectedIconHoverClasses$1, unselectedIconActiveClasses$1);
    }
    render() {
        return (h("button", { key: '37fa97f91a71cefb5617d473ff4c44baf68d3b47', type: "button", class: this._buttonClasses, onClick: this._onButtonClick, "aria-label": this.a11yLabel || undefined, "aria-pressed": this.selected ? 'true' : 'false', disabled: this.disabled, "aria-disabled": this.disabled ? 'true' : undefined }, this.selected && h("wdpr-icon-library", { key: '8ec687e0f802a2406c7a00b7702f8fb4ffee5a91', class: this._selectedIconClass, icon: "checkmark", size: "medium", decorative: true }), !this.selected && h("wdpr-icon-library", { key: '42792a0c526b263450ef73bddee1c0e055d14f89', class: this._unselectedIconClass, icon: "add-stepper", size: "medium", decorative: true })));
    }
};
const selectedIconBaseClasses$1 = 'text-component-add-default';
const selectedIconHoverClasses$1 = 'group-hover:text-component-add-hover';
const selectedIconActiveClasses$1 = 'group-active:text-component-add-pressed';
const selectedIconDisabledClasses$1 = 'text-component-add-disabled';
const unselectedIconBaseClasses$1 = 'text-icon-body';
const unselectedIconHoverClasses$1 = 'group-hover:text-icon-actionable-alt-hover';
const unselectedIconActiveClasses$1 = 'group-active:text-icon-actionable-alt-pressed';
const unselectedIconDisabledClasses$1 = 'text-text-disabled';
const buttonFocusClasses$1 = 'focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2';

const WdprFavoritesButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprFavoritesToggle = createEvent(this, "wdprFavoritesToggle", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    get el() { return getElement(this); }
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
};
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

export { WdprAddButton as wdpr_add_button, WdprFavoritesButton as wdpr_favorites_button };
//# sourceMappingURL=wdpr-add-button.wdpr-favorites-button.entry.js.map

//# sourceMappingURL=wdpr-add-button_2.entry.js.map