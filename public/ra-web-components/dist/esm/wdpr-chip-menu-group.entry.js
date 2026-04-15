import { r as registerInstance, h, H as Host } from './index-CykM8GCN.js';
import { g as generateRandId } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const wdprChipMenuGroupCss = ".chip-menu-header.sc-wdpr-chip-menu-group{color:var(--theme-color-text-heading);font-size:var(--theme-typography-font-size-body-medium);font-weight:var(--theme-typography-font-weight-body-default);line-height:var(--theme-typography-line-height-body-medium);letter-spacing:var(--theme-typography-letter-spacing-default);font-family:var(--theme-font-family-default)}.chip-menu-group.sc-wdpr-chip-menu-group{display:flex;flex-direction:column;row-gap:var(--theme-spacing-100)}";

const WdprChipMenuGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    _internalId;
    header;
    componentWillLoad() {
        this._internalId = `wdpr-chip-menu-group-${generateRandId()}`;
    }
    render() {
        return (h(Host, { key: '9ac8ce53e7aea2d29b7a5302fcd4bc9e6eb006d7' }, this.header && (h("span", { key: '6d0853cacf381a75ce17cb988637d85050c4217c', class: "chip-menu-header", id: `${this._internalId}-header` }, this.header)), h("div", { key: '7e1d8b8ea45b5bfcb51beb5a4ddebf497ef90241', class: "chip-menu-group", role: "group", "aria-labelledby": this.header ? `${this._internalId}-header` : undefined }, h("slot", { key: '608de84bfb0d09861796084ea51d2ef8d03d7289' }))));
    }
};
WdprChipMenuGroup.style = wdprChipMenuGroupCss;

export { WdprChipMenuGroup as wdpr_chip_menu_group };
//# sourceMappingURL=wdpr-chip-menu-group.entry.js.map

//# sourceMappingURL=wdpr-chip-menu-group.entry.js.map