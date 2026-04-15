import { h } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
/**
 * @deprecated Use `wdpr-tooltip` instead. `wdpr-tooltip-icon` will be removed in a future major release.
 */
export class WdprTooltipIcon {
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
    static get is() { return "wdpr-tooltip-icon"; }
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
            "active": {
                "type": "boolean",
                "attribute": "active",
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
                    "text": "Whether the tooltip is currently active/showing"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "ariaLabel": {
                "type": "string",
                "attribute": "aria-label",
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
                    "text": ""
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
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "tooltipIconClick",
                "name": "tooltipIconClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when icon is clicked"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "tooltipIconHover",
                "name": "tooltipIconHover",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when icon is hovered"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "tooltipIconLeave",
                "name": "tooltipIconLeave",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when icon is hovered"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
}
//# sourceMappingURL=wdpr-tooltip-icon.js.map
