import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';

const wdprCarouselCss = ":host{--max-items-displayed-sm:1;--max-items-displayed-md:2;--max-items-displayed-lg:4;--max-items-displayed-xl:4;--max-visible-items:var(--max-items-displayed-sm);--spacing-gap:var(--spacing-150);--total-items:0}.scroll-items-container{gap:var(--spacing-gap);grid-auto-columns:calc((100% - var(--spacing-gap) * (var(--max-visible-items) - 1)) / var(--max-visible-items))}:host(.fewer-items) .scroll-items-container{grid-auto-columns:calc((100% - var(--spacing-gap) * (var(--total-items) - 1)) / var(--total-items))}@media (min-width: 768px){:host{--max-visible-items:var(--max-items-displayed-md);--spacing-gap:var(--spacing-200)}}@media (min-width: 1024px){:host{--max-visible-items:var(--max-items-displayed-lg);--spacing-gap:var(--spacing-300)}}@media (min-width: 1880px){:host{--max-visible-items:var(--max-items-displayed-xl)}}@media (max-width: 1023px){.scroll-items-container::after{content:'';width:var(--spacing-gap)}}";

const WdprCarousel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    _scrollContainer;
    _itemWidth = 0;
    _resizeObserver;
    get el() { return getElement(this); }
    _showNavigationButtons = false;
    _atStart = true;
    _atEnd = false;
    componentDidLoad() {
        this._initializeCarousel();
    }
    disconnectedCallback() {
        this._cleanupCarousel();
    }
    _initializeCarousel = () => {
        if (!this._scrollContainer)
            return;
        this._scrollContainer.addEventListener('scroll', this._updateScrollPosition);
        this._resizeObserver = new ResizeObserver(this._refreshCarouselState);
        this._resizeObserver.observe(this._scrollContainer);
        this._refreshCarouselState();
    };
    _cleanupCarousel = () => {
        if (this._scrollContainer) {
            this._scrollContainer.removeEventListener('scroll', this._updateScrollPosition);
        }
        this._resizeObserver?.disconnect();
    };
    _getSlotElements = () => {
        return this._scrollContainer?.querySelector('slot')?.assignedElements() || [];
    };
    _calculateItemWidth = () => {
        const elements = this._getSlotElements();
        const firstItem = elements[0];
        this._itemWidth = firstItem instanceof HTMLElement ? firstItem.offsetWidth : 0;
    };
    _updateTotalItemsAndClass = () => {
        const elements = this._getSlotElements();
        const totalItems = elements.length;
        // Update CSS custom property
        this.el.style.setProperty('--total-items', totalItems.toString());
        // Update fewer-items class based on visible items
        const computedStyle = getComputedStyle(this.el);
        const maxVisibleItems = parseFloat(computedStyle.getPropertyValue('--max-visible-items') || '1');
        this.el.classList.toggle('fewer-items', totalItems < maxVisibleItems);
    };
    _checkOverflow = () => {
        if (!this._scrollContainer)
            return;
        this._showNavigationButtons = this._scrollContainer.scrollWidth > this._scrollContainer.clientWidth;
    };
    _updateScrollPosition = () => {
        if (!this._scrollContainer)
            return;
        const { scrollLeft, scrollWidth, clientWidth } = this._scrollContainer;
        const maxScrollLeft = scrollWidth - clientWidth;
        const threshold = 2;
        this._atStart = scrollLeft <= threshold;
        this._atEnd = scrollLeft >= maxScrollLeft - threshold;
    };
    _scrollByItemWidth = (direction) => {
        if (!this._scrollContainer || !this._itemWidth)
            return;
        const scrollDistance = direction === 'prev' ? -this._itemWidth : this._itemWidth;
        this._scrollContainer.scrollBy({
            left: scrollDistance,
            behavior: 'smooth',
        });
    };
    _handlePrev = () => {
        this._scrollByItemWidth('prev');
    };
    _handleNext = () => {
        this._scrollByItemWidth('next');
    };
    _refreshCarouselState = () => {
        this._updateTotalItemsAndClass();
        this._calculateItemWidth();
        this._checkOverflow();
        this._updateScrollPosition();
    };
    _handleSlotChange = () => {
        this._refreshCarouselState();
    };
    get _showPrevButton() {
        return this._showNavigationButtons && !this._atStart;
    }
    get _showNextButton() {
        return this._showNavigationButtons && !this._atEnd;
    }
    render() {
        return (h("section", { key: '3571d55f777d28b7ab4626faabe309b2898a3e22', class: "relative" }, this._showPrevButton && (h("wdpr-icon-button", { key: '8195403608a54b1d16c6ad0329edce2f67bcac60', class: "absolute left-0 top-1/2 translate-x-0 -translate-y-1/2 z-10 hidden lg:block", iconName: "previous", variant: "bgPrimary", a11yLabel: "Previous Card", onClicked: this._handlePrev })), h("div", { key: '58cb4483e164aa4b6ff2a354fc6e9755f1c66529', class: "overflow-x-visible lg:overflow-x-scroll no-scrollbar py-300 lg:pointer-events-none", ref: el => (this._scrollContainer = el) }, h("div", { key: '3b6b9c6a47f14b90ce3e4983a02cdbc7b14b3f9c', class: "scroll-items-container grid grid-flow-col" }, h("slot", { key: 'ee93b6cda972c4834324605244e1fa74eece372e', onSlotchange: this._handleSlotChange }))), this._showNextButton && (h("wdpr-icon-button", { key: '2fdfae5164a05afd84c5f5ae0f438f688f1e899a', class: "absolute right-0 top-1/2 translate-x-0 -translate-y-1/2 z-10 hidden lg:block", iconName: "next", variant: "bgPrimary", a11yLabel: "Next Card", onClicked: this._handleNext }))));
    }
};
WdprCarousel.style = wdprCarouselCss;

export { WdprCarousel as wdpr_carousel };
//# sourceMappingURL=wdpr-carousel.entry.js.map

//# sourceMappingURL=wdpr-carousel.entry.js.map