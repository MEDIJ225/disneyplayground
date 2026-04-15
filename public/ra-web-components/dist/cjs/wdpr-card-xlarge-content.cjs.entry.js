'use strict';

var index = require('./index-4gPM_TYz.js');
var cardContentRenderer = require('./card-content-renderer-DSH1fGA-.js');
require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');
require('./card-styles-CO5BLqZi.js');

const WdprCardXlargeContent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        return (index.h(cardContentRenderer.RenderCardContent, { key: '4ec4d95be38dd10350ec86fbe0b2b41d7fbfc66d', disabled: this.disabled, variant: 'xlarge', ...props }));
    }
};

exports.wdpr_card_xlarge_content = WdprCardXlargeContent;
//# sourceMappingURL=wdpr-card-xlarge-content.entry.cjs.js.map

//# sourceMappingURL=wdpr-card-xlarge-content.cjs.entry.js.map