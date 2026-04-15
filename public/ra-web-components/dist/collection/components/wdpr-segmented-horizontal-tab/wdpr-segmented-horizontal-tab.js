import { h, Host } from "@stencil/core";
export class WdprSegmentedHorizontalTab {
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
    a11yLabel;
    /**
     * Emitted when the tab button is clicked.
     * This is used by the parent wdpr-tab-bar to manage the active state.
     */
    tabClicked;
    _handleClick = () => {
        if (this.disabled) {
            return;
        }
        this.tabClicked.emit({ tabElement: this.el });
    };
    render() {
        return (h(Host, { key: '4691d7ebcf603d739ba63e87461826d80cbe581e', id: this.tabId, role: "tab", tabindex: this.disabled ? -1 : (this.customTabIndex ?? 0), "aria-selected": this.active ? 'true' : 'false', "aria-controls": this.controlsId, "aria-disabled": this.disabled ? 'true' : undefined, "aria-label": this.a11yLabel, onClick: this._handleClick }, this.icon && h("wdpr-icon-library", { key: '164e27312920f51452b736ebad23f917f4a46073', icon: this.icon, size: "medium", decorative: true }), this.label && h("span", { key: 'b3aac18dbaaec0e31e7c5d0d170d88f47215f41f', class: "segmented-horizontal-tab-main-label" }, this.label)));
    }
    static get is() { return "wdpr-segmented-horizontal-tab"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-segmented-horizontal-tab.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-segmented-horizontal-tab.css"]
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
            },
            "a11yLabel": {
                "type": "string",
                "attribute": "a11y-label",
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
//# sourceMappingURL=wdpr-segmented-horizontal-tab.js.map
