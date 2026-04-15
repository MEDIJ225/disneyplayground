'use strict';

var index = require('./index-4gPM_TYz.js');
var cardContentRenderer = require('./card-content-renderer-DSH1fGA-.js');
require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');
require('./card-styles-CO5BLqZi.js');

const WdprCardMediumContent = class {
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
        return (index.h(cardContentRenderer.RenderCardContent, { key: '81033bfd4e93b504e1dd47221da9e20641ecade2', disabled: this.disabled, variant: 'medium', ...props }));
    }
};

exports.wdpr_card_medium_content = WdprCardMediumContent;
//# sourceMappingURL=wdpr-card-medium-content.entry.cjs.js.map

//# sourceMappingURL=wdpr-card-medium-content.cjs.entry.js.map