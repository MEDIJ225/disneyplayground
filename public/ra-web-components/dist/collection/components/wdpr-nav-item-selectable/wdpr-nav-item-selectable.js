import { h } from "@stencil/core";
import { generateRandId } from "../../utils/utils";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { getColorClass, getContainerClass, getLabelClass } from "./wdpr-nav-item-selectable.utils";
export class WdprNavItemSelectable {
    el;
    _internalId;
    _internalSelected = false;
    _isTwoLineClamp = false;
    label;
    componentId = null;
    disabled = false;
    inverse = false;
    allowBoldText = false;
    selected;
    showNotificationBadge = false;
    notificationNumber = 0;
    itemId;
    a11yLabel;
    wdprSelectChange;
    _leadingSlot;
    _trailingSlot;
    _labelElement;
    _resizeObserver;
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleWindowResize() {
        this._updateClampState();
    }
    componentWillLoad() {
        this._updateSlots();
        this._internalId = this.componentId || `wdpr-nav-item-selectable-${generateRandId()}`;
    }
    componentDidLoad() {
        this._updateClampState();
        if (typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver(() => this._updateClampState());
            this._resizeObserver.observe(this.el);
            if (this._labelElement) {
                this._resizeObserver.observe(this._labelElement);
            }
        }
    }
    componentDidRender() {
        this._updateClampState();
    }
    disconnectedCallback() {
        this._resizeObserver?.disconnect();
    }
    get _labelClass() {
        return getLabelClass(this._colorClass, this.allowBoldText);
    }
    get _containerClass() {
        return getContainerClass(this.disabled, this._isSelected, this.inverse);
    }
    get _colorClass() {
        return getColorClass(this.disabled, this._isSelected, this.inverse);
    }
    get _contentAlignmentClass() {
        return this._isTwoLineClamp ? 'items-start' : 'items-center';
    }
    get _paddingClass() {
        return !this._isTwoLineClamp ? '-mt-025' : '';
    }
    get _trailingSectionAlignmentClass() {
        return this._isTwoLineClamp ? 'self-start' : '';
    }
    get _isSelected() {
        return this.selected !== undefined ? this.selected : this._internalSelected;
    }
    get _accessibleLabel() {
        return this.a11yLabel || this.label;
    }
    get _resolvedItemId() {
        return this.itemId || this.componentId || this._internalId;
    }
    _toggleSelectable() {
        const nextValue = !this._isSelected;
        if (this.selected === undefined) {
            this._internalSelected = nextValue;
        }
        this.wdprSelectChange.emit({
            selected: nextValue,
            itemId: this._resolvedItemId,
        });
    }
    _onItemInteraction = (ev) => {
        ev.preventDefault();
        if (this.disabled)
            return;
        this._toggleSelectable();
    };
    _onItemKeyDown = (ev) => {
        if (ev.key === KEYBOARD_KEYS.ENTER || ev.key === KEYBOARD_KEYS.SPACE) {
            this._onItemInteraction(ev);
        }
    };
    _updateSlots = () => {
        this._leadingSlot = this.el.querySelector('[slot="leading-icon"]');
        this._trailingSlot = this.el.querySelector('[slot="trailing-icon"]');
    };
    _updateClampState = () => {
        if (!this._labelElement || typeof window === 'undefined')
            return;
        const lineHeight = Number.parseFloat(window.getComputedStyle(this._labelElement).lineHeight);
        const isTwoLineClamp = this._labelElement.scrollHeight > lineHeight * 1.5;
        if (isTwoLineClamp !== this._isTwoLineClamp) {
            this._isTwoLineClamp = isTwoLineClamp;
        }
    };
    render() {
        return (h("div", { key: '3e3f9c9d6ea419db39b66df123de8dd70417321d', tabIndex: this.disabled ? -1 : 0, class: this._containerClass, id: this._internalId, role: "button", "aria-disabled": this.disabled ? 'true' : undefined, "aria-pressed": this._isSelected ? 'true' : 'false', "aria-label": this._accessibleLabel, onClick: this._onItemInteraction, onKeyDown: this._onItemKeyDown }, h("section", { key: 'a588d42f29ae406ec97027b5fb23d368c142c6ba', class: `flex min-w-0 flex-1 gap-100 ${this._contentAlignmentClass}` }, this._leadingSlot && (h("div", { key: '160cf423dcf05893f7477a26d8113f4c7b4f2818', class: `flex shrink-0 ${this._contentAlignmentClass} ${this._paddingClass} ${this._colorClass}` }, h("slot", { key: '9e66da0503594597876d402fd5a955e12969e321', name: "leading-icon", onSlotchange: this._updateSlots }))), h("span", { key: 'e53a6da17cf545e79e79201c411332b4d4f8c9fb', class: this._labelClass, ref: el => (this._labelElement = el) }, this.label)), h("section", { key: 'b0493cfb472cba9553b849a6f7a2bdad47cc7f1e', class: `flex shrink-0 ${this._trailingSectionAlignmentClass} ${this._paddingClass} ${this._contentAlignmentClass}` }, this.showNotificationBadge && (h("span", { key: 'c2a97e9e72715aa53d2697113eadd214aea29425', class: `flex px-075 ${this._contentAlignmentClass}` }, h("wdpr-notification-indicator", { key: 'af779c9f03c1384a380eabda24e0e3cb99620ba1', size: "small", number: this.notificationNumber, decorative: true }))), this._trailingSlot && (h("div", { key: 'dc841437b24ddf81d9ca2ba48d43cda6e9853545', class: `flex ${this._contentAlignmentClass} ${this._colorClass}` }, h("slot", { key: '4b4c2c2c5b827480f601d07b98f45b0b71d6b10c', name: "trailing-icon", onSlotchange: this._updateSlots }))))));
    }
    static get is() { return "wdpr-nav-item-selectable"; }
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
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "componentId": {
                "type": "string",
                "attribute": "component-id",
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
                "reflect": false,
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
                "optional": true,
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "allowBoldText": {
                "type": "boolean",
                "attribute": "allow-bold-text",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
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
                "reflect": true,
                "defaultValue": "false"
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "showNotificationBadge": {
                "type": "boolean",
                "attribute": "show-notification-badge",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
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
                "reflect": true,
                "defaultValue": "false"
            },
            "notificationNumber": {
                "type": "number",
                "attribute": "notification-number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "reflect": false,
                "defaultValue": "0"
            },
            "itemId": {
                "type": "string",
                "attribute": "item-id",
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "_internalId": {},
            "_internalSelected": {},
            "_isTwoLineClamp": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprSelectChange",
                "name": "wdprSelectChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "NavItemSelectableDetail",
                    "resolved": "NavItemSelectableDetail",
                    "references": {
                        "NavItemSelectableDetail": {
                            "location": "import",
                            "path": "./wdpr-nav-item-selectable.model",
                            "id": "src/components/wdpr-nav-item-selectable/wdpr-nav-item-selectable.model.ts::NavItemSelectableDetail"
                        }
                    }
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
                "name": "window:resize",
                "method": "handleWindowResize",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-nav-item-selectable.js.map
