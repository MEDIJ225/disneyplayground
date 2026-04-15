/**
 * wdpr-drawer - Unified drawer component
 * Desktop/Tablet: side panel (left/right) | Mobile: half-sheet with drag + snap
 * Features: VisualViewport anchoring, focus trap, backdrop/ESC close, velocity-aware drag
 */
import { EventEmitter } from '../../stencil-public-runtime';
export type DrawerPosition = 'left' | 'right';
export declare class WdprDrawer {
    el: HTMLWdprDrawerElement;
    /** Which side the drawer slides from (desktop side-panel mode). */
    position: DrawerPosition;
    /** Open state (reflects). In uncontrolled mode this is mutated internally. */
    isOpen: boolean;
    /** Title/Subtitle for fallback header + a11y. */
    titleText: string;
    subtitleText: string;
    /** Optional leading icon for fallback header. */
    leadingIcon?: string;
    /** Primary action label for fallback footer. */
    buttonText: string;
    /** Enable close affordances (X, ESC, backdrop). */
    isCloseable: boolean;
    /** Show optional “Back” button in header. */
    showBackButton: boolean;
    /** Disable closing with the Escape key. */
    disableEscClose: boolean;
    /** Desktop side-panel width (e.g., "26rem"). */
    width: string;
    /** Visual theme surface. 'primary' or 'secondary' */
    colorMode: 'primary' | 'secondary';
    /** Visual header color mode. 'primary' or 'secondary' */
    headerColorMode: 'primary' | 'secondary';
    /** Divider between header and content. */
    showDivider: boolean;
    /** Show elevation shadow. */
    showElevation: boolean;
    /** Enable drag on the half-sheet (mobile). */
    isDraggable: boolean;
    /** Animation duration (ms). */
    animationMs: number;
    /** Close when tapping the backdrop. */
    closeOnBackdrop: boolean;
    /** Controlled mode: do not mutate `isOpen` internally. */
    controlled: boolean;
    /** Half-sheet max width (px). Keeps the sheet centered with margins on large phones/tablets. */
    halfStackMaxWidth: number;
    /** Avatar image source for mobile half-stack drawer */
    avatarImageSrc?: string;
    /** Shows the footer section. by default is true */
    showFooter: boolean;
    /** Optional initial open height for mobile half-sheet (percent of viewport). If omitted, uses auto content height. */
    initialOpenPercent?: number;
    drawerOpened: EventEmitter<void>;
    drawerClosed: EventEmitter<void>;
    drawerCloseRequested: EventEmitter<void>;
    back: EventEmitter<void>;
    primaryAction: EventEmitter<void>;
    private _panelRef;
    private _bodyRef;
    private _footerRef;
    private _headingId;
    private _previouslyFocusedEl;
    isDragging: boolean;
    visiblePx: number;
    startVisiblePx: number;
    layoutIsMobile: boolean;
    isBodyScrolled: boolean;
    isOnPanel: boolean;
    private _prevLayoutIsMobile;
    private _mq?;
    private _parentPanelEl;
    private _startY;
    private _footerHeight;
    private _focusableEls;
    private _firstFocusableEl;
    private _lastFocusableEl;
    private _listenersAttached;
    private _isRefocusing;
    private _isSentinelHandoff;
    private _mo?;
    private _resizeRaf?;
    private static FOCUSABLE_SELECTORS;
    private _onMediaChange;
    componentWillLoad(): void;
    /** Check if a panel element is open (handles both attribute and property). */
    private _isPanelOpen;
    /** Detect if this drawer is inside an open panel and cache reference. */
    private _detectParentPanel;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    onOpenChanged(): void;
    private _getViewportHeight;
    /** Sync CSS variables for VisualViewport geometry and derived sheet width. */
    private _syncViewportCSSVars;
    private _onOpen;
    private _onClose;
    /** Recompute transforms/targets for current mode. */
    private _syncLayoutForCurrentMode;
    private _clamp;
    private _getAutoOpenVisiblePx;
    private _resolveInitialMobileVisiblePx;
    /** Progress [0..1] exposed as a CSS var for effects. */
    private _setProgress;
    /** Throttled viewport listener. */
    private _onViewportResize;
    private _applyVisible;
    private _onPointerDown;
    private _onPointerMove;
    private _onPointerUp;
    private _getLocalActiveElement;
    private _rememberOpener;
    private _isFocusable;
    private _focusDeep;
    private _findFallbackFocus;
    private _restoreFocus;
    private _findFocusable;
    private _prepareFocusTrap;
    private _getCurrentFocusableFromEvent;
    private _attachGlobalListeners;
    private _detachGlobalListeners;
    private _onDocFocusIn;
    private _onKeydown;
    private _closeDrawer;
    private get _isMobileHalfStack();
    private get _panelWidthClass();
    private get _sideTransformClass();
    private get _sideRadiusClass();
    private get _sideRadiusHeaderClass();
    private get _sideRadiusFooterClass();
    private get _panelBgClass();
    /** Desktop width; mobile ignores and uses visual-viewport centering. */
    private get _panelStyle();
    private get _panelLayoutClasses();
    private get _drawerHeaderClasses();
    private get _headerClasses();
    private get _handleClasses();
    private get _contentClasses();
    private _clickPrimary;
    private _overlayClick;
    private _handleOverlayClick;
    private _handleBackClick;
    private _handleCloseClick;
    private _handlePrimaryClick;
    private _handleScrollChange;
    /** Recheck scroll state after resize - reset scrolled state, scrollbar will update on next scroll */
    private _recheckScrollState;
    private _handleSentinelFocus;
    render(): any;
}
