'use strict';

var index = require('./index-4gPM_TYz.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprTileGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    _internalId;
    columns = 1;
    tileGroupId;
    a11yLabel = '';
    componentDidLoad() {
        this._propagateToSlotElements();
    }
    componentWillLoad() {
        this._internalId = this.tileGroupId || `wdpr-tile-group-${utils.generateRandId()}`;
    }
    onSlotChange() {
        this._propagateToSlotElements();
    }
    handleKeyDown(ev) {
        if (ev.key == keycodes_model.KEYBOARD_KEYS.ESCAPE) {
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
        return (index.h("div", { key: '392d37a7cbef1cfec337f899ceec7498c5d30436', role: "group", id: this._internalId, "aria-label": this.a11yLabel || 'Tile Group' }, index.h("slot", { key: '614b876d521c5af620213f9d74a2886989ada36d' })));
    }
};

exports.wdpr_tile_group = WdprTileGroup;
//# sourceMappingURL=wdpr-tile-group.entry.cjs.js.map

//# sourceMappingURL=wdpr-tile-group.cjs.entry.js.map