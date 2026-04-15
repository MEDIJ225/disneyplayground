import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { g as generateRandId } from './p-CXZGMLMW.js';

const WdprBottomNavList$1 = /*@__PURE__*/ proxyCustomElement(class WdprBottomNavList extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprBottomNavListClick = createEvent(this, "wdprBottomNavListClick", 7);
    }
    get el() { return this; }
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
}, [257, "wdpr-bottom-nav-list", {
        "listId": [1537, "list-id"],
        "a11yLabel": [1, "a11y-label"],
        "listTitle": [1, "list-title"],
        "_internalId": [32]
    }, [[0, "keydown", "handleKeyDown"], [0, "wdprNavItemSmallClick", "handleNavItemSmallClick"], [0, "wdprSelectChange", "handleNavItemSelectableChange"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-bottom-nav-list"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-bottom-nav-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprBottomNavList$1);
            }
            break;
    } });
}

const WdprBottomNavList = WdprBottomNavList$1;
const defineCustomElement = defineCustomElement$1;

export { WdprBottomNavList, defineCustomElement };
//# sourceMappingURL=wdpr-bottom-nav-list.js.map

//# sourceMappingURL=wdpr-bottom-nav-list.js.map