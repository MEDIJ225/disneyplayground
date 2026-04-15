import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprNavigationHeader {
    el: HTMLWdprNavigationHeaderElement;
    theme: 'WDW' | 'DLR';
    logoPath: string;
    a11yLabel?: string;
    isOpen: boolean;
    isGradient: boolean;
    isFloating: boolean;
    isInverse: boolean;
    buttonLabel: string;
    private _shouldRestoreFocus;
    wdprNavigationHeaderMenuButtonClick: EventEmitter<void>;
    wdprNavigationHeaderCloseClick: EventEmitter<void>;
    wdprNavigationHeaderSearchClick: EventEmitter<void>;
    wdprNavigationHeaderButtonClick: EventEmitter<void>;
    private get _actions();
    private _onSearchClick;
    private _onTicketsButtonClick;
    private _onNavigationToggleClick;
    private _getToggleButton;
    componentDidRender(): void;
    private get _containerClass();
    private get _iconsContainerClass();
    private get _showDlrButton();
    private get _dlrButtonVariant();
    private get _iconButtonVariant();
    render(): any;
}
