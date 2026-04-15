import { r as registerInstance, h } from './index-CykM8GCN.js';

const WdprCardFooter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
WdprCardFooter.style = ":host { width: 100%; }";

export { WdprCardFooter as wdpr_card_footer };
//# sourceMappingURL=wdpr-card-footer.entry.js.map

//# sourceMappingURL=wdpr-card-footer.entry.js.map