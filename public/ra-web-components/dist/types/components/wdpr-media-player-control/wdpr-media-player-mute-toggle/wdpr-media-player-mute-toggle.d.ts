import { EventEmitter } from '../../../stencil-public-runtime';
export declare class WdprMediaPlayerControlMuteToggle {
    muted: boolean;
    variant: 'overlay' | 'control';
    isDisabled: boolean;
    wdprMuteToggle: EventEmitter<void>;
    private _onClick;
    render(): any;
}
