import { r as registerInstance, c as createEvent, h, F as Fragment } from './index-CykM8GCN.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';

const WdprMediaPlayerControl = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
const timeTextClasses = 'select-none text-body-medium text-icon-actionable-inverse-default';

const WdprMediaPlayerControlCaptionsToggle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprCaptionsToggle = createEvent(this, "wdprCaptionsToggle", 7);
    }
    enabled = false;
    isDisabled = false;
    wdprCaptionsToggle;
    _onClick = () => {
        this.wdprCaptionsToggle.emit();
    };
    render() {
        return (h("button", { key: 'e5958374ed22d2fa10d2a5a7fb82ecb13672db92', class: containerButtonClasses$1, "aria-label": "Toggle closed captions", "aria-pressed": this.enabled, disabled: this.isDisabled, onClick: this._onClick }, this.enabled ? (h("wdpr-icon-library", { size: "medium", icon: "media-closed-caption-on", decorative: true })) : (h("wdpr-icon-library", { size: "medium", icon: "video-closed-captioning", decorative: true }))));
    }
};
const containerButtonClasses$1 = `
    cursor-pointer p-025 flex items-center rounded-pill border border-transparent
    focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
    text-icon-actionable-inverse-default bg-transparent
    disabled:cursor-not-allowed disabled:opacity-500
`;

const WdprMediaPlayerFullscreenToggle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprFullscreenToggle = createEvent(this, "wdprFullscreenToggle", 7);
    }
    isDisabled = false;
    wdprFullscreenToggle;
    render() {
        return (h("button", { key: '1c1780ccaebc4c523a99d05ec7a10208d85ef5f4', class: containerButtonClasses, "aria-label": "Toggle fullscreen", disabled: this.isDisabled, onClick: () => this.wdprFullscreenToggle.emit() }, h("wdpr-icon-library", { key: '0a61099fa1540c7fc4e441bf83b892c682aa3978', size: "medium", icon: "expand-gallery", decorative: true })));
    }
};
const containerButtonClasses = `
    cursor-pointer p-025 flex items-center rounded-pill border border-transparent
    focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
    text-icon-actionable-inverse-default bg-transparent
    disabled:cursor-not-allowed disabled:opacity-500
`;

const WdprMediaPlayerControlMuteToggle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprMuteToggle = createEvent(this, "wdprMuteToggle", 7);
    }
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
                [controlBarClasses$1]: !isOverlay,
                [overlayChipClasses$1]: isOverlay,
                'w-[24px] h-[24px]': isOverlay,
            }, "aria-label": this.muted ? 'Unmute' : 'Mute', disabled: this.isDisabled, onClick: this._onClick }, this.muted ? (h("wdpr-icon-library", { size: iconSize, icon: "media-mute", decorative: true })) : (h("wdpr-icon-library", { size: iconSize, icon: "media-unmute", decorative: true }))));
    }
};
const controlBarClasses$1 = `
  cursor-pointer p-025 flex items-center rounded-pill border border-transparent
  focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
  text-icon-actionable-inverse-default bg-transparent
  disabled:cursor-not-allowed disabled:opacity-500
`;
const overlayChipClasses$1 = `
  cursor-pointer p-025 flex items-center justify-center rounded-pill border border-transparent
  focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
  text-icon-actionable-inverse-default disabled:cursor-not-allowed
  elevation-xsmall-soft
  bg-surface-actionable-alt-default-a78 hover:bg-surface-actionable-alt-hover-a88 active:bg-surface-actionable-alt-pressed disabled:bg-surface-actionable-alt-disabled
`;

const WdprMediaPlayerControlPlayToggle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprPlayToggle = createEvent(this, "wdprPlayToggle", 7);
    }
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
};
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

const WdprMediaPlayerControlProgressBar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprBarTimeChange = createEvent(this, "wdprBarTimeChange", 7);
    }
    _barEl;
    _rafPending = false;
    _pendingTime = null;
    _dragging = false;
    currentTime = 0;
    duration = 0;
    wdprBarTimeChange;
    _clamp(n, min, max) {
        return Math.min(max, Math.max(min, n));
    }
    _getTimeFromClientX(clientX) {
        if (!this.duration || !this._barEl)
            return 0;
        const rect = this._barEl.getBoundingClientRect();
        const percent = this._clamp((clientX - rect.left) / rect.width, 0, 1);
        return percent * this.duration;
    }
    _emitSeekThrottled(time) {
        this._pendingTime = time;
        if (this._rafPending)
            return;
        this._rafPending = true;
        requestAnimationFrame(() => {
            this._rafPending = false;
            if (this._pendingTime == null)
                return;
            this.wdprBarTimeChange.emit({ time: this._pendingTime });
            this._pendingTime = null;
        });
    }
    _onPointerDown = (ev) => {
        if (!this.duration || !this._barEl)
            return;
        if (ev.pointerType === 'mouse' && ev.button !== 0)
            return;
        this._dragging = true;
        ev.currentTarget.setPointerCapture?.(ev.pointerId);
        const time = this._getTimeFromClientX(ev.clientX);
        this.wdprBarTimeChange.emit({ time });
    };
    _onPointerMove = (ev) => {
        if (!this._dragging || !this.duration)
            return;
        const time = this._getTimeFromClientX(ev.clientX);
        this._emitSeekThrottled(time);
    };
    _onPointerUp = (ev) => {
        if (!this._dragging)
            return;
        this._dragging = false;
        if (this.duration) {
            const time = this._getTimeFromClientX(ev.clientX);
            this.wdprBarTimeChange.emit({ time });
        }
        ev.currentTarget.releasePointerCapture?.(ev.pointerId);
    };
    _onPointerCancel = (ev) => {
        if (!this._dragging)
            return;
        this._dragging = false;
        ev.currentTarget.releasePointerCapture?.(ev.pointerId);
    };
    _onKeyDown = (ev) => {
        if (!this.duration)
            return;
        const step = Math.max(1, Math.round(this.duration * 0.05));
        let next = this.currentTime;
        switch (ev.key) {
            case KEYBOARD_KEYS.ARROW_LEFT:
            case KEYBOARD_KEYS.ARROW_DOWN:
                next = this.currentTime - step;
                ev.preventDefault();
                break;
            case KEYBOARD_KEYS.ARROW_RIGHT:
            case KEYBOARD_KEYS.ARROW_UP:
                next = this.currentTime + step;
                ev.preventDefault();
                break;
            case KEYBOARD_KEYS.HOME:
                next = 0;
                ev.preventDefault();
                break;
            case KEYBOARD_KEYS.END:
                next = this.duration;
                ev.preventDefault();
                break;
            default:
                return;
        }
        this.wdprBarTimeChange.emit({ time: this._clamp(next, 0, this.duration) });
    };
    render() {
        const percent = this.duration > 0 ? this._clamp((this.currentTime / this.duration) * 100, 0, 100) : 0;
        return (h("div", { key: '3552c3ecceb5ed292cd57785d87783043fefd941', ref: el => (this._barEl = el), class: "w-full rounded-full cursor-pointer select-none h-dimension-075 bg-surface-white-000-a48 touch-none", role: "slider", "aria-label": "Seek", "aria-valuemin": "0", "aria-valuemax": String(Math.max(0, this.duration)), "aria-valuenow": String(Math.max(0, Math.min(this.currentTime, this.duration || 0))), "aria-valuetext": this.duration ? `${Math.round(this.currentTime)} of ${Math.round(this.duration)} seconds` : '0 seconds', tabIndex: 0, onPointerDown: this._onPointerDown, onPointerMove: this._onPointerMove, onPointerUp: this._onPointerUp, onPointerCancel: this._onPointerCancel, onKeyDown: this._onKeyDown }, h("div", { key: '8533b6bd395019d1fa779eeb0772d0dad18332ba', class: "h-full rounded-full bg-surface-default", style: { width: `${percent}%` } })));
    }
};

export { WdprMediaPlayerControl as wdpr_media_player_control, WdprMediaPlayerControlCaptionsToggle as wdpr_media_player_control_captions_toggle, WdprMediaPlayerFullscreenToggle as wdpr_media_player_control_fullscreen_toggle, WdprMediaPlayerControlMuteToggle as wdpr_media_player_control_mute_toggle, WdprMediaPlayerControlPlayToggle as wdpr_media_player_control_play_toggle, WdprMediaPlayerControlProgressBar as wdpr_media_player_control_progress_bar };
//# sourceMappingURL=wdpr-media-player-control.wdpr-media-player-control-captions-toggle.wdpr-media-player-control-fullscreen-toggle.wdpr-media-player-control-mute-toggle.wdpr-media-player-control-play-toggle.wdpr-media-player-control-progress-bar.entry.js.map

//# sourceMappingURL=wdpr-media-player-control_6.entry.js.map