'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprMultiStepLoader = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    /**
     * An array of steps
     */
    steps = [];
    render() {
        return (index.h("div", { key: '7135c6a3bde279b4c24bb0a182fff1bf243b7dc8', class: "flex gap-075", role: "group", "aria-label": "Multi-step progress" }, this.steps.map(step => (index.h("wdpr-linear-loader", { class: "flex-1", progress: step.progress ?? 0, max: step.max ?? 100 })))));
    }
};

exports.wdpr_multi_step_loader = WdprMultiStepLoader;
//# sourceMappingURL=wdpr-multi-step-loader.entry.cjs.js.map

//# sourceMappingURL=wdpr-multi-step-loader.cjs.entry.js.map