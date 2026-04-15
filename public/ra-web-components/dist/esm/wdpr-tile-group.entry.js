import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import { g as generateRandId } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprTileGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
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
};

export { WdprTileGroup as wdpr_tile_group };
//# sourceMappingURL=wdpr-tile-group.entry.js.map

//# sourceMappingURL=wdpr-tile-group.entry.js.map