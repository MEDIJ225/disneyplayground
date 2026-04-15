import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$2 } from './p-Df6D6b08.js';

const WdprPortraitSecondaryCard$1 = /*@__PURE__*/ proxyCustomElement(class WdprPortraitSecondaryCard extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    headline;
    src;
    a11yAlt;
    render() {
        return (h("article", { key: 'eed1abd6b0068b253bd3983f0e49528ff1ab10cd', class: baseClasses }, h("figure", { key: 'f965ef5d07d5475bf764ca2aa1f5775d0163ff75', class: mediaWrapperClasses }, h("wdpr-media", { key: '56319f7d15182f79397fc77449e04f5cbe9641cd', src: this.src, alt: this.a11yAlt, aspect: "portrait", objectFit: "cover", portraitRatio: "2:3" })), h("span", { key: 'db26e67b5b17d9264461e15901b2b32b21121684', class: headlineClasses }, this.headline)));
    }
}, [257, "wdpr-portrait-secondary-card", {
        "headline": [1],
        "src": [1],
        "a11yAlt": [1, "a11y-alt"]
    }]);
const baseClasses = 'flex flex-col gap-150 w-full transition-all';
const mediaWrapperClasses = 'elevation-small-soft lg:elevation-medium-soft rounded-300 overflow-hidden';
const headlineClasses = `px-050 text-text-heading transition-all text-heading-xsmall font-heading-alt leading-heading-xsmall tracking--05 line-clamp-2
  md:text-heading-small md:leading-heading-small
  lg:text-heading-medium lg:leading-heading-medium
  xl:text-heading-large xl:leading-heading-large`;
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-portrait-secondary-card", "wdpr-media"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-portrait-secondary-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprPortraitSecondaryCard$1);
            }
            break;
        case "wdpr-media":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprPortraitSecondaryCard = WdprPortraitSecondaryCard$1;
const defineCustomElement = defineCustomElement$1;

export { WdprPortraitSecondaryCard, defineCustomElement };
//# sourceMappingURL=wdpr-portrait-secondary-card.js.map

//# sourceMappingURL=wdpr-portrait-secondary-card.js.map