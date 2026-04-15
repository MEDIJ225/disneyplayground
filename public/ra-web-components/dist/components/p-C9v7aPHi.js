import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { R as RenderCardContent } from './p-BMoaJZ6F.js';

const WdprCardMicroContent = /*@__PURE__*/ proxyCustomElement(class WdprCardMicroContent extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    primaryHeadline;
    body;
    disabled = false;
    headingLevel = 'h3';
    render() {
        const props = {
            body: this.body,
            primaryHeadline: this.primaryHeadline,
            headingLevel: this.headingLevel,
        };
        return (h(RenderCardContent, { key: '1d216a795c58c508d5c4e05b611a70ab5ba14cf2', disabled: this.disabled, variant: 'micro', ...props }));
    }
    static get style() { return ":host { display: flex; align-items: center; width: 100%; }"; }
}, [257, "wdpr-card-micro-content", {
        "primaryHeadline": [1, "primary-headline"],
        "body": [1],
        "disabled": [4],
        "headingLevel": [1, "heading-level"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-card-micro-content"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-card-micro-content":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCardMicroContent);
            }
            break;
    } });
}

export { WdprCardMicroContent as W, defineCustomElement as d };
//# sourceMappingURL=p-C9v7aPHi.js.map

//# sourceMappingURL=p-C9v7aPHi.js.map