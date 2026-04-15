import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';

const WdprLinearLoader = /*@__PURE__*/ proxyCustomElement(class WdprLinearLoader extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
    /**
     * Progress of the bar
     */
    progress = 0;
    /**
     * Maximum progress of the bar
     * @type {HTMLWdprLinearLoaderElement}
     */
    max = 100;
    get percentage() {
        if (this.progress >= this.max)
            return 100;
        if (this.progress <= 0)
            return 0;
        return (this.progress / this.max) * 100;
    }
    render() {
        return (h("div", { key: '745aba8d130f768e921697c9653eaea3fadc2742', class: "flex flex-col gap-050 w-full", role: "progressbar", "aria-valuenow": this.progress, "aria-valuemin": 0, "aria-valuemax": this.max, "aria-label": `Loading progress: ${this.progress} out of ${this.max}` }, h("div", { key: '00e77359c76e333472b58ba85e779bec084f91f3', class: "w-full bg-black rounded-pill h-100 overflow-hidden" }, h("div", { key: 'd8fd6b746f965e3f46bba4c7195ffce030ae20de', class: "bg-white h-full transition-all duration-500 ease-in-out", style: { width: `${this.percentage}%` } }))));
    }
}, [257, "wdpr-linear-loader", {
        "progress": [514],
        "max": [514]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-linear-loader"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-linear-loader":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprLinearLoader);
            }
            break;
    } });
}

export { WdprLinearLoader as W, defineCustomElement as d };
//# sourceMappingURL=p-CbVofX_T.js.map

//# sourceMappingURL=p-CbVofX_T.js.map