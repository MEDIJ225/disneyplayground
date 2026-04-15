import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';

const WdprInfoIconWithTooltip = /*@__PURE__*/ proxyCustomElement(class WdprInfoIconWithTooltip extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.infoIconClick = createEvent(this, "infoIconClick", 7);
        this.infoIconHover = createEvent(this, "infoIconHover", 7);
        this.infoIconLeave = createEvent(this, "infoIconLeave", 7);
    }
    /**
     * Icon name from the icon library
     */
    icon = 'info';
    /**
     * Whether the tooltip is currently open (selected state)
     */
    selected = false;
    /**
     * Whether to show the tooltip title
     */
    showTitle = true;
    /**
     * Whether to show the tooltip body/description
     */
    showDescription = true;
    /**
     * ARIA label for the trigger button
     */
    a11yLabel;
    /**
     * ID of the associated tooltip element for aria-describedby
     */
    tooltipId;
    /**
     * Optional visible label next to the icon
     */
    label;
    /**
     * Emitted when the icon is clicked
     */
    infoIconClick;
    /**
     * Emitted when the icon is hovered / focused
     */
    infoIconHover;
    /**
     * Emitted when the icon is un-hovered / blurred
     */
    infoIconLeave;
    handleClick = () => {
        this.infoIconClick.emit();
    };
    handleMouseEnter = () => {
        this.infoIconHover.emit();
    };
    handleMouseLeave = () => {
        this.infoIconLeave.emit();
    };
    handleFocus = () => {
        this.infoIconHover.emit();
    };
    handleBlur = () => {
        this.infoIconLeave.emit();
    };
    getButtonClasses() {
        const base = 'inline-flex items-center justify-center min-w-6 min-h-6 p-050 rounded-full border-0 bg-transparent cursor-pointer transition-all duration-200 ease-in-out';
        const stateClass = this.selected
            ? 'text-icon-actionable-focused'
            : 'text-icon-actionable-default';
        const hover = 'hover:text-icon-actionable-hover';
        const active = 'active:text-icon-actionable-focused';
        const focus = 'outline-none focus-visible:outline focus-visible:outline-solid focus-visible:outline-037 focus-visible:outline-offset-2 focus-visible:outline-stroke-actionable-focused';
        return customTwMerge(base, stateClass, hover, active, focus);
    }
    render() {
        return (h("button", { key: '7a9d22413c543c8a1af1cf6fc19724c286c1bd67', class: this.getButtonClasses(), type: "button", onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onFocus: this.handleFocus, onBlur: this.handleBlur, "aria-label": !this.label ? (this.a11yLabel || 'tooltip icon') : undefined, "aria-expanded": this.selected, "aria-describedby": this.tooltipId }, this.label && (h("span", { key: 'faf8a2a9c0c891f83da29bd053ec6f47ecf0364d', class: customTwMerge('mr-050 text-current relative top-px', 'text-component-medium font-component-default leading-heading-xsmall tracking-default') }, this.label)), h("wdpr-icon-library", { key: 'b35101e5d533f52f414e5703d3b45a142cca8f03', decorative: true, icon: this.icon, size: "small" })));
    }
}, [257, "wdpr-info-icon-with-tooltip", {
        "icon": [1],
        "selected": [4],
        "showTitle": [4, "show-title"],
        "showDescription": [4, "show-description"],
        "a11yLabel": [1, "a-1-1y-label"],
        "tooltipId": [1, "tooltip-id"],
        "label": [1]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-info-icon-with-tooltip", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-info-icon-with-tooltip":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprInfoIconWithTooltip);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprInfoIconWithTooltip as W, defineCustomElement as d };
//# sourceMappingURL=p-BlwFeWKw.js.map

//# sourceMappingURL=p-BlwFeWKw.js.map