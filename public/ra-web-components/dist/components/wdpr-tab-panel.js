import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';

const WdprTabPanel$1 = /*@__PURE__*/ proxyCustomElement(class WdprTabPanel extends H {
    constructor() {
        super();
        this.__registerHost();
    }
    get el() { return this; }
    /**
     * The unique index of the content panel.
     */
    panelIndex;
    /**
     * if 'true', the panel is visible.
     */
    active = false;
    render() {
        const panelIdx = `tab-content-${this.panelIndex}`;
        const labelledByIdx = `tab-label-${this.panelIndex}`;
        return (h("div", { key: 'f6c49189bb53c3c001337d1d5568cb4adcb6ae53', id: panelIdx, role: "tabpanel", "aria-labelledby": labelledByIdx, hidden: !this.active }, h("slot", { key: '635b3fdf3b8ebda7e00677432154cfa40944555b' })));
    }
}, [260, "wdpr-tab-panel", {
        "panelIndex": [1, "panel-index"],
        "active": [4]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-tab-panel"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-tab-panel":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprTabPanel$1);
            }
            break;
    } });
}

const WdprTabPanel = WdprTabPanel$1;
const defineCustomElement = defineCustomElement$1;

export { WdprTabPanel, defineCustomElement };
//# sourceMappingURL=wdpr-tab-panel.js.map

//# sourceMappingURL=wdpr-tab-panel.js.map