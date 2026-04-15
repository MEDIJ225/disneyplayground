'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprProgressIndicator = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    progress = 0;
    max = 100;
    active = true;
    get _percentage() {
        if (!Number.isFinite(this.max) || this.max <= 0)
            return 0;
        if (this.progress >= this.max)
            return 100;
        if (this.progress <= 0)
            return 0;
        return (this.progress / this.max) * 100;
    }
    get _fillBgClass() {
        return this.active ? 'bg-surface-neutral-extra-dark' : this._trackBg;
    }
    get _roundingClass() {
        return 'rounded-pill';
    }
    get _trackBg() {
        return 'bg-surface-neutral-light';
    }
    render() {
        return (index.h(index.Host, { key: '1033264d23143a918a4a0bb9061a82ba30e3a07d' }, index.h("div", { key: '398a3c19afd517e1c84eb07e0691964995c8832d', class: "w-full", part: "root" }, index.h("div", { key: '94d23689ad71104d5ad8f31aaaab6b5abe9f5b74', class: `relative h-075 overflow-hidden ${this._trackBg} ${this._roundingClass}`, part: "track" }, index.h("div", { key: '1aff55782ecc2a3db6fb5914efdc2dda2fac5e50', class: `h-full ${this._fillBgClass} ${this._roundingClass}`, style: { width: `${this._percentage}%` }, part: "indicator", "aria-hidden": "true" }), this._percentage < 100 && (index.h("div", { key: 'e77d1233e31eef58016cdebd08dd95ba4f013f4a', class: "absolute top-[1px] right-[1px] w-dimension-050 h-dimension-050 shrink-0 bg-surface-neutral-extra-dark rounded-pill", part: "stop-indicator" }))))));
    }
};

exports.wdpr_progress_indicator = WdprProgressIndicator;
//# sourceMappingURL=wdpr-progress-indicator.entry.cjs.js.map

//# sourceMappingURL=wdpr-progress-indicator.cjs.entry.js.map