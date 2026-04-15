import { h, Host } from "@stencil/core";
import { generateRandId } from "../../utils/utils";
export class WdprDualTextField {
    /**
     * Reference to the native leading `<input>` element.
     */
    _leadingInputEl;
    /**
     * Reference to the native trailing `<input>` element.
     */
    _trailingInputlEl;
    _leadingIconButton;
    _trailingIconButton;
    /**
     * Reference to host element
     * @type {HTMLWdprDualTextFieldElement}
     */
    el;
    internals;
    _internalLeadingInputId;
    _internalTrailingInputId;
    _leadingFocused = false;
    _trailingFocused = false;
    /**
     * A unique ID for the component. It is essential for accessibility,
     * as it connects the `<label>` to the `<input>` control.
     * If not provided, a random ID will be generated.
     * @type {string}
     */
    leadingInputId;
    leadingValue;
    leadingLabel = 'Leading Label';
    leadingRequirementIndicator = 'none';
    /**
     * A unique ID for the component. It is essential for accessibility,
     * as it connects the `<label>` to the `<input>` control.
     * If not provided, a random ID will be generated.
     * @type {string}
     */
    trailingInputId;
    trailingValue;
    trailingLabel = 'Trailing Label';
    trailingRequirementIndicator = 'none';
    helperText;
    error = false;
    disabled = false;
    required = false;
    leadingName;
    trailingName;
    readonly = false;
    a11yRole;
    a11yHasPopup;
    a11yControls;
    a11yExpanded;
    a11yAutoComplete;
    a11yActiveDescendant;
    a11yDisabled;
    a11yRequired;
    a11yDescribedBy;
    /**
     * Event emitted when the input changes.
     */
    wdprValueChanged;
    /**
     * Event emitted when the input gains focus.
     */
    wdprInputFocus;
    /**
     * Event emitted when the input loses focus.
     */
    wdprInputBlur;
    /**
     * Event emitted when any input is clicked.
     * The `field` property indicates which input triggered the click: `'leading'` or `'trailing'`.
     */
    wdprInputClick;
    /**
     * Event emitted when the trailing icon is clicked
     */
    wdprLeadingIconClick;
    /**
     * Event emitted when the trailing icon is clicked
     */
    wdprTrailingIconClick;
    /**
     * Sets focus on the native `<input>` element.
     * Usage: dualTextField.setLeadingFocus();
     */
    async setLeadingFocus() {
        this._leadingInputEl?.focus();
    }
    /**
     * Sets focus on the native `<input>` element.
     * Usage: dualTextField.setTrailingFocus();
     */
    async setTrailingFocus() {
        this._trailingInputlEl?.focus();
    }
    updateDisabledState() {
        this._updateButtonsDisabledState();
        this._updateFormValue();
    }
    formPropsChanged() {
        this._updateFormValue();
    }
    componentWillLoad() {
        this._internalLeadingInputId = this.leadingInputId || `wdpr-dual-text-input-${generateRandId()}`;
        this._internalTrailingInputId = this.trailingInputId || `wdpr-dual-text-input-${generateRandId()}`;
        this._leadingIconButton = this.el.querySelector('[slot="leading-icon-button"]');
        this._trailingIconButton = this.el.querySelector('[slot="trailing-icon-button"]');
        this._updateFormValue();
    }
    _updateButtonsDisabledState = () => {
        const isDisabled = !!this.disabled;
        if (isDisabled) {
            this._leadingIconButton?.setAttribute('disabled', 'true');
            this._trailingIconButton?.setAttribute('disabled', 'true');
        }
        else {
            this._leadingIconButton?.removeAttribute('disabled');
            this._trailingIconButton?.removeAttribute('disabled');
        }
    };
    _handleLeadingInput = (event) => {
        const value = event.target.value;
        this.leadingValue = value;
        this._emitChange();
        this._updateFormValue();
    };
    _handleTrailingInput = (event) => {
        const value = event.target.value;
        this.trailingValue = value;
        this._emitChange();
        this._updateFormValue();
    };
    _updateFormValue() {
        const payload = new FormData();
        const leading = this.leadingValue || '';
        const trailing = this.trailingValue || '';
        if (this.leadingName && leading)
            payload.append(this.leadingName, leading);
        if (this.trailingName && trailing)
            payload.append(this.trailingName, trailing);
        const hasAny = !!(this.leadingName && leading) || !!(this.trailingName && trailing);
        const shouldSubmit = !this.disabled && hasAny;
        this.internals?.setFormValue?.(shouldSubmit ? payload : null);
        this._updateValidity(leading, trailing);
    }
    _updateValidity(leading, trailing) {
        if (this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        if (this.required && (!leading || !trailing)) {
            this.internals?.setValidity?.({ valueMissing: true }, 'Both fields are required');
            return;
        }
        this.internals?.setValidity?.({});
    }
    _emitChange = () => {
        this.wdprValueChanged.emit({ leadingValue: this.leadingValue, trailingValue: this.trailingValue });
    };
    _handleLeadingInputClick = () => {
        this.wdprInputClick.emit({ field: 'leading' });
    };
    _handleTrailingInputClick = () => {
        this.wdprInputClick.emit({ field: 'trailing' });
    };
    _handleLeadingFocus = (event) => {
        this._leadingFocused = true;
        this.wdprInputFocus.emit(event);
    };
    _onLeadingClick = () => {
        this.wdprLeadingIconClick.emit();
    };
    _handleLeadingBlur = () => {
        this._leadingFocused = false;
        setTimeout(() => {
            if (!this._leadingFocused && !this._trailingFocused) {
                this.wdprInputBlur.emit();
            }
        }, 0);
    };
    _handleTrailingClick = () => {
        this.wdprTrailingIconClick.emit();
    };
    _handleTrailingFocus = (event) => {
        this._trailingFocused = true;
        this.wdprInputFocus.emit(event);
    };
    _handleTrailingBlur = () => {
        this._trailingFocused = false;
        setTimeout(() => {
            if (!this._leadingFocused && !this._trailingFocused) {
                this.wdprInputBlur.emit();
            }
        }, 0);
    };
    _handleSlotChange = () => {
        this._updateButtonsDisabledState();
    };
    _requirementLabel(requirement) {
        if (requirement === 'required')
            return h("span", { "aria-hidden": "true" }, " *");
        if (requirement === 'optional')
            return h("span", null, " (Optional)");
        return null;
    }
    render() {
        return (h(Host, { key: '86977538dabd0a026697c976f0ef506a07a89cdc', "aria-disabled": this.disabled ? 'true' : 'false' }, h("div", { key: '03c506c70956ba94974336a3a3d48456621b2e94', class: "dual-text-field-wrapper" }, this._leadingIconButton && (h("span", { key: 'ad6a19af8ee5f72b8a8c3ea13b7ef43a087a1078', onClick: this._onLeadingClick, part: "leading-icon-button-wrapper" }, h("slot", { key: '529066a749d023e1bc5b5838abcda75f795c0ced', name: "leading-icon-button", onSlotchange: this._handleSlotChange }))), h("div", { key: '3d5d3651ce5bb1a0ded04e4ccbb3545f5e877193', class: "input-wrapper", part: "input-wrapper" }, h("input", { key: '5c515de5da8c6ae1ef23dbd2db95f3131d469db3', ref: el => (this._leadingInputEl = el), type: "text", id: this._internalLeadingInputId, placeholder: " ", class: "input", disabled: this.disabled, value: this.readonly && !this.leadingValue ? '--' : this.leadingValue, readonly: this.readonly, role: this.a11yRole, "aria-haspopup": this.a11yHasPopup, "aria-controls": this.a11yControls, "aria-expanded": this.a11yExpanded, "aria-autocomplete": this.a11yAutoComplete, "aria-activedescendant": this._leadingFocused ? this.a11yActiveDescendant : undefined, "aria-required": this.a11yRequired, "aria-invalid": this.error.toString(), onFocus: this._handleLeadingFocus, onInput: this._handleLeadingInput, onClick: this._handleLeadingInputClick, onBlur: this._handleLeadingBlur, part: "input" }), h("label", { key: '448f7434ba4da8931cf30afc15c8c0fa2210c895', htmlFor: this._internalLeadingInputId, class: "input-label" }, this.leadingLabel, this._requirementLabel(this.leadingRequirementIndicator))), h("div", { key: '61c8aabafce7305568eb9304df41d1570b6ed6b3', class: "divider-wrapper" }, h("wdpr-divider", { key: '94a08c0fdde6d902e202b41faf89faae631f2e6b', orientation: "vertical" })), h("div", { key: '0aaa94fc406a1894aaa3168bf90ab6d242866b7e', class: "input-wrapper", part: "input-wrapper" }, h("input", { key: '575c5061596a57a8ba2a13bc60fdba14575b916d', ref: el => (this._trailingInputlEl = el), type: "text", id: this._internalTrailingInputId, placeholder: " ", class: "input", value: this.readonly && !this.trailingValue ? '--' : this.trailingValue, disabled: this.disabled, readonly: this.readonly, role: this.a11yRole, "aria-haspopup": this.a11yHasPopup, "aria-controls": this.a11yControls, "aria-expanded": this.a11yExpanded, "aria-autocomplete": this.a11yAutoComplete, "aria-activedescendant": this._trailingFocused ? this.a11yActiveDescendant : undefined, "aria-required": this.a11yRequired, "aria-invalid": this.error.toString(), onFocus: this._handleTrailingFocus, onInput: this._handleTrailingInput, onClick: this._handleTrailingInputClick, onBlur: this._handleTrailingBlur, part: "input" }), h("label", { key: '4302d85f885f14214a0d7c16691d51394f17f33f', htmlFor: this._internalTrailingInputId, class: "input-label" }, this.trailingLabel, this._requirementLabel(this.trailingRequirementIndicator))), this._trailingIconButton && (h("span", { key: 'ad1f12d2048e8d0f3d0eaa43ecd079e05dab9b63', onClick: this._handleTrailingClick, part: "trailing-icon-button-wrapper" }, h("slot", { key: '09dc91d72724cf280219f8bf8e612261688c308e', name: "trailing-icon-button", onSlotchange: this._handleSlotChange })))), this.helperText && (h("div", { key: '70b93d7dcbcc26fa64d6b4451f79ea88c38a047f', class: "inline-message-wrapper", part: "helper-text-wrapper" }, h("wdpr-inline-message", { key: '922f6b22db2218b7c34b48dd89892de8662eaa30', variant: this.error ? 'error' : 'informational', size: "small", role: "status" }, this.helperText)))));
    }
    static get is() { return "wdpr-dual-text-field"; }
    static get encapsulation() { return "scoped"; }
    static get formAssociated() { return true; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-dual-text-field.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-dual-text-field.css"]
        };
    }
    static get properties() {
        return {
            "leadingInputId": {
                "type": "string",
                "attribute": "leading-input-id",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "A unique ID for the component. It is essential for accessibility,\nas it connects the `<label>` to the `<input>` control.\nIf not provided, a random ID will be generated."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "leadingValue": {
                "type": "string",
                "attribute": "leading-value",
                "mutable": true,
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
            "leadingLabel": {
                "type": "string",
                "attribute": "leading-label",
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
                "defaultValue": "'Leading Label'"
            },
            "leadingRequirementIndicator": {
                "type": "string",
                "attribute": "leading-requirement-indicator",
                "mutable": false,
                "complexType": {
                    "original": "DualTextFieldRequirementIndicator",
                    "resolved": "\"none\" | \"optional\" | \"required\"",
                    "references": {
                        "DualTextFieldRequirementIndicator": {
                            "location": "import",
                            "path": "./wdpr-dual-text-field.model",
                            "id": "src/components/wdpr-dual-text-field/wdpr-dual-text-field.model.ts::DualTextFieldRequirementIndicator"
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
            "trailingInputId": {
                "type": "string",
                "attribute": "trailing-input-id",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "A unique ID for the component. It is essential for accessibility,\nas it connects the `<label>` to the `<input>` control.\nIf not provided, a random ID will be generated."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "trailingValue": {
                "type": "string",
                "attribute": "trailing-value",
                "mutable": true,
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
            "trailingLabel": {
                "type": "string",
                "attribute": "trailing-label",
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
                "defaultValue": "'Trailing Label'"
            },
            "trailingRequirementIndicator": {
                "type": "string",
                "attribute": "trailing-requirement-indicator",
                "mutable": false,
                "complexType": {
                    "original": "DualTextFieldRequirementIndicator",
                    "resolved": "\"none\" | \"optional\" | \"required\"",
                    "references": {
                        "DualTextFieldRequirementIndicator": {
                            "location": "import",
                            "path": "./wdpr-dual-text-field.model",
                            "id": "src/components/wdpr-dual-text-field/wdpr-dual-text-field.model.ts::DualTextFieldRequirementIndicator"
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
                "reflect": false
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
            "required": {
                "type": "boolean",
                "attribute": "required",
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
            "leadingName": {
                "type": "string",
                "attribute": "leading-name",
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
            "trailingName": {
                "type": "string",
                "attribute": "trailing-name",
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
            "_internalLeadingInputId": {},
            "_internalTrailingInputId": {},
            "_leadingFocused": {},
            "_trailingFocused": {}
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
                    "text": "Event emitted when the input changes."
                },
                "complexType": {
                    "original": "{ leadingValue?: string; trailingValue?: string }",
                    "resolved": "{ leadingValue?: string; trailingValue?: string; }",
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
                    "text": "Event emitted when the input gains focus."
                },
                "complexType": {
                    "original": "unknown",
                    "resolved": "unknown",
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
                    "text": "Event emitted when the input loses focus."
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
                    "text": "Event emitted when any input is clicked.\nThe `field` property indicates which input triggered the click: `'leading'` or `'trailing'`."
                },
                "complexType": {
                    "original": "{ field: 'leading' | 'trailing' }",
                    "resolved": "{ field: \"leading\" | \"trailing\"; }",
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
                    "text": "Event emitted when the trailing icon is clicked"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
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
                    "text": "Event emitted when the trailing icon is clicked"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "setLeadingFocus": {
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
                    "text": "Sets focus on the native `<input>` element.\nUsage: dualTextField.setLeadingFocus();",
                    "tags": []
                }
            },
            "setTrailingFocus": {
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
                    "text": "Sets focus on the native `<input>` element.\nUsage: dualTextField.setTrailingFocus();",
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
                "propName": "leadingValue",
                "methodName": "formPropsChanged"
            }, {
                "propName": "trailingValue",
                "methodName": "formPropsChanged"
            }, {
                "propName": "leadingName",
                "methodName": "formPropsChanged"
            }, {
                "propName": "trailingName",
                "methodName": "formPropsChanged"
            }, {
                "propName": "required",
                "methodName": "formPropsChanged"
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=wdpr-dual-text-field.js.map
