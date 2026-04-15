import { h } from "@stencil/core";
export class WdprTileRow {
    el;
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
    static get is() { return "wdpr-tile-row"; }
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
            "cellColumns": {
                "type": "number",
                "attribute": "cell-columns",
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
            }
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
            }];
    }
}
const rowClass = 'grid gap-150 mb-100';
//# sourceMappingURL=wdpr-tile-row.js.map
