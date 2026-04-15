import { r as registerInstance, c as createEvent, a as getElement, h, H as Host } from './index-CykM8GCN.js';
import { g as generateRandId, a as createEvent$1 } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const wdprTextFieldCss = ".text-field-wrapper.sc-wdpr-text-field{display:flex;align-items:center;box-sizing:border-box;background-color:var(--theme-color-surface-default);border-color:var(--theme-color-stroke-actionable-alt-default);border-radius:var(--theme-radius-150);border-width:var(--theme-stroke-012);border-style:solid;gap:var(--theme-spacing-200);padding:var(--theme-spacing-200);height:var(--theme-dimension-700);min-width:140px;transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    border-color 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    outline-color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.text-field-wrapper.sc-wdpr-text-field:has(.input:disabled){border-color:var(--theme-color-icon-actionable-alt-disabled);cursor:not-allowed;color:var(--theme-color-text-disabled);background-color:var(--theme-color-surface-disabled)}.text-field-wrapper.sc-wdpr-text-field:has(.input:focus),.text-field-wrapper.sc-wdpr-text-field:has(.input:not(:placeholder-shown)){padding-inline:var(--theme-spacing-200);padding-block:var(--theme-spacing-112)}.text-field-wrapper.sc-wdpr-text-field:has(.input:read-only):has(.input:not(:disabled)){border-color:var(--theme-color-stroke-disabled)}.text-field-wrapper.sc-wdpr-text-field:hover{border-color:var(--theme-color-stroke-actionable-alt-hover)}.text-field-wrapper.sc-wdpr-text-field:has(.input:focus-visible){outline-style:solid;outline-width:var(--theme-stroke-037);outline-offset:-2px;outline-color:var(--theme-color-stroke-actionable-focused)}.text-field-wrapper.sc-wdpr-text-field:has(.input[aria-invalid='true']),.text-field-wrapper.sc-wdpr-text-field:has(.input[aria-invalid='true']):hover,.text-field-wrapper.sc-wdpr-text-field:has(.input[aria-invalid='true']):active{border-color:var(--theme-color-stroke-status-critical-alt)}.text-field-wrapper.sc-wdpr-text-field:has(.input[aria-invalid='true']:focus-visible){outline-color:var(--theme-color-stroke-status-critical-alt)}.icon-wrapper.sc-wdpr-text-field{height:var(--theme-dimension-250)}.input-wrapper.sc-wdpr-text-field{position:relative;width:100%;align-self:stretch}.input.sc-wdpr-text-field{display:block;width:100%;border:none;padding-top:var(--theme-spacing-175);padding-left:var(--theme-spacing-000);appearance:none;color:var(--theme-color-text-body);background-color:transparent;outline:none;transition:all 150ms cubic-bezier(0.4, 0, 0.2, 1);font-size:var(--theme-typography-font-size-body-large);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-large);letter-spacing:var(--theme-typography-letter-spacing-default);font-family:var(--theme-font-family-default)}.input.sc-wdpr-text-field::placeholder{color:var(--theme-color-text-disabled)}.input.sc-wdpr-text-field:disabled{cursor:not-allowed;color:var(--theme-color-text-disabled-alt)}.input.sc-wdpr-text-field:read-only{pointer-events:none}.input[type='number'].sc-wdpr-text-field{appearance:textfield}.input[type='number'].sc-wdpr-text-field::-webkit-outer-spin-button,.input[type='number'].sc-wdpr-text-field::-webkit-inner-spin-button{appearance:none;margin:0}.input-label.sc-wdpr-text-field{position:absolute;top:var(--theme-spacing-000);display:block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:text;transition:all 150ms cubic-bezier(0.4, 0, 0.2, 1);color:var(--theme-color-text-disclaimer);font-size:var(--theme-typography-font-size-label-small);font-weight:var(--theme-typography-font-weight-label-default);line-height:var(--theme-typography-line-height-label-small);height:calc(var(--theme-typography-line-height-label-small) + 2px);letter-spacing:var(--theme-typography-letter-spacing-default);font-family:var(--theme-font-family-default)}.input.sc-wdpr-text-field:placeholder-shown+.input-label.sc-wdpr-text-field{font-size:var(--theme-typography-font-size-body-large);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-large);height:initial;letter-spacing:var(--theme-typography-letter-spacing-default)}.input.sc-wdpr-text-field:focus+.input-label.sc-wdpr-text-field{font-size:var(--theme-typography-font-size-label-small);font-weight:var(--theme-typography-font-weight-label-default);line-height:var(--theme-typography-line-height-label-small);height:calc(var(--theme-typography-line-height-label-small) + 2px);letter-spacing:var(--theme-typography-letter-spacing-default)}.input.sc-wdpr-text-field:disabled+.input-label.sc-wdpr-text-field{cursor:not-allowed;color:var(--theme-color-text-disabled)}.input.sc-wdpr-text-field:read-only+.input-label.sc-wdpr-text-field{pointer-events:none}.inline-message-wrapper.sc-wdpr-text-field{margin-left:var(--theme-spacing-050);margin-top:var(--theme-spacing-050)}";

const WdprTextField = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprValueChanged = createEvent(this, "wdprValueChanged", 7);
        this.wdprInputFocus = createEvent(this, "wdprInputFocus", 7);
        this.wdprInputBlur = createEvent(this, "wdprInputBlur", 7);
        this.wdprInputClick = createEvent(this, "wdprInputClick", 7);
        this.wdprLeadingIconClick = createEvent(this, "wdprLeadingIconClick", 7);
        this.wdprTrailingIconClick = createEvent(this, "wdprTrailingIconClick", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    /**
     * Reference to the native `<input>` element.
     */
    _nativeInput;
    _internals;
    _defaultValue = '';
    get el() { return getElement(this); }
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
        const inputEvent = createEvent$1('input', { bubbles: true, composed: true, cancelable: true, detail: this.value });
        this.el.dispatchEvent(inputEvent);
        const changeEvent = createEvent$1('change', { bubbles: true, composed: true, cancelable: true });
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
    static get formAssociated() { return true; }
    static get watchers() { return {
        "disabled": ["updateDisabledState"],
        "value": ["_handleValueChange"]
    }; }
};
WdprTextField.style = wdprTextFieldCss;

export { WdprTextField as wdpr_text_field };
//# sourceMappingURL=wdpr-text-field.entry.js.map

//# sourceMappingURL=wdpr-text-field.entry.js.map