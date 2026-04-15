import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';

const WdprActionableListItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    /**
     * Unique ID for the list item.
     */
    itemId;
    /**
     * The main text to display in the header.
     */
    headerLabel;
    /**
     * The pre-header text to display above the main header. Hidden if empty.
     */
    preHeader;
    /**
     * The subtext to display below the header. The subtext is hidden if this is empty.
     */
    subtextLabel;
    /**
     * icon content for the leading-icon
     */
    headerLeadingIcon;
    /**
     * set the main Text size
     */
    headerSize;
    /**
     * The main text to display in the link
     */
    linkText;
    /**
     * The URL the link points to.
     */
    linkHref;
    /**
     * text icon name to add to the left of the link text
     */
    linkLeadingIcon;
    /**
     * text icon name to add at the right of the link text
     */
    linkTrailingIcon;
    /**
     * The visual style of the link.
     */
    linkVariant;
    /**
     * Specifies where to open the linked document.
     */
    linkTarget;
    /**
     * Sets an accessible label for the link.
     */
    linkA11yLabel;
    /**
     * Disables user interaction and applies disabled styling.
     */
    linkDisabled;
    /**
     * Specifies the relationship of the target object to the link object.
     */
    linkRel;
    render() {
        return (h("div", { key: '8288909d2961e4de8cc6cdd9f6a819fb4c5949e9', class: "flex flex-col items-start" }, h("wdpr-text-header", { key: 'b9a3cade2951c7e5a2dce585d4314edb0d0a6b01', size: this.headerSize, preHeader: this.preHeader, headerLabel: this.headerLabel, subtextLabel: this.subtextLabel }, this.headerLeadingIcon && h("wdpr-icon-library", { key: '526f65ec56e54b9ede3e3b8f3e3eca09844f20f4', size: "medium", icon: this.headerLeadingIcon, slot: "leading-icon" })), h("wdpr-text-link", { key: '4eb5fcfb9f0f35d06f403001cadca5f196dc6d46', variant: this.linkVariant, size: "xsmall", href: this.linkHref, target: this.linkTarget, a11yLabel: this.linkA11yLabel, disabled: this.linkDisabled, rel: this.linkRel }, this.linkLeadingIcon && h("wdpr-icon-library", { key: '2430e9479944c3ca08588176f280ae118eb9b9ff', icon: this.linkLeadingIcon, slot: "leading-icon" }), this.linkText && h("span", { key: '784e1502e6026449db7dde3a8bf2f98ffb2baac3' }, this.linkText), this.linkTrailingIcon && h("wdpr-icon-library", { key: 'aa5f90c5e8eb2373cfb8aaff0eba51ac9bb46ee4', icon: this.linkTrailingIcon, slot: "trailing-icon" }))));
    }
};

export { WdprActionableListItem as wdpr_actionable_list_item };
//# sourceMappingURL=wdpr-actionable-list-item.entry.js.map

//# sourceMappingURL=wdpr-actionable-list-item.entry.js.map