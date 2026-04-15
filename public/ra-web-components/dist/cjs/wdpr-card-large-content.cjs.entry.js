'use strict';

var index = require('./index-4gPM_TYz.js');
var cardContentRenderer = require('./card-content-renderer-DSH1fGA-.js');
require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');
require('./card-styles-CO5BLqZi.js');

const WdprCardLargeContent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        return (index.h(cardContentRenderer.RenderCardContent, { key: '7b750f80b3e3c740a4146e2fc46e8b5296cde389', disabled: this.disabled, variant: 'large', ...props }));
    }
};

exports.wdpr_card_large_content = WdprCardLargeContent;
//# sourceMappingURL=wdpr-card-large-content.entry.cjs.js.map

//# sourceMappingURL=wdpr-card-large-content.cjs.entry.js.map