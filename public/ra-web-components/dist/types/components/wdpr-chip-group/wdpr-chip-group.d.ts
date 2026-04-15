export declare class WdprChipGroup {
    private _observer?;
    private _chips;
    el: HTMLWdprChipGroupElement;
    selectMode: 'single' | 'multi';
    layout: 'wrapped' | 'horizontal-scroll';
    name?: string;
    a11yLabel?: string;
    internals: ElementInternals;
    handleChipToggle(ev: CustomEvent<{
        selected: boolean;
    }>): void;
    handleFormReset(): void;
    refreshInternals(): Promise<void>;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    private _syncChipsFromDom;
    componentDidUpdate(): void;
    private get _selectedChips();
    private _initializeObserver;
    private _getFormValue;
    private _updateFormValue;
    private _updateValidity;
    private _enforceSelectionRules;
    private _handleChipToggle;
    private get containerClass();
    render(): any;
}
