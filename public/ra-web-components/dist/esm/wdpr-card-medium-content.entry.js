import { r as registerInstance, h } from './index-CykM8GCN.js';
import { R as RenderCardContent } from './card-content-renderer-CfniURVB.js';
import './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';
import './card-styles-BvI-yBcV.js';

const WdprCardMediumContent = class {
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
        return (h(RenderCardContent, { key: '81033bfd4e93b504e1dd47221da9e20641ecade2', disabled: this.disabled, variant: 'medium', ...props }));
    }
};

export { WdprCardMediumContent as wdpr_card_medium_content };
//# sourceMappingURL=wdpr-card-medium-content.entry.js.map

//# sourceMappingURL=wdpr-card-medium-content.entry.js.map