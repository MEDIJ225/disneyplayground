import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';

const WdprOverlay = /*@__PURE__*/ proxyCustomElement(class WdprOverlay extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.overlayClick = createEvent(this, "overlayClick", 7);
    }
    get el() { return this; }
    open = false;
    overlayRole = 'region';
    overlayStyle = 'default';
    a11yLabel;
    cover = false;
    zIndex = 10;
    /** surface = your card-like surface; scrim = full-bleed backdrop */
    variant = 'surface';
    /** Background class for the overlay */
    bgClass;
    /** Click on empty overlay area */
    overlayClick;
    onSurfaceClick = (e) => {
        if (e.target === e.currentTarget)
            this.overlayClick.emit();
    };
    get surfaceClass() {
        const base = this.cover
            ? 'absolute inset-0 w-full h-full box-border flex flex-col'
            : 'inline-flex flex-col';
        const visible = this.open ? 'opacity-1250 pointer-events-auto' : 'hidden opacity-000 pointer-events-none';
        if (this.variant === 'scrim') {
            const bg = this.bgClass ?? 'bg-page-overlay';
            return customTwMerge(base, 'justify-center items-center rounded-000', bg, visible);
        }
        const overlayStyleMap = {
            light: 'bg-page-overlay-light',
            disabled: 'bg-page-overlay-disabled',
            default: 'bg-page-overlay',
        };
        const bg = this.overlayStyle && overlayStyleMap[this.overlayStyle]
            ? `${overlayStyleMap[this.overlayStyle]} ${this.bgClass ?? ''}`
            : this.bgClass ?? 'bg-page-overlay';
        return customTwMerge(base, bg, visible, this.cover ? 'rounded-000' : '', 'justify-end p-100 items-start gap-100');
    }
    render() {
        return (h(Host, { key: '1b48ccb8a9c306dcfec6a93e9103b0c6028caae1', "aria-hidden": this.open ? 'false' : 'true', style: this.cover ? { zIndex: String(this.zIndex) } : {} }, h("div", { key: 'e2d7c2f842d7457a48581926cb56eefb5c25c056', class: this.surfaceClass, role: this.overlayRole, "aria-label": this.a11yLabel, onClick: this.onSurfaceClick }, h("slot", { key: 'de4b331bfac163870c3245c375841125af06724f' }))));
    }
}, [257, "wdpr-overlay", {
        "open": [4],
        "overlayRole": [1, "overlay-role"],
        "overlayStyle": [1, "overlay-style"],
        "a11yLabel": [1, "a11y-label"],
        "cover": [516],
        "zIndex": [2, "z-index"],
        "variant": [1],
        "bgClass": [1, "bg-class"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-overlay"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-overlay":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprOverlay);
            }
            break;
    } });
}

export { WdprOverlay as W, defineCustomElement as d };
//# sourceMappingURL=p-CY_t0laS.js.map

//# sourceMappingURL=p-CY_t0laS.js.map