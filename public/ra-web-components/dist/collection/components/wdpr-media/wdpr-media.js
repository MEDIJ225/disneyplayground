import { h } from "@stencil/core";
import { forwardCommonHostAttributes, twMerge } from "../../utils/utils";
export class WdprMedia {
    el;
    /** Base/fallback image source */
    src;
    /** Responsive source for small screens (eg., smart phones) */
    smallSrc;
    /** Responsive sources for medium screens (e.g., tablets) */
    mediumSrc;
    /** Responsive sources for large screens (e.g., desktops) */
    largeSrc;
    /** Alt text */
    alt = null;
    /** Placeholder (URL/base64) or CSS `url('...')` */
    placeholder = null;
    /** Fade from placeholder to image on load */
    fade = false;
    /** High-level aspect preset */
    aspect = 'landscape';
    /** For aspect="square": flat=square, round=circle */
    shape = 'flat';
    /** CSS object-fit for the image */
    objectFit = 'cover';
    /** Landscape ratio preset (used only when aspect="landscape") */
    landscapeRatio = '16:9';
    /** Portrait ratio preset (used only when aspect="portrait") */
    portraitRatio = '3:4';
    loaded = false;
    // Normalize sources whenever one changes
    syncSources() {
        this.smallSrc = this.smallSrc || this.src;
        this.mediumSrc = this.mediumSrc || this.src;
        this.largeSrc = this.largeSrc || this.src;
    }
    componentWillLoad() {
        this.syncSources();
    }
    // ---------- Tailwind class helpers ----------
    landscapeAspectClassMap = {
        '45:8': 'aspect-[45/8]',
        '32:9': 'aspect-[32/9]',
        '3:1': 'aspect-[3/1]',
        '5:2': 'aspect-[5/2]',
        '40:17': 'aspect-[40/17]',
        '7:3': 'aspect-[7/3]',
        '2:1': 'aspect-[2/1]',
        '16:9': 'aspect-[16/9]',
        '3:2': 'aspect-[3/2]',
        '4:3': 'aspect-[4/3]',
        '5:4': 'aspect-[5/4]'
    };
    portraitAspectClassMap = {
        '4:5': 'aspect-[4/5]',
        '3:4': 'aspect-[3/4]',
        '5:7': 'aspect-[5/7]',
        '2:3': 'aspect-[2/3]',
        '9:16': 'aspect-[9/16]',
        '3:7': 'aspect-[3/7]',
        '1:3': 'aspect-[1/3]'
    };
    get aspectClass() {
        if (this.aspect === 'square')
            return 'aspect-square';
        if (this.aspect === 'portrait')
            return this.portraitAspectClassMap[this.portraitRatio] || this.portraitAspectClassMap['3:4'];
        return this.landscapeAspectClassMap[this.landscapeRatio] || this.landscapeAspectClassMap['16:9'];
    }
    get roundingClass() {
        return this.aspect === 'square' && this.shape === 'round' ? 'rounded-full' : 'rounded-none';
    }
    get wrapperClass() {
        return twMerge('relative block w-full overflow-hidden', this.aspectClass, this.roundingClass);
    }
    get placeholderClass() {
        return twMerge('absolute inset-0 w-full h-full', this.fade ? 'opacity-100 transition-opacity duration-500' : '', this.fade && this.loaded ? 'opacity-1250' : '');
    }
    get pictureClass() {
        return 'absolute inset-0 block w-full h-full';
    }
    get imgClass() {
        const fit = this.objectFit === 'contain' ?
            'object-contain' :
            this.objectFit === 'fill' ?
                'object-fill' :
                this.objectFit === 'none' ?
                    'object-none' :
                    this.objectFit === 'scale-down' ?
                        'object-scale-down' :
                        'object-cover';
        return twMerge('block w-full h-full', fit, this.fade ? 'transition-opacity duration-500' : '', this.fade && !this.loaded ? 'opacity-000' : '', !this.fade || this.loaded ? 'opacity-1250' : '');
    }
    extractUrlFromCssUrl(input) {
        const m = input?.match(/^url\((?:'|")?(.*?)(?:'|")?\)$/i);
        return m?.[1] || null;
    }
    handleLoad = () => {
        if (this.fade)
            this.loaded = true;
    };
    render() {
        const urlFromCss = this.placeholder?.startsWith('url(') ? this.extractUrlFromCssUrl(this.placeholder) : null;
        const placeholderSrc = urlFromCss || this.placeholder;
        return (h("div", { key: '26ed6493ff726d61789efa9b1d6d17b8ce77688a', ...forwardCommonHostAttributes(this.el), class: this.wrapperClass }, placeholderSrc && h("img", { key: '56a907ac5f56d5badb10138d1d2a6747dfbf4b9e', part: "placeholder", src: placeholderSrc, alt: "", "aria-hidden": "true", class: this.placeholderClass, loading: "eager", decoding: "async" }), h("picture", { key: 'eeba9d7438a43cae129bb2d31908bfbcfc00c7aa', class: this.pictureClass }, this.largeSrc && h("source", { key: '74d03c6c1c7859731f301f825857277e722e336c', srcSet: this.largeSrc, media: "(min-width: 1024px)" }), this.mediumSrc && h("source", { key: 'b0dcb5f9238b882a2135f84fdeb715a42d3f471e', srcSet: this.mediumSrc, media: "(min-width: 640px)" }), h("img", { key: 'c4e971e6de245152da27446265b866df60d256f5', part: "image", src: this.smallSrc || this.src, alt: this.alt || '', loading: this.fade ? 'eager' : 'lazy', decoding: "async", onLoad: this.handleLoad, class: this.imgClass }))));
    }
    static get is() { return "wdpr-media"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
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
                    "text": "Base/fallback image source"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "smallSrc": {
                "type": "string",
                "attribute": "small-src",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Responsive source for small screens (eg., smart phones)"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "mediumSrc": {
                "type": "string",
                "attribute": "medium-src",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Responsive sources for medium screens (e.g., tablets)"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "largeSrc": {
                "type": "string",
                "attribute": "large-src",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Responsive sources for large screens (e.g., desktops)"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "alt": {
                "type": "string",
                "attribute": "alt",
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
                    "text": "Alt text"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "null"
            },
            "placeholder": {
                "type": "string",
                "attribute": "placeholder",
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
                    "text": "Placeholder (URL/base64) or CSS `url('...')`"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "null"
            },
            "fade": {
                "type": "boolean",
                "attribute": "fade",
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
                    "text": "Fade from placeholder to image on load"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "aspect": {
                "type": "string",
                "attribute": "aspect",
                "mutable": false,
                "complexType": {
                    "original": "MediaAspect",
                    "resolved": "\"landscape\" | \"portrait\" | \"square\"",
                    "references": {
                        "MediaAspect": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-media/wdpr-media.tsx",
                            "id": "src/components/wdpr-media/wdpr-media.tsx::MediaAspect"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "High-level aspect preset"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'landscape'"
            },
            "shape": {
                "type": "string",
                "attribute": "shape",
                "mutable": false,
                "complexType": {
                    "original": "MediaShape",
                    "resolved": "\"flat\" | \"round\"",
                    "references": {
                        "MediaShape": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-media/wdpr-media.tsx",
                            "id": "src/components/wdpr-media/wdpr-media.tsx::MediaShape"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "For aspect=\"square\": flat=square, round=circle"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'flat'"
            },
            "objectFit": {
                "type": "string",
                "attribute": "object-fit",
                "mutable": false,
                "complexType": {
                    "original": "ObjectFit",
                    "resolved": "\"contain\" | \"cover\" | \"fill\" | \"none\" | \"scale-down\"",
                    "references": {
                        "ObjectFit": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-media/wdpr-media.tsx",
                            "id": "src/components/wdpr-media/wdpr-media.tsx::ObjectFit"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "CSS object-fit for the image"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'cover'"
            },
            "landscapeRatio": {
                "type": "string",
                "attribute": "landscape-ratio",
                "mutable": false,
                "complexType": {
                    "original": "LandscapeRatio",
                    "resolved": "\"16:9\" | \"2:1\" | \"32:9\" | \"3:1\" | \"3:2\" | \"40:17\" | \"45:8\" | \"4:3\" | \"5:2\" | \"5:4\" | \"7:3\"",
                    "references": {
                        "LandscapeRatio": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-media/wdpr-media.tsx",
                            "id": "src/components/wdpr-media/wdpr-media.tsx::LandscapeRatio"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Landscape ratio preset (used only when aspect=\"landscape\")"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'16:9'"
            },
            "portraitRatio": {
                "type": "string",
                "attribute": "portrait-ratio",
                "mutable": false,
                "complexType": {
                    "original": "PortraitRatio",
                    "resolved": "\"1:3\" | \"2:3\" | \"3:4\" | \"3:7\" | \"4:5\" | \"5:7\" | \"9:16\"",
                    "references": {
                        "PortraitRatio": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-media/wdpr-media.tsx",
                            "id": "src/components/wdpr-media/wdpr-media.tsx::PortraitRatio"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Portrait ratio preset (used only when aspect=\"portrait\")"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'3:4'"
            }
        };
    }
    static get states() {
        return {
            "loaded": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "src",
                "methodName": "syncSources"
            }, {
                "propName": "smallSrc",
                "methodName": "syncSources"
            }, {
                "propName": "mediumSrc",
                "methodName": "syncSources"
            }, {
                "propName": "largeSrc",
                "methodName": "syncSources"
            }];
    }
}
//# sourceMappingURL=wdpr-media.js.map
