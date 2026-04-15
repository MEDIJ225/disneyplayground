import { EventEmitter } from '../../stencil-public-runtime';
import { EnvironmentBadgeEnvironment, EnvironmentBadgeSite } from '../../models/environment-site-badge.model';
/**
 * Cast-specific application header for Vista experiences.
 *
 * Layout:
 * - Left "AppLogo" group: icon, application name, optional site badge.
 * - Right actions group: fixed-width container for icon buttons, avatar, etc.
 *
 * This component owns only the layout and the stateful application text.
 * All controls are composed via slots.
 *
 * @slot leading - Leading icon (e.g. app/menu icon) inside the AppLogo group.
 * @slot site-badge - Optional badge rendered next to the application name.
 * @slot actions - Trailing actions on the right (notifications, avatar, etc.).
 */
export declare class WdprApplicationHeader {
    /**
     * Application name rendered in the header.
     * This value is also used as the accessible label for the banner.
     */
    appName: string;
    /**
     * Hides the visible label but keeps it exposed to assistive technologies.
     */
    hideLabel: boolean;
    /**
     * Environment label shown in the badge.
     */
    environment?: EnvironmentBadgeEnvironment;
    /**
     * Site indicator shown in the badge.
     */
    site?: EnvironmentBadgeSite;
    /**
     * Href for the application name link.
     */
    appLink: string;
    /**
     * Label for the default primary action button.
     * Used when no custom actions and no avatar are provided.
     */
    actionButtonText: string;
    /**
     * Text used to render the default avatar.
     * When defined (or combined with `avatarImgSrc`), the default avatar is shown.
     */
    avatarText?: string;
    /**
     * Image source for the default avatar.
     * When defined (or combined with `avatarText`), the default avatar is shown.
     */
    avatarImgSrc?: string;
    /**
     * Event emitted when the primary action button is clicked.
     * This only fires when the default Sign In button is rendered (no avatar and no custom actions).
     */
    primaryButtonClicked: EventEmitter<boolean>;
    /**
     * Event emitted when the default avatar is activated.
     * This only fires when the default avatar is rendered (avatarText and/or avatarImgSrc provided, and no custom actions).
     */
    avatarClicked: EventEmitter<boolean>;
    private _onPrimaryButtonClicked;
    /**
     * Event emitted when the menu (hamburger) button is clicked.
     */
    wdprMenuButtonClick: EventEmitter<void>;
    private _onAvatarClicked;
    private _onMenuButtonClicked;
    private get _rootClasses();
    private get _appLogoClasses();
    private get _titleClasses();
    private get _actionsClasses();
    render(): any;
}
