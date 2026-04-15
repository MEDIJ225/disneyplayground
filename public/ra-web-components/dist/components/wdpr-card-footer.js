import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$5 } from './p-CTYL3_rK.js';
import { d as defineCustomElement$4 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$3 } from './p-BeIHu0tu.js';
import { d as defineCustomElement$2 } from './p-Cb7GjcQn.js';

const WdprCardFooter$1 = /*@__PURE__*/ proxyCustomElement(class WdprCardFooter extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    headTitle;
    description;
    linkText;
    linkHref = '#';
    linkPosition = 'bottom';
    icon;
    showMoreOptions = false;
    variant = 'general';
    disabled = false;
    async setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    get iconVariantColor() {
        if (this.disabled) {
            return 'neutral';
        }
        switch (this.variant) {
            case 'warning':
                return 'warning';
            case 'critical':
                return 'error';
            case 'general':
                return 'secondary';
            default:
                return 'info';
        }
    }
    get iconName() {
        if (this.icon && this.variant === 'general') {
            return this.icon;
        }
        switch (this.variant) {
            case 'informational':
                return 'info';
            case 'warning':
                return 'alert';
            case 'critical':
                return 'alert-notification-1';
            case 'general':
                return this.icon || 'info';
            default:
                return 'info';
        }
    }
    _renderLink() {
        if (this.linkText && this.linkHref) {
            return (h("wdpr-text-link", { size: "xxsmall", href: this.linkHref, disabled: this.disabled }, this.linkText, h("wdpr-icon-library", { slot: "trailing-icon", icon: "next-caret-2.0", size: "xxsmall", decorative: true })));
        }
        return null;
    }
    render() {
        const footerBgClasses = this.disabled ? 'bg-surface-actionable-card-disabled' : 'bg-surface-default';
        const footerBorderTopClasses = 'border-t border-solid border-stroke-default';
        const footerTextClasses = this.disabled ? 'text-text-disabled' : 'text-text-heading';
        const footerOpacityClasses = this.disabled ? 'opacity-200' : '';
        return (h("div", { key: '6ba0063d0cae5cddd3752bae6b7105fd9f9c13c2', id: 'card-footer', class: `${footerBgClasses} ${footerBorderTopClasses} box-border flex p-200 w-full` }, this.variant === 'swap' ? h("div", { class: 'flex justify-center items-center w-full' }, h("slot", null)) :
            h("div", { class: 'flex w-full gap-3 items-start' }, h("wdpr-icon", { class: footerOpacityClasses, variant: this.iconVariantColor, icon: this.iconName, size: "xxsmall", background: "circle" }), h("div", { class: "flex flex-col grow items-start justify-center h-full" }, this.linkPosition === 'top' && this._renderLink(), h("div", { id: 'card-footer-title', class: `${footerTextClasses} font-bold component-small w-full` }, this.headTitle), h("div", { id: 'card-footer-description', class: `${footerTextClasses} min-w-full body-small` }, this.description), this.linkPosition === 'bottom' && this._renderLink()), h("div", { class: 'flex items-center justify-center min-w-400' }, h("slot", { name: "actions" })))));
    }
    static get style() { return ":host { width: 100%; }"; }
}, [257, "wdpr-card-footer", {
        "headTitle": [1, "head-title"],
        "description": [1],
        "linkText": [1, "link-text"],
        "linkHref": [1, "link-href"],
        "linkPosition": [1, "link-position"],
        "icon": [1],
        "showMoreOptions": [4, "show-more-options"],
        "variant": [1],
        "disabled": [4],
        "setDisabledState": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-card-footer", "wdpr-icon", "wdpr-icon-library", "wdpr-surface-style", "wdpr-text-link"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-card-footer":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCardFooter$1);
            }
            break;
        case "wdpr-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-surface-style":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-text-link":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprCardFooter = WdprCardFooter$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCardFooter, defineCustomElement };
//# sourceMappingURL=wdpr-card-footer.js.map

//# sourceMappingURL=wdpr-card-footer.js.map