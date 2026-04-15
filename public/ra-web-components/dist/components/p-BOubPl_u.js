import { p as proxyCustomElement, H, h, d as Host } from './p-BRIGwGQo.js';
import { g as generateRandId } from './p-CXZGMLMW.js';
import { b as bundleCjsExports } from './p-CF3xLdU_.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';

const getContainerWrapper = (type, size) => {
    const baseClass = "w-fit rounded-pill inline-flex justify-center items-center";
    const backgroundClass = type === "alert" ? "bg-surface-status-critical" : "bg-surface-status-informational-alt";
    const sizeClass = size === 'small' ? 'px-050 min-w-dimension-175 h-dimension-175' :
        size === 'xsmall' ? 'min-w-dimension-100 h-dimension-100' : 'min-w-dimension-075 h-dimension-075';
    return bundleCjsExports.twMerge(baseClass, backgroundClass, sizeClass);
};
const getNumberClass = (type) => {
    const baseClass = "component-xxsmall";
    const numberColorClass = type === "alert" ? "text-text-inverse" : "text-text-label";
    return bundleCjsExports.twMerge(baseClass, numberColorClass);
};

const WdprNotificationIndicator = /*@__PURE__*/ proxyCustomElement(class WdprNotificationIndicator extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
    _internalId;
    componentId = null;
    size = "small";
    type = "alert";
    number = 0;
    decorative = false;
    a11yAriaLive = 'polite';
    a11yAriaRole = 'status';
    a11yLabel = '';
    componentWillLoad() {
        this._internalId = this.componentId || `wdpr-notification-indicator-${generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    get _containerWrapper() {
        return getContainerWrapper(this.type, this.size);
    }
    get _numberClass() {
        return getNumberClass(this.type);
    }
    render() {
        return (h(Host, { key: 'f5667c95f4b4791842a87b392aa48d02751fd73e' }, h("div", { key: 'cc37884b927fe7226ad7bada60d0256d210612eb', id: this._internalId, class: this._containerWrapper, role: this.a11yAriaRole || undefined, "aria-live": this.a11yAriaLive || undefined, "aria-label": this.a11yLabel || undefined }, h("span", { key: 'f94027bd1f5da470c87a636b208bb0ca1b5ef59f', class: this._numberClass }, this.size === 'small' ? (this.number || '\u200B') : null))));
    }
}, [257, "wdpr-notification-indicator", {
        "componentId": [1, "component-id"],
        "size": [1],
        "type": [1],
        "number": [2],
        "decorative": [4],
        "a11yAriaLive": [1, "a11y-aria-live"],
        "a11yAriaRole": [1, "a11y-aria-role"],
        "a11yLabel": [1, "a11y-label"],
        "_internalId": [32]
    }, [[0, "keydown", "handleKeyDown"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-notification-indicator"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprNotificationIndicator);
            }
            break;
    } });
}

export { WdprNotificationIndicator as W, defineCustomElement as d };
//# sourceMappingURL=p-BOubPl_u.js.map

//# sourceMappingURL=p-BOubPl_u.js.map