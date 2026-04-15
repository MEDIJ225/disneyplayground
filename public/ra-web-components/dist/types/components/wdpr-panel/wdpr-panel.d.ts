/**
 * wdpr-panel - Unified panel component
 * Desktop/Tablet: side panel (left/right) | Mobile: full-screen slide from left/right
 * Features: VisualViewport anchoring, focus trap, backdrop/ESC close, header variants
 */
import { EventEmitter } from '../../stencil-public-runtime';
export type PanelPosition = 'left' | 'right';
export type HeaderBackgroundVariant = 'primary' | 'secondary' | 'media' | 'floatingButtons';
export declare class WdprPanel {
    el: HTMLWdprPanelElement;
    /** Which side the panel slides from. */
    position: PanelPosition;
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
    /** Show optional "Back" button in header. */
    showBackButton: boolean;
    /** Disable closing with the Escape key. */
    disableEscClose: boolean;
    /** Desktop side-panel width (e.g., "26rem"). */
    width: string;
    /**
     * Header background variant:
     * - primary: page default background color (bg-page-default)
     * - secondary: surface default background color (bg-surface-default)
     * - media: supports image/media background via header-background slot
     * - floatingButtons: two floating circular icon buttons only, content scrolls behind
     */
    headerBackground: HeaderBackgroundVariant;
    /** Divider between header and content. */
    showDivider: boolean;
    /** Show elevation shadow on header when scrolled. */
    showElevation: boolean;
    /** Animation duration (ms). */
    animationMs: number;
    /** Close when tapping the backdrop. */
    closeOnBackdrop: boolean;
    /** Controlled mode: do not mutate `isOpen` internally. */
    controlled: boolean;
    /** Shows the footer section. by default is true */
    showFooter: boolean;
    /** Decorative mode: disable focus trapping. */
    decorative: boolean;
    panelOpened: EventEmitter<void>;
    panelClosed: EventEmitter<void>;
    panelCloseRequested: EventEmitter<void>;
    back: EventEmitter<void>;
    primaryAction: EventEmitter<void>;
    private _panelRef;
    private _footerRef;
    private _headingId;
    private _previouslyFocusedEl;
    layoutIsMobile: boolean;
    isBodyScrolled: boolean;
    private _prevLayoutIsMobile;
    private _mq?;
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
    componentDidLoad(): void;
    disconnectedCallback(): void;
    onOpenChanged(): void;
    /** Sync CSS variables for VisualViewport geometry. */
    private _syncViewportCSSVars;
    private _onOpen;
    private _onClose;
    /** Recompute transforms/targets for current mode. */
    private _syncLayoutForCurrentMode;
    /** Throttled viewport listener. */
    private _onViewportResize;
    private _getLocalActiveElement;
    private _rememberOpener;
    private _isFocusable;
    /** Deep focus attempt into host/shadow child control. */
    private _focusDeep;
    /** Reasonable focus return target when the original opener is gone. */
    private _findFallbackFocus;
    private _restoreFocus;
    private _findFocusable;
    private _prepareFocusTrap;
    private _getCurrentFocusableFromEvent;
    private _attachGlobalListeners;
    private _detachGlobalListeners;
    /** Check if there's an open drawer that should handle focus/keyboard instead of panel */
    private _hasOpenDrawer;
    private _onDocFocusIn;
    private _onKeydown;
    private _closePanel;
    private get _isMobileFullScreen();
    private get _panelWidthClass();
    private get _sideTransformClass();
    private get _sideRadiusClass();
    private get _sideRadiusHeaderClass();
    private get _sideRadiusFooterClass();
    /** Wrapper around content+footer: overflow-hidden + bottom radius so panel clips bottom corner without breaking header backdrop-filter. */
    private get _sideRadiusContentWrapperClass();
    private get _panelBgClass();
    /** Desktop width; mobile uses full width. */
    private get _panelStyle();
    private get _panelLayoutClasses();
    private _getHeaderBackgroundColor;
    private get _isFloatingButtons();
    private get _headerClasses();
    private _clickPrimary;
    private _overlayClick;
    private _handleOverlayClick;
    private _handleBackClick;
    private _handleCloseClick;
    private _handlePrimaryClick;
    private _handleScrollChange;
    private _handleSentinelFocus;
    render(): any;
}
