export declare class WdprProgressBarContinuous {
    el: HTMLWdprProgressBarContinuousElement;
    /**
     * When false, renders an indeterminate progress bar.
     * Indeterminate MUST NOT set aria-valuenow/min/max.
     */
    determinate: boolean;
    progress: number;
    max: number;
    a11yLabel: string;
    a11yLabelledBy?: string;
    private get _safeMax();
    private get _safeNow();
    private get _ariaNameAttrs();
    private get _ariaValueAttrs();
    render(): any;
}
