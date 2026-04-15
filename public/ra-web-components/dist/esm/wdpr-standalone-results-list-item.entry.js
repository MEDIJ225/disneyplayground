import { r as registerInstance, c as createEvent, a as getElement, h, F as Fragment, H as Host } from './index-CykM8GCN.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';

const WdprStandaloneResultsListItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprSelect = createEvent(this, "wdprSelect", 7);
    }
    get el() { return getElement(this); }
    _showDivider = true;
    value;
    label;
    description;
    disabled = false;
    selected = false;
    mode = 'single';
    wdprSelect;
    async hideDivider() {
        this._showDivider = false;
    }
    _handleCheckboxKeyDown(ev) {
        if (ev.key === KEYBOARD_KEYS.SPACE || ev.key === KEYBOARD_KEYS.ENTER) {
            this._handleSelection();
        }
    }
    _handleSelection() {
        if (this.disabled)
            return;
        this.wdprSelect.emit({ value: this.value, selected: !this.selected });
    }
    _handleMultipleCheckboxChange = (event) => {
        event.stopPropagation();
        if (this.disabled)
            return;
        this.wdprSelect.emit({ value: this.value, selected: event.detail.checked });
    };
    _suppressCheckboxClickBubble = (event) => {
        event.stopPropagation();
    };
    renderVariant() {
        if (this.mode === 'single') {
            return (h(Fragment, null, h("button", { class: buttonItemClasses, "data-selected": this.selected.toString(), disabled: this.disabled, type: "button", onClick: () => this._handleSelection() }, h("slot", { name: "icon" }), h("div", { class: "flex flex-col gap-050 items-start" }, this.label && h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && h("span", { class: "body-small text-start line-clamp-2" }, this.description))), this._showDivider && (h("div", { class: "mx-100", "aria-hidden": "true" }, h("wdpr-divider", null)))));
        }
        if (this.mode === 'multiple') {
            return (h(Fragment, null, h("div", { class: checkboxItemClasses, tabindex: this.disabled ? -1 : 0, "data-selected": this.selected.toString(), "aria-disabled": this.disabled.toString(), onClick: () => this._handleSelection(), onKeyDown: ev => this._handleCheckboxKeyDown(ev) }, h("wdpr-checkbox", { checked: this.selected, disabled: this.disabled, labelPosition: "none", customTabindex: -1, onWdprChange: this._handleMultipleCheckboxChange, onClick: this._suppressCheckboxClickBubble }), h("div", { class: "flex flex-col gap-050 items-start" }, this.label && h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && h("span", { class: "body-small text-start line-clamp-2" }, this.description))), this._showDivider && (h("div", { class: "mx-100", "aria-hidden": "true" }, h("wdpr-divider", null)))));
        }
    }
    render() {
        return (h(Host, { key: '4197702437ffa06aba172441ac95aafac52ecec9', role: "listitem", "data-standalone-results-list-item": true }, this.renderVariant()));
    }
};
const checkboxItemClasses = `checkbox flex items-start gap-100 p-100 w-full rounded-100 cursor-pointer text-text-actionable-alt-default transition-colors
focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused focus-visible:outline-solid focus-visible:outline-offset-1
data-[selected=true]:bg-surface-actionable-alt-selected data-[selected=true]:text-text-actionable-inverse-default
data-[selected=true]:hover:bg-surface-actionable-alt-hover
aria-[disabled=false]:hover:bg-surface-actionable-alt-hover aria-[disabled=false]:hover:text-text-actionable-inverse-default
aria-[disabled=false]:active:bg-surface-actionable-alt-pressed aria-[disabled=false]:active:text-text-actionable-inverse-default
disabled:text-text-actionable-alt-disable aria-disabled:text-text-actionable-alt-disabled aria-disabled:cursor-not-allowed`;
const buttonItemClasses = `flex items-start gap-100 p-100 w-full rounded-100 cursor-pointer text-text-actionable-alt-default transition-colors
focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused focus-visible:outline-solid focus-visible:outline-offset-1
hover:enabled:bg-surface-actionable-alt-hover hover:enabled:text-text-actionable-inverse-default
active:enabled:bg-surface-actionable-alt-pressed active:enabled:text-text-actionable-inverse-default
disabled:text-text-actionable-alt-disabled disabled:cursor-not-allowed

data-[selected=true]:bg-surface-actionable-alt-selected data-[selected=true]:text-text-actionable-inverse-default
data-[selected=true]:active:bg-surface-actionable-alt-selected data-[selected=true]:hover:bg-surface-actionable-alt-hover`;

export { WdprStandaloneResultsListItem as wdpr_standalone_results_list_item };
//# sourceMappingURL=wdpr-standalone-results-list-item.entry.js.map

//# sourceMappingURL=wdpr-standalone-results-list-item.entry.js.map