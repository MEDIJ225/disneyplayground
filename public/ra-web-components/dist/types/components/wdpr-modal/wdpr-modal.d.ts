import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprModal {
    private _dialogEl;
    private _focusableElements;
    private _firstFocusableEl;
    private _lastFocusableEl;
    private _isDragging;
    private _dragOffset;
    private _mutationObserver;
    private _resizeHandler;
    el: HTMLWdprModalElement;
    private _isMobileViewport;
    /** Controls whether the modal is open or closed. */
    open: boolean;
    /** Controls whether the modal is fullscreen. */
    fullscreen: boolean;
    /** The aria-label for the modal dialog. */
    ariaLabel: string;
    width: string | null;
    height: string | null;
    isDraggable: boolean;
    initialFocus: string;
    disableBackgroundClose: boolean;
    disableEscapeClose: boolean;
    closedOnBackgroundClick: EventEmitter<void>;
    openChangedEvent: EventEmitter<void>;
    closedOnEscape: EventEmitter<void>;
    handleOpen(): void;
    private _prepareFocusTrap;
    onSlotChange(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    private _setupResizeListener;
    private _removeResizeListener;
    private _openDialogAndSetFocus;
    private _setupMutationObserver;
    private _handleTab;
    private _findCurrentFocusIndex;
    private _shouldModalHandleEscape;
    private _closeFromEscape;
    private _handleKeyDown;
    /**
     * Conditionally prevent native dialog cancel behavior.
     * Only prevent default if disableEscapeClose is true.
     * We manage Escape ourselves in _handleKeyDown so nested interactive components
     * can participate in the hierarchy first.
     */
    private _handleCancel;
    private _getInitialFocusElement;
    private _closeOnBackground;
    private _startDrag;
    private _onDrag;
    private _stopDrag;
    private _getDialogClasses;
    private _getContentClasses;
    private _getDialogStyles;
    private _getContentStyles;
    private _getDialogFrameClasses;
    render(): any;
}
