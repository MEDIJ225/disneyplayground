'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const wdprDropdownGroupCss = ".dropdown-header.sc-wdpr-dropdown-group{color:var(--theme-color-text-heading);font-size:var(--theme-typography-font-size-body-medium);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-medium);letter-spacing:var(--theme-typography-letter-spacing-default);font-family:var(--theme-font-family-default)}.dropdown-group.sc-wdpr-dropdown-group{display:flex;flex-direction:column;row-gap:var(--theme-spacing-100)}";

const WdprDropdownGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    _internalId;
    header;
    componentWillLoad() {
        this._internalId = `wdpr-dropdown-group-${utils.generateRandId()}`;
    }
    render() {
        return (index.h(index.Host, { key: '7011f3359871187b97f4a242897493339176314a' }, this.header && (index.h("span", { key: '3092e8c2d38bde8db3b51de8e448f80dc4713d5d', class: "dropdown-header", id: `${this._internalId}-header` }, this.header)), index.h("div", { key: 'c9db0134b510e4f3699ad5dbecefecc9a44bc433', class: "dropdown-group", role: "group", "aria-labelledby": this.header ? `${this._internalId}-header` : undefined }, index.h("slot", { key: '04f9873f5f734e7096736fd4c3a3ab22c047f4a1' }))));
    }
};
WdprDropdownGroup.style = wdprDropdownGroupCss;

exports.wdpr_dropdown_group = WdprDropdownGroup;
//# sourceMappingURL=wdpr-dropdown-group.entry.cjs.js.map

//# sourceMappingURL=wdpr-dropdown-group.cjs.entry.js.map