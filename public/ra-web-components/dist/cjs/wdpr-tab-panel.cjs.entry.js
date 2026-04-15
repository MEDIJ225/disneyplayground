'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprTabPanel = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    /**
     * The unique index of the content panel.
     */
    panelIndex;
    /**
     * if 'true', the panel is visible.
     */
    active = false;
    render() {
        const panelIdx = `tab-content-${this.panelIndex}`;
        const labelledByIdx = `tab-label-${this.panelIndex}`;
        return (index.h("div", { key: 'f6c49189bb53c3c001337d1d5568cb4adcb6ae53', id: panelIdx, role: "tabpanel", "aria-labelledby": labelledByIdx, hidden: !this.active }, index.h("slot", { key: '635b3fdf3b8ebda7e00677432154cfa40944555b' })));
    }
};

exports.wdpr_tab_panel = WdprTabPanel;
//# sourceMappingURL=wdpr-tab-panel.entry.cjs.js.map

//# sourceMappingURL=wdpr-tab-panel.cjs.entry.js.map