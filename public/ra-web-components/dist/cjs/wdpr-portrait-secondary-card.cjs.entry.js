'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprPortraitSecondaryCard = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    headline;
    src;
    a11yAlt;
    render() {
        return (index.h("article", { key: 'eed1abd6b0068b253bd3983f0e49528ff1ab10cd', class: baseClasses }, index.h("figure", { key: 'f965ef5d07d5475bf764ca2aa1f5775d0163ff75', class: mediaWrapperClasses }, index.h("wdpr-media", { key: '56319f7d15182f79397fc77449e04f5cbe9641cd', src: this.src, alt: this.a11yAlt, aspect: "portrait", objectFit: "cover", portraitRatio: "2:3" })), index.h("span", { key: 'db26e67b5b17d9264461e15901b2b32b21121684', class: headlineClasses }, this.headline)));
    }
};
const baseClasses = 'flex flex-col gap-150 w-full transition-all';
const mediaWrapperClasses = 'elevation-small-soft lg:elevation-medium-soft rounded-300 overflow-hidden';
const headlineClasses = `px-050 text-text-heading transition-all text-heading-xsmall font-heading-alt leading-heading-xsmall tracking--05 line-clamp-2
  md:text-heading-small md:leading-heading-small
  lg:text-heading-medium lg:leading-heading-medium
  xl:text-heading-large xl:leading-heading-large`;

exports.wdpr_portrait_secondary_card = WdprPortraitSecondaryCard;
//# sourceMappingURL=wdpr-portrait-secondary-card.entry.cjs.js.map

//# sourceMappingURL=wdpr-portrait-secondary-card.cjs.entry.js.map