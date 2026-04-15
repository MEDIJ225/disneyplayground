import { h } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { generateRandId } from "../../utils/utils";
export class WdprSecondaryNavList {
    el;
    _internalId;
    listId;
    a11yLabel = '';
    listTitle = '';
    wdprSecondaryNavListClick;
    componentWillLoad() {
        this._internalId = this.listId || `wdpr-secondary-nav-list-${generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleNavItemSmallClick(event) {
        if (!event?.detail)
            return;
        this.wdprSecondaryNavListClick.emit(event.detail);
    }
    handleNavItemSelectableChange(event) {
        const itemId = event?.detail?.itemId;
        if (!itemId)
            return;
        this.wdprSecondaryNavListClick.emit(itemId);
    }
    render() {
        return (h("section", { key: 'f9b340c2d5e6f48133025ddbac67fbcd377a86a2', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col gap-500" }, h("slot", { key: '554862dbf664402bda929be58f43966d9936c9e2' })));
    }
    static get is() { return "wdpr-secondary-nav-list"; }
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
                "method": "wdprSecondaryNavListClick",
                "name": "wdprSecondaryNavListClick",
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
                "name": "wdprNavItemSmallClick",
                "method": "handleNavItemSmallClick",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "wdprSelectChange",
                "method": "handleNavItemSelectableChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-secondary-nav-list.js.map
