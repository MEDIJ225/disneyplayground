'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprRadioButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.radioSelected = index.createEvent(this, "radioSelected", 7);
        this.wdprChange = index.createEvent(this, "wdprChange", 3);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    get el() { return index.getElement(this); }
    internals;
    defaultSelected = false;
    defaultValue = '';
    /* The label text for the radio button */
    label = null;
    /* The name of the radio button group */
    name = '';
    /* The position of the label: leading, trailing, or none */
    labelPosition = 'trailing';
    /* The value associated with the radio button */
    value = '';
    /* Indicates if keyboard navigation is enabled */
    keyboardNavigation = false;
    /* Indicates if the radio button is selected */
    selected = false;
    /* Indicates if the radio button is disabled */
    disabled = false;
    /* Indicates if the radio button is focused */
    focused = false;
    /* Indicates if the radio button is required */
    required = false;
    /* Reference to the element with role equal to radio in the shadow DOM */
    radioRole;
    /* Provides an accessible name for the radio button */
    customAriaLabel;
    /* Reference to the element with role equal to radio in the shadow DOM */
    radioGroup;
    /* Event emitted when the radio button is selected */
    radioSelected;
    /* Event emitted when the selected state changes, enabling Angular two-way binding */
    wdprChange;
    async refreshInternals() {
        this.updateFormValue();
    }
    handleSelectedChange() {
        this.updateFormValue();
    }
    handleValueChange() {
        this.defaultValue = this.value ?? '';
        this.updateFormValue();
    }
    handleDisabledChange() {
        if (this.disabled) {
            this.radioRole?.setAttribute('tabindex', '-1');
        }
        else if (!this.radioGroup) {
            this.radioRole?.setAttribute('tabindex', '0');
        }
        this.updateFormValue();
    }
    handleRequiredChange() {
        this.updateFormValue();
    }
    handleNameChange() {
        this.updateFormValue();
    }
    /* Selects the radio button and emits the `radioSelect` event */
    async selectRadio() {
        if (this.disabled) {
            return;
        }
        const wasSelected = this.selected;
        this.selected = true;
        if (!wasSelected) {
            this.emitNativeEvents();
            this.wdprChange.emit({ selected: true });
        }
        this.radioSelected.emit(this.value);
    }
    connectedCallback() {
        this.defaultSelected = this.selected;
        this.defaultValue = this.value ?? '';
        this.updateFormValue();
        this.el.addEventListener('formreset', this.handleFormReset);
    }
    disconnectedCallback() {
        this.el.removeEventListener('formreset', this.handleFormReset);
    }
    componentDidLoad() {
        this.radioRole = this.el.shadowRoot?.querySelector('div[role="radio"]');
        this.radioGroup = this.el.closest('wdpr-radio-group');
        if (!this.radioGroup && !this.disabled) {
            this.radioRole.setAttribute('tabindex', '0');
        }
        this.el.addEventListener('keydown', ev => this.handleKeyDown(ev));
        this.updateFormValue();
    }
    handleFormReset = () => {
        this.selected = this.defaultSelected;
        this.value = this.defaultValue;
        this.updateFormValue();
    };
    updateFormValue() {
        if (this.radioGroup && this.internals && 'setFormValue' in this.internals) {
            this.internals?.setFormValue?.(null);
            this.internals?.setValidity?.({});
            return;
        }
        const shouldSubmit = !this.disabled && !!this.name && this.selected;
        const formValue = shouldSubmit ? this.value ?? '' : null;
        this.internals?.setFormValue?.(formValue);
        this.updateValidity();
    }
    updateValidity() {
        if (this.radioGroup && this.internals && 'setFormValue' in this.internals) {
            this.internals?.setValidity?.({});
            return;
        }
        if (!this.required || this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        if (this.selected) {
            this.internals?.setValidity?.({});
        }
        else {
            this.internals?.setValidity?.({ valueMissing: true }, 'Please select an option');
        }
    }
    emitNativeEvents() {
        const changeEvent = utils.createEvent('change', { bubbles: true, composed: true, cancelable: true });
        this.el.dispatchEvent(changeEvent);
    }
    /* Retrieves all radio buttons within the same group */
    getAllRadioButtonsInGroup() {
        if (this.radioGroup) {
            return Array.from(this.radioGroup.querySelectorAll('wdpr-radio-button'));
        }
        return [];
    }
    /* Handles the click event on the radio button */
    onClick = () => {
        if (!this.disabled) {
            if (!this.radioGroup) {
                // If no group, toggle the selected state
                const wasSelected = this.selected;
                this.selected = !this.selected;
                if (this.selected) {
                    this.radioSelected.emit(this.value);
                }
                if (wasSelected !== this.selected) {
                    this.emitNativeEvents();
                    this.wdprChange.emit({ selected: this.selected });
                }
            }
            else {
                // If part of a group, handle group logic
                const radios = this.getAllRadioButtonsInGroup();
                radios?.forEach(radio => {
                    radio.keyboardNavigation = false;
                    if (radio !== this.el) {
                        radio.selected = false;
                        radio.focused = false;
                    }
                });
                this.selectRadio();
            }
        }
    };
    /* Handles the blur event on the radio button */
    onBlur = () => {
        this.focused = false;
    };
    /* Handles keyboard navigation for the radio button */
    handleKeyDown(ev) {
        if (ev.code === 'Space' || ev.code === 'Enter') {
            if (!this.radioGroup) {
                ev.preventDefault();
                const wasSelected = this.selected;
                this.selected = !this.selected;
                if (this.selected) {
                    this.radioSelected.emit(this.value);
                }
                if (wasSelected !== this.selected) {
                    this.emitNativeEvents();
                    this.wdprChange.emit({ selected: this.selected });
                }
            }
        }
    }
    getLabelElement() {
        if (this.labelPosition === 'none')
            return null;
        const hasContent = !!this.label || !!this.el.textContent?.trim() || this.el.children.length > 0;
        if (!hasContent)
            return null;
        const labelClasses = utils.customTwMerge('body-large select-none', this.disabled ? 'text-text-disabled' : 'text-text-body', this.labelPosition === 'trailing' ? 'ml-150' : 'mr-150');
        return (index.h("span", { part: "label", class: labelClasses }, index.h("slot", null, this.label)));
    }
    getAriaLabel() {
        if (this.customAriaLabel) {
            return this.customAriaLabel;
        }
        return this.label || this.el.textContent?.trim() || this.value;
    }
    get radioClasses() {
        const radioCursorClasses = this.disabled ? 'cursor-default' : 'cursor-pointer';
        const radioHasContent = !!this.label || !!this.el.textContent?.trim() || this.el.children.length > 0;
        const validContent = this.labelPosition !== 'none' && radioHasContent;
        const radioRadiusClasses = validContent ? 'rounded-100 px-025 py-000' : 'rounded-pill';
        const radioHoverClasses = this.selected ? 'group-hover:bg-surface-actionable-alt-hover' : 'group-hover:bg-surface-actionable-alt-hover';
        const radioPressedClasses = this.selected ? 'group-active:bg-surface-actionable-alt-selected' : 'group-active:border-surface-actionable-alt-default';
        return utils.customTwMerge(radioBaseClasses, radioFocusClasses, radioRadiusClasses, radioCursorClasses, radioHoverClasses, radioPressedClasses);
    }
    get radioCircleClasses() {
        const circleDisabledClasses = !this.selected && this.disabled ? 'bg-surface-disabled border-surface-actionable-alt-disabled' : '';
        const circleHoverActiveClasses = !this.disabled ? 'group-hover:border-surface-actionable-alt-hover group-active:border-surface-actionable-alt-selected' : '';
        const circleSelectedClasses = this.selected && !this.disabled ? 'bg-surface-actionable-alt-pressed border-0 group-hover:bg-surface-actionable-alt-hover group-active:bg-surface-actionable-alt-selected' : '';
        const circleSelectedDisabledClasses = this.selected && this.disabled ? 'bg-surface-actionable-alt-disabled border-0 border-surface-actionable-alt-disabled' : '';
        return utils.customTwMerge(circleBaseClasses, circleDisabledClasses, circleHoverActiveClasses, circleSelectedClasses, circleSelectedDisabledClasses);
    }
    get radioInnerCircleClasses() {
        const circleInnerBaseClasses = 'w-dimension-125 h-dimension-125 rounded-pill bg-white';
        const circleInnerDisabledClasses = this.selected && this.disabled ? 'bg-surface-disabled' : '';
        const circleInnerSelectedClasses = !this.selected && this.disabled ? 'hidden' : '';
        return utils.customTwMerge(circleInnerBaseClasses, circleInnerSelectedClasses, circleInnerDisabledClasses);
    }
    render() {
        const labelEl = this.getLabelElement();
        const ariaLabel = this.getAriaLabel();
        return (index.h("div", { key: 'fbf43d6fa6fce3fe47c065c6d23a4c3759e4dd8f', "aria-label": ariaLabel, "aria-checked": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : 'false', "aria-required": this.required ? 'true' : 'false', class: this.radioClasses, onClick: this.onClick, onBlur: this.onBlur, role: "radio" }, this.labelPosition === 'leading' ? labelEl : null, index.h("span", { key: '755a2485b9c714fbf3da8befef62b74af728133d', class: this.radioCircleClasses }, index.h("span", { key: '3ef551d0ef77c4f9eb71e79abfed5e217358f5e5', class: this.radioInnerCircleClasses })), this.labelPosition === 'trailing' ? labelEl : null));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "selected": ["handleSelectedChange"],
        "value": ["handleValueChange"],
        "disabled": ["handleDisabledChange"],
        "required": ["handleRequiredChange"],
        "name": ["handleNameChange"]
    }; }
};
const circleBaseClasses = 'w-dimension-250 h-dimension-250 rounded-pill border-012 border-surface-actionable-alt-default flex items-center justify-center';
const radioBaseClasses = 'group flex items-center my-100';
const radioFocusClasses = 'focus:outline-none focus-visible:outline focus-visible:outline-solid focus-visible:outline-037 focus-visible:outline-offset-2 focus-visible:outline-stroke-actionable-alt-selected';
WdprRadioButton.style = ":host {\n      display: flex;\n      align-items: center;\n    }";

exports.wdpr_radio_button = WdprRadioButton;
//# sourceMappingURL=wdpr-radio-button.entry.cjs.js.map

//# sourceMappingURL=wdpr-radio-button.cjs.entry.js.map