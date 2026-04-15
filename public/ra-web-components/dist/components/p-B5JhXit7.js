import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$3 } from './p-KzTfvkfy.js';
import { d as defineCustomElement$2 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$1 } from './p-BeIHu0tu.js';

const wdprEnvironmentSiteBadgeScss = ".env-badge::part(surface){color:var(--color-text-inverse);border-radius:4px}.env-badge-latest::part(surface){background:var(--color-aqua-700);border-color:var(--color-aqua-700)}.env-badge-stage::part(surface){background:var(--color-gold-600);border-color:var(--color-gold-600)}.env-badge-prod::part(surface){background:var(--color-blue-800);border-color:var(--color-blue-800)}";

const WdprEnvironmentSiteBadge = /*@__PURE__*/ proxyCustomElement(class WdprEnvironmentSiteBadge extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
        return (h("wdpr-badge", { key: '5c0c606ccd54a58fabde29b7c15003412120222b', class: this._badgeClass, "surface-class": "leading-component-small tracking-02", variant: "neutral", label: this._label, role: "none" }));
    }
    static get style() { return wdprEnvironmentSiteBadgeScss; }
}, [257, "wdpr-environment-site-badge", {
        "environment": [513],
        "site": [513],
        "environmentOnly": [516, "environment-only"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-environment-site-badge", "wdpr-badge", "wdpr-icon-library", "wdpr-surface-style"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-environment-site-badge":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprEnvironmentSiteBadge);
            }
            break;
        case "wdpr-badge":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "wdpr-surface-style":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprEnvironmentSiteBadge as W, defineCustomElement as d };
//# sourceMappingURL=p-B5JhXit7.js.map

//# sourceMappingURL=p-B5JhXit7.js.map