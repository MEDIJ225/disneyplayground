import { Fragment, h } from "@stencil/core";
export class WdprMediaPlayerControl {
    playing = false;
    muted = false;
    isFullscreen = false;
    captionsEnabled = false;
    currentTime = 0;
    duration = 0;
    showControls = true;
    showTime = true;
    showCaptionsToggle = true;
    showMuteToggle = true;
    showFullscreenButton = true;
    showPlayToggleOnControl = true;
    showProgressBar = true;
    showAudioChip = false;
    vertical = false;
    loading = false;
    wdprFullscreenToggle;
    _formatTime(sec) {
        if (!Number.isFinite(sec) || sec < 0)
            return '0:00';
        const s = Math.floor(sec % 60)
            .toString()
            .padStart(2, '0');
        const m = Math.floor((sec / 60) % 60).toString();
        const h = Math.floor(sec / 3600);
        return h > 0 ? `${h}:${m.padStart(2, '0')}:${s}` : `${m}:${s}`;
    }
    render() {
        return (h("div", { key: 'fea011c31e409a17be8284f367f437c613d01051', class: "absolute inset-0" }, h("div", { key: 'ee6aef4b793972734e9aad606ab4b0a25697d610', class: `absolute inset-0 z-30 flex justify-center pointer-events-none ${!this.isFullscreen && 'items-center'}` }, this.isFullscreen ? (h("div", { class: "absolute flex justify-between w-full pointer-events-auto" }, h("button", { "aria-label": "Go back", class: "cursor-pointer m-200 ml-300 p-025 rounded-pill text-icon-actionable-inverse-default bg-surface-actionable-alt-default-a78 hover:bg-surface-actionable-alt-hover-a88 active:bg-surface-actionable-alt-pressed elevation-xsmall-soft focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2", onClick: () => this.wdprFullscreenToggle.emit() }, h("wdpr-icon-library", { size: "large", icon: "back-thick" })), h("button", { "aria-label": "Exit fullscreen", class: "cursor-pointer m-200 mr-300 p-025 rounded-pill text-icon-actionable-inverse-default bg-surface-actionable-alt-default-a78 hover:bg-surface-actionable-alt-hover-a88 active:bg-surface-actionable-alt-pressed elevation-xsmall-soft focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2", onClick: () => this.wdprFullscreenToggle.emit() }, h("wdpr-icon-library", { size: "large", icon: "close-reversed" })))) : (!this.loading && (h("div", { class: "pointer-events-auto" }, h("wdpr-media-player-control-play-toggle", { playing: this.playing }))))), this.showControls ? (h("div", { class: "absolute inset-0 z-20" }, h("div", { class: {
                'absolute inset-x-0 bottom-0': true,
                'h-dimension-1000': this.vertical,
            } }, h("div", { class: {
                'relative p-100 flex flex-col gap-100 bg-surface-actionable-alt-default-a78': true,
                'pb-000': this.vertical,
            } }, this.showProgressBar && h("wdpr-media-player-control-progress-bar", { currentTime: this.currentTime, duration: this.duration }), h("div", { class: "flex items-center justify-between gap-100" }, h("div", { class: "flex items-center gap-100" }, this.showPlayToggleOnControl && h("wdpr-media-player-control-play-toggle", { playing: this.playing, variant: "control" }), this.showTime && (h(Fragment, null, h("span", { class: timeTextClasses }, this._formatTime(this.currentTime)), h("span", { class: timeTextClasses }, this._formatTime(this.duration))))), h("div", { class: "flex items-center gap-100" }, this.showCaptionsToggle && h("wdpr-media-player-control-captions-toggle", { enabled: this.captionsEnabled }), this.showMuteToggle && h("wdpr-media-player-control-mute-toggle", { muted: this.muted, variant: "control" }), this.showFullscreenButton && !this.isFullscreen && h("wdpr-media-player-control-fullscreen-toggle", null))))))) : null));
    }
    static get is() { return "wdpr-media-player-control"; }
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
            "isFullscreen": {
                "type": "boolean",
                "attribute": "is-fullscreen",
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
            "captionsEnabled": {
                "type": "boolean",
                "attribute": "captions-enabled",
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
            "currentTime": {
                "type": "number",
                "attribute": "current-time",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "defaultValue": "0"
            },
            "duration": {
                "type": "number",
                "attribute": "duration",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "defaultValue": "0"
            },
            "showControls": {
                "type": "boolean",
                "attribute": "show-controls",
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
                "defaultValue": "true"
            },
            "showTime": {
                "type": "boolean",
                "attribute": "show-time",
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
                "defaultValue": "true"
            },
            "showCaptionsToggle": {
                "type": "boolean",
                "attribute": "show-captions-toggle",
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
                "defaultValue": "true"
            },
            "showMuteToggle": {
                "type": "boolean",
                "attribute": "show-mute-toggle",
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
                "defaultValue": "true"
            },
            "showFullscreenButton": {
                "type": "boolean",
                "attribute": "show-fullscreen-button",
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
                "defaultValue": "true"
            },
            "showPlayToggleOnControl": {
                "type": "boolean",
                "attribute": "show-play-toggle-on-control",
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
                "defaultValue": "true"
            },
            "showProgressBar": {
                "type": "boolean",
                "attribute": "show-progress-bar",
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
                "defaultValue": "true"
            },
            "showAudioChip": {
                "type": "boolean",
                "attribute": "show-audio-chip",
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
            "vertical": {
                "type": "boolean",
                "attribute": "vertical",
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
            "loading": {
                "type": "boolean",
                "attribute": "loading",
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
const timeTextClasses = 'select-none text-body-medium text-icon-actionable-inverse-default';
//# sourceMappingURL=wdpr-media-player-control.js.map
