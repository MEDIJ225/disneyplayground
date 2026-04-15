import { p as proxyCustomElement, H, h, d as Host } from './p-BRIGwGQo.js';
import { g as generateRandId } from './p-CXZGMLMW.js';

const wdprDropdownGroupCss = ".dropdown-header.sc-wdpr-dropdown-group{color:var(--theme-color-text-heading);font-size:var(--theme-typography-font-size-body-medium);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-medium);letter-spacing:var(--theme-typography-letter-spacing-default);font-family:var(--theme-font-family-default)}.dropdown-group.sc-wdpr-dropdown-group{display:flex;flex-direction:column;row-gap:var(--theme-spacing-100)}";

const WdprDropdownGroup$1 = /*@__PURE__*/ proxyCustomElement(class WdprDropdownGroup extends H {
    constructor() {
        super();
        this.__registerHost();
    }
    _internalId;
    header;
    componentWillLoad() {
        this._internalId = `wdpr-dropdown-group-${generateRandId()}`;
    }
    render() {
        return (h(Host, { key: '7011f3359871187b97f4a242897493339176314a' }, this.header && (h("span", { key: '3092e8c2d38bde8db3b51de8e448f80dc4713d5d', class: "dropdown-header", id: `${this._internalId}-header` }, this.header)), h("div", { key: 'c9db0134b510e4f3699ad5dbecefecc9a44bc433', class: "dropdown-group", role: "group", "aria-labelledby": this.header ? `${this._internalId}-header` : undefined }, h("slot", { key: '04f9873f5f734e7096736fd4c3a3ab22c047f4a1' }))));
    }
    static get style() { return wdprDropdownGroupCss; }
}, [262, "wdpr-dropdown-group", {
        "header": [1]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-dropdown-group"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-dropdown-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprDropdownGroup$1);
            }
            break;
    } });
}

const WdprDropdownGroup = WdprDropdownGroup$1;
const defineCustomElement = defineCustomElement$1;

export { WdprDropdownGroup, defineCustomElement };
//# sourceMappingURL=wdpr-dropdown-group.js.map

//# sourceMappingURL=wdpr-dropdown-group.js.map