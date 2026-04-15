import { h } from "@stencil/core";
import { twMerge } from "tailwind-merge";
import lottie from "lottie-web/build/player/lottie_light.min.js";
import { radialLoader } from "./radial-loader";
export class WdprRadialLoader {
    animation;
    container;
    /**
     * Reference to host element
     * @type {HTMLWdprRadialLoaderElement}
     */
    el;
    /**
     * The label and aria-label
     */
    label = 'Loading';
    showLabel = false;
    labelPlacement = 'inline';
    size = 'medium';
    componentDidLoad() {
        this.animation = lottie.loadAnimation({
            container: this.container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: radialLoader,
        });
    }
    disconnectedCallback() {
        if (this.animation) {
            this.animation.destroy();
        }
    }
    get layoutClass() {
        return twMerge('flex items-center gap-100', this.labelPlacement === 'inline' ? 'flex-row' : 'flex-col');
    }
    get labelClasses() {
        return twMerge(labelSizeClasses[this.size], this.showLabel ? '' : ' sr-only');
    }
    render() {
        return (h("div", { key: 'e889baf359e6291c4323132a80e16ae844719227', class: this.layoutClass, role: "status" }, h("div", { key: '6b75984a2cdbdec6312816e7c42ba0da283247e4', class: loaderSizeClasses[this.size], id: "radial-loader", ref: el => (this.container = el), "aria-hidden": "true" }), h("span", { key: 'fbe48a66a5b712bc5b32b116eccc7a73d3c9cb9b', class: this.labelClasses }, this.label)));
    }
    static get is() { return "wdpr-radial-loader"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "label": {
                "type": "string",
                "attribute": "label",
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
                    "text": "The label and aria-label"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Loading'"
            },
            "showLabel": {
                "type": "boolean",
                "attribute": "show-label",
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
            },
            "labelPlacement": {
                "type": "string",
                "attribute": "label-placement",
                "mutable": false,
                "complexType": {
                    "original": "RadialLabelPlacement",
                    "resolved": "\"inline\" | \"stacked\"",
                    "references": {
                        "RadialLabelPlacement": {
                            "location": "import",
                            "path": "./wdpr-radial-loader.model",
                            "id": "src/components/wdpr-radial-loader/wdpr-radial-loader.model.ts::RadialLabelPlacement"
                        }
                    }
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
                "defaultValue": "'inline'"
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "RadialLoaderSize",
                    "resolved": "\"large\" | \"medium\" | \"small\"",
                    "references": {
                        "RadialLoaderSize": {
                            "location": "import",
                            "path": "./wdpr-radial-loader.model",
                            "id": "src/components/wdpr-radial-loader/wdpr-radial-loader.model.ts::RadialLoaderSize"
                        }
                    }
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
                "defaultValue": "'medium'"
            }
        };
    }
    static get elementRef() { return "el"; }
}
const loaderSizeClasses = {
    large: 'size-dimension-700',
    medium: 'size-dimension-550',
    small: 'size-dimension-400',
};
const labelSizeClasses = {
    large: 'label-large',
    medium: 'label-medium',
    small: 'label-small',
};
//# sourceMappingURL=wdpr-radial-loader.js.map
