import { h } from "@stencil/core";
export class WdprInlineMessage {
    // Variant for the status icon
    variant = 'success';
    // Size of the status icon
    size = 'default';
    /**
     * Optional ARIA role on the message.
     * - 'status' for polite live region announcements
     * - 'alert' for urgent/assertive announcements
     * - 'none' when the message is purely decorative/structural
     * If omitted, no role attribute is set.
     */
    role;
    /**
     * Optional override for aria-live on the message text.
     * If not set, defaults based on role: 'polite' for status, 'assertive' for alert, 'off' for none.
     */
    a11yLive;
    get validRole() {
        if (this.role === 'status' || this.role === 'alert' || this.role === 'none') {
            return this.role;
        }
        return undefined;
    }
    get computedAriaLive() {
        if (this.a11yLive) {
            return this.a11yLive;
        }
        switch (this.validRole) {
            case 'status': return 'polite';
            case 'alert': return 'assertive';
            case 'none': return 'off';
            default: return undefined;
        }
    }
    render() {
        const helperTextClass = `m-0 body-large ${textColorClasses[this.variant]} ${textSizesClasses[this.size]}`;
        return (h("section", { key: '1343717305ec886a4f48f6561b1f5047faf59eba', class: containerClasses, role: this.validRole }, h("wdpr-status-icon", { key: 'd0b128b6f7843dd8556e035ae5c04e456247688f', variant: this.variant, ariaLabel: this.variant, size: "xxsmall" }), h("p", { key: 'cff1f7f1c99d213d0860e8062b9cd402c781f7a2', class: helperTextClass, "aria-live": this.computedAriaLive }, h("slot", { key: '4cfdfe62b2b2c84882a3a013357598ad3171c7fc' }))));
    }
    static get is() { return "wdpr-inline-message"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-inline-message.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-inline-message.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "InlineMessageVariant",
                    "resolved": "\"error\" | \"informational\" | \"success\" | \"warning\"",
                    "references": {
                        "InlineMessageVariant": {
                            "location": "import",
                            "path": "./wdpr-inline-message.model",
                            "id": "src/components/wdpr-inline-message/wdpr-inline-message.model.ts::InlineMessageVariant"
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
                "defaultValue": "'success'"
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "InlineMessageSize",
                    "resolved": "\"default\" | \"small\"",
                    "references": {
                        "InlineMessageSize": {
                            "location": "import",
                            "path": "./wdpr-inline-message.model",
                            "id": "src/components/wdpr-inline-message/wdpr-inline-message.model.ts::InlineMessageSize"
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
                "defaultValue": "'default'"
            },
            "role": {
                "type": "string",
                "attribute": "role",
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
                    "text": "Optional ARIA role on the message.\n- 'status' for polite live region announcements\n- 'alert' for urgent/assertive announcements\n- 'none' when the message is purely decorative/structural\nIf omitted, no role attribute is set."
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "a11yLive": {
                "type": "string",
                "attribute": "a11y-live",
                "mutable": false,
                "complexType": {
                    "original": "'polite' | 'assertive' | 'off'",
                    "resolved": "\"assertive\" | \"off\" | \"polite\"",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Optional override for aria-live on the message text.\nIf not set, defaults based on role: 'polite' for status, 'assertive' for alert, 'off' for none."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
}
const containerClasses = "flex gap-100 items-start fit-content";
const textColorClasses = {
    success: 'text-text-status-success',
    informational: 'text-text-status-informational',
    warning: 'text-text-status-warning',
    error: 'text-text-status-critical',
};
const textSizesClasses = {
    small: 'body-medium',
    default: 'body-large',
};
//# sourceMappingURL=wdpr-inline-message.js.map
