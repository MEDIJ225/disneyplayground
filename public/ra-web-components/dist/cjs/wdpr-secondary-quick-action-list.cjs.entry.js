'use strict';

var index = require('./index-4gPM_TYz.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprSecondaryQuickActionList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprSecondaryQuickActionListClick = index.createEvent(this, "wdprSecondaryQuickActionListClick", 7);
    }
    get el() { return index.getElement(this); }
    _internalId;
    listId;
    a11yLabel = '';
    listTitle = '';
    wdprSecondaryQuickActionListClick;
    componentWillLoad() {
        this._internalId = this.listId || `wdpr-secondary-quick-action-list-${utils.generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == keycodes_model.KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleNavItemMediumClick(event) {
        if (!event?.detail)
            return;
        this.wdprSecondaryQuickActionListClick.emit(event.detail);
    }
    render() {
        return (index.h("section", { key: '4b4ef72184fb43ceb7aee5d7dc98b6718c1e0194', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col gap-200" }, index.h("slot", { key: 'cb66636f62d5945ef71eb30d39d4b592d69d71d2' })));
    }
};

exports.wdpr_secondary_quick_action_list = WdprSecondaryQuickActionList;
//# sourceMappingURL=wdpr-secondary-quick-action-list.entry.cjs.js.map

//# sourceMappingURL=wdpr-secondary-quick-action-list.cjs.entry.js.map