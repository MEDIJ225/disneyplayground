'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprNavIconButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprNavIconButtonClick = index.createEvent(this, "wdprNavIconButtonClick", 7);
        this.wdprNavIconButtonHover = index.createEvent(this, "wdprNavIconButtonHover", 7);
        this.wdprNavIconButtonFocusIn = index.createEvent(this, "wdprNavIconButtonFocusIn", 7);
        this.wdprNavIconButtonPressed = index.createEvent(this, "wdprNavIconButtonPressed", 7);
    }
    get el() { return index.getElement(this); }
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
        this._internalId = `wdpr-nav-icon-button-${utils.generateRandId()}`;
    }
    _blurActiveElement() {
        document.activeElement?.blur();
    }
    _getEventId() {
        return this.el.id || this._internalId;
    }
    handleKeyDown(ev) {
        if (ev.key === keycodes_model.KEYBOARD_KEYS.ESCAPE) {
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
        if (ev.key === keycodes_model.KEYBOARD_KEYS.ENTER || ev.key === keycodes_model.KEYBOARD_KEYS.SPACE) {
            this._isOpen = !this._isOpen;
            this.wdprNavIconButtonPressed.emit({ id: this._getEventId(), value: this._isOpen });
        }
        if (ev.key === keycodes_model.KEYBOARD_KEYS.ESCAPE) {
            this._isOpen = false;
        }
    };
    render() {
        return (index.h("span", { key: '48e044b8e911deebb5caa9fdc07ce98aa0b6ac91', class: buttonWrapperClasses }, index.h("button", { key: '70e446c6a4d0a6673e3a095da6e17a9e3ca1fa26', id: this._internalId, type: "button", onClick: this._onClick, class: buttonClasses, "aria-label": this.a11yLabel || undefined, "aria-pressed": this.active ? 'true' : 'false', "aria-controls": this.controlsId || null, "data-inverse": this.inverse.toString() }, index.h("span", { key: '8e1729e238c4b22a3a23607297d1d10064542277', class: iconClasses }, index.h("wdpr-icon-library", { key: '28d4ca93e0cb8586b36d01d96c00ec26d83e3471', icon: this.iconName, size: "medium", decorative: true }))), this.allowKeyboardChevron && (index.h("button", { key: '5fa69e91ba25820fb191ac7ac02c2354e3467c6e', type: "button", class: chevronButtonClasses, "aria-label": "Toggle menu", onKeyDown: this._handleChevronKeyDown }, index.h("wdpr-icon-library", { key: '7e0a3c75e556c8a435f0dc355c8c7591f1e407a4', icon: "next-caret-2.0", size: "xxsmall", style: { transform: this._isOpen ? 'rotate(270deg)' : 'rotate(90deg)' } })))));
    }
};
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

exports.wdpr_nav_icon_button = WdprNavIconButton;
//# sourceMappingURL=wdpr-nav-icon-button.entry.cjs.js.map

//# sourceMappingURL=wdpr-nav-icon-button.cjs.entry.js.map