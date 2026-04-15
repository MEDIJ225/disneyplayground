'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprSegment = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.segmentClick = index.createEvent(this, "segmentClick", 7);
    }
    get el() { return index.getElement(this); }
    /**
     * The label text for the segment
     */
    label;
    /**
     * Icon name to display (when variant is icon-label)
     */
    iconName;
    /**
     * Whether this segment is currently selected
     */
    selected = false;
    /**
     * Whether the segment is disabled
     */
    disabled = false;
    /**
     * Variant of the segment
     */
    variant = 'label-only';
    /**
     * Value associated with this segment
     */
    value;
    /**
     * Index of this segment in the group
     */
    index = 0;
    /**
     * Name for the radio group (all segments in same group share this)
     */
    name;
    /**
     * Unique ID for this segment
     */
    segmentId;
    /**
     * Event emitted when segment is clicked
     */
    segmentClick;
    /**
     * Focus the segment programmatically
     */
    async setFocus() {
        const button = this.el.shadowRoot?.querySelector('button');
        button?.focus();
    }
    _handleClick = () => {
        if (!this.disabled) {
            this.segmentClick.emit({
                value: this.value || this.label,
                index: this.index,
            });
        }
    };
    _getSegmentClasses() {
        const baseClasses = `
      relative flex items-center justify-center rounded-pill gap-050
      min-w-0 w-full h-[34px] py-125 px-200
      bg-surface-actionable-alt-default-alt text-text-actionable-alt-default
      transition-colors duration-200 ease-in-out
      cursor-pointer select-none
      focus:outline-none focus-visible:outline-focus
      focus-visible:outline-stroke-actionable-alt-selected
      focus-visible:outline-solid focus-visible:outline-offset-[2px]
      focus-visible:rounded-pill
      hover:text-text-actionable-alt-hover
      active:text-text-actionable-alt-pressed
      disabled:cursor-not-allowed disabled:pointer-events-none disabled:text-text-actionable-alt-disabled
    `;
        const variantClasses = this.variant === 'icon-label'
            ? 'flex-col h-[50px] py-100 px-200'
            : 'flex-row';
        const stateClasses = this.selected
            ? `bg-surface-actionable-alt-pressed text-text-actionable-inverse-default
      hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
      active:bg-surface-actionable-alt-selected active:text-text-actionable-inverse-default
      disabled:bg-surface-actionable-alt-disabled disabled:text-text-actionable-inverse-default z-10`
            : '';
        return utils.customTwMerge(baseClasses, variantClasses, stateClasses);
    }
    _getLabelClasses() {
        return utils.customTwMerge('text-label-small font-label-default leading-label-small tracking-default text-inherit truncate');
    }
    render() {
        const uniqueId = this.segmentId || `segment-${this.index}`;
        return (index.h(index.Host, { key: 'efc908e7b478e185598b97449a4d1aecf0cae242', style: { minWidth: '0' } }, index.h("button", { key: 'febbd9b615c6b18e531c613ddcd2ffd9a57bb0ff', type: "button", id: uniqueId, class: this._getSegmentClasses(), onClick: this._handleClick, disabled: this.disabled, tabIndex: this.selected ? 0 : -1, role: "radio", "aria-checked": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : undefined, "aria-label": this.label }, this.variant === 'icon-label' && this.iconName && (index.h("wdpr-icon-library", { key: 'c8d63933f6e1de0be98ac41daee0ae0fec82a068', icon: this.iconName, size: "small", decorative: true })), index.h("span", { key: 'f4a782f46e9750bd73b9392a22a306ef798cacef', class: this._getLabelClasses() }, this.label))));
    }
};

exports.wdpr_segment = WdprSegment;
//# sourceMappingURL=wdpr-segment.entry.cjs.js.map

//# sourceMappingURL=wdpr-segment.cjs.entry.js.map