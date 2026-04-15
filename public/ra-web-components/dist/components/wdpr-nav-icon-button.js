import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { g as generateRandId } from './p-CXZGMLMW.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { d as defineCustomElement$2 } from './p-CiDhVxgt.js';

const WdprNavIconButton$1 = /*@__PURE__*/ proxyCustomElement(class WdprNavIconButton extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprNavIconButtonClick = createEvent(this, "wdprNavIconButtonClick", 7);
        this.wdprNavIconButtonHover = createEvent(this, "wdprNavIconButtonHover", 7);
        this.wdprNavIconButtonFocusIn = createEvent(this, "wdprNavIconButtonFocusIn", 7);
        this.wdprNavIconButtonPressed = createEvent(this, "wdprNavIconButtonPressed", 7);
    }
    get el() { return this; }
    _internalId;
    iconName = '';
    active = false;
    inverse = false;
    a11yLabel = '';
    controlsId;
    _isOpen = false;
    allowKeyboardChevron = true;
    wdprNavIconButtonClick;
    wdprNavIconButtonHover;
    wdprNavIconButtonFocusIn;
    wdprNavIconButtonPressed;
    componentWillLoad() {
        this._internalId = `wdpr-nav-icon-button-${generateRandId()}`;
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
        this.wdprNavIconButtonHover.emit({ id: this._getEventId(), value: true });
    }
    handleMouseLeave() {
        this._isOpen = false;
        this._blurActiveElement();
        this.wdprNavIconButtonHover.emit({ id: this._getEventId(), value: false });
    }
    handleFocusIn() {
        this.wdprNavIconButtonFocusIn.emit({ id: this._getEventId() });
    }
    handleFocusOut() {
        this._isOpen = false;
    }
    _onClick = () => {
        this.wdprNavIconButtonClick.emit({ id: this._getEventId() });
    };
    _handleChevronKeyDown = (ev) => {
        if (ev.key === KEYBOARD_KEYS.ENTER || ev.key === KEYBOARD_KEYS.SPACE) {
            this._isOpen = !this._isOpen;
            this.wdprNavIconButtonPressed.emit({ id: this._getEventId(), value: this._isOpen });
        }
        if (ev.key === KEYBOARD_KEYS.ESCAPE) {
            this._isOpen = false;
        }
    };
    render() {
        return (h("span", { key: '48e044b8e911deebb5caa9fdc07ce98aa0b6ac91', class: buttonWrapperClasses }, h("button", { key: '70e446c6a4d0a6673e3a095da6e17a9e3ca1fa26', id: this._internalId, type: "button", onClick: this._onClick, class: buttonClasses, "aria-label": this.a11yLabel || undefined, "aria-pressed": this.active ? 'true' : 'false', "aria-controls": this.controlsId || null, "data-inverse": this.inverse.toString() }, h("span", { key: '8e1729e238c4b22a3a23607297d1d10064542277', class: iconClasses }, h("wdpr-icon-library", { key: '28d4ca93e0cb8586b36d01d96c00ec26d83e3471', icon: this.iconName, size: "medium", decorative: true }))), this.allowKeyboardChevron && (h("button", { key: '5fa69e91ba25820fb191ac7ac02c2354e3467c6e', type: "button", class: chevronButtonClasses, "aria-label": "Toggle menu", onKeyDown: this._handleChevronKeyDown }, h("wdpr-icon-library", { key: '7e0a3c75e556c8a435f0dc355c8c7591f1e407a4', icon: "next-caret-2.0", size: "xxsmall", style: { transform: this._isOpen ? 'rotate(270deg)' : 'rotate(90deg)' } })))));
    }
}, [257, "wdpr-nav-icon-button", {
        "iconName": [1, "icon-name"],
        "active": [516],
        "inverse": [516],
        "a11yLabel": [1, "a11y-label"],
        "controlsId": [1, "controls-id"],
        "_isOpen": [1540, "_is-open"],
        "allowKeyboardChevron": [516, "allow-keyboard-chevron"],
        "_internalId": [32]
    }, [[0, "keydown", "handleKeyDown"], [1, "mouseenter", "handleMouseEnter"], [1, "mouseleave", "handleMouseLeave"], [0, "focusin", "handleFocusIn"], [0, "focusout", "handleFocusOut"]]]);
const buttonWrapperClasses = 'inline-flex items-center gap-050';
const buttonClasses = `inline-flex items-center justify-center w-dimension-500 h-dimension-500
border-012 border-transparent rounded-pill transition-colors cursor-pointer group
focus:outline-none focus-visible:outline-focus focus-visible:outline-stroke-actionable-focused
focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-025

bg-surface-transparent hover:bg-[var(--color-plum-300-a40)] active:bg-surface-transparent

data-[inverse=true]:hover:bg-[var(--color-plum-500-a40)]
data-[inverse=true]:focus-visible:outline-stroke-actionable-inverse-focused

aria-pressed:data-[inverse=false]:bg-[var(--color-plum-300-a40)]
aria-pressed:data-[inverse=false]:hover:bg-[var(--color-plum-300-a40)]
aria-pressed:data-[inverse=false]:active:bg-[var(--color-plum-300)]

aria-pressed:data-[inverse=true]:bg-[var(--color-plum-500-a40)]
aria-pressed:data-[inverse=true]:hover:bg-[var(--color-plum-500-a40)]
aria-pressed:data-[inverse=true]:active:bg-[var(--color-plum-500)]`;
/** Icon inherits color from the button group; only pressed state shifts color, not hover. */
const iconClasses = `text-icon-actionable-alt-default group-active:text-icon-actionable-alt-pressed
group-data-[inverse=true]:text-icon-actionable-inverse-default
group-data-[inverse=true]:group-active:text-icon-actionable-inverse-pressed`;
const chevronButtonClasses = 'inline-flex shrink-0 items-center justify-center text-transparent focus-visible:text-black';
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-nav-icon-button", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-nav-icon-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprNavIconButton$1);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprNavIconButton = WdprNavIconButton$1;
const defineCustomElement = defineCustomElement$1;

export { WdprNavIconButton, defineCustomElement };
//# sourceMappingURL=wdpr-nav-icon-button.js.map

//# sourceMappingURL=wdpr-nav-icon-button.js.map