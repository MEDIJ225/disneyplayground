import { h } from "@stencil/core";
import { createEvent, customTwMerge, generateRandId } from "../../utils/utils";
export class WdprToggle {
    el;
    internals;
    defaultChecked = false;
    defaultValue = 'on';
    constructor() {
        this.internals = this.el.attachInternals();
    }
    /**
     * Whether the toggle is checked
     */
    checked = false;
    /**
     * Whether the toggle is disabled
     */
    disabled = false;
    /**
     * Label text for the toggle
     */
    label;
    /**
     * Position of the label relative to the toggle
     */
    labelPosition = 'trailing';
    /**
     * Name attribute for form submission
     */
    name;
    /**
     * Value attribute for form submission
     */
    value = 'on';
    /**
     * Whether the toggle is required
     */
    required = false;
    /**
     * ARIA label for accessibility
     */
    toggleAriaLabel;
    /**
     * ARIA description for accessibility
     */
    toggleAriaDescription;
    /**
     * Track if slots have content
     */
    hasCheckedIcon = false;
    hasUncheckedIcon = false;
    /**
     * Emitted when the toggle state changes
     */
    wdprChange;
    inputId = `toggle-${generateRandId()}`;
    componentWillLoad() {
        this.checkSlotContent();
    }
    connectedCallback() {
        this.defaultChecked = this.checked;
        this.defaultValue = this.value ?? 'on';
        this.updateFormValue();
        this.el.addEventListener('formreset', this.handleFormReset);
    }
    disconnectedCallback() {
        this.el.removeEventListener('formreset', this.handleFormReset);
    }
    checkSlotContent() {
        const checkedSlot = this.el.querySelector('[slot="checked-icon"]');
        const uncheckedSlot = this.el.querySelector('[slot="unchecked-icon"]');
        this.hasCheckedIcon = !!checkedSlot;
        this.hasUncheckedIcon = !!uncheckedSlot;
    }
    checkedChanged(newValue) {
        this.wdprChange.emit({ checked: newValue, value: this.value });
        this.updateFormValue();
    }
    valueChanged() {
        this.defaultValue = this.value ?? 'on';
        this.updateFormValue();
    }
    requiredChanged() {
        this.updateFormValue();
    }
    disabledChanged() {
        this.updateFormValue();
    }
    handleFormReset = () => {
        this.checked = this.defaultChecked;
        this.value = this.defaultValue;
    };
    updateFormValue() {
        const shouldSubmit = !this.disabled && this.checked;
        const formValue = shouldSubmit ? this.value ?? 'on' : null;
        this.internals?.setFormValue?.(formValue);
        this.updateValidity();
    }
    updateValidity() {
        if (!this.required || this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        if (this.checked) {
            this.internals?.setValidity?.({});
        }
        else {
            this.internals?.setValidity?.({ valueMissing: true }, 'This field is required');
        }
    }
    emitNativeEvents() {
        const changeEvent = createEvent('change', { bubbles: true, composed: true, cancelable: true });
        this.el.dispatchEvent(changeEvent);
    }
    /**
     * Programmatically toggle the checked state
     */
    async toggle() {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.emitNativeEvents();
        }
    }
    /**
     * Programmatically focus the toggle
     */
    async setFocus() {
        const input = this.el.shadowRoot?.querySelector('input');
        input?.focus();
    }
    handleChange = (event) => {
        const input = event.target;
        this.checked = input.checked;
        this.emitNativeEvents();
    };
    handleKeyDown = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            this.toggle();
        }
    };
    getTrackClasses() {
        const baseClasses = 'relative inline-flex items-center cursor-pointer rounded-pill transition-all duration-200 ease-in-out';
        const sizeClasses = 'w-dimension-600 h-dimension-300';
        const defaultClasses = 'bg-surface-actionable-alt-default peer-checked:bg-surface-actionable-alt-pressed';
        const disabledClasses = 'peer-disabled:cursor-not-allowed peer-disabled:bg-surface-actionable-alt-disabled';
        const hoverClasses = 'peer-enabled:peer-hover:bg-surface-actionable-alt-hover peer-enabled:peer-checked:peer-hover:bg-surface-actionable-alt-hover';
        const activeClasses = 'peer-enabled:peer-active:bg-surface-actionable-alt-selected peer-enabled:peer-checked:peer-active:bg-surface-actionable-alt-selected';
        return customTwMerge(baseClasses, sizeClasses, defaultClasses, hoverClasses, activeClasses, disabledClasses);
    }
    getThumbClasses() {
        const baseClasses = 'absolute top-1/2 -translate-y-1/2 pointer-events-none inline-flex items-center justify-center rounded-full transform transition-all duration-200 ease-in-out';
        const thumbClasses = 'size-[16px] left-[4px] bg-white shadow-md';
        const translateClasses = this.checked ? 'translate-x-[22px]' : 'translate-x-0';
        return customTwMerge(baseClasses, thumbClasses, translateClasses);
    }
    getIconClasses(isChecked) {
        const baseClasses = 'absolute top-1/4 -translate-y-1/2 flex text-white items-center justify-center pointer-events-none transition-opacity duration-200 text-[10px] px-[8px]';
        const positionClasses = isChecked ? 'left-0' : 'right-0';
        return customTwMerge(baseClasses, positionClasses);
    }
    getLabelClasses() {
        const baseClasses = 'body-large select-none transition-colors duration-200 flex items-center';
        const colorClasses = this.disabled ? 'text-text-disabled' : 'text-text-body hover:text-text-heading';
        const cursorClasses = this.disabled ? 'cursor-not-allowed' : 'cursor-pointer';
        return customTwMerge(baseClasses, colorClasses, cursorClasses);
    }
    getContainerClasses() {
        const baseClasses = 'inline-flex items-center leading-[0]';
        const focusClasses = 'has-[:focus-visible]:outline has-[:focus-visible]:outline-solid has-[:focus-visible]:outline-037 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-stroke-actionable-alt-selected';
        const gapClasses = this.label && this.labelPosition !== 'none' ? 'gap-200 has-[:focus-visible]:rounded-050' : 'has-[:focus-visible]:rounded-pill';
        const directionClasses = this.labelPosition === 'leading' ? 'flex-row-reverse' : '';
        return customTwMerge(baseClasses, focusClasses, gapClasses, directionClasses);
    }
    render() {
        const showLabel = this.label && this.labelPosition !== 'none';
        const showIcons = this.hasCheckedIcon || this.hasUncheckedIcon;
        return (h("div", { key: '2f3eaa4f803360e8f308534b8ad17de36872dfd7', class: this.getContainerClasses() }, h("div", { key: 'b4ccd87206d2abef98db3cb311b96486ea0a83ca', class: "relative inline-block" }, h("input", { key: '11243a3019f0713fa5f6d531b5b460a773e2248c', id: this.inputId, type: "checkbox", role: "switch", tabindex: "0", class: "sr-only peer", checked: this.checked, disabled: this.disabled, name: this.name, value: this.value, required: this.required, "aria-label": this.toggleAriaLabel || this.label || 'Toggle', "aria-describedby": this.toggleAriaDescription ? 'toggle-description' : undefined, "aria-checked": this.checked.toString(), "aria-disabled": this.disabled.toString(), onChange: this.handleChange, onKeyDown: this.handleKeyDown }), h("label", { key: 'a96ba6dc478fa216349566d6a1649b3f8db4b037', htmlFor: this.inputId, class: this.getTrackClasses() }, showIcons && this.hasCheckedIcon && (h("div", { key: 'd8bbc919f88373a2109d1b752cf01cb81f62c4e5', class: this.getIconClasses(true) }, h("slot", { key: '2cb162b7db9f4f1dec592c8ef34a0e9d622603b2', name: "checked-icon" }))), showIcons && this.hasUncheckedIcon && (h("div", { key: '05d7f9ac8ec0e663c0f7c24143bb2c6f5c56beb2', class: this.getIconClasses(false) }, h("slot", { key: '5faca82e66873f162ddf2d854f8d76d7c696f63e', name: "unchecked-icon" }))), h("span", { key: '035b119dd13311d0d9980dac0e15a5de08f79107', class: this.getThumbClasses() }))), showLabel && (h("div", { key: 'e905fd5d6a19a3d6b9ffa9d91fc8ec77d3b176b4', class: "relative inline-block" }, h("label", { key: '17f0df46f9eb528d0c93bcf1d6ec377ef8b5482b', htmlFor: this.inputId, class: this.getLabelClasses() }, this.label))), this.toggleAriaDescription && (h("span", { key: 'd977750a83346b947118126fac1d38fedd6f27c9', id: "toggle-description", class: "sr-only" }, this.toggleAriaDescription))));
    }
    static get is() { return "wdpr-toggle"; }
    static get encapsulation() { return "shadow"; }
    static get formAssociated() { return true; }
    static get properties() {
        return {
            "checked": {
                "type": "boolean",
                "attribute": "checked",
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
                    "text": "Whether the toggle is checked"
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
                    "text": "Whether the toggle is disabled"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Label text for the toggle"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "labelPosition": {
                "type": "string",
                "attribute": "label-position",
                "mutable": false,
                "complexType": {
                    "original": "ToggleLabelPosition",
                    "resolved": "\"leading\" | \"none\" | \"trailing\"",
                    "references": {
                        "ToggleLabelPosition": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-toggle/wdpr-toggle.tsx",
                            "id": "src/components/wdpr-toggle/wdpr-toggle.tsx::ToggleLabelPosition"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Position of the label relative to the toggle"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'trailing'"
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Name attribute for form submission"
                },
                "getter": false,
                "setter": false,
                "reflect": true
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
                    "text": "Value attribute for form submission"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'on'"
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
                    "text": "Whether the toggle is required"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "toggleAriaLabel": {
                "type": "string",
                "attribute": "toggle-aria-label",
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
                    "text": "ARIA label for accessibility"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "toggleAriaDescription": {
                "type": "string",
                "attribute": "toggle-aria-description",
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
                    "text": "ARIA description for accessibility"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "hasCheckedIcon": {},
            "hasUncheckedIcon": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprChange",
                "name": "wdprChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the toggle state changes"
                },
                "complexType": {
                    "original": "{ checked: boolean; value?: string }",
                    "resolved": "{ checked: boolean; value?: string; }",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "toggle": {
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
                    "text": "Programmatically toggle the checked state",
                    "tags": []
                }
            },
            "setFocus": {
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
                    "text": "Programmatically focus the toggle",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "checked",
                "methodName": "checkedChanged"
            }, {
                "propName": "value",
                "methodName": "valueChanged"
            }, {
                "propName": "required",
                "methodName": "requiredChanged"
            }, {
                "propName": "disabled",
                "methodName": "disabledChanged"
            }];
    }
}
//# sourceMappingURL=wdpr-toggle.js.map
