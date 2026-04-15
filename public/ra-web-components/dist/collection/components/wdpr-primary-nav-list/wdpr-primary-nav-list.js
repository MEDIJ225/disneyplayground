import { h } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { generateRandId } from "../../utils/utils";
export class WdprPrimaryNavList {
    el;
    _internalId;
    listId;
    a11yLabel = '';
    listTitle = '';
    wdprPrimaryNavListClick;
    componentWillLoad() {
        this._internalId = this.listId || `wdpr-primary-nav-list-${generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleNavItemLargeClick(event) {
        if (!event?.detail)
            return;
        this.wdprPrimaryNavListClick.emit(event.detail);
    }
    render() {
        return (h("section", { key: '885d6dcb84a0c5e76690d99e41e3839899df9fc1', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col" }, h("slot", { key: '4b0eaae91edc4d31c0d7dfd334778ae27d88c335' })));
    }
    static get is() { return "wdpr-primary-nav-list"; }
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
                "method": "wdprPrimaryNavListClick",
                "name": "wdprPrimaryNavListClick",
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
                "name": "wdprNavItemLargeClick",
                "method": "handleNavItemLargeClick",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-primary-nav-list.js.map
