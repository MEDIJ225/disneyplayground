import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';

const WdprTabPanel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
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
        return (h("div", { key: 'f6c49189bb53c3c001337d1d5568cb4adcb6ae53', id: panelIdx, role: "tabpanel", "aria-labelledby": labelledByIdx, hidden: !this.active }, h("slot", { key: '635b3fdf3b8ebda7e00677432154cfa40944555b' })));
    }
};

export { WdprTabPanel as wdpr_tab_panel };
//# sourceMappingURL=wdpr-tab-panel.entry.js.map

//# sourceMappingURL=wdpr-tab-panel.entry.js.map