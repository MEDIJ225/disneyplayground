import { p as proxyCustomElement, H, h, d as Host } from './p-BRIGwGQo.js';
import './p-CXZGMLMW.js';
import { b as bundleCjsExports } from './p-CF3xLdU_.js';

const WdprDivider = /*@__PURE__*/ proxyCustomElement(class WdprDivider extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
    slot = null;
    orientation = 'horizontal';
    align = 'left';
    variant = 'primary';
    componentWillLoad() {
        this._updateSlot();
    }
    _updateSlot = () => {
        this.slot = this.el.querySelector('[slot="label"]');
    };
    get strokeVar() {
        return this.variant === 'secondary' ? 'var(--stroke-050)' : 'var(--stroke-012)';
    }
    get separatorClass() {
        const base = 'bg-stroke-default border-0 m-0 shrink-0';
        return this.orientation === 'horizontal' ? bundleCjsExports.twMerge(base, 'flex-1 w-auto') : bundleCjsExports.twMerge(base, 'h-full');
    }
    get separatorStyle() {
        return this.orientation === 'horizontal' ? { height: this.strokeVar } : { width: this.strokeVar };
    }
    render() {
        const isHorizontal = this.orientation === 'horizontal';
        const hasLabel = !!this.slot;
        if (!isHorizontal) {
            return (h(Host, null, h("hr", { "aria-orientation": "vertical", class: this.separatorClass, style: this.separatorStyle })));
        }
        const labelMarginClass = this.align === 'center' ? 'mx-075' : this.align === 'right' ? 'ml-075' : 'mr-075';
        return (h(Host, null, h("div", { class: "flex items-center w-full" }, this.align !== 'left' && h("hr", { class: this.separatorClass, style: this.separatorStyle }), hasLabel && (h("span", { class: bundleCjsExports.twMerge('inline-block', labelMarginClass) }, h("slot", { name: "label", onSlotchange: this._updateSlot }))), this.align !== 'right' && h("hr", { class: this.separatorClass, style: this.separatorStyle }))));
    }
}, [257, "wdpr-divider", {
        "orientation": [1],
        "align": [1],
        "variant": [1],
        "slot": [32]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-divider"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-divider":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprDivider);
            }
            break;
    } });
}

export { WdprDivider as W, defineCustomElement as d };
//# sourceMappingURL=p-QL-JXwKm.js.map

//# sourceMappingURL=p-QL-JXwKm.js.map