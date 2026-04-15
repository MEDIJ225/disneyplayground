import { h, Host } from "@stencil/core";
import { generateRandId } from "../../../utils/utils";
export class WdprDualComboboxGroup {
    _internalId;
    _hideGroup = false;
    header;
    async hideGroup() {
        this._hideGroup = true;
    }
    async showGroup() {
        this._hideGroup = false;
    }
    componentWillLoad() {
        this._internalId = `wdpr-dual-combobox-group-${generateRandId()}`;
    }
    render() {
        return (h(Host, { key: 'f9045b629e3ff70e4fef2e4278686c36221b5392', class: `${this._hideGroup ? 'hidden' : ''}` }, this.header && (h("span", { key: '3ed84b4b1bfd3e836b7fcffee6badd7eee649885', class: "dual-combobox-header", id: `${this._internalId}-header` }, this.header)), h("div", { key: '7b6755b3d887638ed8ac2b31561fa42dce193bd5', class: "dual-combobox-group", role: "group", "aria-labelledby": this.header ? `${this._internalId}-header` : undefined }, h("slot", { key: 'e740bcfb066849a838162d97d5dae2a463432d8a' }))));
    }
    static get is() { return "wdpr-dual-combobox-group"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-dual-combobox-group.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-dual-combobox-group.css"]
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
    static get states() {
        return {
            "_hideGroup": {}
        };
    }
    static get methods() {
        return {
            "hideGroup": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "showGroup": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            }
        };
    }
}
//# sourceMappingURL=wdpr-dual-combobox-group.js.map
