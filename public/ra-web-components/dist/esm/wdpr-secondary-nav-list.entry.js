import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CykM8GCN.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import { g as generateRandId } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprSecondaryNavList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprSecondaryNavListClick = createEvent(this, "wdprSecondaryNavListClick", 7);
    }
    get el() { return getElement(this); }
    _internalId;
    listId;
    a11yLabel = '';
    listTitle = '';
    wdprSecondaryNavListClick;
    componentWillLoad() {
        this._internalId = this.listId || `wdpr-secondary-nav-list-${generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleNavItemSmallClick(event) {
        if (!event?.detail)
            return;
        this.wdprSecondaryNavListClick.emit(event.detail);
    }
    handleNavItemSelectableChange(event) {
        const itemId = event?.detail?.itemId;
        if (!itemId)
            return;
        this.wdprSecondaryNavListClick.emit(itemId);
    }
    render() {
        return (h("section", { key: 'f9b340c2d5e6f48133025ddbac67fbcd377a86a2', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col gap-500" }, h("slot", { key: '554862dbf664402bda929be58f43966d9936c9e2' })));
    }
};

export { WdprSecondaryNavList as wdpr_secondary_nav_list };
//# sourceMappingURL=wdpr-secondary-nav-list.entry.js.map

//# sourceMappingURL=wdpr-secondary-nav-list.entry.js.map