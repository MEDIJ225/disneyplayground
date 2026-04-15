import { p as proxyCustomElement, H, c as createEvent, h, F as Fragment } from './p-BRIGwGQo.js';
import { d as defineCustomElement$6 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$5 } from './p-xvJdrGIb.js';
import { d as defineCustomElement$4 } from './p-6RXpvZTG.js';
import { d as defineCustomElement$3 } from './p-kVH2iNn4.js';
import { d as defineCustomElement$2 } from './p-BdrKNE06.js';
import { d as defineCustomElement$1 } from './p-DJIJz3tl.js';

const WdprMediaPlayerControl = /*@__PURE__*/ proxyCustomElement(class WdprMediaPlayerControl extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprFullscreenToggle = createEvent(this, "wdprFullscreenToggle", 7);
    }
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
}, [257, "wdpr-media-player-control", {
        "playing": [4],
        "muted": [4],
        "isFullscreen": [4, "is-fullscreen"],
        "captionsEnabled": [4, "captions-enabled"],
        "currentTime": [2, "current-time"],
        "duration": [2],
        "showControls": [4, "show-controls"],
        "showTime": [4, "show-time"],
        "showCaptionsToggle": [4, "show-captions-toggle"],
        "showMuteToggle": [4, "show-mute-toggle"],
        "showFullscreenButton": [4, "show-fullscreen-button"],
        "showPlayToggleOnControl": [4, "show-play-toggle-on-control"],
        "showProgressBar": [4, "show-progress-bar"],
        "showAudioChip": [4, "show-audio-chip"],
        "vertical": [4],
        "loading": [4]
    }]);
const timeTextClasses = 'select-none text-body-medium text-icon-actionable-inverse-default';
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-media-player-control", "wdpr-icon-library", "wdpr-media-player-control-captions-toggle", "wdpr-media-player-control-fullscreen-toggle", "wdpr-media-player-control-mute-toggle", "wdpr-media-player-control-play-toggle", "wdpr-media-player-control-progress-bar"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-media-player-control":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprMediaPlayerControl);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "wdpr-media-player-control-captions-toggle":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-media-player-control-fullscreen-toggle":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-media-player-control-mute-toggle":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-media-player-control-play-toggle":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "wdpr-media-player-control-progress-bar":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprMediaPlayerControl as W, defineCustomElement as d };
//# sourceMappingURL=p-DQhbm-Ru.js.map

//# sourceMappingURL=p-DQhbm-Ru.js.map