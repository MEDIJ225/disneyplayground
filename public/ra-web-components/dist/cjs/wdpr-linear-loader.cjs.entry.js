'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprLinearLoader = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    /**
     * Progress of the bar
     */
    progress = 0;
    /**
     * Maximum progress of the bar
     * @type {HTMLWdprLinearLoaderElement}
     */
    max = 100;
    get percentage() {
        if (this.progress >= this.max)
            return 100;
        if (this.progress <= 0)
            return 0;
        return (this.progress / this.max) * 100;
    }
    render() {
        return (index.h("div", { key: '745aba8d130f768e921697c9653eaea3fadc2742', class: "flex flex-col gap-050 w-full", role: "progressbar", "aria-valuenow": this.progress, "aria-valuemin": 0, "aria-valuemax": this.max, "aria-label": `Loading progress: ${this.progress} out of ${this.max}` }, index.h("div", { key: '00e77359c76e333472b58ba85e779bec084f91f3', class: "w-full bg-black rounded-pill h-100 overflow-hidden" }, index.h("div", { key: 'd8fd6b746f965e3f46bba4c7195ffce030ae20de', class: "bg-white h-full transition-all duration-500 ease-in-out", style: { width: `${this.percentage}%` } }))));
    }
};

exports.wdpr_linear_loader = WdprLinearLoader;
//# sourceMappingURL=wdpr-linear-loader.entry.cjs.js.map

//# sourceMappingURL=wdpr-linear-loader.cjs.entry.js.map