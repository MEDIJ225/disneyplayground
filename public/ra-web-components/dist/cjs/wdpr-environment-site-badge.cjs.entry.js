'use strict';

var index = require('./index-4gPM_TYz.js');

const wdprEnvironmentSiteBadgeScss = ".env-badge::part(surface){color:var(--color-text-inverse);border-radius:4px}.env-badge-latest::part(surface){background:var(--color-aqua-700);border-color:var(--color-aqua-700)}.env-badge-stage::part(surface){background:var(--color-gold-600);border-color:var(--color-gold-600)}.env-badge-prod::part(surface){background:var(--color-blue-800);border-color:var(--color-blue-800)}";

const WdprEnvironmentSiteBadge = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    /**
     * Environment label shown in the badge.
     */
    environment = 'LATEST';
    /**
     * Site indicator shown in the badge.
     */
    site = 'WDW';
    /**
     * When true, only the environment text is rendered
     * (e.g., "PROD" instead of "PROD • WDW").
     */
    environmentOnly = false;
    get _badgeClass() {
        switch (this.environment) {
            case 'PROD':
                return 'env-badge env-badge-prod';
            case 'STAGE':
                return 'env-badge env-badge-stage';
            case 'LATEST':
            default:
                return 'env-badge env-badge-latest';
        }
    }
    get _label() {
        if (this.environmentOnly) {
            return this.environment;
        }
        return `${this.environment} • ${this.site}`;
    }
    render() {
        return (index.h("wdpr-badge", { key: '5c0c606ccd54a58fabde29b7c15003412120222b', class: this._badgeClass, "surface-class": "leading-component-small tracking-02", variant: "neutral", label: this._label, role: "none" }));
    }
};
WdprEnvironmentSiteBadge.style = wdprEnvironmentSiteBadgeScss;

exports.wdpr_environment_site_badge = WdprEnvironmentSiteBadge;
//# sourceMappingURL=wdpr-environment-site-badge.entry.cjs.js.map

//# sourceMappingURL=wdpr-environment-site-badge.cjs.entry.js.map