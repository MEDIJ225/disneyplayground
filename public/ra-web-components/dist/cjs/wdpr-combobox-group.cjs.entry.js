'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const wdprComboboxGroupCss = ".hidden.sc-wdpr-combobox-group-h{display:none}.combobox-header.sc-wdpr-combobox-group{color:var(--theme-color-text-heading);font-size:var(--theme-typography-font-size-body-medium);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-medium);letter-spacing:var(--theme-typography-letter-spacing-default);font-family:var(--theme-default-font-family)}.combobox-group.sc-wdpr-combobox-group{display:flex;flex-direction:column;row-gap:var(--theme-spacing-100)}";

const WdprComboboxGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    _internalId;
    _hideGroup = false;
    header;
    async hideGroup() {
        this._hideGroup = true;
    }
    async showGroup() {
        this._hideGroup = false;
    }
    componentWillLoad() {
        this._internalId = `wdpr-combobox-group-${utils.generateRandId()}`;
    }
    render() {
        return (index.h(index.Host, { key: 'b83884c63749e528c8a74c29d8c55e20ecb3ac1e', class: `${this._hideGroup ? 'hidden' : ''}` }, this.header && (index.h("span", { key: '9ff1edd97f7e1bbd8043ebb362557b6e5c6731f5', class: "combobox-header", id: `${this._internalId}-header` }, this.header)), index.h("div", { key: '9fd39d0f95ee328170516eaf5febb0bea55a57a1', class: "combobox-group", role: "group", "aria-labelledby": this.header ? `${this._internalId}-header` : undefined }, index.h("slot", { key: '3c9c8e0475c892320f36ce5144068f555be5a03d' }))));
    }
};
WdprComboboxGroup.style = wdprComboboxGroupCss;

exports.wdpr_combobox_group = WdprComboboxGroup;
//# sourceMappingURL=wdpr-combobox-group.entry.cjs.js.map

//# sourceMappingURL=wdpr-combobox-group.cjs.entry.js.map