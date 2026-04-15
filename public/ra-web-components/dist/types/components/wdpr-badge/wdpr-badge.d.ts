export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'error' | 'informational' | 'top-pick' | 'dark';
export type BadgeIconSize = 'xxsmall' | 'xsmall' | 'small';
export declare class WdprBadge {
    el: HTMLElement;
    /** Badge text label */
    label: string;
    /** Badge location style */
    location: 'overlay' | 'inline';
    /** Badge visual variant (maps to surface variant + text color) */
    variant: BadgeVariant;
    /** Optional explicit icon name */
    iconName?: string;
    /** Icon size from the icon library */
    iconSize: BadgeIconSize;
    /**
     * Optional accessible name for the icon.
     * If provided, the icon will expose role="img" + aria-label on the same element.
     * If omitted, the icon will be treated as decorative (aria-hidden="true").
     */
    iconLabel?: string;
    /**
     * Optional ARIA role on the badge host.
     * - 'status' or 'alert' for live regions
     * - 'none' when the badge is purely decorative/structural
     * If omitted, no role attribute is set.
     */
    role: string;
    /**
     * Extra classes merged onto the badge surface (after defaults).
     * Use to override layout/typography for specific compositions (e.g. fixed component-small line-height).
     */
    surfaceClass?: string;
    private get validRole();
    /** Map BadgeVariant → wdpr-surface-style variant */
    private get surfaceVariant();
    private get surfaceCustomClasses();
    private renderIcon;
    render(): any;
}
