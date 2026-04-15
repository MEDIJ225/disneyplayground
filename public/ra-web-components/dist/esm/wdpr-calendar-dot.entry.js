import { r as registerInstance, h } from './index-CykM8GCN.js';
import './utils-B2sDCMk6.js';
import { b as bundleCjsExports } from './bundle-cjs-CF3xLdU_.js';

const WdprCalendarDot = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    dotStyle = '';
    get _dotClasses() {
        const base = 'h-[5px] w-[5px] rounded-pill bg-surface-actionable-alt-selected';
        return bundleCjsExports.twMerge(base, this.dotStyle);
    }
    render() {
        return h("div", { key: '8b0fc3a7979c5634b6e36d59eb9cf29a376aae36', class: this._dotClasses, part: "calendar-dot", "aria-hidden": "true" });
    }
};

export { WdprCalendarDot as wdpr_calendar_dot };
//# sourceMappingURL=wdpr-calendar-dot.entry.js.map

//# sourceMappingURL=wdpr-calendar-dot.entry.js.map