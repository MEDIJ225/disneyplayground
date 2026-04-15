'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprScrollbar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.scrollChange = index.createEvent(this, "scrollChange", 7);
        this.positionInitialized = index.createEvent(this, "positionInitialized", 7);
    }
    scrollContainer;
    scrollContent;
    scrollThumb;
    scrollTrack;
    isDragging = false;
    startPosition = 0;
    startScroll = 0;
    observer;
    hasInitialized = false;
    get el() { return index.getElement(this); }
    orientation = 'vertical';
    size = 'medium';
    initialPosition = 0;
    autoHide = false;
    hideDelay = 1000;
    minThumbSize = 30;
    scrollSpeed = 1;
    smoothScroll = true;
    thumbSize = 0;
    thumbPosition = 0;
    isVisible = true;
    isHovering = false;
    hideTimeout = null;
    scrollChange;
    positionInitialized;
    componentDidLoad() {
        // Use requestAnimationFrame for better timing
        requestAnimationFrame(() => {
            this.initializeScrollbar();
            this.setupResizeObserver();
            this.calculateThumbSize();
            this.setInitialPosition();
            this.updateThumbPosition();
            this.hasInitialized = true;
        });
    }
    disconnectedCallback() {
        if (this.observer) {
            this.observer.disconnect();
        }
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
        this.removeEventListeners();
    }
    handleOrientationChange() {
        requestAnimationFrame(() => {
            this.calculateThumbSize();
            this.updateThumbPosition();
        });
    }
    handleInitialPositionChange() {
        if (this.hasInitialized) {
            this.setInitialPosition();
        }
    }
    handleFocus = () => {
        this.showScrollbar();
    };
    handleBlur = () => {
        this.hideScrollbarAfterDelay();
    };
    validatePercentage(value) {
        return Math.max(0, Math.min(100, value));
    }
    setInitialPosition() {
        if (!this.scrollContent || !this.scrollContainer)
            return;
        const isVertical = this.orientation === 'vertical';
        const contentSize = isVertical ? this.scrollContent.scrollHeight : this.scrollContent.scrollWidth;
        const containerSize = isVertical ? this.scrollContainer.clientHeight : this.scrollContainer.clientWidth;
        const maxScroll = contentSize - containerSize;
        if (maxScroll <= 0)
            return;
        const validatedPercentage = this.validatePercentage(this.initialPosition);
        const targetPosition = (validatedPercentage / 100) * maxScroll;
        if (this.smoothScroll && this.hasInitialized) {
            this.scrollContent.scrollTo({
                [isVertical ? 'top' : 'left']: targetPosition,
                behavior: 'smooth',
            });
        }
        else {
            if (isVertical) {
                this.scrollContent.scrollTop = targetPosition;
            }
            else {
                this.scrollContent.scrollLeft = targetPosition;
            }
        }
        this.positionInitialized.emit({
            position: targetPosition,
            percentage: validatedPercentage,
        });
    }
    initializeScrollbar() {
        this.scrollContainer = this.el.shadowRoot?.querySelector('.scroll-container');
        this.scrollContent = this.el.shadowRoot?.querySelector('.scroll-content');
        this.scrollThumb = this.el.shadowRoot?.querySelector('.scroll-thumb');
        this.scrollTrack = this.el.shadowRoot?.querySelector('.scroll-track');
        if (this.scrollContent) {
            this.scrollContent.addEventListener('scroll', this.handleScroll.bind(this));
            this.scrollContent.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
        }
        if (this.scrollThumb) {
            this.scrollThumb.addEventListener('mousedown', this.handleThumbMouseDown.bind(this));
            this.scrollThumb.addEventListener('touchstart', this.handleThumbTouchStart.bind(this), { passive: false });
        }
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }
    removeEventListeners() {
        document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
        document.removeEventListener('touchmove', this.handleTouchMove.bind(this));
        document.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    }
    setupResizeObserver() {
        this.observer = new ResizeObserver(() => {
            requestAnimationFrame(() => {
                this.calculateThumbSize();
                this.updateThumbPosition();
            });
        });
        if (this.scrollContent) {
            this.observer.observe(this.scrollContent);
        }
        if (this.scrollContainer) {
            this.observer.observe(this.scrollContainer);
        }
    }
    calculateThumbSize() {
        if (!this.scrollContent || !this.scrollContainer || !this.scrollTrack)
            return;
        const isVertical = this.orientation === 'vertical';
        // Use track size instead of container size for more accurate calculations
        const trackSize = isVertical ? this.scrollTrack.clientHeight : this.scrollTrack.clientWidth;
        const containerSize = isVertical ? this.scrollContainer.clientHeight : this.scrollContainer.clientWidth;
        const contentSize = isVertical ? this.scrollContent.scrollHeight : this.scrollContent.scrollWidth;
        // Check if scrollbar is needed
        if (contentSize <= containerSize || trackSize === 0) {
            this.thumbSize = 0;
            this.isVisible = false;
            return;
        }
        // Calculate thumb size based on the ratio of visible content
        const thumbRatio = containerSize / contentSize;
        const calculatedSize = trackSize * thumbRatio;
        // Apply minimum thumb size
        this.thumbSize = Math.max(calculatedSize, this.minThumbSize);
        // Ensure thumb doesn't exceed track size
        if (this.thumbSize >= trackSize) {
            this.thumbSize = Math.max(this.minThumbSize, trackSize - 4); // Leave some space
        }
        // Show scrollbar if needed
        if (!this.autoHide || this.isHovering || this.isDragging) {
            this.isVisible = true;
        }
    }
    updateThumbPosition() {
        if (!this.scrollContent || !this.scrollContainer || !this.scrollTrack || this.thumbSize === 0)
            return;
        const isVertical = this.orientation === 'vertical';
        const scrollPos = isVertical ? this.scrollContent.scrollTop : this.scrollContent.scrollLeft;
        const containerSize = isVertical ? this.scrollContainer.clientHeight : this.scrollContainer.clientWidth;
        const contentSize = isVertical ? this.scrollContent.scrollHeight : this.scrollContent.scrollWidth;
        const trackSize = isVertical ? this.scrollTrack.clientHeight : this.scrollTrack.clientWidth;
        const maxScroll = contentSize - containerSize;
        if (maxScroll <= 0) {
            this.thumbPosition = 0;
            return;
        }
        // Calculate thumb position within the track
        const maxThumbPos = trackSize - this.thumbSize;
        const scrollRatio = scrollPos / maxScroll;
        this.thumbPosition = scrollRatio * maxThumbPos;
        // Clamp position to valid range
        this.thumbPosition = Math.max(0, Math.min(this.thumbPosition, maxThumbPos));
        const percentage = (scrollPos / maxScroll) * 100;
        this.scrollChange.emit({ position: scrollPos, percentage });
    }
    handleScroll() {
        this.updateThumbPosition();
        this.showScrollbar();
    }
    _isScrollableChild(event) {
        const isVertical = this.orientation === 'vertical';
        const delta = isVertical ? event.deltaY : event.deltaX;
        for (const node of event.composedPath()) {
            const el = node;
            if (el === this.scrollContent)
                break;
            if (!(el instanceof HTMLElement))
                continue;
            const { overflow, overflowY, overflowX } = getComputedStyle(el);
            const scrollable = isVertical ? /auto|scroll/.test(overflowY) || /auto|scroll/.test(overflow) : /auto|scroll/.test(overflowX) || /auto|scroll/.test(overflow);
            if (!scrollable)
                continue;
            const hasRoom = isVertical
                ? (delta < 0 && el.scrollTop > 0) || (delta > 0 && el.scrollTop < el.scrollHeight - el.clientHeight)
                : (delta < 0 && el.scrollLeft > 0) || (delta > 0 && el.scrollLeft < el.scrollWidth - el.clientWidth);
            if (hasRoom)
                return true;
        }
        return false;
    }
    handleWheel(event) {
        const isVertical = this.orientation === 'vertical';
        if ((isVertical && event.deltaY !== 0) || (!isVertical && event.deltaX !== 0)) {
            if (this._isScrollableChild(event))
                return;
            event.preventDefault();
            const delta = isVertical ? event.deltaY : event.deltaX;
            if (isVertical) {
                this.scrollContent.scrollTop += delta * this.scrollSpeed;
            }
            else {
                this.scrollContent.scrollLeft += delta * this.scrollSpeed;
            }
        }
    }
    handleThumbMouseDown(event) {
        event.preventDefault();
        this.startDragging(event.clientX, event.clientY);
    }
    handleThumbTouchStart(event) {
        event.preventDefault();
        const touch = event.touches[0];
        this.startDragging(touch.clientX, touch.clientY);
    }
    startDragging(clientX, clientY) {
        this.isDragging = true;
        const isVertical = this.orientation === 'vertical';
        this.startPosition = isVertical ? clientY : clientX;
        this.startScroll = isVertical ? this.scrollContent.scrollTop : this.scrollContent.scrollLeft;
        document.body.style.userSelect = 'none';
    }
    handleMouseMove(event) {
        if (!this.isDragging)
            return;
        this.performDrag(event.clientX, event.clientY);
    }
    handleTouchMove(event) {
        if (!this.isDragging)
            return;
        event.preventDefault();
        const touch = event.touches[0];
        this.performDrag(touch.clientX, touch.clientY);
    }
    performDrag(clientX, clientY) {
        if (!this.scrollTrack)
            return;
        const isVertical = this.orientation === 'vertical';
        const currentPosition = isVertical ? clientY : clientX;
        const diff = currentPosition - this.startPosition;
        const trackSize = isVertical ? this.scrollTrack.clientHeight : this.scrollTrack.clientWidth;
        const containerSize = isVertical ? this.scrollContainer.clientHeight : this.scrollContainer.clientWidth;
        const contentSize = isVertical ? this.scrollContent.scrollHeight : this.scrollContent.scrollWidth;
        const maxScroll = contentSize - containerSize;
        const maxThumbPos = trackSize - this.thumbSize;
        if (maxThumbPos <= 0)
            return;
        const scrollRatio = maxScroll / maxThumbPos;
        const scrollDiff = diff * scrollRatio;
        if (isVertical) {
            this.scrollContent.scrollTop = this.startScroll + scrollDiff;
        }
        else {
            this.scrollContent.scrollLeft = this.startScroll + scrollDiff;
        }
    }
    handleMouseUp() {
        this.stopDragging();
    }
    handleTouchEnd() {
        this.stopDragging();
    }
    stopDragging() {
        if (this.isDragging) {
            this.isDragging = false;
            document.body.style.userSelect = '';
            this.hideScrollbarAfterDelay();
        }
    }
    showScrollbar() {
        if (this.autoHide && this.thumbSize > 0) {
            this.isVisible = true;
            this.hideScrollbarAfterDelay();
        }
    }
    hideScrollbarAfterDelay() {
        if (!this.autoHide || this.isDragging || this.isHovering)
            return;
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
        this.hideTimeout = setTimeout(() => {
            if (!this.isDragging && !this.isHovering) {
                this.isVisible = false;
            }
        }, this.hideDelay);
    }
    handleTrackClick(event) {
        if (event.target === this.scrollThumb || !this.scrollTrack)
            return;
        const isVertical = this.orientation === 'vertical';
        const rect = this.scrollTrack.getBoundingClientRect();
        const clickPos = isVertical ? event.clientY - rect.top : event.clientX - rect.left;
        const trackSize = isVertical ? this.scrollTrack.clientHeight : this.scrollTrack.clientWidth;
        const containerSize = isVertical ? this.scrollContainer.clientHeight : this.scrollContainer.clientWidth;
        const contentSize = isVertical ? this.scrollContent.scrollHeight : this.scrollContent.scrollWidth;
        const maxScroll = contentSize - containerSize;
        // Center thumb on click position
        const targetThumbPos = clickPos - this.thumbSize / 2;
        const maxThumbPos = trackSize - this.thumbSize;
        const clampedThumbPos = Math.max(0, Math.min(targetThumbPos, maxThumbPos));
        const scrollRatio = clampedThumbPos / maxThumbPos;
        const targetPosition = maxScroll * scrollRatio;
        if (this.smoothScroll) {
            this.scrollContent.scrollTo({
                [isVertical ? 'top' : 'left']: targetPosition,
                behavior: 'smooth',
            });
        }
        else {
            if (isVertical) {
                this.scrollContent.scrollTop = targetPosition;
            }
            else {
                this.scrollContent.scrollLeft = targetPosition;
            }
        }
    }
    get wrapperClass() {
        return 'relative w-full h-full flex';
    }
    get containerClass() {
        return 'flex-1 relative overflow-hidden h-full scroll-container';
    }
    get contentClass() {
        return 'w-full h-full overflow-auto scrollbar-hide scroll-content';
    }
    get trackClass() {
        const isVertical = this.orientation === 'vertical';
        const baseClasses = utils.customTwMerge('scroll-track absolute cursor-pointer rounded transition-opacity duration-300 bg-surface-neutral-light', this.isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none');
        const positionClasses = isVertical
            ? utils.customTwMerge('right-[4px] top-[2px] bottom-[2px]', this.size === 'small' && 'w-[6px]', this.size === 'medium' && 'w-[8px]', this.size === 'large' && 'w-[12px]')
            : utils.customTwMerge('bottom-[4px] left-[2px] right-[2px]', this.size === 'small' && 'h-[6px]', this.size === 'medium' && 'h-[8px]', this.size === 'large' && 'h-[12px]');
        return utils.customTwMerge(baseClasses, positionClasses);
    }
    get thumbClass() {
        const isVertical = this.orientation === 'vertical';
        const baseClasses = utils.customTwMerge('scroll-thumb absolute rounded transition-colors duration-200', this.isDragging ? 'cursor-grabbing bg-surface-actionable-alt-default' : 'cursor-grab bg-surface-neutral-dark', isVertical ? 'w-full' : 'h-full');
        return baseClasses;
    }
    render() {
        const isVertical = this.orientation === 'vertical';
        return (index.h("div", { key: '832bdccbe47b25e601fe130daa2f27f47b810c6c', class: this.wrapperClass, onMouseEnter: () => {
                this.isHovering = true;
                this.showScrollbar();
            }, onMouseLeave: () => {
                this.isHovering = false;
                this.hideScrollbarAfterDelay();
            } }, index.h("div", { key: '1af3b96c50f7a73dec936a31f39e3eb55e82aa5c', class: this.containerClass }, index.h("div", { key: '3e1567a3031a21b98e29aa349bf0fa0f85a87617', class: this.contentClass, tabindex: "0", role: "region", "aria-label": `Scrollable content, ${this.orientation} orientation`, onFocus: this.handleFocus, onBlur: this.handleBlur }, index.h("slot", { key: '492eb61b63b68e3fa2775d909d20ebbe4069e9f7' }))), index.h("div", { key: '394620b0256d60f1b231208106718f62eeec2a93', class: this.trackClass, onClick: this.handleTrackClick.bind(this) }, index.h("div", { key: 'f3e33e8f1bc91ec184b9136bfe9517aea08cfe35', class: this.thumbClass, tabindex: "-1", style: {
                [isVertical ? 'height' : 'width']: `${this.thumbSize}px`,
                [isVertical ? 'top' : 'left']: `${this.thumbPosition}px`,
            }, role: "scrollbar", "aria-orientation": this.orientation, "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": Math.round((this.thumbPosition / ((isVertical ? this.scrollTrack?.clientHeight : this.scrollTrack?.clientWidth) - this.thumbSize)) * 100) || 0 }))));
    }
    static get watchers() { return {
        "orientation": ["handleOrientationChange"],
        "initialPosition": ["handleInitialPositionChange"]
    }; }
};
WdprScrollbar.style = ".scrollbar-hide {\n      scrollbar-width: none;\n      -ms-overflow-style: none;\n    }\n    .scrollbar-hide::-webkit-scrollbar {\n      display: none;\n    }";

exports.wdpr_scrollbar = WdprScrollbar;
//# sourceMappingURL=wdpr-scrollbar.entry.cjs.js.map

//# sourceMappingURL=wdpr-scrollbar.cjs.entry.js.map