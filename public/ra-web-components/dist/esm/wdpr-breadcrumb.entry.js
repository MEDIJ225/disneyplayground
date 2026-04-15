import { r as registerInstance, a as getElement, h, H as Host } from './index-CykM8GCN.js';

function measureBreadcrumbWidths(breadcrumbs) {
    // Save original styles
    const originalStyles = breadcrumbs.map(breadcrumb => ({
        display: breadcrumb.style.display,
    }));
    // Make all breadcrumbs visible for measurement
    breadcrumbs.forEach(breadcrumb => {
        breadcrumb.classList.remove('hidden');
    });
    const widths = breadcrumbs.map(breadcrumb => breadcrumb.getBoundingClientRect().width);
    // Restore original styles
    breadcrumbs.forEach((breadcrumb, i) => {
        breadcrumb.classList.toggle('hidden', originalStyles[i].display === 'none');
    });
    return widths;
}
/**
 * Waits for fonts to load and layout to stabilize before measuring
 */
async function waitForStableLayout() {
    // Wait for document fonts to be ready
    if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
    }
    // Give the browser a frame to complete layout
    await new Promise(resolve => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                resolve();
            });
        });
    });
}

const WdprBreadcrumb = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    _initialized = false;
    /**
     * Reference to the nav element for focus management
     */
    _navElement = null;
    /**
     * For monitoring container size changes
     */
    _resizeObserver = null;
    _resizeDebounceTimer = null;
    /**
     * Natural breadcrumb widths (without truncation icon) - used to determine if truncation is needed
     */
    _naturalBreadcrumbWidths = [];
    /**
     * Current breadcrumb widths (may include truncation icon width)
     */
    _currentBreadcrumbWidths = [];
    _lastContainerWidth = 0;
    get el() { return getElement(this); }
    _showAll = false;
    /**
     * Tracks if initial measurement is complete (to prevent flash of unstyled content)
     */
    _ready = false;
    /**
     * Controls how breadcrumbs behave when they overflow the container.
     * - `'truncation'`: Shows a truncation icon button, clicking it expands all breadcrumbs
     * - `'line'`: Breadcrumbs wrap to the next line automatically
     * @default 'truncation'
     */
    wrapMode = 'truncation';
    onTruncationClick() {
        const breadcrumbs = this._getBreadcrumbs();
        this._showAllBreadcrumbs(breadcrumbs);
    }
    componentDidLoad() {
        this._initBreadcrumbs();
        // Only set up resize observer for truncation wrap mode
        if (this.wrapMode === 'truncation') {
            this._setupResizeObserver();
        }
    }
    disconnectedCallback() {
        this._cleanupResizeObserver();
    }
    _setupResizeObserver() {
        if (this.wrapMode !== 'truncation')
            return;
        this._resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const newWidth = entry.contentRect.width;
                // Only recalculate if width actually changed significantly (more than 1px)
                if (Math.abs(newWidth - this._lastContainerWidth) > 1) {
                    this._lastContainerWidth = newWidth;
                    this._debouncedUpdateVisibleBreadcrumbs();
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
    _debouncedUpdateVisibleBreadcrumbs() {
        if (this._resizeDebounceTimer) {
            clearTimeout(this._resizeDebounceTimer);
        }
        this._resizeDebounceTimer = setTimeout(() => {
            this._updateVisibleBreadcrumbs();
        }, 16);
    }
    async _initBreadcrumbs() {
        const breadcrumbs = this._getBreadcrumbs();
        if (breadcrumbs.length === 0)
            return;
        const firstBreadcrumb = breadcrumbs[0];
        const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
        for (const breadcrumb of breadcrumbs) {
            if (breadcrumb == firstBreadcrumb) {
                await breadcrumb.setFirstBreadcrumb();
            }
            if (breadcrumb === lastBreadcrumb) {
                await breadcrumb.setLastBreadcrumb();
            }
            breadcrumb.separator = breadcrumb !== lastBreadcrumb;
        }
        // For line wrap mode, just show all breadcrumbs immediately
        if (this.wrapMode === 'line') {
            this._ready = true;
            return;
        }
        await waitForStableLayout();
        this._initialized = true;
        this._updateVisibleBreadcrumbs();
        this._ready = true;
    }
    _updateVisibleBreadcrumbs() {
        if (this._showAll || !this._initialized)
            return;
        const breadcrumbs = this._getBreadcrumbs();
        if (breadcrumbs.length === 0)
            return;
        const containerWidth = this.el.getBoundingClientRect().width;
        if (containerWidth === 0)
            return;
        // Measure natural widths on first run (without truncation)
        if (this._naturalBreadcrumbWidths.length !== breadcrumbs.length) {
            // Ensure truncation is off for natural measurement
            if (breadcrumbs.length > 2) {
                breadcrumbs[1].showTruncation = false;
            }
            this._naturalBreadcrumbWidths = measureBreadcrumbWidths(breadcrumbs);
            this._currentBreadcrumbWidths = [...this._naturalBreadcrumbWidths];
        }
        // Always use natural widths to determine if truncation is needed
        const totalNaturalWidth = this._naturalBreadcrumbWidths.reduce((acc, val) => acc + val, 0);
        const needsTruncation = breadcrumbs.length > 2 && containerWidth < totalNaturalWidth;
        // Update truncation state if it changed
        if (breadcrumbs.length > 2 && breadcrumbs[1].showTruncation !== needsTruncation) {
            breadcrumbs[1].showTruncation = needsTruncation;
            // Re-measure current widths after truncation state change
            requestAnimationFrame(() => {
                this._currentBreadcrumbWidths = measureBreadcrumbWidths(breadcrumbs);
                this._calculateVisibleBreadcrumbs(breadcrumbs, containerWidth);
            });
            return;
        }
        this._calculateVisibleBreadcrumbs(breadcrumbs, containerWidth);
    }
    /**
     * Applies visibility to breadcrumbs based on available space
     */
    _calculateVisibleBreadcrumbs(breadcrumbs, containerWidth) {
        const breadcrumbWidths = this._currentBreadcrumbWidths;
        const visibleIndexes = new Set();
        visibleIndexes.add(0);
        visibleIndexes.add(1);
        visibleIndexes.add(breadcrumbs.length - 1);
        let totalWidth = breadcrumbWidths[0] + breadcrumbWidths[1] + breadcrumbWidths[breadcrumbs.length - 1];
        for (let i = breadcrumbs.length - 2; i > 1; i--) {
            const nextItemWidth = breadcrumbWidths[i];
            const widthIfAdded = totalWidth + nextItemWidth;
            if (widthIfAdded <= containerWidth) {
                visibleIndexes.add(i);
                totalWidth = widthIfAdded;
            }
        }
        this._showBreadcrumbs(breadcrumbs, visibleIndexes);
    }
    _getBreadcrumbs() {
        const slot = this.el.shadowRoot.querySelector('slot');
        if (!slot)
            return [];
        const assigned = slot.assignedElements({ flatten: true });
        return assigned.filter((el) => el.tagName.toLowerCase() === 'wdpr-breadcrumb-item');
    }
    _handleSlotChange = async () => {
        // Invalidate caches and state when breadcrumbs change
        this._invalidateCache();
        this._initBreadcrumbs();
    };
    _invalidateCache() {
        this._naturalBreadcrumbWidths = [];
        this._currentBreadcrumbWidths = [];
        this._initialized = false;
        this._ready = false;
    }
    _showBreadcrumbs(breadcrumbs, visibleIndexes) {
        breadcrumbs.forEach((breadcrumb, index) => {
            const isVisible = visibleIndexes.has(index);
            breadcrumb.classList.toggle('hidden', !isVisible);
        });
    }
    _showAllBreadcrumbs(breadcrumbs) {
        breadcrumbs.forEach(breadcrumb => {
            breadcrumb.classList.remove('hidden');
            breadcrumb.showTruncation = false;
        });
        this._showAll = true;
        requestAnimationFrame(() => {
            this._navElement?.focus();
        });
    }
    render() {
        const isLineWrap = this.wrapMode === 'line';
        const shouldWrap = isLineWrap || this._showAll;
        const hostStyle = {
            display: 'block',
            width: '100%',
            minWidth: '0',
            ...(!this._ready ? { visibility: 'hidden' } : {}),
        };
        // Use a wrapper with overflow hidden and padding to allow focus rings to show
        const navWrapperStyle = isLineWrap
            ? { padding: '4px' }
            : {
                overflow: 'hidden',
                // Add padding for focus rings, compensate with negative margin (except left to prevent cutoff)
                padding: '6px',
                margin: '-6px -6px -6px 0',
            };
        return (h(Host, { key: '7bf37fd197c20192603787c2e2238b2dded2aecf', style: hostStyle }, h("div", { key: 'cb4374ed3b889dc3d1fc92dc8b9737c02f551544', style: navWrapperStyle }, h("nav", { key: '2d4d32d4d78c49e781c6e96df53ab13d14bc8bba', "aria-label": "Breadcrumbs", tabindex: "-1", ref: el => (this._navElement = el) }, h("ol", { key: 'a99c43ecfae0c0eca975c4009c82f30b179b1f9b', class: `flex items-center gap-100 ${shouldWrap ? 'flex-wrap' : 'flex-nowrap whitespace-nowrap'}` }, h("slot", { key: '877aa9e67acb13cc9e310d884d2b79f76b818a28', onSlotchange: this._handleSlotChange }))))));
    }
};

export { WdprBreadcrumb as wdpr_breadcrumb };
//# sourceMappingURL=wdpr-breadcrumb.entry.js.map

//# sourceMappingURL=wdpr-breadcrumb.entry.js.map