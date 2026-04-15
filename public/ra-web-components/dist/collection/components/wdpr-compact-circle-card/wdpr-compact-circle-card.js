import { h } from "@stencil/core";
export class WdprCompactCircleCard {
    headline;
    src;
    a11yAlt;
    render() {
        return (h("article", { key: '2536ba68cd772a42cccb8dd3e3bd588b674038e1', class: wrapperClasses }, h("figure", { key: '6551396e0a9d09a07f725695dbe82e9d3f09f0df', class: mediaWrapperClasses }, h("wdpr-media", { key: '4bd5a4592c6fbdd4690ed1ea63c6e75bf67faad9', src: this.src, alt: this.a11yAlt, aspect: "square", objectFit: "cover" })), h("span", { key: '39fe4df17dee7eb32fa06ed70300c91baca43921', class: headlineClasses }, this.headline)));
    }
    static get is() { return "wdpr-compact-circle-card"; }
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
const wrapperClasses = 'flex flex-col items-center gap-150';
const mediaWrapperClasses = 'w-full aspect-square p-175 md:p-250 bg-surface-default elevation-xsmall-soft rounded-pill overflow-hidden transition-all';
const headlineClasses = 'w-full transition-all text-center text-component-small font-component-default leading-component-small tracking-02 line-clamp-2';
//# sourceMappingURL=wdpr-compact-circle-card.js.map
