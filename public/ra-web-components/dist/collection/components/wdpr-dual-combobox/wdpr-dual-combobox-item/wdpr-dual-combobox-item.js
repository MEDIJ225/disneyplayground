import { h, Host } from "@stencil/core";
import { customTwMerge, generateRandId } from "../../../utils/utils";
export class WdprDualComboboxItem {
    _internalId;
    el;
    _hideDivider = false;
    itemId;
    value;
    label;
    description;
    disabled = false;
    selected = false;
    isFocused = false;
    isHidden = false;
    wdprSelect;
    async hideDivider() {
        this._hideDivider = true;
    }
    async showDivider() {
        this._hideDivider = false;
    }
    componentWillLoad() {
        this._internalId = this.itemId || `wdpr-combobox-item-${generateRandId()}`;
    }
    _handleSelection() {
        if (this.disabled)
            return;
        this.wdprSelect.emit({ value: this.value, label: this.label, selected: !this.selected, id: this._internalId });
    }
    get _singleSelectionClasses() {
        return customTwMerge(itemClasses, this.selected ? itemSelectedClasses : itemUnselectedBaseClasses, this.isFocused && itemFocusedClasses, this.disabled && itemDisabledClasses, !this.disabled && itemEnabledClasses);
    }
    render() {
        return (h(Host, { key: '41bfc742f0dcaf131af1ef95fe298c2a0cae044c', id: this._internalId, role: "option", "data-dual-combobox-item": true, "aria-selected": this.selected.toString(), "aria-disabled": this.disabled.toString(), onClick: () => this._handleSelection(), class: `${this.isHidden ? 'hidden' : ''}` }, h("div", { key: '4a9faffce493a31bf7cd0d1a1e56720949572f74', class: this._singleSelectionClasses }, h("slot", { key: 'b576650fcf457b5c15c92a3997cc0c56d79bd175', name: "icon" }), h("div", { key: 'f1eb9390e4a061128c9c7a5acea915f007e901fa', class: "flex flex-col gap-050 items-start" }, this.label && h("span", { key: 'cf25f62b2b41cd291de07c7930f61273d97535f1', class: "body-large text-start line-clamp-2" }, this.label), this.description && h("span", { key: '5211c1d1d31b349e1715444e32d197c023875c04', class: "body-small text-start line-clamp-2" }, this.description))), !this._hideDivider && (h("div", { key: '7e9fde613b31d1339ab169dbf6e4d2cedfef8299', class: "mx-100", "aria-hidden": "true" }, h("wdpr-divider", { key: '07da1d0f142f1c9d03aa58f5d77db72d99d6ee04' })))));
    }
    static get is() { return "wdpr-dual-combobox-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-dual-combobox-item.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-dual-combobox-item.css"]
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
            "description": {
                "type": "string",
                "attribute": "description",
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
    static get states() {
        return {
            "_hideDivider": {}
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
                    "original": "{ value: string; label: string; selected: boolean; id: string }",
                    "resolved": "{ value: string; label: string; selected: boolean; id: string; }",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "hideDivider": {
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
            },
            "showDivider": {
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
const itemClasses = `item flex items-start gap-100 p-100 w-full rounded-100 cursor-pointer transition-colors bg-surface-transparent text-text-actionable-alt-default`;
const itemFocusedClasses = `outline-037 outline-solid outline-offset-1 outline-stroke-actionable-alt-focused`;
const itemDisabledClasses = 'bg-color-surface-transparent text-text-actionable-alt-disabled cursor-not-allowed';
const itemUnselectedBaseClasses = `bg-surface-transparent text-text-actionable-alt-default`;
const itemSelectedClasses = `bg-surface-actionable-alt-pressed text-text-actionable-inverse-default`;
const itemEnabledClasses = `hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
active:bg-surface-actionable-alt-pressed active:text-text-actionable-inverse-default`;
//# sourceMappingURL=wdpr-dual-combobox-item.js.map
