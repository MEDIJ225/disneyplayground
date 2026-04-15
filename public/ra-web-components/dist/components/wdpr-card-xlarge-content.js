import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { R as RenderCardContent } from './p-BMoaJZ6F.js';

const WdprCardXlargeContent$1 = /*@__PURE__*/ proxyCustomElement(class WdprCardXlargeContent extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    disabled = false;
    headlineLabel;
    headingLevel = 'h1';
    headlineSubtext;
    hasGradient = false;
    isMobile = false;
    primaryHeadline;
    tagLabel;
    topPadding = false;
    headlineSize = 'xlarge';
    subHeadlineSize = 'large';
    tagSize = 'large';
    render() {
        const props = {
            primaryHeadline: this.primaryHeadline,
            headlineLabel: this.headlineLabel,
            headlineSubtext: this.headlineSubtext,
            headingLevel: this.headingLevel,
            hasGradient: this.hasGradient,
            isMobile: this.isMobile,
            tagLabel: this.tagLabel,
            topPadding: this.topPadding,
            headlineSize: this.headlineSize,
            subHeadlineSize: this.subHeadlineSize,
            tagSize: this.tagSize,
        };
        return (h(RenderCardContent, { key: '4ec4d95be38dd10350ec86fbe0b2b41d7fbfc66d', disabled: this.disabled, variant: 'xlarge', ...props }));
    }
}, [257, "wdpr-card-xlarge-content", {
        "disabled": [4],
        "headlineLabel": [1, "headline-label"],
        "headingLevel": [1, "heading-level"],
        "headlineSubtext": [1, "headline-subtext"],
        "hasGradient": [4, "has-gradient"],
        "isMobile": [4, "is-mobile"],
        "primaryHeadline": [1, "primary-headline"],
        "tagLabel": [1, "tag-label"],
        "topPadding": [4, "top-padding"],
        "headlineSize": [1, "headline-size"],
        "subHeadlineSize": [1, "sub-headline-size"],
        "tagSize": [1, "tag-size"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-card-xlarge-content"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-card-xlarge-content":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCardXlargeContent$1);
            }
            break;
    } });
}

const WdprCardXlargeContent = WdprCardXlargeContent$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCardXlargeContent, defineCustomElement };
//# sourceMappingURL=wdpr-card-xlarge-content.js.map

//# sourceMappingURL=wdpr-card-xlarge-content.js.map