import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';

const WdprModalFooter$1 = /*@__PURE__*/ proxyCustomElement(class WdprModalFooter extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    footerClasses = 'flex px-300 py-300 items-center justify-center';
    render() {
        return (h("div", { key: 'c3e422533aa7dbc63da2367595da0d82daaf6484', class: "w-full bg-surface-default" }, h("div", { key: 'b2a23fd6e130e35bf0d8f0cd4d1f6307f4a85340', id: "buttons-divider", class: "flex pb-0", "aria-hidden": "true" }, h("div", { key: '613a9fb00079da5b317427ec03747ccacf12b42d', class: "h-px w-full bg-stroke-default" })), h("div", { key: '6e2151d7e5006900b50373b295d04cc405f04cb7', id: 'footer', onMouseDown: (event) => event.stopPropagation(), class: this.footerClasses }, h("slot", { key: '31035a818f426c92036f9a79864dc98494c41a6d' }))));
    }
    static get style() { return ":host { display: block; flex-shrink: 0; margin-top: auto; }"; }
}, [257, "wdpr-modal-footer"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-modal-footer"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-modal-footer":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprModalFooter$1);
            }
            break;
    } });
}

const WdprModalFooter = WdprModalFooter$1;
const defineCustomElement = defineCustomElement$1;

export { WdprModalFooter, defineCustomElement };
//# sourceMappingURL=wdpr-modal-footer.js.map

//# sourceMappingURL=wdpr-modal-footer.js.map