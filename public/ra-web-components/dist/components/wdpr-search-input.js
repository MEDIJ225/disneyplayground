import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-BRIGwGQo.js';
import { a as createEvent$1 } from './p-CXZGMLMW.js';
import { d as defineCustomElement$5 } from './p-CqBIcCq6.js';
import { d as defineCustomElement$4 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$3 } from './p-BOubPl_u.js';
import { d as defineCustomElement$2 } from './p-t7dChQWd.js';
import { b as bundleCjsExports } from './p-CF3xLdU_.js';

const wdprSearchInputCss = ".search-input{color:var(--theme-color-text-body)}.search-input:disabled{cursor:not-allowed;color:var(--theme-color-text-disabled-alt)}.search-input-label{position:absolute;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:text;transition:top 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    transform 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    font-size 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    font-weight 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    line-height 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    letter-spacing 150ms cubic-bezier(0.4, 0, 0.2, 1),\n    color 150ms cubic-bezier(0.4, 0, 0.2, 1);color:var(--theme-color-text-disclaimer);top:var(--theme-spacing-125);transform:translateY(0);font-size:var(--theme-typography-font-size-label-small);font-weight:var(--theme-typography-font-weight-label-default);line-height:var(--theme-typography-line-height-label-small);letter-spacing:var(--theme-typography-letter-spacing-default);font-family:var(--theme-font-family-default);margin-left:1px;z-index:10}.search-input:placeholder-shown+.search-input-label,:host(.search-input--empty) .search-input:not(:focus)+.search-input-label{top:50%;transform:translateY(-50%);font-size:var(--theme-typography-font-size-body-large);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-large)}.search-input:focus+.search-input-label{top:var(--theme-spacing-125);transform:translateY(0);font-size:var(--theme-typography-font-size-label-small);font-weight:var(--theme-typography-font-weight-label-default);line-height:var(--theme-typography-line-height-label-small)}.search-input:disabled+.search-input-label{cursor:not-allowed;color:var(--theme-color-text-disabled)}";

const WdprSearchInput$1 = /*@__PURE__*/ proxyCustomElement(class WdprSearchInput extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.valueChanged = createEvent(this, "valueChanged", 7);
        this.inputFocus = createEvent(this, "inputFocus", 7);
        this.inputBlur = createEvent(this, "inputBlur", 7);
        this.inputClick = createEvent(this, "inputClick", 7);
        this.leadingClick = createEvent(this, "leadingClick", 7);
        this.trailingClick = createEvent(this, "trailingClick", 7);
        this._internals = this.attachInternals();
    }
    get el() { return this; }
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
        const inputEvent = createEvent$1('input', { bubbles: true, composed: true, cancelable: true, detail: this.value });
        this.el.dispatchEvent(inputEvent);
        const changeEvent = createEvent$1('change', { bubbles: true, composed: true, cancelable: true });
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
        const statusClasses = bundleCjsExports.twMerge(baseClass, marginClass, variantClasses.default, variantClasses.hover, variantClasses.focus);
        const disabledClasses = bundleCjsExports.twMerge(baseClass, marginClass, disabledClass);
        return this.disabled ? disabledClasses : statusClasses;
    }
    get _labelClass() {
        const leftClass = this.showLeadingIcon ? 'left-600' : 'left-300';
        const rightClass = this.showLeadingIcon ? 'right-600' : 'right-300';
        return bundleCjsExports.twMerge('search-input-label', leftClass, rightClass);
    }
    componentWillLoad() {
        this._internalId = this.inputId || 'wdpr-text-field';
    }
    render() {
        const hasValue = !!this.value;
        return (h(Host, { key: '1e2c8ebf500b6f0977e186ba2dd57a77859347dc', class: { 'search-input--empty': !(this.value ?? '').length } }, h("div", { key: 'ea31ce0621e49c4ff099014d14b32a4bc5fb2e89', class: "flex items-center relative w-full" }, h("input", { key: 'c7a9a755a5b31f9966cc40936522397499961d23', ref: el => (this._nativeInput = el), type: "search", placeholder: " ", id: this._internalId, class: this._textFieldClass, disabled: this.disabled, "aria-disabled": this.disabled ? 'true' : 'false', "aria-label": this.label, name: this.name, value: this.value, onInput: this._handleInput, tabIndex: this.disabled ? -1 : this.customTabindex, onFocus: this._handleFocus, onBlur: this._handleBlur, onClick: this._handleClick }), h("label", { key: '9aaf70c2d2fd80176f8f4984e640a0b81d201fbc', htmlFor: this._internalId, class: this._labelClass }, this.label), this.showLeadingIcon && (h("span", { key: 'e5be4bb1cfdbb445d6738ead63152b95f97741e1', class: `${leadingIconClass} ${hasValue ? 'cursor-pointer' : 'cursor-default'}`, onClick: hasValue ? this._onLeadingClick : undefined }, hasValue ? (h("slot", { name: "back-icon" }, h("wdpr-icon-button", { variant: "primary", iconName: "back-thick", a11yLabel: "back", size: "small", disabled: this.disabled }))) : (h("slot", { name: "search-icon" }, h("wdpr-icon-library", { icon: "search", size: "small", a11yLabel: "Search" }))))), this.value && (h("span", { key: 'd973adb0a06e1456d513daa4921c2c77c24a48d5', class: trailingIconClass, onClick: this._onTrailingClick }, h("slot", { key: 'b25c773355661dec31f34a8b90600f8e91b4e56e', name: "trailing-icon" }, h("wdpr-search-input-clear-button", { key: '4c23e886a7ed3aed1d2109ea374c3f7334cf7e03', a11yLabel: "Clear search", disabled: this.disabled })))))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["handleValueChanged"],
        "inputHardcodedValue": ["handleInputHardcodedValueChange"],
        "inputName": ["handleFormPropsChanged"],
        "disabled": ["handleFormPropsChanged"]
    }; }
    static get style() { return wdprSearchInputCss; }
}, [321, "wdpr-search-input", {
        "inputHardcodedValue": [1, "input-hardcoded-value"],
        "inputId": [1, "input-id"],
        "showLeadingIcon": [1540, "show-leading-icon"],
        "value": [1537],
        "name": [1],
        "disabled": [4],
        "customTabindex": [2, "custom-tabindex"],
        "label": [1],
        "_internalId": [32]
    }, undefined, {
        "value": ["handleValueChanged"],
        "inputHardcodedValue": ["handleInputHardcodedValueChange"],
        "inputName": ["handleFormPropsChanged"],
        "disabled": ["handleFormPropsChanged"]
    }]);
const baseClass = 'search-input block w-full border-012 border-stroke-012 bg-surface-input rounded-300 peer h-600 pt-150 text-body-large font-body-default leading-body-large tracking-default placeholder:text-text-disabled [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none';
const disabledClass = `disabled:border-stroke-neutral-light hover:border-stroke-neutral-light disabled:cursor-not-allowed peer-disabled:text-text-disabled disabled:bg-surface-disabled disabled:text-text-disabled`;
const trailingIconClass = `absolute right-200 text-stroke-actionable-default pl-050 peer-disabled:text-stroke-neutral-light peer-disabled:cursor-not-allowed cursor-pointer flex items-center justify-center min-w-dimension-300 min-h-dimension-300`;
const leadingIconClass = `absolute text-stroke-actionable-alt-default px-200 peer-disabled:text-stroke-neutral-light peer-disabled:cursor-not-allowed flex items-center justify-center min-w-dimension-300 min-h-dimension-300`;
const variantsClasses = {
    default: 'border-stroke-actionable-alt-default',
    hover: 'hover:border-stroke-neutral-dark',
    focus: 'focus:outline-stroke-actionable-alt-focused focus:outline-solid focus:outline-offset-[-2px] focus:outline-037',
};
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-search-input", "wdpr-icon-button", "wdpr-icon-library", "wdpr-notification-indicator", "wdpr-search-input-clear-button"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-search-input":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprSearchInput$1);
            }
            break;
        case "wdpr-icon-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-search-input-clear-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprSearchInput = WdprSearchInput$1;
const defineCustomElement = defineCustomElement$1;

export { WdprSearchInput, defineCustomElement };
//# sourceMappingURL=wdpr-search-input.js.map

//# sourceMappingURL=wdpr-search-input.js.map