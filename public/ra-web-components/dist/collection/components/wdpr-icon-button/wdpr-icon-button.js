import { h } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { generateRandId } from "../../utils/utils";
import { getButtonClass, notificationPaddingClasses, getNotificationSizeClass } from "./wdpr-icon-button.utils";
export class WdprIconButton {
    /**
     * Reference to host element
     * @type {HTMLWdprIconButtonElement}
     */
    el;
    /**
     * The internal ID for the component. It is used internally and is not exposed.
     */
    _internalId;
    showNotificationBadge = false;
    buttonId;
    customTabIndex = 0;
    type = 'button';
    size = 'medium';
    variant = 'primary';
    iconName;
    disabled = false;
    a11yExpanded;
    notificationNumber = 0;
    notificationType = 'alert';
    a11yLabel;
    clicked;
    componentWillLoad() {
        this._internalId = this.buttonId || `wdpr-icon-button-${generateRandId()}`;
    }
    onClick = () => {
        this.clicked.emit(true);
    };
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    get _notificationSize() {
        return getNotificationSizeClass(this.variant, this.size);
    }
    get _buttonClass() {
        return getButtonClass(this.variant, this.size);
    }
    get _notificationPositionClass() {
        const variant = this.variant === 'bgPrimary' || this.variant === 'bgSecondary' ? 'with-bg' : 'without-bg';
        return notificationPaddingClasses[variant][this.size];
    }
    get _accessibleLabel() {
        if (this.showNotificationBadge && this.notificationNumber > 0) {
            const notificationText = this.notificationNumber === 1 ? 'notification' : 'notifications';
            return `${this.a11yLabel}, ${this.notificationNumber} ${notificationText}`;
        }
        return this.a11yLabel;
    }
    render() {
        return (h("div", { key: 'ce656dd77dc2588d7e0f1d37dd6034055f83d5dc', class: "flex items-center justify-center" }, h("button", { key: '3b28dcfc6346ab9e8ec508884d3b6592b271b478', id: this._internalId, type: this.type, disabled: this.disabled, class: this._buttonClass, onClick: this.onClick, "aria-label": this._accessibleLabel, "aria-expanded": this.a11yExpanded, tabIndex: this.customTabIndex, part: "button" }, h("wdpr-icon-library", { key: 'ba333b111cd866c1f4c5a769c90735790a3e7425', icon: this.iconName, size: this.size, decorative: true }), this.showNotificationBadge && (h("span", { key: '9fbc8c3e11dcad4437ee87a026c0ae653945570d', class: `absolute ${this._notificationPositionClass}` }, h("wdpr-notification-indicator", { key: 'caac741f69ac1aa0a3a3d66b682e779af07eff2d', number: this.notificationNumber, size: this._notificationSize, type: this.notificationType, decorative: true }))))));
    }
    static get is() { return "wdpr-icon-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "showNotificationBadge": {
                "type": "boolean",
                "attribute": "show-notification-badge",
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
            "buttonId": {
                "type": "string",
                "attribute": "button-id",
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
            "customTabIndex": {
                "type": "number",
                "attribute": "custom-tab-index",
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
            "type": {
                "type": "string",
                "attribute": "type",
                "mutable": false,
                "complexType": {
                    "original": "IconButtonType",
                    "resolved": "\"button\" | \"reset\" | \"submit\"",
                    "references": {
                        "IconButtonType": {
                            "location": "import",
                            "path": "./wdpr-icon-button.model",
                            "id": "src/components/wdpr-icon-button/wdpr-icon-button.model.ts::IconButtonType"
                        }
                    }
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
                "defaultValue": "'button'"
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "IconButtonSize",
                    "resolved": "\"large\" | \"medium\" | \"small\" | \"xlarge\" | \"xsmall\" | \"xxsmall\"",
                    "references": {
                        "IconButtonSize": {
                            "location": "import",
                            "path": "./wdpr-icon-button.model",
                            "id": "src/components/wdpr-icon-button/wdpr-icon-button.model.ts::IconButtonSize"
                        }
                    }
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
                "defaultValue": "'medium'"
            },
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "IconButtonVariants",
                    "resolved": "\"bgPrimary\" | \"bgSecondary\" | \"inverse\" | \"primary\" | \"secondary\" | \"tertiary-alt\"",
                    "references": {
                        "IconButtonVariants": {
                            "location": "import",
                            "path": "./wdpr-icon-button.model",
                            "id": "src/components/wdpr-icon-button/wdpr-icon-button.model.ts::IconButtonVariants"
                        }
                    }
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
                "defaultValue": "'primary'"
            },
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
                "reflect": false
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
                "reflect": false,
                "defaultValue": "false"
            },
            "a11yExpanded": {
                "type": "string",
                "attribute": "a11y-expanded",
                "mutable": false,
                "complexType": {
                    "original": "'true' | 'false'",
                    "resolved": "\"false\" | \"true\"",
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
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "0"
            },
            "notificationType": {
                "type": "string",
                "attribute": "notification-type",
                "mutable": false,
                "complexType": {
                    "original": "NotificationTypes",
                    "resolved": "\"alert\" | \"informational\"",
                    "references": {
                        "NotificationTypes": {
                            "location": "import",
                            "path": "../wdpr-notification/wdpr-notification.model",
                            "id": "src/components/wdpr-notification/wdpr-notification.model.ts::NotificationTypes"
                        }
                    }
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
                "defaultValue": "'alert'"
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
                "required": true,
                "optional": false,
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
            "_internalId": {}
        };
    }
    static get events() {
        return [{
                "method": "clicked",
                "name": "clicked",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
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
            }];
    }
}
//# sourceMappingURL=wdpr-icon-button.js.map
