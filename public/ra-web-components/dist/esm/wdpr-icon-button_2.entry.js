import { r as registerInstance, c as createEvent, a as getElement, h, H as Host } from './index-CykM8GCN.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import { c as customTwMerge, g as generateRandId } from './utils-B2sDCMk6.js';
import { b as bundleCjsExports } from './bundle-cjs-CF3xLdU_.js';

const getButtonClass = (variant, size) => {
    return customTwMerge(baseClasses, focusClasses, variant === 'bgPrimary' || variant === 'bgSecondary' ? sizeClass[size] : null, variantClasses[variant].default, variantClasses[variant].hover, variantClasses[variant].focusVisible, variantClasses[variant].active, variantClasses[variant].disabled);
};
const getNotificationSizeClass = (variant, size) => {
    const map = {
        background: {
            xxsmall: 'xxsmall',
            xsmall: 'xsmall',
            small: 'small',
            medium: 'small',
            large: 'small',
            xlarge: 'small',
        },
        default: {
            xxsmall: 'xxsmall',
            xsmall: 'xxsmall',
            small: 'xsmall',
            medium: 'xsmall',
            large: 'small',
            xlarge: 'small',
        },
    };
    return variant === 'bgPrimary' || variant === 'bgSecondary' ? map['background'][size] : map.default[size];
};
const baseClasses = `relative inline-flex items-center justify-center cursor-pointer rounded-pill
  text-black transition-colors disabled:cursor-not-allowed`;
const focusClasses = 'focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-037';
const variantClasses = {
    'bgPrimary': {
        default: 'bg-surface-default text-text-actionable-alt-default elevation-xsmall-soft',
        hover: 'hover:bg-surface-default hover:text-text-actionable-alt-hover',
        active: 'active:bg-surface-default active:text-text-actionable-alt-pressed',
        focusVisible: 'focus-visible:outline-stroke-actionable-focused',
        disabled: 'disabled:bg-surface-disabled disabled:text-text-actionable-alt-disabled disabled:elevation-xsmall-soft',
    },
    'bgSecondary': {
        default: 'bg-surface-default text-text-actionable-default elevation-xsmall-soft',
        hover: 'hover:bg-surface-default hover:text-text-actionable-hover',
        active: 'active:bg-surface-default active:text-text-actionable-pressed',
        focusVisible: 'focus-visible:outline-stroke-actionable-focused',
        disabled: 'disabled:bg-surface-disabled disabled:text-text-actionable-disabled disabled:elevation-xsmall-soft',
    },
    'primary': {
        default: 'bg-surface-transparent text-text-actionable-alt-default',
        hover: 'hover:text-text-actionable-alt-hover',
        active: 'active:text-text-actionable-alt-pressed',
        focusVisible: 'focus-visible:outline-stroke-actionable-focused',
        disabled: 'disabled:text-text-actionable-alt-disabled',
    },
    'secondary': {
        default: 'bg-surface-transparent text-text-actionable-default',
        hover: 'hover:text-text-actionable-hover',
        active: 'active:text-text-actionable-pressed',
        focusVisible: 'focus-visible:outline-stroke-actionable-focused',
        disabled: 'disabled:text-text-actionable-disabled',
    },
    'inverse': {
        default: 'bg-surface-transparent text-white',
        hover: 'hover:text-text-actionable-inverse-hover',
        active: 'active:text-text-actionable-inverse-pressed',
        focusVisible: 'focus-visible:outline-stroke-inverse',
        disabled: 'disabled:text-text-actionable-inverse-disabled',
    },
    'tertiary-alt': {
        default: 'bg-surface-transparent text-text-inverse',
        hover: 'hover:text-white',
        active: 'active:text-text-actionable-inverse-pressed',
        focusVisible: 'focus-visible:outline-stroke-inverse',
        disabled: 'disabled:text-text-actionable-inverse-disabled',
    },
};
const sizeClass = {
    xxsmall: 'p-087',
    xsmall: 'p-125',
    small: 'p-125',
    medium: 'p-150',
    large: 'p-200',
    xlarge: 'p-200',
};
const notificationPaddingClasses = {
    'with-bg': {
        xxsmall: '-top-175 -right-025',
        xsmall: '-top-175 -right-025',
        small: '-top-125 -right-025',
        medium: '-top-100 -right-025',
        large: '-top-050 -right-025',
        xlarge: '-top-050 right-025',
    },
    'without-bg': {
        xxsmall: '-top-175 -right-050',
        xsmall: '-top-175 -right-050',
        small: '-top-175 -right-050',
        medium: '-top-175 -right-050',
        large: '-top-125 -right-050',
        xlarge: '-top-100 -right-050',
    },
};

const WdprIconButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.clicked = createEvent(this, "clicked", 7);
    }
    get el() { return getElement(this); }
    /**
     * The internal ID for the component. It is used internally and is not exposed.
     */
    _internalId;
    showNotificationBadge = false;
    buttonId;
    customTabIndex = 0;
    type = 'button';
    size = 'medium';
    variant = 'primary';
    iconName;
    disabled = false;
    a11yExpanded;
    notificationNumber = 0;
    notificationType = 'alert';
    a11yLabel;
    clicked;
    componentWillLoad() {
        this._internalId = this.buttonId || `wdpr-icon-button-${generateRandId()}`;
    }
    onClick = () => {
        this.clicked.emit(true);
    };
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    get _notificationSize() {
        return getNotificationSizeClass(this.variant, this.size);
    }
    get _buttonClass() {
        return getButtonClass(this.variant, this.size);
    }
    get _notificationPositionClass() {
        const variant = this.variant === 'bgPrimary' || this.variant === 'bgSecondary' ? 'with-bg' : 'without-bg';
        return notificationPaddingClasses[variant][this.size];
    }
    get _accessibleLabel() {
        if (this.showNotificationBadge && this.notificationNumber > 0) {
            const notificationText = this.notificationNumber === 1 ? 'notification' : 'notifications';
            return `${this.a11yLabel}, ${this.notificationNumber} ${notificationText}`;
        }
        return this.a11yLabel;
    }
    render() {
        return (h("div", { key: 'ce656dd77dc2588d7e0f1d37dd6034055f83d5dc', class: "flex items-center justify-center" }, h("button", { key: '3b28dcfc6346ab9e8ec508884d3b6592b271b478', id: this._internalId, type: this.type, disabled: this.disabled, class: this._buttonClass, onClick: this.onClick, "aria-label": this._accessibleLabel, "aria-expanded": this.a11yExpanded, tabIndex: this.customTabIndex, part: "button" }, h("wdpr-icon-library", { key: 'ba333b111cd866c1f4c5a769c90735790a3e7425', icon: this.iconName, size: this.size, decorative: true }), this.showNotificationBadge && (h("span", { key: '9fbc8c3e11dcad4437ee87a026c0ae653945570d', class: `absolute ${this._notificationPositionClass}` }, h("wdpr-notification-indicator", { key: 'caac741f69ac1aa0a3a3d66b682e779af07eff2d', number: this.notificationNumber, size: this._notificationSize, type: this.notificationType, decorative: true }))))));
    }
};

const getContainerWrapper = (type, size) => {
    const baseClass = "w-fit rounded-pill inline-flex justify-center items-center";
    const backgroundClass = type === "alert" ? "bg-surface-status-critical" : "bg-surface-status-informational-alt";
    const sizeClass = size === 'small' ? 'px-050 min-w-dimension-175 h-dimension-175' :
        size === 'xsmall' ? 'min-w-dimension-100 h-dimension-100' : 'min-w-dimension-075 h-dimension-075';
    return bundleCjsExports.twMerge(baseClass, backgroundClass, sizeClass);
};
const getNumberClass = (type) => {
    const baseClass = "component-xxsmall";
    const numberColorClass = type === "alert" ? "text-text-inverse" : "text-text-label";
    return bundleCjsExports.twMerge(baseClass, numberColorClass);
};

const WdprNotificationIndicator = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    _internalId;
    componentId = null;
    size = "small";
    type = "alert";
    number = 0;
    decorative = false;
    a11yAriaLive = 'polite';
    a11yAriaRole = 'status';
    a11yLabel = '';
    componentWillLoad() {
        this._internalId = this.componentId || `wdpr-notification-indicator-${generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    get _containerWrapper() {
        return getContainerWrapper(this.type, this.size);
    }
    get _numberClass() {
        return getNumberClass(this.type);
    }
    render() {
        return (h(Host, { key: 'f5667c95f4b4791842a87b392aa48d02751fd73e' }, h("div", { key: 'cc37884b927fe7226ad7bada60d0256d210612eb', id: this._internalId, class: this._containerWrapper, role: this.a11yAriaRole || undefined, "aria-live": this.a11yAriaLive || undefined, "aria-label": this.a11yLabel || undefined }, h("span", { key: 'f94027bd1f5da470c87a636b208bb0ca1b5ef59f', class: this._numberClass }, this.size === 'small' ? (this.number || '\u200B') : null))));
    }
};

export { WdprIconButton as wdpr_icon_button, WdprNotificationIndicator as wdpr_notification_indicator };
//# sourceMappingURL=wdpr-icon-button.wdpr-notification-indicator.entry.js.map

//# sourceMappingURL=wdpr-icon-button_2.entry.js.map