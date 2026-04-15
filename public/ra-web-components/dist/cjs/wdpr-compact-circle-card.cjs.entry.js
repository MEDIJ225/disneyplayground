'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprCompactCircleCard = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    headline;
    src;
    a11yAlt;
    render() {
        return (index.h("article", { key: '2536ba68cd772a42cccb8dd3e3bd588b674038e1', class: wrapperClasses }, index.h("figure", { key: '6551396e0a9d09a07f725695dbe82e9d3f09f0df', class: mediaWrapperClasses }, index.h("wdpr-media", { key: '4bd5a4592c6fbdd4690ed1ea63c6e75bf67faad9', src: this.src, alt: this.a11yAlt, aspect: "square", objectFit: "cover" })), index.h("span", { key: '39fe4df17dee7eb32fa06ed70300c91baca43921', class: headlineClasses }, this.headline)));
    }
};
const wrapperClasses = 'flex flex-col items-center gap-150';
const mediaWrapperClasses = 'w-full aspect-square p-175 md:p-250 bg-surface-default elevation-xsmall-soft rounded-pill overflow-hidden transition-all';
const headlineClasses = 'w-full transition-all text-center text-component-small font-component-default leading-component-small tracking-02 line-clamp-2';

exports.wdpr_compact_circle_card = WdprCompactCircleCard;
//# sourceMappingURL=wdpr-compact-circle-card.entry.cjs.js.map

//# sourceMappingURL=wdpr-compact-circle-card.cjs.entry.js.map