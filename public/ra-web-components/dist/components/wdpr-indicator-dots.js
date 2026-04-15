import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';

const WdprIndicatorDots$1 = /*@__PURE__*/ proxyCustomElement(class WdprIndicatorDots extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
}, [257, "wdpr-indicator-dots", {
        "count": [2],
        "activeIndex": [514, "active-index"],
        "maxDots": [2, "max-dots"],
        "swipeDirection": [513, "swipe-direction"],
        "a11yLabel": [1, "a11y-label"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-indicator-dots"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-indicator-dots":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprIndicatorDots$1);
            }
            break;
    } });
}

const WdprIndicatorDots = WdprIndicatorDots$1;
const defineCustomElement = defineCustomElement$1;

export { WdprIndicatorDots, defineCustomElement };
//# sourceMappingURL=wdpr-indicator-dots.js.map

//# sourceMappingURL=wdpr-indicator-dots.js.map