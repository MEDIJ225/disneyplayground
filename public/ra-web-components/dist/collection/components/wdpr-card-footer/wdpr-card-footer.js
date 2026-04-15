import { h } from "@stencil/core";
export class WdprCardFooter {
    headTitle;
    description;
    linkText;
    linkHref = '#';
    linkPosition = 'bottom';
    icon;
    showMoreOptions = false;
    variant = 'general';
    disabled = false;
    async setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    get iconVariantColor() {
        if (this.disabled) {
            return 'neutral';
        }
        switch (this.variant) {
            case 'warning':
                return 'warning';
            case 'critical':
                return 'error';
            case 'general':
                return 'secondary';
            default:
                return 'info';
        }
    }
    get iconName() {
        if (this.icon && this.variant === 'general') {
            return this.icon;
        }
        switch (this.variant) {
            case 'informational':
                return 'info';
            case 'warning':
                return 'alert';
            case 'critical':
                return 'alert-notification-1';
            case 'general':
                return this.icon || 'info';
            default:
                return 'info';
        }
    }
    _renderLink() {
        if (this.linkText && this.linkHref) {
            return (h("wdpr-text-link", { size: "xxsmall", href: this.linkHref, disabled: this.disabled }, this.linkText, h("wdpr-icon-library", { slot: "trailing-icon", icon: "next-caret-2.0", size: "xxsmall", decorative: true })));
        }
        return null;
    }
    render() {
        const footerBgClasses = this.disabled ? 'bg-surface-actionable-card-disabled' : 'bg-surface-default';
        const footerBorderTopClasses = 'border-t border-solid border-stroke-default';
        const footerTextClasses = this.disabled ? 'text-text-disabled' : 'text-text-heading';
        const footerOpacityClasses = this.disabled ? 'opacity-200' : '';
        return (h("div", { key: '6ba0063d0cae5cddd3752bae6b7105fd9f9c13c2', id: 'card-footer', class: `${footerBgClasses} ${footerBorderTopClasses} box-border flex p-200 w-full` }, this.variant === 'swap' ? h("div", { class: 'flex justify-center items-center w-full' }, h("slot", null)) :
            h("div", { class: 'flex w-full gap-3 items-start' }, h("wdpr-icon", { class: footerOpacityClasses, variant: this.iconVariantColor, icon: this.iconName, size: "xxsmall", background: "circle" }), h("div", { class: "flex flex-col grow items-start justify-center h-full" }, this.linkPosition === 'top' && this._renderLink(), h("div", { id: 'card-footer-title', class: `${footerTextClasses} font-bold component-small w-full` }, this.headTitle), h("div", { id: 'card-footer-description', class: `${footerTextClasses} min-w-full body-small` }, this.description), this.linkPosition === 'bottom' && this._renderLink()), h("div", { class: 'flex items-center justify-center min-w-400' }, h("slot", { name: "actions" })))));
    }
    static get is() { return "wdpr-card-footer"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host { width: 100%; }"; }
    static get properties() {
        return {
            "headTitle": {
                "type": "string",
                "attribute": "head-title",
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
            "description": {
                "type": "string",
                "attribute": "description",
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
                    "text": ""
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'#'"
            },
            "linkPosition": {
                "type": "string",
                "attribute": "link-position",
                "mutable": false,
                "complexType": {
                    "original": "'top' | 'bottom'",
                    "resolved": "\"bottom\" | \"top\"",
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
                "defaultValue": "'bottom'"
            },
            "icon": {
                "type": "string",
                "attribute": "icon",
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
            "showMoreOptions": {
                "type": "boolean",
                "attribute": "show-more-options",
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
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "'informational' | 'warning' | 'critical' | 'swap' | 'general'",
                    "resolved": "\"critical\" | \"general\" | \"informational\" | \"swap\" | \"warning\"",
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
                "defaultValue": "'general'"
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
            }
        };
    }
    static get methods() {
        return {
            "setDisabledState": {
                "complexType": {
                    "signature": "(isDisabled: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "isDisabled",
                            "type": "boolean",
                            "docs": ""
                        }],
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
//# sourceMappingURL=wdpr-card-footer.js.map
