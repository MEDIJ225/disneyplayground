export declare class WdprTimeUnit {
    variant: 'primary' | 'secondary';
    label: string;
    digits: [string, string];
    /**
     * Prefix for slot names (e.g., "hour", "minute", "second")
    */
    slotPrefix: string;
    private get _labelClasses();
    render(): any;
}
