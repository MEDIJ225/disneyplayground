import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprCardLarge {
    el: HTMLElement;
    disabled: boolean;
    fullWidth: boolean;
    name?: string;
    a11yLabel: string;
    selected: boolean;
    isMouseDown: boolean;
    wdprClick: EventEmitter<void>;
    wdprDisabledChange: EventEmitter<boolean>;
    private _wdprCardLargeContent;
    internals: ElementInternals;
    componentDidLoad(): void;
    refreshInternals(): Promise<void>;
    handleDisabledChange(): void;
    onSelectedPropChange(): void;
    handleFormReset(): void;
    private _handleSelectedChange;
    private _updateFormValue;
    private _updateValidity;
    private _findCardContent;
    get mediaSection(): any;
    get contentSection(): any;
    private _handleKeyDown;
    private _handleClick;
    get cardClasses(): string;
    render(): any;
}
