import { h, Host } from "@stencil/core";
import { generateRandId } from "../../../utils/utils";
export class WdprChipMenuGroup {
    _internalId;
    header;
    componentWillLoad() {
        this._internalId = `wdpr-chip-menu-group-${generateRandId()}`;
    }
    render() {
        return (h(Host, { key: '9ac8ce53e7aea2d29b7a5302fcd4bc9e6eb006d7' }, this.header && (h("span", { key: '6d0853cacf381a75ce17cb988637d85050c4217c', class: "chip-menu-header", id: `${this._internalId}-header` }, this.header)), h("div", { key: '7e1d8b8ea45b5bfcb51beb5a4ddebf497ef90241', class: "chip-menu-group", role: "group", "aria-labelledby": this.header ? `${this._internalId}-header` : undefined }, h("slot", { key: '608de84bfb0d09861796084ea51d2ef8d03d7289' }))));
    }
    static get is() { return "wdpr-chip-menu-group"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-chip-menu-group.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-chip-menu-group.css"]
        };
    }
    static get properties() {
        return {
            "header": {
                "type": "string",
                "attribute": "header",
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
                "reflect": false
            }
        };
    }
}
//# sourceMappingURL=wdpr-chip-menu-group.js.map
