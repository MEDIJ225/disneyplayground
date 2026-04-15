import { h } from "@stencil/core";
import { forwardCommonHostAttributes, customTwMerge } from "../../utils/utils";
export class WdprBadge {
    el;
    /** Badge text label */
    label = '';
    /** Badge location style */
    location = 'overlay';
    /** Badge visual variant (maps to surface variant + text color) */
    variant = 'neutral';
    /** Optional explicit icon name */
    iconName;
    /** Icon size from the icon library */
    iconSize = 'xxsmall';
    /**
     * Optional accessible name for the icon.
     * If provided, the icon will expose role="img" + aria-label on the same element.
     * If omitted, the icon will be treated as decorative (aria-hidden="true").
     */
    iconLabel;
    /**
     * Optional ARIA role on the badge host.
     * - 'status' or 'alert' for live regions
     * - 'none' when the badge is purely decorative/structural
     * If omitted, no role attribute is set.
     */
    role = '';
    /**
     * Extra classes merged onto the badge surface (after defaults).
     * Use to override layout/typography for specific compositions (e.g. fixed component-small line-height).
     */
    surfaceClass;
    get validRole() {
        if (this.role === 'status' || this.role === 'alert' || this.role === 'none') {
            return this.role;
        }
        return undefined;
    }
    /** Map BadgeVariant → wdpr-surface-style variant */
    get surfaceVariant() {
        const map = {
            'neutral': 'neutral-extra-bright-small',
            'success': 'success-extra-bright-small',
            'warning': 'warning-extra-bright-small',
            'error': 'critical-extra-bright-small',
            'informational': 'informational-extra-bright-small',
            'top-pick': 'top-pick-extra-bright-small',
            'dark': 'dark',
        };
        return map[this.variant];
    }
    get surfaceCustomClasses() {
        const variantClasses = {
            'neutral': 'text-text-status-neutral',
            'success': 'text-text-status-success',
            'warning': 'text-text-status-warning',
            'error': 'text-text-status-critical',
            'informational': 'text-text-status-informational',
            'top-pick': 'text-text-status-top-pick',
            'dark': 'text-text-default',
        };
        const locationClasses = {
            'overlay': 'py-050 px-100 md:py-075 md:px-125',
            'inline': 'py-025 px-050 md:py-050 md:px-100',
        };
        const inlineNeutralNoStroke = this.location === 'inline' && this.variant === 'neutral' ? 'border-transparent' : '';
        return customTwMerge('inline-flex items-center whitespace-nowrap gap-050', 'text-component-small font-component-default leading-component-medium tracking-default md:leading-component-small md:tracking-02', variantClasses[this.variant], locationClasses[this.location], inlineNeutralNoStroke, this.surfaceClass);
    }
    renderIcon() {
        if (!this.iconName)
            return null;
        // If iconLabel is provided → meaningful icon (role="img" handled internally)
        // Otherwise → decorative (aria-hidden="true" handled internally)
        const a11yProps = this.iconLabel ? { a11yLabel: this.iconLabel, decorative: false } : { decorative: true };
        return h("wdpr-icon-library", { icon: this.iconName, size: this.iconSize, ...a11yProps });
    }
    render() {
        return (h("wdpr-surface-style", { key: '9582aeec63cc68ba930b6575351c52fe3fc175e3', ...forwardCommonHostAttributes(this.el), role: this.validRole, variant: this.surfaceVariant, padding: "none", customClass: this.surfaceCustomClasses, exportparts: "surface" }, this.renderIcon(), h("span", { key: '212137a09e0eab9d73ad8a9052a746f4bb87c9bb', part: "label" }, this.label)));
    }
    static get is() { return "wdpr-badge"; }
    static get encapsulation() { return "shadow"; }
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
                    "text": "Badge text label"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
            "location": {
                "type": "string",
                "attribute": "location",
                "mutable": false,
                "complexType": {
                    "original": "'overlay' | 'inline'",
                    "resolved": "\"inline\" | \"overlay\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Badge location style"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'overlay'"
            },
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "BadgeVariant",
                    "resolved": "\"dark\" | \"error\" | \"informational\" | \"neutral\" | \"success\" | \"top-pick\" | \"warning\"",
                    "references": {
                        "BadgeVariant": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-badge/wdpr-badge.tsx",
                            "id": "src/components/wdpr-badge/wdpr-badge.tsx::BadgeVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Badge visual variant (maps to surface variant + text color)"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'neutral'"
            },
            "iconName": {
                "type": "string",
                "attribute": "icon-name",
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
                    "text": "Optional explicit icon name"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "iconSize": {
                "type": "string",
                "attribute": "icon-size",
                "mutable": false,
                "complexType": {
                    "original": "BadgeIconSize",
                    "resolved": "\"small\" | \"xsmall\" | \"xxsmall\"",
                    "references": {
                        "BadgeIconSize": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-badge/wdpr-badge.tsx",
                            "id": "src/components/wdpr-badge/wdpr-badge.tsx::BadgeIconSize"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Icon size from the icon library"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'xxsmall'"
            },
            "iconLabel": {
                "type": "string",
                "attribute": "icon-label",
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
                    "text": "Optional accessible name for the icon.\nIf provided, the icon will expose role=\"img\" + aria-label on the same element.\nIf omitted, the icon will be treated as decorative (aria-hidden=\"true\")."
                },
                "getter": false,
                "setter": false,
                "reflect": false
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
                    "text": "Optional ARIA role on the badge host.\n- 'status' or 'alert' for live regions\n- 'none' when the badge is purely decorative/structural\nIf omitted, no role attribute is set."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "''"
            },
            "surfaceClass": {
                "type": "string",
                "attribute": "surface-class",
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
                    "text": "Extra classes merged onto the badge surface (after defaults).\nUse to override layout/typography for specific compositions (e.g. fixed component-small line-height)."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-badge.js.map
