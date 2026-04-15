import { r as registerInstance, h } from './index-CykM8GCN.js';
import { R as RenderCardContent } from './card-content-renderer-CfniURVB.js';
import './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';
import './card-styles-BvI-yBcV.js';

const WdprCardLargeContent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};

export { WdprCardLargeContent as wdpr_card_large_content };
//# sourceMappingURL=wdpr-card-large-content.entry.js.map

//# sourceMappingURL=wdpr-card-large-content.entry.js.map