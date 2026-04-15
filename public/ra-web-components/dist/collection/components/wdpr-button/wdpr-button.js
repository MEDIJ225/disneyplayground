import { h } from "@stencil/core";
import { createEvent, customTwMerge } from "../../utils/utils";
export class WdprButton {
    leadingIcon;
    trailingIcon;
    nativeButton;
    el;
    type = 'button';
    display = 'fit';
    size = 'medium';
    variant = 'primary';
    disabled = false;
    a11yLabel = '';
    /**
     * Optional form name applied when submitting.
     */
    name;
    /**
     * Value included during form submission when `type="submit"`.
     */
    value;
    internals;
    handleDisabledChange(newValue) {
        this.wdprDisabledChange.emit(newValue);
        this._updateFormValue();
    }
    handleTypeChange() {
        this._updateFormValue();
    }
    handleValueChange() {
        this._updateFormValue();
    }
    handleNameChange() {
        this._updateFormValue();
    }
    wdprClick;
    wdprDisabledChange;
    connectedCallback() {
        this._updateFormValue();
        this.internals?.form?.addEventListener('reset', this._handleFormReset);
    }
    disconnectedCallback() {
        this.internals?.form?.removeEventListener('reset', this._handleFormReset);
    }
    componentWillLoad() {
        this.leadingIcon = this.el.querySelector('[slot="leading-icon"]');
        this.trailingIcon = this.el.querySelector('[slot="trailing-icon"]');
    }
    componentDidLoad() {
        this.nativeButton = this.el.shadowRoot?.querySelector('button') ?? undefined;
        this._updateFormValue();
    }
    _handleSubmit() {
        if (this.name) {
            this.internals.setFormValue?.(this.value ?? '');
        }
        if (typeof this.internals.form?.requestSubmit === 'function') {
            try {
                this.internals.form.requestSubmit(this.nativeButton);
            }
            catch (e) {
                // Fallback for browsers that disallow passing custom submitter
                this.internals.form.requestSubmit();
            }
        }
        else {
            const submitEvent = createEvent('submit', { bubbles: true, composed: true, cancelable: true });
            this.internals.form?.dispatchEvent(submitEvent);
        }
        queueMicrotask(() => this._updateFormValue());
    }
    _updateFormValue() {
        this.internals.setFormValue?.(null);
    }
    _handleFormReset = () => {
        this._updateFormValue();
    };
    get _layoutClasses() {
        return this.display === 'fit' ? 'md:w-fit' : 'w-full';
    }
    _getIconClass(side) {
        const icon = side === 'leading' ? this.leadingIcon : this.trailingIcon;
        if (icon == null) {
            return '';
        }
        return iconClasses[this.size];
    }
    get _labelClass() {
        if (this.variant === 'text-no-padding') {
            const leftMargin = this.leadingIcon ? labelSpacingClasses[this.size].trailing : '';
            const rightMargin = this.trailingIcon ? labelSpacingClasses[this.size].leading : '';
            return customTwMerge('truncate', `${leftMargin} ${rightMargin}`.trim());
        }
        return customTwMerge('truncate', `${labelSpacingClasses[this.size].leading} ${labelSpacingClasses[this.size].trailing}`);
    }
    get _buttonClass() {
        return customTwMerge(baseClasses, sizeClasses[this.size], this._layoutClasses, variantClasses[this.variant].default, variantClasses[this.variant].hover, variantClasses[this.variant].focus, variantClasses[this.variant].active, variantClasses[this.variant].disabled);
    }
    get _getLeadingIconClass() {
        return this._getIconClass('leading');
    }
    get _getTrailingIconClass() {
        return this._getIconClass('trailing');
    }
    _handleClick = () => {
        this.wdprClick.emit(true);
        if (this.disabled) {
            return;
        }
        switch (this.type) {
            case 'submit':
                this._handleSubmit();
                break;
            case 'reset':
                this.internals.form?.reset?.();
                break;
            default:
                break;
        }
    };
    render() {
        return (h("button", { key: '2deca549bf29c79403746121009941f9905466ed', type: this.type, disabled: this.disabled, name: this.name, value: this.value, class: this._buttonClass, onClick: this._handleClick, "aria-label": this.a11yLabel || undefined, "aria-disabled": this.disabled ? 'true' : 'false', part: "button" }, h("span", { key: '55800a708532456cdbeafc0538a41e18cbc88333', class: this._getLeadingIconClass, "aria-hidden": "true" }, h("slot", { key: '4a71dfdea021b09e0ba91912778707131e9d9f85', name: "leading-icon" })), h("span", { key: 'aa3d185198b59f5e273d051fc38c6c581c01f9f9', class: this._labelClass }, h("slot", { key: 'b56175ba788194a79c6ca95358ef024fe262a573' })), h("span", { key: 'e165751b1de50f174568d1707425af0adb4f820c', class: this._getTrailingIconClass, "aria-hidden": "true" }, h("slot", { key: 'c72262d5a3525f30fe87b36fdca487baa3e9136a', name: "trailing-icon" }))));
    }
    static get is() { return "wdpr-button"; }
    static get encapsulation() { return "shadow"; }
    static get formAssociated() { return true; }
    static get properties() {
        return {
            "type": {
                "type": "string",
                "attribute": "type",
                "mutable": false,
                "complexType": {
                    "original": "ButtonType",
                    "resolved": "\"button\" | \"reset\" | \"submit\"",
                    "references": {
                        "ButtonType": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-button/wdpr-button.tsx",
                            "id": "src/components/wdpr-button/wdpr-button.tsx::ButtonType"
                        }
                    }
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
                "defaultValue": "'button'"
            },
            "display": {
                "type": "string",
                "attribute": "display",
                "mutable": false,
                "complexType": {
                    "original": "ButtonDisplay",
                    "resolved": "\"block\" | \"fit\"",
                    "references": {
                        "ButtonDisplay": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-button/wdpr-button.tsx",
                            "id": "src/components/wdpr-button/wdpr-button.tsx::ButtonDisplay"
                        }
                    }
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
                "defaultValue": "'fit'"
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "ButtonSize",
                    "resolved": "\"large\" | \"medium\" | \"small\" | \"xsmall\"",
                    "references": {
                        "ButtonSize": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-button/wdpr-button.tsx",
                            "id": "src/components/wdpr-button/wdpr-button.tsx::ButtonSize"
                        }
                    }
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
                "defaultValue": "'medium'"
            },
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "ButtonVariants",
                    "resolved": "\"primary\" | \"secondary\" | \"secondary-alt\" | \"tertiary\" | \"tertiary-alt\" | \"text\" | \"text-no-padding\" | \"transactional\"",
                    "references": {
                        "ButtonVariants": {
                            "location": "import",
                            "path": "../../models/variant.types",
                            "id": "src/models/variant.types.ts::ButtonVariants"
                        }
                    }
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
                "defaultValue": "'primary'"
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
            "a11yLabel": {
                "type": "string",
                "attribute": "a11y-label",
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Optional form name applied when submitting."
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Value included during form submission when `type=\"submit\"`."
                },
                "getter": false,
                "setter": false,
                "reflect": true
            }
        };
    }
    static get events() {
        return [{
                "method": "wdprClick",
                "name": "wdprClick",
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
                "method": "wdprDisabledChange",
                "name": "wdprDisabledChange",
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
                "propName": "disabled",
                "methodName": "handleDisabledChange"
            }, {
                "propName": "type",
                "methodName": "handleTypeChange"
            }, {
                "propName": "value",
                "methodName": "handleValueChange"
            }, {
                "propName": "name",
                "methodName": "handleNameChange"
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
const baseClasses = `flex items-center justify-center rounded-pill transition-colors cursor-pointer box-border border-solid border-012
  text-text-inverse whitespace-nowrap disabled:cursor-not-allowed focus:outline-none focus-visible:outline-focus focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid focus-visible:outline-offset-2
  disabled:text-text-actionable-disabled`;
const variantClasses = {
    'primary': {
        default: 'bg-surface-actionable-default border-stroke-actionable-default',
        hover: 'hover:bg-surface-actionable-hover',
        active: 'active:bg-surface-actionable-focus',
        disabled: 'disabled:bg-surface-actionable-disabled-alt disabled:border-transparent',
    },
    'secondary': {
        default: 'bg-surface-default text-text-actionable-default border-stroke-actionable-default-alt',
        hover: 'hover:bg-surface-actionable-hover hover:enabled:border-stroke-actionable-hover hover:text-text-inverse',
        active: 'active:bg-surface-actionable-focus active:text-text-inverse active:border-stroke-actionable-focused',
        disabled: 'disabled:bg-surface-actionable-disabled-alt',
    },
    'secondary-alt': {
        default: 'bg-surface-default text-text-actionable-default border-stroke-actionable-default',
        hover: 'hover:text-text-inverse hover:bg-surface-actionable-hover hover:border-stroke-actionable-hover',
        active: 'active:text-text-inverse active:bg-surface-actionable-focus active:border-stroke-actionable-focused',
        disabled: 'disabled:bg-surface-actionable-disabled-alt disabled:border-transparent',
    },
    'tertiary': {
        default: 'text-text-actionable-default border-stroke-actionable-default ',
        hover: 'hover:text-text-actionable-hover hover:border-stroke-actionable-hover',
        active: 'active:text-text-actionable-focused active:border-stroke-actionable-focused',
        disabled: 'disabled:border-stroke-actionable-disabled',
    },
    'tertiary-alt': {
        default: 'bg-surface-actionable-inverse-default border-stroke-inverse',
        hover: 'hover:bg-surface-actionable-inverse-hover',
        active: 'active:bg-surface-actionable-inverse-pressed',
        focus: 'focus-visible:outline-stroke-inverse',
        disabled: 'disabled:bg-surface-actionable-inverse-disabled disabled:border-stroke-actionable-inverse-disabled disabled:text-text-actionable-inverse-disabled',
    },
    'transactional': {
        default: 'bg-surface-transactional-default',
        hover: 'hover:bg-surface-transactional-hover',
        active: 'active:bg-surface-transactional-focus',
        disabled: 'disabled:bg-surface-transactional-disabled disabled:text-text-transactional-disabled disabled:border-transparent',
    },
    'text': {
        default: 'text-text-actionable-default border-transparent',
        hover: 'hover:text-text-actionable-hover',
        active: 'active:text-text-actionable-focused',
        disabled: 'disabled:text-text-actionable-disabled',
    },
    'text-no-padding': {
        default: 'text-text-actionable-default border-transparent p-0 min-w-0 min-h-0',
        hover: 'hover:text-text-actionable-hover',
        active: 'active:text-text-actionable-focused',
        disabled: 'disabled:text-text-actionable-disabled',
    },
};
const sizeClasses = {
    xsmall: 'px-150 py-100 text-component-small font-component-default leading-component-medium tracking-02',
    small: 'px-150 py-125 text-component-medium font-component-default leading-component-medium tracking-02',
    medium: 'px-200 py-100 text-component-large font-component-default leading-component-large tracking-default',
    large: 'px-300 py-200 text-component-xlarge font-component-default leading-component-large tracking-default',
};
const iconClasses = {
    xsmall: 'size-icon-xsmall',
    small: 'size-icon-xsmall',
    medium: 'size-icon-small',
    large: 'size-icon-medium',
};
const labelSpacingClasses = {
    xsmall: { leading: 'mr-075', trailing: 'ml-075' },
    small: { leading: 'mr-075', trailing: 'ml-075' },
    medium: { leading: 'mr-100', trailing: 'ml-100' },
    large: { leading: 'mr-150', trailing: 'ml-150' },
};
//# sourceMappingURL=wdpr-button.js.map
