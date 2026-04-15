import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';

const WdprAddButton = /*@__PURE__*/ proxyCustomElement(class WdprAddButton extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprAddToggle = createEvent(this, "wdprAddToggle", 7);
    }
    get el() { return this; }
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
        return customTwMerge(this._getButtonBaseClasses(), buttonFocusClasses);
    }
    get _selectedIconClass() {
        return this.disabled ? customTwMerge(selectedIconDisabledClasses) : customTwMerge(selectedIconBaseClasses, selectedIconHoverClasses, selectedIconActiveClasses);
    }
    get _unselectedIconClass() {
        return this.disabled ? customTwMerge(unselectedIconDisabledClasses) : customTwMerge(unselectedIconBaseClasses, unselectedIconHoverClasses, unselectedIconActiveClasses);
    }
    render() {
        return (h("button", { key: '37fa97f91a71cefb5617d473ff4c44baf68d3b47', type: "button", class: this._buttonClasses, onClick: this._onButtonClick, "aria-label": this.a11yLabel || undefined, "aria-pressed": this.selected ? 'true' : 'false', disabled: this.disabled, "aria-disabled": this.disabled ? 'true' : undefined }, this.selected && h("wdpr-icon-library", { key: '8ec687e0f802a2406c7a00b7702f8fb4ffee5a91', class: this._selectedIconClass, icon: "checkmark", size: "medium", decorative: true }), !this.selected && h("wdpr-icon-library", { key: '42792a0c526b263450ef73bddee1c0e055d14f89', class: this._unselectedIconClass, icon: "add-stepper", size: "medium", decorative: true })));
    }
}, [257, "wdpr-add-button", {
        "selected": [1540],
        "disabled": [516],
        "a11yLabel": [1, "a11y-label"]
    }]);
const selectedIconBaseClasses = 'text-component-add-default';
const selectedIconHoverClasses = 'group-hover:text-component-add-hover';
const selectedIconActiveClasses = 'group-active:text-component-add-pressed';
const selectedIconDisabledClasses = 'text-component-add-disabled';
const unselectedIconBaseClasses = 'text-icon-body';
const unselectedIconHoverClasses = 'group-hover:text-icon-actionable-alt-hover';
const unselectedIconActiveClasses = 'group-active:text-icon-actionable-alt-pressed';
const unselectedIconDisabledClasses = 'text-text-disabled';
const buttonFocusClasses = 'focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2';
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-add-button", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-add-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprAddButton);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprAddButton as W, defineCustomElement as d };
//# sourceMappingURL=p-BIjljjyT.js.map

//# sourceMappingURL=p-BIjljjyT.js.map