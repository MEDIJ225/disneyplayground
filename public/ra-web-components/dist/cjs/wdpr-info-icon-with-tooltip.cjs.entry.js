'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprInfoIconWithTooltip = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.infoIconClick = index.createEvent(this, "infoIconClick", 7);
        this.infoIconHover = index.createEvent(this, "infoIconHover", 7);
        this.infoIconLeave = index.createEvent(this, "infoIconLeave", 7);
    }
    /**
     * Icon name from the icon library
     */
    icon = 'info';
    /**
     * Whether the tooltip is currently open (selected state)
     */
    selected = false;
    /**
     * Whether to show the tooltip title
     */
    showTitle = true;
    /**
     * Whether to show the tooltip body/description
     */
    showDescription = true;
    /**
     * ARIA label for the trigger button
     */
    a11yLabel;
    /**
     * ID of the associated tooltip element for aria-describedby
     */
    tooltipId;
    /**
     * Optional visible label next to the icon
     */
    label;
    /**
     * Emitted when the icon is clicked
     */
    infoIconClick;
    /**
     * Emitted when the icon is hovered / focused
     */
    infoIconHover;
    /**
     * Emitted when the icon is un-hovered / blurred
     */
    infoIconLeave;
    handleClick = () => {
        this.infoIconClick.emit();
    };
    handleMouseEnter = () => {
        this.infoIconHover.emit();
    };
    handleMouseLeave = () => {
        this.infoIconLeave.emit();
    };
    handleFocus = () => {
        this.infoIconHover.emit();
    };
    handleBlur = () => {
        this.infoIconLeave.emit();
    };
    getButtonClasses() {
        const base = 'inline-flex items-center justify-center min-w-6 min-h-6 p-050 rounded-full border-0 bg-transparent cursor-pointer transition-all duration-200 ease-in-out';
        const stateClass = this.selected
            ? 'text-icon-actionable-focused'
            : 'text-icon-actionable-default';
        const hover = 'hover:text-icon-actionable-hover';
        const active = 'active:text-icon-actionable-focused';
        const focus = 'outline-none focus-visible:outline focus-visible:outline-solid focus-visible:outline-037 focus-visible:outline-offset-2 focus-visible:outline-stroke-actionable-focused';
        return utils.customTwMerge(base, stateClass, hover, active, focus);
    }
    render() {
        return (index.h("button", { key: '7a9d22413c543c8a1af1cf6fc19724c286c1bd67', class: this.getButtonClasses(), type: "button", onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onFocus: this.handleFocus, onBlur: this.handleBlur, "aria-label": !this.label ? (this.a11yLabel || 'tooltip icon') : undefined, "aria-expanded": this.selected, "aria-describedby": this.tooltipId }, this.label && (index.h("span", { key: 'faf8a2a9c0c891f83da29bd053ec6f47ecf0364d', class: utils.customTwMerge('mr-050 text-current relative top-px', 'text-component-medium font-component-default leading-heading-xsmall tracking-default') }, this.label)), index.h("wdpr-icon-library", { key: 'b35101e5d533f52f414e5703d3b45a142cca8f03', decorative: true, icon: this.icon, size: "small" })));
    }
};

exports.wdpr_info_icon_with_tooltip = WdprInfoIconWithTooltip;
//# sourceMappingURL=wdpr-info-icon-with-tooltip.entry.cjs.js.map

//# sourceMappingURL=wdpr-info-icon-with-tooltip.cjs.entry.js.map