import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$1 } from './p-DmmASxKN.js';

const WdprTimeUnit = /*@__PURE__*/ proxyCustomElement(class WdprTimeUnit extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    variant = 'primary';
    label;
    digits = ['#', '#'];
    /**
     * Prefix for slot names (e.g., "hour", "minute", "second")
    */
    slotPrefix;
    get _labelClasses() {
        return customTwMerge(baseLabelClasses, variantLabelClasses[this.variant]);
    }
    render() {
        const [digit1, digit2] = this.digits;
        return (h("div", { key: 'feb529567de46c25787a96a7560c9ea6ac115870', class: wrapperClasses }, h("div", { key: '69f4bedd695c07c8f0d580a3ad3d5c49e540b1fe', class: digitsClasses }, h("slot", { key: 'd1755a579bc015c07dbcf4c37d8b06eb2c88c162', name: `${this.slotPrefix}-digit-1` }, h("wdpr-number-flipper", { key: 'a4a1648ff2d92d8ac22688aed1f2155f5b1033db' }, digit1)), h("slot", { key: '28cf37dccbfa44498bb73f6769775497d51571d7', name: `${this.slotPrefix}-digit-2` }, h("wdpr-number-flipper", { key: 'ee8c6de815092cc249dd69f3176ea20c90989e65' }, digit2))), h("span", { key: '38cdc161fe96e213b7f26e32606c0c3db9fd74b9', class: this._labelClasses }, this.label)));
    }
}, [257, "wdpr-time-unit", {
        "variant": [1],
        "label": [1],
        "digits": [16],
        "slotPrefix": [1, "slot-prefix"]
    }]);
const wrapperClasses = 'flex flex-col items-center gap-050';
const digitsClasses = 'flex flex-row gap-050';
const baseLabelClasses = 'text-[12px] font-[800] leading-[16px] tracking-[1.2px] uppercase';
const variantLabelClasses = {
    primary: 'text-text-label',
    secondary: 'text-text-inverse',
};
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-time-unit", "wdpr-number-flipper"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-time-unit":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprTimeUnit);
            }
            break;
        case "wdpr-number-flipper":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprTimeUnit as W, defineCustomElement as d };
//# sourceMappingURL=p-C4fBhGYt.js.map

//# sourceMappingURL=p-C4fBhGYt.js.map