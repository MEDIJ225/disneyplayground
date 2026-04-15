import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import './p-CXZGMLMW.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';
import { b as bundleCjsExports } from './p-CF3xLdU_.js';

const wdprStatusIconCss = ":host{display:inline-flex;flex-shrink:0}";

const WdprStatusIcon = /*@__PURE__*/ proxyCustomElement(class WdprStatusIcon extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get hostEl() { return this; }
    /** Variant for the status icon */
    variant = 'success';
    /** Icon size */
    size = 'xsmall';
    /** ARIA label for the status icon */
    ariaLabel;
    getContainerClasses() {
        const sizeClasses = {
            xsmall: 'h-300 w-300',
            xxsmall: 'h-250 w-250',
        };
        const variantClasses = {
            success: 'bg-surface-status-success-alt text-text-status-success',
            informational: 'bg-surface-status-informational-alt text-text-status-informational',
            warning: 'bg-surface-status-warning-alt text-text-status-warning',
            error: 'bg-surface-status-critical-alt text-text-status-critical',
        };
        return bundleCjsExports.twMerge('inline-flex items-center justify-center rounded-pill', sizeClasses[this.size], variantClasses[this.variant]);
    }
    render() {
        return (h("div", { key: '1eb52aeb86724b8591e8765cc9f7f131353ca46d', class: this.getContainerClasses() }, h("wdpr-icon-library", { key: 'e1d737eaf9bf7e483ba92c694cd26688e4bd1ff1', icon: this.iconName, size: this.size, a11yLabel: this.ariaLabel })));
    }
    get iconName() {
        switch (this.variant) {
            case 'success': return 'checkmark';
            case 'informational': return 'info';
            case 'warning': return 'alert';
            case 'error': return 'alert-notification-1';
        }
    }
    static get style() { return wdprStatusIconCss; }
}, [257, "wdpr-status-icon", {
        "variant": [1],
        "size": [1],
        "ariaLabel": [1, "aria-label"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-status-icon", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-status-icon":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprStatusIcon);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprStatusIcon as W, defineCustomElement as d };
//# sourceMappingURL=p-DsPXJJ-e.js.map

//# sourceMappingURL=p-DsPXJJ-e.js.map