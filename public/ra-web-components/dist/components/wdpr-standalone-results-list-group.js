import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { g as generateRandId } from './p-CXZGMLMW.js';

const WdprStandaloneResultsListGroup$1 = /*@__PURE__*/ proxyCustomElement(class WdprStandaloneResultsListGroup extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    _internalId;
    get el() { return this; }
    header;
    componentWillLoad() {
        this._internalId = `wdpr-standalone-results-list-group-${generateRandId()}`;
    }
    render() {
        return (h("div", { key: '2ce65c78eba6233aedbfd6509a4f1d479bc7512a', class: "flex flex-col gap-y-100" }, this.header && (h("span", { key: '254cf728dfe14f12cf10b4355a81bad8828404a7', class: "body-medium text-text-heading", id: `${this._internalId}-header` }, this.header)), h("ul", { key: this._internalId, class: "flex flex-col gap-y-100", "aria-labelledby": `${this.header ? `${this._internalId}-header` : ''}` }, h("slot", { key: 'a5dd173d14a74bee588e10d054b2238003d369c1' }))));
    }
}, [257, "wdpr-standalone-results-list-group", {
        "header": [1]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-standalone-results-list-group"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-standalone-results-list-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprStandaloneResultsListGroup$1);
            }
            break;
    } });
}

const WdprStandaloneResultsListGroup = WdprStandaloneResultsListGroup$1;
const defineCustomElement = defineCustomElement$1;

export { WdprStandaloneResultsListGroup, defineCustomElement };
//# sourceMappingURL=wdpr-standalone-results-list-group.js.map

//# sourceMappingURL=wdpr-standalone-results-list-group.js.map