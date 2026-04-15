export declare class WdprCarousel {
    private _scrollContainer?;
    private _itemWidth;
    private _resizeObserver?;
    el: HTMLWdprCarouselElement;
    _showNavigationButtons: boolean;
    _atStart: boolean;
    _atEnd: boolean;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    private _initializeCarousel;
    private _cleanupCarousel;
    private _getSlotElements;
    private _calculateItemWidth;
    private _updateTotalItemsAndClass;
    private _checkOverflow;
    private _updateScrollPosition;
    private _scrollByItemWidth;
    private _handlePrev;
    private _handleNext;
    private _refreshCarouselState;
    private _handleSlotChange;
    private get _showPrevButton();
    private get _showNextButton();
    render(): any;
}
