import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { R as RenderCardContent } from './p-BMoaJZ6F.js';

const WdprCardMediumContent$1 = /*@__PURE__*/ proxyCustomElement(class WdprCardMediumContent extends H {
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
        return (h(RenderCardContent, { key: '81033bfd4e93b504e1dd47221da9e20641ecade2', disabled: this.disabled, variant: 'medium', ...props }));
    }
}, [257, "wdpr-card-medium-content", {
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
    const components = ["wdpr-card-medium-content"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-card-medium-content":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCardMediumContent$1);
            }
            break;
    } });
}

const WdprCardMediumContent = WdprCardMediumContent$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCardMediumContent, defineCustomElement };
//# sourceMappingURL=wdpr-card-medium-content.js.map

//# sourceMappingURL=wdpr-card-medium-content.js.map