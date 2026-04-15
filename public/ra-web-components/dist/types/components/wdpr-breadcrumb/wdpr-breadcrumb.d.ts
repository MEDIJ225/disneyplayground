import { BreadcrumbWrapMode } from './wdpr-breadcrumb.model';
export declare class WdprBreadcrumb {
    private _initialized;
    /**
     * Reference to the nav element for focus management
     */
    private _navElement;
    /**
     * For monitoring container size changes
     */
    private _resizeObserver;
    private _resizeDebounceTimer;
    /**
     * Natural breadcrumb widths (without truncation icon) - used to determine if truncation is needed
     */
    private _naturalBreadcrumbWidths;
    /**
     * Current breadcrumb widths (may include truncation icon width)
     */
    private _currentBreadcrumbWidths;
    private _lastContainerWidth;
    el: HTMLWdprBreadcrumbElement;
    _showAll: boolean;
    /**
     * Tracks if initial measurement is complete (to prevent flash of unstyled content)
     */
    _ready: boolean;
    /**
     * Controls how breadcrumbs behave when they overflow the container.
     * - `'truncation'`: Shows a truncation icon button, clicking it expands all breadcrumbs
     * - `'line'`: Breadcrumbs wrap to the next line automatically
     * @default 'truncation'
     */
    wrapMode: BreadcrumbWrapMode;
    onTruncationClick(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    private _setupResizeObserver;
    private _cleanupResizeObserver;
    private _debouncedUpdateVisibleBreadcrumbs;
    private _initBreadcrumbs;
    private _updateVisibleBreadcrumbs;
    /**
     * Applies visibility to breadcrumbs based on available space
     */
    private _calculateVisibleBreadcrumbs;
    private _getBreadcrumbs;
    private _handleSlotChange;
    private _invalidateCache;
    private _showBreadcrumbs;
    private _showAllBreadcrumbs;
    render(): any;
}
