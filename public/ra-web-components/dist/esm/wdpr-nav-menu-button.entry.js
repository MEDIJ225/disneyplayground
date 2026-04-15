import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CykM8GCN.js';
import { g as generateRandId, c as customTwMerge } from './utils-B2sDCMk6.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprNavMenuButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprNavMenuButtonClick = createEvent(this, "wdprNavMenuButtonClick", 7);
        this.wdprNavMenuButtonHover = createEvent(this, "wdprNavMenuButtonHover", 7);
        this.wdprNavMenuButtonFocusIn = createEvent(this, "wdprNavMenuButtonFocusIn", 7);
        this.wdprNavMenuButtonPressed = createEvent(this, "wdprNavMenuButtonPressed", 7);
    }
    get el() { return getElement(this); }
    _internalId;
    label = 'Tickets';
    active = false;
    allowKeyboardChevron = true;
    controlsId;
    inverse = false;
    _isOpen = false;
    wdprNavMenuButtonClick;
    wdprNavMenuButtonHover;
    wdprNavMenuButtonFocusIn;
    wdprNavMenuButtonPressed;
    componentWillLoad() {
        this._internalId = `wdpr-nav-menu-button-${generateRandId()}`;
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
        this.wdprNavMenuButtonHover.emit({ id: this._getEventId(), value: true });
    }
    handleMouseLeave() {
        this._isOpen = false;
        this._blurActiveElement();
        this.wdprNavMenuButtonHover.emit({ id: this._getEventId(), value: false });
    }
    handleFocusIn() {
        this.wdprNavMenuButtonFocusIn.emit({ id: this._getEventId() });
    }
    handleFocusOut() {
        this._isOpen = false;
    }
    _onClick = () => {
        this.wdprNavMenuButtonClick.emit({ id: this._getEventId() });
    };
    _handleChevronKeyDown = (ev) => {
        if (ev.key === KEYBOARD_KEYS.ENTER || ev.key === KEYBOARD_KEYS.SPACE) {
            this._isOpen = !this._isOpen;
            this.wdprNavMenuButtonPressed.emit({ id: this._getEventId(), value: this._isOpen });
        }
        if (ev.key === KEYBOARD_KEYS.ESCAPE) {
            this._isOpen = false;
        }
    };
    render() {
        return (
        // 050 ensures the button's hover/active background doesn't overlap with the invisible chevron
        h("span", { key: '83b6c56937f5395cd55dc3fd84fdd40ea52249a9', class: "inline-flex items-center gap-050" }, h("button", { key: 'a0725a1ae388d484620b2f6e246fb8ba57519587', id: this._internalId, type: "button", onClick: this._onClick, class: buttonClasses, "aria-expanded": this.active ? 'true' : 'false', "aria-haspopup": "menu", "aria-controls": this.controlsId || null, "data-inverse": this.inverse.toString() }, h("span", { key: 'c769c435fce1565f5517c6af23577d5ce952659a', class: labelStrutGridClasses }, h("span", { key: '42357876dc157962b9dd0984a3a0734757ba401f', class: labelMeasureClasses, "aria-hidden": "true" }, this.label), h("span", { key: '642bedc652abd961360a0f7c90c8bafd549d6ce0', class: customTwMerge(labelBaseClasses, labelStateClasses) }, this.label))), this.allowKeyboardChevron && (h("button", { key: '5cc40e3199009afe8d2a9ca8dd4757f777aef9a1', type: "button", class: chevronButtonClasses, "aria-label": "Toggle menu", onKeyDown: this._handleChevronKeyDown }, h("wdpr-icon-library", { key: 'd39cf31752e2b8e5f0e6e9ba1d873cbb8afd180e', icon: "next-caret-2.0", size: "xxsmall", style: { transform: this._isOpen ? 'rotate(270deg)' : 'rotate(90deg)' } })))));
    }
};
const buttonClasses = `inline-flex items-center justify-center min-h-dimension-500 max-h-dimension-500 px-125 py-050
border-012 border-transparent rounded-pill transition-colors cursor-pointer group
focus:outline-none focus-visible:outline-focus focus-visible:outline-stroke-actionable-focused
focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-025

bg-surface-transparent hover:bg-[var(--color-plum-300-a40)] active:bg-surface-transparent

data-[inverse=true]:hover:bg-[var(--color-plum-500-a40)]
data-[inverse=true]:active:bg-surface-transparent
data-[inverse=true]:focus-visible:outline-stroke-actionable-inverse-focused

aria-expanded:data-[inverse=false]:bg-[var(--color-plum-300-a40)]
aria-expanded:data-[inverse=false]:hover:bg-[var(--color-plum-300-a40)]
aria-expanded:data-[inverse=false]:active:bg-[var(--color-plum-300)]

aria-expanded:data-[inverse=true]:bg-[var(--color-plum-500-a40)]
aria-expanded:data-[inverse=true]:hover:bg-[var(--color-plum-500-a40)]
aria-expanded:data-[inverse=true]:active:bg-[var(--color-plum-500)]`;
const labelStrutGridClasses = 'inline-grid shrink-0 justify-center';
/** Invisible bold clone — always renders at bold weight to hold the max width, preventing layout shift. */
const labelMeasureClasses = 'invisible col-start-1 row-start-1 whitespace-nowrap pointer-events-none select-none text-component-large font-component-default leading-component-medium-alt tracking-default';
const labelBaseClasses = 'col-start-1 row-start-1 inline min-w-0 whitespace-nowrap text-component-large font-component-alt leading-component-medium-alt tracking-default';
/** Hover does not change text color; only pressed state and weight changes apply. */
const labelStateClasses = `text-text-actionable-alt-default group-active:text-text-actionable-alt-pressed
group-hover:font-component-default group-active:font-component-default group-aria-expanded:font-component-default
group-data-[inverse=true]:text-text-actionable-inverse-default
group-data-[inverse=true]:group-active:text-text-actionable-inverse-pressed`;
const chevronButtonClasses = 'inline-flex shrink-0 items-center justify-center text-transparent focus-visible:text-black';

export { WdprNavMenuButton as wdpr_nav_menu_button };
//# sourceMappingURL=wdpr-nav-menu-button.entry.js.map

//# sourceMappingURL=wdpr-nav-menu-button.entry.js.map