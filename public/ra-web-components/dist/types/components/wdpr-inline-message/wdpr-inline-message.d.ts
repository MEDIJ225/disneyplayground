import { InlineMessageSize, InlineMessageVariant } from './wdpr-inline-message.model';
export declare class WdprInlineMessage {
    variant: InlineMessageVariant;
    size: InlineMessageSize;
    /**
     * Optional ARIA role on the message.
     * - 'status' for polite live region announcements
     * - 'alert' for urgent/assertive announcements
     * - 'none' when the message is purely decorative/structural
     * If omitted, no role attribute is set.
     */
    role: string;
    /**
     * Optional override for aria-live on the message text.
     * If not set, defaults based on role: 'polite' for status, 'assertive' for alert, 'off' for none.
     */
    a11yLive?: 'polite' | 'assertive' | 'off';
    private get validRole();
    private get computedAriaLive();
    render(): any;
}
