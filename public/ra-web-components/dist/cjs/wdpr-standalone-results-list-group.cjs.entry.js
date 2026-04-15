'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprStandaloneResultsListGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    _internalId;
    get el() { return index.getElement(this); }
    header;
    componentWillLoad() {
        this._internalId = `wdpr-standalone-results-list-group-${utils.generateRandId()}`;
    }
    render() {
        return (index.h("div", { key: '2ce65c78eba6233aedbfd6509a4f1d479bc7512a', class: "flex flex-col gap-y-100" }, this.header && (index.h("span", { key: '254cf728dfe14f12cf10b4355a81bad8828404a7', class: "body-medium text-text-heading", id: `${this._internalId}-header` }, this.header)), index.h("ul", { key: this._internalId, class: "flex flex-col gap-y-100", "aria-labelledby": `${this.header ? `${this._internalId}-header` : ''}` }, index.h("slot", { key: 'a5dd173d14a74bee588e10d054b2238003d369c1' }))));
    }
};

exports.wdpr_standalone_results_list_group = WdprStandaloneResultsListGroup;
//# sourceMappingURL=wdpr-standalone-results-list-group.entry.cjs.js.map

//# sourceMappingURL=wdpr-standalone-results-list-group.cjs.entry.js.map