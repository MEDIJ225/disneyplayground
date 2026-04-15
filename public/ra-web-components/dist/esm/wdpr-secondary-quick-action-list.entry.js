import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CykM8GCN.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import { g as generateRandId } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprSecondaryQuickActionList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprSecondaryQuickActionListClick = createEvent(this, "wdprSecondaryQuickActionListClick", 7);
    }
    get el() { return getElement(this); }
    _internalId;
    listId;
    a11yLabel = '';
    listTitle = '';
    wdprSecondaryQuickActionListClick;
    componentWillLoad() {
        this._internalId = this.listId || `wdpr-secondary-quick-action-list-${generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
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
        return (h("section", { key: '4b4ef72184fb43ceb7aee5d7dc98b6718c1e0194', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col gap-200" }, h("slot", { key: 'cb66636f62d5945ef71eb30d39d4b592d69d71d2' })));
    }
};

export { WdprSecondaryQuickActionList as wdpr_secondary_quick_action_list };
//# sourceMappingURL=wdpr-secondary-quick-action-list.entry.js.map

//# sourceMappingURL=wdpr-secondary-quick-action-list.entry.js.map