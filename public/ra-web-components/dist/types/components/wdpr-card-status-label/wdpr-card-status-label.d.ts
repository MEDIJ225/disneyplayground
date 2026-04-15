export type StatusLabelVariant = 'success' | 'warning' | 'informational' | 'error';
export declare class WdprCardStatusLabel {
    label: string;
    variant: StatusLabelVariant;
    get variantClasses(): {
        success: string;
        warning: string;
        informational: string;
        error: string;
    };
    get textColor(): {
        success: string;
        warning: string;
        informational: string;
        error: string;
    };
    get iconName(): "info" | "alert" | "checkmark" | "alert-notification-1";
    render(): any;
}
