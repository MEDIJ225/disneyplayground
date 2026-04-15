import { h, Host } from "@stencil/core";
import { generateRandId } from "../../../utils/utils";
export class WdprDropdownGroup {
    _internalId;
    header;
    componentWillLoad() {
        this._internalId = `wdpr-dropdown-group-${generateRandId()}`;
    }
    render() {
        return (h(Host, { key: '7011f3359871187b97f4a242897493339176314a' }, this.header && (h("span", { key: '3092e8c2d38bde8db3b51de8e448f80dc4713d5d', class: "dropdown-header", id: `${this._internalId}-header` }, this.header)), h("div", { key: 'c9db0134b510e4f3699ad5dbecefecc9a44bc433', class: "dropdown-group", role: "group", "aria-labelledby": this.header ? `${this._internalId}-header` : undefined }, h("slot", { key: '04f9873f5f734e7096736fd4c3a3ab22c047f4a1' }))));
    }
    static get is() { return "wdpr-dropdown-group"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-dropdown-group.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-dropdown-group.css"]
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
//# sourceMappingURL=wdpr-dropdown-group.js.map
