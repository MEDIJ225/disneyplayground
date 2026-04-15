import { h, Host } from "@stencil/core";
export class WdprBreadcrumbItem {
    /**
     * Reference to host element
     * @type {HTMLWdprBreadcrumbItemElement}
     */
    el;
    /**
     * @internal
     * Marks if the leading slot has content or not
     * @default false
     * @type {boolean}
     */
    _hasLeadingIcon = false;
    /**
     * @internal
     * Marks if the trailing slot has content or not
     * @default false
     * @type {boolean}
     */
    _hasTrailingIcon = false;
    /**
     * Flag to indicate if this breadcrumb item is the first one in the breadcrumb list.
     * @internal
     */
    _first;
    /**
     * Flag to indicate if this breadcrumb item is the last one in the breadcrumb list.
     * @internal
     */
    _last;
    /**
     * If true, shows a truncation marker (`…`) for this breadcrumb item.
     * Used internally by `WdprBreadcrumb` to collapse the item on smaller screens.
     * @internal
     * Design remove the truncation in Design 1.2.0 but not really clear how they want to handle this, we will leave it and change the logic if needed
     */
    showTruncation = false;
    /**
     * The URL to navigate to when the item is clicked.
     * @type {string}
     */
    href;
    /**
     * The target attribute of the item. Possible values: '_blank', '_self', '_parent', '_top'.
     * @type {string}
     */
    target = '_self';
    /**
     * If true, show a separator between this breadcrumb and the next.
     * @type {boolean}
     */
    separator = false;
    /**
     * **Required** The text to display in the item.
     * @type {string}
     */
    label;
    /**
     * The variant of the text item.
     * @type {TextLinkVariants}
     */
    variant;
    /**
     * The size of the text link. Possible values: 'xxsmall', 'xsmall', 'small', 'medium', 'large'.
     * @type {TextLinkSizes}
     */
    size = 'small';
    /**
     * The rel attribute of the item.
     * @type {string}
     */
    rel;
    truncationClick;
    /**
     * Marks this item as the first breadcrumb in the sequence.
     * Should only be called internally by `<wdpr-breadcrumb>`.
     * @internal
     */
    async setFirstBreadcrumb() {
        this._first = true;
    }
    /**
     * Marks this item as the last breadcrumb in the sequence.
     * Should only be called internally by `<wdpr-breadcrumb>`.
     * @internal
     */
    async setLastBreadcrumb() {
        this._last = true;
    }
    componentWillLoad() {
        this._hasLeadingIcon = !!this.el.querySelector('[slot="leading-icon"]');
        this._hasTrailingIcon = !!this.el.querySelector('[slot="trailing-icon"]');
    }
    _handleTruncationClick = () => {
        this.truncationClick.emit();
    };
    get _isInverseVariant() {
        return this.variant?.includes('inverse') || false;
    }
    get _separatorColorClass() {
        if (this._isInverseVariant) {
            return 'text-text-inverse';
        }
        return 'text-text-body';
    }
    render() {
        const { _first, _last, separator, target, label, size, showTruncation, _hasLeadingIcon, _hasTrailingIcon } = this;
        const href = this.href ?? '';
        const variant = this.variant ?? (_last ? 'secondary' : 'primary-underline');
        const attrs = { href, target, variant, size };
        const showSeparator = _last ? false : separator;
        const firstBreadcrumb = _first;
        return (h(Host, { key: 'f4f880a16c40e790bc2520ed6a99b480b6dc7527', role: "listitem", "data-first": firstBreadcrumb ? '' : undefined }, h("div", { key: 'c4435cc133ba9b356d080cedc3c1f1ec33669433', class: "flex items-center gap-100", part: "wrapper" }, h("span", { key: '859bea44b227f49da35626207cebe185ab01c646', class: `${showTruncation ? 'hidden' : ''}` }, h("wdpr-text-link", { key: 'b0773f483611fa5527c08e08597df4fbeb675e0f', ...attrs, "aria-current": _last ? 'page' : undefined, rel: this.rel }, _hasLeadingIcon && h("slot", { key: '6fc622b6f08317251a6a848bb986519e791f97a5', name: "leading-icon", slot: "leading-icon" }), h("span", { key: '1f438e9bebc55bc56de23bfa142a84daee9a37f3', class: `${firstBreadcrumb ? 'hidden md:block' : null}` }, label), _hasTrailingIcon && h("slot", { key: 'd32c552126d9e9d3763517b85c6c9b96fcbe3b89', name: "trailing-icon", slot: "trailing-icon" }))), showTruncation && (h("wdpr-icon-button", { key: 'ba180df4c9478387102dedd5c88cf0611a4432d9', variant: this._isInverseVariant ? 'inverse' : 'secondary', iconName: "more", size: "small", a11yLabel: "Show all breadcrumbs", onClicked: this._handleTruncationClick })), showSeparator && (h("span", { key: '45e597617024bcbbeaab5dacd45bb1ae6c8a6037', part: "separator", "aria-hidden": "true" }, h("slot", { key: '2fa98502af796c5d80e56128dc01d409c689377f', name: "separator" }, h("wdpr-icon-library", { key: 'bd934a8825811dd43b099ae0a3af29e4450032a6', class: this._separatorColorClass, size: "xsmall", icon: "next" })))))));
    }
    static get is() { return "wdpr-breadcrumb-item"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host(.hidden) {\n      display: none;\n    }\n    :host([data-first]) {\n      --wdpr-text-link-text-display: none;\n    }\n    @media (min-width: 768px) {\n      :host([data-first]) {\n        --wdpr-text-link-text-display: inline;\n      }\n    }"; }
    static get properties() {
        return {
            "showTruncation": {
                "type": "boolean",
                "attribute": "show-truncation",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": "Design remove the truncation in Design 1.2.0 but not really clear how they want to handle this, we will leave it and change the logic if needed"
                        }],
                    "text": "If true, shows a truncation marker (`\u2026`) for this breadcrumb item.\nUsed internally by `WdprBreadcrumb` to collapse the item on smaller screens."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "href": {
                "type": "string",
                "attribute": "href",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The URL to navigate to when the item is clicked."
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "target": {
                "type": "string",
                "attribute": "target",
                "mutable": false,
                "complexType": {
                    "original": "Target",
                    "resolved": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\"",
                    "references": {
                        "Target": {
                            "location": "import",
                            "path": "../../../models/text-link.types",
                            "id": "src/models/text-link.types.ts::Target"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The target attribute of the item. Possible values: '_blank', '_self', '_parent', '_top'."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'_self'"
            },
            "separator": {
                "type": "boolean",
                "attribute": "separator",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{boolean}"
                        }],
                    "text": "If true, show a separator between this breadcrumb and the next."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "label": {
                "type": "string",
                "attribute": "label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "**Required** The text to display in the item."
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "TextLinkVariants",
                    "resolved": "\"primary\" | \"primary-inverse\" | \"primary-underline\" | \"primary-underline-inverse\" | \"secondary\" | \"secondary-inverse\"",
                    "references": {
                        "TextLinkVariants": {
                            "location": "import",
                            "path": "../../../models/text-link.types",
                            "id": "src/models/text-link.types.ts::TextLinkVariants"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{TextLinkVariants}"
                        }],
                    "text": "The variant of the text item."
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "TextLinkSizes",
                    "resolved": "\"large\" | \"medium\" | \"small\" | \"xsmall\" | \"xxsmall\"",
                    "references": {
                        "TextLinkSizes": {
                            "location": "import",
                            "path": "../../../models/text-link.types",
                            "id": "src/models/text-link.types.ts::TextLinkSizes"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{TextLinkSizes}"
                        }],
                    "text": "The size of the text link. Possible values: 'xxsmall', 'xsmall', 'small', 'medium', 'large'."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'small'"
            },
            "rel": {
                "type": "string",
                "attribute": "rel",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The rel attribute of the item."
                },
                "getter": false,
                "setter": false,
                "reflect": true
            }
        };
    }
    static get states() {
        return {
            "_hasLeadingIcon": {},
            "_hasTrailingIcon": {},
            "_first": {},
            "_last": {}
        };
    }
    static get events() {
        return [{
                "method": "truncationClick",
                "name": "truncationClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "setFirstBreadcrumb": {
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
                    "text": "Marks this item as the first breadcrumb in the sequence.\nShould only be called internally by `<wdpr-breadcrumb>`.",
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }]
                }
            },
            "setLastBreadcrumb": {
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
                    "text": "Marks this item as the last breadcrumb in the sequence.\nShould only be called internally by `<wdpr-breadcrumb>`.",
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-breadcrumb-item.js.map
