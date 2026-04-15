import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$2 } from './p-Df6D6b08.js';

const WdprCompactCircleCard$1 = /*@__PURE__*/ proxyCustomElement(class WdprCompactCircleCard extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    headline;
    src;
    a11yAlt;
    render() {
        return (h("article", { key: '2536ba68cd772a42cccb8dd3e3bd588b674038e1', class: wrapperClasses }, h("figure", { key: '6551396e0a9d09a07f725695dbe82e9d3f09f0df', class: mediaWrapperClasses }, h("wdpr-media", { key: '4bd5a4592c6fbdd4690ed1ea63c6e75bf67faad9', src: this.src, alt: this.a11yAlt, aspect: "square", objectFit: "cover" })), h("span", { key: '39fe4df17dee7eb32fa06ed70300c91baca43921', class: headlineClasses }, this.headline)));
    }
}, [257, "wdpr-compact-circle-card", {
        "headline": [1],
        "src": [1],
        "a11yAlt": [1, "a11y-alt"]
    }]);
const wrapperClasses = 'flex flex-col items-center gap-150';
const mediaWrapperClasses = 'w-full aspect-square p-175 md:p-250 bg-surface-default elevation-xsmall-soft rounded-pill overflow-hidden transition-all';
const headlineClasses = 'w-full transition-all text-center text-component-small font-component-default leading-component-small tracking-02 line-clamp-2';
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-compact-circle-card", "wdpr-media"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-compact-circle-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCompactCircleCard$1);
            }
            break;
        case "wdpr-media":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprCompactCircleCard = WdprCompactCircleCard$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCompactCircleCard, defineCustomElement };
//# sourceMappingURL=wdpr-compact-circle-card.js.map

//# sourceMappingURL=wdpr-compact-circle-card.js.map