import { h } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { generateRandId } from "../../utils/utils";
export class WdprBottomNavList {
    el;
    _internalId;
    listId;
    a11yLabel = '';
    listTitle = '';
    wdprBottomNavListClick;
    componentWillLoad() {
        this._internalId = this.listId || `wdpr-bottom-nav-list-${generateRandId()}`;
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
        this.wdprBottomNavListClick.emit(event.detail);
    }
    handleNavItemSelectableChange(event) {
        const itemId = event?.detail?.itemId;
        if (!itemId)
            return;
        this.wdprBottomNavListClick.emit(itemId);
    }
    render() {
        return (h("section", { key: 'a87b1bd1ada803c74eda94fba1998181daa6eee7', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col gap-200" }, h("slot", { key: '7a3d0654db26feffffbd741412c55f40c2f3c52d' })));
    }
    static get is() { return "wdpr-bottom-nav-list"; }
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
                "method": "wdprBottomNavListClick",
                "name": "wdprBottomNavListClick",
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
//# sourceMappingURL=wdpr-bottom-nav-list.js.map
