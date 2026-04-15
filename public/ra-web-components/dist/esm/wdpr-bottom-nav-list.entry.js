import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CykM8GCN.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import { g as generateRandId } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprBottomNavList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprBottomNavListClick = createEvent(this, "wdprBottomNavListClick", 7);
    }
    get el() { return getElement(this); }
    _internalId;
    listId;
    a11yLabel = '';
    listTitle = '';
    wdprBottomNavListClick;
    componentWillLoad() {
        this._internalId = this.listId || `wdpr-bottom-nav-list-${generateRandId()}`;
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
        this.wdprBottomNavListClick.emit(event.detail);
    }
    handleNavItemSelectableChange(event) {
        const itemId = event?.detail?.itemId;
        if (!itemId)
            return;
        this.wdprBottomNavListClick.emit(itemId);
    }
    render() {
        return (h("section", { key: 'a87b1bd1ada803c74eda94fba1998181daa6eee7', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col gap-200" }, h("slot", { key: '7a3d0654db26feffffbd741412c55f40c2f3c52d' })));
    }
};

export { WdprBottomNavList as wdpr_bottom_nav_list };
//# sourceMappingURL=wdpr-bottom-nav-list.entry.js.map

//# sourceMappingURL=wdpr-bottom-nav-list.entry.js.map