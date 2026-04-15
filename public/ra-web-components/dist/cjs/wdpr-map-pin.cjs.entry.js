'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const SelectedPinSvg = () => (index.h("svg", { width: "56", height: "60", viewBox: "0 0 56 60", class: "absolute inset-0 transition-colors duration-200", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg" },
    index.h("g", { filter: "url(#filter0_f_88956_309)" },
        index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M31.4328 55.9999C31.4328 55.9999 6.19234 50.0931 4.13762 46.3501C2.0829 42.607 23.6441 41.651 28.2257 48.8255C32.8074 55.9999 31.4328 55.9999 31.4328 55.9999Z", fill: "#445582", "fill-opacity": "0.3" })),
    index.h("path", { d: "M55.7477 23.6761C55.7492 23.5676 55.75 23.4589 55.75 23.35C55.75 10.4542 45.0048 0 31.75 0C18.4952 0 7.75 10.4542 7.75 23.35C7.75 23.4589 7.75077 23.5676 7.75229 23.6761C7.75077 23.7484 7.75 23.8209 7.75 23.8937C7.75 42.1359 31.75 56 31.75 56C31.75 56 55.75 42.1359 55.75 23.8937C55.75 23.8209 55.7492 23.7484 55.7477 23.6761Z", fill: "currentColor" }),
    index.h("defs", null,
        index.h("filter", { id: "filter0_f_88956_309", x: "0", y: "39.4736", width: "35.626", height: "20.5264", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" },
            index.h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }),
            index.h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }),
            index.h("feGaussianBlur", { stdDeviation: "2", result: "effect1_foregroundBlur_88956_309" })))));
const UnselectedPinSvg = () => (index.h("svg", { width: "43", height: "48", class: "absolute inset-0 transition-colors duration-200", viewBox: "0 0 43 48", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg" },
    index.h("g", { filter: "url(#filter0_f_88936_19)" },
        index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M24.5746 44.0001C24.5746 44.0001 5.64426 39.359 4.10322 36.418C2.56218 33.4771 18.7331 32.7259 22.1693 38.363C25.6055 44.0001 24.5746 44.0001 24.5746 44.0001Z", fill: "#445582", "fill-opacity": "0.3" })),
    index.h("path", { d: "M42.8108 18.6026C42.8119 18.5174 42.8125 18.432 42.8125 18.3464C42.8125 8.21399 34.7536 0 24.8125 0C14.8714 0 6.8125 8.21399 6.8125 18.3464C6.8125 18.432 6.81308 18.5174 6.81422 18.6026C6.81308 18.6594 6.8125 18.7164 6.8125 18.7737C6.8125 33.1068 24.8125 44 24.8125 44C24.8125 44 42.8125 33.1068 42.8125 18.7737C42.8125 18.7164 42.8119 18.6594 42.8108 18.6026Z", fill: "currentColor" }),
    index.h("defs", null,
        index.h("filter", { id: "filter0_f_88936_19", x: "0", y: "30.158", width: "28.7195", height: "17.842", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" },
            index.h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }),
            index.h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }),
            index.h("feGaussianBlur", { stdDeviation: "2", result: "effect1_foregroundBlur_88936_19" })))));

const WdprMapPin = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.mapPinClick = index.createEvent(this, "wdprMapPinClick", 7);
    }
    get el() { return index.getElement(this); }
    styleVariant = 'icon';
    label = 'trailing';
    selected = false;
    iconName;
    labelText = '';
    disabled = false;
    layout = 'none';
    a11yLabel = '';
    mapPinClick;
    /**
     * Icon name to display when style is 'icon' and state is 'selected'
     * If not provided, falls back to iconName
     */
    selectedIconName;
    /**
     * Time in minutes to display when style is 'time'
     * Only used when style='time'
     */
    time;
    /**
     * Get background color classes for the pin SVG
     */
    get _pinBackgroundColorClasses() {
        if (this.selected) {
            return 'text-surface-actionable-default group-hover:!text-surface-actionable-hover group-active:!text-surface-actionable-pressed';
        }
        return 'text-text-inverse group-hover:text-text-inverse group-active:text-text-inverse';
    }
    /**
     * Get color classes based on current state
     */
    get _iconColorClasses() {
        if (this.selected) {
            return 'heading-small text-text-inverse';
        }
        return 'component-medium text-text-actionable-default group-hover:!text-text-actionable-hover group-active:!text-text-actionable-pressed pl-[14px] pr-[10px]';
    }
    _renderIconContent() {
        const iconToUse = this.selected && this.selectedIconName ? this.selectedIconName : this.iconName;
        const position = this.selected ? 'ml-[21px] mb-[24px] mt-[5px]' : '';
        if (!iconToUse)
            return null;
        return (index.h("wdpr-icon-library", { icon: iconToUse, size: this.selected ? 'small' : 'medium', decorative: true, class: `transition-colors relative z-10 ${position} ${this._iconColorClasses}` }));
    }
    _renderTimeContent() {
        if (this.time === undefined)
            return null;
        const minSize = this.selected ? 'component-medium' : 'component-xxsmall';
        const position = this.selected ? (this.layout === 'inline' ? 'ml-[10px] mb-[12px] mt-[5px]' : 'ml-[21px] mb-[12px] mt-[5px]') : 'mt-[3px]';
        return (index.h("span", { class: `transition-colors relative z-10 ${position} ${this._iconColorClasses} ${!this.selected ? 'font-normal' : ''}` }, this.time, index.h("span", { class: `${minSize} block font-normal ${this.selected ? '-mt-100' : '-mt-075'}` }, "min")));
    }
    /**
     * Render the pin content (icon or time)
     */
    _renderPinContent() {
        if (this.styleVariant === 'icon') {
            return this._renderIconContent();
        }
        if (this.styleVariant === 'time') {
            return this._renderTimeContent();
        }
        return null;
    }
    _handleClick = () => {
        if (this.disabled)
            return;
        this.selected = !this.selected;
        this.mapPinClick.emit({ selected: this.selected });
    };
    /**
     * Get container classes for flex layout based on label position and layout
     */
    get _containerClasses() {
        const isStacked = this.layout === 'stacked' || (this.layout === 'none' && this.selected);
        const flexDirection = isStacked ? 'flex-col gap-050' : 'flex-row gap-100';
        const disabledClasses = this.disabled ? 'cursor-not-allowed opacity-50' : '';
        return utils.customTwMerge(containerBaseClasses, flexDirection, disabledClasses);
    }
    _getBackgroundSVG() {
        return this.selected ? index.h(SelectedPinSvg, null) : index.h(UnselectedPinSvg, null);
    }
    get _backgroundPinClasses() {
        return utils.customTwMerge('relative flex items-start justify-center', this.styleVariant !== 'time' ? 'pt-100' : '', (this.layout === 'stacked' || this.layout === 'none') && this.selected ? 'pr-200' : '', this.selected ? 'w-dimension-700 h-dimension-750' : 'w-[43px] h-dimension-600 pb-150', this._pinBackgroundColorClasses);
    }
    render() {
        return (index.h("button", { key: '1892a0de47023083666aa46a0183e523b3ff5da6', class: this._containerClasses, onClick: this._handleClick, disabled: this.disabled, type: "button", "aria-label": this.a11yLabel || undefined, "aria-pressed": this.selected.toString() }, this.labelText && this.label === 'leading' && index.h("span", { key: '39e4fda5c810b591040b74d9d65bfea9dfb7cb08', class: labelBaseClasses }, this.labelText), index.h("div", { key: '3575a59a9d7af3a746f271c2bcbd8dd7a8a5fc54', class: this._backgroundPinClasses, role: "presentation" }, this._getBackgroundSVG(), this._renderPinContent()), this.labelText && this.label === 'trailing' && index.h("span", { key: '9cc8c588ceb64d95258da206ad53f3548c58ab49', class: labelBaseClasses }, this.labelText)));
    }
};
const containerBaseClasses = `flex items-center cursor-pointer transition-colors group focus:outline-none focus-visible:outline-solid
  focus-visible:outline-037 focus-visible:outline-offset-2 focus-visible:outline-stroke-actionable-focused
  focus-visible:rounded-050`;
const labelBaseClasses = `transition-colors duration-200 label-medium !text-text-inverse text-stroke-shadow group-hover:!text-text-actionable-hover
  group-hover:text-stroke-shadow-active group-active:!text-text-actionable-pressed group-active:text-stroke-shadow-active`;

exports.wdpr_map_pin = WdprMapPin;
//# sourceMappingURL=wdpr-map-pin.entry.cjs.js.map

//# sourceMappingURL=wdpr-map-pin.cjs.entry.js.map