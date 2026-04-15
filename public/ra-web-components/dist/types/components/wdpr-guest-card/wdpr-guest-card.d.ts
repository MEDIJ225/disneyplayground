import { EventEmitter } from '../../stencil-public-runtime';
import { MediaPosition } from '../../components';
import { HeadingLevel } from '../../models/card.model';
export type ActionPosition = 'leading' | 'trailing' | 'none';
/**
 * @deprecated Use `wdpr-card-micro` starting in release 3.0.4. `wdpr-guest-card` will be removed in a future major release.
 */
export declare class WdprGuestCard {
    el: HTMLElement;
    isOnSurface: boolean;
    actionPosition: ActionPosition;
    mediaPosition: MediaPosition;
    fullWidth: boolean;
    disabled: boolean;
    headingLevel: HeadingLevel;
    a11yLabel?: string;
    selected: boolean;
    wdprSelectedChange: EventEmitter<{
        selected: boolean;
    }>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private _handleSelectedChange;
    render(): any;
}
