import { h } from "@stencil/core";
import { customTwMerge } from "../../../utils/utils";
export class WdprTimeUnit {
    variant = 'primary';
    label;
    digits = ['#', '#'];
    /**
     * Prefix for slot names (e.g., "hour", "minute", "second")
    */
    slotPrefix;
    get _labelClasses() {
        return customTwMerge(baseLabelClasses, variantLabelClasses[this.variant]);
    }
    render() {
        const [digit1, digit2] = this.digits;
        return (h("div", { key: 'feb529567de46c25787a96a7560c9ea6ac115870', class: wrapperClasses }, h("div", { key: '69f4bedd695c07c8f0d580a3ad3d5c49e540b1fe', class: digitsClasses }, h("slot", { key: 'd1755a579bc015c07dbcf4c37d8b06eb2c88c162', name: `${this.slotPrefix}-digit-1` }, h("wdpr-number-flipper", { key: 'a4a1648ff2d92d8ac22688aed1f2155f5b1033db' }, digit1)), h("slot", { key: '28cf37dccbfa44498bb73f6769775497d51571d7', name: `${this.slotPrefix}-digit-2` }, h("wdpr-number-flipper", { key: 'ee8c6de815092cc249dd69f3176ea20c90989e65' }, digit2))), h("span", { key: '38cdc161fe96e213b7f26e32606c0c3db9fd74b9', class: this._labelClasses }, this.label)));
    }
    static get is() { return "wdpr-time-unit"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "'primary' | 'secondary'",
                    "resolved": "\"primary\" | \"secondary\"",
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
                "defaultValue": "'primary'"
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "digits": {
                "type": "unknown",
                "attribute": "digits",
                "mutable": false,
                "complexType": {
                    "original": "[string, string]",
                    "resolved": "[string, string]",
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
                "defaultValue": "['#', '#']"
            },
            "slotPrefix": {
                "type": "string",
                "attribute": "slot-prefix",
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
                    "text": "Prefix for slot names (e.g., \"hour\", \"minute\", \"second\")"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
}
const wrapperClasses = 'flex flex-col items-center gap-050';
const digitsClasses = 'flex flex-row gap-050';
const baseLabelClasses = 'text-[12px] font-[800] leading-[16px] tracking-[1.2px] uppercase';
const variantLabelClasses = {
    primary: 'text-text-label',
    secondary: 'text-text-inverse',
};
//# sourceMappingURL=wdpr-time-unit.js.map
