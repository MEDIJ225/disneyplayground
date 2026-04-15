import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$3 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$2 } from './p-YiP2RhPm.js';
import { d as defineCustomElement$1 } from './p-Cb7GjcQn.js';

const WdprActionableListItem = /*@__PURE__*/ proxyCustomElement(class WdprActionableListItem extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
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
}, [257, "wdpr-actionable-list-item", {
        "itemId": [1, "item-id"],
        "headerLabel": [1, "header-label"],
        "preHeader": [1, "pre-header"],
        "subtextLabel": [1, "subtext-label"],
        "headerLeadingIcon": [1, "header-leading-icon"],
        "headerSize": [1, "header-size"],
        "linkText": [1, "link-text"],
        "linkHref": [1, "link-href"],
        "linkLeadingIcon": [1, "link-leading-icon"],
        "linkTrailingIcon": [1, "link-trailing-icon"],
        "linkVariant": [1, "link-variant"],
        "linkTarget": [1, "link-target"],
        "linkA11yLabel": [1, "link-a-1-1y-label"],
        "linkDisabled": [4, "link-disabled"],
        "linkRel": [1, "link-rel"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-actionable-list-item", "wdpr-icon-library", "wdpr-text-header", "wdpr-text-link"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-actionable-list-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprActionableListItem);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-text-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "wdpr-text-link":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprActionableListItem as W, defineCustomElement as d };
//# sourceMappingURL=p-zsBRxjtP.js.map

//# sourceMappingURL=p-zsBRxjtP.js.map