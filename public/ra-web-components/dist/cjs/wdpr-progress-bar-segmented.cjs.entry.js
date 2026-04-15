'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprProgressBarSegmented = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    steps = [];
    label = false;
    labelText;
    _getPosition(index, total) {
        if (total <= 1)
            return 'middle';
        if (index === 0)
            return 'start';
        if (index === total - 1)
            return 'end';
        return 'middle';
    }
    _getDerivedStatus(step) {
        return step.status ?? 'pending';
    }
    get _barLabel() {
        if (this.labelText?.trim())
            return this.labelText.trim();
        const total = this.steps.length;
        const activeIndex = this.steps.findIndex(s => this._getDerivedStatus(s) === 'active');
        if (activeIndex >= 0)
            return `Step ${activeIndex + 1} of ${total}`;
        const hasPending = this.steps.some(s => this._getDerivedStatus(s) === 'pending');
        if (hasPending)
            return 'Pending';
        return 'Complete';
    }
    render() {
        const totalSteps = this.steps.length;
        const ariaLabel = this.label ? this._barLabel : 'Multi-step progress';
        return (index.h("div", { key: 'e1539c40e3a144696b41f894b65eafabe08b9798', class: "w-full", part: "root" }, index.h("div", { key: 'e3a21e8a285c8abb6beee9a8a1a6eb2fd8c7544c', class: "flex items-center w-full", role: "list", "aria-label": ariaLabel, part: "segments" }, this.steps.map((step, index$1) => {
            const status = this._getDerivedStatus(step);
            const isCurrent = status === 'active';
            return (index.h("div", { class: "flex-1", part: "segment-wrap", role: "listitem", "aria-current": isCurrent ? 'step' : null }, index.h("wdpr-progress-segment", { status: status, position: this._getPosition(index$1, totalSteps), exportparts: "segment:segment" })));
        })), this.label ? (index.h("div", { class: "mt-050", part: "label", "aria-hidden": "true" }, index.h("div", { class: "label-small text-text-body" }, this._barLabel))) : null));
    }
};

exports.wdpr_progress_bar_segmented = WdprProgressBarSegmented;
//# sourceMappingURL=wdpr-progress-bar-segmented.entry.cjs.js.map

//# sourceMappingURL=wdpr-progress-bar-segmented.cjs.entry.js.map