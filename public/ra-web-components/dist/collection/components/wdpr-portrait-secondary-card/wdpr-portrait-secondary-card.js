import { h } from "@stencil/core";
export class WdprPortraitSecondaryCard {
    headline;
    src;
    a11yAlt;
    render() {
        return (h("article", { key: 'eed1abd6b0068b253bd3983f0e49528ff1ab10cd', class: baseClasses }, h("figure", { key: 'f965ef5d07d5475bf764ca2aa1f5775d0163ff75', class: mediaWrapperClasses }, h("wdpr-media", { key: '56319f7d15182f79397fc77449e04f5cbe9641cd', src: this.src, alt: this.a11yAlt, aspect: "portrait", objectFit: "cover", portraitRatio: "2:3" })), h("span", { key: 'db26e67b5b17d9264461e15901b2b32b21121684', class: headlineClasses }, this.headline)));
    }
    static get is() { return "wdpr-portrait-secondary-card"; }
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
            }
        };
    }
}
const baseClasses = 'flex flex-col gap-150 w-full transition-all';
const mediaWrapperClasses = 'elevation-small-soft lg:elevation-medium-soft rounded-300 overflow-hidden';
const headlineClasses = `px-050 text-text-heading transition-all text-heading-xsmall font-heading-alt leading-heading-xsmall tracking--05 line-clamp-2
  md:text-heading-small md:leading-heading-small
  lg:text-heading-medium lg:leading-heading-medium
  xl:text-heading-large xl:leading-heading-large`;
//# sourceMappingURL=wdpr-portrait-secondary-card.js.map
