import { Fragment, h, Host } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../../models/keycodes.model";
export class WdprStandaloneResultsListItem {
    el;
    _showDivider = true;
    value;
    label;
    description;
    disabled = false;
    selected = false;
    mode = 'single';
    wdprSelect;
    async hideDivider() {
        this._showDivider = false;
    }
    _handleCheckboxKeyDown(ev) {
        if (ev.key === KEYBOARD_KEYS.SPACE || ev.key === KEYBOARD_KEYS.ENTER) {
            this._handleSelection();
        }
    }
    _handleSelection() {
        if (this.disabled)
            return;
        this.wdprSelect.emit({ value: this.value, selected: !this.selected });
    }
    _handleMultipleCheckboxChange = (event) => {
        event.stopPropagation();
        if (this.disabled)
            return;
        this.wdprSelect.emit({ value: this.value, selected: event.detail.checked });
    };
    _suppressCheckboxClickBubble = (event) => {
        event.stopPropagation();
    };
    renderVariant() {
        if (this.mode === 'single') {
            return (h(Fragment, null, h("button", { class: buttonItemClasses, "data-selected": this.selected.toString(), disabled: this.disabled, type: "button", onClick: () => this._handleSelection() }, h("slot", { name: "icon" }), h("div", { class: "flex flex-col gap-050 items-start" }, this.label && h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && h("span", { class: "body-small text-start line-clamp-2" }, this.description))), this._showDivider && (h("div", { class: "mx-100", "aria-hidden": "true" }, h("wdpr-divider", null)))));
        }
        if (this.mode === 'multiple') {
            return (h(Fragment, null, h("div", { class: checkboxItemClasses, tabindex: this.disabled ? -1 : 0, "data-selected": this.selected.toString(), "aria-disabled": this.disabled.toString(), onClick: () => this._handleSelection(), onKeyDown: ev => this._handleCheckboxKeyDown(ev) }, h("wdpr-checkbox", { checked: this.selected, disabled: this.disabled, labelPosition: "none", customTabindex: -1, onWdprChange: this._handleMultipleCheckboxChange, onClick: this._suppressCheckboxClickBubble }), h("div", { class: "flex flex-col gap-050 items-start" }, this.label && h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && h("span", { class: "body-small text-start line-clamp-2" }, this.description))), this._showDivider && (h("div", { class: "mx-100", "aria-hidden": "true" }, h("wdpr-divider", null)))));
        }
    }
    render() {
        return (h(Host, { key: '4197702437ffa06aba172441ac95aafac52ecec9', role: "listitem", "data-standalone-results-list-item": true }, this.renderVariant()));
    }
    static get is() { return "wdpr-standalone-results-list-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
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
                    "original": "StandaloneResultListSelectionMode",
                    "resolved": "\"multiple\" | \"single\"",
                    "references": {
                        "StandaloneResultListSelectionMode": {
                            "location": "import",
                            "path": "../wdpr-standalone-results-list.model",
                            "id": "src/components/wdpr-standalone-results-list/wdpr-standalone-results-list.model.ts::StandaloneResultListSelectionMode"
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
                "reflect": false,
                "defaultValue": "'single'"
            }
        };
    }
    static get states() {
        return {
            "_showDivider": {}
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
                    "original": "{ value: string; selected: boolean }",
                    "resolved": "{ value: string; selected: boolean; }",
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
const checkboxItemClasses = `checkbox flex items-start gap-100 p-100 w-full rounded-100 cursor-pointer text-text-actionable-alt-default transition-colors
focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused focus-visible:outline-solid focus-visible:outline-offset-1
data-[selected=true]:bg-surface-actionable-alt-selected data-[selected=true]:text-text-actionable-inverse-default
data-[selected=true]:hover:bg-surface-actionable-alt-hover
aria-[disabled=false]:hover:bg-surface-actionable-alt-hover aria-[disabled=false]:hover:text-text-actionable-inverse-default
aria-[disabled=false]:active:bg-surface-actionable-alt-pressed aria-[disabled=false]:active:text-text-actionable-inverse-default
disabled:text-text-actionable-alt-disable aria-disabled:text-text-actionable-alt-disabled aria-disabled:cursor-not-allowed`;
const buttonItemClasses = `flex items-start gap-100 p-100 w-full rounded-100 cursor-pointer text-text-actionable-alt-default transition-colors
focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused focus-visible:outline-solid focus-visible:outline-offset-1
hover:enabled:bg-surface-actionable-alt-hover hover:enabled:text-text-actionable-inverse-default
active:enabled:bg-surface-actionable-alt-pressed active:enabled:text-text-actionable-inverse-default
disabled:text-text-actionable-alt-disabled disabled:cursor-not-allowed

data-[selected=true]:bg-surface-actionable-alt-selected data-[selected=true]:text-text-actionable-inverse-default
data-[selected=true]:active:bg-surface-actionable-alt-selected data-[selected=true]:hover:bg-surface-actionable-alt-hover`;
//# sourceMappingURL=wdpr-standalone-results-list-item.js.map
