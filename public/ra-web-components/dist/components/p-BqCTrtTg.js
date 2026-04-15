import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';

const WdprPaginationReadonly = /*@__PURE__*/ proxyCustomElement(class WdprPaginationReadonly extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    render() {
        return (h("span", { key: 'df944eac9ff894ae67eb513543e6ab558f4cc01e', class: "w-dimension-500 h-dimension-500 flex items-center justify-center text-color-icon-body" }, h("wdpr-icon-library", { key: 'a5dd8b1ba60c6614780c4c4ab4e5283ef78d067e', icon: "more", size: "xsmall", decorative: true })));
    }
}, [257, "wdpr-pagination-readonly"]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-pagination-readonly", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-pagination-readonly":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprPaginationReadonly);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprPaginationReadonly as W, defineCustomElement as d };
//# sourceMappingURL=p-BqCTrtTg.js.map

//# sourceMappingURL=p-BqCTrtTg.js.map