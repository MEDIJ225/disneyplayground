import { h } from "@stencil/core";
import { RenderCardContent } from "../../utils/card-content-renderer";
export class WdprCardMicroContent {
    primaryHeadline;
    body;
    disabled = false;
    headingLevel = 'h3';
    render() {
        const props = {
            body: this.body,
            primaryHeadline: this.primaryHeadline,
            headingLevel: this.headingLevel,
        };
        return (h(RenderCardContent, { key: '1d216a795c58c508d5c4e05b611a70ab5ba14cf2', disabled: this.disabled, variant: 'micro', ...props }));
    }
    static get is() { return "wdpr-card-micro-content"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host { display: flex; align-items: center; width: 100%; }"; }
    static get properties() {
        return {
            "primaryHeadline": {
                "type": "string",
                "attribute": "primary-headline",
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
            },
            "body": {
                "type": "string",
                "attribute": "body",
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
            },
            "disabled": {
                "type": "boolean",
                "attribute": "disabled",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "headingLevel": {
                "type": "string",
                "attribute": "heading-level",
                "mutable": false,
                "complexType": {
                    "original": "HeadingLevel",
                    "resolved": "\"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\"",
                    "references": {
                        "HeadingLevel": {
                            "location": "import",
                            "path": "../../models/card.model",
                            "id": "src/models/card.model.ts::HeadingLevel"
                        }
                    }
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
                "defaultValue": "'h3'"
            }
        };
    }
}
//# sourceMappingURL=wdpr-card-micro-content.js.map
