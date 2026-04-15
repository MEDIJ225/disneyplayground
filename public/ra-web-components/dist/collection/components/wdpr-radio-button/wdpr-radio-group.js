import { h } from "@stencil/core";
import { createEvent } from "../../utils/utils";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
export class WdprRadioGroup {
    /* Reference to the host element of the component */
    el;
    internals;
    defaultValue = null;
    /* Stores the original disabled state of each radio button before group-level disabled is applied */
    radioOriginalDisabledStates = new WeakMap();
    constructor() {
        this.internals = this.el.attachInternals();
    }
    /* The currently selected value in the radio group */
    value = null;
    /* Disables all radio buttons in the group */
    disabled = false;
    /* Accessible label for the radio group */
    ariaLabel = '';
    /* Name applied during form submission */
    name;
    /* Whether the group is required */
    required = false;
    /* Event emitted when the selected value changes */
    wdprChange;
    /* Internal state to store the list of radio buttons in the group */
    radioButtons = [];
    cardMicroElements = [];
    collectRadios() {
        this.radioButtons = Array.from(this.el.querySelectorAll('wdpr-radio-button'));
        // Capture original disabled states for new radio buttons
        this.radioButtons.forEach(radio => {
            if (!this.radioOriginalDisabledStates.has(radio)) {
                this.radioOriginalDisabledStates.set(radio, radio.disabled);
            }
        });
    }
    _collectCardMicros() {
        this.cardMicroElements = Array.from(this.el.querySelectorAll('wdpr-card-micro'));
    }
    handleValueChanged() {
        this.updateRadios();
        this.updateFormValue();
        const selectedRadio = this.radioButtons.find(radio => radio.value === this.value);
        if (selectedRadio) {
            this.el.setAttribute('selected', selectedRadio.name || '');
        }
        else {
            this.el.removeAttribute('selected');
        }
    }
    handleDisabledChanged() {
        this.updateRadios();
        this.updateFormValue();
    }
    handleRequiredChanged() {
        this.updateFormValue();
    }
    /* Lifecycle method that runs before the component loads */
    componentWillLoad() {
        this.collectRadios();
        const selectedRadio = this.radioButtons.find(radio => radio.selected && !radio.disabled);
        if (selectedRadio && this.value == null) {
            this.value = selectedRadio.value;
        }
        this.defaultValue = this.value;
        this.updateRadios(false);
        this.updateFormValue();
    }
    connectedCallback() {
        this.el.addEventListener('formreset', this.handleFormReset);
    }
    disconnectedCallback() {
        this.el.removeEventListener('formreset', this.handleFormReset);
    }
    componentDidLoad() {
        this.collectRadios();
        this._collectCardMicros();
        this.updateRadios(false);
        // Retry setting tabindex after a short delay
        this._ensureTabindexSet();
    }
    /**
     * Ensures at least one radio button has tabindex="0".
     * Retries a few times with delays to handle shadow DOM timing issues.
     */
    _ensureTabindexSet(attempts = 3) {
        if (attempts <= 0)
            return;
        setTimeout(() => {
            const hasTabindex = this.radioButtons.some(radio => {
                const radioRole = radio.shadowRoot?.querySelector('div[role="radio"]');
                return radioRole?.getAttribute('tabindex') === '0';
            });
            if (!hasTabindex) {
                this.updateRadios(true);
                this._ensureTabindexSet(attempts - 1);
            }
        }, 50);
    }
    /* Updates the state of the radio buttons in the group */
    updateRadios(refreshList = true) {
        if (refreshList) {
            this.collectRadios();
        }
        let focusAssigned = false;
        this.radioButtons.forEach(radio => {
            const isSelected = this.value === radio.value;
            radio.selected = isSelected;
            // Use the original disabled state of the radio button, combined with the group's disabled state
            const originalDisabled = this.radioOriginalDisabledStates.get(radio) ?? false;
            radio.disabled = this.disabled || originalDisabled;
            const radioRole = radio.shadowRoot?.querySelector('div[role="radio"]');
            if (radioRole) {
                if (isSelected && !radio.disabled) {
                    radioRole.setAttribute('tabindex', '0');
                    focusAssigned = true;
                }
                else {
                    radioRole.setAttribute('tabindex', '-1');
                }
            }
        });
        if (!focusAssigned) {
            const firstEnabled = this.radioButtons.find(radio => !radio.disabled);
            const radioRole = firstEnabled?.shadowRoot?.querySelector('div[role="radio"]');
            radioRole?.setAttribute('tabindex', '0');
        }
        this.radioButtons.forEach(radio => {
            radio.refreshInternals?.();
        });
        let cardFocusAssigned = false;
        this.cardMicroElements.forEach(card => {
            const radio = card.querySelector('wdpr-radio-button');
            const cardDiv = card.shadowRoot?.querySelector('div:first-child');
            radio.disabled = card.disabled;
            if (cardDiv) {
                if (radio?.selected) {
                    cardDiv.setAttribute('tabindex', '0');
                    cardFocusAssigned = true;
                }
                else {
                    cardDiv.setAttribute('tabindex', '-1');
                }
            }
        });
        if (!cardFocusAssigned && this.cardMicroElements.length > 0) {
            const firstCardDiv = this.cardMicroElements[0].shadowRoot?.querySelector('div:first-child');
            firstCardDiv?.setAttribute('tabindex', '0');
        }
    }
    handleFormReset = () => {
        this.value = this.defaultValue;
    };
    updateFormValue() {
        if (this.disabled || this.value == null) {
            this.internals?.setFormValue?.(null);
        }
        else {
            this.internals?.setFormValue?.(this.value);
        }
        this.updateValidity();
    }
    updateValidity() {
        if (!this.required || this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        const hasSelection = this.radioButtons.some(radio => radio.value === this.value && !radio.disabled);
        if (hasSelection) {
            this.internals?.setValidity?.({});
        }
        else {
            this.internals?.setValidity?.({ valueMissing: true }, 'Please select an option');
        }
    }
    emitNativeEvents() {
        const changeEvent = createEvent('change', { bubbles: true, composed: true, cancelable: true });
        this.el.dispatchEvent(changeEvent);
    }
    /* Re-collects and updates radio buttons when slotted content changes */
    _handleSlotChange = () => {
        // Delay slightly to ensure new radio buttons have their shadow roots ready
        setTimeout(() => {
            this.collectRadios();
            this.updateRadios(false);
            // Also ensure tabindex is set after slot content changes
            this._ensureTabindexSet();
        }, 10);
    };
    /* Handles the 'radioSelected' event emitted by a radio button */
    handleRadioSelect(ev) {
        const previousValue = this.value;
        this.value = ev.detail;
        if (previousValue !== this.value) {
            this.emitNativeEvents();
        }
        this.wdprChange.emit(this.value ?? '');
    }
    /* Finds the next non-disabled index in a circular list */
    findNextEnabledIndex(items, currentIndex, direction) {
        if (items.length === 0)
            return -1;
        let nextIndex = currentIndex;
        do {
            nextIndex = (nextIndex + direction + items.length) % items.length;
        } while (items[nextIndex].disabled && nextIndex !== currentIndex);
        return items[nextIndex].disabled ? -1 : nextIndex;
    }
    /* Updates all radios to reflect the target radio as focused/selected */
    activateRadio(targetRadio, focusEl) {
        this.radioButtons.forEach(radio => {
            const radioRole = radio.shadowRoot?.querySelector('div[role="radio"]');
            const isTarget = radio === targetRadio;
            if (radioRole) {
                radioRole.setAttribute('tabindex', isTarget ? '0' : '-1');
            }
            radio.selected = false;
            radio.focused = isTarget;
            radio.keyboardNavigation = isTarget;
        });
        (focusEl ?? targetRadio.shadowRoot?.querySelector('div[role="radio"]'))?.focus();
        targetRadio.selectRadio();
    }
    /* Moves focus to the next or previous radio button based on the direction */
    focusNext(currentIndex, direction) {
        const nextIndex = this.findNextEnabledIndex(this.radioButtons, currentIndex, direction);
        if (nextIndex === -1)
            return;
        this.activateRadio(this.radioButtons[nextIndex]);
    }
    /* Moves focus to the next or previous card micro element based on the direction */
    focusNextCardMicro(currentIndex, direction) {
        const nextIndex = this.findNextEnabledIndex(this.cardMicroElements, currentIndex, direction);
        if (nextIndex === -1)
            return;
        const nextCard = this.cardMicroElements[nextIndex];
        const nextRadio = nextCard.querySelector('wdpr-radio-button');
        const focusEl = nextCard.shadowRoot?.querySelector('div:first-child');
        this.activateRadio(nextRadio, focusEl);
    }
    onPressSpace(target) {
        const selectedRadio = this.radioButtons.find(radio => radio.selected);
        if (selectedRadio) {
            selectedRadio.selected = false;
            selectedRadio.focused = false;
            selectedRadio.keyboardNavigation = false;
            selectedRadio.tabIndex = -1;
        }
        else {
            const roleRadio = target.shadowRoot?.querySelector('div[role="radio"]');
            roleRadio.focus();
        }
        target.focused = true;
        target.keyboardNavigation = true;
        target.selectRadio();
    }
    /* Handles keyboard navigation for the radio group */
    handleKeyDown(ev) {
        const target = ev.target;
        const radio = target.nodeName === 'WDPR-RADIO-BUTTON' ? target : target.querySelector('wdpr-radio-button');
        const index = this.radioButtons.indexOf(radio);
        if (index === -1)
            return;
        if (ev.code === 'Space' || ev.key === ' ') {
            ev.preventDefault();
            this.onPressSpace(radio);
            return;
        }
        const isCardMicro = target.nodeName === 'WDPR-CARD-MICRO';
        const cardIndex = isCardMicro ? this.cardMicroElements.indexOf(target) : -1;
        const direction = (ev.key === KEYBOARD_KEYS.ARROW_RIGHT || ev.key === KEYBOARD_KEYS.ARROW_DOWN) ? 1
            : (ev.key === KEYBOARD_KEYS.ARROW_LEFT || ev.key === KEYBOARD_KEYS.ARROW_UP) ? -1
                : null;
        if (direction == null)
            return;
        ev.preventDefault();
        if (isCardMicro && cardIndex !== -1) {
            this.focusNextCardMicro(cardIndex, direction);
        }
        else {
            this.focusNext(index, direction);
        }
    }
    /* Renders the radio group container with a slot for child radio buttons */
    render() {
        return (h("div", { key: '10177a6138b6452ae43a34ad0c7efa843b5a45f6', role: "radiogroup", "aria-label": this.ariaLabel, class: "flex flex-col gap-2", onKeyDown: e => this.handleKeyDown(e) }, h("slot", { key: 'ab7e67fd6da7fb5fc545d21df37da2a34be2fd7a', onSlotchange: this._handleSlotChange })));
    }
    static get is() { return "wdpr-radio-group"; }
    static get encapsulation() { return "shadow"; }
    static get formAssociated() { return true; }
    static get properties() {
        return {
            "value": {
                "type": "string",
                "attribute": "value",
                "mutable": true,
                "complexType": {
                    "original": "string | null",
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
                "reflect": true,
                "defaultValue": "null"
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
                "reflect": true,
                "defaultValue": "false"
            },
            "ariaLabel": {
                "type": "string",
                "attribute": "aria-label",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "required": {
                "type": "boolean",
                "attribute": "required",
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
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "radioButtons": {},
            "cardMicroElements": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprChange",
                "name": "wdprChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "handleValueChanged"
            }, {
                "propName": "disabled",
                "methodName": "handleDisabledChanged"
            }, {
                "propName": "required",
                "methodName": "handleRequiredChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "radioSelected",
                "method": "handleRadioSelect",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-radio-group.js.map
