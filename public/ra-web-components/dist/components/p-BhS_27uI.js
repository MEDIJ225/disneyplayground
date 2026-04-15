import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';

const WdprComboboxTag = /*@__PURE__*/ proxyCustomElement(class WdprComboboxTag extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    _tag;
    get el() { return this; }
    label = '';
    async focusTag() {
        this._tag?.focus();
    }
    get _tagClasses() {
        const baseClasses = 'inline-flex items-center justify-center px-100 rounded-050 bg-surface-status-neutral text-text-status-neutral text-component-small font-component-default leading-component-small tracking-02 whitespace-nowrap min-w-[48px] h-[22px]';
        const highlightClasses = 'focus-visible:outline focus-visible:outline-solid focus-visible:outline-025 focus-visible:outline-stroke-actionable-focused';
        return customTwMerge(baseClasses, highlightClasses);
    }
    render() {
        return (h("span", { key: '2ac7ef5bc1b74a2802f4913fe7c5be8540d39152', class: this._tagClasses, role: "button", "aria-label": `Remove ${this.label}`, tabindex: "-1", ref: el => (this._tag = el) }, this.label));
    }
    static get style() { return ":host {\n      display: inline-flex;\n    }"; }
}, [257, "wdpr-combobox-tag", {
        "label": [1],
        "focusTag": [64]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-combobox-tag"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-combobox-tag":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprComboboxTag);
            }
            break;
    } });
}

export { WdprComboboxTag as W, defineCustomElement as d };
//# sourceMappingURL=p-BhS_27uI.js.map

//# sourceMappingURL=p-BhS_27uI.js.map