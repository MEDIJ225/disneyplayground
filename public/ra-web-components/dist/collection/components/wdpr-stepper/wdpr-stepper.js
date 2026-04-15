import { h } from "@stencil/core";
import { createEvent, customTwMerge, generateRandId } from "../../utils/utils";
import { SIZE_CONFIG } from "./wdpr-stepper.model";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
export class WdprStepper {
    el;
    _internals;
    _inputId = `stepper-${generateRandId()}`;
    _alertId = `alert-${generateRandId()}`;
    _errorId = `error-${generateRandId()}`;
    _defaultValue = 0;
    _inputRef;
    constructor() {
        this._internals = this.el.attachInternals();
    }
    /**
     * Size of the stepper component
     */
    size = 'medium';
    /**
     * Variant of the stepper component
     */
    variant = 'stacked';
    /**
     * Header text for inline variant (main label)
     */
    header;
    /**
     * Sub-header text for inline variant (optional, 2 lines max)
     */
    subHeader;
    /**
     * Current value of the stepper
     */
    value = 0;
    /**
     * HTML input name and id
     */
    fieldName;
    /**
     * Aria label for the increment button
     */
    incrementLabel = 'Add One Item';
    /**
     * Aria label for the decrement button
     */
    decrementLabel = 'Remove One Item';
    /**
     * Aria label for the editable input
     */
    inputAriaLabel = 'Quantity';
    /**
     * Aria describedby attribute for the editable input
     */
    inputAriaDescribedby;
    /**
     * The upper limit for the stepper
     */
    upperLimit = 10;
    /**
     * The lower limit for the stepper
     */
    lowerLimit = 0;
    /**
     * Error message to display
     */
    errorMessage = '';
    /**
     * Whether the input is valid
     */
    valid = true;
    /**
     * Milliseconds the error message is displayed
     */
    messageDuration = 4500;
    /**
     * Disabled state
     */
    disabled = false;
    /**
     * Whether the stepper should be non-text-editable
     */
    nonTextEditable = false;
    /**
     * Disabled state for minus button
     */
    minusDisabled = false;
    /**
     * Disabled state for plus button
     */
    plusDisabled = false;
    /**
     * Only display the number/input
     */
    valueOnly = false;
    /**
     * Reset the value to the previous valid value if the new value is invalid
     */
    resetAfterInvalid = false;
    /**
     * Custom event emitted upon value change
     */
    updateDispatcher;
    /**
     * Custom event emitted when the value is invalid
     */
    invalidValueDispatcher;
    watchHandler(newValue, oldValue) {
        this._countChanged(newValue, oldValue);
    }
    disabledChanged() {
        this._updateFormValue();
    }
    componentWillLoad() {
        this._defaultValue = this.value;
    }
    connectedCallback() {
        this._updateFormValue();
        this.el.addEventListener('formreset', this._handleFormReset);
    }
    disconnectedCallback() {
        this.el.removeEventListener('formreset', this._handleFormReset);
    }
    _handleFormReset = () => {
        this.value = this._defaultValue;
        this.valid = true;
        this.errorMessage = '';
    };
    _updateFormValue() {
        const formValue = this.disabled ? null : this.value.toString();
        this._internals?.setFormValue?.(formValue);
    }
    _countChanged(newVal, oldVal) {
        if (typeof oldVal === 'undefined') {
            return;
        }
        // Clamp value to limits
        this.value = Math.max(this.lowerLimit, Math.min(this.upperLimit, Number(newVal)));
        // Update aria alert
        this._updateAriaAlert(newVal, oldVal);
        this.updateDispatcher.emit({
            value: this.value,
            id: this.fieldName,
            fieldName: this.fieldName,
        });
        this._updateFormValue();
    }
    _updateAriaAlert(newVal, oldVal) {
        const alertEl = this.el.shadowRoot?.querySelector(`#${this._alertId}`);
        if (!alertEl)
            return;
        let alertText = `quantity ${this.value}`;
        const newMinusState = this._isButtonDisabled(newVal, this.lowerLimit, this.disabled, this.minusDisabled);
        const oldMinusState = this._isButtonDisabled(oldVal, this.lowerLimit, this.disabled, this.minusDisabled);
        const newPlusState = this._isButtonDisabled(newVal, this.upperLimit, this.disabled, this.plusDisabled);
        const oldPlusState = this._isButtonDisabled(oldVal, this.upperLimit, this.disabled, this.plusDisabled);
        if (newMinusState !== oldMinusState) {
            alertText += `. minus button is now ${newMinusState ? 'disabled' : 'enabled'}`;
        }
        if (newPlusState !== oldPlusState) {
            alertText += `. plus button is now ${newPlusState ? 'disabled' : 'enabled'}`;
        }
        alertEl.textContent = alertText;
    }
    _isButtonDisabled(value, limit, disabled, individualDisabled) {
        return individualDisabled || value === limit || disabled;
    }
    _canIncrement() {
        return !this.disabled && !this.plusDisabled && this.value < this.upperLimit;
    }
    _canDecrement() {
        return !this.disabled && !this.minusDisabled && this.value > this.lowerLimit;
    }
    _increment = () => {
        if (this._canIncrement()) {
            this.valid = true;
            this.value = Number(this.value) + 1;
            this._emitNativeEvents();
        }
    };
    _decrement = () => {
        if (this._canDecrement()) {
            this.valid = true;
            this.value = Number(this.value) - 1;
            this._emitNativeEvents();
        }
    };
    _handleKeyDown = (event) => {
        const key = event.key;
        // Allow Tab
        if (key === KEYBOARD_KEYS.TAB)
            return;
        // Check if it's a number key (0-9)
        const isNumber = /^[0-9]$/.test(key);
        if (!this.nonTextEditable) {
            switch (key) {
                case KEYBOARD_KEYS.PAGE_UP:
                    event.preventDefault();
                    this.value = Math.min(this.value + 5, this.upperLimit);
                    break;
                case KEYBOARD_KEYS.PAGE_DOWN:
                    event.preventDefault();
                    this.value = Math.max(this.value - 5, this.lowerLimit);
                    break;
                case KEYBOARD_KEYS.END:
                    event.preventDefault();
                    this.value = this.upperLimit;
                    break;
                case KEYBOARD_KEYS.HOME:
                    event.preventDefault();
                    this.value = this.lowerLimit;
                    break;
                default:
                    // Allow numbers, backspace, delete, and arrow keys
                    const allowedKeys = [
                        KEYBOARD_KEYS.BACKSPACE,
                        KEYBOARD_KEYS.DELETE,
                        KEYBOARD_KEYS.ARROW_LEFT,
                        KEYBOARD_KEYS.ARROW_RIGHT,
                        KEYBOARD_KEYS.ARROW_UP,
                        KEYBOARD_KEYS.ARROW_DOWN,
                    ];
                    if (!isNumber && !allowedKeys.includes(key)) {
                        event.preventDefault();
                    }
            }
        }
        else {
            // In non-text editable mode, prevent all keys except arrows and Tab
            if (key !== KEYBOARD_KEYS.ARROW_UP && key !== KEYBOARD_KEYS.ARROW_DOWN && key !== KEYBOARD_KEYS.TAB) {
                event.preventDefault();
            }
        }
        // Arrow keys for increment/decrement
        if (key === KEYBOARD_KEYS.ARROW_UP && !this.plusDisabled && this.value < this.upperLimit) {
            event.preventDefault();
            this.value += 1;
        }
        else if (key === KEYBOARD_KEYS.ARROW_DOWN && !this.minusDisabled && this.value > this.lowerLimit) {
            event.preventDefault();
            this.value -= 1;
        }
    };
    _handleChange = (event) => {
        const input = event.target;
        const currentValue = this.value;
        const newValue = input.value === '' ? 0 : Number(input.value);
        if (this._isValueInvalid(input.value, newValue)) {
            this._handleInvalidValue(input, currentValue);
        }
        else {
            this._handleValidValue(newValue);
        }
    };
    _isValueInvalid(inputValue, numericValue) {
        return inputValue === '' || numericValue < this.lowerLimit || numericValue > this.upperLimit;
    }
    _handleInvalidValue(input, currentValue) {
        this.valid = false;
        if (!this.errorMessage?.trim()) {
            this.errorMessage = `The value must be between ${this.lowerLimit} and ${this.upperLimit}.`;
        }
        this.invalidValueDispatcher.emit({
            id: this.fieldName,
            fieldName: this.fieldName,
            errorMessage: this.errorMessage,
            value: input.value,
        });
        if (this.resetAfterInvalid) {
            input.value = currentValue.toString();
            this.value = currentValue;
            setTimeout(() => {
                this.valid = true;
                this.errorMessage = '';
            }, this.messageDuration);
        }
    }
    _handleValidValue(newValue) {
        this.valid = true;
        this.errorMessage = '';
        if (this.value !== newValue) {
            this.value = newValue;
            this.updateDispatcher.emit({
                value: this.value,
                id: this.fieldName,
                fieldName: this.fieldName,
            });
        }
    }
    _emitNativeEvents() {
        const changeEvent = createEvent('change', {
            bubbles: true,
            composed: true,
        });
        this.el.dispatchEvent(changeEvent);
    }
    /**
     * Programmatically focus the stepper
     */
    async setFocus() {
        if (this._inputRef) {
            this._inputRef.focus();
        }
        else {
            const input = this.el.shadowRoot?.querySelector('input[type="number"]');
            input?.focus();
        }
    }
    _getButtonSize() {
        return SIZE_CONFIG[this.size].button;
    }
    _getInputClasses() {
        const sizeClass = SIZE_CONFIG[this.size].input;
        const baseClasses = `${sizeClass} text-center border-0 bg-transparent text-text-body appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;
        const focusClasses = 'focus:outline-none focus-visible:outline-focus focus-visible:outline-stroke-actionable-focused focus-visible:outline-solid';
        const disabledClasses = 'disabled:text-text-disabled disabled:cursor-not-allowed';
        return customTwMerge(baseClasses, focusClasses, disabledClasses);
    }
    _getCounterClasses() {
        const sizeClass = SIZE_CONFIG[this.size].counter;
        const baseClasses = `${sizeClass} flex items-center justify-center text-text-body select-none cursor-default`;
        const focusClasses = 'focus-visible:outline-focus focus-visible:outline-stroke-actionable-focused focus-visible:outline-solid';
        const disabledClasses = this.disabled ? 'text-text-disabled' : '';
        return customTwMerge(baseClasses, focusClasses, disabledClasses);
    }
    _getContainerClasses() {
        const isInline = this.variant === 'inline';
        const sizeClass = isInline ? 'w-full' : SIZE_CONFIG[this.size].container;
        const baseClasses = isInline ? 'flex items-center justify-between gap-200 text-left' : 'inline-grid justify-items-center';
        const hiddenButtons = this.valueOnly ? '[&>wdpr-icon-button]:hidden' : '';
        return customTwMerge(baseClasses, hiddenButtons, sizeClass);
    }
    _getLabelContainerClasses() {
        return this.variant === 'inline' ? 'gap-50 text-left items-center' : 'mb-100 text-center';
    }
    _getHeaderClasses() {
        const sizeClass = SIZE_CONFIG[this.size].header;
        const baseClasses = 'text-text-heading m-0 line-clamp-2';
        return customTwMerge(sizeClass, baseClasses);
    }
    _getSubHeaderClasses() {
        const sizeClass = SIZE_CONFIG[this.size].subHeader;
        const baseClasses = 'text-text-body m-0 line-clamp-2';
        return customTwMerge(sizeClass, baseClasses);
    }
    _getStepperControlsClasses() {
        return 'inline-flex items-center gap-100';
    }
    _handleInputRef = (el) => {
        this._inputRef = el;
    };
    render() {
        const showError = !this.valid && !!this.errorMessage?.trim();
        const ariaDescribedBy = [this.inputAriaDescribedby, showError ? this._errorId : null].filter(Boolean).join(' ');
        const buttonSize = this._getButtonSize();
        const isDecrementDisabled = this._isButtonDisabled(this.value, this.lowerLimit, this.disabled, this.minusDisabled);
        const isIncrementDisabled = this._isButtonDisabled(this.value, this.upperLimit, this.disabled, this.plusDisabled);
        const stepperControls = (h("div", { key: '9c790a48f695825b569741f09a735e7623baf323', class: this._getStepperControlsClasses() }, h("wdpr-icon-button", { key: 'e885034055a2f0a96146d0b93a93cf3915bffbab', type: "button", variant: "primary", size: buttonSize, iconName: "decrease", disabled: isDecrementDisabled, onClicked: this._decrement, a11yLabel: this.decrementLabel, tabindex: -1 }), this.nonTextEditable ? (h("div", { class: this._getCounterClasses(), role: "spinbutton", tabindex: 0, onKeyDown: this._handleKeyDown, "aria-label": this.inputAriaLabel, "aria-valuenow": this.value, "aria-valuemin": this.lowerLimit, "aria-valuemax": this.upperLimit, "aria-valuetext": this.value.toString() }, this.value)) : (h("input", { ref: this._handleInputRef, type: "number", id: this._inputId, min: this.lowerLimit, max: this.upperLimit, step: "1", class: this._getInputClasses(), value: this.value, disabled: this.disabled, "aria-label": this.inputAriaLabel, "aria-describedby": ariaDescribedBy ? 'area-description' : undefined, "aria-invalid": !this.valid, onKeyDown: this._handleKeyDown, onChange: this._handleChange })), h("wdpr-icon-button", { key: '804b1bdfe2ffc6b04c926998b13efb0de90604e4', type: "button", variant: "primary", size: buttonSize, iconName: "increase", disabled: isIncrementDisabled, onClicked: this._increment, a11yLabel: this.incrementLabel, tabindex: -1 }), this.fieldName && h("input", { key: '67df38e896290644a36e823ce39e14b829192d69', type: "hidden", name: this.fieldName, value: this.value })));
        return (h("div", { key: '2267118e28f7a3293319bb637c19439730880fef' }, h("div", { key: '92b495e5e71c7fad002e65734c2dc1c124a016ea', class: this._getContainerClasses() }, (this.header || this.subHeader) && (h("div", { key: 'ba4139c348c9dc6dfc8444970ef292ce1c80a888', class: this._getLabelContainerClasses() }, this.header && h("h3", { key: '985f86b9d1f1832ad82a44c9c5f24260dcebde88', class: this._getHeaderClasses() }, this.header), this.subHeader && h("p", { key: '9d77b4dfb6079ba243ba74e91f9109b9d3d67699', class: this._getSubHeaderClasses() }, this.subHeader))), stepperControls), showError && (h("div", { key: '92193222edd0ab3e1cdf4d06e1fea2060ee6b78f', class: "block p-150 w-full" }, h("wdpr-inline-message", { key: 'e7e7203243406d64fb06c998974d6afb37083bbf', variant: "error", size: "small" }, this.errorMessage))), h("span", { key: '76caf8e15f02ea06276a379499a84b71e594af76', id: this._alertId, class: "sr-only", "aria-live": "assertive", "aria-atomic": "true" }), ariaDescribedBy && (h("span", { key: 'abf1cd531689d401bbc2794bbf09cc2a8951f2e7', id: "area-description", class: "sr-only" }, ariaDescribedBy))));
    }
    static get is() { return "wdpr-stepper"; }
    static get encapsulation() { return "shadow"; }
    static get formAssociated() { return true; }
    static get properties() {
        return {
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "StepperSize",
                    "resolved": "\"large\" | \"medium\" | \"small\"",
                    "references": {
                        "StepperSize": {
                            "location": "import",
                            "path": "./wdpr-stepper.model",
                            "id": "src/components/wdpr-stepper/wdpr-stepper.model.ts::StepperSize"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Size of the stepper component"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'medium'"
            },
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "StepperVariant",
                    "resolved": "\"inline\" | \"stacked\"",
                    "references": {
                        "StepperVariant": {
                            "location": "import",
                            "path": "./wdpr-stepper.model",
                            "id": "src/components/wdpr-stepper/wdpr-stepper.model.ts::StepperVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Variant of the stepper component"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'stacked'"
            },
            "header": {
                "type": "string",
                "attribute": "header",
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
                    "text": "Header text for inline variant (main label)"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "subHeader": {
                "type": "string",
                "attribute": "sub-header",
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
                    "text": "Sub-header text for inline variant (optional, 2 lines max)"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "value": {
                "type": "number",
                "attribute": "value",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Current value of the stepper"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "0"
            },
            "fieldName": {
                "type": "string",
                "attribute": "field-name",
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
                    "text": "HTML input name and id"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "incrementLabel": {
                "type": "string",
                "attribute": "increment-label",
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
                    "text": "Aria label for the increment button"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Add One Item'"
            },
            "decrementLabel": {
                "type": "string",
                "attribute": "decrement-label",
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
                    "text": "Aria label for the decrement button"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Remove One Item'"
            },
            "inputAriaLabel": {
                "type": "string",
                "attribute": "input-aria-label",
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
                    "text": "Aria label for the editable input"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Quantity'"
            },
            "inputAriaDescribedby": {
                "type": "string",
                "attribute": "input-aria-describedby",
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
                    "text": "Aria describedby attribute for the editable input"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "upperLimit": {
                "type": "number",
                "attribute": "upper-limit",
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
                    "text": "The upper limit for the stepper"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "10"
            },
            "lowerLimit": {
                "type": "number",
                "attribute": "lower-limit",
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
                    "text": "The lower limit for the stepper"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "0"
            },
            "errorMessage": {
                "type": "string",
                "attribute": "error-message",
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
                    "text": "Error message to display"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
            "valid": {
                "type": "boolean",
                "attribute": "valid",
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
                    "text": "Whether the input is valid"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "messageDuration": {
                "type": "number",
                "attribute": "message-duration",
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
                    "text": "Milliseconds the error message is displayed"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "4500"
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
                    "text": "Disabled state"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "nonTextEditable": {
                "type": "boolean",
                "attribute": "non-text-editable",
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
                    "text": "Whether the stepper should be non-text-editable"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "minusDisabled": {
                "type": "boolean",
                "attribute": "minus-disabled",
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
                    "text": "Disabled state for minus button"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "plusDisabled": {
                "type": "boolean",
                "attribute": "plus-disabled",
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
                    "text": "Disabled state for plus button"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "valueOnly": {
                "type": "boolean",
                "attribute": "value-only",
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
                    "text": "Only display the number/input"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "resetAfterInvalid": {
                "type": "boolean",
                "attribute": "reset-after-invalid",
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
                    "text": "Reset the value to the previous valid value if the new value is invalid"
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
                "method": "updateDispatcher",
                "name": "updated",
                "bubbles": false,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Custom event emitted upon value change"
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "invalidValueDispatcher",
                "name": "invalidValue",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Custom event emitted when the value is invalid"
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
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
                        },
                        "HTMLInputElement": {
                            "location": "global",
                            "id": "global::HTMLInputElement"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Programmatically focus the stepper",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "watchHandler"
            }, {
                "propName": "disabled",
                "methodName": "disabledChanged"
            }];
    }
}
//# sourceMappingURL=wdpr-stepper.js.map
