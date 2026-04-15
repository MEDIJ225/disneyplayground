import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';

const WdprSearchInputClearButton = /*@__PURE__*/ proxyCustomElement(class WdprSearchInputClearButton extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
    /**
     * Disables the button, preventing user interaction.
     */
    disabled = false;
    /**
     * Accessibility label for the clear button.
     */
    a11yLabel = 'Clear search';
    render() {
        return (h("button", { key: '2fe5d784a255f024ae125e7e36395bc6f36915e9', type: "button", class: buttonClasses, disabled: this.disabled, "aria-label": this.a11yLabel }, h("wdpr-icon-library", { key: 'faf6d9535fef7aeed42e4631a42b7eabf96d9d93', icon: "close", size: "small", decorative: true })));
    }
}, [257, "wdpr-search-input-clear-button", {
        "disabled": [516],
        "a11yLabel": [1, "a11y-label"]
    }]);
const buttonClasses = `
  flex items-center justify-center cursor-pointer rounded-pill
  min-w-dimension-300 min-h-dimension-300
  bg-surface-transparent transition-colors
  focus-visible:outline-solid focus-visible:outline-offset-[-2px] focus-visible:outline-037
  focus-visible:outline-stroke-actionable-focused
  text-icon-search-default
  hover:text-icon-search-hover
  active:text-icon-search-pressed
  disabled:text-icon-search-disabled disabled:cursor-not-allowed
`;
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-search-input-clear-button", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-search-input-clear-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprSearchInputClearButton);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprSearchInputClearButton as W, defineCustomElement as d };
//# sourceMappingURL=p-t7dChQWd.js.map

//# sourceMappingURL=p-t7dChQWd.js.map