export type WdprCameraScannerAspect = '1x1' | '16x9';
export type WdprCameraScannerSize = 'sm' | 'md' | 'lg';
export declare class WdprCameraScanner {
    el: HTMLWdprCameraScannerElement;
    instruction: string;
    aspect: WdprCameraScannerAspect;
    /**
     * Preset sizes from design system
     */
    size: WdprCameraScannerSize;
    /**
     * Custom width (overrides size). Example: '280px', 'min(90vw, 360px)'
     */
    width?: string;
    private sizeMap;
    render(): any;
}
