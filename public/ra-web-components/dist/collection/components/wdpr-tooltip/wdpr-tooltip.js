import { h } from "@stencil/core";
import { customTwMerge, generateRandId } from "../../utils/utils";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
export class WdprTooltip {
    el;
    /**
     * Tooltip position relative to the trigger icon
     */
    position = 'top-center';
    /**
     * Optional title for the tooltip
     */
    tooltipTitle;
    /**
     * Description text for the tooltip
     */
    description = '';
    /**
     * Icon to display in the trigger
     */
    icon = 'info';
    /**
     * Trigger mode: 'click' (click only), 'hover' (hover only), or 'click-and-hover' (both)
     */
    triggerMode = 'click';
    /**
     * ARIA label for accessibility
     */
    tooltipAriaLabel;
    /**
     * Optional visible label shown next to the trigger icon
     */
    label;
    /**
     * Whether to show the tooltip title
     */
    showTitle = true;
    /**
     * Whether to show the tooltip body/description
     */
    showDescription = true;
    isVisible = false;
    isPinned = false;
    hideTimeout = null;
    tooltipId = `tooltip-${generateRandId()}`;
    HIDE_DELAY = 100;
    get isTitleEnabled() {
        const val = this.showTitle;
        if (typeof val === 'string')
            return val !== 'false';
        return Boolean(val);
    }
    get isDescriptionEnabled() {
        const val = this.showDescription;
        if (typeof val === 'string')
            return val !== 'false';
        return Boolean(val);
    }
    get supportsClick() {
        return this.triggerMode === 'click' || this.triggerMode === 'click-and-hover';
    }
    get supportsHover() {
        return this.triggerMode === 'hover' || this.triggerMode === 'click-and-hover';
    }
    handleDocumentClick(event) {
        if (!this.supportsClick)
            return;
        if (!this.isVisible)
            return;
        const path = event.composedPath();
        if (!path.includes(this.el)) {
            this.hide();
        }
    }
    handleKeyDown(event) {
        if (event.key === KEYBOARD_KEYS.ESCAPE && this.isVisible) {
            event.preventDefault();
            this.hide();
        }
    }
    componentDidLoad() {
        window.addEventListener('scroll', this.handleScroll, true);
    }
    disconnectedCallback() {
        window.removeEventListener('scroll', this.handleScroll, true);
        this.clearHideTimeout();
    }
    clearHideTimeout() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }
    handleScroll = () => {
        if (this.isVisible && this.supportsHover && !this.isPinned) {
            this.hide();
        }
    };
    /**
     * Programmatically show the tooltip
     */
    async show() {
        this.clearHideTimeout();
        this.isVisible = true;
    }
    /**
     * Programmatically hide the tooltip
     */
    async hide() {
        this.isVisible = false;
        this.isPinned = false;
    }
    handleIconClick = () => {
        if (this.triggerMode === 'click-and-hover') {
            if (this.isPinned) {
                this.isPinned = false;
            }
            else {
                this.isPinned = true;
                this.show();
            }
        }
        else if (this.supportsClick) {
            if (this.isVisible) {
                this.hide();
            }
            else {
                this.show();
            }
        }
    };
    handleIconHover = () => {
        if (!this.supportsHover)
            return;
        this.show();
    };
    handleIconLeave = () => {
        if (this.supportsHover && !this.isPinned) {
            this.clearHideTimeout();
            this.hideTimeout = setTimeout(() => this.hide(), this.HIDE_DELAY);
        }
    };
    handleTooltipEnter = () => {
        if (this.supportsHover) {
            this.clearHideTimeout();
        }
    };
    handleTooltipLeave = () => {
        if (this.supportsHover && !this.isPinned) {
            this.hide();
        }
    };
    getTooltipClasses() {
        const base = 'absolute z-50 transition-all duration-200 ease-in-out w-max';
        const pointer = this.isVisible ? 'pointer-events-auto' : 'pointer-events-none';
        const maxWidth = 'max-w-[150px] xs:max-w-[180px] sm:max-w-[200px] md:max-w-sm lg:max-w-sm';
        const display = (this.position === 'left' || this.position === 'right') ? 'flex' : 'block transform translate-y-0';
        return customTwMerge(display, base, pointer, maxWidth);
    }
    getTooltipPositionClasses() {
        const positionMap = {
            'bottom-center': 'bottom-full left-1/2 -translate-x-1/2 mb-[12px]',
            'bottom-left': 'bottom-full -left-[24px] mb-[12px]',
            'bottom-right': 'bottom-full -right-[24px] mb-[12px]',
            'top-center': 'top-full left-1/2 -translate-x-1/2 mt-[12px]',
            'top-left': 'top-full -left-[24px] mt-[12px]',
            'top-right': 'top-full -right-[24px] mt-[12px]',
            'left': 'right-full top-0 bottom-0 mr-[12px] items-center',
            'right': 'left-full top-0 bottom-0 ml-[12px] items-center',
        };
        return positionMap[this.position] || positionMap['top-center'];
    }
    getTooltipInnerClasses() {
        return 'bg-white text-text-body rounded-200 p-200 elevation-medium-soft relative border-surface-neutral-dark border-solid border-012 mx-2 sm:mx-0';
    }
    getArrowClasses() {
        const base = 'absolute w-0 h-0 border-solid border-transparent z-[2]';
        const arrowMap = {
            'bottom-center': 'top-full left-1/2 -translate-x-1/2 border-[8px] border-t-white border-b-0 -mt-px',
            'bottom-left': 'top-full left-[24px] border-[8px] border-t-white border-b-0 -mt-px',
            'bottom-right': 'top-full right-[24px] border-[8px] border-t-white border-b-0 -mt-px',
            'top-center': 'bottom-full left-1/2 -translate-x-1/2 border-[8px] border-b-white border-t-0 -mb-px',
            'top-left': 'bottom-full left-[24px] border-[8px] border-b-white border-t-0 -mb-px',
            'top-right': 'bottom-full right-[24px] border-[8px] border-b-white border-t-0 -mb-px',
            'left': 'left-full top-1/2 border-[8px] border-l-white border-r-0 -ml-px -mt-[8px]',
            'right': 'right-full top-1/2 border-[8px] border-r-white border-l-0 -mr-px -mt-[8px]',
        };
        return customTwMerge(base, arrowMap[this.position]);
    }
    getArrowBorderClasses() {
        const base = 'absolute w-0 h-0 border-solid border-transparent z-[1]';
        const borderMap = {
            'bottom-center': 'top-full left-1/2 -translate-x-1/2 border-[9px] border-t-surface-neutral-dark border-b-0',
            'bottom-left': 'top-full left-[23px] border-[9px] border-t-surface-neutral-dark border-b-0',
            'bottom-right': 'top-full right-[23px] border-[9px] border-t-surface-neutral-dark border-b-0',
            'top-center': 'bottom-full left-1/2 -translate-x-1/2 border-[9px] border-b-surface-neutral-dark border-t-0',
            'top-left': 'bottom-full left-[23px] border-[9px] border-b-surface-neutral-dark border-t-0',
            'top-right': 'bottom-full right-[23px] border-[9px] border-b-surface-neutral-dark border-t-0',
            'left': 'left-full top-1/2 border-[9px] border-l-surface-neutral-dark border-r-0 -mt-[9px]',
            'right': 'right-full top-1/2 border-[9px] border-r-surface-neutral-dark border-l-0 -mt-[9px]',
        };
        return customTwMerge(base, borderMap[this.position]);
    }
    render() {
        const hasContent = (this.isTitleEnabled && !!this.tooltipTitle) || (this.isDescriptionEnabled && !!this.description);
        return (h("div", { key: 'bc24aae7e667a051b99584692c9125153021dedd', class: "relative inline-flex" }, h("wdpr-info-icon-with-tooltip", { key: '7c39a70523906ff5d0a34f89d078e74b56e6dd11', icon: this.icon, selected: this.isVisible, showTitle: this.isTitleEnabled, showDescription: this.isDescriptionEnabled, a11yLabel: this.tooltipAriaLabel, tooltipId: this.isVisible ? this.tooltipId : undefined, label: this.label, onInfoIconClick: this.handleIconClick, onInfoIconHover: this.handleIconHover, onInfoIconLeave: this.handleIconLeave }), this.isVisible && (h("div", { key: 'c762f05ceaf83352e55c85ff8f9587d6df45ce68', id: this.tooltipId, role: "tooltip", class: customTwMerge(this.getTooltipClasses(), this.getTooltipPositionClasses()), onMouseEnter: this.handleTooltipEnter, onMouseLeave: this.handleTooltipLeave }, h("div", { key: '8f19584ab32b33a6df89024b28e9489a04c7bbeb', class: this.getTooltipInnerClasses() }, this.isTitleEnabled && this.tooltipTitle && (h("div", { key: '73b077647f4a128275ba76503a02180e29276eee', class: "body-small-alt text-text-heading" }, this.tooltipTitle)), this.isDescriptionEnabled && this.description && (h("div", { key: 'b47beee95e1f640df17a7709f1c6957f41a8eef7', class: "body-small text-text-body" }, this.description)), h("div", { key: '36378af1a19fce8b29148cd7c977697d21e73559', class: hasContent ? 'mt-050' : '' }, h("slot", { key: '20bbbfc8425d9b96191b5c9492bd9a562a3f9370' })), h("div", { key: '696025e854cb29e2e468ab2f61f837bc0909ecb7', class: this.getArrowBorderClasses() }), h("div", { key: '5f0d7a1958ebbb82f3f7833321b4c69d86de0ff4', class: this.getArrowClasses() }))))));
    }
    static get is() { return "wdpr-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "position": {
                "type": "string",
                "attribute": "position",
                "mutable": false,
                "complexType": {
                    "original": "TooltipPosition",
                    "resolved": "\"bottom-center\" | \"bottom-left\" | \"bottom-right\" | \"left\" | \"right\" | \"top-center\" | \"top-left\" | \"top-right\"",
                    "references": {
                        "TooltipPosition": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-tooltip/wdpr-tooltip.tsx",
                            "id": "src/components/wdpr-tooltip/wdpr-tooltip.tsx::TooltipPosition"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Tooltip position relative to the trigger icon"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'top-center'"
            },
            "tooltipTitle": {
                "type": "string",
                "attribute": "tooltip-title",
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
                    "text": "Optional title for the tooltip"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "description": {
                "type": "string",
                "attribute": "description",
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
                    "text": "Description text for the tooltip"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
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
                    "text": "Icon to display in the trigger"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'info'"
            },
            "triggerMode": {
                "type": "string",
                "attribute": "trigger-mode",
                "mutable": false,
                "complexType": {
                    "original": "TooltipTriggerMode",
                    "resolved": "\"click\" | \"click-and-hover\" | \"hover\"",
                    "references": {
                        "TooltipTriggerMode": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-tooltip/wdpr-tooltip.tsx",
                            "id": "src/components/wdpr-tooltip/wdpr-tooltip.tsx::TooltipTriggerMode"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Trigger mode: 'click' (click only), 'hover' (hover only), or 'click-and-hover' (both)"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'click'"
            },
            "tooltipAriaLabel": {
                "type": "string",
                "attribute": "tooltip-aria-label",
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
                    "text": "ARIA label for accessibility"
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
                    "text": "Optional visible label shown next to the trigger icon"
                },
                "getter": false,
                "setter": false,
                "reflect": false
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
            }
        };
    }
    static get states() {
        return {
            "isVisible": {},
            "isPinned": {}
        };
    }
    static get methods() {
        return {
            "show": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Programmatically show the tooltip",
                    "tags": []
                }
            },
            "hide": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Programmatically hide the tooltip",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "click",
                "method": "handleDocumentClick",
                "target": "document",
                "capture": false,
                "passive": false
            }, {
                "name": "keydown",
                "method": "handleKeyDown",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-tooltip.js.map
