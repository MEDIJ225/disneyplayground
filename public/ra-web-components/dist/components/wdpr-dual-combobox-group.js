import { p as proxyCustomElement, H, h, d as Host } from './p-BRIGwGQo.js';
import { g as generateRandId } from './p-CXZGMLMW.js';

const wdprDualComboboxGroupCss = ".hidden.sc-wdpr-dual-combobox-group-h{display:none}.dual-combobox-header.sc-wdpr-dual-combobox-group{color:var(--theme-color-text-heading);font-size:var(--theme-typography-font-size-body-medium);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-medium);letter-spacing:var(--theme-typography-letter-spacing-default);font-family:var(--theme-default-font-family)}.dual-combobox-group.sc-wdpr-dual-combobox-group{display:flex;flex-direction:column;row-gap:var(--theme-spacing-100)}";

const WdprDualComboboxGroup$1 = /*@__PURE__*/ proxyCustomElement(class WdprDualComboboxGroup extends H {
    constructor() {
        super();
        this.__registerHost();
    }
    _internalId;
    _hideGroup = false;
    header;
    async hideGroup() {
        this._hideGroup = true;
    }
    async showGroup() {
        this._hideGroup = false;
    }
    componentWillLoad() {
        this._internalId = `wdpr-dual-combobox-group-${generateRandId()}`;
    }
    render() {
        return (h(Host, { key: 'f9045b629e3ff70e4fef2e4278686c36221b5392', class: `${this._hideGroup ? 'hidden' : ''}` }, this.header && (h("span", { key: '3ed84b4b1bfd3e836b7fcffee6badd7eee649885', class: "dual-combobox-header", id: `${this._internalId}-header` }, this.header)), h("div", { key: '7b6755b3d887638ed8ac2b31561fa42dce193bd5', class: "dual-combobox-group", role: "group", "aria-labelledby": this.header ? `${this._internalId}-header` : undefined }, h("slot", { key: 'e740bcfb066849a838162d97d5dae2a463432d8a' }))));
    }
    static get style() { return wdprDualComboboxGroupCss; }
}, [262, "wdpr-dual-combobox-group", {
        "header": [1],
        "_hideGroup": [32],
        "hideGroup": [64],
        "showGroup": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-dual-combobox-group"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-dual-combobox-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprDualComboboxGroup$1);
            }
            break;
    } });
}

const WdprDualComboboxGroup = WdprDualComboboxGroup$1;
const defineCustomElement = defineCustomElement$1;

export { WdprDualComboboxGroup, defineCustomElement };
//# sourceMappingURL=wdpr-dual-combobox-group.js.map

//# sourceMappingURL=wdpr-dual-combobox-group.js.map