import { r as registerInstance, c as createEvent, a as getElement, h, H as Host } from './index-CykM8GCN.js';
import { g as generateRandId } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const wdprDualTextFieldCss = ".dual-text-field-wrapper.sc-wdpr-dual-text-field{display:flex;align-items:center;box-sizing:border-box;background-color:var(--theme-color-surface-default);border-color:var(--theme-color-stroke-actionable-alt-default);border-radius:var(--theme-radius-150);border-width:var(--theme-stroke-012);border-style:solid;gap:var(--theme-spacing-200);padding-inline:var(--theme-spacing-200);padding-block:var(--theme-spacing-112);height:var(--theme-dimension-700);min-width:140px;transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    border-color 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    outline-color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.dual-text-field-wrapper.sc-wdpr-dual-text-field:has(.input:disabled){border-color:var(--theme-color-icon-actionable-alt-disabled);cursor:not-allowed;color:var(--theme-color-text-disabled);background-color:var(--theme-color-surface-disabled)}.dual-text-field-wrapper.sc-wdpr-dual-text-field:has(.input:read-only):has(.input:not(:disabled)){border-color:var(--theme-color-stroke-disabled)}.dual-text-field-wrapper.sc-wdpr-dual-text-field:hover{border-color:var(--theme-color-stroke-actionable-alt-hover)}.dual-text-field-wrapper.sc-wdpr-dual-text-field:has(.input:focus-visible){outline-style:solid;outline-width:var(--theme-stroke-037);outline-offset:-2px;outline-color:var(--theme-color-stroke-actionable-focused)}.dual-text-field-wrapper.sc-wdpr-dual-text-field:has(.input[aria-invalid='true']),.dual-text-field-wrapper.sc-wdpr-dual-text-field:has(.input[aria-invalid='true']):hover,.dual-text-field-wrapper.sc-wdpr-dual-text-field:has(.input[aria-invalid='true']):active{border-color:var(--theme-color-stroke-status-critical-alt)}.dual-text-field-wrapper.sc-wdpr-dual-text-field:has(.input[aria-invalid='true']:focus-visible){outline-color:var(--theme-color-stroke-status-critical-alt)}.divider-wrapper.sc-wdpr-dual-text-field{height:var(--theme-dimension-400)}.input-wrapper.sc-wdpr-dual-text-field{position:relative;width:100%;align-self:stretch}.input.sc-wdpr-dual-text-field{display:block;width:100%;border:none;padding-top:var(--theme-spacing-175);padding-left:var(--theme-spacing-000);appearance:none;color:var(--theme-color-text-body);background-color:transparent;outline:none;transition:all 150ms cubic-bezier(0.4, 0, 0.2, 1);font-size:var(--theme-typography-font-size-body-large);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-large);letter-spacing:var(--theme-typography-letter-spacing-default);font-family:var(--theme-font-family-default)}.input.sc-wdpr-dual-text-field::placeholder{color:var(--theme-color-text-disabled)}.input.sc-wdpr-dual-text-field:disabled{cursor:not-allowed;color:var(--theme-color-text-disabled-alt)}.input.sc-wdpr-dual-text-field:read-only{pointer-events:none}.input-label.sc-wdpr-dual-text-field{position:absolute;top:var(--theme-spacing-000);display:block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:text;transition:all 150ms cubic-bezier(0.4, 0, 0.2, 1);color:var(--theme-color-text-disclaimer);font-size:var(--theme-typography-font-size-label-small);font-weight:var(--theme-typography-font-weight-label-default);line-height:var(--theme-typography-line-height-label-small);height:calc(var(--theme-typography-line-height-label-small) + 2px);letter-spacing:var(--theme-typography-letter-spacing-default);font-family:var(--theme-font-family-default)}.input.sc-wdpr-dual-text-field:placeholder-shown+.input-label.sc-wdpr-dual-text-field{top:var(--theme-spacing-087);font-size:var(--theme-typography-font-size-body-large);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-large);height:initial;letter-spacing:var(--theme-typography-letter-spacing-default)}.input.sc-wdpr-dual-text-field:focus+.input-label.sc-wdpr-dual-text-field{top:var(--theme-spacing-000);font-size:var(--theme-typography-font-size-label-small);font-weight:var(--theme-typography-font-weight-label-default);line-height:var(--theme-typography-line-height-label-small);height:calc(var(--theme-typography-line-height-label-small) + 2px);letter-spacing:var(--theme-typography-letter-spacing-default)}.input.sc-wdpr-dual-text-field:disabled+.input-label.sc-wdpr-dual-text-field{cursor:not-allowed;color:var(--theme-color-text-disabled)}.input.sc-wdpr-dual-text-field:read-only+.input-label.sc-wdpr-dual-text-field{pointer-events:none}.inline-message-wrapper.sc-wdpr-dual-text-field{margin-left:var(--theme-spacing-050);margin-top:var(--theme-spacing-050)}";

const WdprDualTextField = class {
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
     * Reference to the native leading `<input>` element.
     */
    _leadingInputEl;
    /**
     * Reference to the native trailing `<input>` element.
     */
    _trailingInputlEl;
    _leadingIconButton;
    _trailingIconButton;
    get el() { return getElement(this); }
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
    static get formAssociated() { return true; }
    static get watchers() { return {
        "disabled": ["updateDisabledState"],
        "leadingValue": ["formPropsChanged"],
        "trailingValue": ["formPropsChanged"],
        "leadingName": ["formPropsChanged"],
        "trailingName": ["formPropsChanged"],
        "required": ["formPropsChanged"]
    }; }
};
WdprDualTextField.style = wdprDualTextFieldCss;

export { WdprDualTextField as wdpr_dual_text_field };
//# sourceMappingURL=wdpr-dual-text-field.entry.js.map

//# sourceMappingURL=wdpr-dual-text-field.entry.js.map