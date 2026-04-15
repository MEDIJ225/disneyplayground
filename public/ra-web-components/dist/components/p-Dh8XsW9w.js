import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$4 } from './p-DTaaOZwt.js';
import { d as defineCustomElement$3 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$2 } from './p-_QubyXiP.js';
import { d as defineCustomElement$1 } from './p-DsPXJJ-e.js';

const WdprResultsListItem = /*@__PURE__*/ proxyCustomElement(class WdprResultsListItem extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprSelect = createEvent(this, "wdprSelect", 7);
        this.wdprChange = createEvent(this, "wdprChange", 7);
        this.wdprKeyDown = createEvent(this, "wdprKeyDown", 7);
    }
    get el() { return this; }
    /**
     * The variant of the list item.
     */
    variant = 'label';
    /**
     * The primary text label for the list item.
     */
    label;
    /**
     * Optional secondary text description (second row).
     */
    description;
    /**
     * Icon name for the label-with-icon variant.
     */
    icon;
    /**
     * Whether the item is selected.
     */
    selected = false;
    /**
     * Whether the item is disabled.
     */
    disabled = false;
    /**
     * The value associated with this item.
     */
    value;
    /**
     * Whether the checkbox is checked (for checkbox variant).
     */
    checked = false;
    handleCheckedChange(newValue) {
        // Sync internal checkbox element when parent changes the checked prop
        if (this._checkboxEl && this._checkboxEl.checked !== newValue) {
            this._checkboxEl.checked = newValue;
        }
    }
    /**
     * Unique ID for the list item.
     */
    itemId;
    /**
     * Whether this item currently has focus (set by parent).
     */
    isFocused = false;
    /**
     * Reference to the checkbox element for direct property manipulation.
     */
    _checkboxEl;
    /**
     * Event emitted when the item is selected/clicked.
     */
    wdprSelect;
    /**
     * Event emitted when checkbox state changes.
     */
    wdprChange;
    /**
     * Event emitted when keyboard navigation occurs (bubbles to parent).
     */
    wdprKeyDown;
    componentDidLoad() {
        this._preventFocus();
    }
    componentDidUpdate() {
        if (this.isFocused) {
            this._focusSelf();
        }
    }
    _preventFocus = () => {
        const allItems = this.el.shadowRoot.querySelectorAll('wdpr-checkbox');
        allItems.forEach(element => {
            element.setAttribute('tabindex', '-1');
        });
    };
    _focusSelf = () => {
        const host = this.el;
        host.focus();
    };
    /** Tracks if selection was triggered by keyboard (for focus ring handling) */
    _triggeredByKeyboard = false;
    _toggleSelectionFromRow() {
        if (this.disabled)
            return;
        const triggeredByKeyboard = this._triggeredByKeyboard;
        if (this.variant === 'checkbox') {
            this.checked = !this.checked;
            this.wdprChange.emit({
                id: this.itemId,
                value: this.value,
                checked: this.checked,
                triggeredByKeyboard,
            });
        }
        else {
            this.selected = !this.selected;
            this.wdprSelect.emit({
                id: this.itemId,
                value: this.value,
                selected: this.selected,
                triggeredByKeyboard,
            });
        }
        this._triggeredByKeyboard = false;
    }
    _handleClick = (event) => {
        if (this.disabled)
            return;
        if (this.variant === 'checkbox') {
            const clickedCheckbox = event.composedPath().some(n => n instanceof H && n.tagName === 'WDPR-CHECKBOX');
            if (clickedCheckbox) {
                return;
            }
        }
        this._toggleSelectionFromRow();
    };
    _handleCheckboxChange = (event) => {
        event.stopPropagation();
        this.checked = event.detail.checked;
        this.wdprChange.emit({
            id: this.itemId,
            value: this.value,
            checked: this.checked,
            triggeredByKeyboard: false, // Direct checkbox click is always mouse
        });
    };
    _handleKeyDown = (event) => {
        if (this.disabled)
            return;
        // Emit keyboard event to parent for navigation handling
        this.wdprKeyDown.emit(event);
        // Handle Enter/Space for selection at item level
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this._triggeredByKeyboard = true;
            this._toggleSelectionFromRow();
        }
    };
    _handleMouseEnter = () => {
        if (this._checkboxEl && this.checked && !this.disabled) {
            this._checkboxEl.forceHover = true;
        }
    };
    _handleMouseLeave = () => {
        if (this._checkboxEl) {
            this._checkboxEl.forceHover = false;
            this._checkboxEl.forceActive = false;
        }
    };
    _handleMouseDown = () => {
        if (this._checkboxEl && this.checked && !this.disabled) {
            this._checkboxEl.forceHover = false;
            this._checkboxEl.forceActive = true;
        }
    };
    _handleMouseUp = () => {
        if (this._checkboxEl && this.checked && !this.disabled) {
            this._checkboxEl.forceActive = false;
            this._checkboxEl.forceHover = true;
        }
    };
    get _containerClasses() {
        const baseClasses = 'flex items-start gap-100 p-100 rounded-100 transition-colors w-full outline-none';
        // Focus ring styling - applied when isFocused is true (keyboard navigation)
        const focusClasses = this.isFocused
            ? 'outline outline-solid outline-037 outline-offset-2 outline-stroke-actionable-focused'
            : 'outline-none';
        let stateClasses = '';
        if (this.variant === 'slot') {
            // Slot variant: no hover/pressed/selected states, slotted content handles its own
            stateClasses = 'bg-surface-transparent';
        }
        else if (this.disabled) {
            stateClasses = 'bg-surface-transparent text-text-actionable-alt-disabled cursor-not-allowed opacity-60';
        }
        else if (this.variant === 'checkbox' && this.checked) {
            // Checkbox checked: no hover/pressed on container, checkbox handles its own states
            stateClasses = 'bg-surface-transparent text-text-actionable-alt-default cursor-pointer';
        }
        else if (this.selected && this.variant !== 'checkbox') {
            stateClasses = `bg-surface-actionable-alt-selected text-white cursor-pointer
        hover:bg-surface-actionable-alt-hover hover:text-white
        active:bg-surface-actionable-alt-pressed active:text-white`;
        }
        else {
            stateClasses = `bg-surface-transparent text-text-actionable-alt-default cursor-pointer
        hover:bg-surface-actionable-alt-hover hover:text-white
        active:bg-surface-actionable-alt-pressed active:text-white`;
        }
        return customTwMerge(baseClasses, focusClasses, stateClasses);
    }
    _renderLabelVariant() {
        return (h("div", { class: "flex flex-col gap-050 flex-1" }, h("span", { class: "body-large line-clamp-2" }, this.label), this.description && h("span", { class: "body-small line-clamp-2" }, this.description)));
    }
    _renderLabelWithIconVariant() {
        const iconClasses = this.disabled
            ? 'text-icon-disabled'
            : this.selected
                ? 'text-icon-inverse'
                : 'text-icon-default active:text-icon-inverse hover:text-icon-inverse';
        return (h("div", { class: "flex items-start gap-150 flex-1" }, this.icon && (h("div", { class: iconClasses }, h("wdpr-icon-library", { icon: this.icon, size: "medium", decorative: true }))), h("div", { class: "flex flex-col gap-050 flex-1" }, h("span", { class: "body-large line-clamp-2" }, this.label), this.description && h("span", { class: "body-small line-clamp-2" }, this.description))));
    }
    _renderCheckboxVariant() {
        return (h("div", { class: "flex items-start gap-150 flex-1" }, h("div", { class: "flex items-center h-[28px]" }, h("wdpr-checkbox", { ref: (el) => this._checkboxEl = el, checked: this.checked, disabled: this.disabled, label: "", labelPosition: "none", onWdprChange: this._handleCheckboxChange })), h("div", { class: "flex flex-col gap-050 flex-1" }, h("span", { class: "body-large line-clamp-2" }, this.label), this.description && h("span", { class: "body-small line-clamp-2" }, this.description))));
    }
    _renderSlotVariant() {
        return (h("div", { class: "flex-1" }, h("slot", null)));
    }
    render() {
        let content;
        switch (this.variant) {
            case 'label-with-icon':
                content = this._renderLabelWithIconVariant();
                break;
            case 'checkbox':
                content = this._renderCheckboxVariant();
                break;
            case 'slot':
                content = this._renderSlotVariant();
                break;
            case 'label':
            default:
                content = this._renderLabelVariant();
                break;
        }
        return (h(Host, { key: '63d955b71dc27a862389cac4762b4a41588876b9', role: "option", "aria-selected": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : 'false', tabindex: this.disabled ? -1 : (this.isFocused ? 0 : -1), onClick: this._handleClick, onKeyDown: this._handleKeyDown, onMouseEnter: this._handleMouseEnter, onMouseLeave: this._handleMouseLeave, onMouseDown: this._handleMouseDown, onMouseUp: this._handleMouseUp }, h("div", { key: 'dfb490d33b7c1ccdc8ba611792dcc217c2340af1', class: this._containerClasses }, content)));
    }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
    static get style() { return ":host { display: block; outline: none; }"; }
}, [257, "wdpr-results-list-item", {
        "variant": [1],
        "label": [1],
        "description": [1],
        "icon": [1],
        "selected": [1028],
        "disabled": [4],
        "value": [1],
        "checked": [1540],
        "itemId": [8, "item-id"],
        "isFocused": [4, "is-focused"]
    }, undefined, {
        "checked": ["handleCheckedChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-results-list-item", "wdpr-checkbox", "wdpr-icon-library", "wdpr-inline-message", "wdpr-status-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-results-list-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprResultsListItem);
            }
            break;
        case "wdpr-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-inline-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "wdpr-status-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprResultsListItem as W, defineCustomElement as d };
//# sourceMappingURL=p-Dh8XsW9w.js.map

//# sourceMappingURL=p-Dh8XsW9w.js.map