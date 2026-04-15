export interface Step {
    progress?: number;
    max?: number;
}
export declare class WdprMultiStepLoader {
    /**
     * Reference to host element
     * @type {HTMLWdprLinearLoaderElement}
     */
    el: HTMLWdprLinearLoaderElement;
    /**
     * An array of steps
     */
    steps: Step[];
    render(): any;
}
