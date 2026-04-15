import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { R as RenderCardContent } from './p-BMoaJZ6F.js';

const WdprCardSmallContent$1 = /*@__PURE__*/ proxyCustomElement(class WdprCardSmallContent extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    primaryHeadline;
    body;
    bullets;
    contentType = 'stacked';
    disabled = false;
    inverseColor = false;
    headingLevel = 'h3';
    render() {
        const props = {
            contentType: this.contentType,
            body: this.body,
            bullets: this.bullets,
            primaryHeadline: this.primaryHeadline,
            headingLevel: this.headingLevel,
            inverseColor: this.inverseColor,
        };
        return (h(RenderCardContent, { key: '2174af593674f2a11fca88d96b5e731845f09659', disabled: this.disabled, variant: 'small', ...props }));
    }
}, [257, "wdpr-card-small-content", {
        "primaryHeadline": [1, "primary-headline"],
        "body": [1],
        "bullets": [16],
        "contentType": [1, "content-type"],
        "disabled": [4],
        "inverseColor": [4, "inverse-color"],
        "headingLevel": [1, "heading-level"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-card-small-content"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-card-small-content":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCardSmallContent$1);
            }
            break;
    } });
}

const WdprCardSmallContent = WdprCardSmallContent$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCardSmallContent, defineCustomElement };
//# sourceMappingURL=wdpr-card-small-content.js.map

//# sourceMappingURL=wdpr-card-small-content.js.map