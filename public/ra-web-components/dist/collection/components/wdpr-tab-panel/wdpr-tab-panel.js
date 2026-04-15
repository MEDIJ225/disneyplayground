import { h } from "@stencil/core";
export class WdprTabPanel {
    el;
    /**
     * The unique index of the content panel.
     */
    panelIndex;
    /**
     * if 'true', the panel is visible.
     */
    active = false;
    render() {
        const panelIdx = `tab-content-${this.panelIndex}`;
        const labelledByIdx = `tab-label-${this.panelIndex}`;
        return (h("div", { key: 'f6c49189bb53c3c001337d1d5568cb4adcb6ae53', id: panelIdx, role: "tabpanel", "aria-labelledby": labelledByIdx, hidden: !this.active }, h("slot", { key: '635b3fdf3b8ebda7e00677432154cfa40944555b' })));
    }
    static get is() { return "wdpr-tab-panel"; }
    static get properties() {
        return {
            "panelIndex": {
                "type": "string",
                "attribute": "panel-index",
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
                    "text": "The unique index of the content panel."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "active": {
                "type": "boolean",
                "attribute": "active",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "if 'true', the panel is visible."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-tab-panel.js.map
