import { h } from "@stencil/core";
import { RenderCardContent } from "../../utils/card-content-renderer";
export class WdprCardMediumContent {
    primaryHeadline;
    featureHeadline;
    headlineLabel;
    headlineSubtext;
    body;
    bullets;
    disabled = false;
    headingLevel = 'h3';
    render() {
        const props = {
            primaryHeadline: this.primaryHeadline,
            featureHeadline: this.featureHeadline,
            headlineLabel: this.headlineLabel,
            headlineSubtext: this.headlineSubtext,
            body: this.body,
            bullets: this.bullets,
            headingLevel: this.headingLevel,
        };
        return (h(RenderCardContent, { key: '81033bfd4e93b504e1dd47221da9e20641ecade2', disabled: this.disabled, variant: 'medium', ...props }));
    }
    static get is() { return "wdpr-card-medium-content"; }
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
            "featureHeadline": {
                "type": "string",
                "attribute": "feature-headline",
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
            "headlineLabel": {
                "type": "string",
                "attribute": "headline-label",
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
            "headlineSubtext": {
                "type": "string",
                "attribute": "headline-subtext",
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
//# sourceMappingURL=wdpr-card-medium-content.js.map
