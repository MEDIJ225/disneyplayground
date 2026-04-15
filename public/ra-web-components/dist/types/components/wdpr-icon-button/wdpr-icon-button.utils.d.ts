import { IconButtonSize, IconButtonVariants } from './wdpr-icon-button.model';
import { NotificationSizes } from '../wdpr-notification/wdpr-notification.model';
export declare const getButtonClass: (variant: IconButtonVariants, size: IconButtonSize) => string;
export declare const getNotificationSizeClass: (variant: IconButtonVariants, size: IconButtonSize) => NotificationSizes;
export declare const notificationPaddingClasses: Record<string, Record<IconButtonSize, string>>;
