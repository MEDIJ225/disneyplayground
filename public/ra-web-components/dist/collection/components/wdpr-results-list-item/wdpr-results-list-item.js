import { h, Host } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
export class WdprResultsListItem {
    /**
     * Reference to the component's host element.
     */
    el;
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
            const clickedCheckbox = event.composedPath().some(n => n instanceof HTMLElement && n.tagName === 'WDPR-CHECKBOX');
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
    static get is() { return "wdpr-results-list-item"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host { display: block; outline: none; }"; }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "ResultsListItemVariant",
                    "resolved": "\"checkbox\" | \"label\" | \"label-with-icon\" | \"slot\"",
                    "references": {
                        "ResultsListItemVariant": {
                            "location": "import",
                            "path": "./wdpr-results-list-item.model",
                            "id": "src/components/wdpr-results-list-item/wdpr-results-list-item.model.ts::ResultsListItemVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The variant of the list item."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'label'"
            },
            "label": {
                "type": "string",
                "attribute": "label",
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
                    "text": "The primary text label for the list item."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "description": {
                "type": "string",
                "attribute": "description",
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
                    "text": "Optional secondary text description (second row)."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "icon": {
                "type": "string",
                "attribute": "icon",
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
                    "text": "Icon name for the label-with-icon variant."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "selected": {
                "type": "boolean",
                "attribute": "selected",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the item is selected."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
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
                    "text": "Whether the item is disabled."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "value": {
                "type": "string",
                "attribute": "value",
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
                    "text": "The value associated with this item."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "checked": {
                "type": "boolean",
                "attribute": "checked",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the checkbox is checked (for checkbox variant)."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "itemId": {
                "type": "any",
                "attribute": "item-id",
                "mutable": false,
                "complexType": {
                    "original": "string | number",
                    "resolved": "number | string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Unique ID for the list item."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "isFocused": {
                "type": "boolean",
                "attribute": "is-focused",
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
                    "text": "Whether this item currently has focus (set by parent)."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "wdprSelect",
                "name": "wdprSelect",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when the item is selected/clicked."
                },
                "complexType": {
                    "original": "{\n    id: string | number;\n    value: string;\n    selected: boolean;\n    triggeredByKeyboard: boolean;\n  }",
                    "resolved": "{ id: string | number; value: string; selected: boolean; triggeredByKeyboard: boolean; }",
                    "references": {}
                }
            }, {
                "method": "wdprChange",
                "name": "wdprChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when checkbox state changes."
                },
                "complexType": {
                    "original": "{\n    id: string | number;\n    value: string;\n    checked: boolean;\n    triggeredByKeyboard: boolean;\n  }",
                    "resolved": "{ id: string | number; value: string; checked: boolean; triggeredByKeyboard: boolean; }",
                    "references": {}
                }
            }, {
                "method": "wdprKeyDown",
                "name": "wdprKeyDown",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when keyboard navigation occurs (bubbles to parent)."
                },
                "complexType": {
                    "original": "KeyboardEvent",
                    "resolved": "KeyboardEvent",
                    "references": {
                        "KeyboardEvent": {
                            "location": "global",
                            "id": "global::KeyboardEvent"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "checked",
                "methodName": "handleCheckedChange"
            }];
    }
}
//# sourceMappingURL=wdpr-results-list-item.js.map
