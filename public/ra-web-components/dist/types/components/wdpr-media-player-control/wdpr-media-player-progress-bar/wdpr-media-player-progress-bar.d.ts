import { EventEmitter } from '../../../stencil-public-runtime';
export declare class WdprMediaPlayerControlProgressBar {
    private _barEl?;
    private _rafPending;
    private _pendingTime;
    _dragging: boolean;
    currentTime: number;
    duration: number;
    wdprBarTimeChange: EventEmitter<{
        time: number;
    }>;
    private _clamp;
    private _getTimeFromClientX;
    private _emitSeekThrottled;
    private _onPointerDown;
    private _onPointerMove;
    private _onPointerUp;
    private _onPointerCancel;
    private _onKeyDown;
    render(): any;
}
