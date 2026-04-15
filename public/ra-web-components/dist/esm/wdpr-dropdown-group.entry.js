import { r as registerInstance, h, H as Host } from './index-CykM8GCN.js';
import { g as generateRandId } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const wdprDropdownGroupCss = ".dropdown-header.sc-wdpr-dropdown-group{color:var(--theme-color-text-heading);font-size:var(--theme-typography-font-size-body-medium);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-medium);letter-spacing:var(--theme-typography-letter-spacing-default);font-family:var(--theme-font-family-default)}.dropdown-group.sc-wdpr-dropdown-group{display:flex;flex-direction:column;row-gap:var(--theme-spacing-100)}";

const WdprDropdownGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    _internalId;
    header;
    componentWillLoad() {
        this._internalId = `wdpr-dropdown-group-${generateRandId()}`;
    }
    render() {
        return (h(Host, { key: '7011f3359871187b97f4a242897493339176314a' }, this.header && (h("span", { key: '3092e8c2d38bde8db3b51de8e448f80dc4713d5d', class: "dropdown-header", id: `${this._internalId}-header` }, this.header)), h("div", { key: 'c9db0134b510e4f3699ad5dbecefecc9a44bc433', class: "dropdown-group", role: "group", "aria-labelledby": this.header ? `${this._internalId}-header` : undefined }, h("slot", { key: '04f9873f5f734e7096736fd4c3a3ab22c047f4a1' }))));
    }
};
WdprDropdownGroup.style = wdprDropdownGroupCss;

export { WdprDropdownGroup as wdpr_dropdown_group };
//# sourceMappingURL=wdpr-dropdown-group.entry.js.map

//# sourceMappingURL=wdpr-dropdown-group.entry.js.map