import { h } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
export class WdprChipGroup {
    _observer;
    _chips = [];
    el;
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
        ;
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
    static get is() { return "wdpr-chip-group"; }
    static get encapsulation() { return "shadow"; }
    static get formAssociated() { return true; }
    static get properties() {
        return {
            "selectMode": {
                "type": "string",
                "attribute": "select-mode",
                "mutable": false,
                "complexType": {
                    "original": "'single' | 'multi'",
                    "resolved": "\"multi\" | \"single\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'multi'"
            },
            "layout": {
                "type": "string",
                "attribute": "layout",
                "mutable": false,
                "complexType": {
                    "original": "'wrapped' | 'horizontal-scroll'",
                    "resolved": "\"horizontal-scroll\" | \"wrapped\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'wrapped'"
            },
            "name": {
                "type": "string",
                "attribute": "name",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "a11yLabel": {
                "type": "string",
                "attribute": "a11y-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get methods() {
        return {
            "refreshInternals": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "wdprToggle",
                "method": "handleChipToggle",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "formreset",
                "method": "handleFormReset",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=wdpr-chip-group.js.map
