import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { g as generateRandId, c as customTwMerge } from './p-CXZGMLMW.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { d as defineCustomElement$4 } from './p-B0ImOrmz.js';
import { d as defineCustomElement$3 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$2 } from './p-BOubPl_u.js';

const WdprNavLoginButton$1 = /*@__PURE__*/ proxyCustomElement(class WdprNavLoginButton extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprNavLoginClick = createEvent(this, "wdprNavLoginClick", 7);
        this.wdprNavLoginHover = createEvent(this, "wdprNavLoginHover", 7);
        this.wdprNavLoginFocusIn = createEvent(this, "wdprNavLoginFocusIn", 7);
        this.wdprNavLoginPressed = createEvent(this, "wdprNavLoginPressed", 7);
    }
    get el() { return this; }
    _internalId;
    _labelMeasureText = '';
    active = false;
    allowKeyboardChevron = true;
    inverse = false;
    _isOpen = false;
    a11yLabel = '';
    loggedIn = false;
    iconName = 'profile-about-me';
    avatarSrc = '';
    avatarAlt = '';
    wdprNavLoginClick;
    wdprNavLoginHover;
    wdprNavLoginFocusIn;
    wdprNavLoginPressed;
    componentWillLoad() {
        this._internalId = `wdpr-nav-login-button-${generateRandId()}`;
    }
    componentDidLoad() {
        queueMicrotask(() => this._syncLabelMeasureText());
    }
    _blurActiveElement() {
        document.activeElement?.blur();
    }
    _getEventId() {
        return this.el.id || this._internalId;
    }
    handleKeyDown(ev) {
        if (ev.key === KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            this._blurActiveElement();
        }
    }
    handleMouseEnter() {
        this._isOpen = true;
        this.wdprNavLoginHover.emit({ id: this._getEventId(), value: true });
    }
    handleMouseLeave() {
        this._isOpen = false;
        this._blurActiveElement();
        this.wdprNavLoginHover.emit({ id: this._getEventId(), value: false });
    }
    handleFocusIn() {
        this.wdprNavLoginFocusIn.emit({ id: this._getEventId() });
    }
    handleFocusOut() {
        this._isOpen = false;
    }
    _handleClick = (event) => {
        event.preventDefault();
        this.wdprNavLoginClick.emit({ id: this._getEventId() });
    };
    _syncLabelMeasureText = () => {
        const slot = this.el.shadowRoot?.querySelector('slot:not([name])');
        if (!slot) {
            this._labelMeasureText = '';
            return;
        }
        let text = '';
        for (const n of slot.assignedNodes({ flatten: true })) {
            if (n.nodeType === Node.TEXT_NODE) {
                text += n.textContent ?? '';
            }
            else if (n.nodeType === Node.ELEMENT_NODE) {
                text += n.textContent ?? '';
            }
        }
        const next = text.replace(/\s+/g, ' ').trim();
        if (next !== this._labelMeasureText) {
            this._labelMeasureText = next;
        }
    };
    get _buttonClasses() {
        return customTwMerge(buttonLayoutClasses, this.loggedIn ? 'pl-050' : 'pl-125', this.loggedIn ? 'pr-100' : 'pr-150', buttonStateClasses);
    }
    get _labelSlotClasses() {
        return customTwMerge(labelSlotOverlayClasses, labelBaseClasses, labelStateClasses);
    }
    get _avatarGroupClasses() {
        return customTwMerge(avatarGroupBaseClasses, this.loggedIn && 'mt-050');
    }
    _handleChevronKeyDown = (ev) => {
        if (ev.key === KEYBOARD_KEYS.ENTER || ev.key === KEYBOARD_KEYS.SPACE) {
            this._isOpen = !this._isOpen;
            this.wdprNavLoginPressed.emit({ id: this._getEventId(), value: this._isOpen });
        }
        if (ev.key === KEYBOARD_KEYS.ESCAPE) {
            this._isOpen = false;
        }
    };
    render() {
        return (h("span", { key: '5e6aca98b44d25394ed16c8a92bd177fb0bc3f3c', class: buttonWrapperClasses }, h("button", { key: '644e29dec5be54c419d660332ee663332e271760', id: this._internalId, class: this._buttonClasses, onClick: this._handleClick, "aria-label": this.a11yLabel || undefined, "aria-pressed": this.active ? 'true' : 'false', "data-inverse": this.inverse.toString() }, h("span", { key: 'e08f337205cd78fa0e1e1914ebd0f77fc00c9a1f', class: this._avatarGroupClasses }, h("span", { key: '398d12055d07836b0f5492075644dbe57769e80f', class: avatarClasses }, this.loggedIn ? (h("wdpr-avatar", { imageSrc: this.avatarSrc, altText: this.avatarAlt, size: "small", isInteractive: false })) : (h("wdpr-icon-library", { icon: this.iconName, size: "medium", decorative: true })))), h("span", { key: 'd8d1974ec8be4e8c9dcefd19dfde19c718d43ce1', class: labelAndNotificationRowClasses }, h("span", { key: '9b3404ad8f3ac25bbe3f714080c198f3934c6544', class: labelStrutGridClasses }, h("span", { key: '3f67f73af40f51fe50719306f7730a30ae7e15b1', class: labelMeasureClasses, "aria-hidden": "true" }, this._labelMeasureText), h("span", { key: 'fed67c64aa1c04525161a86ce0722143e55a0c49', class: this._labelSlotClasses }, h("slot", { key: 'f060c4ae686c9c64062a106c92ed2246be79ed40', onSlotchange: this._syncLabelMeasureText }))), this.loggedIn && (h("span", { key: '9f86df58d55a8304d3c3c061fa762c29e4f3d08b', class: notificationClasses }, h("slot", { key: '949cbe7e2fd06af13877f5f28f34cbf3ea3cc084', name: "notification" }))))), this.allowKeyboardChevron && (h("button", { key: '60896b0a25ea9e6f6764ece19342f18e89d26e97', type: "button", class: chevronButtonClasses, "aria-label": "Toggle menu", onKeyDown: this._handleChevronKeyDown }, h("wdpr-icon-library", { key: 'b34f0ab152533a467cd28c734644fda3f348f62a', icon: "next-caret-2.0", size: "xxsmall", style: { transform: this._isOpen ? 'rotate(270deg)' : 'rotate(90deg)' } })))));
    }
}, [257, "wdpr-nav-login-button", {
        "active": [516],
        "allowKeyboardChevron": [516, "allow-keyboard-chevron"],
        "inverse": [516],
        "_isOpen": [1540, "_is-open"],
        "a11yLabel": [1, "a11y-label"],
        "loggedIn": [516, "logged-in"],
        "iconName": [1, "icon-name"],
        "avatarSrc": [1, "avatar-src"],
        "avatarAlt": [1, "avatar-alt"],
        "_internalId": [32],
        "_labelMeasureText": [32]
    }, [[0, "keydown", "handleKeyDown"], [1, "mouseenter", "handleMouseEnter"], [1, "mouseleave", "handleMouseLeave"], [0, "focusin", "handleFocusIn"], [0, "focusout", "handleFocusOut"]]]);
const buttonWrapperClasses = 'inline-flex items-center gap-050';
const buttonLayoutClasses = `inline-flex items-center justify-center min-h-dimension-500 max-h-dimension-500 pt-050 pb-050 gap-100
border-012 border-transparent rounded-pill transition-colors cursor-pointer group
focus:outline-none focus-visible:outline-focus focus-visible:outline-stroke-actionable-focused
focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-025
`;
const buttonStateClasses = `bg-surface-transparent hover:bg-[var(--color-plum-300-a40)] active:bg-surface-transparent

data-[inverse=true]:hover:bg-[var(--color-plum-500-a40)]
data-[inverse=true]:focus-visible:outline-stroke-actionable-inverse-focused

aria-pressed:data-[inverse=false]:bg-[var(--color-plum-300-a40)]
aria-pressed:data-[inverse=false]:hover:bg-[var(--color-plum-300-a40)]
aria-pressed:data-[inverse=false]:active:bg-[var(--color-plum-300)]

aria-pressed:data-[inverse=true]:bg-[var(--color-plum-500-a40)]
aria-pressed:data-[inverse=true]:hover:bg-[var(--color-plum-500-a40)]
aria-pressed:data-[inverse=true]:active:bg-[var(--color-plum-500)]`;
const avatarGroupBaseClasses = 'inline-flex shrink-0 items-center justify-center';
const avatarClasses = `text-icon-actionable-alt-default group-active:text-icon-actionable-alt-pressed
group-data-[inverse=true]:text-icon-actionable-inverse-default
group-data-[inverse=true]:group-active:text-icon-actionable-inverse-pressed`;
const labelAndNotificationRowClasses = 'inline-flex shrink-0 items-center';
const labelStrutGridClasses = 'inline-grid shrink-0 justify-center';
const labelMeasureClasses = 'invisible col-start-1 row-start-1 whitespace-nowrap pointer-events-none select-none text-component-large font-component-default leading-component-medium-alt tracking-default';
const labelSlotOverlayClasses = 'col-start-1 row-start-1 inline min-w-0 whitespace-nowrap';
const labelBaseClasses = 'text-component-large font-component-alt leading-component-medium-alt tracking-default';
const labelStateClasses = `text-text-actionable-alt-default group-active:text-text-actionable-alt-pressed
group-hover:font-component-default group-active:font-component-default group-aria-pressed:font-component-default
group-data-[inverse=true]:text-text-actionable-inverse-default
group-data-[inverse=true]:group-active:text-text-actionable-inverse-pressed
`;
const notificationClasses = 'inline-flex shrink-0 items-center justify-center pointer-events-none -mt-025';
const chevronButtonClasses = 'inline-flex shrink-0 items-center justify-center text-transparent focus-visible:text-black';
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-nav-login-button", "wdpr-avatar", "wdpr-icon-library", "wdpr-notification-indicator"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-nav-login-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprNavLoginButton$1);
            }
            break;
        case "wdpr-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprNavLoginButton = WdprNavLoginButton$1;
const defineCustomElement = defineCustomElement$1;

export { WdprNavLoginButton, defineCustomElement };
//# sourceMappingURL=wdpr-nav-login-button.js.map

//# sourceMappingURL=wdpr-nav-login-button.js.map