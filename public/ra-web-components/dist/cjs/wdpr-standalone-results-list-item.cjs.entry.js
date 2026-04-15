'use strict';

var index = require('./index-4gPM_TYz.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');

const WdprStandaloneResultsListItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprSelect = index.createEvent(this, "wdprSelect", 7);
    }
    get el() { return index.getElement(this); }
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
        if (ev.key === keycodes_model.KEYBOARD_KEYS.SPACE || ev.key === keycodes_model.KEYBOARD_KEYS.ENTER) {
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
            return (index.h(index.Fragment, null, index.h("button", { class: buttonItemClasses, "data-selected": this.selected.toString(), disabled: this.disabled, type: "button", onClick: () => this._handleSelection() }, index.h("slot", { name: "icon" }), index.h("div", { class: "flex flex-col gap-050 items-start" }, this.label && index.h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && index.h("span", { class: "body-small text-start line-clamp-2" }, this.description))), this._showDivider && (index.h("div", { class: "mx-100", "aria-hidden": "true" }, index.h("wdpr-divider", null)))));
        }
        if (this.mode === 'multiple') {
            return (index.h(index.Fragment, null, index.h("div", { class: checkboxItemClasses, tabindex: this.disabled ? -1 : 0, "data-selected": this.selected.toString(), "aria-disabled": this.disabled.toString(), onClick: () => this._handleSelection(), onKeyDown: ev => this._handleCheckboxKeyDown(ev) }, index.h("wdpr-checkbox", { checked: this.selected, disabled: this.disabled, labelPosition: "none", customTabindex: -1, onWdprChange: this._handleMultipleCheckboxChange, onClick: this._suppressCheckboxClickBubble }), index.h("div", { class: "flex flex-col gap-050 items-start" }, this.label && index.h("span", { class: "body-large text-start line-clamp-2" }, this.label), this.description && index.h("span", { class: "body-small text-start line-clamp-2" }, this.description))), this._showDivider && (index.h("div", { class: "mx-100", "aria-hidden": "true" }, index.h("wdpr-divider", null)))));
        }
    }
    render() {
        return (index.h(index.Host, { key: '4197702437ffa06aba172441ac95aafac52ecec9', role: "listitem", "data-standalone-results-list-item": true }, this.renderVariant()));
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

exports.wdpr_standalone_results_list_item = WdprStandaloneResultsListItem;
//# sourceMappingURL=wdpr-standalone-results-list-item.entry.cjs.js.map

//# sourceMappingURL=wdpr-standalone-results-list-item.cjs.entry.js.map