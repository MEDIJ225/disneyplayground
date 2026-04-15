import { h } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
export class WdprIndicatorDots {
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
    static get is() { return "wdpr-indicator-dots"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "count": {
                "type": "number",
                "attribute": "count",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Total number of dots"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "3"
            },
            "activeIndex": {
                "type": "number",
                "attribute": "active-index",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Zero-based index of the active dot"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "0"
            },
            "maxDots": {
                "type": "number",
                "attribute": "max-dots",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Maximum number of dots to show at once"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "5"
            },
            "swipeDirection": {
                "type": "string",
                "attribute": "swipe-direction",
                "mutable": false,
                "complexType": {
                    "original": "SwipeDirection",
                    "resolved": "\"left\" | \"right\"",
                    "references": {
                        "SwipeDirection": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-indicator-dots/wdpr-indicator-dots.tsx",
                            "id": "src/components/wdpr-indicator-dots/wdpr-indicator-dots.tsx::SwipeDirection"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Swipe direction \u2014 determines which edge dot is truncated"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'right'"
            },
            "a11yLabel": {
                "type": "string",
                "attribute": "a11y-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Accessible label for the indicator"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Carousel indicator'"
            }
        };
    }
}
//# sourceMappingURL=wdpr-indicator-dots.js.map
