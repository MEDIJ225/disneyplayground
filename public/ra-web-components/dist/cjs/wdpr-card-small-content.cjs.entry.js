'use strict';

var index = require('./index-4gPM_TYz.js');
var cardContentRenderer = require('./card-content-renderer-DSH1fGA-.js');
require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');
require('./card-styles-CO5BLqZi.js');

const WdprCardSmallContent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        return (index.h(cardContentRenderer.RenderCardContent, { key: '2174af593674f2a11fca88d96b5e731845f09659', disabled: this.disabled, variant: 'small', ...props }));
    }
};

exports.wdpr_card_small_content = WdprCardSmallContent;
//# sourceMappingURL=wdpr-card-small-content.entry.cjs.js.map

//# sourceMappingURL=wdpr-card-small-content.cjs.entry.js.map