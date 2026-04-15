export type IconSize = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'medium-alt' | 'large' | 'xlarge';
export type IconBackground = 'none' | 'circle' | 'square';
export type IconVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export declare class WdprIcon {
    el: HTMLElement;
    icon: string;
    size: IconSize;
    background: IconBackground;
    variant: IconVariant;
    iconTitle?: string;
    iconDescription?: string;
    customClass?: string;
    decorative: boolean;
    a11yLabel?: string;
    private readonly sizeConfig;
    private readonly variantColorsOnly;
    private readonly variantWithBackground;
    private readonly backgroundShapes;
    private readonly squareBorderRadius;
    private getSizeClasses;
    private getVariantClasses;
    private getContainerClasses;
    render(): any;
}
