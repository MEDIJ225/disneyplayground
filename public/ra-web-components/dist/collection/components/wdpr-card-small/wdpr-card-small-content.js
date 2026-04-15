import { h } from "@stencil/core";
import { RenderCardContent } from "../../utils/card-content-renderer";
export class WdprCardSmallContent {
    primaryHeadline;
    body;
    bullets;
    contentType = 'stacked';
    disabled = false;
    inverseColor = false;
    headingLevel = 'h3';
    render() {
        const props = {
            contentType: this.contentType,
            body: this.body,
            bullets: this.bullets,
            primaryHeadline: this.primaryHeadline,
            headingLevel: this.headingLevel,
            inverseColor: this.inverseColor,
        };
        return (h(RenderCardContent, { key: '2174af593674f2a11fca88d96b5e731845f09659', disabled: this.disabled, variant: 'small', ...props }));
    }
    static get is() { return "wdpr-card-small-content"; }
    static get encapsulation() { return "shadow"; }
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
            "bullets": {
                "type": "unknown",
                "attribute": "bullets",
                "mutable": false,
                "complexType": {
                    "original": "string[]",
                    "resolved": "string[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "contentType": {
                "type": "string",
                "attribute": "content-type",
                "mutable": false,
                "complexType": {
                    "original": "'stacked' | 'body'",
                    "resolved": "\"body\" | \"stacked\"",
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
                "defaultValue": "'stacked'"
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
            "inverseColor": {
                "type": "boolean",
                "attribute": "inverse-color",
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
//# sourceMappingURL=wdpr-card-small-content.js.map
