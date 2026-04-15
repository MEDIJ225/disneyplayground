import { h, Host } from "@stencil/core";
import { generateRandId } from "../../../utils/utils";
export class WdprComboboxGroup {
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
        this._internalId = `wdpr-combobox-group-${generateRandId()}`;
    }
    render() {
        return (h(Host, { key: 'b83884c63749e528c8a74c29d8c55e20ecb3ac1e', class: `${this._hideGroup ? 'hidden' : ''}` }, this.header && (h("span", { key: '9ff1edd97f7e1bbd8043ebb362557b6e5c6731f5', class: "combobox-header", id: `${this._internalId}-header` }, this.header)), h("div", { key: '9fd39d0f95ee328170516eaf5febb0bea55a57a1', class: "combobox-group", role: "group", "aria-labelledby": this.header ? `${this._internalId}-header` : undefined }, h("slot", { key: '3c9c8e0475c892320f36ce5144068f555be5a03d' }))));
    }
    static get is() { return "wdpr-combobox-group"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-combobox-group.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-combobox-group.css"]
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
//# sourceMappingURL=wdpr-combobox-group.js.map
