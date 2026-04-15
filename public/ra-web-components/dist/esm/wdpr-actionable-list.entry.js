import { r as registerInstance, a as getElement, h, H as Host } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprActionableList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
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
};

export { WdprActionableList as wdpr_actionable_list };
//# sourceMappingURL=wdpr-actionable-list.entry.js.map

//# sourceMappingURL=wdpr-actionable-list.entry.js.map