'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprReadMore = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    contentRef;
    /** Show divider line above content */
    showTopDivider = false;
    /** Show divider line below content */
    showBottomDivider = false;
    /** Whether the content is expanded or collapsed */
    expanded = false;
    /** Whether the read more button is disabled */
    disabled = false;
    /** Text for the expand button */
    expandLabel = 'Read More';
    /** Text for the collapse button */
    collapseLabel = 'Read Less';
    _toggleExpanded = (event) => {
        event.preventDefault();
        const wasExpanded = this.expanded;
        this.expanded = !this.expanded;
        // Move focus to content when expanding for accessibility
        if (!wasExpanded && this.contentRef) {
            requestAnimationFrame(() => {
                this.contentRef.focus();
            });
        }
    };
    render() {
        return (index.h("div", { key: 'b8c65921b9b85f4967c35e5d35a3be3a1441c02c', class: "flex flex-col gap-200 p-200" }, this.showTopDivider && index.h("wdpr-divider", { key: '6e3fe6aaf1f19f1725cf54b902c6c2d2c2d619a1' }), index.h("div", { key: 'ef65de8bd4211250998f0cb9d820dd4bdfab0fcd', class: "transition-all duration-300 text-text-body body-large" }, index.h("div", { key: 'a1ec6103af4992ec9669256fe877053f7083ca37', class: { hidden: this.expanded }, inert: this.expanded, "aria-hidden": this.expanded ? 'true' : undefined }, index.h("slot", { key: '48f9b6a7d5096b09ae599bf8098f03b882950c7d', name: "collapsed" })), index.h("div", { key: 'c6ba5ae227bbbddafd66bb33084df6a831af2953', ref: (el) => (this.contentRef = el), tabindex: this.expanded ? -1 : undefined, class: { 'hidden': !this.expanded, 'focus:outline-none': true }, inert: !this.expanded, "aria-hidden": !this.expanded ? 'true' : undefined }, index.h("slot", { key: 'bcbc40c78448f0a17153229102a4588392508f6c', name: "expanded" }))), index.h("wdpr-read-more-button", { key: '5862c27c7da6472d17c986537299a923d36aa374', expanded: this.expanded, disabled: this.disabled, onClick: this._toggleExpanded }, this.expanded ? this.collapseLabel : this.expandLabel), this.showBottomDivider && index.h("wdpr-divider", { key: 'dfc77e2dbfce57735f4dc6de906985b9c21e159e' })));
    }
};

exports.wdpr_read_more = WdprReadMore;
//# sourceMappingURL=wdpr-read-more.entry.cjs.js.map

//# sourceMappingURL=wdpr-read-more.cjs.entry.js.map