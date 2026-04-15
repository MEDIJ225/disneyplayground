import { h } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../../models/keycodes.model";
export class WdprMediaPlayerControlProgressBar {
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
    static get is() { return "wdpr-media-player-control-progress-bar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
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
            }
        };
    }
    static get states() {
        return {
            "_dragging": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprBarTimeChange",
                "name": "wdprBarTimeChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ time: number }",
                    "resolved": "{ time: number; }",
                    "references": {}
                }
            }];
    }
}
//# sourceMappingURL=wdpr-media-player-progress-bar.js.map
