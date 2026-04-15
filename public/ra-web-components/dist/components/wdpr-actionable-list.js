import { p as proxyCustomElement, H, h, d as Host } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$6 } from './p-zsBRxjtP.js';
import { d as defineCustomElement$5 } from './p-QL-JXwKm.js';
import { d as defineCustomElement$4 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$3 } from './p-YiP2RhPm.js';
import { d as defineCustomElement$2 } from './p-Cb7GjcQn.js';

const WdprActionableList$1 = /*@__PURE__*/ proxyCustomElement(class WdprActionableList extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
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
}, [257, "wdpr-actionable-list", {
        "items": [16],
        "showDivider": [4, "show-divider"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-actionable-list", "wdpr-actionable-list-item", "wdpr-divider", "wdpr-icon-library", "wdpr-text-header", "wdpr-text-link"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-actionable-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprActionableList$1);
            }
            break;
        case "wdpr-actionable-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "wdpr-divider":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-text-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-text-link":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprActionableList = WdprActionableList$1;
const defineCustomElement = defineCustomElement$1;

export { WdprActionableList, defineCustomElement };
//# sourceMappingURL=wdpr-actionable-list.js.map

//# sourceMappingURL=wdpr-actionable-list.js.map