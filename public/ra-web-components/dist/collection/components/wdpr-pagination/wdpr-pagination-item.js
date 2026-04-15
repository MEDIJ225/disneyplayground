import { h } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
export class WdprPaginationItem {
    page;
    selected = false;
    disabled = false;
    a11yLabel;
    wdprClick;
    _handleClick = (event) => {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }
        if (!this.selected) {
            this.wdprClick.emit();
        }
    };
    render() {
        const baseClasses = "relative inline-flex items-center justify-center rounded-pill border border-solid transition-colors cursor-pointer focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2 disabled:cursor-not-allowed select-none p-0 w-dimension-500 h-dimension-500";
        const labelClasses = "text-component-small font-component-accent leading-component-medium tracking-default whitespace-nowrap";
        const buttonClasses = customTwMerge(baseClasses, "text-text-actionable-alt-default border-stroke-actionable-alt-default bg-surface-default", "hover:text-text-actionable-alt-hover hover:border-stroke-actionable-alt-hover hover:bg-surface-default", "active:text-text-actionable-alt-pressed active:border-stroke-actionable-alt-pressed active:bg-surface-default", "disabled:text-text-actionable-alt-disabled disabled:border-stroke-actionable-alt-disabled disabled:bg-surface-disabled", 
        // Selected State (overrides)
        "data-[selected=true]:bg-surface-actionable-alt-selected data-[selected=true]:text-text-inverse data-[selected=true]:border-transparent", "data-[selected=true]:hover:bg-surface-actionable-alt-hover data-[selected=true]:hover:text-text-inverse", "data-[selected=true]:active:bg-surface-actionable-alt-pressed data-[selected=true]:active:text-text-inverse", "data-[selected=true]:disabled:bg-surface-actionable-alt-disabled data-[selected=true]:disabled:text-text-actionable-inverse-default");
        return (h("button", { key: 'be32e4a1b2c6a75d077a08f13b0772499d15673a', type: "button", class: buttonClasses, onClick: this._handleClick, disabled: this.disabled, "aria-pressed": this.selected ? 'true' : 'false', "data-selected": this.selected ? 'true' : 'false', "aria-label": this.a11yLabel }, h("span", { key: '7e49b8b4eca7a8c0d018e96d44250444b86a5678', class: labelClasses }, this.page)));
    }
    static get is() { return "wdpr-pagination-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "page": {
                "type": "any",
                "attribute": "page",
                "mutable": false,
                "complexType": {
                    "original": "number | string",
                    "resolved": "number | string",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "wdprClick",
                "name": "wdprClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
}
//# sourceMappingURL=wdpr-pagination-item.js.map
