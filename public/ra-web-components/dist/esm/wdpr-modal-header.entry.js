import { r as registerInstance, c as createEvent, h } from './index-CykM8GCN.js';

const modalTitleTypographyClasses = 'text-text-heading text-heading-small font-heading-default leading-heading-small tracking--05 ' +
    'md:text-heading-medium md:leading-heading-medium ' +
    'lg:text-heading-large lg:leading-heading-large';
const WdprModalHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.close = createEvent(this, "closeModal", 7);
    }
    headerText;
    icon;
    iconSize = 'large';
    subtext;
    showCloseIcon = true;
    /** Visual variant of the header. 'default-alt' uses alternate background color. */
    variant = 'default';
    close;
    getHeaderClasses() {
        const baseClasses = 'flex items-center justify-between px-300 py-200 border-b rounded-t-200';
        if (this.variant === 'default-alt') {
            return `${baseClasses} bg-surface-default-alt`;
        }
        return baseClasses;
    }
    render() {
        const closeButtonVariant = this.variant === 'default-alt' ? 'bgPrimary' : 'primary';
        return (h("header", { key: '5daf9b399983fdfa4215cb6c2a45ad676a655fd6', class: this.getHeaderClasses() }, h("div", { key: 'efbfc4f63be1759c745240c019b9dbce88a5e2cf', class: "flex justify-center items-center" }, this.icon && h("wdpr-icon-library", { key: '9cf0b3b1141b7bf5cdb6b1d79841c048e80694a1', decorative: true, icon: this.icon, size: this.iconSize }), h("h2", { key: '1f9a5e1065990ed0815d36b1a1d7dbfe8ed67549', class: `${modalTitleTypographyClasses} focus:outline-none ${this.icon ? 'ml-3' : ''}` }, this.headerText)), this.subtext && h("div", { key: '4ebd30cd51ff4a31e06eb8ce7cb813e46a2d1b1f', class: "flex grow justify-end body-medium text-text-disclaimer" }, this.subtext), this.showCloseIcon && (h("slot", { key: 'b0a8e4ee8eb6a654dbc0b25282f5f73998028c6e', name: "close-icon" }, h("wdpr-icon-button", { key: '788dfa326f4c35b99ff4d1f622dd805e51a1c8d0', class: "ml-175", "icon-name": "close-reversed", size: "small", variant: closeButtonVariant, a11yLabel: "Close modal", onClick: () => this.close.emit() })))));
    }
};
WdprModalHeader.style = ":host {\n      display: block;\n      flex-shrink: 0;\n    }";

export { WdprModalHeader as wdpr_modal_header };
//# sourceMappingURL=wdpr-modal-header.entry.js.map

//# sourceMappingURL=wdpr-modal-header.entry.js.map