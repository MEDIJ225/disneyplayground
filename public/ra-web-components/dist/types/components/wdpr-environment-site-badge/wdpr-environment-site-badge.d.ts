import { EnvironmentBadgeEnvironment, EnvironmentBadgeSite } from '../../models/environment-site-badge.model';
/**
 * Environment + Site badge
 *
 * Renders a wdpr-badge with:
 * - Environment-specific styling (PROD / STAGE / LATEST)
 * - Site code (WDW / DLR / DLP)
 *
 * Visual styling is driven by CSS classes and ::part(surface)
 * so it can be themed from the outside.
 */
export declare class WdprEnvironmentSiteBadge {
    /**
     * Environment label shown in the badge.
     */
    environment: EnvironmentBadgeEnvironment;
    /**
     * Site indicator shown in the badge.
     */
    site: EnvironmentBadgeSite;
    /**
     * When true, only the environment text is rendered
     * (e.g., "PROD" instead of "PROD • WDW").
     */
    environmentOnly: boolean;
    private get _badgeClass();
    private get _label();
    render(): any;
}
