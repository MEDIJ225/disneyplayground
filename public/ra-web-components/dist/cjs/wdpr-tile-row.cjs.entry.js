'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprTileRow = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
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
        return (index.h("div", { key: 'd9bb4f234da727efc86d3a937cefa46ebc13b499', class: rowClass, style: { gridTemplateColumns: `repeat(${this.columns}, 1fr)` } }, index.h("slot", { key: '925ecf212cbc582a3f07a2e9509b4d23b1196868' })));
    }
};
const rowClass = 'grid gap-150 mb-100';

exports.wdpr_tile_row = WdprTileRow;
//# sourceMappingURL=wdpr-tile-row.entry.cjs.js.map

//# sourceMappingURL=wdpr-tile-row.cjs.entry.js.map