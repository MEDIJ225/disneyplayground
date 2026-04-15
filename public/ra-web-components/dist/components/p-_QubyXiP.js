import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$2 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$1 } from './p-DsPXJJ-e.js';

const wdprInlineMessageCss = "p{margin:0}";

const WdprInlineMessage = /*@__PURE__*/ proxyCustomElement(class WdprInlineMessage extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
    static get style() { return wdprInlineMessageCss; }
}, [257, "wdpr-inline-message", {
        "variant": [1],
        "size": [1],
        "role": [513],
        "a11yLive": [1, "a11y-live"]
    }]);
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
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-inline-message", "wdpr-icon-library", "wdpr-status-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-inline-message":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprInlineMessage);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "wdpr-status-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprInlineMessage as W, defineCustomElement as d };
//# sourceMappingURL=p-_QubyXiP.js.map

//# sourceMappingURL=p-_QubyXiP.js.map