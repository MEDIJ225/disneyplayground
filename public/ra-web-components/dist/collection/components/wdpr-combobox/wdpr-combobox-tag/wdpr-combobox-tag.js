import { h } from "@stencil/core";
import { customTwMerge } from "../../../utils/utils";
export class WdprComboboxTag {
    _tag;
    el;
    label = '';
    async focusTag() {
        this._tag?.focus();
    }
    get _tagClasses() {
        const baseClasses = 'inline-flex items-center justify-center px-100 rounded-050 bg-surface-status-neutral text-text-status-neutral text-component-small font-component-default leading-component-small tracking-02 whitespace-nowrap min-w-[48px] h-[22px]';
        const highlightClasses = 'focus-visible:outline focus-visible:outline-solid focus-visible:outline-025 focus-visible:outline-stroke-actionable-focused';
        return customTwMerge(baseClasses, highlightClasses);
    }
    render() {
        return (h("span", { key: '2ac7ef5bc1b74a2802f4913fe7c5be8540d39152', class: this._tagClasses, role: "button", "aria-label": `Remove ${this.label}`, tabindex: "-1", ref: el => (this._tag = el) }, this.label));
    }
    static get is() { return "wdpr-combobox-tag"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host {\n      display: inline-flex;\n    }"; }
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
                "reflect": false,
                "defaultValue": "''"
            }
        };
    }
    static get methods() {
        return {
            "focusTag": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
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
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-combobox-tag.js.map
