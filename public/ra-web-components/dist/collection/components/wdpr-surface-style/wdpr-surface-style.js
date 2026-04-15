// wdpr-surface-style.tsx
import { h } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
import { SURFACE_STYLE_CONFIG, SEMANTIC_ROLES } from "./wdpr-surface-style.model";
export class WdprSurfaceStyle {
    el;
    /**
     * Surface variant style
     */
    variant = 'none';
    /**
     * Padding inside the surface
     */
    padding = 'none';
    /**
     * Additional custom CSS classes
     */
    customClass;
    /**
     * ARIA role for the surface
     */
    role;
    /**
     * ARIA label for accessibility
     */
    a11yLabel;
    /**
     * Whether the surface is selected (only applies to actionable variants)
     */
    selected = false;
    /**
     * Whether the surface is disabled (only applies to actionable variants)
     */
    disabled = false;
    _getActionableStateClasses() {
        if (!this._isActionableVariant()) {
            return '';
        }
        const config = SURFACE_STYLE_CONFIG.actionableVariantMap[this.variant];
        if (!config)
            return '';
        const stateConfig = this.selected && config.selected ? config.selected : config.default;
        let cssClasses = '';
        if (this.disabled) {
            if (stateConfig.disabled) {
                cssClasses = stateConfig.disabled;
            }
            else {
                cssClasses = customTwMerge(cssClasses, 'bg-surface-actionable-card-disabled border-stroke-disabled cursor-not-allowed');
            }
        }
        else {
            cssClasses = customTwMerge(cssClasses, stateConfig.default, stateConfig.hover, stateConfig.active);
        }
        return cssClasses;
    }
    _isActionableVariant() {
        return Object.prototype.hasOwnProperty.call(SURFACE_STYLE_CONFIG.actionableVariantMap, this.variant);
    }
    _getSurfaceClasses() {
        const baseClasses = 'block w-full';
        const paddingClasses = SURFACE_STYLE_CONFIG.paddingMap[this.padding];
        const variantClass = SURFACE_STYLE_CONFIG.staticVariantMap[this.variant];
        const stateClasses = this._getActionableStateClasses();
        return customTwMerge(baseClasses, paddingClasses, variantClass, stateClasses, this.customClass);
    }
    _getSemanticRole() {
        if (this.role)
            return this.role;
        return SEMANTIC_ROLES[this.variant];
    }
    _getOverlayActionClasses() {
        return customTwMerge('absolute inset-0 w-full h-full z-[1]', 'bg-transparent border-none m-0 p-0', 'cursor-pointer appearance-none', 'focus:outline-none', 'rounded-[inherit]', 'focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-focus focus-visible:outline-stroke-actionable-focused');
    }
    render() {
        const role = this._getSemanticRole();
        const isActionable = this._isActionableVariant();
        return (h("div", { key: '0ac0b257b6deec23abe9240f4bc6f18ac22ceca2', class: customTwMerge(this._getSurfaceClasses(), 'relative'), role: role, part: "surface" }, h("slot", { key: 'e5afa413d4aa1c54ae7bb06b96fda414c11ed99f' }), isActionable && (h("button", { key: 'b33e8a7b82e0a31c2cac62841938762e740b81f6', type: "button", disabled: this.disabled, "aria-pressed": this.selected ? 'true' : 'false', "aria-label": this.a11yLabel, class: this._getOverlayActionClasses() }))));
    }
    static get is() { return "wdpr-surface-style"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "SurfaceVariant",
                    "resolved": "\"none\" | \"dark\" | \"basic\" | \"mini\" | \"critical-extra-bright-small\" | \"critical-dim-large\" | \"critical-dim-large-elevated\" | \"critical-dim-sharp\" | \"informational-extra-bright-small\" | \"informational-extra-bright-large\" | \"informational-extra-bright-large-elevated\" | \"success-extra-bright-small\" | \"success-extra-bright-large\" | \"success-extra-bright-large-elevated\" | \"warning-extra-bright-small\" | \"warning-extra-bright-large\" | \"warning-extra-bright-large-elevated\" | \"neutral-extra-bright-small\" | \"top-pick-extra-bright-small\" | \"actionable-tile-medium\" | \"actionable-tile-large\" | \"actionable-card-micro\" | \"actionable-card-large\" | \"actionable-card-xlarge\" | \"actionable-list-option\" | \"results-list\" | \"ghost\"",
                    "references": {
                        "SurfaceVariant": {
                            "location": "import",
                            "path": "./wdpr-surface-style.model",
                            "id": "src/components/wdpr-surface-style/wdpr-surface-style.model.ts::SurfaceVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Surface variant style"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'none'"
            },
            "padding": {
                "type": "string",
                "attribute": "padding",
                "mutable": false,
                "complexType": {
                    "original": "SurfacePadding",
                    "resolved": "\"lg\" | \"md\" | \"none\" | \"sm\" | \"xl\"",
                    "references": {
                        "SurfacePadding": {
                            "location": "import",
                            "path": "./wdpr-surface-style.model",
                            "id": "src/components/wdpr-surface-style/wdpr-surface-style.model.ts::SurfacePadding"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Padding inside the surface"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'none'"
            },
            "customClass": {
                "type": "string",
                "attribute": "custom-class",
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
                    "text": "Additional custom CSS classes"
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
                    "text": "ARIA role for the surface"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "a11yLabel": {
                "type": "string",
                "attribute": "a11y-label",
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
                    "text": "ARIA label for accessibility"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "selected": {
                "type": "boolean",
                "attribute": "selected",
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
                    "text": "Whether the surface is selected (only applies to actionable variants)"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
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
                    "text": "Whether the surface is disabled (only applies to actionable variants)"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-surface-style.js.map
