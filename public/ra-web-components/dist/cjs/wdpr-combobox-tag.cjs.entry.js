'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprComboboxTag = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    _tag;
    get el() { return index.getElement(this); }
    label = '';
    async focusTag() {
        this._tag?.focus();
    }
    get _tagClasses() {
        const baseClasses = 'inline-flex items-center justify-center px-100 rounded-050 bg-surface-status-neutral text-text-status-neutral text-component-small font-component-default leading-component-small tracking-02 whitespace-nowrap min-w-[48px] h-[22px]';
        const highlightClasses = 'focus-visible:outline focus-visible:outline-solid focus-visible:outline-025 focus-visible:outline-stroke-actionable-focused';
        return utils.customTwMerge(baseClasses, highlightClasses);
    }
    render() {
        return (index.h("span", { key: '2ac7ef5bc1b74a2802f4913fe7c5be8540d39152', class: this._tagClasses, role: "button", "aria-label": `Remove ${this.label}`, tabindex: "-1", ref: el => (this._tag = el) }, this.label));
    }
};
WdprComboboxTag.style = ":host {\n      display: inline-flex;\n    }";

exports.wdpr_combobox_tag = WdprComboboxTag;
//# sourceMappingURL=wdpr-combobox-tag.entry.cjs.js.map

//# sourceMappingURL=wdpr-combobox-tag.cjs.entry.js.map