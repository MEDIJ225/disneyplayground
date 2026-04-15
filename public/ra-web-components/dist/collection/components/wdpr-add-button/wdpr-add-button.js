import { h } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
export class WdprAddButton {
    /**
     * Reference to host element
     * @type {HTMLWdprAddButtonElement}
     */
    el;
    /**
     * Marks the add button as selected (toggles `aria-pressed`)
     * @default false
     * @type {boolean}
     */
    selected = false;
    /**
     * Disables interactivity and applies disabled styling
     * @default false
     * @type {boolean}
     */
    disabled = false;
    /**
     * ARIA label for accessibility
     * @type {string}
     */
    a11yLabel = '';
    /**
     * On add button toggled. Sends the state of the button (selected or not selected).
     * @event
     * @type {{ selected: boolean }}
     */
    wdprAddToggle;
    _onButtonClick = () => {
        if (this.disabled)
            return;
        this.selected = !this.selected;
        this.wdprAddToggle.emit({ selected: this.selected });
    };
    _getButtonBaseClasses() {
        const bgClass = this.selected ? 'disabled:bg-surface-default bg-surface-actionable-alt-selected hover:bg-surface-actionable-alt-hover active:bg-surface-actionable-alt-pressed' : 'bg-surface-default';
        return customTwMerge(bgClass, 'elevation-xsmall-soft', 'p-125', 'rounded-pill', 'cursor-pointer', 'pointer-events-auto', 'group', 'disabled:cursor-not-allowed', 'disabled:bg-surface-disabled');
    }
    get _buttonClasses() {
        return customTwMerge(this._getButtonBaseClasses(), buttonFocusClasses);
    }
    get _selectedIconClass() {
        return this.disabled ? customTwMerge(selectedIconDisabledClasses) : customTwMerge(selectedIconBaseClasses, selectedIconHoverClasses, selectedIconActiveClasses);
    }
    get _unselectedIconClass() {
        return this.disabled ? customTwMerge(unselectedIconDisabledClasses) : customTwMerge(unselectedIconBaseClasses, unselectedIconHoverClasses, unselectedIconActiveClasses);
    }
    render() {
        return (h("button", { key: '37fa97f91a71cefb5617d473ff4c44baf68d3b47', type: "button", class: this._buttonClasses, onClick: this._onButtonClick, "aria-label": this.a11yLabel || undefined, "aria-pressed": this.selected ? 'true' : 'false', disabled: this.disabled, "aria-disabled": this.disabled ? 'true' : undefined }, this.selected && h("wdpr-icon-library", { key: '8ec687e0f802a2406c7a00b7702f8fb4ffee5a91', class: this._selectedIconClass, icon: "checkmark", size: "medium", decorative: true }), !this.selected && h("wdpr-icon-library", { key: '42792a0c526b263450ef73bddee1c0e055d14f89', class: this._unselectedIconClass, icon: "add-stepper", size: "medium", decorative: true })));
    }
    static get is() { return "wdpr-add-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
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
                    "tags": [{
                            "name": "default",
                            "text": "false"
                        }, {
                            "name": "type",
                            "text": "{boolean}"
                        }],
                    "text": "Marks the add button as selected (toggles `aria-pressed`)"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
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
                    "tags": [{
                            "name": "default",
                            "text": "false"
                        }, {
                            "name": "type",
                            "text": "{boolean}"
                        }],
                    "text": "Disables interactivity and applies disabled styling"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "a11yLabel": {
                "type": "string",
                "attribute": "a11y-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "ARIA label for accessibility"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            }
        };
    }
    static get events() {
        return [{
                "method": "wdprAddToggle",
                "name": "wdprAddToggle",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "event",
                            "text": undefined
                        }, {
                            "name": "type",
                            "text": "{{ selected: boolean }}"
                        }],
                    "text": "On add button toggled. Sends the state of the button (selected or not selected)."
                },
                "complexType": {
                    "original": "{ selected: boolean }",
                    "resolved": "{ selected: boolean; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
const selectedIconBaseClasses = 'text-component-add-default';
const selectedIconHoverClasses = 'group-hover:text-component-add-hover';
const selectedIconActiveClasses = 'group-active:text-component-add-pressed';
const selectedIconDisabledClasses = 'text-component-add-disabled';
const unselectedIconBaseClasses = 'text-icon-body';
const unselectedIconHoverClasses = 'group-hover:text-icon-actionable-alt-hover';
const unselectedIconActiveClasses = 'group-active:text-icon-actionable-alt-pressed';
const unselectedIconDisabledClasses = 'text-text-disabled';
const buttonFocusClasses = 'focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2';
//# sourceMappingURL=wdpr-add-button.js.map
