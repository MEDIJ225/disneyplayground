import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';

const WdprTileRow = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
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
};
const rowClass = 'grid gap-150 mb-100';

export { WdprTileRow as wdpr_tile_row };
//# sourceMappingURL=wdpr-tile-row.entry.js.map

//# sourceMappingURL=wdpr-tile-row.entry.js.map