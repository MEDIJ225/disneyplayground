import { r as registerInstance, h } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprNavSectionHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return customTwMerge('px-075 py-100', this.variant === 'loud' ? loudClass : quietClass);
    }
    render() {
        return (h("div", { key: 'cfc77dee9d1edf8f62239aa771c246983639898f', class: this._containerClass }, h("slot", { key: 'a3ff3746c1b26f7d8014ba90f809c1fdea4929f3' }, this.label)));
    }
};

export { WdprNavSectionHeader as wdpr_nav_section_header };
//# sourceMappingURL=wdpr-nav-section-header.entry.js.map

//# sourceMappingURL=wdpr-nav-section-header.entry.js.map