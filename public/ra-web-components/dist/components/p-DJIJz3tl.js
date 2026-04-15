import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';

const WdprMediaPlayerControlProgressBar = /*@__PURE__*/ proxyCustomElement(class WdprMediaPlayerControlProgressBar extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
}, [257, "wdpr-media-player-control-progress-bar", {
        "currentTime": [2, "current-time"],
        "duration": [2],
        "_dragging": [32]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-media-player-control-progress-bar"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-media-player-control-progress-bar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprMediaPlayerControlProgressBar);
            }
            break;
    } });
}

export { WdprMediaPlayerControlProgressBar as W, defineCustomElement as d };
//# sourceMappingURL=p-DJIJz3tl.js.map

//# sourceMappingURL=p-DJIJz3tl.js.map