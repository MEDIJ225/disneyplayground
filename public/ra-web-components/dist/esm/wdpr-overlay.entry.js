import { r as registerInstance, c as createEvent, a as getElement, h, H as Host } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprOverlay = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.overlayClick = createEvent(this, "overlayClick", 7);
    }
    get el() { return getElement(this); }
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
};

export { WdprOverlay as wdpr_overlay };
//# sourceMappingURL=wdpr-overlay.entry.js.map

//# sourceMappingURL=wdpr-overlay.entry.js.map