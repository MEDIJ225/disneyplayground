import { h } from "@stencil/core";
import { customTwMerge, generateRandId } from "../../utils/utils";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
export class WdprNavMenuButton {
    el;
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
    static get is() { return "wdpr-nav-menu-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Tickets'"
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
                "method": "wdprNavMenuButtonClick",
                "name": "wdprNavMenuButtonClick",
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
                "method": "wdprNavMenuButtonHover",
                "name": "wdprNavMenuButtonHover",
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
                "method": "wdprNavMenuButtonFocusIn",
                "name": "wdprNavMenuButtonFocusIn",
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
                "method": "wdprNavMenuButtonPressed",
                "name": "wdprNavMenuButtonPressed",
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
//# sourceMappingURL=wdpr-nav-menu-button.js.map
