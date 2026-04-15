import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$5 } from './p-BIjljjyT.js';
import { d as defineCustomElement$4 } from './p-B57s9dXs.js';
import { d as defineCustomElement$3 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$2 } from './p-Df6D6b08.js';

const WdprCarouselCard$1 = /*@__PURE__*/ proxyCustomElement(class WdprCarouselCard extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprFavoritesToggle = createEvent(this, "wdprFavoritesToggle", 7);
        this.wdprAddToggle = createEvent(this, "wdprAddToggle", 7);
    }
    src;
    a11yAlt;
    actionType;
    primaryHeadline;
    headlineLabel;
    body;
    secondaryLabel;
    secondaryContent;
    wdprFavoritesToggle;
    wdprAddToggle;
    _handleFavoritesToggle = () => {
        this.wdprFavoritesToggle.emit();
    };
    _handleAddToggle = () => {
        this.wdprAddToggle.emit();
    };
    _renderAction() {
        if (this.actionType == null)
            return null;
        if (this.actionType === 'add') {
            return (h("wdpr-add-button", { slot: "action-button", a11yLabel: "Add", onWdprAddToggle: this._handleAddToggle }));
        }
        if (this.actionType === 'favorite') {
            return (h("wdpr-favorites-button", { slot: "action-button", ariaLabel: "Add to favorites", onWdprFavoritesToggle: this._handleFavoritesToggle }));
        }
    }
    render() {
        return (h("article", { key: 'a3dd1a3f97de3e9f1d219cf526527cc3367a8aef', class: wrapperClasses }, h("div", { key: '0903c91ba5af3c97dc4759e928439ffa44315dff', class: actionsWrapperClasses }, h("slot", { key: '3fd3fa9d59fe1922469ab97d6bbe55f7fa237a88', name: "action-button" }), this._renderAction()), h("figure", { key: '537b2a277dd2116f2008f703e790bf3142147609', class: "w-full" }, h("wdpr-media", { key: '72f37dfe94947cafeeda11ec344a1b956251489d', src: this.src, alt: this.a11yAlt, aspect: "landscape", objectFit: "cover", landscapeRatio: "4:3" })), h("div", { key: 'c9dad622afb8956b735ca9cb13c12fbc070522cc', class: contentWrapperClasses }, h("div", { key: '1fd7db132379be2699c6c478c6af59b5c68ef904', class: "flex flex-col items-start self-stretch gap-200" }, h("div", { key: '4c6821f4cb8f1fba65ab4edd4c460538b9b78d47', class: "flex flex-col items-start self-stretch gap-125" }, h("div", { key: 'bfb2fa9f5e7fb5d07062ee77841047f666498ccd', class: "flex flex-col items-start self-stretch gap-100" }, h("slot", { key: 'b8d1d71349be8b420f8a13b2048121d568da59fb', name: "badge" }), h("div", { key: '7f1d4a0f6bc7bb602c0c994f48118003edda3cb6', class: "flex flex-col items-start self-stretch gap-050" }, this.headlineLabel && h("span", { key: 'a76afa341ff042d7664912ff8ea43d157f9809be', class: headlineLabelClasses }, this.headlineLabel), this.primaryHeadline && h("span", { key: '721b240d32eca2183f2a893501353bcb9a024b45', class: primaryHeadlineClasses }, this.primaryHeadline), this.body && h("p", { key: '59b0f34153da27bf5401af1bffc2b5d939a3d1b5', class: bodyClasses }, this.body))), this.secondaryContent && h("div", { key: 'b83a96bb7b4ecab4369c3b5d1bc6424b3ba9a9e2', class: secondaryContentClasses }, this.secondaryContent)), this.secondaryLabel && (h("div", { key: '9dc2bac376e2f029ee5bdd4dbbd9f9da1820ab4b', class: secondaryLabelWrapperClasses }, h("slot", { key: '94c74dbe45ae3bebc778b71c09950a2fb4f50265', name: "secondary-label-icon" }), h("span", { key: '42bec75b5d9b471b1d76198a0287b84e8ed8d284', class: secondaryLabelClasses }, this.secondaryLabel))))), h("footer", { key: '166808596943482270955d6e96fc4a353cdc5b9c', class: "flex flex-col w-full" }, h("slot", { key: 'db65b4b73bed060fe656106007ef3b0858df0402', name: "footer" }))));
    }
}, [257, "wdpr-carousel-card", {
        "src": [1],
        "a11yAlt": [1, "a11y-alt"],
        "actionType": [1, "action-type"],
        "primaryHeadline": [1, "primary-headline"],
        "headlineLabel": [1, "headline-label"],
        "body": [1],
        "secondaryLabel": [1, "secondary-label"],
        "secondaryContent": [1, "secondary-content"]
    }]);
const wrapperClasses = `flex flex-col items-start self-stretch elevation-small-soft lg:elevation-medium-soft
  rounded-200 relative overflow-hidden w-full`;
const actionsWrapperClasses = 'absolute top-150 right-150 z-10';
const contentWrapperClasses = 'flex flex-col items-start self-stretch p-200';
const headlineLabelClasses = 'text-text-disclaimer label-small line-clamp-1';
const primaryHeadlineClasses = `text-text-heading text-heading-xsmall font-heading-alt leading-heading-xsmall tracking--05 line-clamp-3
  md:text-heading-small md:leading-heading-small
  lg:text-heading-medium lg:leading-heading-medium
  xl:text-heading-large xl:leading-heading-large`;
const bodyClasses = 'text-text-body body-medium line-clamp-5';
const secondaryContentClasses = 'text-text-disclaimer body-small line-clamp-1';
const secondaryLabelWrapperClasses = 'flex items-start gap-050 self-stretch text-text-body';
const secondaryLabelClasses = 'label-small line-clamp-3';
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-carousel-card", "wdpr-add-button", "wdpr-favorites-button", "wdpr-icon-library", "wdpr-media"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-carousel-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCarouselCard$1);
            }
            break;
        case "wdpr-add-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-favorites-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-media":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprCarouselCard = WdprCarouselCard$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCarouselCard, defineCustomElement };
//# sourceMappingURL=wdpr-carousel-card.js.map

//# sourceMappingURL=wdpr-carousel-card.js.map