import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$2 } from './p-Df6D6b08.js';

const WdprCompactSquareCard$1 = /*@__PURE__*/ proxyCustomElement(class WdprCompactSquareCard extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    headline;
    src;
    a11yAlt;
    render() {
        return (h("article", { key: '76d139e093e9cb4170b43cd10dd7305262297de2', class: baseClasses }, h("figure", { key: 'e06d39a918f44a654e6d58cef4f532de87006101', class: mediaWrapperClasses }, h("wdpr-media", { key: 'b1d4ce5540f6bd1d1fed51f88a080796f6ad7c6f', src: this.src, alt: this.a11yAlt, aspect: "square", objectFit: "cover" })), h("span", { key: 'e68119bebeb2952e619df478eaf32f05da2d7f70', class: headlineClasses }, this.headline)));
    }
}, [257, "wdpr-compact-square-card", {
        "headline": [1],
        "src": [1],
        "a11yAlt": [1, "a11y-alt"]
    }]);
const baseClasses = 'flex flex-col gap-150 w-full transition-all';
const mediaWrapperClasses = 'elevation-medium-soft rounded-300 overflow-hidden';
const headlineClasses = `text-text-heading transition-all text-heading-xsmall font-heading-alt leading-heading-xsmall line-clamp-2 pl-100 pr-200
  lg:text-heading-large lg:font-heading-default lg:leading-heading-large`;
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-compact-square-card", "wdpr-media"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-compact-square-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCompactSquareCard$1);
            }
            break;
        case "wdpr-media":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprCompactSquareCard = WdprCompactSquareCard$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCompactSquareCard, defineCustomElement };
//# sourceMappingURL=wdpr-compact-square-card.js.map

//# sourceMappingURL=wdpr-compact-square-card.js.map