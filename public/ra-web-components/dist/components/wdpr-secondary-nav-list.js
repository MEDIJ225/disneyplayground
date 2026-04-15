import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { g as generateRandId } from './p-CXZGMLMW.js';

const WdprSecondaryNavList$1 = /*@__PURE__*/ proxyCustomElement(class WdprSecondaryNavList extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprSecondaryNavListClick = createEvent(this, "wdprSecondaryNavListClick", 7);
    }
    get el() { return this; }
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
}, [257, "wdpr-secondary-nav-list", {
        "listId": [1537, "list-id"],
        "a11yLabel": [1, "a11y-label"],
        "listTitle": [1, "list-title"],
        "_internalId": [32]
    }, [[0, "keydown", "handleKeyDown"], [0, "wdprNavItemSmallClick", "handleNavItemSmallClick"], [0, "wdprSelectChange", "handleNavItemSelectableChange"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-secondary-nav-list"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-secondary-nav-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprSecondaryNavList$1);
            }
            break;
    } });
}

const WdprSecondaryNavList = WdprSecondaryNavList$1;
const defineCustomElement = defineCustomElement$1;

export { WdprSecondaryNavList, defineCustomElement };
//# sourceMappingURL=wdpr-secondary-nav-list.js.map

//# sourceMappingURL=wdpr-secondary-nav-list.js.map