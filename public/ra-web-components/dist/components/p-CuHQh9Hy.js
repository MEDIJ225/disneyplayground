import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';

const WdprReadMoreButton = /*@__PURE__*/ proxyCustomElement(class WdprReadMoreButton extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
    disabled = false;
    expanded = false;
    render() {
        return (h("button", { key: '803e72e55a9066923212beb4dd0c21732e46cc87', type: "button", class: baseClasses, disabled: this.disabled, "aria-expanded": String(this.expanded) }, h("slot", { key: '0a835a073ae5c367dc7bd50752c18be070f4244c' })));
    }
}, [257, "wdpr-read-more-button", {
        "disabled": [516],
        "expanded": [4]
    }]);
const baseClasses = `
inline-flex items-start align-middle no-underline component-medium cursor-pointer rounded-075
text-text-actionable-default hover:text-text-actionable-hover active:text-text-actionable-focused
disabled:text-text-actionable-disabled disabled:cursor-not-allowed
focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused
focus-visible:outline-solid focus-visible:outline-offset-2
`;
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-read-more-button"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-read-more-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprReadMoreButton);
            }
            break;
    } });
}

export { WdprReadMoreButton as W, defineCustomElement as d };
//# sourceMappingURL=p-CuHQh9Hy.js.map

//# sourceMappingURL=p-CuHQh9Hy.js.map