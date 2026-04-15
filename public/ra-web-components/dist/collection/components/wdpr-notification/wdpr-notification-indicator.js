import { h, Host } from "@stencil/core";
import { getContainerWrapper, getNumberClass } from "./notification-indicator-utils";
import { generateRandId } from "../../utils/utils";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
export class WdprNotificationIndicator {
    el;
    _internalId;
    componentId = null;
    size = "small";
    type = "alert";
    number = 0;
    decorative = false;
    a11yAriaLive = 'polite';
    a11yAriaRole = 'status';
    a11yLabel = '';
    componentWillLoad() {
        this._internalId = this.componentId || `wdpr-notification-indicator-${generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    get _containerWrapper() {
        return getContainerWrapper(this.type, this.size);
    }
    get _numberClass() {
        return getNumberClass(this.type);
    }
    render() {
        return (h(Host, { key: 'f5667c95f4b4791842a87b392aa48d02751fd73e' }, h("div", { key: 'cc37884b927fe7226ad7bada60d0256d210612eb', id: this._internalId, class: this._containerWrapper, role: this.a11yAriaRole || undefined, "aria-live": this.a11yAriaLive || undefined, "aria-label": this.a11yLabel || undefined }, h("span", { key: 'f94027bd1f5da470c87a636b208bb0ca1b5ef59f', class: this._numberClass }, this.size === 'small' ? (this.number || '\u200B') : null))));
    }
    static get is() { return "wdpr-notification-indicator"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
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
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "NotificationSizes",
                    "resolved": "\"small\" | \"xsmall\" | \"xxsmall\"",
                    "references": {
                        "NotificationSizes": {
                            "location": "import",
                            "path": "./wdpr-notification.model",
                            "id": "src/components/wdpr-notification/wdpr-notification.model.ts::NotificationSizes"
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
                "defaultValue": "\"small\""
            },
            "type": {
                "type": "string",
                "attribute": "type",
                "mutable": false,
                "complexType": {
                    "original": "NotificationTypes",
                    "resolved": "\"alert\" | \"informational\"",
                    "references": {
                        "NotificationTypes": {
                            "location": "import",
                            "path": "./wdpr-notification.model",
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
                "defaultValue": "\"alert\""
            },
            "number": {
                "type": "number",
                "attribute": "number",
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
            "decorative": {
                "type": "boolean",
                "attribute": "decorative",
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
            "a11yAriaLive": {
                "type": "string",
                "attribute": "a11y-aria-live",
                "mutable": false,
                "complexType": {
                    "original": "NotificationsA11yAriaLive",
                    "resolved": "\"assertive\" | \"off\" | \"polite\"",
                    "references": {
                        "NotificationsA11yAriaLive": {
                            "location": "import",
                            "path": "./wdpr-notification.model",
                            "id": "src/components/wdpr-notification/wdpr-notification.model.ts::NotificationsA11yAriaLive"
                        }
                    }
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
                "defaultValue": "'polite'"
            },
            "a11yAriaRole": {
                "type": "string",
                "attribute": "a11y-aria-role",
                "mutable": false,
                "complexType": {
                    "original": "NotificationsA11yAriaRole",
                    "resolved": "\"alert\" | \"status\"",
                    "references": {
                        "NotificationsA11yAriaRole": {
                            "location": "import",
                            "path": "./wdpr-notification.model",
                            "id": "src/components/wdpr-notification/wdpr-notification.model.ts::NotificationsA11yAriaRole"
                        }
                    }
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
                "defaultValue": "'status'"
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
                "reflect": false,
                "defaultValue": "''"
            }
        };
    }
    static get states() {
        return {
            "_internalId": {}
        };
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
//# sourceMappingURL=wdpr-notification-indicator.js.map
