import { r as registerInstance, a as getElement, h, H as Host } from './index-CykM8GCN.js';
import './utils-B2sDCMk6.js';
import { b as bundleCjsExports } from './bundle-cjs-CF3xLdU_.js';

const WdprDivider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
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
};

export { WdprDivider as wdpr_divider };
//# sourceMappingURL=wdpr-divider.entry.js.map

//# sourceMappingURL=wdpr-divider.entry.js.map