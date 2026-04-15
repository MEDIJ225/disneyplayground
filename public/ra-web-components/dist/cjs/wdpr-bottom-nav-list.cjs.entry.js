'use strict';

var index = require('./index-4gPM_TYz.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprBottomNavList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprBottomNavListClick = index.createEvent(this, "wdprBottomNavListClick", 7);
    }
    get el() { return index.getElement(this); }
    _internalId;
    listId;
    a11yLabel = '';
    listTitle = '';
    wdprBottomNavListClick;
    componentWillLoad() {
        this._internalId = this.listId || `wdpr-bottom-nav-list-${utils.generateRandId()}`;
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
        this.wdprBottomNavListClick.emit(event.detail);
    }
    handleNavItemSelectableChange(event) {
        const itemId = event?.detail?.itemId;
        if (!itemId)
            return;
        this.wdprBottomNavListClick.emit(itemId);
    }
    render() {
        return (index.h("section", { key: 'a87b1bd1ada803c74eda94fba1998181daa6eee7', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col gap-200" }, index.h("slot", { key: '7a3d0654db26feffffbd741412c55f40c2f3c52d' })));
    }
};

exports.wdpr_bottom_nav_list = WdprBottomNavList;
//# sourceMappingURL=wdpr-bottom-nav-list.entry.cjs.js.map

//# sourceMappingURL=wdpr-bottom-nav-list.cjs.entry.js.map