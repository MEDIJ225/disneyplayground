import { r as registerInstance, h, a as getElement } from './index-CykM8GCN.js';
import './utils-B2sDCMk6.js';
import { b as bundleCjsExports } from './bundle-cjs-CF3xLdU_.js';

const wdprInlineMessageCss = "p{margin:0}";

const WdprInlineMessage = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    // Variant for the status icon
    variant = 'success';
    // Size of the status icon
    size = 'default';
    /**
     * Optional ARIA role on the message.
     * - 'status' for polite live region announcements
     * - 'alert' for urgent/assertive announcements
     * - 'none' when the message is purely decorative/structural
     * If omitted, no role attribute is set.
     */
    role;
    /**
     * Optional override for aria-live on the message text.
     * If not set, defaults based on role: 'polite' for status, 'assertive' for alert, 'off' for none.
     */
    a11yLive;
    get validRole() {
        if (this.role === 'status' || this.role === 'alert' || this.role === 'none') {
            return this.role;
        }
        return undefined;
    }
    get computedAriaLive() {
        if (this.a11yLive) {
            return this.a11yLive;
        }
        switch (this.validRole) {
            case 'status': return 'polite';
            case 'alert': return 'assertive';
            case 'none': return 'off';
            default: return undefined;
        }
    }
    render() {
        const helperTextClass = `m-0 body-large ${textColorClasses[this.variant]} ${textSizesClasses[this.size]}`;
        return (h("section", { key: '1343717305ec886a4f48f6561b1f5047faf59eba', class: containerClasses, role: this.validRole }, h("wdpr-status-icon", { key: 'd0b128b6f7843dd8556e035ae5c04e456247688f', variant: this.variant, ariaLabel: this.variant, size: "xxsmall" }), h("p", { key: 'cff1f7f1c99d213d0860e8062b9cd402c781f7a2', class: helperTextClass, "aria-live": this.computedAriaLive }, h("slot", { key: '4cfdfe62b2b2c84882a3a013357598ad3171c7fc' }))));
    }
};
const containerClasses = "flex gap-100 items-start fit-content";
const textColorClasses = {
    success: 'text-text-status-success',
    informational: 'text-text-status-informational',
    warning: 'text-text-status-warning',
    error: 'text-text-status-critical',
};
const textSizesClasses = {
    small: 'body-medium',
    default: 'body-large',
};
WdprInlineMessage.style = wdprInlineMessageCss;

const wdprStatusIconCss = ":host{display:inline-flex;flex-shrink:0}";

const WdprStatusIcon = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get hostEl() { return getElement(this); }
    /** Variant for the status icon */
    variant = 'success';
    /** Icon size */
    size = 'xsmall';
    /** ARIA label for the status icon */
    ariaLabel;
    getContainerClasses() {
        const sizeClasses = {
            xsmall: 'h-300 w-300',
            xxsmall: 'h-250 w-250',
        };
        const variantClasses = {
            success: 'bg-surface-status-success-alt text-text-status-success',
            informational: 'bg-surface-status-informational-alt text-text-status-informational',
            warning: 'bg-surface-status-warning-alt text-text-status-warning',
            error: 'bg-surface-status-critical-alt text-text-status-critical',
        };
        return bundleCjsExports.twMerge('inline-flex items-center justify-center rounded-pill', sizeClasses[this.size], variantClasses[this.variant]);
    }
    render() {
        return (h("div", { key: '1eb52aeb86724b8591e8765cc9f7f131353ca46d', class: this.getContainerClasses() }, h("wdpr-icon-library", { key: 'e1d737eaf9bf7e483ba92c694cd26688e4bd1ff1', icon: this.iconName, size: this.size, a11yLabel: this.ariaLabel })));
    }
    get iconName() {
        switch (this.variant) {
            case 'success': return 'checkmark';
            case 'informational': return 'info';
            case 'warning': return 'alert';
            case 'error': return 'alert-notification-1';
        }
    }
};
WdprStatusIcon.style = wdprStatusIconCss;

export { WdprInlineMessage as wdpr_inline_message, WdprStatusIcon as wdpr_status_icon };
//# sourceMappingURL=wdpr-inline-message.wdpr-status-icon.entry.js.map

//# sourceMappingURL=wdpr-inline-message_2.entry.js.map