import { h } from "@stencil/core";
export class WdprCardStatusLabel {
    label;
    variant = 'informational';
    get variantClasses() {
        return {
            success: 'bg-surface-status-success-alt-2',
            warning: 'bg-surface-status-warning-alt-2',
            informational: 'bg-surface-status-informational-alt-2',
            error: 'bg-surface-status-critical',
        };
    }
    ;
    get textColor() {
        return {
            success: 'text-text-status-success',
            warning: 'text-text-status-warning',
            informational: 'text-text-body',
            error: 'text-text-inverse',
        };
    }
    ;
    get iconName() {
        switch (this.variant) {
            case 'success':
                return 'checkmark';
            case 'warning':
                return 'alert';
            case 'error':
                return 'alert-notification-1';
            case 'informational':
                return 'info';
        }
    }
    ;
    render() {
        const variantBg = this.variantClasses[this.variant];
        const textColor = this.textColor[this.variant];
        const showIcon = true;
        const containerClasses = `box-border flex h-dimension-450 items-center py-112 px-200 w-full ${variantBg} ${textColor}`;
        return (h("div", { key: '848b65324fb5484c6ad814cf5f7f46c55ccd2fad', class: containerClasses }, showIcon &&
            h("div", { key: 'cd8650fe7e6c085bc0fe6271426e36c35c061467', class: textColor }, h("wdpr-icon-library", { key: 'eab1a91670eeb73d8859da88908245501d25cd65', icon: this.iconName, size: "xxsmall" })), h("div", { key: '13f2d3aaa8b2c1fcc5484d6fc83742b3ce304044', class: "font-body-alt component-small w-full pl-050 pt-025" }, this.label)));
    }
    static get is() { return "wdpr-card-status-label"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host { width: 100%; }"; }
    static get properties() {
        return {
            "label": {
                "type": "string",
                "attribute": "label",
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
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "StatusLabelVariant",
                    "resolved": "\"error\" | \"informational\" | \"success\" | \"warning\"",
                    "references": {
                        "StatusLabelVariant": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-card-status-label/wdpr-card-status-label.tsx",
                            "id": "src/components/wdpr-card-status-label/wdpr-card-status-label.tsx::StatusLabelVariant"
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
                "defaultValue": "'informational'"
            }
        };
    }
}
//# sourceMappingURL=wdpr-card-status-label.js.map
