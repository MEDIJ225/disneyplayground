import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$2 } from './p-CiDhVxgt.js';

const WdprCardStatusLabel$1 = /*@__PURE__*/ proxyCustomElement(class WdprCardStatusLabel extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    label;
    variant = 'informational';
    get variantClasses() {
        return {
            success: 'bg-surface-status-success-alt-2',
            warning: 'bg-surface-status-warning-alt-2',
            informational: 'bg-surface-status-informational-alt-2',
            error: 'bg-surface-status-critical',
        };
    }
    ;
    get textColor() {
        return {
            success: 'text-text-status-success',
            warning: 'text-text-status-warning',
            informational: 'text-text-body',
            error: 'text-text-inverse',
        };
    }
    ;
    get iconName() {
        switch (this.variant) {
            case 'success':
                return 'checkmark';
            case 'warning':
                return 'alert';
            case 'error':
                return 'alert-notification-1';
            case 'informational':
                return 'info';
        }
    }
    ;
    render() {
        const variantBg = this.variantClasses[this.variant];
        const textColor = this.textColor[this.variant];
        const containerClasses = `box-border flex h-dimension-450 items-center py-112 px-200 w-full ${variantBg} ${textColor}`;
        return (h("div", { key: '848b65324fb5484c6ad814cf5f7f46c55ccd2fad', class: containerClasses }, h("div", { key: 'cd8650fe7e6c085bc0fe6271426e36c35c061467', class: textColor }, h("wdpr-icon-library", { key: 'eab1a91670eeb73d8859da88908245501d25cd65', icon: this.iconName, size: "xxsmall" })), h("div", { key: '13f2d3aaa8b2c1fcc5484d6fc83742b3ce304044', class: "font-body-alt component-small w-full pl-050 pt-025" }, this.label)));
    }
    static get style() { return ":host { width: 100%; }"; }
}, [257, "wdpr-card-status-label", {
        "label": [1],
        "variant": [1]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-card-status-label", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-card-status-label":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCardStatusLabel$1);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprCardStatusLabel = WdprCardStatusLabel$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCardStatusLabel, defineCustomElement };
//# sourceMappingURL=wdpr-card-status-label.js.map

//# sourceMappingURL=wdpr-card-status-label.js.map