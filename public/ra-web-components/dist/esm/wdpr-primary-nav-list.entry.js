import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CykM8GCN.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import { g as generateRandId } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprPrimaryNavList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprPrimaryNavListClick = createEvent(this, "wdprPrimaryNavListClick", 7);
    }
    get el() { return getElement(this); }
    _internalId;
    listId;
    a11yLabel = '';
    listTitle = '';
    wdprPrimaryNavListClick;
    componentWillLoad() {
        this._internalId = this.listId || `wdpr-primary-nav-list-${generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    handleNavItemLargeClick(event) {
        if (!event?.detail)
            return;
        this.wdprPrimaryNavListClick.emit(event.detail);
    }
    render() {
        return (h("section", { key: '885d6dcb84a0c5e76690d99e41e3839899df9fc1', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col" }, h("slot", { key: '4b0eaae91edc4d31c0d7dfd334778ae27d88c335' })));
    }
};

export { WdprPrimaryNavList as wdpr_primary_nav_list };
//# sourceMappingURL=wdpr-primary-nav-list.entry.js.map

//# sourceMappingURL=wdpr-primary-nav-list.entry.js.map