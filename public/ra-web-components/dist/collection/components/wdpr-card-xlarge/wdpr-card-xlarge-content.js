import { h } from "@stencil/core";
import { RenderCardContent } from "../../utils/card-content-renderer";
export class WdprCardXlargeContent {
    disabled = false;
    headlineLabel;
    headingLevel = 'h1';
    headlineSubtext;
    hasGradient = false;
    isMobile = false;
    primaryHeadline;
    tagLabel;
    topPadding = false;
    headlineSize = 'xlarge';
    subHeadlineSize = 'large';
    tagSize = 'large';
    render() {
        const props = {
            primaryHeadline: this.primaryHeadline,
            headlineLabel: this.headlineLabel,
            headlineSubtext: this.headlineSubtext,
            headingLevel: this.headingLevel,
            hasGradient: this.hasGradient,
            isMobile: this.isMobile,
            tagLabel: this.tagLabel,
            topPadding: this.topPadding,
            headlineSize: this.headlineSize,
            subHeadlineSize: this.subHeadlineSize,
            tagSize: this.tagSize,
        };
        return (h(RenderCardContent, { key: '4ec4d95be38dd10350ec86fbe0b2b41d7fbfc66d', disabled: this.disabled, variant: 'xlarge', ...props }));
    }
    static get is() { return "wdpr-card-xlarge-content"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
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
                "defaultValue": "'h1'"
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
            "hasGradient": {
                "type": "boolean",
                "attribute": "has-gradient",
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
            "isMobile": {
                "type": "boolean",
                "attribute": "is-mobile",
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
            "tagLabel": {
                "type": "string",
                "attribute": "tag-label",
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
            "topPadding": {
                "type": "boolean",
                "attribute": "top-padding",
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
            "headlineSize": {
                "type": "string",
                "attribute": "headline-size",
                "mutable": false,
                "complexType": {
                    "original": "'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'",
                    "resolved": "\"large\" | \"medium\" | \"small\" | \"xlarge\" | \"xsmall\"",
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
                "defaultValue": "'xlarge'"
            },
            "subHeadlineSize": {
                "type": "string",
                "attribute": "sub-headline-size",
                "mutable": false,
                "complexType": {
                    "original": "'small' | 'large'",
                    "resolved": "\"large\" | \"small\"",
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
                "defaultValue": "'large'"
            },
            "tagSize": {
                "type": "string",
                "attribute": "tag-size",
                "mutable": false,
                "complexType": {
                    "original": "'small' | 'large'",
                    "resolved": "\"large\" | \"small\"",
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
                "defaultValue": "'large'"
            }
        };
    }
}
//# sourceMappingURL=wdpr-card-xlarge-content.js.map
