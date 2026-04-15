import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { c as customTwMerge, g as generateRandId } from './p-CXZGMLMW.js';
import { d as defineCustomElement$2 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$1 } from './p-BOubPl_u.js';

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

const WdprIconButton = /*@__PURE__*/ proxyCustomElement(class WdprIconButton extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.clicked = createEvent(this, "clicked", 7);
    }
    get el() { return this; }
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
}, [257, "wdpr-icon-button", {
        "showNotificationBadge": [1540, "show-notification-badge"],
        "buttonId": [1, "button-id"],
        "customTabIndex": [2, "custom-tab-index"],
        "type": [1],
        "size": [1],
        "variant": [1],
        "iconName": [1, "icon-name"],
        "disabled": [4],
        "a11yExpanded": [1, "a11y-expanded"],
        "notificationNumber": [2, "notification-number"],
        "notificationType": [1, "notification-type"],
        "a11yLabel": [1, "a11y-label"],
        "_internalId": [32]
    }, [[0, "keydown", "handleKeyDown"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-icon-button", "wdpr-icon-library", "wdpr-notification-indicator"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-icon-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprIconButton);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprIconButton as W, defineCustomElement as d };
//# sourceMappingURL=p-CqBIcCq6.js.map

//# sourceMappingURL=p-CqBIcCq6.js.map