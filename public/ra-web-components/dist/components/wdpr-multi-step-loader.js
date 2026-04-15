import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$2 } from './p-CbVofX_T.js';

const WdprMultiStepLoader$1 = /*@__PURE__*/ proxyCustomElement(class WdprMultiStepLoader extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
    /**
     * An array of steps
     */
    steps = [];
    render() {
        return (h("div", { key: '7135c6a3bde279b4c24bb0a182fff1bf243b7dc8', class: "flex gap-075", role: "group", "aria-label": "Multi-step progress" }, this.steps.map(step => (h("wdpr-linear-loader", { class: "flex-1", progress: step.progress ?? 0, max: step.max ?? 100 })))));
    }
}, [257, "wdpr-multi-step-loader", {
        "steps": [16]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-multi-step-loader", "wdpr-linear-loader"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-multi-step-loader":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprMultiStepLoader$1);
            }
            break;
        case "wdpr-linear-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprMultiStepLoader = WdprMultiStepLoader$1;
const defineCustomElement = defineCustomElement$1;

export { WdprMultiStepLoader, defineCustomElement };
//# sourceMappingURL=wdpr-multi-step-loader.js.map

//# sourceMappingURL=wdpr-multi-step-loader.js.map