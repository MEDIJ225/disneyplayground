'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprActionableList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    items = [];
    showDivider = true;
    _renderListItem(item, index$1, totalItems) {
        const shouldShowDivider = this.showDivider && index$1 < totalItems - 1;
        return (index.h("div", { key: item.id }, index.h("wdpr-actionable-list-item", { itemId: item.id, headerLabel: item.headerLabel, preHeader: item.preHeader, subtextLabel: item.subtextLabel, headerLeadingIcon: item.headerLeadingIcon, headerSize: item.headerSize, linkLeadingIcon: item.linkLeadingIcon, linkText: item.linkText, linkTrailingIcon: item.linkTrailingIcon, linkVariant: item.linkVariant, linkHref: item.linkHref, linkTarget: item.linkTarget, linkA11yLabel: item.linkA11yLabel, linkDisabled: item.linkDisabled, linkRel: item.linkRel }), shouldShowDivider && (index.h("div", { class: "my-4" }, index.h("wdpr-divider", null)))));
    }
    _renderItems() {
        const totalItems = this.items.length;
        return (index.h("div", { class: utils.customTwMerge('flex flex-col') }, this.items.map((item, index) => this._renderListItem(item, index, totalItems))));
    }
    render() {
        return (index.h(index.Host, { key: '769fa897b4f92cb2539f9f0110778eddeee4f38e' }, this._renderItems()));
    }
};

exports.wdpr_actionable_list = WdprActionableList;
//# sourceMappingURL=wdpr-actionable-list.entry.cjs.js.map

//# sourceMappingURL=wdpr-actionable-list.cjs.entry.js.map