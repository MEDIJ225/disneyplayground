'use strict';

var index = require('./index-4gPM_TYz.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprSecondaryNavList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprSecondaryNavListClick = index.createEvent(this, "wdprSecondaryNavListClick", 7);
    }
    get el() { return index.getElement(this); }
    _internalId;
    listId;
    a11yLabel = '';
    listTitle = '';
    wdprSecondaryNavListClick;
    componentWillLoad() {
        this._internalId = this.listId || `wdpr-secondary-nav-list-${utils.generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == keycodes_model.KEYBOARD_KEYS.ESCAPE) {
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
        return (index.h("section", { key: 'f9b340c2d5e6f48133025ddbac67fbcd377a86a2', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col gap-500" }, index.h("slot", { key: '554862dbf664402bda929be58f43966d9936c9e2' })));
    }
};

exports.wdpr_secondary_nav_list = WdprSecondaryNavList;
//# sourceMappingURL=wdpr-secondary-nav-list.entry.cjs.js.map

//# sourceMappingURL=wdpr-secondary-nav-list.cjs.entry.js.map