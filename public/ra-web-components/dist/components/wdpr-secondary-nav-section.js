import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { g as generateRandId } from './p-CXZGMLMW.js';

const WdprSecondaryNavSection$1 = /*@__PURE__*/ proxyCustomElement(class WdprSecondaryNavSection extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprSecondaryNavSectionClick = createEvent(this, "wdprSecondaryNavSectionClick", 7);
    }
    get el() { return this; }
    _internalId;
    _hasLabelSlot = false;
    sectionId;
    a11yLabel = '';
    variant = 'quiet';
    wdprSecondaryNavSectionClick;
    componentWillLoad() {
        this._internalId = this.sectionId || `wdpr-secondary-nav-section-${generateRandId()}`;
        this._updateSlots();
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
        this.wdprSecondaryNavSectionClick.emit(event.detail);
    }
    handleNavItemSelectableChange(event) {
        const itemId = event?.detail?.itemId;
        if (!itemId)
            return;
        this.wdprSecondaryNavSectionClick.emit(itemId);
    }
    _updateSlots = () => {
        this._hasLabelSlot = !!this.el.querySelector('[slot="label"]');
    };
    get _labelClass() {
        return this.variant === 'loud'
            ? 'text-text-heading text-heading-small font-weight-heading-default leading-heading-small tracking--05 py-100 mb-200'
            : 'text-text-body text-body-medium font-weight-body-default leading-body-medium tracking-default py-100';
    }
    render() {
        return (h("section", { key: '9ab68a69f6a90a9931064f55b3addb73e2e0359c', role: "group", id: this._internalId, "aria-label": this.a11yLabel, class: "flex flex-col gap-100" }, this._hasLabelSlot && (h("div", { key: '1f5fa8ccaf284bbe9f402e4458cb1de252aecfeb', class: this._labelClass }, h("slot", { key: '25b3be76538dfbcaa2f1586c3fab648cbcee8792', name: "label", onSlotchange: this._updateSlots }))), h("div", { key: 'e498ae587005b0b65ee7d1e2d6170e33dde9e104', class: "flex flex-col gap-100" }, h("slot", { key: '71dd69b03de92304135aba02d3be3e5ed84919c8' }))));
    }
}, [257, "wdpr-secondary-nav-section", {
        "sectionId": [1537, "section-id"],
        "a11yLabel": [1, "a11y-label"],
        "variant": [1],
        "_internalId": [32],
        "_hasLabelSlot": [32]
    }, [[0, "keydown", "handleKeyDown"], [0, "wdprNavItemSmallClick", "handleNavItemSmallClick"], [0, "wdprSelectChange", "handleNavItemSelectableChange"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-secondary-nav-section"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-secondary-nav-section":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprSecondaryNavSection$1);
            }
            break;
    } });
}

const WdprSecondaryNavSection = WdprSecondaryNavSection$1;
const defineCustomElement = defineCustomElement$1;

export { WdprSecondaryNavSection, defineCustomElement };
//# sourceMappingURL=wdpr-secondary-nav-section.js.map

//# sourceMappingURL=wdpr-secondary-nav-section.js.map