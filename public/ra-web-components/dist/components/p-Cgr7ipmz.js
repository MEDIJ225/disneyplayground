import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-BRIGwGQo.js';
import { p as propagateToSlot } from './p-CXZGMLMW.js';
import { d as defineCustomElement$1 } from './p-yYLjtNN2.js';

const WdprGuestCard = /*@__PURE__*/ proxyCustomElement(class WdprGuestCard extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprSelectedChange = createEvent(this, "wdprSelectedChange", 7);
    }
    get el() { return this; }
    isOnSurface = false;
    actionPosition = 'none';
    mediaPosition = 'leading';
    fullWidth = false;
    disabled = false;
    headingLevel = 'h3';
    a11yLabel;
    selected = false;
    wdprSelectedChange;
    componentWillLoad() {
        console.warn('The wdpr-guest-card component is deprecated and will be removed in a future major release');
    }
    componentDidLoad() {
        const slot = this.el.shadowRoot?.querySelector('slot[name="content"]');
        propagateToSlot(slot, 'headingLevel', this.headingLevel, 'wdpr-card-micro-content', 'heading-level');
    }
    _handleSelectedChange = (event) => {
        event.stopPropagation();
        this.wdprSelectedChange.emit(event.detail);
    };
    render() {
        return (h(Host, { key: 'e4c5fe47da85fb3cebc4140ec1cfbcc46686ec37' }, h("wdpr-card-micro", { key: 'e5451d3b494eebcf63bd55f78996259f8e5065bf', mediaPosition: this.mediaPosition, fullWidth: this.fullWidth, actionPosition: this.actionPosition, isOnSurface: this.isOnSurface, disabled: this.disabled, a11yLabel: this.a11yLabel, selected: this.selected, onWdprSelectedChange: this._handleSelectedChange }, h("slot", { key: '6bd2de8dbcfe05f5cec1d6c6c0208c38a707dde7', name: "media", slot: "media" }), h("slot", { key: '18c163977d5c57a384d541be21a1a01419316510', name: "content", slot: "content" }), h("slot", { key: 'bd390fa629ad3faab348eb631d3f319736ca8464', name: "link", slot: "link" }), h("slot", { key: '43670355b50982bdff5c995b02ceb16255f533bf', name: "footer", slot: "footer" }))));
    }
    static get style() { return ":host { display: block; }\n    :host([full-width]) { width: 100%; }\n    :host([disabled]) {\n      pointer-events: none;\n      opacity: 0.5;\n    }"; }
}, [257, "wdpr-guest-card", {
        "isOnSurface": [4, "is-on-surface"],
        "actionPosition": [1, "action-position"],
        "mediaPosition": [1, "media-position"],
        "fullWidth": [516, "full-width"],
        "disabled": [516],
        "headingLevel": [1, "heading-level"],
        "a11yLabel": [1, "a11y-label"],
        "selected": [4]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-guest-card", "wdpr-card-micro"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-guest-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprGuestCard);
            }
            break;
        case "wdpr-card-micro":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprGuestCard as W, defineCustomElement as d };
//# sourceMappingURL=p-Cgr7ipmz.js.map

//# sourceMappingURL=p-Cgr7ipmz.js.map