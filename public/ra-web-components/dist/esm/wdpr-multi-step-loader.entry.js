import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';

const WdprMultiStepLoader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    /**
     * An array of steps
     */
    steps = [];
    render() {
        return (h("div", { key: '7135c6a3bde279b4c24bb0a182fff1bf243b7dc8', class: "flex gap-075", role: "group", "aria-label": "Multi-step progress" }, this.steps.map(step => (h("wdpr-linear-loader", { class: "flex-1", progress: step.progress ?? 0, max: step.max ?? 100 })))));
    }
};

export { WdprMultiStepLoader as wdpr_multi_step_loader };
//# sourceMappingURL=wdpr-multi-step-loader.entry.js.map

//# sourceMappingURL=wdpr-multi-step-loader.entry.js.map