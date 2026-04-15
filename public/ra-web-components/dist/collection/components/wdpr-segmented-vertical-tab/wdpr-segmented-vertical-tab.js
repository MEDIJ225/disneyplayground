import { h, Host } from "@stencil/core";
export class WdprSegmentedVerticalTab {
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
     * The id of the element that this tab controls
     * @type {string}
     */
    controlsId;
    /**
     * The tabindex of the tab
     * @type {number}
     */
    customTabIndex;
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
        return (h(Host, { key: '4c532137e820185f0768be6f3b12fe0dae4aeb90', id: this.tabId, role: "tab", "aria-selected": this.active ? 'true' : 'false', "aria-controls": this.controlsId, "aria-disabled": this.disabled ? 'true' : undefined, tabindex: this.disabled ? -1 : (this.customTabIndex ?? 0), onClick: this._handleClick, disabled: this.disabled }, h("div", { key: 'a78079584016aebfe9a72186e5834087b202b16b', class: "segmented-vertical-tab-icon-wrapper" }, this.icon && h("wdpr-icon-library", { key: '600a93e3e8ac14b03e673f1c264f4aac2581316b', icon: this.icon, size: "medium", decorative: true }), this.secondaryLabel && !this.icon && h("span", { key: '9d4578bccff3531d5af2aedbbf19b542c1e237a7', class: "segmented-vertical-tab-secondary-label" }, this.secondaryLabel)), h("span", { key: '39c54577bfc704551dd02c40e6b8881b929c1daf', class: "segmented-vertical-tab-main-label" }, this.label)));
    }
    static get is() { return "wdpr-segmented-vertical-tab"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-segmented-vertical-tab.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-segmented-vertical-tab.css"]
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
//# sourceMappingURL=wdpr-segmented-vertical-tab.js.map
