import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { c as customTwMerge, p as propagateToSlot } from './p-CXZGMLMW.js';
import { d as defineCustomElement$1 } from './p-QL-JXwKm.js';

const WdprButtonDock = /*@__PURE__*/ proxyCustomElement(class WdprButtonDock extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.disabledChanged = createEvent(this, "disabledChanged", 7);
    }
    get el() { return this; }
    /**
     * @internal
     * State to detect content in slot total
     */
    hasTotal = false;
    /** The label that will be displayed
     * @type {string}
     */
    label;
    /** The sublabel that will be displayed
     * @type {string}
     */
    subLabel;
    /** The centered label that will be displayed
     * @type {string}
     */
    centeredLabel;
    /** Accessible name for the region container
     * @default 'Actions'
     * @type {string}
     */
    a11yLabel = 'Actions';
    showDivider = true;
    /**
     * Visually dim + sets aria-disabled on the container
     * @default false
     * @type {boolean}
     */
    disabled = false;
    handleDisabledChange(next) {
        this.disabledChanged.emit(next);
        // Propagate to slotted content
        this.syncButtonBarSlot();
    }
    /** Event emitted when disabled changes
     * @event
     * @type {boolean}
     */
    disabledChanged;
    componentDidLoad() {
        this.syncButtonBarSlot();
    }
    get headerAndTotalRowWrapperClasses() {
        const hasHeader = !!this.label || !!this.subLabel;
        // Bitmask:
        // 1 (01) → hasHeader
        // 2 (10) → hasTotal
        const mask = (hasHeader ? 1 : 0) | (this.hasTotal ? 2 : 0);
        const justifyClass = {
            0: 'hidden', // 00 → neither header nor total
            1: 'justify-start', // 01 → only header
            2: 'justify-end', // 10 → only total
            3: 'justify-between', // 11 → both header and total
        };
        return customTwMerge(headerAndTotalRowWrapperBaseClasses, justifyClass[mask]);
    }
    syncButtonBarSlot() {
        const slotEl = this.el.shadowRoot?.querySelector(`slot[name="button-bar"]`);
        // Propagate "disabled" to assigned elements, falling back to aria-disabled
        propagateToSlot(slotEl, 'disabled', this.disabled, 'wdpr-button-bar');
    }
    onTotalSlotChange = () => {
        const sr = this.el.shadowRoot;
        const total = sr.querySelector('slot[name="total"]');
        this.hasTotal = !!total?.assignedNodes({ flatten: true }).length;
    };
    onButtonBarSlotChange = () => {
        const buttonBar = this.el.shadowRoot?.querySelector('slot[name="button-bar"]');
        propagateToSlot(buttonBar, 'disabled', this.disabled, 'wdpr-button-bar');
    };
    renderHeaderAndTotalRow() {
        return (h("div", { class: this.headerAndTotalRowWrapperClasses }, h("div", { class: "flex flex-col items-start gap-025" }, h("h2", { class: "heading-small text-text-heading" }, this.label), h("p", { class: "body-small text-text-disclaimer" }, this.subLabel)), h("slot", { name: "total", onSlotchange: this.onTotalSlotChange })));
    }
    render() {
        return (h("div", { key: '886741fc9abd2ccf5ec91c4eb6802d19c7cb934a', class: "w-full" }, this.showDivider && h("wdpr-divider", { key: 'a169efd1a480ee0e42f822de710061da97e12214', part: "divider" }), h("section", { key: 'c0d608e00aa2516a4cddd8f205318a7f75674035', role: "region", "aria-label": this.a11yLabel, "aria-disabled": this.disabled ? 'true' : 'false', class: containerClasses }, this.renderHeaderAndTotalRow(), this.centeredLabel && (h("div", { key: '0e397a5fa95f21f0eabcf1ffe5ee30c8dcc89d44', class: "pr-200 pl-200 w-full flex justify-center" }, h("p", { key: 'ac95bd07e3b3fe932d6d69a9e6ed11e934bf5cdc', class: "heading-xsmall" }, this.centeredLabel))), h("section", { key: 'af5eee52347790ecc735713e28cf479c32502e90', class: buttonBarFrameClasses, part: "button-bar-frame" }, h("slot", { key: '176fbf8adbdd5329fcc2a7a576c6444aabedea6c', name: "button-bar", onSlotchange: this.onButtonBarSlotChange })))));
    }
    static get watchers() { return {
        "disabled": ["handleDisabledChange"]
    }; }
}, [257, "wdpr-button-dock", {
        "label": [513],
        "subLabel": [513, "sub-label"],
        "centeredLabel": [513, "centered-label"],
        "a11yLabel": [1, "a11y-label"],
        "showDivider": [516, "show-divider"],
        "disabled": [516],
        "hasTotal": [32]
    }, undefined, {
        "disabled": ["handleDisabledChange"]
    }]);
const containerClasses = 'flex flex-col items-center gap-200 bg-surface-default w-full p-300';
const headerAndTotalRowWrapperBaseClasses = 'flex items-center self-stretch';
const buttonBarFrameClasses = 'w-full items-center self-stretch gap-200';
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-button-dock", "wdpr-divider"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-button-dock":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprButtonDock);
            }
            break;
        case "wdpr-divider":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprButtonDock as W, defineCustomElement as d };
//# sourceMappingURL=p-DajZYVhg.js.map

//# sourceMappingURL=p-DajZYVhg.js.map