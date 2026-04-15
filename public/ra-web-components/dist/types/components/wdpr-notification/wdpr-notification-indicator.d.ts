import { NotificationSizes, NotificationTypes, NotificationsA11yAriaLive, NotificationsA11yAriaRole } from './wdpr-notification.model';
export declare class WdprNotificationIndicator {
    el: HTMLWdprNotificationIndicatorElement;
    _internalId: string;
    componentId?: string;
    size: NotificationSizes;
    type: NotificationTypes;
    number: number;
    decorative: boolean;
    a11yAriaLive?: NotificationsA11yAriaLive;
    a11yAriaRole?: NotificationsA11yAriaRole;
    a11yLabel?: string;
    componentWillLoad(): void;
    handleKeyDown(ev: KeyboardEvent): void;
    private get _containerWrapper();
    private get _numberClass();
    render(): any;
}
