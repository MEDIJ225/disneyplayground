import { NumberFlipperSizes } from './wdpr-number-flipper.model';
export declare class WdprNumberFlipper {
    private _observer;
    el: HTMLWdprNumberFlipperElement;
    size: NumberFlipperSizes;
    _displayTop: HTMLElement;
    _displayBottom: HTMLElement;
    _overlayTop: HTMLElement;
    _overlayBottom: HTMLElement;
    _isFlipping: boolean;
    private getSlotElement;
    handleVisibilityChange(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    private _handleSlotChange;
    private get _wrapperClasses();
    private _handleAnimationEnd;
    render(): any;
}
