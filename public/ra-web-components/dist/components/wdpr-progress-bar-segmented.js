import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$2 } from './p-kQUvAu45.js';

const WdprProgressBarSegmented$1 = /*@__PURE__*/ proxyCustomElement(class WdprProgressBarSegmented extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
    steps = [];
    label = false;
    labelText;
    _getPosition(index, total) {
        if (total <= 1)
            return 'middle';
        if (index === 0)
            return 'start';
        if (index === total - 1)
            return 'end';
        return 'middle';
    }
    _getDerivedStatus(step) {
        return step.status ?? 'pending';
    }
    get _barLabel() {
        if (this.labelText?.trim())
            return this.labelText.trim();
        const total = this.steps.length;
        const activeIndex = this.steps.findIndex(s => this._getDerivedStatus(s) === 'active');
        if (activeIndex >= 0)
            return `Step ${activeIndex + 1} of ${total}`;
        const hasPending = this.steps.some(s => this._getDerivedStatus(s) === 'pending');
        if (hasPending)
            return 'Pending';
        return 'Complete';
    }
    render() {
        const totalSteps = this.steps.length;
        const ariaLabel = this.label ? this._barLabel : 'Multi-step progress';
        return (h("div", { key: 'e1539c40e3a144696b41f894b65eafabe08b9798', class: "w-full", part: "root" }, h("div", { key: 'e3a21e8a285c8abb6beee9a8a1a6eb2fd8c7544c', class: "flex items-center w-full", role: "list", "aria-label": ariaLabel, part: "segments" }, this.steps.map((step, index) => {
            const status = this._getDerivedStatus(step);
            const isCurrent = status === 'active';
            return (h("div", { class: "flex-1", part: "segment-wrap", role: "listitem", "aria-current": isCurrent ? 'step' : null }, h("wdpr-progress-segment", { status: status, position: this._getPosition(index, totalSteps), exportparts: "segment:segment" })));
        })), this.label ? (h("div", { class: "mt-050", part: "label", "aria-hidden": "true" }, h("div", { class: "label-small text-text-body" }, this._barLabel))) : null));
    }
}, [257, "wdpr-progress-bar-segmented", {
        "steps": [16],
        "label": [516],
        "labelText": [1, "label-text"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-progress-bar-segmented", "wdpr-progress-segment"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-progress-bar-segmented":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprProgressBarSegmented$1);
            }
            break;
        case "wdpr-progress-segment":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprProgressBarSegmented = WdprProgressBarSegmented$1;
const defineCustomElement = defineCustomElement$1;

export { WdprProgressBarSegmented, defineCustomElement };
//# sourceMappingURL=wdpr-progress-bar-segmented.js.map

//# sourceMappingURL=wdpr-progress-bar-segmented.js.map