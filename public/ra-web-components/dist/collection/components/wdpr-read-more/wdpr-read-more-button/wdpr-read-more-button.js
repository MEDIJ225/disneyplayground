import { h } from "@stencil/core";
export class WdprReadMoreButton {
    el;
    disabled = false;
    expanded = false;
    render() {
        return (h("button", { key: '803e72e55a9066923212beb4dd0c21732e46cc87', type: "button", class: baseClasses, disabled: this.disabled, "aria-expanded": String(this.expanded) }, h("slot", { key: '0a835a073ae5c367dc7bd50752c18be070f4244c' })));
    }
    static get is() { return "wdpr-read-more-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
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
                "reflect": true,
                "defaultValue": "false"
            },
            "expanded": {
                "type": "boolean",
                "attribute": "expanded",
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
    static get elementRef() { return "el"; }
}
const baseClasses = `
inline-flex items-start align-middle no-underline component-medium cursor-pointer rounded-075
text-text-actionable-default hover:text-text-actionable-hover active:text-text-actionable-focused
disabled:text-text-actionable-disabled disabled:cursor-not-allowed
focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused
focus-visible:outline-solid focus-visible:outline-offset-2
`;
//# sourceMappingURL=wdpr-read-more-button.js.map
