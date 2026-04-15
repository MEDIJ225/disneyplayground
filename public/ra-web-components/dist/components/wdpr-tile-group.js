import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { g as generateRandId } from './p-CXZGMLMW.js';

const WdprTileGroup$1 = /*@__PURE__*/ proxyCustomElement(class WdprTileGroup extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
    _internalId;
    columns = 1;
    tileGroupId;
    a11yLabel = '';
    componentDidLoad() {
        this._propagateToSlotElements();
    }
    componentWillLoad() {
        this._internalId = this.tileGroupId || `wdpr-tile-group-${generateRandId()}`;
    }
    onSlotChange() {
        this._propagateToSlotElements();
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleTileClick(event) {
        event.stopImmediatePropagation();
        const clickedTile = event.target;
        if (clickedTile.disabled)
            return;
        clickedTile.focus();
    }
    _propagateToSlotElements = () => {
        const slot = this.el.shadowRoot.querySelector('slot');
        if (slot) {
            slot.assignedElements().forEach((el) => {
                el.columns = this.columns;
            });
        }
    };
    render() {
        return (h("div", { key: '392d37a7cbef1cfec337f899ceec7498c5d30436', role: "group", id: this._internalId, "aria-label": this.a11yLabel || 'Tile Group' }, h("slot", { key: '614b876d521c5af620213f9d74a2886989ada36d' })));
    }
}, [257, "wdpr-tile-group", {
        "columns": [1538],
        "tileGroupId": [1537, "tile-group-id"],
        "a11yLabel": [1, "a11y-label"],
        "_internalId": [32]
    }, [[0, "slotchange", "onSlotChange"], [0, "keydown", "handleKeyDown"], [0, "wdprClick", "handleTileClick"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-tile-group"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-tile-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprTileGroup$1);
            }
            break;
    } });
}

const WdprTileGroup = WdprTileGroup$1;
const defineCustomElement = defineCustomElement$1;

export { WdprTileGroup, defineCustomElement };
//# sourceMappingURL=wdpr-tile-group.js.map

//# sourceMappingURL=wdpr-tile-group.js.map