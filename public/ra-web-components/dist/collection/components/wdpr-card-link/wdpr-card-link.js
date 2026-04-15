import { h } from "@stencil/core";
/**
 * Card link component: renders a button, caret, ellipses, radio, checkbox, or custom slot content.
 */
export class WdprCardLink {
    el;
    type = 'button';
    disabled = false;
    checked = false;
    name;
    value;
    a11yLabel;
    clicked;
    _handleClick = (e) => {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if (this.type === 'button' || this.type === 'caret' || this.type === 'ellipses' || this.type === 'radio' || this.type === 'checkbox' || this.type === 'slot') {
            e.preventDefault();
            e.stopPropagation();
            this.clicked.emit();
        }
    };
    render() {
        if (this.type === 'button') {
            return (h("wdpr-button", { variant: "secondary", a11yLabel: "Card Button", size: "small", disabled: this.disabled, onClick: this._handleClick }, h("slot", null)));
        }
        if (this.type === 'caret') {
            return (h("wdpr-icon-button", { iconName: "next-caret-2.0", size: "small", disabled: this.disabled, a11yLabel: "Card Caret Link", onClick: this._handleClick, onClicked: e => e.stopPropagation(), "aria-disabled": this.disabled ? 'true' : 'false' }));
        }
        if (this.type === 'ellipses') {
            return (h("wdpr-icon-button", { iconName: "more", size: "small", disabled: this.disabled, a11yLabel: this.a11yLabel || 'More options', onClick: this._handleClick, "aria-disabled": this.disabled ? 'true' : 'false' }));
        }
        if (this.type === 'radio') {
            return h("wdpr-radio-button", { onClick: this._handleClick, name: "option", value: "option1", customAriaLabel: this.a11yLabel, disabled: this.disabled });
        }
        if (this.type === 'checkbox') {
            return h("wdpr-checkbox", { onClick: this._handleClick, checked: this.checked, labelPosition: "none", customAriaLabel: this.a11yLabel, disabled: this.disabled });
        }
        if (this.type === 'slot') {
            return (h("div", { onClick: this._handleClick }, h("slot", null)));
        }
    }
    static get is() { return "wdpr-card-link"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host {\n      display: flex;\n      align-items: center;\n    }"; }
    static get properties() {
        return {
            "type": {
                "type": "string",
                "attribute": "type",
                "mutable": false,
                "complexType": {
                    "original": "CardLinkType",
                    "resolved": "\"button\" | \"caret\" | \"checkbox\" | \"ellipses\" | \"radio\" | \"slot\"",
                    "references": {
                        "CardLinkType": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-card-link/wdpr-card-link.tsx",
                            "id": "src/components/wdpr-card-link/wdpr-card-link.tsx::CardLinkType"
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
                "defaultValue": "'button'"
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "checked": {
                "type": "boolean",
                "attribute": "checked",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "name": {
                "type": "string",
                "attribute": "name",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
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
                "optional": true,
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
                "optional": true,
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
                "method": "clicked",
                "name": "clicked",
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
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-card-link.js.map
