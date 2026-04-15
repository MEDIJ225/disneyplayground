import { h } from "@stencil/core";
export class WdprMediaPlayerControlPlayToggle {
    playing = false;
    variant = 'overlay';
    isDisabled = false;
    wdprPlayToggle;
    _onClick = () => {
        this.wdprPlayToggle.emit();
    };
    render() {
        const isOverlay = this.variant === 'overlay';
        const size = isOverlay ? 'xlarge' : 'medium';
        return (h("button", { key: '3fe1dbded40d9ea8a0c50036d8cec6d4cd45afc5', type: "button", class: {
                [controlBarClasses]: !isOverlay,
                [overlayChipClasses]: isOverlay,
            }, disabled: this.isDisabled, onClick: this._onClick, "aria-label": this.playing ? 'Pause' : 'Play' }, this.playing ? h("wdpr-icon-library", { size: size, icon: "media-pause-1", decorative: true }) : h("wdpr-icon-library", { size: size, icon: "media-play-1", decorative: true })));
    }
    static get is() { return "wdpr-media-player-control-play-toggle"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "playing": {
                "type": "boolean",
                "attribute": "playing",
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
                "method": "wdprPlayToggle",
                "name": "wdprPlayToggle",
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
  cursor-pointer p-025 flex items-center relative rounded-pill border border-transparent
  focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
  text-icon-actionable-inverse-default bg-transparent
  disabled:cursor-not-allowed disabled:opacity-500
`;
const overlayChipClasses = `
  cursor-pointer flex items-center justify-center relative rounded-pill border border-transparent
  w-[40px] h-[40px]
  focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
  text-icon-actionable-inverse-default disabled:cursor-not-allowed
  elevation-xsmall-soft
  bg-surface-actionable-alt-default-a78 hover:bg-surface-actionable-alt-hover-a88 active:bg-surface-actionable-alt-pressed disabled:bg-surface-actionable-alt-disabled
`;
//# sourceMappingURL=wdpr-media-player-play-toggle.js.map
