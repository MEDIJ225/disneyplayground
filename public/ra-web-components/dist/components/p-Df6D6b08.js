import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { b as forwardCommonHostAttributes } from './p-CXZGMLMW.js';
import { b as bundleCjsExports } from './p-CF3xLdU_.js';

const WdprMedia = /*@__PURE__*/ proxyCustomElement(class WdprMedia extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
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
        return bundleCjsExports.twMerge('relative block w-full overflow-hidden', this.aspectClass, this.roundingClass);
    }
    get placeholderClass() {
        return bundleCjsExports.twMerge('absolute inset-0 w-full h-full', this.fade ? 'opacity-100 transition-opacity duration-500' : '', this.fade && this.loaded ? 'opacity-1250' : '');
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
        return bundleCjsExports.twMerge('block w-full h-full', fit, this.fade ? 'transition-opacity duration-500' : '', this.fade && !this.loaded ? 'opacity-000' : '', !this.fade || this.loaded ? 'opacity-1250' : '');
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
    static get watchers() { return {
        "src": ["syncSources"],
        "smallSrc": ["syncSources"],
        "mediumSrc": ["syncSources"],
        "largeSrc": ["syncSources"]
    }; }
}, [257, "wdpr-media", {
        "src": [1],
        "smallSrc": [1025, "small-src"],
        "mediumSrc": [1025, "medium-src"],
        "largeSrc": [1025, "large-src"],
        "alt": [1],
        "placeholder": [1],
        "fade": [4],
        "aspect": [1],
        "shape": [1],
        "objectFit": [1, "object-fit"],
        "landscapeRatio": [1, "landscape-ratio"],
        "portraitRatio": [1, "portrait-ratio"],
        "loaded": [32]
    }, undefined, {
        "src": ["syncSources"],
        "smallSrc": ["syncSources"],
        "mediumSrc": ["syncSources"],
        "largeSrc": ["syncSources"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-media"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-media":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprMedia);
            }
            break;
    } });
}

export { WdprMedia as W, defineCustomElement as d };
//# sourceMappingURL=p-Df6D6b08.js.map

//# sourceMappingURL=p-Df6D6b08.js.map