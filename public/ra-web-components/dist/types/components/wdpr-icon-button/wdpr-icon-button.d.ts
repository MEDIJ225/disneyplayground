import { EventEmitter } from '../../stencil-public-runtime';
import { IconButtonSize, IconButtonType, IconButtonVariants } from './wdpr-icon-button.model';
import { NotificationTypes } from '../wdpr-notification/wdpr-notification.model';
export declare class WdprIconButton {
    /**
     * Reference to host element
     * @type {HTMLWdprIconButtonElement}
     */
    el: HTMLWdprIconButtonElement;
    /**
     * The internal ID for the component. It is used internally and is not exposed.
     */
    private _internalId;
    showNotificationBadge: boolean;
    buttonId?: string;
    customTabIndex?: number;
    type: IconButtonType;
    size: IconButtonSize;
    variant: IconButtonVariants;
    iconName: string;
    disabled: boolean;
    a11yExpanded?: 'true' | 'false';
    notificationNumber: number;
    notificationType: NotificationTypes;
    a11yLabel: string;
    clicked: EventEmitter<boolean>;
    componentWillLoad(): void;
    private onClick;
    handleKeyDown(ev: KeyboardEvent): void;
    private get _notificationSize();
    private get _buttonClass();
    private get _notificationPositionClass();
    private get _accessibleLabel();
    render(): any;
}
