'use strict';

var index = require('./index-4gPM_TYz.js');
require('./utils-CARbI7sq.js');
var bundleCjs = require('./bundle-cjs-Cajw0YnV.js');

const WdprCalendarDot = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    dotStyle = '';
    get _dotClasses() {
        const base = 'h-[5px] w-[5px] rounded-pill bg-surface-actionable-alt-selected';
        return bundleCjs.bundleCjsExports.twMerge(base, this.dotStyle);
    }
    render() {
        return index.h("div", { key: '8b0fc3a7979c5634b6e36d59eb9cf29a376aae36', class: this._dotClasses, part: "calendar-dot", "aria-hidden": "true" });
    }
};

exports.wdpr_calendar_dot = WdprCalendarDot;
//# sourceMappingURL=wdpr-calendar-dot.entry.cjs.js.map

//# sourceMappingURL=wdpr-calendar-dot.cjs.entry.js.map