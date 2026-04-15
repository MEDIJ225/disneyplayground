import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';

const WdprTileCell$1 = /*@__PURE__*/ proxyCustomElement(class WdprTileCell extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
    cellColumns = 1;
    render() {
        return (h("div", { key: 'd2f1a6faa6c465bef0b9de567cb314bb63ca3d9b', class: cellClass, style: { gridTemplateColumns: `repeat(${this.cellColumns}, 1fr)` } }, h("slot", { key: 'f97dac5f9bad75bd57c97ffa8ecfa130236aa289' })));
    }
}, [257, "wdpr-tile-cell", {
        "cellColumns": [1538, "cell-columns"]
    }]);
const cellClass = "grid gap-100";
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-tile-cell"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-tile-cell":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprTileCell$1);
            }
            break;
    } });
}

const WdprTileCell = WdprTileCell$1;
const defineCustomElement = defineCustomElement$1;

export { WdprTileCell, defineCustomElement };
//# sourceMappingURL=wdpr-tile-cell.js.map

//# sourceMappingURL=wdpr-tile-cell.js.map