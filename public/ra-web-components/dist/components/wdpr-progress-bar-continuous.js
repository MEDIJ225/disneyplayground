import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$2 } from './p-Bv2Pnyso.js';

const WdprProgressBarContinuous$1 = /*@__PURE__*/ proxyCustomElement(class WdprProgressBarContinuous extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
    /**
     * When false, renders an indeterminate progress bar.
     * Indeterminate MUST NOT set aria-valuenow/min/max.
     */
    determinate = true;
    progress = 0;
    max = 100;
    a11yLabel;
    a11yLabelledBy;
    get _safeMax() {
        return Number.isFinite(this.max) && this.max > 0 ? this.max : 100;
    }
    get _safeNow() {
        const now = Number.isFinite(this.progress) ? this.progress : 0;
        return Math.min(Math.max(now, 0), this._safeMax);
    }
    get _ariaNameAttrs() {
        const labelledBy = this.a11yLabelledBy?.trim();
        if (labelledBy)
            return { 'aria-labelledby': labelledBy };
        const label = this.a11yLabel?.trim();
        if (label)
            return { 'aria-label': label };
        // Fallback to avoid an unnamed progressbar.
        return { 'aria-label': 'Progress' };
    }
    get _ariaValueAttrs() {
        if (!this.determinate)
            return {};
        return {
            'aria-valuenow': String(this._safeNow),
            'aria-valuemin': '0',
            'aria-valuemax': String(this._safeMax),
        };
    }
    render() {
        return (h("div", { key: '1ebce0a80ee86fafb1db8a92fe0e7e4771f67fad', class: "flex flex-col gap-050 w-full", role: "progressbar", ...this._ariaNameAttrs, ...this._ariaValueAttrs, part: "root" }, h("div", { key: 'e6999f142261df14516df86505f7ad3c2700101e', class: "w-full bg-surface-neutral-light rounded-pill h-075 overflow-hidden", part: "track" }, h("wdpr-progress-indicator", { key: 'ffa7f77808dc9a6e7e19a3ed6378752120016053', progress: this._safeNow, max: this._safeMax, active: true }))));
    }
}, [257, "wdpr-progress-bar-continuous", {
        "determinate": [516],
        "progress": [514],
        "max": [514],
        "a11yLabel": [1, "a11y-label"],
        "a11yLabelledBy": [1, "aria-labelledby"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-progress-bar-continuous", "wdpr-progress-indicator"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-progress-bar-continuous":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprProgressBarContinuous$1);
            }
            break;
        case "wdpr-progress-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprProgressBarContinuous = WdprProgressBarContinuous$1;
const defineCustomElement = defineCustomElement$1;

export { WdprProgressBarContinuous, defineCustomElement };
//# sourceMappingURL=wdpr-progress-bar-continuous.js.map

//# sourceMappingURL=wdpr-progress-bar-continuous.js.map