import { h } from "@stencil/core";
import { isHigherThanTablet } from "../../utils/breakpoint.utils";
import { propagateToSlot } from "../../utils/utils";
export class WdprLandscapePrimaryCard {
    el;
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
        return (h("article", { key: 'f4af17053243809713032069fa49fe0cf27257e2', class: baseClasses }, h("figure", { key: '5e0dbeee076eff0dfeb255262ef5b035ef8b0eb3', class: mediaWrapperClasses }, h("wdpr-media", { key: '5f995cabaf24ef06c4009793b1e298c7b32f88f2', src: this.src, alt: this.a11yAlt, aspect: "landscape", objectFit: "cover", landscapeRatio: "5:4" })), h("div", { key: 'fe71431f0e3df38a438b8f51b4c8792aa5881583', class: "flex flex-col items-start self-stretch px-100 gap-150" }, h("div", { key: '1a1d40830b6f94fe50978b4e9a9755a90c786926', class: "flex flex-col items-start self-stretch gap-050" }, h("span", { key: '2091e5fe37e824290a31aeb833c6f47d7980625a', class: headlineClasses }, this.headline), h("p", { key: '9cb625e0691617d219093b26879d7bc8465e16b7', class: bodyClasses }, this.body)), h("div", { key: '880096dea7fe7ffe32359d49ce0d358ee347bd96', class: "flex flex-col items-start self-stretch gap-150" }, h("slot", { key: 'fe53e27e7afa60ee44ff549e81668723d8b76581', name: "text-link" }), h("slot", { key: '25a9cf302862f623524f94e52c95670662982dad', name: "button", onSlotchange: this._onSlotButtonChange })))));
    }
    static get is() { return "wdpr-landscape-primary-card"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "headline": {
                "type": "string",
                "attribute": "headline",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "body": {
                "type": "string",
                "attribute": "body",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "src": {
                "type": "string",
                "attribute": "src",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "a11yAlt": {
                "type": "string",
                "attribute": "a11y-alt",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "avoidButtonResize": {
                "type": "boolean",
                "attribute": "avoid-button-resize",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "_buttonSize": {}
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "resize",
                "method": "handleResize",
                "target": "window",
                "capture": false,
                "passive": true
            }];
    }
}
const baseClasses = 'flex flex-col items-start gap-150 w-full transition-all';
const mediaWrapperClasses = 'w-full elevation-small-soft lg:elevation-medium-soft rounded-300 overflow-hidden';
const headlineClasses = `text-heading-xsmall transition-all font-heading-alt leading-heading-xsmall tracking--05 line-clamp-2
  md:text-heading-small md:leading-heading-small
  lg:text-heading-medium lg:leading-heading-medium
  xl:text-heading-large xl:leading-heading-large`;
const bodyClasses = `text-body-medium transition-all font-body-default leading-body-medium tracking-default line-clamp-2
  xl:text-body-large xl:leading-body-large`;
//# sourceMappingURL=wdpr-landscape-primary-card.js.map
