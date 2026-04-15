import { EventEmitter } from '../../stencil-public-runtime';
import { AvatarSize, AvatarLabelPosition } from './wdpr-avatar.model';
import { NotificationTypes } from '../wdpr-notification/wdpr-notification.model';
export declare class WdprAvatar {
    private _imageLoaded;
    /**
     * Reference to the host element
     */
    el: HTMLWdprAvatarElement;
    imageSrc: string;
    /**
     * Alternate text for the image
     */
    altText: string;
    size: AvatarSize;
    /**
     * Text to display if the image is not available
     */
    text: string;
    label: string;
    subLabel: string;
    labelPosition: AvatarLabelPosition;
    showBorder: boolean;
    isOverflow: boolean;
    selected: boolean;
    isInteractive: boolean;
    /** Number displayed inside the notification badge. */
    notificationNumber: number;
    /** Type of the notification badge — controls its color/icon. */
    notificationType: NotificationTypes;
    /** When true, renders a notification badge anchored to the avatar. */
    showNotificationBadge: boolean;
    /**
     * Emitted whenever the avatar toggles its selected state (also isInteractive must be true).
     * @event
     * @type {{ selected?: boolean }}
     * Object containing the selected flag.
     */
    wdprToggle: EventEmitter<{
        selected: boolean;
    }>;
    /**
     * Reset the imageLoaded state when the image source changes
     */
    handleImageChange(): void;
    private _onImageError;
    private _handleClick;
    private get _containerClasses();
    private get _avatarClasses();
    private get _labelContainerClasses();
    private get _labelClasses();
    private get _subLabelClasses();
    private get _formattedText();
    private get _isDecorative();
    private get imgAlt();
    private get _accessibleNotificationLabel();
    private _renderNotificationBadge;
    render(): any;
}
