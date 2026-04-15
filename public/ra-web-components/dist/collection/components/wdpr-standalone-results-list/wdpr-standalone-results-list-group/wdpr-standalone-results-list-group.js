import { h } from "@stencil/core";
import { generateRandId } from "../../../utils/utils";
export class WdprStandaloneResultsListGroup {
    _internalId;
    el;
    header;
    componentWillLoad() {
        this._internalId = `wdpr-standalone-results-list-group-${generateRandId()}`;
    }
    render() {
        return (h("div", { key: '2ce65c78eba6233aedbfd6509a4f1d479bc7512a', class: "flex flex-col gap-y-100" }, this.header && (h("span", { key: '254cf728dfe14f12cf10b4355a81bad8828404a7', class: "body-medium text-text-heading", id: `${this._internalId}-header` }, this.header)), h("ul", { key: this._internalId, class: "flex flex-col gap-y-100", "aria-labelledby": `${this.header ? `${this._internalId}-header` : ''}` }, h("slot", { key: 'a5dd173d14a74bee588e10d054b2238003d369c1' }))));
    }
    static get is() { return "wdpr-standalone-results-list-group"; }
    static get encapsulation() { return "shadow"; }
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
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-standalone-results-list-group.js.map
