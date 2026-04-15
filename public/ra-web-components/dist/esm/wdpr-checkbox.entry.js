import { r as registerInstance, c as createEvent, a as getElement, h, F as Fragment, H as Host } from './index-CykM8GCN.js';
import { g as generateRandId, a as createEvent$1, c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprCheckbox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprChange = createEvent(this, "wdprChange", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    defaultChecked = false;
    defaultIndeterminate = false;
    defaultValue = 'on';
    /**
     * Reference to the native `<input>` element.
     */
    inputEl;
    internals;
    get el() { return getElement(this); }
    internalId;
    /**
     * (Optional) A unique ID for the component. It is essential for accessibility,
     * as it connects the `<label>` to the `<input>` control.
     * If not provided, a random ID will be generated.
     */
    inputId;
    /**
     * Name used when participating in form submission.
     */
    name;
    /**
     * The cycle behavior when the user clicks on an indeterminate checkbox.
     * If set to `checked`, the checkbox will be set to checked when clicked.
     * If set to `unchecked`, the checkbox will be set to unchecked when clicked.
     */
    cycleOnIndeterminateClick = 'checked';
    /**
     * The tab index for keyboard navigation. Defaults to `0` for focusable elements.
     */
    customTabindex = 0;
    /**
     * The label text for the checkbox.
     */
    label;
    /**
     * Provides an accessible name for the checkbox, by default the label is the aria label
     */
    customAriaLabel;
    /**
     * References the `id` of an external element to use as the accessible name for the checkbox.
     * Use this when the label is rendered outside the component (e.g. a styled heading).
     * Takes precedence over `a11y-label` and the default label association.
     */
    customAriaLabelledBy;
    /**
     * Defines the label's position relative to the checkbox.
     * `trailing`: Checkbox on the left, label on the right (default).
     * `leading`: Label on the left, checkbox on the right.
     * `none`: the label is visually hidden but remains accessible to screen readers.
     */
    labelPosition = 'trailing';
    /**
     * If `true`, displays the checkbox in an error state.
     */
    error = false;
    /**
     * An optional error message to be displayed and announced by screen readers.
     */
    errorMessage;
    /**
     * If `true`, the checkbox is read-only. The user can focus on it but not change its state.
     */
    readonly = false;
    /**
     * The checked state of the checkbox.
     */
    checked = false;
    handleCheckedChange(newValue) {
        // A checkbox cannot be 'checked' and 'indeterminate' at the same time.
        // If explicitly checked/unchecked, the indeterminate state is removed.
        if (newValue && this.indeterminate) {
            this.indeterminate = false;
        }
        this.updateFormValue();
    }
    /**
     * The indeterminate state of the checkbox. This takes precedence over `checked`.
     */
    indeterminate = false;
    handleIndeterminateChange(newValue) {
        // If it becomes indeterminate, it should not be in a 'checked' state.
        if (newValue) {
            this.checked = false;
        }
        this.updateNativeIndeterminateState();
        this.updateFormValue();
    }
    /**
     * The value submitted with forms when the checkbox is checked.
     */
    value = 'on';
    handleValueChange() {
        this.defaultValue = this.value ?? 'on';
        this.updateFormValue();
    }
    /**
     * If `true`, the user must fill in a value before submitting a form.
     */
    required = false;
    handleRequiredChange() {
        this.updateFormValue();
    }
    /**
     * If `true`, the user cannot interact with the checkbox.
     */
    disabled = false;
    handleDisabledChange() {
        this.updateFormValue();
    }
    /**
     * If `true`, forces the checkbox to display its hover state.
     * Useful when parent components need to control hover appearance.
     */
    forceHover = false;
    /**
     * If `true`, forces the checkbox to display its active/pressed state.
     * Useful when parent components need to control pressed appearance.
     */
    forceActive = false;
    /**
     * Event emitted when the checkbox value changes.
     * Emits an object with the new state details `{ checked: boolean, indeterminate: boolean }`.
     */
    wdprChange;
    connectedCallback() {
        this.defaultChecked = this.checked;
        this.defaultIndeterminate = this.indeterminate;
        this.defaultValue = this.value ?? 'on';
        this.updateFormValue();
        this.el.addEventListener('formreset', this.handleFormReset);
    }
    disconnectedCallback() {
        this.el.removeEventListener('formreset', this.handleFormReset);
    }
    componentWillLoad() {
        this.internalId = this.inputId || `wdpr-checkbox-${generateRandId()}`;
    }
    componentDidLoad() {
        this.inputEl = this.el.shadowRoot.querySelector('input'); // get the native input
        this.updateNativeIndeterminateState();
    }
    /**
     * Sets focus on the native `<input>` element.
     * Usage: checkbox.setFocus();
     */
    async setFocus() {
        this.inputEl?.focus();
    }
    /**
     * Synchronizes the `indeterminate` property of the native `<input>` element,
     * as it cannot be set via an HTML attribute.
     */
    updateNativeIndeterminateState() {
        const input = this.el.shadowRoot.querySelector('input');
        if (input) {
            input.indeterminate = this.indeterminate;
        }
    }
    handleFormReset = () => {
        this.checked = this.defaultChecked;
        this.indeterminate = this.defaultIndeterminate;
        this.value = this.defaultValue;
        this.updateNativeIndeterminateState();
    };
    updateFormValue() {
        const shouldSubmit = !this.disabled && this.checked && !this.indeterminate;
        const formValue = shouldSubmit ? this.value ?? 'on' : null;
        this.internals?.setFormValue?.(formValue);
        this.updateValidity();
    }
    updateValidity() {
        if (!this.required || this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        const isValid = this.checked && !this.indeterminate;
        if (isValid) {
            this.internals?.setValidity?.({});
        }
        else {
            this.internals?.setValidity?.({ valueMissing: true }, 'This field is required');
        }
    }
    emitNativeEvents() {
        const changeEvent = createEvent$1('change', { bubbles: true, composed: true, cancelable: true });
        this.el.dispatchEvent(changeEvent);
    }
    /**
     * Handles the change event for the native `<input>` element.
     */
    handleInputChange = (e) => {
        e.stopPropagation();
        if (this.disabled || this.readonly) {
            return;
        }
        if (this.indeterminate) {
            this.indeterminate = false;
            // Cycle the checked state
            this.checked = this.cycleOnIndeterminateClick === 'checked';
        }
        else {
            this.checked = !this.checked;
        }
        // Emit the event with the new state
        this.wdprChange.emit({
            checked: this.checked,
            indeterminate: this.indeterminate,
        });
        this.emitNativeEvents();
    };
    /**
     * Calculates the value for the `aria-checked` attribute.
     */
    getAriaChecked() {
        if (this.indeterminate) {
            return 'mixed';
        }
        return this.checked ? 'true' : 'false';
    }
    get wrapperClass() {
        const cursorClass = this.disabled ? 'cursor-not-allowed' : this.readonly ? 'cursor-default' : 'cursor-pointer';
        const positionClass = this.labelPosition === 'trailing' ? 'flex-row' : 'flex-row-reverse';
        return customTwMerge(wrapperBaseClasses, wrapperFocusVisibleClasses, cursorClass, positionClass);
    }
    get fakeCheckboxClass() {
        let defaultClasses = this.error ? 'border-surface-status-critical bg-white' : 'border-stroke-actionable-alt-default bg-white';
        let activeClasses = this.error ? 'peer-active:border-surface-status-critical peer-active:border-025' : 'peer-active:border-stroke-actionable-alt-selected peer-active:border-025';
        let hoverClasses = this.error ? 'peer-hover:border-surface-status-critical' : 'peer-hover:border-stroke-actionable-alt-hover';
        let forcedStateClasses = '';
        const isCheckedOrIndeterminate = this.checked || this.indeterminate;
        if (isCheckedOrIndeterminate) {
            defaultClasses = this.error
                ? 'bg-surface-status-critical text-icon-inverse border-stroke-status-critical'
                : 'bg-surface-actionable-alt-pressed text-icon-inverse border-stroke-transparent';
            activeClasses = this.error ? 'peer-active:bg-surface-status-critical' : 'peer-active:bg-surface-actionable-alt-selected';
            hoverClasses = this.error ? 'peer-hover:bg-surface-status-critical' : 'peer-hover:bg-surface-actionable-alt-hover';
            // Apply forced states for parent-controlled hover/active
            if (this.forceActive && !this.error) {
                forcedStateClasses = 'bg-surface-actionable-alt-selected';
            }
            else if (this.forceHover && !this.error) {
                forcedStateClasses = 'bg-surface-actionable-alt-hover';
            }
        }
        return customTwMerge(checkboxBaseClasses, defaultClasses, activeClasses, hoverClasses, checkboxDisabledClasses, forcedStateClasses);
    }
    get labelClass() {
        const srOnlyClass = this.labelPosition === 'none' && 'sr-only';
        const errorColorClass = 'text-text-status-critical';
        return customTwMerge(labelBaseClasses, srOnlyClass, this.error ? errorColorClass : null);
    }
    render() {
        const labelId = `${this.internalId}-label`;
        const hasSlottedContent = this.el.hasChildNodes();
        const hasErrorDescription = this.error && this.errorMessage?.length > 0;
        const tabindex = this.disabled ? -1 : this.customTabindex;
        const CheckmarkIcon = (h("div", { key: 'b2844af619fc6a5118d8b1e27b1e1a73e960144a', class: "size-150" }, h("wdpr-icon-library", { key: '44633517f575bf4efc3a949d84b123f89f9fdf4f', icon: "checkmark", size: "xsmall", decorative: true })));
        const IndeterminateIcon = (h("div", { key: '5086e3f45733856f591d0bd63589bd2b9f0a6a7d', class: "size-150" }, h("wdpr-icon-library", { key: 'fb1df061ed16573f70571614293a0651ebfe5954', icon: "none-na-dash", size: "xsmall", decorative: true })));
        const CheckboxControl = (h(Fragment, { key: 'ea4c3238d5fede458ec9293d628bcfd6ee079efc' }, h("input", { key: '861d473e47ca84bc60b746220627016972b729d0', type: "checkbox", class: "sr-only peer", id: this.internalId, checked: this.checked && !this.indeterminate, disabled: this.disabled, readonly: this.readonly, required: this.required, name: this.name, value: this.value, "aria-checked": this.getAriaChecked(), "aria-labelledby": this.customAriaLabelledBy || null, "aria-label": !this.customAriaLabelledBy ? (this.customAriaLabel || (this.labelPosition === 'none' ? this.label : null)) : null, "aria-invalid": this.error ? 'true' : 'false', "aria-describedby": hasErrorDescription ? `${this.internalId}-error` : null, "aria-readonly": this.readonly ? 'true' : null, "aria-required": this.required ? 'true' : null, tabindex: tabindex, onInput: this.handleInputChange }), h("span", { key: '299809982571ab6ccbfcb4390c3c53a4b6a72a0f', class: this.fakeCheckboxClass }, this.indeterminate ? IndeterminateIcon : this.checked ? CheckmarkIcon : null)));
        const LabelContent = (h("span", { key: '02dcdf8db690df3e5a6b2225aa68454847d7f427', id: labelId, class: this.labelClass, part: "label", innerHTML: !hasSlottedContent ? this.label : '' }, hasSlottedContent && h("slot", { key: 'e932cea67cd11159bd29f0a62ee305bb12f05757' })));
        return (h(Host, { key: 'af1fdbba4e6c8bf37dc680006ff3cf2658be0f17' }, h("label", { key: 'e4e868fbe207851311de3a1c30d4f6edadcd9593', htmlFor: this.internalId, class: this.wrapperClass, part: "wrapper" }, CheckboxControl, this.labelPosition !== 'none' && (this.label || hasSlottedContent) && LabelContent), hasErrorDescription && h("wdpr-inline-message", { key: '307168507d6fdf68ebf418f3941080899e29033d', variant: "error", size: "small", id: `${this.internalId}-error` }, this.errorMessage)));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "checked": ["handleCheckedChange"],
        "indeterminate": ["handleIndeterminateChange"],
        "value": ["handleValueChange"],
        "required": ["handleRequiredChange"],
        "disabled": ["handleDisabledChange"]
    }; }
};
const wrapperBaseClasses = 'group inline-flex min-w-0 max-w-full items-start gap-150 relative rounded-050 pt-025';
const wrapperFocusVisibleClasses = 'has-[:focus-visible]:outline-037 has-[:focus-visible]:outline-stroke-actionable-alt-selected has-[:focus-visible]:outline-solid has-[:focus-visible]:outline-offset-2';
const checkboxBaseClasses = 'size-250 min-w-dimension-250 min-h-dimension-250 shrink-0 rounded-050 grid justify-items-center content-center transition-colors border border-solid bg-surface-actionable-alt-pressed';
const checkboxDisabledClasses = 'peer-disabled:bg-surface-disabled peer-disabled:border-surface-actionable-alt-disabled peer-disabled:text-icon-disabled peer-disabled:pointer-events-none';
const labelBaseClasses = 'body-large min-w-0 flex-1 text-surface-status-informational peer-disabled:text-text-disabled';
WdprCheckbox.style = ":host { display: flex; flex-direction: column; align-items: flex-start; min-width: 0; max-width: 100%; box-sizing: border-box; }";

export { WdprCheckbox as wdpr_checkbox };
//# sourceMappingURL=wdpr-checkbox.entry.js.map

//# sourceMappingURL=wdpr-checkbox.entry.js.map