import { h } from "@stencil/core";
export class WdprMediaPlayerFullscreenToggle {
    isDisabled = false;
    wdprFullscreenToggle;
    render() {
        return (h("button", { key: '1c1780ccaebc4c523a99d05ec7a10208d85ef5f4', class: containerButtonClasses, "aria-label": "Toggle fullscreen", disabled: this.isDisabled, onClick: () => this.wdprFullscreenToggle.emit() }, h("wdpr-icon-library", { key: '0a61099fa1540c7fc4e441bf83b892c682aa3978', size: "medium", icon: "expand-gallery", decorative: true })));
    }
    static get is() { return "wdpr-media-player-control-fullscreen-toggle"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
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
                "method": "wdprFullscreenToggle",
                "name": "wdprFullscreenToggle",
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
//# sourceMappingURL=wdpr-media-player-fullscreen-toggle.js.map
