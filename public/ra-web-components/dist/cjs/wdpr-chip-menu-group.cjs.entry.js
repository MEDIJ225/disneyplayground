'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const wdprChipMenuGroupCss = ".chip-menu-header.sc-wdpr-chip-menu-group{color:var(--theme-color-text-heading);font-size:var(--theme-typography-font-size-body-medium);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-medium);letter-spacing:var(--theme-typography-letter-spacing-default);font-family:var(--theme-font-family-default)}.chip-menu-group.sc-wdpr-chip-menu-group{display:flex;flex-direction:column;row-gap:var(--theme-spacing-100)}";

const WdprChipMenuGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    _internalId;
    header;
    componentWillLoad() {
        this._internalId = `wdpr-chip-menu-group-${utils.generateRandId()}`;
    }
    render() {
        return (index.h(index.Host, { key: '9ac8ce53e7aea2d29b7a5302fcd4bc9e6eb006d7' }, this.header && (index.h("span", { key: '6d0853cacf381a75ce17cb988637d85050c4217c', class: "chip-menu-header", id: `${this._internalId}-header` }, this.header)), index.h("div", { key: '7e1d8b8ea45b5bfcb51beb5a4ddebf497ef90241', class: "chip-menu-group", role: "group", "aria-labelledby": this.header ? `${this._internalId}-header` : undefined }, index.h("slot", { key: '608de84bfb0d09861796084ea51d2ef8d03d7289' }))));
    }
};
WdprChipMenuGroup.style = wdprChipMenuGroupCss;

exports.wdpr_chip_menu_group = WdprChipMenuGroup;
//# sourceMappingURL=wdpr-chip-menu-group.entry.cjs.js.map

//# sourceMappingURL=wdpr-chip-menu-group.cjs.entry.js.map