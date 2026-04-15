'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprChip = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprToggle = index.createEvent(this, "wdprToggle", 7);
        this.wdprDisabledChange = index.createEvent(this, "wdprDisabledChange", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    get el() { return index.getElement(this); }
    leadingSlot = null;
    trailingSlot = null;
    name;
    notificationNumber = 0;
    notificationType = 'alert';
    showNotificationBadge = false;
    a11yLabel;
    disabled = false;
    selected = false;
    mode = 'multi';
    a11yControls;
    a11yExpanded;
    a11yHasPopup;
    a11yPressed;
    variant = 'default';
    visualContent = 'icon';
    mediaSrc;
    secondaryLabel;
    iconName;
    wdprToggle;
    wdprDisabledChange;
    internals;
    onSelectedChange() {
        this._updateFormValue();
    }
    onDisabledChange(newValue) {
        this.wdprDisabledChange.emit({ disabled: newValue });
        this._updateFormValue();
    }
    handleKeyDown(ev) {
        if (ev.key === keycodes_model.KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
            return;
        }
        if (this.disabled)
            return;
        if (this.a11yHasPopup && (ev.key === keycodes_model.KEYBOARD_KEYS.SPACE || ev.key === keycodes_model.KEYBOARD_KEYS.ENTER)) {
            ev.preventDefault();
            this._handleClick();
        }
    }
    handleFormReset() {
        this.selected = false;
        this._updateFormValue();
    }
    componentWillLoad() {
        this.updateSlots();
    }
    componentDidLoad() {
        this._updateFormValue();
    }
    get _isMenuTrigger() {
        return !!this.a11yHasPopup;
    }
    get _inputType() {
        if (this._isMenuTrigger)
            return 'button';
        return this.mode === 'single' ? 'radio' : 'checkbox';
    }
    get _isVertical() {
        return this.variant === 'vertical';
    }
    _updateFormValue() {
        const shouldSubmit = !this.disabled && !this._isMenuTrigger;
        const formValue = shouldSubmit ? (this.selected ? 'selected' : 'not selected') : null;
        queueMicrotask(() => {
            if (this.internals && this.name != null) {
                this.internals?.setFormValue?.(formValue);
            }
        });
        this._updateValidity();
    }
    _updateValidity() {
        if (this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        const isValid = typeof this.selected === 'boolean';
        const validityError = isValid ? {} : { valueMissing: true };
        const errorMessage = isValid ? '' : 'Selected prop must be a boolean';
        this.internals?.setValidity?.(validityError, errorMessage);
    }
    _handleMouseDown = (ev) => {
        ev.preventDefault();
    };
    _handleClick = (ev) => {
        if (this.disabled)
            return;
        if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        if (this._isMenuTrigger) {
            const expanded = this.a11yExpanded === 'true' ? false : true;
            this.a11yExpanded = expanded ? 'true' : 'false';
        }
        if (this.mode === 'single') {
            this.selected = true;
        }
        else {
            this.selected = !this.selected;
        }
        this.wdprToggle.emit({ selected: this.selected });
    };
    _handleInputChange = (ev) => {
        if (this.disabled || this._isMenuTrigger)
            return;
        const input = ev.target;
        if (this.mode === 'single') {
            this.selected = true;
        }
        else {
            this.selected = input.checked;
        }
        this.wdprToggle.emit({ selected: this.selected });
    };
    updateSlots = () => {
        this.leadingSlot = this.el.querySelector('[slot="leading-icon"]');
        this.trailingSlot = this.el.querySelector('[slot="trailing-icon"]');
    };
    get _accessibleLabel() {
        if (!this.a11yLabel)
            return undefined;
        if (this.showNotificationBadge && this.selected && this.notificationNumber > 0) {
            const notificationText = this.notificationNumber === 1 ? 'notification' : 'notifications';
            return `${this.a11yLabel}, ${this.notificationNumber} ${notificationText}`;
        }
        return this.a11yLabel;
    }
    get _accessiblePressed() {
        if (this.a11yPressed === 'none')
            return undefined;
        return this.selected ? 'true' : 'false';
    }
    get _defaultButtonClass() {
        const status = this.selected ? 'selected' : 'unselected';
        const variant = defaultVariantClasses[status];
        const spacing = this.leadingSlot || this.trailingSlot ? 'gap-100' : null;
        return utils.customTwMerge(defaultBaseButtonClass, spacing, this.disabled ? variant.disabled : [variant.default, variant.hover, variant.active]);
    }
    get _verticalButtonClass() {
        const status = this.selected ? 'selected' : 'unselected';
        const variant = verticalVariantClasses[status];
        return utils.customTwMerge(verticalBaseButtonClass, this.disabled ? variant.disabled : [variant.default, variant.hover, variant.active]);
    }
    get _verticalLabelClass() {
        return utils.customTwMerge('main-label block w-full line-clamp-2', 'text-component-small font-component-accent leading-component-medium');
    }
    get _verticalSecondaryLabelClass() {
        return utils.customTwMerge('secondary-label block w-full mt-050 line-clamp-1', 'label-xsmall');
    }
    get _verticalVisualWrapperClass() {
        if (this.visualContent === 'media') {
            return 'w-dimension-400 h-dimension-400 shrink-0 overflow-hidden';
        }
        return utils.customTwMerge('w-dimension-400 h-dimension-400 shrink-0 flex items-center justify-center rounded-100');
    }
    renderInput() {
        const isMenuTrigger = this._isMenuTrigger;
        const inputType = this._inputType;
        const role = isMenuTrigger ? 'button' : this.mode === 'single' ? 'radio' : 'checkbox';
        return (index.h("input", { type: inputType, role: role, checked: !isMenuTrigger && this.selected, disabled: this.disabled, "aria-checked": !isMenuTrigger ? (this.selected ? 'true' : 'false') : undefined, "aria-disabled": this.disabled ? 'true' : undefined, "aria-label": this._accessibleLabel, "aria-controls": isMenuTrigger ? this.a11yControls : undefined, "aria-expanded": isMenuTrigger ? this.a11yExpanded : undefined, "aria-haspopup": isMenuTrigger ? this.a11yHasPopup : undefined, "aria-pressed": isMenuTrigger ? this._accessiblePressed : undefined, name: this.name, tabIndex: this.disabled ? -1 : 0, class: "peer sr-only", onChange: !isMenuTrigger ? this._handleInputChange : undefined }));
    }
    renderNotificationBadge() {
        if (!this.showNotificationBadge)
            return null;
        return (index.h("span", { class: "absolute -top-125 -right-050" }, index.h("wdpr-notification-indicator", { size: "small", type: this.notificationType, number: this.notificationNumber, decorative: true })));
    }
    renderDefault() {
        return (index.h("label", { class: utils.customTwMerge('relative inline-block', this.disabled ? 'cursor-not-allowed' : 'cursor-pointer') }, this.renderInput(), index.h("span", { part: "button", class: this._defaultButtonClass, "data-selected": this.selected ? 'true' : 'false', "aria-hidden": "true", onMouseDown: this._handleMouseDown, onClick: this._handleClick }, this.renderNotificationBadge(), this.leadingSlot && (index.h("span", { part: "leading-icon", class: defaultIconClass, "aria-hidden": "true" }, index.h("slot", { name: "leading-icon", onSlotchange: this.updateSlots }))), index.h("span", { part: "label", class: defaultLabelClass }, index.h("slot", null)), this.trailingSlot && (index.h("span", { part: "trailing-icon", class: defaultIconClass, "aria-hidden": "true" }, index.h("slot", { name: "trailing-icon", onSlotchange: this.updateSlots }))))));
    }
    renderVerticalVisual() {
        if (this.visualContent === 'media') {
            return (index.h("div", { class: this._verticalVisualWrapperClass }, index.h("wdpr-media", { src: this.mediaSrc, alt: "", fade: true, aspect: "square", shape: "flat" })));
        }
        return (index.h("div", { class: this._verticalVisualWrapperClass }, index.h("wdpr-icon-library", { icon: this.iconName, size: "large", decorative: true })));
    }
    renderVertical() {
        return (index.h("label", { class: utils.customTwMerge('relative inline-block', this.disabled ? 'cursor-not-allowed' : 'cursor-pointer') }, this.renderInput(), index.h("span", { part: "button", class: this._verticalButtonClass, "data-selected": this.selected ? 'true' : 'false', "aria-hidden": "true", onMouseDown: this._handleMouseDown, onClick: this._handleClick }, this.renderNotificationBadge(), this.renderVerticalVisual(), index.h("div", { class: "content-wrapper flex w-full flex-col items-start overflow-hidden" }, index.h("div", { part: "label", class: this._verticalLabelClass }, index.h("slot", null)), this.secondaryLabel && (index.h("div", { part: "secondary-label", class: this._verticalSecondaryLabelClass }, this.secondaryLabel))))));
    }
    render() {
        return index.h(index.Host, { key: '93c753656726273810079d11b11eb609d1099024' }, this._isVertical ? this.renderVertical() : this.renderDefault());
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "selected": ["onSelectedChange"],
        "disabled": ["onDisabledChange"]
    }; }
};
const defaultBaseButtonClass = `relative inline-flex items-center justify-center rounded-pill border border-solid transition-colors
  select-none p-125
  peer-focus-visible:outline peer-focus-visible:outline-037 peer-focus-visible:outline-stroke-actionable-alt-focused peer-focus-visible:outline-solid peer-focus-visible:outline-offset-2`;
const defaultLabelClass = 'text-component-small font-component-accent leading-component-medium tracking-default';
const defaultIconClass = 'flex items-center justify-center text-current';
const verticalBaseButtonClass = `relative flex flex-col items-start justify-start gap-100 rounded-200 border border-solid
  p-125 transition-colors select-none min-w-dimension-1200 min-h-dimension-1100
  peer-focus-visible:outline peer-focus-visible:outline-solid peer-focus-visible:outline-offset-[3px]
  peer-focus-visible:outline-025 peer-focus-visible:outline-stroke-actionable-alt-pressed`;
const defaultVariantClasses = {
    unselected: {
        default: 'bg-surface-transparent text-text-actionable-alt-default border-stroke-actionable-alt-default cursor-pointer',
        hover: 'hover:text-text-actionable-alt-hover hover:border-stroke-actionable-alt-hover',
        active: 'active:text-text-actionable-alt-pressed active:border-stroke-actionable-alt-pressed',
        disabled: 'bg-surface-disabled text-text-disabled border-stroke-actionable-alt-disabled cursor-not-allowed',
    },
    selected: {
        default: 'bg-surface-actionable-alt-selected text-text-inverse border-transparent cursor-pointer',
        hover: 'hover:bg-surface-actionable-alt-hover',
        active: 'active:bg-surface-actionable-alt-pressed',
        disabled: 'bg-surface-actionable-alt-disabled text-text-inverse border-transparent cursor-not-allowed',
    },
};
const verticalVariantClasses = {
    unselected: {
        default: 'bg-surface-transparent text-text-actionable-alt-default border-stroke-actionable-alt-default cursor-pointer',
        hover: 'hover:border-stroke-actionable-alt-hover hover:text-text-actionable-alt-hover',
        active: 'active:border-stroke-actionable-alt-pressed active:text-text-actionable-alt-pressed',
        disabled: 'bg-surface-disabled text-text-disabled border-stroke-actionable-alt-disabled elevation-none cursor-not-allowed',
    },
    selected: {
        default: 'bg-surface-actionable-alt-selected text-text-inverse border-transparent elevation-xsmall-soft cursor-pointer',
        hover: 'hover:bg-surface-actionable-alt-hover',
        active: 'active:bg-surface-actionable-alt-pressed',
        disabled: 'bg-surface-actionable-alt-disabled text-text-inverse border-transparent elevation-none cursor-not-allowed',
    },
};

exports.wdpr_chip = WdprChip;
//# sourceMappingURL=wdpr-chip.entry.cjs.js.map

//# sourceMappingURL=wdpr-chip.cjs.entry.js.map