'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprTileCell = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    cellColumns = 1;
    render() {
        return (index.h("div", { key: 'd2f1a6faa6c465bef0b9de567cb314bb63ca3d9b', class: cellClass, style: { gridTemplateColumns: `repeat(${this.cellColumns}, 1fr)` } }, index.h("slot", { key: 'f97dac5f9bad75bd57c97ffa8ecfa130236aa289' })));
    }
};
const cellClass = "grid gap-100";

exports.wdpr_tile_cell = WdprTileCell;
//# sourceMappingURL=wdpr-tile-cell.entry.cjs.js.map

//# sourceMappingURL=wdpr-tile-cell.cjs.entry.js.map