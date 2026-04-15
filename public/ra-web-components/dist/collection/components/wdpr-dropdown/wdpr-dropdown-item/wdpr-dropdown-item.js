import { Fragment, h, Host } from "@stencil/core";
import { customTwMerge, generateRandId } from "../../../utils/utils";
export class WdprDropdownItem {
    _internalId;
    el;
    _hideDivider = false;
    itemId;
    value;
    label;
    description;
    disabled = false;
    selected = false;
    mode = 'single';
    isFocused = false;
    wdprSelect;
    componentWillLoad() {
        this._internalId = this.itemId || `wdpr-dropdown-item-${generateRandId()}`;
    }
    async hideDivider() {
        this._hideDivider = true;
    }
    _handleSelection() {
        if (this.disabled)
            return;
        this.wdprSelect.emit({ value: this.value, label: this.label, selected: !this.selected, id: this._internalId });
    }
    _handleMultipleCheckboxChange = (event) => {
        event.stopPropagation();
        if (this.disabled)
            return;
        this.wdprSelect.emit({
            value: this.value,
            label: this.label,
            selected: event.detail.checked,
            id: this._internalId,
        });
    };
    _suppressCheckboxClickBubble = (event) => {
        event.stopPropagation();
    };
    _renderVariant() {
        if (this.mode === 'single') {
            return (h(Fragment, null, h("div", { class: this._singleSelectionClasses }, h("slot", { name: "icon" }), h("div", { class: "flex flex-col gap-050 items-start" }, this.label && h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && h("span", { class: "body-small text-start line-clamp-2" }, this.description))), !this._hideDivider && (h("div", { class: "mx-100", "aria-hidden": "true" }, h("wdpr-divider", null)))));
        }
        if (this.mode === 'multiple') {
            return (h(Fragment, null, h("div", { class: this._multipleSelectionClasses }, h("wdpr-checkbox", { checked: this.selected, disabled: this.disabled, labelPosition: "none", customTabindex: -1, onWdprChange: this._handleMultipleCheckboxChange, onClick: this._suppressCheckboxClickBubble }), h("div", { class: "flex flex-col gap-050 items-start" }, this.label && h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && h("span", { class: "body-small text-start line-clamp-2" }, this.description))), !this._hideDivider && (h("div", { class: "mx-100", "aria-hidden": "true" }, h("wdpr-divider", null)))));
        }
    }
    get _singleSelectionClasses() {
        return customTwMerge(itemClasses, this.selected ? singleItemSelectedClasses : singleItemUnselectedBaseClasses, this.isFocused && itemFocusedClasses, this.disabled && itemDisabledClasses, !this.disabled && singleItemEnabledClasses);
    }
    get _multipleSelectionClasses() {
        return customTwMerge(itemClasses, singleItemUnselectedBaseClasses, this.isFocused && itemFocusedClasses, this.disabled && itemDisabledClasses, !this.disabled && multipleItemEnabledClasses);
    }
    render() {
        return (h(Host, { key: '166a49c987d1a0e88d1d31d5a0b0f1753701eb84', id: this._internalId, role: "option", "data-dropdown-item": true, "aria-selected": this.selected.toString(), "aria-disabled": this.disabled.toString(), onClick: () => this._handleSelection() }, this._renderVariant()));
    }
    static get is() { return "wdpr-dropdown-item"; }
    static get encapsulation() { return "shadow"; }
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
            "mode": {
                "type": "string",
                "attribute": "mode",
                "mutable": false,
                "complexType": {
                    "original": "DropdownSelectionMode",
                    "resolved": "\"multiple\" | \"single\"",
                    "references": {
                        "DropdownSelectionMode": {
                            "location": "import",
                            "path": "../wdpr-dropdown.model",
                            "id": "src/components/wdpr-dropdown/wdpr-dropdown.model.ts::DropdownSelectionMode"
                        }
                    }
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
                "defaultValue": "'single'"
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
            }
        };
    }
    static get elementRef() { return "el"; }
}
const itemClasses = `item flex items-start gap-100 p-100 w-full rounded-100 cursor-pointer transition-colors bg-surface-transparent text-text-actionable-alt-default`;
const itemFocusedClasses = `outline-037 outline-solid outline-offset-1 outline-stroke-actionable-alt-focused`;
const itemDisabledClasses = 'bg-color-surface-transparent text-text-actionable-alt-disabled cursor-not-allowed';
const singleItemUnselectedBaseClasses = `bg-surface-transparent text-text-actionable-alt-default`;
const singleItemSelectedClasses = `bg-surface-actionable-alt-pressed text-text-actionable-inverse-default`;
const singleItemEnabledClasses = `hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
active:bg-surface-actionable-alt-pressed active:text-text-actionable-inverse-default`;
const multipleItemEnabledClasses = ` hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
  active:bg-surface-actionable-alt-pressed active:text-text-actionable-inverse-default`;
//# sourceMappingURL=wdpr-dropdown-item.js.map
