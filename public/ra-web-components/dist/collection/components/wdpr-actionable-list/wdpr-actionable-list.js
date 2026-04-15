import { h, Host } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
export class WdprActionableList {
    el;
    items = [];
    showDivider = true;
    _renderListItem(item, index, totalItems) {
        const shouldShowDivider = this.showDivider && index < totalItems - 1;
        return (h("div", { key: item.id }, h("wdpr-actionable-list-item", { itemId: item.id, headerLabel: item.headerLabel, preHeader: item.preHeader, subtextLabel: item.subtextLabel, headerLeadingIcon: item.headerLeadingIcon, headerSize: item.headerSize, linkLeadingIcon: item.linkLeadingIcon, linkText: item.linkText, linkTrailingIcon: item.linkTrailingIcon, linkVariant: item.linkVariant, linkHref: item.linkHref, linkTarget: item.linkTarget, linkA11yLabel: item.linkA11yLabel, linkDisabled: item.linkDisabled, linkRel: item.linkRel }), shouldShowDivider && (h("div", { class: "my-4" }, h("wdpr-divider", null)))));
    }
    _renderItems() {
        const totalItems = this.items.length;
        return (h("div", { class: customTwMerge('flex flex-col') }, this.items.map((item, index) => this._renderListItem(item, index, totalItems))));
    }
    render() {
        return (h(Host, { key: '769fa897b4f92cb2539f9f0110778eddeee4f38e' }, this._renderItems()));
    }
    static get is() { return "wdpr-actionable-list"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "items": {
                "type": "unknown",
                "attribute": "items",
                "mutable": false,
                "complexType": {
                    "original": "ActionableListItemConfig[]",
                    "resolved": "ActionableListItemConfig[]",
                    "references": {
                        "ActionableListItemConfig": {
                            "location": "import",
                            "path": "../wdpr-actionable-list-item/wdpr-actionable-list-item.model",
                            "id": "src/components/wdpr-actionable-list-item/wdpr-actionable-list-item.model.ts::ActionableListItemConfig"
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
                "defaultValue": "[]"
            },
            "showDivider": {
                "type": "boolean",
                "attribute": "show-divider",
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
                "defaultValue": "true"
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-actionable-list.js.map
