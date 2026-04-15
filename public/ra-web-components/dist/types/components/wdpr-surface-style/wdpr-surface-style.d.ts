import { SurfaceVariant, SurfacePadding } from './wdpr-surface-style.model';
export declare class WdprSurfaceStyle {
    el: HTMLElement;
    /**
     * Surface variant style
     */
    variant: SurfaceVariant;
    /**
     * Padding inside the surface
     */
    padding: SurfacePadding;
    /**
     * Additional custom CSS classes
     */
    customClass?: string;
    /**
     * ARIA role for the surface
     */
    role: string;
    /**
     * ARIA label for accessibility
     */
    a11yLabel: string;
    /**
     * Whether the surface is selected (only applies to actionable variants)
     */
    selected: boolean;
    /**
     * Whether the surface is disabled (only applies to actionable variants)
     */
    disabled: boolean;
    private _getActionableStateClasses;
    private _isActionableVariant;
    private _getSurfaceClasses;
    private _getSemanticRole;
    private _getOverlayActionClasses;
    render(): any;
}
