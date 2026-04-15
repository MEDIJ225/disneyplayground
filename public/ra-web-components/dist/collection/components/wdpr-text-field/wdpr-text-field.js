import { h, Host } from "@stencil/core";
import { createEvent, generateRandId } from "../../utils/utils";
export class WdprTextField {
    /**
     * Reference to the native `<input>` element.
     */
    _nativeInput;
    _internals;
    _defaultValue = '';
    /**
     * Reference to host element
     * @type {HTMLWdprButtonElement}
     */
    el;
    internals;
    /**
     * The internal ID for the component. It is used internally and is not exposed.
     */
    _internalId;
    _leadingIcon;
    _trailingIcon;
    /**
     * (Optional) A unique ID for the component. It is essential for accessibility,
     * as it connects the `<label>` to the `<input>` control.
     * If not provided, a random ID will be generated.
     */
    inputId;
    autocomplete;
    name;
    maxLength;
    type = 'text';
    value = '';
    helperText = '';
    disabled = false;
    error = false;
    readonly = false;
    customTabindex = 0;
    label = 'Label';
    requirementIndicator = 'none';
    a11yRole;
    a11yHasPopup;
    a11yControls;
    a11yExpanded;
    a11yAutoComplete;
    a11yActiveDescendant;
    a11yDisabled;
    a11yRequired;
    a11yDescribedBy;
    wdprValueChanged;
    wdprInputFocus;
    wdprInputBlur;
    wdprInputClick;
    wdprLeadingIconClick;
    wdprTrailingIconClick;
    updateDisabledState() {
        this._updateButtonsDisabledState();
    }
    _handleValueChange(nextValue) {
        const displayValue = this._getDisplayValue(nextValue);
        if (displayValue !== (nextValue ?? '')) {
            this.value = displayValue;
            return;
        }
        this._syncInternals(displayValue);
        this._syncNativeValue(displayValue);
    }
    /**
     * Sets focus on the native `<input>` element.
     * Usage: textField.setFocus();
     */
    async setFocus() {
        this._nativeInput?.focus();
    }
    connectedCallback() {
        let initialValue = '';
        if (this.readonly && !this.value) {
            initialValue = '--';
        }
        else if (this.value) {
            initialValue = this.value;
        }
        const displayValue = this._getDisplayValue(initialValue);
        this.value = displayValue;
        this._defaultValue = displayValue;
        this._syncInternals(displayValue);
        this.el.addEventListener('formreset', this._handleFormReset);
    }
    disconnectedCallback() {
        this.el.removeEventListener('formreset', this._handleFormReset);
    }
    componentWillLoad() {
        this._internalId = this.inputId || `wdpr-text-field-${generateRandId()}`;
        this._updateButtonsDisabledState();
    }
    componentDidLoad() {
        this._syncNativeValue(this.value);
    }
    _updateButtonsDisabledState = () => {
        this._leadingIcon = this.el.querySelector('[slot="leading-icon-button"]');
        this._trailingIcon = this.el.querySelector('[slot="trailing-icon-button"]');
        this._leadingIcon?.setAttribute('disabled', this.disabled.toString());
        this._trailingIcon?.setAttribute('disabled', this.disabled.toString());
    };
    _handleSlotChange = () => {
        this.updateDisabledState();
    };
    _handleFormReset = () => {
        this.value = this._defaultValue ?? '';
    };
    _syncInternals(value) {
        this._internals?.setFormValue?.(value ?? '');
    }
    _getDisplayValue(rawValue) {
        const withReadonlyPlaceholder = this.readonly && !rawValue ? '--' : rawValue ?? '';
        const max = typeof this.maxLength === 'number' && Number.isFinite(this.maxLength) ? this.maxLength : undefined;
        if (!max || max <= 0)
            return withReadonlyPlaceholder;
        return withReadonlyPlaceholder.length > max ? withReadonlyPlaceholder.slice(0, max) : withReadonlyPlaceholder;
    }
    _syncNativeValue(value) {
        const displayValue = this._getDisplayValue(value);
        if (this._nativeInput && this._nativeInput.value !== displayValue) {
            this._nativeInput.value = displayValue ?? '';
        }
    }
    _emitNativeEvents() {
        const inputEvent = createEvent('input', { bubbles: true, composed: true, cancelable: true, detail: this.value });
        this.el.dispatchEvent(inputEvent);
        const changeEvent = createEvent('change', { bubbles: true, composed: true, cancelable: true });
        this.el.dispatchEvent(changeEvent);
    }
    _onLeadingClick = () => {
        this.wdprLeadingIconClick.emit(true);
        this._leadingIcon?.blur();
    };
    _onTrailingClick = () => {
        const oldValue = this.value;
        this.wdprTrailingIconClick.emit({ value: oldValue });
        this._trailingIcon?.blur();
    };
    _handleInput = (event) => {
        const input = event.target;
        const nextValue = this._getDisplayValue(input.value);
        this.value = nextValue;
        if (input.value !== nextValue) {
            input.value = nextValue;
        }
        this.wdprValueChanged.emit(this.value);
        this._emitNativeEvents();
    };
    _handleFocus = () => {
        this.wdprInputFocus.emit();
    };
    _handleBlur = () => {
        this.wdprInputBlur.emit();
    };
    _handleClick = () => {
        this.wdprInputClick.emit();
    };
    get _requirementLabel() {
        if (this.requirementIndicator === 'required')
            return h("span", { "aria-hidden": "true" }, " *");
        if (this.requirementIndicator === 'optional')
            return h("span", null, " (Optional)");
        return null;
    }
    render() {
        return (h(Host, { key: '7846e2f6b06fccebe38ee7fea18b756c8ea42ec6' }, h("div", { key: 'fe9a1a313018d05742b305cc630b24f717c83c3b', class: "text-field-wrapper" }, this._leadingIcon && (h("span", { key: 'ee6c2a45220882c0176fa604389137721a0ed3d5', onClick: this._onLeadingClick, part: "leading-icon-button-wrapper", class: "icon-wrapper" }, h("slot", { key: '3fa65cc5b39802e0f2776e083c24384a456e164a', onSlotchange: this._handleSlotChange, name: "leading-icon-button" }))), h("div", { key: 'c7bb27cec6832e8b8015178f2fa937785c5c6fbe', class: "input-wrapper", part: "input-wrapper" }, h("input", { key: 'aa395e79c3cbb6246dc92d690558443abaeba1ff', ref: el => (this._nativeInput = el), type: this.type, placeholder: " ", id: this._internalId, class: "input", disabled: this.disabled, name: this.name, maxlength: this.maxLength, value: this._getDisplayValue(this.value), tabindex: this.disabled ? -1 : this.customTabindex, autocomplete: this.autocomplete ? this.autocomplete : undefined, readonly: this.readonly, role: this.a11yRole, "aria-disabled": this.a11yDisabled ?? this.disabled.toString(), "aria-invalid": this.error.toString(), "aria-describedby": this.a11yDescribedBy || (this.helperText ? `${this._internalId}-helper-text` : undefined), "aria-haspopup": this.a11yHasPopup, "aria-controls": this.a11yControls, "aria-expanded": this.a11yExpanded, "aria-autocomplete": this.a11yAutoComplete, "aria-activedescendant": this.a11yActiveDescendant, "aria-required": this.a11yRequired, onInput: this._handleInput, onFocus: this._handleFocus, onBlur: this._handleBlur, onClick: this._handleClick }), h("label", { key: '78ef3792f343a5acfe8f9ea4831cf2ad9d5761aa', htmlFor: this._internalId, class: "input-label" }, this.label, " ", this._requirementLabel)), this._trailingIcon && (h("span", { key: '87973c83c1c5869c45ff8cb4ffe5b75df517bbf6', onClick: this._onTrailingClick, part: "trailing-icon-button-wrapper", class: "icon-wrapper" }, h("slot", { key: '1a13cf03524e589f2bfbe333b93710d302e9569e', onSlotchange: this._handleSlotChange, name: "trailing-icon-button" })))), this.helperText && (h("div", { key: '60f74ad65d9f2f91bf28c3ac0a30206d3d92eda3', class: "inline-message-wrapper", part: "helper-text-wrapper" }, h("wdpr-inline-message", { key: '2badb88c52f70579f647219bdccb082744c1d281', id: `${this._internalId}-helper-text`, variant: this.error ? 'error' : 'informational', size: "small", role: "status" }, this.helperText)))));
    }
    static get is() { return "wdpr-text-field"; }
    static get encapsulation() { return "scoped"; }
    static get formAssociated() { return true; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-text-field.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-text-field.css"]
        };
    }
    static get properties() {
        return {
            "inputId": {
                "type": "string",
                "attribute": "input-id",
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
                    "text": "(Optional) A unique ID for the component. It is essential for accessibility,\nas it connects the `<label>` to the `<input>` control.\nIf not provided, a random ID will be generated."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "autocomplete": {
                "type": "string",
                "attribute": "autocomplete",
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
            "name": {
                "type": "string",
                "attribute": "name",
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
            "maxLength": {
                "type": "number",
                "attribute": "max-length",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "type": {
                "type": "string",
                "attribute": "type",
                "mutable": false,
                "complexType": {
                    "original": "TextFieldType",
                    "resolved": "\"number\" | \"text\"",
                    "references": {
                        "TextFieldType": {
                            "location": "import",
                            "path": "./wdpr-text-field.model",
                            "id": "src/components/wdpr-text-field/wdpr-text-field.model.ts::TextFieldType"
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
                "defaultValue": "'text'"
            },
            "value": {
                "type": "string",
                "attribute": "value",
                "mutable": true,
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
            },
            "helperText": {
                "type": "string",
                "attribute": "helper-text",
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
            "error": {
                "type": "boolean",
                "attribute": "error",
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
            "readonly": {
                "type": "boolean",
                "attribute": "readonly",
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
            "customTabindex": {
                "type": "number",
                "attribute": "custom-tabindex",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "defaultValue": "0"
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
                "reflect": false,
                "defaultValue": "'Label'"
            },
            "requirementIndicator": {
                "type": "string",
                "attribute": "requirement-indicator",
                "mutable": false,
                "complexType": {
                    "original": "TextFieldRequirementIndicator",
                    "resolved": "\"none\" | \"optional\" | \"required\"",
                    "references": {
                        "TextFieldRequirementIndicator": {
                            "location": "import",
                            "path": "./wdpr-text-field.model",
                            "id": "src/components/wdpr-text-field/wdpr-text-field.model.ts::TextFieldRequirementIndicator"
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
                "defaultValue": "'none'"
            },
            "a11yRole": {
                "type": "string",
                "attribute": "a11y-role",
                "mutable": false,
                "complexType": {
                    "original": "'button' | 'checkbox' | 'combobox' | 'listbox' | 'menu' | 'menubar' | 'option' | 'radio' | 'searchbox' | 'textbox' | string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "a11yHasPopup": {
                "type": "string",
                "attribute": "a11y-has-popup",
                "mutable": false,
                "complexType": {
                    "original": "'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'",
                    "resolved": "\"dialog\" | \"false\" | \"grid\" | \"listbox\" | \"menu\" | \"tree\" | \"true\"",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "a11yControls": {
                "type": "string",
                "attribute": "a11y-controls",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "a11yExpanded": {
                "type": "string",
                "attribute": "a11y-expanded",
                "mutable": false,
                "complexType": {
                    "original": "'true' | 'false'",
                    "resolved": "\"false\" | \"true\"",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "a11yAutoComplete": {
                "type": "string",
                "attribute": "a11y-auto-complete",
                "mutable": false,
                "complexType": {
                    "original": "'none' | 'inline' | 'list' | 'both'",
                    "resolved": "\"both\" | \"inline\" | \"list\" | \"none\"",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "a11yActiveDescendant": {
                "type": "string",
                "attribute": "a11y-active-descendant",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "a11yDisabled": {
                "type": "string",
                "attribute": "a11y-disabled",
                "mutable": false,
                "complexType": {
                    "original": "'true' | 'false'",
                    "resolved": "\"false\" | \"true\"",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "a11yRequired": {
                "type": "string",
                "attribute": "a11y-required",
                "mutable": false,
                "complexType": {
                    "original": "'true' | 'false'",
                    "resolved": "\"false\" | \"true\"",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "a11yDescribedBy": {
                "type": "string",
                "attribute": "a11y-described-by",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "_internalId": {},
            "_leadingIcon": {},
            "_trailingIcon": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprValueChanged",
                "name": "wdprValueChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }, {
                "method": "wdprInputFocus",
                "name": "wdprInputFocus",
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
            }, {
                "method": "wdprInputBlur",
                "name": "wdprInputBlur",
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
            }, {
                "method": "wdprInputClick",
                "name": "wdprInputClick",
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
            }, {
                "method": "wdprLeadingIconClick",
                "name": "wdprLeadingIconClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }, {
                "method": "wdprTrailingIconClick",
                "name": "wdprTrailingIconClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ value: string }",
                    "resolved": "{ value: string; }",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "setFocus": {
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
                    "text": "Sets focus on the native `<input>` element.\nUsage: textField.setFocus();",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "disabled",
                "methodName": "updateDisabledState"
            }, {
                "propName": "value",
                "methodName": "_handleValueChange"
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=wdpr-text-field.js.map
