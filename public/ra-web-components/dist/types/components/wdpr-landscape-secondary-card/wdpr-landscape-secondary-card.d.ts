import { ButtonSize } from '../wdpr-button/wdpr-button';
export declare class WdprLandscapeSecondaryCard {
    el: HTMLWdprLandscapeSecondaryCardElement;
    _buttonSize: ButtonSize;
    headline: string;
    body: string;
    src: string;
    a11yAlt: string;
    avoidButtonResize: boolean;
    handleResize(): void;
    componentDidLoad(): void;
    private _syncButtonSlot;
    private _onSlotButtonChange;
    render(): any;
}
