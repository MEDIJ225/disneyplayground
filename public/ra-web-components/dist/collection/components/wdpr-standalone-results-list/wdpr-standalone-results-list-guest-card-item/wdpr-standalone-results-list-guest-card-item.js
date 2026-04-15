import { h, Host } from "@stencil/core";
export class WdprStandaloneResultsListGuestCardItem {
    value;
    selected = false;
    disabled = false;
    mode = 'single';
    label;
    description;
    buttonActionText;
    imageSrc;
    singleSelectionActionType = 'none';
    a11yAlt;
    a11yLabel;
    wdprSelect;
    wdprActionClick;
    _handleSelection = (event) => {
        event.stopPropagation();
        if (this.disabled)
            return;
        this.wdprSelect.emit({ value: this.value, selected: event.detail.selected });
    };
    _handleActionClick = (event) => {
        event.stopPropagation();
        this.wdprActionClick.emit();
    };
    render() {
        return (h(Host, { key: '02fd95d97a2263f1b24dcf9674e76b99b64a916b', role: "listitem", "data-standalone-results-list-item": true }, h("wdpr-guest-card", { key: '398a3c20acc199628a61c4712680fcc6a1ce0be3', isOnSurface: false, actionPosition: "trailing", onWdprSelectedChange: this._handleSelection, selected: this.selected, disabled: this.disabled }, h("wdpr-avatar", { key: '9a0306bceb2a213d3f4896adcf03fd4e034deca2', slot: "media", size: "medium", "image-src": this.imageSrc, "alt-text": this.a11yAlt, labelPosition: "stacked", isInteractive: false }), h("wdpr-card-micro-content", { key: '77dbc15dfdc8356fbf49076dd28ff13d413d561a', slot: "content", primaryHeadline: this.label, body: this.description }), this.singleSelectionActionType !== 'none' && this.mode === 'single' && (h("wdpr-card-link", { key: '487537f36806a0466dcaf1ac20b4da6c803fa5a8', slot: "link", type: this.singleSelectionActionType, onClick: this._handleActionClick }, this.buttonActionText)), this.mode === 'multiple' && (h("wdpr-card-link", { key: 'b3005dd9d43c1876226ba08ad2cead0497fd393c', slot: "link", type: "checkbox", a11yLabel: this.a11yLabel, checked: this.selected, onClick: this._handleActionClick })))));
    }
    static get is() { return "wdpr-standalone-results-list-guest-card-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "value": {
                "type": "string",
                "attribute": "value",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "disabled": {
                "type": "boolean",
                "attribute": "disabled",
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
                "defaultValue": "false"
            },
            "mode": {
                "type": "string",
                "attribute": "mode",
                "mutable": false,
                "complexType": {
                    "original": "StandaloneResultListSelectionMode",
                    "resolved": "\"multiple\" | \"single\"",
                    "references": {
                        "StandaloneResultListSelectionMode": {
                            "location": "import",
                            "path": "../wdpr-standalone-results-list.model",
                            "id": "src/components/wdpr-standalone-results-list/wdpr-standalone-results-list.model.ts::StandaloneResultListSelectionMode"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'single'"
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
                    "tags": [],
                    "text": ""
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "buttonActionText": {
                "type": "string",
                "attribute": "button-action-text",
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
            "imageSrc": {
                "type": "string",
                "attribute": "image-src",
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
            "singleSelectionActionType": {
                "type": "string",
                "attribute": "single-selection-action-type",
                "mutable": false,
                "complexType": {
                    "original": "'button' | 'radio' | 'ellipses' | 'none'",
                    "resolved": "\"button\" | \"ellipses\" | \"none\" | \"radio\"",
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
                "reflect": false,
                "defaultValue": "'none'"
            },
            "a11yAlt": {
                "type": "string",
                "attribute": "a11y-alt",
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
                "method": "wdprSelect",
                "name": "wdprSelect",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ value: string; selected: boolean }",
                    "resolved": "{ value: string; selected: boolean; }",
                    "references": {}
                }
            }, {
                "method": "wdprActionClick",
                "name": "wdprActionClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
}
//# sourceMappingURL=wdpr-standalone-results-list-guest-card-item.js.map
