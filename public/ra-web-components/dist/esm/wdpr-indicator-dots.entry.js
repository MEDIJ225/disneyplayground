import { r as registerInstance, h } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprIndicatorDots = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** Total number of dots */
    count = 3;
    /** Zero-based index of the active dot */
    activeIndex = 0;
    /** Maximum number of dots to show at once */
    maxDots = 5;
    /** Swipe direction — determines which edge dot is truncated */
    swipeDirection = 'right';
    /** Accessible label for the indicator */
    a11yLabel = 'Carousel indicator';
    get visibleStart() {
        if (this.count <= this.maxDots)
            return 0;
        const maxStart = this.count - this.maxDots;
        let start;
        if (this.swipeDirection === 'right') {
            // active sits one from the leading edge, leaving room for truncation dot behind
            start = this.activeIndex - 1;
        }
        else {
            // active sits one from the trailing edge, leaving room for truncation dot ahead
            start = this.activeIndex - (this.maxDots - 2);
        }
        return Math.max(0, Math.min(start, maxStart));
    }
    get visibleIndices() {
        const start = this.visibleStart;
        const end = Math.min(start + this.maxDots, this.count);
        return Array.from({ length: end - start }, (_, i) => start + i);
    }
    isTruncationDot(index) {
        if (this.count <= this.maxDots)
            return false;
        const indices = this.visibleIndices;
        const first = indices[0];
        const last = indices[indices.length - 1];
        const hasMoreBefore = first > 0;
        const hasMoreAfter = last < this.count - 1;
        return (hasMoreAfter && index === last) || (hasMoreBefore && index === first);
    }
    dotClass(index) {
        const isActive = index === this.activeIndex;
        const isTruncated = this.isTruncationDot(index);
        const size = isTruncated ? 'w-dimension-025 h-dimension-025 md:w-dimension-037 md:h-dimension-037' : 'w-dimension-050 h-dimension-050 md:w-dimension-075 md:h-dimension-075';
        const color = isActive ? 'bg-white' : 'bg-surface-white-000-a48';
        return customTwMerge('rounded-pill transition-all duration-200 ease-enchanted-ease', size, color);
    }
    render() {
        return (h("div", { key: '4d88c27e11051873b302bb3feafae33c574592de', part: "container", role: "tablist", "aria-label": this.a11yLabel, class: "inline-flex items-center gap-050 md:gap-075 px-100 py-075 md:px-150 md:py-125 rounded-pill bg-effect-plum-900-a78" }, this.visibleIndices.map(i => (h("span", { key: i, part: i === this.activeIndex ? 'dot dot-active' : 'dot', role: "tab", "aria-selected": String(i === this.activeIndex), "aria-label": `Slide ${i + 1} of ${this.count}`, class: this.dotClass(i) })))));
    }
};

export { WdprIndicatorDots as wdpr_indicator_dots };
//# sourceMappingURL=wdpr-indicator-dots.entry.js.map

//# sourceMappingURL=wdpr-indicator-dots.entry.js.map