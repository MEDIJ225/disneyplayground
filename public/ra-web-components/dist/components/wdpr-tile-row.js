import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';

const WdprTileRow$1 = /*@__PURE__*/ proxyCustomElement(class WdprTileRow extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
    columns = 1;
    cellColumns = 1;
    componentDidLoad() {
        this._propagateToSlotElements();
    }
    onSlotChange() {
        this._propagateToSlotElements();
    }
    _propagateToSlotElements = () => {
        const slot = this.el.shadowRoot.querySelector('slot');
        if (slot) {
            slot.assignedElements().forEach((el) => {
                el.cellColumns = this.cellColumns;
            });
        }
    };
    render() {
        return (h("div", { key: 'd9bb4f234da727efc86d3a937cefa46ebc13b499', class: rowClass, style: { gridTemplateColumns: `repeat(${this.columns}, 1fr)` } }, h("slot", { key: '925ecf212cbc582a3f07a2e9509b4d23b1196868' })));
    }
}, [257, "wdpr-tile-row", {
        "columns": [1538],
        "cellColumns": [1538, "cell-columns"]
    }, [[0, "slotchange", "onSlotChange"]]]);
const rowClass = 'grid gap-150 mb-100';
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-tile-row"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-tile-row":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprTileRow$1);
            }
            break;
    } });
}

const WdprTileRow = WdprTileRow$1;
const defineCustomElement = defineCustomElement$1;

export { WdprTileRow, defineCustomElement };
//# sourceMappingURL=wdpr-tile-row.js.map

//# sourceMappingURL=wdpr-tile-row.js.map