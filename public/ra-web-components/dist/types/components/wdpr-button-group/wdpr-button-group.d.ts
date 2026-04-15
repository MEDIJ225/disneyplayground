export declare class WdprButtonGroup {
    private _observer?;
    private _buttons;
    private _pressedSet;
    private _slot;
    el: HTMLElement;
    layout: 'wrapped' | 'horizontal-scroll';
    name?: string;
    a11yLabel: string;
    internals: ElementInternals;
    handleKeyDown(event: KeyboardEvent): void;
    handleButtonClick(event: CustomEvent<boolean>): void;
    handleFormReset(): void;
    refreshInternals(): Promise<void>;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    private _initializeObserver;
    private _getFormValue;
    private _updateFormValue;
    private _updateValidity;
    private _setPressed;
    private _handleButtonToggle;
    private _syncButtonsFromDom;
    private get _pressedButtons();
    private get containerClass();
    render(): any;
}
