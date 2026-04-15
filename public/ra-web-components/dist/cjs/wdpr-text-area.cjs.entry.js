'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
var bundleCjs = require('./bundle-cjs-Cajw0YnV.js');

const WdprTextArea = class {
    _textAreaElement;
    _internals;
    _defaultValue = '';
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprValueChanged = index.createEvent(this, "wdprValueChanged", 7);
        this.wdprInputFocus = index.createEvent(this, "wdprInputFocus", 7);
        this.wdprInputBlur = index.createEvent(this, "wdprInputBlur", 7);
        this.wdprInputClick = index.createEvent(this, "wdprInputClick", 7);
        this.wdprTrailingClick = index.createEvent(this, "wdprTrailingClick", 7);
        this._internals = this.el.attachInternals();
    }
    get el() { return index.getElement(this); }
    _internalId;
    _trailingSlot;
    textAreaId;
    name;
    maxLength = 3000;
    type = 'text';
    value = '';
    label = 'Label';
    helperText = '';
    isDisabled = false;
    hasError = false;
    readonly = false;
    showCounter = false;
    rows = 1;
    requirementIndicator = 'none';
    a11yHasPopup;
    a11yControls;
    a11yExpanded;
    a11yAutoComplete;
    a11yActiveDescendant;
    a11yDescribedBy;
    wdprValueChanged;
    wdprInputFocus;
    wdprInputBlur;
    wdprInputClick;
    wdprTrailingClick;
    _handleKeyDown(event) {
        if (event.key == keycodes_model.KEYBOARD_KEYS.ESCAPE) {
            event.preventDefault();
            document.activeElement?.blur();
        }
    }
    _handleIconButtonClick() {
        this._handleSlotClick();
    }
    _updateDisabledState() {
        this._updateSlotDisabledState();
    }
    _handleValueChange(nextValue) {
        const displayValue = this._getDisplayValue(nextValue);
        if (displayValue !== (nextValue ?? '')) {
            this.value = displayValue;
            return;
        }
        this._syncFormState(displayValue);
        this._updateTextAreaValue(displayValue);
    }
    async setFocus() {
        this._textAreaElement?.focus();
    }
    connectedCallback() {
        let initialValue = '';
        if (this.readonly && !this.value)
            initialValue = '--';
        if (this.value)
            initialValue = this.value;
        const displayValue = this._getDisplayValue(initialValue);
        this.value = displayValue;
        this._defaultValue = displayValue;
        this._syncFormState(displayValue);
        this.el.addEventListener('formreset', this._handleFormReset);
    }
    disconnectedCallback() {
        this.el.removeEventListener('formreset', this._handleFormReset);
    }
    componentWillLoad() {
        this._internalId = this.textAreaId || `wdpr-text-field-${utils.generateRandId()}`;
        this._trailingSlot = this.el.querySelector('[slot="trailing-button"]');
    }
    componentDidLoad() {
        this._updateTextAreaValue(this.value);
    }
    _updateSlotDisabledState = () => {
        if (this.isDisabled) {
            this._trailingSlot?.setAttribute('disabled', '');
        }
        else {
            this._trailingSlot?.removeAttribute('disabled');
        }
    };
    _handleSlotChange = () => {
        this._updateDisabledState();
    };
    _handleFormReset = () => {
        this.value = this._defaultValue ?? '';
    };
    _syncFormState(value) {
        this._internals?.setFormValue?.(value ?? '');
    }
    _getDisplayValue(value) {
        // If readonly and empty, show placeholder
        const displayValue = this.readonly && !value ? '--' : value ?? '';
        // Validate maxLength
        const isMaxValid = typeof this.maxLength === 'number' && Number.isFinite(this.maxLength) && this.maxLength > 0;
        if (!isMaxValid)
            return displayValue;
        // Truncate if over maxLength
        if (displayValue.length > this.maxLength)
            return displayValue.slice(0, this.maxLength);
        return displayValue;
    }
    _updateTextAreaValue(value) {
        if (!this._textAreaElement)
            return;
        const displayValue = this._getDisplayValue(value);
        if (this._textAreaElement.value !== displayValue)
            this._textAreaElement.value = displayValue ?? '';
    }
    _triggerInputChangeEvents() {
        const inputEvent = utils.createEvent('input', { bubbles: true, composed: true, cancelable: true, detail: this.value });
        this.el.dispatchEvent(inputEvent);
        const changeEvent = utils.createEvent('change', { bubbles: true, composed: true, cancelable: true });
        this.el.dispatchEvent(changeEvent);
    }
    _handleSlotClick = () => {
        const currentValue = this.value;
        if (this.value) {
            this.value = '';
            this._updateTextAreaValue(this.value);
            this._triggerInputChangeEvents();
            this.wdprValueChanged.emit(this.value);
        }
        this.wdprTrailingClick.emit(currentValue);
        this._trailingSlot?.blur();
    };
    _handleInput = (event) => {
        const input = event.target;
        const nextValue = this._getDisplayValue(input.value);
        this.value = nextValue;
        if (input.value !== nextValue)
            input.value = nextValue;
        this.wdprValueChanged.emit(this.value);
        this._triggerInputChangeEvents();
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
            return '*';
        if (this.requirementIndicator === 'optional')
            return '(Optional)';
        return '';
    }
    get _wrapperClasses() {
        const wrapperClasses = wrapperVariantClasses[this.hasError ? 'error' : 'noError'];
        return utils.customTwMerge(wrapperBaseClasses, wrapperClasses.default, wrapperClasses.hover, wrapperClasses.focusVisible);
    }
    get _textAreaClasses() {
        return bundleCjs.bundleCjsExports.twMerge(textAreaClasses, this._trailingSlot ? 'pr-400' : '');
    }
    render() {
        // Compose aria-describedby: user-provided + helper text
        let describedBy = this.a11yDescribedBy ? this.a11yDescribedBy : '';
        if (this.helperText)
            describedBy = describedBy ? `${describedBy} ${this._internalId}-helper-text` : `${this._internalId}-helper-text`;
        return (index.h(index.Host, { key: '941bf6b1185a079d8ddbb957f4af8abfc6ee7891' }, index.h("div", { key: 'e478ea2110aa79d0d2e1afeda551028e5400b440', class: this._wrapperClasses }, index.h("div", { key: 'ce1d6c4ab3e51ae2c1cc3f2078353e1812edddc9', class: "relative w-full self-stretch pt-200", part: "input-wrapper" }, index.h("textarea", { key: 'd3d556d130a516ed8859e479a4f20f80850ba488', id: this._internalId, ref: el => (this._textAreaElement = el), class: this._textAreaClasses, rows: this.rows, placeholder: " ", name: this.name, maxlength: this.maxLength != null ? String(this.maxLength) : '3000', value: this._getDisplayValue(this.value), tabindex: this.isDisabled ? -1 : undefined, disabled: this.isDisabled, readonly: this.readonly, required: this.requirementIndicator === 'required', "aria-invalid": this.hasError ? 'true' : undefined, "aria-controls": this.a11yControls, "aria-haspopup": this.a11yHasPopup, "aria-expanded": this.a11yExpanded, "aria-autocomplete": this.a11yAutoComplete, "aria-activedescendant": this.a11yActiveDescendant, "aria-describedby": describedBy || undefined, onInput: this._handleInput, onFocus: this._handleFocus, onBlur: this._handleBlur, onClick: this._handleClick }), index.h("label", { key: '216216354a676fe67e004c26c18fcce030c22323', htmlFor: this._internalId, class: labelClasses, innerHTML: `${this.label} ${this._requirementLabel}` })), this._trailingSlot && (index.h("div", { key: '6d1a623f96edf9ee60e8d450832bafad90b198d8', part: "trailing-button-wrapper", class: "absolute right-150 top-125 flex items-center justify-center" }, index.h("slot", { key: '71f432ed663e21cbad6be0591bca53942d64e5dc', onSlotchange: this._handleSlotChange, name: "trailing-button" })))), this.showCounter === true && (index.h("div", { key: '65f7fc940aef89573f002ab2b406459ba13b3504', class: "mt-100", part: "counter-wrapper" }, index.h("span", { key: '189128b37f9f1f3a2e9db3121948970d110f43ce', class: "text-text-body text-body-large" }, `${this.value.length}/${Number.isFinite(this.maxLength) ? this.maxLength : 3000}`))), this.helperText && (index.h("div", { key: '3f844338a1e8c2cc1a182d15886204d36bbd66d7', class: "mt-100", part: "helper-text-wrapper" }, index.h("wdpr-inline-message", { key: '4afdf031b54246c1b76690e515e66096d59c5606', id: `${this._internalId}-helper-text`, variant: this.hasError ? 'error' : 'informational', size: "default", role: "status" }, this.helperText)))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "isDisabled": ["_updateDisabledState"],
        "value": ["_handleValueChange"]
    }; }
};
const wrapperBaseClasses = `relative flex items-center box-border bg-surface-default rounded-150 text-text-body gap-200 pl-200 pr-050 pt-100 pb-150 h-auto border-012 min-w-[140px] min-h-[56px]
    has-[textarea:focus-visible]:outline has-[textarea:focus-visible]:outline-solid has-[textarea:focus-visible]:outline-037 has-[textarea:focus-visible]:outline-offset-[-2px]
    has-[textarea:read-only]:has-[textarea:not(:disabled)]:border-stroke-disabled
    has-[textarea:disabled]:border-icon-actionable-alt-disabled has-[textarea:disabled]:cursor-not-allowed
    has-[textarea:disabled]:text-text-disabled has-[textarea:disabled]:bg-surface-disabled
  `;
const wrapperVariantClasses = {
    noError: {
        default: 'border-stroke-actionable-alt-default',
        hover: 'hover:border-stroke-actionable-alt-hover',
        focusVisible: 'has-focus-visible:outline-stroke-actionable-focused',
    },
    error: {
        default: 'border-stroke-status-critical-alt',
        focusVisible: 'has-focus-visible:outline-stroke-status-critical-alt',
    },
};
const textAreaClasses = `resize-none block body-large w-full border-none appearance-none peer placeholder:text-text-disabled focus:outline-none
    disabled:cursor-not-allowed disabled:text-text-disabled-alt read-only:pointer-events-none
    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0
    [&::-webkit-scrollbar]:w-050 [&::-webkit-scrollbar-thumb]:max-h-200 [&::-webkit-scrollbar-thumb]:bg-surface-neutral-light [&::-webkit-scrollbar-thumb]:rounded-050`;
const labelClasses = `absolute top-050 z-10 block w-full truncate cursor-text transition-all text-text-disclaimer text-label-small font-label-default leading-label-small h-[calc(var(--leading-label-small)+2px)]
  peer-disabled:cursor-not-allowed peer-disabled:text-text-disabled
  peer-placeholder-shown:top-125 peer-placeholder-shown:text-body-large peer-placeholder-shown:font-body-default
  peer-placeholder-shown:tracking-default peer-placeholder-shown:leading-body-large peer-placeholder-shown:h-auto
  peer-focus:top-050 peer-focus:text-body-small peer-focus:font-label-default peer-focus:leading-label-small peer-focus:h-[calc(var(--leading-label-small)+2px)] peer-read-only:pointer-events-none`;

exports.wdpr_text_area = WdprTextArea;
//# sourceMappingURL=wdpr-text-area.entry.cjs.js.map

//# sourceMappingURL=wdpr-text-area.cjs.entry.js.map