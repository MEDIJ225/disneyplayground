import { r as registerInstance, h } from './index-CykM8GCN.js';
import { R as RenderCardContent } from './card-content-renderer-CfniURVB.js';
import './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';
import './card-styles-BvI-yBcV.js';

const WdprCardSmallContent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};

export { WdprCardSmallContent as wdpr_card_small_content };
//# sourceMappingURL=wdpr-card-small-content.entry.js.map

//# sourceMappingURL=wdpr-card-small-content.entry.js.map