import { h } from "@stencil/core";
export class WdprMediaPlayerControlMuteToggle {
    muted = false;
    variant = 'overlay';
    isDisabled = false;
    wdprMuteToggle;
    _onClick = () => {
        this.wdprMuteToggle.emit();
    };
    render() {
        const isOverlay = this.variant === 'overlay';
        const iconSize = isOverlay ? 'small' : 'medium';
        return (h("button", { key: '6035fccf284feab808ac9cc2a2ec47dafc3be90b', class: {
                [controlBarClasses]: !isOverlay,
                [overlayChipClasses]: isOverlay,
                'w-[24px] h-[24px]': isOverlay,
            }, "aria-label": this.muted ? 'Unmute' : 'Mute', disabled: this.isDisabled, onClick: this._onClick }, this.muted ? (h("wdpr-icon-library", { size: iconSize, icon: "media-mute", decorative: true })) : (h("wdpr-icon-library", { size: iconSize, icon: "media-unmute", decorative: true }))));
    }
    static get is() { return "wdpr-media-player-control-mute-toggle"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "muted": {
                "type": "boolean",
                "attribute": "muted",
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
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "'overlay' | 'control'",
                    "resolved": "\"control\" | \"overlay\"",
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
                "defaultValue": "'overlay'"
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
                "method": "wdprMuteToggle",
                "name": "wdprMuteToggle",
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
const controlBarClasses = `
  cursor-pointer p-025 flex items-center rounded-pill border border-transparent
  focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
  text-icon-actionable-inverse-default bg-transparent
  disabled:cursor-not-allowed disabled:opacity-500
`;
const overlayChipClasses = `
  cursor-pointer p-025 flex items-center justify-center rounded-pill border border-transparent
  focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
  text-icon-actionable-inverse-default disabled:cursor-not-allowed
  elevation-xsmall-soft
  bg-surface-actionable-alt-default-a78 hover:bg-surface-actionable-alt-hover-a88 active:bg-surface-actionable-alt-pressed disabled:bg-surface-actionable-alt-disabled
`;
//# sourceMappingURL=wdpr-media-player-mute-toggle.js.map
