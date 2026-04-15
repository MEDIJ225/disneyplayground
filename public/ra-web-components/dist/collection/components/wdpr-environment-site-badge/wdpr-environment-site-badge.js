import { h } from "@stencil/core";
/**
 * Environment + Site badge
 *
 * Renders a wdpr-badge with:
 * - Environment-specific styling (PROD / STAGE / LATEST)
 * - Site code (WDW / DLR / DLP)
 *
 * Visual styling is driven by CSS classes and ::part(surface)
 * so it can be themed from the outside.
 */
export class WdprEnvironmentSiteBadge {
    /**
     * Environment label shown in the badge.
     */
    environment = 'LATEST';
    /**
     * Site indicator shown in the badge.
     */
    site = 'WDW';
    /**
     * When true, only the environment text is rendered
     * (e.g., "PROD" instead of "PROD • WDW").
     */
    environmentOnly = false;
    get _badgeClass() {
        switch (this.environment) {
            case 'PROD':
                return 'env-badge env-badge-prod';
            case 'STAGE':
                return 'env-badge env-badge-stage';
            case 'LATEST':
            default:
                return 'env-badge env-badge-latest';
        }
    }
    get _label() {
        if (this.environmentOnly) {
            return this.environment;
        }
        return `${this.environment} • ${this.site}`;
    }
    render() {
        return (h("wdpr-badge", { key: '5c0c606ccd54a58fabde29b7c15003412120222b', class: this._badgeClass, "surface-class": "leading-component-small tracking-02", variant: "neutral", label: this._label, role: "none" }));
    }
    static get is() { return "wdpr-environment-site-badge"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["./wdpr-environment-site-badge.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-environment-site-badge.css"]
        };
    }
    static get properties() {
        return {
            "environment": {
                "type": "string",
                "attribute": "environment",
                "mutable": false,
                "complexType": {
                    "original": "EnvironmentBadgeEnvironment",
                    "resolved": "\"LATEST\" | \"PROD\" | \"STAGE\"",
                    "references": {
                        "EnvironmentBadgeEnvironment": {
                            "location": "import",
                            "path": "../../models/environment-site-badge.model",
                            "id": "src/models/environment-site-badge.model.ts::EnvironmentBadgeEnvironment"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Environment label shown in the badge."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'LATEST'"
            },
            "site": {
                "type": "string",
                "attribute": "site",
                "mutable": false,
                "complexType": {
                    "original": "EnvironmentBadgeSite",
                    "resolved": "\"DLP\" | \"DLR\" | \"WDW\"",
                    "references": {
                        "EnvironmentBadgeSite": {
                            "location": "import",
                            "path": "../../models/environment-site-badge.model",
                            "id": "src/models/environment-site-badge.model.ts::EnvironmentBadgeSite"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Site indicator shown in the badge."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'WDW'"
            },
            "environmentOnly": {
                "type": "boolean",
                "attribute": "environment-only",
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
                    "text": "When true, only the environment text is rendered\n(e.g., \"PROD\" instead of \"PROD \u2022 WDW\")."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
}
//# sourceMappingURL=wdpr-environment-site-badge.js.map
