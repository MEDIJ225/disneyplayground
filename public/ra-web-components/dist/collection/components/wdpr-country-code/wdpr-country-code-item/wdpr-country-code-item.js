import { h, Host } from "@stencil/core";
import { customTwMerge, generateRandId } from "../../../utils/utils";
export class WdprCountryCodeItem {
    _internalId;
    el;
    itemId;
    value;
    label;
    callingCode;
    isoCode;
    disabled = false;
    selected = false;
    isFocused = false;
    isHidden = false;
    wdprSelect;
    componentWillLoad() {
        this._internalId = this.itemId || `wdpr-country-code-item-${generateRandId()}`;
    }
    _handleSelection() {
        if (this.disabled)
            return;
        this.wdprSelect.emit({ value: this.value, label: this.label, selected: !this.selected, id: this._internalId, isoCode: this.isoCode, callingCode: this.callingCode });
    }
    get _itemClasses() {
        return customTwMerge(baseClasses, this.selected ? selectedClasses : unselectedClasses, this.isFocused && focusedClasses, this.disabled && disabledClasses, !this.disabled && enabledClasses);
    }
    render() {
        return (h(Host, { key: '6503978c5e079902074301841281541c3e7e0c5d', id: this._internalId, role: "option", "aria-selected": this.selected.toString(), "aria-disabled": this.disabled.toString(), onClick: () => this._handleSelection(), class: `${this.isHidden ? 'hidden' : ''}` }, h("div", { key: 'b5d7e308fe247191dbfd83f3e3e73bcb81c36c1e', class: this._itemClasses }, this.label && (h("span", { key: 'dc7b7b6d07cef9c38e91b4c9af903363a2abcd90', class: "body-large text-start line-clamp-2" }, this.callingCode, " ", this.label)))));
    }
    static get is() { return "wdpr-country-code-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-country-code-item.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-country-code-item.css"]
        };
    }
    static get properties() {
        return {
            "itemId": {
                "type": "string",
                "attribute": "item-id",
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
            "value": {
                "type": "string",
                "attribute": "value",
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
            "callingCode": {
                "type": "string",
                "attribute": "calling-code",
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
            "isoCode": {
                "type": "string",
                "attribute": "iso-code",
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
                "reflect": true,
                "defaultValue": "false"
            },
            "isFocused": {
                "type": "boolean",
                "attribute": "is-focused",
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
            "isHidden": {
                "type": "boolean",
                "attribute": "is-hidden",
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
    static get events() {
        return [{
                "method": "wdprSelect",
                "name": "wdprSelect",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{\n    id: string;\n    value: string;\n    label: string;\n    selected: boolean;\n    callingCode: string;\n    isoCode: string;\n  }",
                    "resolved": "{ id: string; value: string; label: string; selected: boolean; callingCode: string; isoCode: string; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
const baseClasses = 'item flex items-center gap-100 p-100 w-full rounded-100 cursor-pointer transition-colors bg-surface-transparent text-text-actionable-alt-default';
const focusedClasses = 'outline-037 outline-solid outline-offset-1 outline-stroke-actionable-alt-focused';
const disabledClasses = 'bg-color-surface-transparent text-text-actionable-alt-disabled cursor-not-allowed';
const unselectedClasses = 'bg-surface-transparent text-text-actionable-alt-default';
const selectedClasses = 'bg-surface-actionable-alt-pressed text-text-actionable-inverse-default';
const enabledClasses = `hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
active:bg-surface-actionable-alt-pressed active:text-text-actionable-inverse-default`;
//# sourceMappingURL=wdpr-country-code-item.js.map
