'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprBadge = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    /** Badge text label */
    label = '';
    /** Badge location style */
    location = 'overlay';
    /** Badge visual variant (maps to surface variant + text color) */
    variant = 'neutral';
    /** Optional explicit icon name */
    iconName;
    /** Icon size from the icon library */
    iconSize = 'xxsmall';
    /**
     * Optional accessible name for the icon.
     * If provided, the icon will expose role="img" + aria-label on the same element.
     * If omitted, the icon will be treated as decorative (aria-hidden="true").
     */
    iconLabel;
    /**
     * Optional ARIA role on the badge host.
     * - 'status' or 'alert' for live regions
     * - 'none' when the badge is purely decorative/structural
     * If omitted, no role attribute is set.
     */
    role = '';
    /**
     * Extra classes merged onto the badge surface (after defaults).
     * Use to override layout/typography for specific compositions (e.g. fixed component-small line-height).
     */
    surfaceClass;
    get validRole() {
        if (this.role === 'status' || this.role === 'alert' || this.role === 'none') {
            return this.role;
        }
        return undefined;
    }
    /** Map BadgeVariant → wdpr-surface-style variant */
    get surfaceVariant() {
        const map = {
            'neutral': 'neutral-extra-bright-small',
            'success': 'success-extra-bright-small',
            'warning': 'warning-extra-bright-small',
            'error': 'critical-extra-bright-small',
            'informational': 'informational-extra-bright-small',
            'top-pick': 'top-pick-extra-bright-small',
            'dark': 'dark',
        };
        return map[this.variant];
    }
    get surfaceCustomClasses() {
        const variantClasses = {
            'neutral': 'text-text-status-neutral',
            'success': 'text-text-status-success',
            'warning': 'text-text-status-warning',
            'error': 'text-text-status-critical',
            'informational': 'text-text-status-informational',
            'top-pick': 'text-text-status-top-pick',
            'dark': 'text-text-default',
        };
        const locationClasses = {
            'overlay': 'py-050 px-100 md:py-075 md:px-125',
            'inline': 'py-025 px-050 md:py-050 md:px-100',
        };
        const inlineNeutralNoStroke = this.location === 'inline' && this.variant === 'neutral' ? 'border-transparent' : '';
        return utils.customTwMerge('inline-flex items-center whitespace-nowrap gap-050', 'text-component-small font-component-default leading-component-medium tracking-default md:leading-component-small md:tracking-02', variantClasses[this.variant], locationClasses[this.location], inlineNeutralNoStroke, this.surfaceClass);
    }
    renderIcon() {
        if (!this.iconName)
            return null;
        // If iconLabel is provided → meaningful icon (role="img" handled internally)
        // Otherwise → decorative (aria-hidden="true" handled internally)
        const a11yProps = this.iconLabel ? { a11yLabel: this.iconLabel, decorative: false } : { decorative: true };
        return index.h("wdpr-icon-library", { icon: this.iconName, size: this.iconSize, ...a11yProps });
    }
    render() {
        return (index.h("wdpr-surface-style", { key: '9582aeec63cc68ba930b6575351c52fe3fc175e3', ...utils.forwardCommonHostAttributes(this.el), role: this.validRole, variant: this.surfaceVariant, padding: "none", customClass: this.surfaceCustomClasses, exportparts: "surface" }, this.renderIcon(), index.h("span", { key: '212137a09e0eab9d73ad8a9052a746f4bb87c9bb', part: "label" }, this.label)));
    }
};

exports.wdpr_badge = WdprBadge;
//# sourceMappingURL=wdpr-badge.entry.cjs.js.map

//# sourceMappingURL=wdpr-badge.cjs.entry.js.map