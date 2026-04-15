'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprModalBody = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    /** Visual variant of the body. 'default-alt' uses alternate background color. */
    variant = 'default';
    calculatedHeight = null;
    resizeObserver;
    mutationObserver;
    calculateTimeout = null;
    componentDidLoad() {
        // Set up ResizeObserver to detect when parent size changes
        this.resizeObserver = new ResizeObserver(() => {
            this.debouncedCalculateHeight();
        });
        this.resizeObserver.observe(this.el);
        // Set up MutationObserver to detect content changes
        this.mutationObserver = new MutationObserver(() => {
            this.debouncedCalculateHeight();
        });
        this.mutationObserver.observe(this.el, {
            childList: true,
            subtree: true,
            characterData: true,
        });
        setTimeout(() => this.calculateHeight(), 100);
    }
    disconnectedCallback() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
        if (this.calculateTimeout) {
            clearTimeout(this.calculateTimeout);
        }
    }
    debouncedCalculateHeight() {
        if (this.calculateTimeout) {
            clearTimeout(this.calculateTimeout);
        }
        this.calculateTimeout = setTimeout(() => {
            this.calculateHeight();
        }, 16); // ~1 frame
    }
    calculateHeight() {
        if (!this.el)
            return;
        // Temporary fix, probably this could be done via css in wdpr-modal.
        // But this is to unblock the issue content not being fully shown when there's a scrollbar.
        const newHeight = this.el.offsetHeight > 0 ? `${this.el.offsetHeight}px` : null;
        if (newHeight !== this.calculatedHeight) {
            this.calculatedHeight = newHeight;
        }
    }
    render() {
        const scrollbarStyle = {
            width: '100%',
        };
        if (this.calculatedHeight) {
            scrollbarStyle.height = this.calculatedHeight;
        }
        else {
            scrollbarStyle.height = '100%';
        }
        const contentClasses = this.variant === 'default-alt'
            ? 'px-300 pr-250 body-large text-justify bg-surface-default-alt'
            : 'px-300 pr-250 body-large text-justify';
        return (index.h("wdpr-scrollbar", { key: 'b7f222358b5650ab4e864fb90eb72c9bda2d1d51', orientation: "vertical", size: "small", "initial-position": "0", class: "block min-h-0 w-full", style: scrollbarStyle }, index.h("div", { key: 'd0ea0c2d1413ac5f2e1411245eabac8139ebfaf4', class: contentClasses }, index.h("slot", { key: '688aefa7fada7fff3d327e19d2d288ad326777bc' }))));
    }
};
WdprModalBody.style = ":host {\n      display: block;\n      flex: 1 1 auto;\n      min-height: 0;\n      max-height: 100%;\n      overflow: hidden;\n    }";

exports.wdpr_modal_body = WdprModalBody;
//# sourceMappingURL=wdpr-modal-body.entry.cjs.js.map

//# sourceMappingURL=wdpr-modal-body.cjs.entry.js.map