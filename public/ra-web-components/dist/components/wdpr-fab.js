import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$4 } from './p-BOMKL7pd.js';
import { d as defineCustomElement$3 } from './p-oVYSbN3f.js';
import { d as defineCustomElement$2 } from './p-CiDhVxgt.js';

const WdprFab$1 = /*@__PURE__*/ proxyCustomElement(class WdprFab extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.itemClickEvent = createEvent(this, "wdprItemClick", 7);
    }
    get el() { return this; }
    open = false;
    _focusedIndex = -1;
    items = [];
    buttonLabel = 'Menu';
    buttonIcon = 'all-activities';
    backdropBlur = false;
    size = 'large';
    disabled = false;
    itemClickEvent;
    handleKeyDown(ev) {
        if (!this.open)
            return;
        if (ev.key === 'Escape') {
            this._toggleMenu();
            return;
        }
        const menuItems = Array.from(this.el.shadowRoot.querySelectorAll('wdpr-fab-menu-item'));
        const trigger = this.el.shadowRoot.querySelector('wdpr-fab-trigger');
        if (menuItems.length === 0 || !trigger)
            return;
        const allElements = [...menuItems, trigger];
        if (["ArrowUp", "ArrowDown"].includes(ev.key)) {
            ev.preventDefault();
            const delta = ev.key === "ArrowUp" ? -1 : 1;
            let nextIndex = this._focusedIndex;
            let attempts = 0;
            do {
                nextIndex = (nextIndex + delta + allElements.length) % allElements.length;
                const el = allElements[nextIndex];
                const btn = el.shadowRoot?.querySelector("button");
                const isDisabled = btn?.hasAttribute("disabled") || btn?.getAttribute("aria-disabled") === "true";
                if (!isDisabled)
                    break;
                attempts++;
            } while (attempts < allElements.length);
            this._focusedIndex = nextIndex;
            this._applyFocus(allElements[this._focusedIndex]);
        }
    }
    _applyFocus(el) {
        if (!el)
            return;
        const button = el.shadowRoot?.querySelector('button');
        button?.focus();
    }
    _toggleMenu = () => {
        this.open = !this.open;
        if (!this.open) {
            this._focusedIndex = -1;
            this.el.shadowRoot.querySelector('wdpr-fab-trigger')?.shadowRoot?.querySelector('button')?.focus();
        }
    };
    _handleItemClick = (item) => {
        this.open = false;
        this._focusedIndex = -1;
        this.itemClickEvent.emit(item);
    };
    get _menuBottomClass() {
        return this.size === 'medium' ? 'bottom-18' : 'bottom-22';
    }
    render() {
        return (h("div", { key: '517dc9ec88f06da7c43d74cec52a62045140cbe6', class: "wdpr-fab-container" }, this.open && (h("div", { key: '80a2478cbe0b350fe5462d4003898a32f56853c3' }, h("div", { key: '0da5c7ccc2f32411b6af7fdb72a46504b4d2c966', class: `fixed w-full h-full inset-0 z-40 bg-(--color-plum-800-a60) opacity-60 ${this.backdropBlur ? 'backdrop-blur' : 'backdrop-blur-none'}`, onClick: this._toggleMenu, "aria-hidden": "true" }), h("div", { key: '0511a34b2886cd9e6db09eab606cf83b7486ce48', class: `fixed ${this._menuBottomClass} right-6 z-50 flex flex-col items-end`, role: "menu", part: "menu" }, this.items.map((item, i) => (h("wdpr-fab-menu-item", { key: item.id, item: item, isLast: i === this.items.length - 1, onWdprChange: e => this._handleItemClick(e.detail) })))))), h("div", { key: '9037a93ad13509e8d8fb108c5619d46017dc2e62', class: "fixed bottom-6 right-6 z-50", part: "trigger" }, h("wdpr-fab-trigger", { key: '0acde9c629b5f8288c23eaface302ff70bde3353', open: this.open, size: this.size, label: this.buttonLabel, icon: this.buttonIcon, disabled: this.disabled, onWdprToggle: this._toggleMenu }))));
    }
}, [257, "wdpr-fab", {
        "items": [16],
        "buttonLabel": [1, "button-label"],
        "buttonIcon": [1, "button-icon"],
        "backdropBlur": [4, "backdrop-blur"],
        "size": [1],
        "disabled": [4],
        "open": [32],
        "_focusedIndex": [32]
    }, [[8, "keydown", "handleKeyDown"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-fab", "wdpr-fab-menu-item", "wdpr-fab-trigger", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-fab":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprFab$1);
            }
            break;
        case "wdpr-fab-menu-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-fab-trigger":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprFab = WdprFab$1;
const defineCustomElement = defineCustomElement$1;

export { WdprFab, defineCustomElement };
//# sourceMappingURL=wdpr-fab.js.map

//# sourceMappingURL=wdpr-fab.js.map