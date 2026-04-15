import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import './p-CXZGMLMW.js';
import { b as bundleCjsExports } from './p-CF3xLdU_.js';

const WdprCalendarDot = /*@__PURE__*/ proxyCustomElement(class WdprCalendarDot extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    dotStyle = '';
    get _dotClasses() {
        const base = 'h-[5px] w-[5px] rounded-pill bg-surface-actionable-alt-selected';
        return bundleCjsExports.twMerge(base, this.dotStyle);
    }
    render() {
        return h("div", { key: '8b0fc3a7979c5634b6e36d59eb9cf29a376aae36', class: this._dotClasses, part: "calendar-dot", "aria-hidden": "true" });
    }
}, [257, "wdpr-calendar-dot", {
        "dotStyle": [1, "dot-style"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-calendar-dot"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-calendar-dot":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCalendarDot);
            }
            break;
    } });
}

export { WdprCalendarDot as W, defineCustomElement as d };
//# sourceMappingURL=p-CXLG1rnK.js.map

//# sourceMappingURL=p-CXLG1rnK.js.map