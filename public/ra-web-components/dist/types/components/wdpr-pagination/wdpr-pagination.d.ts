import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprPagination {
    private readonly ELLIPSIS;
    private _resizeObserver;
    private _resizeDebounceTimer;
    private _lastContainerWidth;
    el: HTMLWdprPaginationElement;
    _calculatedMaxVisibleItems: number;
    totalPages: number;
    currentPage: number;
    showNavControls: boolean;
    maxVisibleItems: number;
    hidePaginationGroup: boolean;
    collapsed: boolean;
    wdprPageChange: EventEmitter<{
        page: number;
    }>;
    handleConfigChange(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    private _setupResizeObserver;
    private _cleanupResizeObserver;
    private _debouncedCalculateVisibleItems;
    private _calculateVisibleItems;
    private _handlePageClick;
    private _getPaginationRange;
    render(): any;
}
