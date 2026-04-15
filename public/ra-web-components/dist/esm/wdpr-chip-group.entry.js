import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprChipGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    _observer;
    _chips = [];
    get el() { return getElement(this); }
    selectMode = 'multi';
    layout = 'wrapped';
    name;
    a11yLabel;
    internals;
    handleChipToggle(ev) {
        this._handleChipToggle(ev);
        this._syncChipsFromDom();
    }
    handleFormReset() {
        this._updateFormValue();
    }
    async refreshInternals() {
        this._updateFormValue();
    }
    componentDidLoad() {
        this._initializeObserver();
        this._syncChipsFromDom();
    }
    disconnectedCallback() {
        this._observer?.disconnect();
    }
    _syncChipsFromDom() {
        this._chips = Array.from(this.el.querySelectorAll('wdpr-chip'));
        // Assign mode prop to each chip
        this._chips.forEach(chip => {
            chip.mode = this.selectMode;
        });
        this._enforceSelectionRules();
        this._updateFormValue();
    }
    // Watch for selectMode changes and propagate to chips
    componentDidUpdate() {
        this._chips.forEach(chip => {
            chip.mode = this.selectMode;
        });
    }
    get _selectedChips() {
        return this._chips.filter(chip => chip.selected);
    }
    _initializeObserver() {
        this._observer = new MutationObserver(() => {
            this._syncChipsFromDom();
        });
        this._observer.observe(this.el, {
            childList: true,
            subtree: true,
        });
    }
    _getFormValue() {
        return (this.selectMode === 'multi') ?
            String(this._chips.map(chip => chip.selected).join(', ')) :
            String(this._selectedChips[0]);
    }
    _updateFormValue() {
        const shouldSubmit = this._chips.length > 0;
        if (!shouldSubmit) {
            this.internals?.setFormValue?.(this._getFormValue());
            return;
        }
        queueMicrotask(() => {
            if (this.internals && this.name) {
                this.internals?.setFormValue?.(this._getFormValue());
            }
        });
        this._updateValidity();
    }
    _updateValidity() {
        this.internals?.setValidity?.({});
    }
    _enforceSelectionRules() {
        if (this.selectMode === 'single') {
            this._selectedChips.slice(1).forEach(chip => chip.selected = false);
            if (this._selectedChips.length === 0 && this._chips.length > 0) {
                this._chips[0].selected = true;
            }
        }
    }
    _handleChipToggle = (ev) => {
        if (this.selectMode === 'multi')
            return;
        const toggledChip = ev.target;
        if (!ev.detail.selected && this._selectedChips.length === 1 && this._selectedChips[0] === toggledChip) {
            toggledChip.selected = true;
            return;
        }
        this._chips.forEach(chip => {
            if (chip !== toggledChip) {
                chip.selected = false;
            }
        });
    };
    get containerClass() {
        const layoutClasses = this.layout === 'horizontal-scroll' ? 'flex-nowrap w-max px-100' : 'flex-wrap';
        return customTwMerge('flex gap-100 py-300', layoutClasses);
    }
    render() {
        const groupRole = this.selectMode === 'multi' ? 'group' : 'radiogroup';
        const ariaLabelValue = this.a11yLabel || this.name || 'Chip group';
        if (this.layout === 'horizontal-scroll') {
            return (h("wdpr-scrollbar", { orientation: "horizontal", class: "w-full block" }, h("div", { part: "chip-group-container", class: this.containerClass, role: groupRole, "aria-label": ariaLabelValue }, h("slot", null))));
        }
        return (h("div", { part: "chip-group-container", class: this.containerClass, role: groupRole, "aria-label": ariaLabelValue }, h("slot", null)));
    }
    static get formAssociated() { return true; }
};

export { WdprChipGroup as wdpr_chip_group };
//# sourceMappingURL=wdpr-chip-group.entry.js.map

//# sourceMappingURL=wdpr-chip-group.entry.js.map