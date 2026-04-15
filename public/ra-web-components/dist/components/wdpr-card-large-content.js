import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { R as RenderCardContent } from './p-BMoaJZ6F.js';

const WdprCardLargeContent$1 = /*@__PURE__*/ proxyCustomElement(class WdprCardLargeContent extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    primaryHeadline;
    featureHeadline;
    headlineLabel;
    headlineSubtext;
    body;
    bullets;
    disabled = false;
    headingLevel = 'h3';
    render() {
        const props = {
            primaryHeadline: this.primaryHeadline,
            featureHeadline: this.featureHeadline,
            headlineLabel: this.headlineLabel,
            headlineSubtext: this.headlineSubtext,
            body: this.body,
            bullets: this.bullets,
            headingLevel: this.headingLevel,
        };
        return (h(RenderCardContent, { key: '7b750f80b3e3c740a4146e2fc46e8b5296cde389', disabled: this.disabled, variant: 'large', ...props }));
    }
}, [257, "wdpr-card-large-content", {
        "primaryHeadline": [1, "primary-headline"],
        "featureHeadline": [1, "feature-headline"],
        "headlineLabel": [1, "headline-label"],
        "headlineSubtext": [1, "headline-subtext"],
        "body": [1],
        "bullets": [16],
        "disabled": [4],
        "headingLevel": [1, "heading-level"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-card-large-content"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-card-large-content":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCardLargeContent$1);
            }
            break;
    } });
}

const WdprCardLargeContent = WdprCardLargeContent$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCardLargeContent, defineCustomElement };
//# sourceMappingURL=wdpr-card-large-content.js.map

//# sourceMappingURL=wdpr-card-large-content.js.map