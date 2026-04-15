import { PseudoStates } from '../../models/pseudo-states.model';
export interface VariantStateConfig {
    base: string;
    hover?: string;
    active?: string;
    disabled?: string;
}
export interface ActionableVariantConfig {
    default: Partial<Record<PseudoStates, string>>;
    selected?: Partial<Record<PseudoStates, string>>;
}
export interface SurfaceConfig {
    readonly paddingMap: Record<SurfacePadding, string>;
    readonly staticVariantMap: Partial<Record<SurfaceVariant, string>>;
    readonly actionableVariantMap: Partial<Record<SurfaceVariant, ActionableVariantConfig>>;
}
export declare const SURFACE_STYLE_CONFIG: SurfaceConfig;
export declare const SEMANTIC_ROLES: Partial<Record<SurfaceVariant, string>>;
export type SurfaceVariant = 'none' | 'basic' | 'mini' | 'critical-extra-bright-small' | 'critical-dim-large' | 'critical-dim-large-elevated' | 'critical-dim-sharp' | 'informational-extra-bright-small' | 'informational-extra-bright-large' | 'informational-extra-bright-large-elevated' | 'success-extra-bright-small' | 'success-extra-bright-large' | 'success-extra-bright-large-elevated' | 'warning-extra-bright-small' | 'warning-extra-bright-large' | 'warning-extra-bright-large-elevated' | 'neutral-extra-bright-small' | 'top-pick-extra-bright-small' | 'actionable-tile-medium' | 'actionable-tile-large' | 'actionable-card-micro' | 'actionable-card-large' | 'actionable-card-xlarge' | 'actionable-list-option' | 'results-list' | 'ghost' | 'dark';
export type SurfacePadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
