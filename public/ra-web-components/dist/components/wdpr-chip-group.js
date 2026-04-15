import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$2 } from './p-gk-6CO08.js';

const WdprChipGroup$1 = /*@__PURE__*/ proxyCustomElement(class WdprChipGroup extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.internals = this.attachInternals();
    }
    _observer;
    _chips = [];
    get el() { return this; }
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
}, [321, "wdpr-chip-group", {
        "selectMode": [1, "select-mode"],
        "layout": [1],
        "name": [1],
        "a11yLabel": [1, "a11y-label"],
        "refreshInternals": [64]
    }, [[0, "wdprToggle", "handleChipToggle"], [0, "formreset", "handleFormReset"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-chip-group", "wdpr-scrollbar"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-chip-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprChipGroup$1);
            }
            break;
        case "wdpr-scrollbar":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprChipGroup = WdprChipGroup$1;
const defineCustomElement = defineCustomElement$1;

export { WdprChipGroup, defineCustomElement };
//# sourceMappingURL=wdpr-chip-group.js.map

//# sourceMappingURL=wdpr-chip-group.js.map