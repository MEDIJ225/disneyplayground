import { h } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { generateRandId } from "../../utils/utils";
export class WdprTileGroup {
    el;
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
    static get is() { return "wdpr-tile-group"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "columns": {
                "type": "number",
                "attribute": "columns",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "1"
            },
            "tileGroupId": {
                "type": "string",
                "attribute": "tile-group-id",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "a11yLabel": {
                "type": "string",
                "attribute": "a11y-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            }
        };
    }
    static get states() {
        return {
            "_internalId": {}
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "slotchange",
                "method": "onSlotChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "keydown",
                "method": "handleKeyDown",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "wdprClick",
                "method": "handleTileClick",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-tile-group.js.map
