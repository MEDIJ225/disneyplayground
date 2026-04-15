import { h } from "@stencil/core";
export class WdprActionableListItem {
    /**
     * Reference to the component's host element.
     */
    el;
    /**
     * Unique ID for the list item.
     */
    itemId;
    /**
     * The main text to display in the header.
     */
    headerLabel;
    /**
     * The pre-header text to display above the main header. Hidden if empty.
     */
    preHeader;
    /**
     * The subtext to display below the header. The subtext is hidden if this is empty.
     */
    subtextLabel;
    /**
     * icon content for the leading-icon
     */
    headerLeadingIcon;
    /**
     * set the main Text size
     */
    headerSize;
    /**
     * The main text to display in the link
     */
    linkText;
    /**
     * The URL the link points to.
     */
    linkHref;
    /**
     * text icon name to add to the left of the link text
     */
    linkLeadingIcon;
    /**
     * text icon name to add at the right of the link text
     */
    linkTrailingIcon;
    /**
     * The visual style of the link.
     */
    linkVariant;
    /**
     * Specifies where to open the linked document.
     */
    linkTarget;
    /**
     * Sets an accessible label for the link.
     */
    linkA11yLabel;
    /**
     * Disables user interaction and applies disabled styling.
     */
    linkDisabled;
    /**
     * Specifies the relationship of the target object to the link object.
     */
    linkRel;
    render() {
        return (h("div", { key: '8288909d2961e4de8cc6cdd9f6a819fb4c5949e9', class: "flex flex-col items-start" }, h("wdpr-text-header", { key: 'b9a3cade2951c7e5a2dce585d4314edb0d0a6b01', size: this.headerSize, preHeader: this.preHeader, headerLabel: this.headerLabel, subtextLabel: this.subtextLabel }, this.headerLeadingIcon && h("wdpr-icon-library", { key: '526f65ec56e54b9ede3e3b8f3e3eca09844f20f4', size: "medium", icon: this.headerLeadingIcon, slot: "leading-icon" })), h("wdpr-text-link", { key: '4eb5fcfb9f0f35d06f403001cadca5f196dc6d46', variant: this.linkVariant, size: "xsmall", href: this.linkHref, target: this.linkTarget, a11yLabel: this.linkA11yLabel, disabled: this.linkDisabled, rel: this.linkRel }, this.linkLeadingIcon && h("wdpr-icon-library", { key: '2430e9479944c3ca08588176f280ae118eb9b9ff', icon: this.linkLeadingIcon, slot: "leading-icon" }), this.linkText && h("span", { key: '784e1502e6026449db7dde3a8bf2f98ffb2baac3' }, this.linkText), this.linkTrailingIcon && h("wdpr-icon-library", { key: 'aa5f90c5e8eb2373cfb8aaff0eba51ac9bb46ee4', icon: this.linkTrailingIcon, slot: "trailing-icon" }))));
    }
    static get is() { return "wdpr-actionable-list-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "itemId": {
                "type": "string",
                "attribute": "item-id",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Unique ID for the list item."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "headerLabel": {
                "type": "string",
                "attribute": "header-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The main text to display in the header."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "preHeader": {
                "type": "string",
                "attribute": "pre-header",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The pre-header text to display above the main header. Hidden if empty."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "subtextLabel": {
                "type": "string",
                "attribute": "subtext-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The subtext to display below the header. The subtext is hidden if this is empty."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "headerLeadingIcon": {
                "type": "string",
                "attribute": "header-leading-icon",
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
                    "text": "icon content for the leading-icon"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "headerSize": {
                "type": "string",
                "attribute": "header-size",
                "mutable": false,
                "complexType": {
                    "original": "TextHeaderSizes",
                    "resolved": "\"large\" | \"medium\" | \"small\"",
                    "references": {
                        "TextHeaderSizes": {
                            "location": "import",
                            "path": "../wdpr-text-header/wdpr-text-header.model",
                            "id": "src/components/wdpr-text-header/wdpr-text-header.model.ts::TextHeaderSizes"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "set the main Text size"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "linkText": {
                "type": "string",
                "attribute": "link-text",
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
                    "text": "The main text to display in the link"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "linkHref": {
                "type": "string",
                "attribute": "link-href",
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
                    "text": "The URL the link points to."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "linkLeadingIcon": {
                "type": "string",
                "attribute": "link-leading-icon",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "text icon name to add to the left of the link text"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "linkTrailingIcon": {
                "type": "string",
                "attribute": "link-trailing-icon",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "text icon name to add at the right of the link text"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "linkVariant": {
                "type": "string",
                "attribute": "link-variant",
                "mutable": false,
                "complexType": {
                    "original": "TextLinkVariants",
                    "resolved": "\"primary\" | \"primary-inverse\" | \"primary-underline\" | \"primary-underline-inverse\" | \"secondary\" | \"secondary-inverse\"",
                    "references": {
                        "TextLinkVariants": {
                            "location": "import",
                            "path": "../../models/text-link.types",
                            "id": "src/models/text-link.types.ts::TextLinkVariants"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The visual style of the link."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "linkTarget": {
                "type": "string",
                "attribute": "link-target",
                "mutable": false,
                "complexType": {
                    "original": "Target",
                    "resolved": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\"",
                    "references": {
                        "Target": {
                            "location": "import",
                            "path": "../../models/text-link.types",
                            "id": "src/models/text-link.types.ts::Target"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Specifies where to open the linked document."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "linkA11yLabel": {
                "type": "string",
                "attribute": "link-a-1-1y-label",
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
                    "text": "Sets an accessible label for the link."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "linkDisabled": {
                "type": "boolean",
                "attribute": "link-disabled",
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
                    "text": "Disables user interaction and applies disabled styling."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "linkRel": {
                "type": "string",
                "attribute": "link-rel",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Specifies the relationship of the target object to the link object."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-actionable-list-item.js.map
