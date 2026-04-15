'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprNavSectionHeader = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    /**
     * The visual style used for section headings.
     */
    variant = 'quiet';
    /**
     * Optional fallback label when no slotted content is provided.
     */
    label = '';
    get _containerClass() {
        const quietClass = 'text-text-body font-weight-body-default leading-body-medium tracking-default';
        const loudClass = 'text-text-heading font-[var(--font-weight-heading-alt)] leading-heading-medium text-[20px] tracking--05';
        return utils.customTwMerge('px-075 py-100', this.variant === 'loud' ? loudClass : quietClass);
    }
    render() {
        return (index.h("div", { key: 'cfc77dee9d1edf8f62239aa771c246983639898f', class: this._containerClass }, index.h("slot", { key: 'a3ff3746c1b26f7d8014ba90f809c1fdea4929f3' }, this.label)));
    }
};

exports.wdpr_nav_section_header = WdprNavSectionHeader;
//# sourceMappingURL=wdpr-nav-section-header.entry.cjs.js.map

//# sourceMappingURL=wdpr-nav-section-header.cjs.entry.js.map