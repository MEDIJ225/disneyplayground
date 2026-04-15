import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { a as createEvent$1, c as customTwMerge } from './p-CXZGMLMW.js';

const WdprButton = /*@__PURE__*/ proxyCustomElement(class WdprButton extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprClick = createEvent(this, "wdprClick", 7);
        this.wdprDisabledChange = createEvent(this, "wdprDisabledChange", 7);
        this.internals = this.attachInternals();
    }
    leadingIcon;
    trailingIcon;
    nativeButton;
    get el() { return this; }
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
            const submitEvent = createEvent$1('submit', { bubbles: true, composed: true, cancelable: true });
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
        }
    };
    render() {
        return (h("button", { key: '2deca549bf29c79403746121009941f9905466ed', type: this.type, disabled: this.disabled, name: this.name, value: this.value, class: this._buttonClass, onClick: this._handleClick, "aria-label": this.a11yLabel || undefined, "aria-disabled": this.disabled ? 'true' : 'false', part: "button" }, h("span", { key: '55800a708532456cdbeafc0538a41e18cbc88333', class: this._getLeadingIconClass, "aria-hidden": "true" }, h("slot", { key: '4a71dfdea021b09e0ba91912778707131e9d9f85', name: "leading-icon" })), h("span", { key: 'aa3d185198b59f5e273d051fc38c6c581c01f9f9', class: this._labelClass }, h("slot", { key: 'b56175ba788194a79c6ca95358ef024fe262a573' })), h("span", { key: 'e165751b1de50f174568d1707425af0adb4f820c', class: this._getTrailingIconClass, "aria-hidden": "true" }, h("slot", { key: 'c72262d5a3525f30fe87b36fdca487baa3e9136a', name: "trailing-icon" }))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "disabled": ["handleDisabledChange"],
        "type": ["handleTypeChange"],
        "value": ["handleValueChange"],
        "name": ["handleNameChange"]
    }; }
}, [321, "wdpr-button", {
        "type": [513],
        "display": [1],
        "size": [1],
        "variant": [1],
        "disabled": [4],
        "a11yLabel": [1, "a11y-label"],
        "name": [513],
        "value": [1537]
    }, undefined, {
        "disabled": ["handleDisabledChange"],
        "type": ["handleTypeChange"],
        "value": ["handleValueChange"],
        "name": ["handleNameChange"]
    }]);
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
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-button"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprButton);
            }
            break;
    } });
}

export { WdprButton as W, defineCustomElement as d };
//# sourceMappingURL=p-DS0cKrSV.js.map

//# sourceMappingURL=p-DS0cKrSV.js.map