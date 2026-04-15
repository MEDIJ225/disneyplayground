import { h } from "@stencil/core";
import { customTwMerge } from "../../../utils/utils";
export class WdprInfoIconWithTooltip {
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
    static get is() { return "wdpr-info-icon-with-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "icon": {
                "type": "string",
                "attribute": "icon",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Icon name from the icon library"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'info'"
            },
            "selected": {
                "type": "boolean",
                "attribute": "selected",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the tooltip is currently open (selected state)"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "showTitle": {
                "type": "boolean",
                "attribute": "show-title",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether to show the tooltip title"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "showDescription": {
                "type": "boolean",
                "attribute": "show-description",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether to show the tooltip body/description"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "a11yLabel": {
                "type": "string",
                "attribute": "a-1-1y-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "ARIA label for the trigger button"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "tooltipId": {
                "type": "string",
                "attribute": "tooltip-id",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "ID of the associated tooltip element for aria-describedby"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "label": {
                "type": "string",
                "attribute": "label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Optional visible label next to the icon"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "infoIconClick",
                "name": "infoIconClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the icon is clicked"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "infoIconHover",
                "name": "infoIconHover",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the icon is hovered / focused"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "infoIconLeave",
                "name": "infoIconLeave",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the icon is un-hovered / blurred"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
}
//# sourceMappingURL=wdpr-info-icon-with-tooltip.js.map
