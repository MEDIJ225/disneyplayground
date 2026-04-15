import { h } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
export class WdprNavSectionHeader {
    /**
     * The visual style used for section headings.
     */
    variant = 'quiet';
    /**
     * Optional fallback label when no slotted content is provided.
     */
    label = '';
    get _containerClass() {
        const quietClass = 'text-text-body font-weight-body-default leading-body-medium tracking-default';
        const loudClass = 'text-text-heading font-[var(--font-weight-heading-alt)] leading-heading-medium text-[20px] tracking--05';
        return customTwMerge('px-075 py-100', this.variant === 'loud' ? loudClass : quietClass);
    }
    render() {
        return (h("div", { key: 'cfc77dee9d1edf8f62239aa771c246983639898f', class: this._containerClass }, h("slot", { key: 'a3ff3746c1b26f7d8014ba90f809c1fdea4929f3' }, this.label)));
    }
    static get is() { return "wdpr-nav-section-header"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "NavHeaderSectionVariant",
                    "resolved": "\"loud\" | \"quiet\"",
                    "references": {
                        "NavHeaderSectionVariant": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-nav-section-header/wdpr-nav-section-header.tsx",
                            "id": "src/components/wdpr-nav-section-header/wdpr-nav-section-header.tsx::NavHeaderSectionVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The visual style used for section headings."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'quiet'"
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
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Optional fallback label when no slotted content is provided."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            }
        };
    }
}
//# sourceMappingURL=wdpr-nav-section-header.js.map
