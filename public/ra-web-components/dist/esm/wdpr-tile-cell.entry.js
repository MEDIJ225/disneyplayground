import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';

const WdprTileCell = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    cellColumns = 1;
    render() {
        return (h("div", { key: 'd2f1a6faa6c465bef0b9de567cb314bb63ca3d9b', class: cellClass, style: { gridTemplateColumns: `repeat(${this.cellColumns}, 1fr)` } }, h("slot", { key: 'f97dac5f9bad75bd57c97ffa8ecfa130236aa289' })));
    }
};
const cellClass = "grid gap-100";

export { WdprTileCell as wdpr_tile_cell };
//# sourceMappingURL=wdpr-tile-cell.entry.js.map

//# sourceMappingURL=wdpr-tile-cell.entry.js.map