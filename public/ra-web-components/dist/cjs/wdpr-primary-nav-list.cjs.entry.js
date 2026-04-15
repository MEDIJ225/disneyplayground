'use strict';

var index = require('./index-4gPM_TYz.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprPrimaryNavList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprPrimaryNavListClick = index.createEvent(this, "wdprPrimaryNavListClick", 7);
    }
    get el() { return index.getElement(this); }
    _internalId;
    listId;
    a11yLabel = '';
    listTitle = '';
    wdprPrimaryNavListClick;
    componentWillLoad() {
        this._internalId = this.listId || `wdpr-primary-nav-list-${utils.generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == keycodes_model.KEYBOARD_KEYS.ESCAPE) {
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
        return (index.h("section", { key: '885d6dcb84a0c5e76690d99e41e3839899df9fc1', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col" }, index.h("slot", { key: '4b0eaae91edc4d31c0d7dfd334778ae27d88c335' })));
    }
};

exports.wdpr_primary_nav_list = WdprPrimaryNavList;
//# sourceMappingURL=wdpr-primary-nav-list.entry.cjs.js.map

//# sourceMappingURL=wdpr-primary-nav-list.cjs.entry.js.map