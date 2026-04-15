import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { g as generateRandId } from './p-CXZGMLMW.js';

const WdprSecondaryQuickActionList$1 = /*@__PURE__*/ proxyCustomElement(class WdprSecondaryQuickActionList extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprSecondaryQuickActionListClick = createEvent(this, "wdprSecondaryQuickActionListClick", 7);
    }
    get el() { return this; }
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
}, [257, "wdpr-secondary-quick-action-list", {
        "listId": [1537, "list-id"],
        "a11yLabel": [1, "a11y-label"],
        "listTitle": [1, "list-title"],
        "_internalId": [32]
    }, [[0, "keydown", "handleKeyDown"], [0, "wdprNavItemMediumClick", "handleNavItemMediumClick"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-secondary-quick-action-list"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-secondary-quick-action-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprSecondaryQuickActionList$1);
            }
            break;
    } });
}

const WdprSecondaryQuickActionList = WdprSecondaryQuickActionList$1;
const defineCustomElement = defineCustomElement$1;

export { WdprSecondaryQuickActionList, defineCustomElement };
//# sourceMappingURL=wdpr-secondary-quick-action-list.js.map

//# sourceMappingURL=wdpr-secondary-quick-action-list.js.map