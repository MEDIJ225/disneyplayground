import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';
import { g as generateRandId } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprStandaloneResultsListGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    _internalId;
    get el() { return getElement(this); }
    header;
    componentWillLoad() {
        this._internalId = `wdpr-standalone-results-list-group-${generateRandId()}`;
    }
    render() {
        return (h("div", { key: '2ce65c78eba6233aedbfd6509a4f1d479bc7512a', class: "flex flex-col gap-y-100" }, this.header && (h("span", { key: '254cf728dfe14f12cf10b4355a81bad8828404a7', class: "body-medium text-text-heading", id: `${this._internalId}-header` }, this.header)), h("ul", { key: this._internalId, class: "flex flex-col gap-y-100", "aria-labelledby": `${this.header ? `${this._internalId}-header` : ''}` }, h("slot", { key: 'a5dd173d14a74bee588e10d054b2238003d369c1' }))));
    }
};

export { WdprStandaloneResultsListGroup as wdpr_standalone_results_list_group };
//# sourceMappingURL=wdpr-standalone-results-list-group.entry.js.map

//# sourceMappingURL=wdpr-standalone-results-list-group.entry.js.map