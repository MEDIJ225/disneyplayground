import { h } from "@stencil/core";
import { generateRandId } from "../../utils/utils";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
export class WdprNavIconButton {
    el;
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
    static get is() { return "wdpr-nav-icon-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "iconName": {
                "type": "string",
                "attribute": "icon-name",
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
            "active": {
                "type": "boolean",
                "attribute": "active",
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
            "inverse": {
                "type": "boolean",
                "attribute": "inverse",
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
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
            "controlsId": {
                "type": "string",
                "attribute": "controls-id",
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
            "_isOpen": {
                "type": "boolean",
                "attribute": "_is-open",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "allowKeyboardChevron": {
                "type": "boolean",
                "attribute": "allow-keyboard-chevron",
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
                "defaultValue": "true"
            }
        };
    }
    static get states() {
        return {
            "_internalId": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprNavIconButtonClick",
                "name": "wdprNavIconButtonClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ id: string }",
                    "resolved": "{ id: string; }",
                    "references": {}
                }
            }, {
                "method": "wdprNavIconButtonHover",
                "name": "wdprNavIconButtonHover",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ id: string; value: boolean }",
                    "resolved": "{ id: string; value: boolean; }",
                    "references": {}
                }
            }, {
                "method": "wdprNavIconButtonFocusIn",
                "name": "wdprNavIconButtonFocusIn",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ id: string }",
                    "resolved": "{ id: string; }",
                    "references": {}
                }
            }, {
                "method": "wdprNavIconButtonPressed",
                "name": "wdprNavIconButtonPressed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ id: string; value: boolean }",
                    "resolved": "{ id: string; value: boolean; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "keydown",
                "method": "handleKeyDown",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "mouseenter",
                "method": "handleMouseEnter",
                "target": undefined,
                "capture": false,
                "passive": true
            }, {
                "name": "mouseleave",
                "method": "handleMouseLeave",
                "target": undefined,
                "capture": false,
                "passive": true
            }, {
                "name": "focusin",
                "method": "handleFocusIn",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "focusout",
                "method": "handleFocusOut",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
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
//# sourceMappingURL=wdpr-nav-icon-button.js.map
