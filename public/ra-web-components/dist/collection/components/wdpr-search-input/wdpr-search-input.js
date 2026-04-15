import { h, Host } from "@stencil/core";
import { createEvent, twMerge } from "../../utils/utils";
export class WdprSearchInput {
    el;
    _internals;
    _nativeInput;
    _defaultValue = '';
    _internalId;
    /**
     * (Optional) The hardcoded value for the input field. If provided, it will override the internal state.
     * This is useful for controlled components where the value is managed externally.
     */
    inputHardcodedValue = '';
    /**
     * (Optional) A unique ID for the component. It is essential for accessibility,
     * as it connects the `<label>` to the `<input>` control.
     * If not provided, a random ID will be generated.
     */
    inputId;
    showLeadingIcon = true;
    value = '';
    name;
    disabled = false;
    customTabindex = 0;
    label = 'Label';
    valueChanged;
    inputFocus;
    inputBlur;
    inputClick;
    leadingClick;
    trailingClick;
    connectedCallback() {
        const initialValue = this.inputHardcodedValue ?? this.value ?? '';
        this.value = initialValue;
        this._defaultValue = initialValue;
        this._updateFormValue(initialValue);
        this.el.addEventListener('formreset', this._handleFormReset);
    }
    disconnectedCallback() {
        this.el.removeEventListener('formreset', this._handleFormReset);
    }
    componentDidLoad() {
        this._syncNativeValue(this.value);
    }
    handleValueChanged(newValue) {
        const nextValue = newValue ?? '';
        this._updateFormValue(nextValue);
        this._syncNativeValue(nextValue);
    }
    handleInputHardcodedValueChange(newValue) {
        const updated = newValue ?? '';
        if (updated !== this.value) {
            this.value = updated;
        }
    }
    handleFormPropsChanged() {
        this._updateFormValue(this.value ?? '');
    }
    _handleFormReset = () => {
        this.value = this._defaultValue ?? '';
    };
    _updateFormValue(value) {
        const shouldSubmit = !this.disabled && !!this.name;
        this._internals?.setFormValue?.(shouldSubmit ? value ?? '' : null);
        this._internals?.setValidity?.({});
    }
    _syncNativeValue(value) {
        if (this._nativeInput && this._nativeInput.value !== value) {
            this._nativeInput.value = value ?? '';
        }
    }
    _emitNativeEvents() {
        const inputEvent = createEvent('input', { bubbles: true, composed: true, cancelable: true, detail: this.value });
        this.el.dispatchEvent(inputEvent);
        const changeEvent = createEvent('change', { bubbles: true, composed: true, cancelable: true });
        this.el.dispatchEvent(changeEvent);
    }
    _onLeadingClick = () => {
        this.leadingClick.emit(true);
    };
    _onTrailingClick = () => {
        if (this.value) {
            this.value = '';
            this._syncNativeValue(this.value);
            this._emitNativeEvents();
            this.valueChanged.emit(this.value);
            this._nativeInput?.focus();
        }
        this.trailingClick.emit(true);
    };
    _handleInput = (event) => {
        const input = event.target;
        this.value = input.value;
        this.valueChanged.emit(this.value);
        this._emitNativeEvents();
    };
    _handleFocus = () => {
        this.inputFocus.emit();
    };
    _handleBlur = () => {
        this.inputBlur.emit();
    };
    _handleClick = () => {
        this.inputClick.emit();
    };
    get _textFieldClass() {
        const variantClasses = variantsClasses;
        const marginClass = this.showLeadingIcon ? 'px-600' : 'px-300';
        const statusClasses = twMerge(baseClass, marginClass, variantClasses.default, variantClasses.hover, variantClasses.focus);
        const disabledClasses = twMerge(baseClass, marginClass, disabledClass);
        return this.disabled ? disabledClasses : statusClasses;
    }
    get _labelClass() {
        const leftClass = this.showLeadingIcon ? 'left-600' : 'left-300';
        const rightClass = this.showLeadingIcon ? 'right-600' : 'right-300';
        return twMerge('search-input-label', leftClass, rightClass);
    }
    componentWillLoad() {
        this._internalId = this.inputId || 'wdpr-text-field';
    }
    render() {
        const hasValue = !!this.value;
        return (h(Host, { key: '1e2c8ebf500b6f0977e186ba2dd57a77859347dc', class: { 'search-input--empty': !(this.value ?? '').length } }, h("div", { key: 'ea31ce0621e49c4ff099014d14b32a4bc5fb2e89', class: "flex items-center relative w-full" }, h("input", { key: 'c7a9a755a5b31f9966cc40936522397499961d23', ref: el => (this._nativeInput = el), type: "search", placeholder: " ", id: this._internalId, class: this._textFieldClass, disabled: this.disabled, "aria-disabled": this.disabled ? 'true' : 'false', "aria-label": this.label, name: this.name, value: this.value, onInput: this._handleInput, tabIndex: this.disabled ? -1 : this.customTabindex, onFocus: this._handleFocus, onBlur: this._handleBlur, onClick: this._handleClick }), h("label", { key: '9aaf70c2d2fd80176f8f4984e640a0b81d201fbc', htmlFor: this._internalId, class: this._labelClass }, this.label), this.showLeadingIcon && (h("span", { key: 'e5be4bb1cfdbb445d6738ead63152b95f97741e1', class: `${leadingIconClass} ${hasValue ? 'cursor-pointer' : 'cursor-default'}`, onClick: hasValue ? this._onLeadingClick : undefined }, hasValue ? (h("slot", { name: "back-icon" }, h("wdpr-icon-button", { variant: "primary", iconName: "back-thick", a11yLabel: "back", size: "small", disabled: this.disabled }))) : (h("slot", { name: "search-icon" }, h("wdpr-icon-library", { icon: "search", size: "small", a11yLabel: "Search" }))))), this.value && (h("span", { key: 'd973adb0a06e1456d513daa4921c2c77c24a48d5', class: trailingIconClass, onClick: this._onTrailingClick }, h("slot", { key: 'b25c773355661dec31f34a8b90600f8e91b4e56e', name: "trailing-icon" }, h("wdpr-search-input-clear-button", { key: '4c23e886a7ed3aed1d2109ea374c3f7334cf7e03', a11yLabel: "Clear search", disabled: this.disabled })))))));
    }
    static get is() { return "wdpr-search-input"; }
    static get encapsulation() { return "shadow"; }
    static get formAssociated() { return true; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-search-input.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-search-input.css"]
        };
    }
    static get properties() {
        return {
            "inputHardcodedValue": {
                "type": "string",
                "attribute": "input-hardcoded-value",
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
                    "text": "(Optional) The hardcoded value for the input field. If provided, it will override the internal state.\nThis is useful for controlled components where the value is managed externally."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
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
            "showLeadingIcon": {
                "type": "boolean",
                "attribute": "show-leading-icon",
                "mutable": true,
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
                "defaultValue": "true"
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
                "reflect": true,
                "defaultValue": "''"
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
            }
        };
    }
    static get states() {
        return {
            "_internalId": {}
        };
    }
    static get events() {
        return [{
                "method": "valueChanged",
                "name": "valueChanged",
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
                "method": "inputFocus",
                "name": "inputFocus",
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
                "method": "inputBlur",
                "name": "inputBlur",
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
                "method": "inputClick",
                "name": "inputClick",
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
                "method": "leadingClick",
                "name": "leadingClick",
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
                "method": "trailingClick",
                "name": "trailingClick",
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
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "handleValueChanged"
            }, {
                "propName": "inputHardcodedValue",
                "methodName": "handleInputHardcodedValueChange"
            }, {
                "propName": "inputName",
                "methodName": "handleFormPropsChanged"
            }, {
                "propName": "disabled",
                "methodName": "handleFormPropsChanged"
            }];
    }
    static get attachInternalsMemberName() { return "_internals"; }
}
const baseClass = 'search-input block w-full border-012 border-stroke-012 bg-surface-input rounded-300 peer h-600 pt-150 text-body-large font-body-default leading-body-large tracking-default placeholder:text-text-disabled [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none';
const disabledClass = `disabled:border-stroke-neutral-light hover:border-stroke-neutral-light disabled:cursor-not-allowed peer-disabled:text-text-disabled disabled:bg-surface-disabled disabled:text-text-disabled`;
const trailingIconClass = `absolute right-200 text-stroke-actionable-default pl-050 peer-disabled:text-stroke-neutral-light peer-disabled:cursor-not-allowed cursor-pointer flex items-center justify-center min-w-dimension-300 min-h-dimension-300`;
const leadingIconClass = `absolute text-stroke-actionable-alt-default px-200 peer-disabled:text-stroke-neutral-light peer-disabled:cursor-not-allowed flex items-center justify-center min-w-dimension-300 min-h-dimension-300`;
const variantsClasses = {
    default: 'border-stroke-actionable-alt-default',
    hover: 'hover:border-stroke-neutral-dark',
    focus: 'focus:outline-stroke-actionable-alt-focused focus:outline-solid focus:outline-offset-[-2px] focus:outline-037',
};
//# sourceMappingURL=wdpr-search-input.js.map
