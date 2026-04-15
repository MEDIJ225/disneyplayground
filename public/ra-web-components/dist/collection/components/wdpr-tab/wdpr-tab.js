import { h, Host } from "@stencil/core";
export class WdprTab {
    el;
    /**
     * Tab id
     * @type {string}
     */
    tabId;
    /**
     * Tab label
     * @type {string}
     */
    label;
    /**
     * Tab secondary label
     * @type {string}
     */
    secondaryLabel;
    /**
     * Tab icon
     * @type {string}
     */
    icon;
    /**
     * if `true`, the tab is currently active.
     * @type {boolean}
     */
    active = false;
    /**
     * if `true`, the tab is disabled
     * @type {boolean}
     */
    disabled = false;
    /**
     * if `true`, the tab will grow to fill the available space.
     * @type {boolean}
     */
    grow = false;
    /**
     * The id of the element that this tab controls
     * @type {string}
     */
    controlsId;
    /**
     * The tabindex of the tab
     * @type {number}
     */
    customTabIndex;
    showInactiveBorderBottom = true;
    /**
     * Emitted when the tab button is clicked.
     * This is used by the parent wdpr-tab-bar to manage the active state.
     */
    tabClicked;
    _handleClick = () => {
        if (this.disabled)
            return;
        this.tabClicked.emit({ tabElement: this.el });
    };
    render() {
        return (h(Host, { key: 'fb0ade2a8365ec7a8dedcef9feea4a99d83f7eb6', id: this.tabId, role: "tab", class: "tab-button", "aria-selected": this.active.toString(), "aria-controls": this.controlsId, "aria-disabled": this.disabled ? 'true' : undefined, tabindex: this.disabled ? -1 : (this.customTabIndex ?? 0), onClick: this._handleClick, disabled: this.disabled }, h("div", { key: 'd1c0b715ef1b1fc998ba36cac7c74a83d57479e2', class: "tab-content" }, h("div", { key: '2846a4e4a4a3cb10a4053d8e280679c347639818', class: "tab-icon-wrapper" }, this.icon && h("wdpr-icon-library", { key: '278a3d3a1ace8c7269673952f3f1264995d39967', icon: this.icon, size: "small", decorative: true }), this.secondaryLabel && !this.icon && h("span", { key: '430566d3b055403addd71d75e989bca799ec43c6', class: "secondary-label" }, this.secondaryLabel)), h("span", { key: '7e8ef01011eac6c928a55c08e5ba952d249f5bea', class: "main-label" }, this.label))));
    }
    static get is() { return "wdpr-tab"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-tab.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-tab.css"]
        };
    }
    static get properties() {
        return {
            "tabId": {
                "type": "string",
                "attribute": "tab-id",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "Tab id"
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
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "Tab label"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "secondaryLabel": {
                "type": "string",
                "attribute": "secondary-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "Tab secondary label"
                },
                "getter": false,
                "setter": false,
                "reflect": false
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
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "Tab icon"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "active": {
                "type": "boolean",
                "attribute": "active",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{boolean}"
                        }],
                    "text": "if `true`, the tab is currently active."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "disabled": {
                "type": "boolean",
                "attribute": "disabled",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{boolean}"
                        }],
                    "text": "if `true`, the tab is disabled"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "grow": {
                "type": "boolean",
                "attribute": "grow",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{boolean}"
                        }],
                    "text": "if `true`, the tab will grow to fill the available space."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "controlsId": {
                "type": "string",
                "attribute": "controls-id",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The id of the element that this tab controls"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "customTabIndex": {
                "type": "number",
                "attribute": "custom-tab-index",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{number}"
                        }],
                    "text": "The tabindex of the tab"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "showInactiveBorderBottom": {
                "type": "boolean",
                "attribute": "show-inactive-border-bottom",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "true"
            }
        };
    }
    static get events() {
        return [{
                "method": "tabClicked",
                "name": "tabClicked",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the tab button is clicked.\nThis is used by the parent wdpr-tab-bar to manage the active state."
                },
                "complexType": {
                    "original": "{ tabElement: unknown }",
                    "resolved": "{ tabElement: unknown; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-tab.js.map
