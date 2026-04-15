import { h } from "@stencil/core";
export class WdprTileCell {
    el;
    cellColumns = 1;
    render() {
        return (h("div", { key: 'd2f1a6faa6c465bef0b9de567cb314bb63ca3d9b', class: cellClass, style: { gridTemplateColumns: `repeat(${this.cellColumns}, 1fr)` } }, h("slot", { key: 'f97dac5f9bad75bd57c97ffa8ecfa130236aa289' })));
    }
    static get is() { return "wdpr-tile-cell"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
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
}
const cellClass = "grid gap-100";
//# sourceMappingURL=wdpr-tile-cell.js.map
