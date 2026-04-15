import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { g as generateRandId, a as createEvent$1, c as customTwMerge } from './p-CXZGMLMW.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { d as defineCustomElement$6 } from './p-CqBIcCq6.js';
import { d as defineCustomElement$5 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$4 } from './p-_QubyXiP.js';
import { d as defineCustomElement$3 } from './p-BOubPl_u.js';
import { d as defineCustomElement$2 } from './p-DsPXJJ-e.js';

const SIZE_CONFIG = {
    small: {
        container: 'max-w-dimension-1200',
        header: 'heading-xxsmall-alt',
        subHeader: 'body-small',
        button: 'medium',
        input: 'w-dimension-500 h-dimension-400 text-[24px] leading-[32px] font-heading-alt tracking--05',
        counter: 'w-dimension-500 h-dimension-400 text-[24px] leading-[32px] font-heading-alt tracking--05',
    },
    medium: {
        container: 'max-w-dimension-1500',
        header: 'heading-xsmall-alt',
        subHeader: 'body-medium',
        button: 'large',
        input: 'w-dimension-500 h-dimension-550 text-[32px] leading-[40px] font-title-alt tracking--05',
        counter: 'w-dimension-600 h-dimension-500 text-[32px] leading-[40px] font-title-alt tracking--05',
    },
    large: {
        container: 'max-w-dimension-2000',
        header: 'heading-small-alt',
        subHeader: 'body-large',
        button: 'xlarge',
        input: 'w-dimension-700 h-dimension-600 text-[36px] leading-[48px] font-title-alt tracking--05',
        counter: 'w-dimension-700 h-dimension-600 text-[36px] leading-[48px] font-title-alt tracking--05',
    },
};

const WdprStepper$1 = /*@__PURE__*/ proxyCustomElement(class WdprStepper extends H {
    get el() { return this; }
    _internals;
    _inputId = `stepper-${generateRandId()}`;
    _alertId = `alert-${generateRandId()}`;
    _errorId = `error-${generateRandId()}`;
    _defaultValue = 0;
    _inputRef;
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.updateDispatcher = createEvent(this, "updated", 3);
        this.invalidValueDispatcher = createEvent(this, "invalidValue", 7);
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
        const changeEvent = createEvent$1('change', {
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
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["watchHandler"],
        "disabled": ["disabledChanged"]
    }; }
}, [321, "wdpr-stepper", {
        "size": [1],
        "variant": [1],
        "header": [1],
        "subHeader": [1, "sub-header"],
        "value": [1538],
        "fieldName": [1, "field-name"],
        "incrementLabel": [1, "increment-label"],
        "decrementLabel": [1, "decrement-label"],
        "inputAriaLabel": [1, "input-aria-label"],
        "inputAriaDescribedby": [1, "input-aria-describedby"],
        "upperLimit": [2, "upper-limit"],
        "lowerLimit": [2, "lower-limit"],
        "errorMessage": [1025, "error-message"],
        "valid": [1028],
        "messageDuration": [2, "message-duration"],
        "disabled": [4],
        "nonTextEditable": [4, "non-text-editable"],
        "minusDisabled": [4, "minus-disabled"],
        "plusDisabled": [4, "plus-disabled"],
        "valueOnly": [516, "value-only"],
        "resetAfterInvalid": [4, "reset-after-invalid"],
        "setFocus": [64]
    }, undefined, {
        "value": ["watchHandler"],
        "disabled": ["disabledChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-stepper", "wdpr-icon-button", "wdpr-icon-library", "wdpr-inline-message", "wdpr-notification-indicator", "wdpr-status-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-stepper":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprStepper$1);
            }
            break;
        case "wdpr-icon-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-inline-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-status-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprStepper = WdprStepper$1;
const defineCustomElement = defineCustomElement$1;

export { WdprStepper, defineCustomElement };
//# sourceMappingURL=wdpr-stepper.js.map

//# sourceMappingURL=wdpr-stepper.js.map