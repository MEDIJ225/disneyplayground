import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';
import { c as isHigherThanTablet } from './breakpoint.utils-B3zeU0l2.js';
import { p as propagateToSlot } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprLandscapeSecondaryCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    _buttonSize = 'medium';
    headline;
    body;
    src;
    a11yAlt;
    /*
     * If consumer doesn't want the default resizing sizes
     * for button based on viewport, they can set this to true
     */
    avoidButtonResize = false;
    handleResize() {
        // For sizes higher than tablet design team wants to set a button size to medium
        if (this.avoidButtonResize)
            return;
        this._buttonSize = isHigherThanTablet() ? 'medium' : 'small';
        this._syncButtonSlot();
    }
    componentDidLoad() {
        if (this.avoidButtonResize)
            return;
        this._syncButtonSlot();
    }
    _syncButtonSlot = () => {
        const slotEl = this.el.shadowRoot?.querySelector('slot[name="button"]');
        propagateToSlot(slotEl, 'size', this._buttonSize, 'wdpr-button');
    };
    _onSlotButtonChange = () => {
        if (this.avoidButtonResize)
            return;
        this._syncButtonSlot();
    };
    render() {
        return (h("article", { key: '717c1bd275c744ad951288e77503d6d521ed9456', class: baseClasses }, h("figure", { key: '846154e729c7fb3cc110eca3ce42bbdbdc8f200b', class: mediaWrapperClasses }, h("wdpr-media", { key: '88265f241000ca6ed97f97bec7dfa482b726f1b4', src: this.src, alt: this.a11yAlt, aspect: "landscape", objectFit: "cover", landscapeRatio: "16:9" })), h("div", { key: 'f1cd554c3c062121b5b703bddaf270d900512ecd', class: "flex flex-col items-start self-stretch px-100 gap-150" }, h("div", { key: '4bf4ee893753ecb3ff3d9a864e90316951bcd867', class: "flex flex-col items-start self-stretch gap-050" }, h("span", { key: '720f336512bec1851d05ee39e5c16d13130facf6', class: headlineClasses }, this.headline), h("p", { key: '5f8f33b5966f006189505c59ba7960f5d0bff33c', class: bodyClasses }, this.body)), h("div", { key: '410161e45197da5bbf0291e2a0809ec79e96d9cc', class: "flex flex-col items-start self-stretch gap-150" }, h("slot", { key: 'fb66fe5ef2c916801b1c0e1a8de90e770eb533dd', name: "text-link" }), h("slot", { key: 'a3adc29028e2900e5de5161ed8cb8b9ba418c742', name: "button", onSlotchange: this._onSlotButtonChange })))));
    }
};
const baseClasses = 'flex flex-col items-start gap-150 w-full transition-all';
const mediaWrapperClasses = 'w-full elevation-small-soft lg:elevation-medium-soft rounded-300 overflow-hidden';
const headlineClasses = `text-heading-xsmall transition-all font-heading-alt leading-heading-xsmall tracking--05 line-clamp-2
  md:text-heading-small md:leading-heading-small
  lg:text-heading-medium lg:leading-heading-medium
  xl:text-heading-large xl:leading-heading-large`;
const bodyClasses = `text-body-medium transition-all font-body-default leading-body-medium tracking-default line-clamp-2
  xl:text-body-large xl:leading-body-large`;

export { WdprLandscapeSecondaryCard as wdpr_landscape_secondary_card };
//# sourceMappingURL=wdpr-landscape-secondary-card.entry.js.map

//# sourceMappingURL=wdpr-landscape-secondary-card.entry.js.map