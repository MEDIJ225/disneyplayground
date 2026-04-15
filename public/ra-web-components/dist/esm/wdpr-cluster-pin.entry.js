import { r as registerInstance, c as createEvent, h } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprClusterPin = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprClusterPinClick = createEvent(this, "wdprClusterPinClick", 7);
    }
    /**
     * The count number displayed in the pin
     */
    count = 0;
    selected = false;
    a11yLabel = '';
    disabled = false;
    wdprClusterPinClick;
    _handleClick = () => {
        if (this.disabled)
            return;
        this.selected = !this.selected;
        this.wdprClusterPinClick.emit({ selected: this.selected });
    };
    get _buttonClasses() {
        const disabledClasses = this.disabled ? 'cursor-not-allowed opacity-50' : '';
        return customTwMerge(base, this.selected ? selectedClasses : unselected, disabledClasses);
    }
    render() {
        return (h("button", { key: 'df32ae87fd977fc0942c30f339b87288a163559c', type: "button", class: this._buttonClasses, onClick: this._handleClick, disabled: this.disabled, "aria-label": this.a11yLabel || `Cluster of ${this.count} items`, "aria-pressed": this.selected.toString() }, h("span", { key: '0295606accbe4535a53e6f630680c64aec2b35a9', class: "heading-small" }, this.count)));
    }
};
const base = `
    rounded-full flex items-center justify-center transition-colors duration-200 
    group cursor-pointer focus:outline-none focus-visible:outline-solid focus-visible:outline-037 
    focus-visible:outline-offset-2 focus-visible:outline-stroke-actionable-focused elevation-xsmall`;
const unselected = `
    w-dimension-450 h-dimension-450 bg-white text-text-actionable-default
    hover:bg-surface-actionable-hover hover:text-text-inverse
    active:bg-surface-actionable-pressed active:text-text-inverse`;
const selectedClasses = `
    w-dimension-600 h-dimension-600 bg-surface-actionable-default text-text-inverse 
    hover:bg-surface-actionable-hover 
    active:bg-surface-actionable-pressed`;

export { WdprClusterPin as wdpr_cluster_pin };
//# sourceMappingURL=wdpr-cluster-pin.entry.js.map

//# sourceMappingURL=wdpr-cluster-pin.entry.js.map