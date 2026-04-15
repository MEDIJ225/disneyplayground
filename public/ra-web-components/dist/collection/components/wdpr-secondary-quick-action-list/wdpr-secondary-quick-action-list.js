import { h } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { generateRandId } from "../../utils/utils";
export class WdprSecondaryQuickActionList {
    el;
    _internalId;
    listId;
    a11yLabel = '';
    listTitle = '';
    wdprSecondaryQuickActionListClick;
    componentWillLoad() {
        this._internalId = this.listId || `wdpr-secondary-quick-action-list-${generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleNavItemMediumClick(event) {
        if (!event?.detail)
            return;
        this.wdprSecondaryQuickActionListClick.emit(event.detail);
    }
    render() {
        return (h("section", { key: '4b4ef72184fb43ceb7aee5d7dc98b6718c1e0194', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col gap-200" }, h("slot", { key: 'cb66636f62d5945ef71eb30d39d4b592d69d71d2' })));
    }
    static get is() { return "wdpr-secondary-quick-action-list"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "listId": {
                "type": "string",
                "attribute": "list-id",
                "mutable": true,
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
                "reflect": true
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
            "listTitle": {
                "type": "string",
                "attribute": "list-title",
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
                "method": "wdprSecondaryQuickActionListClick",
                "name": "wdprSecondaryQuickActionListClick",
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
    static get listeners() {
        return [{
                "name": "keydown",
                "method": "handleKeyDown",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "wdprNavItemMediumClick",
                "method": "handleNavItemMediumClick",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-secondary-quick-action-list.js.map
