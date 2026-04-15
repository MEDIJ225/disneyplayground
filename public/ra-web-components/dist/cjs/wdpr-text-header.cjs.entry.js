'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprTextHeader = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    hasLeadingIcon;
    hasSwapContent;
    /**
     * The main text to display in the header.
     * @type {string}
     */
    headerLabel;
    /**
     * The subtext to display below the main header.
     * @type {string}
     */
    subtextLabel;
    /**
     * The pre-header text to display above the main header.
     * @type {string}
     */
    preHeader;
    /**
     * The size of the header.
     * @type {TextHeaderSizes}
     */
    size = 'medium';
    componentDidLoad() {
        this.updateSlotStates();
    }
    updateSlotStates() {
        this.hasLeadingIcon = !!this.el?.querySelector('[slot="leading-icon"]');
        this.hasSwapContent = !!this.el?.querySelector('[slot="swap"]');
    }
    get mainContentClasses() {
        let gap = 'gap-y-050';
        if (this.size === 'small' || this.size === 'medium') {
            gap = 'gap-y-025';
        }
        return utils.customTwMerge(mainContentBaseClasses, gap);
    }
    get headerClasses() {
        return utils.customTwMerge(headerBaseClasses, `heading-${this.size}`);
    }
    get subtextClasses() {
        return utils.customTwMerge(this.size === 'large' ? 'body-large' : 'body-medium', subtextSharedClasses);
    }
    render() {
        return (index.h("div", { key: 'b9ccf4691ab3adfab43a4e57f1703502f09f8853', class: containerBaseClasses }, this.hasLeadingIcon && (index.h("div", { key: 'e8c75e9629d35dbc92c54e608f106c74eeb9d2a7', class: iconBaseContainerClasses }, index.h("span", { key: '2d1d198012aed1af45b58503d20dd06c076d786e', class: iconBaseClasses }, index.h("slot", { key: 'b17c4fa80fca48a2391238b51738eafcfe4cdcb4', name: "leading-icon", onSlotchange: this.updateSlotStates })))), index.h("div", { key: '4a6ddc12d19e3966e59686f6ffc3a9c63e38e29e', class: this.mainContentClasses }, this.preHeader && index.h("p", { key: 'f161810e8bdb16716b82df8d2b92e84ffb3a6341', class: preHeaderBaseClasses }, this.preHeader), index.h("div", { key: '0350eba290bd0a06b36699746a1ab2338a79ca04', class: headerRowClasses }, index.h("h2", { key: '1d68ad966f542e2e65f2b3cdc7c149c8f02064cf', class: this.headerClasses }, this.headerLabel), this.hasSwapContent && (index.h("div", { key: 'c4a416ec6d8c1172cbfad5ab2b6fa43ba418de44', class: swapBaseClasses }, index.h("slot", { key: 'dbc95b65c3b31bb9c60d74084042d58b7c0beaae', name: "swap", onSlotchange: this.updateSlotStates })))), this.subtextLabel && index.h("p", { key: '08099148cdad3811811f65bb25890377f4424a26', class: this.subtextClasses }, this.subtextLabel))));
    }
};
const containerBaseClasses = 'flex w-full gap-200 justify-end items-start';
const iconBaseContainerClasses = 'flex gap-100 items-center h-(--leading-heading-medium)';
const iconBaseClasses = 'text-text-heading size-icon-medium';
const mainContentBaseClasses = 'flex flex-col justify-center items-start flex-1 self-stretch';
const preHeaderBaseClasses = 'body-medium text-surface-status-informational row-start-1 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px] self-stretch';
const headerRowClasses = 'flex w-full gap-200 items-start';
const headerBaseClasses = 'flex-1 text-text-heading overflow-hidden overflow-ellipsis line-clamp-2';
const subtextSharedClasses = 'text-text-body overflow-hidden overflow-ellipsis line-clamp-2';
const swapBaseClasses = 'flex items-center';

exports.wdpr_text_header = WdprTextHeader;
//# sourceMappingURL=wdpr-text-header.entry.cjs.js.map

//# sourceMappingURL=wdpr-text-header.cjs.entry.js.map