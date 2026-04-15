import { h, Host } from "@stencil/core";
import { propagateToSlot } from "../../utils/utils";
/**
 * @deprecated Use `wdpr-card-micro` starting in release 3.0.4. `wdpr-guest-card` will be removed in a future major release.
 */
export class WdprGuestCard {
    el;
    isOnSurface = false;
    actionPosition = 'none';
    mediaPosition = 'leading';
    fullWidth = false;
    disabled = false;
    headingLevel = 'h3';
    a11yLabel;
    selected = false;
    wdprSelectedChange;
    componentWillLoad() {
        console.warn('The wdpr-guest-card component is deprecated and will be removed in a future major release');
    }
    componentDidLoad() {
        const slot = this.el.shadowRoot?.querySelector('slot[name="content"]');
        propagateToSlot(slot, 'headingLevel', this.headingLevel, 'wdpr-card-micro-content', 'heading-level');
    }
    _handleSelectedChange = (event) => {
        event.stopPropagation();
        this.wdprSelectedChange.emit(event.detail);
    };
    render() {
        return (h(Host, { key: 'e4c5fe47da85fb3cebc4140ec1cfbcc46686ec37' }, h("wdpr-card-micro", { key: 'e5451d3b494eebcf63bd55f78996259f8e5065bf', mediaPosition: this.mediaPosition, fullWidth: this.fullWidth, actionPosition: this.actionPosition, isOnSurface: this.isOnSurface, disabled: this.disabled, a11yLabel: this.a11yLabel, selected: this.selected, onWdprSelectedChange: this._handleSelectedChange }, h("slot", { key: '6bd2de8dbcfe05f5cec1d6c6c0208c38a707dde7', name: "media", slot: "media" }), h("slot", { key: '18c163977d5c57a384d541be21a1a01419316510', name: "content", slot: "content" }), h("slot", { key: 'bd390fa629ad3faab348eb631d3f319736ca8464', name: "link", slot: "link" }), h("slot", { key: '43670355b50982bdff5c995b02ceb16255f533bf', name: "footer", slot: "footer" }))));
    }
    static get is() { return "wdpr-guest-card"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host { display: block; }\n    :host([full-width]) { width: 100%; }\n    :host([disabled]) {\n      pointer-events: none;\n      opacity: 0.5;\n    }"; }
    static get properties() {
        return {
            "isOnSurface": {
                "type": "boolean",
                "attribute": "is-on-surface",
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
                "reflect": false,
                "defaultValue": "false"
            },
            "actionPosition": {
                "type": "string",
                "attribute": "action-position",
                "mutable": false,
                "complexType": {
                    "original": "ActionPosition",
                    "resolved": "\"leading\" | \"none\" | \"trailing\"",
                    "references": {
                        "ActionPosition": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-guest-card/wdpr-guest-card.tsx",
                            "id": "src/components/wdpr-guest-card/wdpr-guest-card.tsx::ActionPosition"
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
                "defaultValue": "'none'"
            },
            "mediaPosition": {
                "type": "string",
                "attribute": "media-position",
                "mutable": false,
                "complexType": {
                    "original": "MediaPosition",
                    "resolved": "\"leading\" | \"none\" | \"trailing\"",
                    "references": {
                        "MediaPosition": {
                            "location": "import",
                            "path": "../../components",
                            "id": "src/components.d.ts::MediaPosition"
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
                "defaultValue": "'leading'"
            },
            "fullWidth": {
                "type": "boolean",
                "attribute": "full-width",
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
            "headingLevel": {
                "type": "string",
                "attribute": "heading-level",
                "mutable": false,
                "complexType": {
                    "original": "HeadingLevel",
                    "resolved": "\"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\"",
                    "references": {
                        "HeadingLevel": {
                            "location": "import",
                            "path": "../../models/card.model",
                            "id": "src/models/card.model.ts::HeadingLevel"
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
                "defaultValue": "'h3'"
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
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "wdprSelectedChange",
                "name": "wdprSelectedChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ selected: boolean }",
                    "resolved": "{ selected: boolean; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-guest-card.js.map
