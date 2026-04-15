'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprButtonGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    _observer;
    _buttons = [];
    _pressedSet = new Set();
    _slot;
    get el() { return index.getElement(this); }
    layout = 'wrapped';
    name;
    a11yLabel = '';
    internals;
    handleKeyDown(event) {
        if (event.key !== keycodes_model.KEYBOARD_KEYS.ARROW_RIGHT && event.key !== keycodes_model.KEYBOARD_KEYS.ARROW_DOWN && event.key !== keycodes_model.KEYBOARD_KEYS.ARROW_LEFT && event.key !== keycodes_model.KEYBOARD_KEYS.ARROW_UP)
            return;
        // Find the nearest wdpr-button ancestor for the actual event target
        const origin = event.target?.closest?.('wdpr-button');
        if (!origin)
            return;
        if (!this._buttons.includes(origin))
            return;
        const currentIndex = this._buttons.indexOf(origin);
        let nextIndex = null;
        if (event.key === keycodes_model.KEYBOARD_KEYS.ARROW_RIGHT || event.key === keycodes_model.KEYBOARD_KEYS.ARROW_DOWN) {
            nextIndex = (currentIndex + 1) % this._buttons.length;
        }
        if (event.key === keycodes_model.KEYBOARD_KEYS.ARROW_LEFT || event.key === keycodes_model.KEYBOARD_KEYS.ARROW_UP) {
            nextIndex = (currentIndex - 1 + this._buttons.length) % this._buttons.length;
        }
        event.preventDefault();
        const nextButton = this._buttons[nextIndex]?.shadowRoot?.querySelector('button');
        nextButton?.focus();
    }
    handleButtonClick(event) {
        this._handleButtonToggle(event);
        this._syncButtonsFromDom();
    }
    handleFormReset() {
        this._updateFormValue();
    }
    async refreshInternals() {
        this._updateFormValue();
    }
    componentDidLoad() {
        this._initializeObserver();
        this._syncButtonsFromDom();
    }
    disconnectedCallback() {
        this._observer?.disconnect();
    }
    _initializeObserver() {
        this._observer = new MutationObserver(() => {
            this._syncButtonsFromDom();
        });
        this._observer.observe(this.el, {
            childList: true,
            subtree: true,
        });
    }
    _getFormValue() {
        return String(this._pressedButtons[0]?.value || '');
    }
    _updateFormValue() {
        const hasButtons = this._buttons.length > 0;
        if (!hasButtons) {
            this.internals?.setFormValue?.(null);
            return;
        }
        queueMicrotask(() => {
            if (this.internals && this.name) {
                this.internals?.setFormValue?.(this._getFormValue());
            }
        });
        this._updateValidity();
    }
    _updateValidity() {
        this.internals?.setValidity?.({});
    }
    _setPressed(button, pressed) {
        if (pressed) {
            this._pressedSet.add(button);
            button.setAttribute('data-pressed', 'true');
            button.setAttribute('aria-pressed', 'true');
            return;
        }
        this._pressedSet.delete(button);
        button.removeAttribute('data-pressed');
        button.setAttribute('aria-pressed', 'false');
    }
    _handleButtonToggle = (event) => {
        const toggledButton = event.target?.closest?.('wdpr-button');
        if (!toggledButton)
            return;
        if (!this._buttons.includes(toggledButton))
            return;
        this._buttons.forEach(button => {
            if (button !== toggledButton)
                this._setPressed(button, false);
        });
        this._setPressed(toggledButton, true);
        this._updateFormValue();
    };
    _syncButtonsFromDom() {
        if (this._slot) {
            const assigned = this._slot.assignedElements({ flatten: true });
            // Show only wdpr-button elements and hide the rest
            this._buttons = assigned.filter(element => element.tagName.toLowerCase() === 'wdpr-button');
            assigned.forEach((element) => {
                if (element.tagName.toLowerCase() === 'wdpr-button')
                    element.style.display = '';
                else
                    element.style.display = 'none';
            });
        }
        else {
            this._buttons = Array.from(this.el.querySelectorAll('wdpr-button'));
        }
        this._updateFormValue();
    }
    get _pressedButtons() {
        return Array.from(this._pressedSet.values());
    }
    get containerClass() {
        const layoutClasses = this.layout === 'horizontal-scroll' ? 'flex-nowrap w-max px-100' : 'flex-wrap';
        return utils.customTwMerge('flex gap-100 py-300', layoutClasses);
    }
    render() {
        if (this.layout === 'horizontal-scroll') {
            return (index.h("wdpr-scrollbar", { orientation: "horizontal", class: "w-full block" }, index.h("div", { part: "button-group-container", class: this.containerClass, role: "group", "aria-label": this.a11yLabel }, index.h("slot", { ref: el => (this._slot = el), onSlotchange: () => this._syncButtonsFromDom() }))));
        }
        return (index.h("div", { part: "button-group-container", class: this.containerClass, role: "group", "aria-label": this.a11yLabel }, index.h("slot", { ref: el => (this._slot = el), onSlotchange: () => this._syncButtonsFromDom() })));
    }
    static get formAssociated() { return true; }
};

exports.wdpr_button_group = WdprButtonGroup;
//# sourceMappingURL=wdpr-button-group.entry.cjs.js.map

//# sourceMappingURL=wdpr-button-group.cjs.entry.js.map