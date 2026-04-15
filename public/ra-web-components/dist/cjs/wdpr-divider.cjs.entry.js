'use strict';

var index = require('./index-4gPM_TYz.js');
require('./utils-CARbI7sq.js');
var bundleCjs = require('./bundle-cjs-Cajw0YnV.js');

const WdprDivider = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
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
        return this.orientation === 'horizontal' ? bundleCjs.bundleCjsExports.twMerge(base, 'flex-1 w-auto') : bundleCjs.bundleCjsExports.twMerge(base, 'h-full');
    }
    get separatorStyle() {
        return this.orientation === 'horizontal' ? { height: this.strokeVar } : { width: this.strokeVar };
    }
    render() {
        const isHorizontal = this.orientation === 'horizontal';
        const hasLabel = !!this.slot;
        if (!isHorizontal) {
            return (index.h(index.Host, null, index.h("hr", { "aria-orientation": "vertical", class: this.separatorClass, style: this.separatorStyle })));
        }
        const labelMarginClass = this.align === 'center' ? 'mx-075' : this.align === 'right' ? 'ml-075' : 'mr-075';
        return (index.h(index.Host, null, index.h("div", { class: "flex items-center w-full" }, this.align !== 'left' && index.h("hr", { class: this.separatorClass, style: this.separatorStyle }), hasLabel && (index.h("span", { class: bundleCjs.bundleCjsExports.twMerge('inline-block', labelMarginClass) }, index.h("slot", { name: "label", onSlotchange: this._updateSlot }))), this.align !== 'right' && index.h("hr", { class: this.separatorClass, style: this.separatorStyle }))));
    }
};

exports.wdpr_divider = WdprDivider;
//# sourceMappingURL=wdpr-divider.entry.cjs.js.map

//# sourceMappingURL=wdpr-divider.cjs.entry.js.map