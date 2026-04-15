import { h } from "@stencil/core";
export class WdprMediaPlayerControlCaptionsToggle {
    enabled = false;
    isDisabled = false;
    wdprCaptionsToggle;
    _onClick = () => {
        this.wdprCaptionsToggle.emit();
    };
    render() {
        return (h("button", { key: 'e5958374ed22d2fa10d2a5a7fb82ecb13672db92', class: containerButtonClasses, "aria-label": "Toggle closed captions", "aria-pressed": this.enabled, disabled: this.isDisabled, onClick: this._onClick }, this.enabled ? (h("wdpr-icon-library", { size: "medium", icon: "media-closed-caption-on", decorative: true })) : (h("wdpr-icon-library", { size: "medium", icon: "video-closed-captioning", decorative: true }))));
    }
    static get is() { return "wdpr-media-player-control-captions-toggle"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "enabled": {
                "type": "boolean",
                "attribute": "enabled",
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
            "isDisabled": {
                "type": "boolean",
                "attribute": "is-disabled",
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
                "method": "wdprCaptionsToggle",
                "name": "wdprCaptionsToggle",
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
const containerButtonClasses = `
    cursor-pointer p-025 flex items-center rounded-pill border border-transparent
    focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
    text-icon-actionable-inverse-default bg-transparent
    disabled:cursor-not-allowed disabled:opacity-500
`;
//# sourceMappingURL=wdpr-media-player-closed-captions-toggle.js.map
