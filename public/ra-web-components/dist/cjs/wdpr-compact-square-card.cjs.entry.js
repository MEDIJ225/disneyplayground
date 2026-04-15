'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprCompactSquareCard = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    headline;
    src;
    a11yAlt;
    render() {
        return (index.h("article", { key: '76d139e093e9cb4170b43cd10dd7305262297de2', class: baseClasses }, index.h("figure", { key: 'e06d39a918f44a654e6d58cef4f532de87006101', class: mediaWrapperClasses }, index.h("wdpr-media", { key: 'b1d4ce5540f6bd1d1fed51f88a080796f6ad7c6f', src: this.src, alt: this.a11yAlt, aspect: "square", objectFit: "cover" })), index.h("span", { key: 'e68119bebeb2952e619df478eaf32f05da2d7f70', class: headlineClasses }, this.headline)));
    }
};
const baseClasses = 'flex flex-col gap-150 w-full transition-all';
const mediaWrapperClasses = 'elevation-medium-soft rounded-300 overflow-hidden';
const headlineClasses = `text-text-heading transition-all text-heading-xsmall font-heading-alt leading-heading-xsmall line-clamp-2 pl-100 pr-200
  lg:text-heading-large lg:font-heading-default lg:leading-heading-large`;

exports.wdpr_compact_square_card = WdprCompactSquareCard;
//# sourceMappingURL=wdpr-compact-square-card.entry.cjs.js.map

//# sourceMappingURL=wdpr-compact-square-card.cjs.entry.js.map