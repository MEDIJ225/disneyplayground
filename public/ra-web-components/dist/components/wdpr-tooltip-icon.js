import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$2 } from './p-CiDhVxgt.js';

const WdprTooltipIcon$1 = /*@__PURE__*/ proxyCustomElement(class WdprTooltipIcon extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.tooltipIconClick = createEvent(this, "tooltipIconClick", 7);
        this.tooltipIconHover = createEvent(this, "tooltipIconHover", 7);
        this.tooltipIconLeave = createEvent(this, "tooltipIconLeave", 7);
    }
    componentWillLoad() {
        console.warn('The `wdpr-tooltip-icon` component is deprecated and will be removed in a future major release. Please use `wdpr-tooltip` instead.');
    }
    /**
     * Icon name from the icon library
     */
    icon = 'info';
    /**
     * Whether the tooltip is currently active/showing
     */
    active = false;
    /*
     * Accessible label for the radio group
     */
    ariaLabel;
    /*
     * Related tooltip id
     */
    tooltipId;
    /**
     * Emitted when icon is clicked
     */
    tooltipIconClick;
    /**
     * Emitted when icon is hovered
     */
    tooltipIconHover;
    /**
     * Emitted when icon is hovered
     */
    tooltipIconLeave;
    handleClick = (event) => {
        event.stopPropagation();
        this.tooltipIconClick.emit();
    };
    handleMouseEnter = () => {
        this.tooltipIconHover.emit();
    };
    handleMouseLeave = () => {
        this.tooltipIconLeave.emit();
    };
    handleFocus = () => {
        this.tooltipIconHover.emit();
    };
    handleBlur = () => {
        this.tooltipIconLeave.emit();
    };
    getButtonClasses() {
        const baseClasses = 'rounded-full p-0 border-0 bg-transparent cursor-pointer transition-all duration-200 ease-in-out flex items-center justify-center';
        const stateClasses = this.active ? 'text-icon-actionable-focused' : 'text-icon-actionable-default';
        const hoverClasses = 'hover:text-icon-actionable-hover';
        const focusClasses = 'focus:outline-none focus-visible:outline-focus focus-visible:outline-offset-2 focus-visible:outline-stroke-actionable-focused focus-visible:outline-solid';
        const activeClasses = 'active:text-icon-actionable-focused';
        return customTwMerge(baseClasses, stateClasses, hoverClasses, focusClasses, activeClasses);
    }
    render() {
        return (h("button", { key: '7dd0342d23502e1fa548ffeb1ba5aa4b1a157d07', class: this.getButtonClasses(), onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onFocus: this.handleFocus, onBlur: this.handleBlur, "aria-expanded": this.active ? 'true' : 'false', type: "button", "aria-label": this.ariaLabel || 'tooltip icon', "aria-describedBy": this.tooltipId }, h("slot", { key: 'b0d4a267cd1d9a9e98a6551cf6ecc668dee7ee12' }, h("wdpr-icon-library", { key: '06478eb37301333f6eb37950a629c63579cf61ee', decorative: true, icon: this.icon, size: "small" }))));
    }
}, [257, "wdpr-tooltip-icon", {
        "icon": [1],
        "active": [4],
        "ariaLabel": [1, "aria-label"],
        "tooltipId": [1, "tooltip-id"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-tooltip-icon", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-tooltip-icon":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprTooltipIcon$1);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprTooltipIcon = WdprTooltipIcon$1;
const defineCustomElement = defineCustomElement$1;

export { WdprTooltipIcon, defineCustomElement };
//# sourceMappingURL=wdpr-tooltip-icon.js.map

//# sourceMappingURL=wdpr-tooltip-icon.js.map