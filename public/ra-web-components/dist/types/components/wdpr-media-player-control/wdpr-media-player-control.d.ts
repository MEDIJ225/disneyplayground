import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprMediaPlayerControl {
    playing: boolean;
    muted: boolean;
    isFullscreen: boolean;
    captionsEnabled: boolean;
    currentTime: number;
    duration: number;
    showControls: boolean;
    showTime: boolean;
    showCaptionsToggle: boolean;
    showMuteToggle: boolean;
    showFullscreenButton: boolean;
    showPlayToggleOnControl: boolean;
    showProgressBar: boolean;
    showAudioChip: boolean;
    vertical: boolean;
    loading: boolean;
    wdprFullscreenToggle: EventEmitter<void>;
    private _formatTime;
    render(): any;
}
