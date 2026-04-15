import { EventEmitter } from '../../stencil-public-runtime';
type CardVariant = 'actionable' | 'selectable' | 'non-actionable';
export declare class WdprCardMedium {
    el: HTMLElement;
    variant: CardVariant;
    mediaPosition: 'leading' | 'trailing' | 'none';
    ghost: boolean;
    disabled: boolean;
    name?: string;
    fullWidth: boolean;
    mediaAspect: 'portrait' | '3:2';
    a11yLabel: string;
    _selected: boolean;
    _isMouseDown: boolean;
    wdprCardClick: EventEmitter<{
        selected: boolean;
    }>;
    wdprDisabledChange: EventEmitter<boolean>;
    private _wdprCardMediumContent;
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
    private _handleKeyDown;
    private _handleClick;
    get mediaSlotDimensions(): "w-48" | "w-24 h-32";
    get mediaSlot(): any;
    get cardPaddingClasses(): string;
    get cardCardCursorClasses(): "cursor-pointer" | "cursor-default";
    get cardClasses(): string;
    render(): any;
}
export {};
