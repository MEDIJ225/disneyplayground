import { h } from "@stencil/core";
import { customTwMerge, forwardCommonHostAttributes } from "../../utils/utils";
export class WdprFavoritesButton {
    /**
     * Reference to host element
     * @type {HTMLWdprFavoritesButtonElement}
     */
    el;
    internals;
    /**
     * Marks the favorites button as selected (toggles `aria-pressed`)
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
    required = false;
    name;
    value = 'favorite';
    /**
     * ARIA label for accessibility
     * @type {string}
     */
    ariaLabel;
    /**
     * On favorite button toggled. Sends the state of the button (selected or not selected).
     * @event
     * @type {{ selected: boolean }}
     */
    wdprFavoritesToggle;
    componentWillLoad() {
        this._updateFormValue();
    }
    formPropsChanged() {
        this._updateFormValue();
    }
    get selectedIconClass() {
        return this.disabled
            ? customTwMerge(selectedIconDisabledClasses)
            : customTwMerge(selectedIconBaseClasses, selectedIconHoverClasses, selectedIconActiveClasses);
    }
    get unselectedIconClass() {
        return this.disabled
            ? customTwMerge(unselectedIconDisabledClasses)
            : customTwMerge(unselectedIconBaseClasses, unselectedIconHoverClasses, unselectedIconActiveClasses);
    }
    get buttonClasses() {
        return customTwMerge(buttonBaseClasses, buttonFocusClasses);
    }
    handleClick = () => {
        if (this.disabled)
            return;
        this.selected = !this.selected;
        this._updateFormValue();
        this.wdprFavoritesToggle.emit({ selected: this.selected });
    };
    _updateFormValue() {
        const shouldSubmit = !this.disabled && !!this.name && this.selected;
        this.internals?.setFormValue?.(shouldSubmit ? this.value : null);
        this._updateValidity();
    }
    _updateValidity() {
        if (this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        if (this.required && !this.selected) {
            this.internals?.setValidity?.({ valueMissing: true }, 'This field is required');
            return;
        }
        this.internals?.setValidity?.({});
    }
    render() {
        return (h("button", { key: '458c0244c6b337cd47432cff37be8bfff0eb7d94', type: "button", ...forwardCommonHostAttributes(this.el), class: this.buttonClasses, onClick: this.handleClick, "aria-label": this.ariaLabel || undefined, "aria-pressed": this.selected ? 'true' : 'false', disabled: this.disabled, "aria-disabled": this.disabled ? 'true' : undefined }, this.selected && h("wdpr-icon-library", { key: 'bb9b0e1a93ac6661af737ab8cd20d2cd8c53e0b9', class: this.selectedIconClass, icon: "wishlist-filled", size: "medium", decorative: true }), !this.selected && h("wdpr-icon-library", { key: '978726c61ddb0ba22822ff669fdc52a80e0d76e5', class: this.unselectedIconClass, icon: "wishlist-empty-thick", size: "medium", decorative: true })));
    }
    static get is() { return "wdpr-favorites-button"; }
    static get encapsulation() { return "shadow"; }
    static get formAssociated() { return true; }
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
                    "text": "Marks the favorites button as selected (toggles `aria-pressed`)"
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
                "reflect": false,
                "defaultValue": "false"
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
                "reflect": false
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'favorite'"
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
                "required": true,
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
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "wdprFavoritesToggle",
                "name": "wdprFavoritesToggle",
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
                    "text": "On favorite button toggled. Sends the state of the button (selected or not selected)."
                },
                "complexType": {
                    "original": "{ selected: boolean }",
                    "resolved": "{ selected: boolean; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "selected",
                "methodName": "formPropsChanged"
            }, {
                "propName": "disabled",
                "methodName": "formPropsChanged"
            }, {
                "propName": "required",
                "methodName": "formPropsChanged"
            }, {
                "propName": "name",
                "methodName": "formPropsChanged"
            }, {
                "propName": "value",
                "methodName": "formPropsChanged"
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
const selectedIconBaseClasses = 'text-component-favorite-default';
const selectedIconHoverClasses = 'group-hover:text-component-favorite-hover';
const selectedIconActiveClasses = 'group-active:text-component-favorite-pressed';
const selectedIconDisabledClasses = 'text-component-favorite-disabled';
const unselectedIconBaseClasses = 'text-icon-body';
const unselectedIconHoverClasses = 'group-hover:text-icon-actionable-alt-hover';
const unselectedIconActiveClasses = 'group-active:text-icon-actionable-alt-pressed';
const unselectedIconDisabledClasses = 'text-text-disabled';
const buttonBaseClasses = 'bg-surface-default elevation-xsmall-soft p-125 rounded-pill cursor-pointer pointer-events-auto group disabled:cursor-not-allowed disabled:bg-surface-disabled';
const buttonFocusClasses = 'focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2';
//# sourceMappingURL=wdpr-favorites-button.js.map
