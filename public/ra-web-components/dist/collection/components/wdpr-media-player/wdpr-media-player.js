import { h } from "@stencil/core";
export class WdprMediaPlayer {
    videoEl;
    trackEl;
    autoHideControlTimer;
    host;
    _playing = false;
    _muted = false;
    _currentTime = 0;
    _duration = 0;
    _captionsEnabled = false;
    _isFullscreen = false;
    _activeCaption = '';
    _controlIdle = false;
    _isVertical = false;
    src;
    poster;
    captionsSrc;
    captionsLang = 'en';
    captionsLabel = 'CC';
    autoHideMs = 2000;
    showControls = true;
    showTime = true;
    showCaptionsToggle = true;
    showMuteToggle = true;
    showFullscreenButton = true;
    showPlayToggleOnControl = true;
    showProgressBar = true;
    showAudioChip = false;
    captionsPosition = 'top';
    loading = false;
    onPlayingChange(isPlaying) {
        if (!isPlaying) {
            this._controlIdle = false;
            this._clearAutoHideTimer();
        }
        else {
            this._showControlsTemporarily();
        }
    }
    onPlayToggle() {
        this._togglePlay();
        this._showControlsTemporarily();
    }
    onMuteToggle() {
        this._toggleMute();
        this._showControlsTemporarily();
    }
    onCaptionsToggle() {
        this._captionsEnabled = !this._captionsEnabled;
        this._showControlsTemporarily();
    }
    onProgressBarTimeChange(timeChangeEvent) {
        this._progressBarTimeChange(timeChangeEvent.detail.time);
        this._showControlsTemporarily();
    }
    onFullscreenToggle() {
        this._toggleFullscreen();
        this._showControlsTemporarily();
    }
    componentDidLoad() {
        this.videoEl = this.host.shadowRoot?.querySelector('video') ?? undefined;
        this.trackEl = this.host.shadowRoot?.querySelector('track') ?? undefined;
        if (!this.videoEl)
            return;
        this.videoEl.addEventListener('loadedmetadata', this._onLoadedMetadata);
        this.videoEl.addEventListener('timeupdate', this._syncFromVideo);
        this.videoEl.addEventListener('play', this._syncFromVideo);
        this.videoEl.addEventListener('pause', this._syncFromVideo);
        this.videoEl.addEventListener('volumechange', this._syncFromVideo);
        document.addEventListener('fullscreenchange', this._onFullscreenChange);
        this._setupCaptionsOverlay();
        this._syncFromVideo();
    }
    disconnectedCallback() {
        this._clearAutoHideTimer();
        this._teardownCaptionsOverlay();
        document.removeEventListener('fullscreenchange', this._onFullscreenChange);
    }
    _onLoadedMetadata = () => {
        const videoElement = this.videoEl;
        if (!videoElement)
            return;
        this._isVertical = videoElement.videoHeight > videoElement.videoWidth;
        this._syncFromVideo();
    };
    _showControlsTemporarily() {
        this._controlIdle = false;
        this._resetAutoHide();
    }
    _resetAutoHide() {
        this._clearAutoHideTimer();
        if (!this._playing)
            return;
        this.autoHideControlTimer = window.setTimeout(() => {
            if (this._playing)
                this._controlIdle = true;
        }, this.autoHideMs);
    }
    _clearAutoHideTimer() {
        if (this.autoHideControlTimer)
            window.clearTimeout(this.autoHideControlTimer);
        this.autoHideControlTimer = undefined;
    }
    _onPlayerClick = (e) => {
        const path = (e.composedPath?.() ?? []);
        const clickedControl = path.some(el => el?.tagName?.toLowerCase() === 'wdpr-media-player-control');
        if (!clickedControl)
            this._showControlsTemporarily();
    };
    _syncFromVideo = () => {
        const videoElement = this.videoEl;
        if (!videoElement)
            return;
        this._playing = !videoElement.paused && !videoElement.ended;
        this._muted = videoElement.muted || videoElement.volume === 0;
        this._currentTime = videoElement.currentTime || 0;
        this._duration = Number.isFinite(videoElement.duration) ? videoElement.duration : 0;
        this._isFullscreen = !!document.fullscreenElement;
    };
    _togglePlay = async () => {
        const videoElement = this.videoEl;
        if (!videoElement)
            return;
        if (videoElement.paused) {
            await videoElement.play();
        }
        else {
            videoElement.pause();
        }
    };
    _toggleMute = () => {
        if (this.videoEl)
            this.videoEl.muted = !this.videoEl.muted;
    };
    _progressBarTimeChange(time) {
        if (!this.videoEl)
            return;
        this.videoEl.currentTime = Math.min(Math.max(time, 0), this._duration || 0);
    }
    _toggleFullscreen = async () => {
        const videoElement = this.videoEl;
        if (!videoElement)
            return;
        if (typeof videoElement.webkitEnterFullscreen === 'function') {
            videoElement.webkitEnterFullscreen();
            return;
        }
        const container = this.host.shadowRoot?.querySelector('.player');
        if (!container)
            return;
        if (!document.fullscreenElement)
            await container.requestFullscreen();
        else
            await document.exitFullscreen();
    };
    _onFullscreenChange = () => {
        this._isFullscreen = !!document.fullscreenElement;
    };
    /* ---------------- captions ---------------- */
    _onCueChange = () => {
        if (!this._captionsEnabled) {
            this._activeCaption = '';
            return;
        }
        const cues = this.trackEl?.track?.activeCues;
        const cue = cues && cues.length ? cues[0] : null;
        this._activeCaption = cue?.text ?? '';
    };
    _setupCaptionsOverlay() {
        if (!this.trackEl?.track)
            return;
        this.trackEl.track.mode = 'hidden';
        this.trackEl.track.addEventListener('cuechange', this._onCueChange);
    }
    _teardownCaptionsOverlay() {
        this.trackEl?.track?.removeEventListener('cuechange', this._onCueChange);
    }
    render() {
        const captionsPositionClasses = this.captionsPosition === 'top' ? 'top-250' : this._isVertical ? 'bottom-24' : 'bottom-14';
        return (h("div", { key: 'ce9fffc710e020024c49874d664558ade6b4fc17', class: {
                'player relative isolate w-full overflow-hidden': true,
                'control-idle': this._playing && this._controlIdle,
                'pointer-events-none': this.loading,
            }, "aria-busy": this.loading, onMouseMove: () => this._showControlsTemporarily(), onMouseDown: () => this._showControlsTemporarily(), onKeyDown: () => this._showControlsTemporarily(), onClick: this._onPlayerClick, onTouchStart: () => this._showControlsTemporarily() }, this.loading && (h("span", { key: 'ed7101d15269d4e39bb50e42ec527ff3132dcd36', role: "status", "aria-live": "polite", class: "sr-only" }, "Loading media player")), h("div", { key: '961b8cabdac06c119de82193b80d18ef99ce25a2', class: {
                'relative w-full': true,
                'max-h-screen': this._isVertical,
            }, style: {
                aspectRatio: this._isVertical ? '9 / 16' : '16 / 9',
            }, inert: this.loading ? true : undefined }, h("video", { key: '111d94042b7b1fcf6cb685d941f75ebabb16fbb6', ref: el => (this.videoEl = el), class: {
                'absolute inset-0 h-full w-full': true,
                'object-cover': !this._isVertical,
                'object-contain bg-black': this._isVertical,
            }, src: this.src, poster: this.poster, playsInline: true }, this.captionsSrc ? (h("track", { ref: el => (this.trackEl = el), kind: "captions", src: this.captionsSrc, srcLang: this.captionsLang, label: this.captionsLabel, default: true })) : null), this._captionsEnabled && this._activeCaption ? (h("div", { class: `pointer-events-none absolute inset-x-0 z-30 flex justify-center ${captionsPositionClasses}` }, h("div", { class: "captions" }, this._activeCaption))) : null, this.showAudioChip && h("wdpr-media-player-control-mute-toggle", { key: 'f8553291a4a0047b86cb639f8e624a0a7254bfcb', class: "absolute bottom-200 right-200 audio-chip", muted: this._muted, variant: "overlay" }), this.loading && (h("div", { key: '247dee4aeb95373f3e16f5787fa4788a267ea4e3', class: "absolute inset-0 z-30 flex items-center justify-center pointer-events-none bg-page-overlay-disabled" }, h("wdpr-radial-loader", { key: 'd21ed057e4e48ac0a790ad07bc1f8fdf4a22ae0a', showLabel: false, size: "medium" }))), h("wdpr-media-player-control", { key: 'c9a1edb663574f8ca45ae923659b766a466e58b4', class: "absolute inset-0 z-20 transition-opacity duration-200 controls", playing: this._playing, muted: this._muted, isFullscreen: this._isFullscreen, captionsEnabled: this._captionsEnabled, currentTime: this._currentTime, duration: this._duration, showControls: this.showControls, showTime: this.showTime, showCaptionsToggle: this.showCaptionsToggle, showMuteToggle: this.showMuteToggle, showFullscreenButton: this.showFullscreenButton, showPlayToggleOnControl: this.showPlayToggleOnControl, showProgressBar: this.showProgressBar, vertical: this._isVertical, loading: this.loading }))));
    }
    static get is() { return "wdpr-media-player"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-media-player.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-media-player.css"]
        };
    }
    static get properties() {
        return {
            "src": {
                "type": "string",
                "attribute": "src",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "poster": {
                "type": "string",
                "attribute": "poster",
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
            "captionsSrc": {
                "type": "string",
                "attribute": "captions-src",
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
            "captionsLang": {
                "type": "string",
                "attribute": "captions-lang",
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
                "reflect": false,
                "defaultValue": "'en'"
            },
            "captionsLabel": {
                "type": "string",
                "attribute": "captions-label",
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
                "reflect": false,
                "defaultValue": "'CC'"
            },
            "autoHideMs": {
                "type": "number",
                "attribute": "auto-hide-ms",
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
                "defaultValue": "2000"
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
            "captionsPosition": {
                "type": "string",
                "attribute": "captions-position",
                "mutable": false,
                "complexType": {
                    "original": "'top' | 'bottom'",
                    "resolved": "\"bottom\" | \"top\"",
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
                "defaultValue": "'top'"
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
    static get states() {
        return {
            "_playing": {},
            "_muted": {},
            "_currentTime": {},
            "_duration": {},
            "_captionsEnabled": {},
            "_isFullscreen": {},
            "_activeCaption": {},
            "_controlIdle": {},
            "_isVertical": {}
        };
    }
    static get elementRef() { return "host"; }
    static get watchers() {
        return [{
                "propName": "playing",
                "methodName": "onPlayingChange"
            }];
    }
    static get listeners() {
        return [{
                "name": "wdprPlayToggle",
                "method": "onPlayToggle",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "wdprMuteToggle",
                "method": "onMuteToggle",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "wdprCaptionsToggle",
                "method": "onCaptionsToggle",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "wdprBarTimeChange",
                "method": "onProgressBarTimeChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "wdprFullscreenToggle",
                "method": "onFullscreenToggle",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-media-player.js.map
