export type StatusVariant = 'success' | 'informational' | 'warning' | 'error';
export type StatusSize = 'xsmall' | 'xxsmall';
export declare class WdprStatusIcon {
    /** Access to the host element */
    hostEl: HTMLElement;
    /** Variant for the status icon */
    variant: StatusVariant;
    /** Icon size */
    size: StatusSize;
    /** ARIA label for the status icon */
    ariaLabel: string;
    private getContainerClasses;
    render(): any;
    private get iconName();
}
