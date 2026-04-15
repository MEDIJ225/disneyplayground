'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprMediaHero360Chip = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.view360Toggle = index.createEvent(this, "view360Toggle", 7);
    }
    isDisabled = false;
    view360Toggle;
    render() {
        return (index.h("button", { key: '215177f9f29263153274f8c8b3869aa6058fe64f', type: "button", class: chipClasses, disabled: this.isDisabled, onClick: () => !this.isDisabled && this.view360Toggle.emit(), "aria-label": "View in 360 degrees" }, index.h("wdpr-icon-library", { key: '1cdd51efb1d6307541442137d22c55ee3b2f7dd3', size: "xlarge", icon: "360-video", decorative: true })));
    }
};
const chipClasses = `
  cursor-pointer rounded-full flex items-center justify-center
  w-[40px] h-[40px]
  bg-surface-actionable-alt-default-a68
  text-icon-actionable-inverse-default
  hover:bg-surface-actionable-alt-hover active:bg-surface-actionable-alt-pressed
  focus:outline-none focus-visible:outline-focus focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid focus-visible:outline-offset-2
  disabled:opacity-500 disabled:cursor-not-allowed
  transition-colors duration-150
`;

const wdprMediaPlayerCss = ":host{display:block;width:100%;height:100%}.controls{opacity:0;pointer-events:none;transition:opacity 150ms ease}.audio-chip{opacity:1;pointer-events:none}@media (hover:hover) and (pointer: fine){.player:hover .controls,.player:focus-within .controls{opacity:1;pointer-events:auto}.player:hover .audio-chip,.player:focus-within .audio-chip{opacity:0;pointer-events:none}}.player.control-idle:hover .controls,.player.control-idle:focus-within .controls{opacity:0;pointer-events:none}.player.control-idle:hover .audio-chip,.player.control-idle:focus-within .audio-chip{opacity:1}.captions{text-align:center;font-family:var(--default-font-family);font-size:var(--text-heading-medium);font-style:normal;font-weight:700;line-height:var(--leading-body-large);color:var(--color-text-actionable-inverse-default);text-shadow:1px 1px 3px #333;text-overflow:ellipsis;white-space:pre-line}";

const WdprMediaPlayer = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    videoEl;
    trackEl;
    autoHideControlTimer;
    get host() { return index.getElement(this); }
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
        return (index.h("div", { key: 'ce9fffc710e020024c49874d664558ade6b4fc17', class: {
                'player relative isolate w-full overflow-hidden': true,
                'control-idle': this._playing && this._controlIdle,
                'pointer-events-none': this.loading,
            }, "aria-busy": this.loading, onMouseMove: () => this._showControlsTemporarily(), onMouseDown: () => this._showControlsTemporarily(), onKeyDown: () => this._showControlsTemporarily(), onClick: this._onPlayerClick, onTouchStart: () => this._showControlsTemporarily() }, this.loading && (index.h("span", { key: 'ed7101d15269d4e39bb50e42ec527ff3132dcd36', role: "status", "aria-live": "polite", class: "sr-only" }, "Loading media player")), index.h("div", { key: '961b8cabdac06c119de82193b80d18ef99ce25a2', class: {
                'relative w-full': true,
                'max-h-screen': this._isVertical,
            }, style: {
                aspectRatio: this._isVertical ? '9 / 16' : '16 / 9',
            }, inert: this.loading ? true : undefined }, index.h("video", { key: '111d94042b7b1fcf6cb685d941f75ebabb16fbb6', ref: el => (this.videoEl = el), class: {
                'absolute inset-0 h-full w-full': true,
                'object-cover': !this._isVertical,
                'object-contain bg-black': this._isVertical,
            }, src: this.src, poster: this.poster, playsInline: true }, this.captionsSrc ? (index.h("track", { ref: el => (this.trackEl = el), kind: "captions", src: this.captionsSrc, srcLang: this.captionsLang, label: this.captionsLabel, default: true })) : null), this._captionsEnabled && this._activeCaption ? (index.h("div", { class: `pointer-events-none absolute inset-x-0 z-30 flex justify-center ${captionsPositionClasses}` }, index.h("div", { class: "captions" }, this._activeCaption))) : null, this.showAudioChip && index.h("wdpr-media-player-control-mute-toggle", { key: 'f8553291a4a0047b86cb639f8e624a0a7254bfcb', class: "absolute bottom-200 right-200 audio-chip", muted: this._muted, variant: "overlay" }), this.loading && (index.h("div", { key: '247dee4aeb95373f3e16f5787fa4788a267ea4e3', class: "absolute inset-0 z-30 flex items-center justify-center pointer-events-none bg-page-overlay-disabled" }, index.h("wdpr-radial-loader", { key: 'd21ed057e4e48ac0a790ad07bc1f8fdf4a22ae0a', showLabel: false, size: "medium" }))), index.h("wdpr-media-player-control", { key: 'c9a1edb663574f8ca45ae923659b766a466e58b4', class: "absolute inset-0 z-20 transition-opacity duration-200 controls", playing: this._playing, muted: this._muted, isFullscreen: this._isFullscreen, captionsEnabled: this._captionsEnabled, currentTime: this._currentTime, duration: this._duration, showControls: this.showControls, showTime: this.showTime, showCaptionsToggle: this.showCaptionsToggle, showMuteToggle: this.showMuteToggle, showFullscreenButton: this.showFullscreenButton, showPlayToggleOnControl: this.showPlayToggleOnControl, showProgressBar: this.showProgressBar, vertical: this._isVertical, loading: this.loading }))));
    }
    static get watchers() { return {
        "playing": ["onPlayingChange"]
    }; }
};
WdprMediaPlayer.style = wdprMediaPlayerCss;

exports.wdpr_media_hero_360_chip = WdprMediaHero360Chip;
exports.wdpr_media_player = WdprMediaPlayer;
//# sourceMappingURL=wdpr-media-hero-360-chip.wdpr-media-player.entry.cjs.js.map

//# sourceMappingURL=wdpr-media-hero-360-chip_2.cjs.entry.js.map