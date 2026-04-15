import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CykM8GCN.js';

const WdprPagination = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprPageChange = createEvent(this, "wdprPageChange", 7);
    }
    ELLIPSIS = '...';
    _resizeObserver = null;
    _resizeDebounceTimer = null;
    _lastContainerWidth = 0;
    get el() { return getElement(this); }
    _calculatedMaxVisibleItems = 10;
    totalPages = 1;
    currentPage = 1;
    showNavControls = true;
    maxVisibleItems = 10;
    hidePaginationGroup = false;
    collapsed = true;
    wdprPageChange;
    handleConfigChange() {
        this._calculateVisibleItems();
    }
    componentDidLoad() {
        this._setupResizeObserver();
        this._calculateVisibleItems();
    }
    disconnectedCallback() {
        this._cleanupResizeObserver();
    }
    _setupResizeObserver() {
        this._resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const newWidth = entry.contentRect.width;
                if (Math.abs(newWidth - this._lastContainerWidth) > 1) {
                    this._lastContainerWidth = newWidth;
                    this._debouncedCalculateVisibleItems();
                }
            }
        });
        this._resizeObserver.observe(this.el);
    }
    _cleanupResizeObserver() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = null;
        }
        if (this._resizeDebounceTimer) {
            clearTimeout(this._resizeDebounceTimer);
            this._resizeDebounceTimer = null;
        }
    }
    _debouncedCalculateVisibleItems() {
        if (this._resizeDebounceTimer) {
            clearTimeout(this._resizeDebounceTimer);
        }
        this._resizeDebounceTimer = setTimeout(() => {
            this._calculateVisibleItems();
        }, 16);
    }
    _calculateVisibleItems() {
        const containerWidth = this.el.getBoundingClientRect().width;
        if (containerWidth === 0)
            return;
        const itemWidth = 48;
        const navControlsWidth = this.showNavControls ? 260 : 0;
        const availableWidth = containerWidth - navControlsWidth;
        const fittableItems = Math.floor(availableWidth / itemWidth);
        this._calculatedMaxVisibleItems = Math.max(1, Math.min(fittableItems, this.maxVisibleItems));
    }
    _handlePageClick(page) {
        if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
            this.currentPage = page;
            this.wdprPageChange.emit({ page });
        }
    }
    _getPaginationRange() {
        const totalPageCount = this.totalPages;
        const maxItems = this._calculatedMaxVisibleItems;
        if (totalPageCount <= maxItems || this.collapsed === false) {
            return Array.from({ length: totalPageCount }, (_, i) => i + 1);
        }
        const siblingCount = Math.max(1, Math.floor((maxItems - 4) / 2));
        const leftSiblingIndex = Math.max(this.currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(this.currentPage + siblingCount, totalPageCount);
        const showLeftDots = leftSiblingIndex > 2;
        const showRightDots = rightSiblingIndex < totalPageCount - 1;
        if (!showLeftDots && !showRightDots) {
            return Array.from({ length: totalPageCount }, (_, i) => i + 1);
        }
        if (!showLeftDots && showRightDots) {
            const leftItemCount = maxItems - 2;
            const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
            return [...leftRange, this.ELLIPSIS, totalPageCount];
        }
        if (showLeftDots && !showRightDots) {
            const rightItemCount = maxItems - 2;
            const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPageCount - rightItemCount + i + 1);
            return [1, this.ELLIPSIS, ...rightRange];
        }
        const middleCount = maxItems - 4;
        const leftSibling = Math.max(this.currentPage - Math.floor(middleCount / 2), 2);
        const middleRange = Array.from({ length: middleCount }, (_, i) => leftSibling + i);
        return [1, this.ELLIPSIS, ...middleRange, this.ELLIPSIS, totalPageCount];
    }
    render() {
        return (h("nav", { key: '28e31ab24efdfe6b2e40e366a541991bf0bfb933', class: "flex items-center w-full justify-center", role: "navigation", "aria-label": "Pagination" }, this.showNavControls && (h("wdpr-button", { key: 'fa35eeb3167378cca5dfca95a0e4719ae9996afd', variant: "text", disabled: this.currentPage === 1, onClick: () => this._handlePageClick(this.currentPage - 1), "a11y-label": "Previous Page", class: "mr-200", size: "medium" }, h("div", { key: 'd7d96862f5707101719c9b5e9d98f3fc2a72a628', slot: "leading-icon" }, h("wdpr-icon-library", { key: '679c27348ff9c2c3fb178fe1258ed5f992a6e893', icon: "previous", decorative: true })), "Previous")), !this.hidePaginationGroup && (this._calculatedMaxVisibleItems < 5 && this.collapsed ? (h("div", { class: "flex items-center py-150 px-100 h-[40px]", "aria-live": "polite", "aria-atomic": "true" }, h("span", { class: "component-large text-text-body" }, this.currentPage, " / ", this.totalPages))) : (h("ul", { class: "flex items-center gap-100 m-0 p-0 list-none" }, this._getPaginationRange().map((page, index) => {
            if (page === this.ELLIPSIS) {
                return (h("li", { key: `ellipsis-${index}` }, h("wdpr-pagination-readonly", null)));
            }
            const pageNumber = page;
            return (h("li", { key: pageNumber }, h("wdpr-pagination-item", { page: pageNumber, selected: pageNumber === this.currentPage, "aria-current": pageNumber === this.currentPage ? 'page' : undefined, onWdprClick: () => this._handlePageClick(pageNumber), "a11y-label": `Page ${pageNumber}` })));
        })))), this.showNavControls && (h("wdpr-button", { key: 'aa22ddf2a7df59a993bb78846099661921a40958', variant: "text", disabled: this.currentPage === this.totalPages, onClick: () => this._handlePageClick(this.currentPage + 1), "a11y-label": "Next Page", class: "ml-200", size: "medium" }, "Next", h("div", { key: '98c924c160ef6670253c7a1bd1bb497da203917c', slot: "trailing-icon" }, h("wdpr-icon-library", { key: 'e018280826ee5fe7985219e29fff96c38fa63a00', icon: "next", decorative: true }))))));
    }
    static get watchers() { return {
        "maxVisibleItems": ["handleConfigChange"],
        "showNavControls": ["handleConfigChange"]
    }; }
};

export { WdprPagination as wdpr_pagination };
//# sourceMappingURL=wdpr-pagination.entry.js.map

//# sourceMappingURL=wdpr-pagination.entry.js.map