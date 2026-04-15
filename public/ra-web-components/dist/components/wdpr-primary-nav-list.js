import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { g as generateRandId } from './p-CXZGMLMW.js';

const WdprPrimaryNavList$1 = /*@__PURE__*/ proxyCustomElement(class WdprPrimaryNavList extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprPrimaryNavListClick = createEvent(this, "wdprPrimaryNavListClick", 7);
    }
    get el() { return this; }
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
}, [257, "wdpr-primary-nav-list", {
        "listId": [1537, "list-id"],
        "a11yLabel": [1, "a11y-label"],
        "listTitle": [1, "list-title"],
        "_internalId": [32]
    }, [[0, "keydown", "handleKeyDown"], [0, "wdprNavItemLargeClick", "handleNavItemLargeClick"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-primary-nav-list"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-primary-nav-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprPrimaryNavList$1);
            }
            break;
    } });
}

const WdprPrimaryNavList = WdprPrimaryNavList$1;
const defineCustomElement = defineCustomElement$1;

export { WdprPrimaryNavList, defineCustomElement };
//# sourceMappingURL=wdpr-primary-nav-list.js.map

//# sourceMappingURL=wdpr-primary-nav-list.js.map