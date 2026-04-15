export declare class WdprLinearLoader {
    /**
     * Reference to host element
     * @type {HTMLWdprLinearLoaderElement}
     */
    el: HTMLWdprLinearLoaderElement;
    /**
     * Progress of the bar
     */
    progress: number;
    /**
     * Maximum progress of the bar
     * @type {HTMLWdprLinearLoaderElement}
     */
    max: number;
    private get percentage();
    render(): any;
}
