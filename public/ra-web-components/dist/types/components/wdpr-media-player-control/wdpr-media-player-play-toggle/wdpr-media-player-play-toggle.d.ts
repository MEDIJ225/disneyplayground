import { EventEmitter } from '../../../stencil-public-runtime';
export declare class WdprMediaPlayerControlPlayToggle {
    playing: boolean;
    variant: 'overlay' | 'control';
    isDisabled: boolean;
    wdprPlayToggle: EventEmitter<void>;
    private _onClick;
    render(): any;
}
