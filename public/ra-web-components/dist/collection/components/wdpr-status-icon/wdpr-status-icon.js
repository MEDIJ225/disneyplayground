import { h } from "@stencil/core";
import { twMerge } from "../../utils/utils";
export class WdprStatusIcon {
    /** Access to the host element */
    hostEl;
    /** Variant for the status icon */
    variant = 'success';
    /** Icon size */
    size = 'xsmall';
    /** ARIA label for the status icon */
    ariaLabel;
    getContainerClasses() {
        const sizeClasses = {
            xsmall: 'h-300 w-300',
            xxsmall: 'h-250 w-250',
        };
        const variantClasses = {
            success: 'bg-surface-status-success-alt text-text-status-success',
            informational: 'bg-surface-status-informational-alt text-text-status-informational',
            warning: 'bg-surface-status-warning-alt text-text-status-warning',
            error: 'bg-surface-status-critical-alt text-text-status-critical',
        };
        return twMerge('inline-flex items-center justify-center rounded-pill', sizeClasses[this.size], variantClasses[this.variant]);
    }
    render() {
        return (h("div", { key: '1eb52aeb86724b8591e8765cc9f7f131353ca46d', class: this.getContainerClasses() }, h("wdpr-icon-library", { key: 'e1d737eaf9bf7e483ba92c694cd26688e4bd1ff1', icon: this.iconName, size: this.size, a11yLabel: this.ariaLabel })));
    }
    get iconName() {
        switch (this.variant) {
            case 'success': return 'checkmark';
            case 'informational': return 'info';
            case 'warning': return 'alert';
            case 'error': return 'alert-notification-1';
        }
    }
    static get is() { return "wdpr-status-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-status-icon.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-status-icon.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "StatusVariant",
                    "resolved": "\"error\" | \"informational\" | \"success\" | \"warning\"",
                    "references": {
                        "StatusVariant": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-status-icon/wdpr-status-icon.tsx",
                            "id": "src/components/wdpr-status-icon/wdpr-status-icon.tsx::StatusVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Variant for the status icon"
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
                    "original": "StatusSize",
                    "resolved": "\"xsmall\" | \"xxsmall\"",
                    "references": {
                        "StatusSize": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-status-icon/wdpr-status-icon.tsx",
                            "id": "src/components/wdpr-status-icon/wdpr-status-icon.tsx::StatusSize"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Icon size"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'xsmall'"
            },
            "ariaLabel": {
                "type": "string",
                "attribute": "aria-label",
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
                    "text": "ARIA label for the status icon"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get elementRef() { return "hostEl"; }
}
//# sourceMappingURL=wdpr-status-icon.js.map
