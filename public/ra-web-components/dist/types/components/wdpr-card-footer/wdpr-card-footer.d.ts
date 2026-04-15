export declare class WdprCardFooter {
    headTitle: string;
    description: string;
    linkText: string;
    linkHref: string;
    linkPosition: 'top' | 'bottom';
    icon: string;
    showMoreOptions: boolean;
    variant: 'informational' | 'warning' | 'critical' | 'swap' | 'general';
    disabled: boolean;
    setDisabledState(isDisabled: boolean): Promise<void>;
    get iconVariantColor(): "info" | "error" | "secondary" | "neutral" | "warning";
    get iconName(): string;
    private _renderLink;
    render(): any;
}
