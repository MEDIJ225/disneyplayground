/**
 * wdpr-panel - Unified panel component
 * Desktop/Tablet: side panel (left/right) | Mobile: full-screen slide from left/right
 * Features: VisualViewport anchoring, focus trap, backdrop/ESC close, header variants
 */
import { h, Host } from "@stencil/core";
import { customTwMerge, generateRandId } from "../../utils/utils";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
export class WdprPanel {
    // ────────────────────────── Public API ─────────────────────────
    el;
    /** Which side the panel slides from. */
    position = 'right';
    /** Open state (reflects). In uncontrolled mode this is mutated internally. */
    isOpen = false;
    /** Title/Subtitle for fallback header + a11y. */
    titleText = 'Title';
    subtitleText = 'Subtitle';
    /** Optional leading icon for fallback header. */
    leadingIcon;
    /** Primary action label for fallback footer. */
    buttonText = 'Primary Action';
    /** Enable close affordances (X, ESC, backdrop). */
    isCloseable = true;
    /** Show optional "Back" button in header. */
    showBackButton = false;
    /** Disable closing with the Escape key. */
    disableEscClose = false;
    /** Desktop side-panel width (e.g., "26rem"). */
    width = '26rem';
    /**
     * Header background variant:
     * - primary: page default background color (bg-page-default)
     * - secondary: surface default background color (bg-surface-default)
     * - media: supports image/media background via header-background slot
     * - floatingButtons: two floating circular icon buttons only, content scrolls behind
     */
    headerBackground = 'primary';
    /** Divider between header and content. */
    showDivider = true;
    /** Show elevation shadow on header when scrolled. */
    showElevation = true;
    /** Animation duration (ms). */
    animationMs = 240;
    /** Close when tapping the backdrop. */
    closeOnBackdrop = true;
    /** Controlled mode: do not mutate `isOpen` internally. */
    controlled = false;
    /** Shows the footer section. by default is true */
    showFooter = true;
    /** Decorative mode: disable focus trapping. */
    decorative = false;
    // ─────────────────────────── Events ───────────────────────────
    panelOpened;
    panelClosed;
    panelCloseRequested;
    back;
    primaryAction;
    // ───────────────────── Internal state/refs ────────────────────
    _panelRef;
    _footerRef;
    _headingId = `wdpr-panel-h-${generateRandId()}`;
    _previouslyFocusedEl = null;
    layoutIsMobile = false;
    isBodyScrolled = false;
    _prevLayoutIsMobile = null;
    _mq;
    _footerHeight = 0;
    // focus trap
    _focusableEls = [];
    _firstFocusableEl = null;
    _lastFocusableEl = null;
    _listenersAttached = false;
    _isRefocusing = false;
    _isSentinelHandoff = false;
    _mo;
    _resizeRaf;
    static FOCUSABLE_SELECTORS = [
        'a[href]',
        'area[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'iframe',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]',
        'wdpr-button',
        'wdpr-icon-button',
        'wdpr-card-link',
        'wdpr-checkbox',
    ].join(',');
    // ────────────────────────── Layout mode ───────────────────────
    _onMediaChange = (e) => {
        this._prevLayoutIsMobile = this.layoutIsMobile;
        this.layoutIsMobile = e.matches;
        if (this._prevLayoutIsMobile === null || this._prevLayoutIsMobile === this.layoutIsMobile)
            return;
        if (!this._panelRef)
            return;
        this._syncLayoutForCurrentMode(true, false);
    };
    componentWillLoad() {
        if (typeof window !== 'undefined' && 'matchMedia' in window) {
            this._mq = window.matchMedia('(max-width: 767px)');
            this.layoutIsMobile = this._mq.matches;
            this._syncViewportCSSVars();
            this._mq.addEventListener('change', this._onMediaChange);
            window.addEventListener('orientationchange', this._onViewportResize);
            window.visualViewport?.addEventListener('scroll', this._onViewportResize, { passive: true });
        }
    }
    componentDidLoad() {
        if (this.isOpen)
            this._onOpen(false);
        window.visualViewport?.addEventListener('resize', this._onViewportResize);
        window.addEventListener('resize', this._onViewportResize);
        this._syncViewportCSSVars();
    }
    disconnectedCallback() {
        this._mq?.removeEventListener('change', this._onMediaChange);
        this._detachGlobalListeners();
        document.body.classList.remove('overflow-hidden');
        this._mo?.disconnect();
        this._mo = undefined;
        window.visualViewport?.removeEventListener('resize', this._onViewportResize);
        window.removeEventListener('resize', this._onViewportResize);
        window.removeEventListener('orientationchange', this._onViewportResize);
        window.visualViewport?.removeEventListener('scroll', this._onViewportResize);
    }
    onOpenChanged() {
        if (this.isOpen) {
            this._onOpen(true);
        }
        else {
            this._onClose(true);
        }
    }
    // ───────────────────────── Viewport utils ─────────────────────
    /** Sync CSS variables for VisualViewport geometry. */
    _syncViewportCSSVars() {
        const vv = window.visualViewport;
        const vw = Math.round(vv?.width ?? document.documentElement.clientWidth ?? window.innerWidth ?? 0);
        const vh = Math.round(vv?.height ?? document.documentElement.clientHeight ?? window.innerHeight ?? 0);
        const top = Math.round(vv?.offsetTop ?? 0);
        const left = Math.round(vv?.offsetLeft ?? 0);
        if (this._footerRef && this.showFooter) {
            this._footerHeight = this._footerRef.clientHeight;
        }
        else {
            this._footerHeight = 0;
        }
        this.el.style.setProperty('--vvh', `${vh}px`);
        this.el.style.setProperty('--pbottom', `${this._footerHeight}px`);
        this.el.style.setProperty('--vvw', `${vw}px`);
        this.el.style.setProperty('--vvtop', `${top}px`);
        this.el.style.setProperty('--vvleft', `${left}px`);
    }
    // ─────────────────────── Open / Close flow ────────────────────
    _onOpen(animate) {
        this.isBodyScrolled = false;
        this.panelOpened.emit();
        this._rememberOpener();
        document.body.classList.add('overflow-hidden');
        // Position panel off-screen immediately without transition
        if (this._panelRef) {
            this._panelRef.style.transition = 'none';
            const offScreen = this.position === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
            this._panelRef.style.transform = offScreen;
        }
        // Also hide footer immediately
        if (this._footerRef) {
            this._footerRef.style.transition = 'none';
            const offScreen = this.position === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
            this._footerRef.style.transform = offScreen;
        }
        // Observe internal mutations to keep the focus trap fresh.
        if (typeof MutationObserver !== 'undefined') {
            this._mo = new MutationObserver(() => this._prepareFocusTrap());
            this._mo.observe(this._panelRef, { subtree: true, childList: true });
        }
        this._prepareFocusTrap();
        this._attachGlobalListeners();
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (!this.isOpen)
                    return;
                this._syncViewportCSSVars();
                this._syncLayoutForCurrentMode(animate, true);
            });
        });
        // Handoff initial focus.
        setTimeout(() => (this._firstFocusableEl ?? this._panelRef).focus({ preventScroll: true }), 0);
    }
    _onClose(animate) {
        this.isBodyScrolled = false;
        this.panelClosed.emit();
        this._detachGlobalListeners();
        document.body.classList.remove('overflow-hidden');
        this._mo?.disconnect();
        this._mo = undefined;
        this._syncLayoutForCurrentMode(animate, false);
        this._focusableEls = [];
        this._firstFocusableEl = null;
        this._lastFocusableEl = null;
        this._restoreFocus();
    }
    // ────────────────────────── Layout sync ───────────────────────
    /** Recompute transforms/targets for current mode. */
    _syncLayoutForCurrentMode(animate, isInitialOpen = false) {
        if (!this._panelRef) {
            return;
        }
        // Both mobile (full-screen) and desktop use slide from left/right
        if (this.isOpen) {
            if (animate && isInitialOpen) {
                // Set initial off-screen position without transition
                const offScreenTransform = this.position === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
                this._panelRef.style.transition = 'none';
                this._panelRef.style.transform = offScreenTransform;
                if (this._footerRef) {
                    this._footerRef.style.transition = 'none';
                    this._footerRef.style.transform = offScreenTransform;
                }
                // Short delay to ensure initial state is painted, then enable transition and animate
                setTimeout(() => {
                    this._panelRef.style.transition = '';
                    this._panelRef.classList.add('animating');
                    this._panelRef.style.transform = 'translateX(0)';
                    if (this._footerRef) {
                        this._footerRef.style.transition = `transform ${this.animationMs}ms cubic-bezier(.22, .61, .36, 1)`;
                        this._footerRef.style.transform = 'translateX(0)';
                    }
                    window.setTimeout(() => {
                        this._panelRef.classList.remove('animating');
                        if (this._footerRef)
                            this._footerRef.style.transition = '';
                    }, this.animationMs);
                }, 20);
            }
            else {
                this._panelRef.style.transform = 'translateX(0)';
                if (this._footerRef)
                    this._footerRef.style.transform = 'translateX(0)';
            }
        }
        else {
            const translateDir = this.position === 'right' ? '100%' : '-100%';
            if (animate) {
                this._panelRef.classList.add('animating');
                this._panelRef.style.transform = `translateX(${translateDir})`;
                if (this._footerRef) {
                    this._footerRef.style.transition = `transform ${this.animationMs}ms cubic-bezier(.22, .61, .36, 1)`;
                    this._footerRef.style.transform = `translateX(${translateDir})`;
                }
                window.setTimeout(() => {
                    this._panelRef.classList.remove('animating');
                    if (this._footerRef)
                        this._footerRef.style.transition = '';
                }, this.animationMs);
            }
            else {
                this._panelRef.style.transform = `translateX(${translateDir})`;
                if (this._footerRef)
                    this._footerRef.style.transform = `translateX(${translateDir})`;
            }
        }
    }
    /** Throttled viewport listener. */
    _onViewportResize = () => {
        if (!this.isOpen)
            return;
        if (this._resizeRaf)
            cancelAnimationFrame(this._resizeRaf);
        this._resizeRaf = requestAnimationFrame(() => {
            this._syncViewportCSSVars();
            this._syncLayoutForCurrentMode(false, false);
        });
    };
    // ────────────────────────── A11y / Focus ──────────────────────
    _getLocalActiveElement() {
        const root = this.el.getRootNode();
        return root.activeElement ?? null;
    }
    _rememberOpener() {
        this._previouslyFocusedEl = this._getLocalActiveElement();
    }
    _isFocusable(el) {
        if (!(el instanceof HTMLElement)) {
            return false;
        }
        if (!el.isConnected) {
            return false;
        }
        if (el['disabled']) {
            return false;
        }
        return typeof el.focus === 'function';
    }
    /** Deep focus attempt into host/shadow child control. */
    _focusDeep(el) {
        if (!el)
            return false;
        const root = this.el.getRootNode();
        const dsr = root;
        try {
            el.focus({ preventScroll: true });
        }
        catch { }
        if (dsr.activeElement === el)
            return true;
        const sr = el.shadowRoot;
        if (sr) {
            const inner = sr.querySelector('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
            if (inner) {
                try {
                    inner.focus({ preventScroll: true });
                }
                catch { }
                if (dsr.activeElement === el || dsr.activeElement === inner)
                    return true;
            }
        }
        return false;
    }
    /** Reasonable focus return target when the original opener is gone. */
    _findFallbackFocus() {
        const tagged = document.querySelector('[data-return-focus]');
        if (tagged && this._isFocusable(tagged))
            return tagged;
        let cur = this.el;
        while (cur) {
            if (this._isFocusable(cur))
                return cur;
            cur = cur.parentElement;
        }
        const main = document.querySelector('main, [role="main"], [tabindex="0"]');
        if (main && this._isFocusable(main))
            return main;
        return document.body;
    }
    _restoreFocus() {
        const target = this._previouslyFocusedEl ?? null;
        requestAnimationFrame(() => {
            if (!this._focusDeep(target))
                this._focusDeep(this._findFallbackFocus());
        });
    }
    _findFocusable(root) {
        const seen = new Set();
        const els = [];
        const isFocusable = (el) => {
            return (el.matches(WdprPanel.FOCUSABLE_SELECTORS) &&
                !el.hasAttribute('disabled') &&
                el.getAttribute('aria-disabled') !== 'true' &&
                el.tabIndex !== -1 &&
                !el.hasAttribute('data-focus-sentinel'));
        };
        const addFocusable = (el) => {
            if (!seen.has(el)) {
                seen.add(el);
                els.push(el);
            }
        };
        const walk = (curr) => {
            if (curr.nodeName === 'SLOT') {
                const slot = curr;
                const assigned = slot.assignedElements({ flatten: true });
                if (assigned.length > 0) {
                    assigned.forEach(node => {
                        if (node instanceof HTMLElement) {
                            if (isFocusable(node))
                                addFocusable(node);
                            walk(node);
                            if (node.shadowRoot)
                                walk(node.shadowRoot);
                        }
                    });
                }
                else {
                    const defaultContent = Array.from(slot.children || []);
                    for (const child of defaultContent) {
                        if (child instanceof HTMLElement) {
                            if (isFocusable(child))
                                addFocusable(child);
                            walk(child);
                            if (child.shadowRoot)
                                walk(child.shadowRoot);
                        }
                    }
                }
                return;
            }
            const children = Array.from(curr.children || curr.children || []);
            for (const child of children) {
                if (!(child instanceof HTMLElement))
                    continue;
                if (isFocusable(child)) {
                    addFocusable(child);
                }
                walk(child);
                if (child.shadowRoot) {
                    walk(child.shadowRoot);
                }
            }
        };
        walk(root);
        return els;
    }
    _prepareFocusTrap() {
        const allFocusables = this._findFocusable(this._panelRef);
        this._focusableEls = [...allFocusables];
        this._firstFocusableEl = this._focusableEls[0] ?? null;
        this._lastFocusableEl = this._focusableEls[this._focusableEls.length - 1] ?? null;
    }
    _getCurrentFocusableFromEvent(e) {
        const path = (e.composedPath?.() ?? []);
        const t0 = path[0];
        if (t0 instanceof HTMLElement && this._focusableEls.includes(t0))
            return t0;
        const inPath = path.find(t => t instanceof HTMLElement && this._focusableEls.includes(t));
        if (inPath)
            return inPath;
        const root = this.el.getRootNode();
        const active = root.activeElement;
        return active && this._focusableEls.includes(active) ? active : null;
    }
    _attachGlobalListeners() {
        if (this._listenersAttached)
            return;
        document.addEventListener('keydown', this._onKeydown, true);
        document.addEventListener('focusin', this._onDocFocusIn, true);
        this._listenersAttached = true;
    }
    _detachGlobalListeners() {
        if (!this._listenersAttached)
            return;
        document.removeEventListener('keydown', this._onKeydown, true);
        document.removeEventListener('focusin', this._onDocFocusIn, true);
        this._listenersAttached = false;
    }
    /** Check if there's an open drawer that should handle focus/keyboard instead of panel */
    _hasOpenDrawer() {
        const openDrawer = document.querySelector('wdpr-drawer[is-open]');
        if (!openDrawer)
            return false;
        const attr = openDrawer.getAttribute('is-open');
        return attr !== null && attr !== 'false';
    }
    _onDocFocusIn = (e) => {
        if (!this.isOpen || this._isRefocusing || this._isSentinelHandoff)
            return;
        // Check if there's an open drawer - if so, let the drawer handle focus
        if (this._hasOpenDrawer())
            return;
        const path = (e.composedPath?.() ?? []);
        // Allow focus in both panel and footer
        const isInPanel = this._panelRef && path.includes(this._panelRef);
        const isInFooter = this._footerRef && path.includes(this._footerRef);
        if (!isInPanel && !isInFooter) {
            this._isRefocusing = true;
            try {
                this._prepareFocusTrap();
                (this._firstFocusableEl ?? this._panelRef).focus({ preventScroll: true });
                e.stopImmediatePropagation();
                e.preventDefault();
            }
            finally {
                this._isRefocusing = false;
            }
        }
    };
    _onKeydown = (e) => {
        if (!this.isOpen || e.defaultPrevented)
            return;
        if (this._hasOpenDrawer())
            return;
        if (e.key === KEYBOARD_KEYS.ESCAPE && !this.disableEscClose) {
            e.stopPropagation();
            this._closePanel();
            return;
        }
        if (e.key !== KEYBOARD_KEYS.TAB)
            return;
        this._prepareFocusTrap();
        const current = this._getCurrentFocusableFromEvent(e);
        const count = this._focusableEls.length;
        if (count === 0) {
            e.preventDefault();
            this._panelRef.focus();
            return;
        }
        if (!e.shiftKey && current === this._lastFocusableEl) {
            e.preventDefault();
            this._firstFocusableEl?.focus({ preventScroll: true });
            return;
        }
        const isFirst = current === this._firstFocusableEl || current === this._panelRef;
        if (e.shiftKey && isFirst) {
            e.preventDefault();
            this._lastFocusableEl?.focus({ preventScroll: true });
            return;
        }
        e.preventDefault();
        const currentIdx = current ? this._focusableEls.indexOf(current) : -1;
        let nextIdx = e.shiftKey ? currentIdx - 1 : currentIdx + 1;
        if (nextIdx < 0)
            nextIdx = count - 1;
        if (nextIdx >= count)
            nextIdx = 0;
        this._focusableEls[nextIdx]?.focus({ preventScroll: true });
    };
    _closePanel() {
        if (this.controlled) {
            this.panelCloseRequested.emit();
        }
        else {
            this.isOpen = false;
        }
    }
    // ─────────────────────── Render helpers ───────────────────────
    get _isMobileFullScreen() {
        return this.layoutIsMobile;
    }
    get _panelWidthClass() {
        return 'max-w-[100vw]';
    }
    get _sideTransformClass() {
        return this.position === 'right' ? 'right-0 left-auto translate-x-full' : 'left-0 right-auto -translate-x-full';
    }
    get _sideRadiusClass() {
        // Mobile full-screen has no border radius
        if (this._isMobileFullScreen) {
            return '';
        }
        return this.position === 'right' ? 'rounded-tl-400 rounded-bl-400 rounded-tr-none rounded-br-none' : 'rounded-tr-400 rounded-br-400 rounded-tl-none rounded-bl-none';
    }
    get _sideRadiusHeaderClass() {
        if (this._isMobileFullScreen) {
            return '';
        }
        return this.position === 'right' ? 'rounded-tl-400 rounded-bl-none rounded-tr-none rounded-br-none' : 'rounded-tr-400 rounded-br-none rounded-tl-none rounded-bl-none';
    }
    get _sideRadiusFooterClass() {
        if (this._isMobileFullScreen) {
            return '';
        }
        return this.position === 'right' ? 'rounded-bl-400 rounded-tl-none rounded-tr-none rounded-br-none' : 'rounded-br-400 rounded-tr-none rounded-tl-none rounded-bl-none';
    }
    /** Wrapper around content+footer: overflow-hidden + bottom radius so panel clips bottom corner without breaking header backdrop-filter. */
    get _sideRadiusContentWrapperClass() {
        if (this._isMobileFullScreen) {
            return '';
        }
        return this.position === 'right' ? 'rounded-bl-400 rounded-tl-none rounded-tr-none rounded-br-none' : 'rounded-br-400 rounded-tr-none rounded-tl-none rounded-bl-none';
    }
    get _panelBgClass() {
        switch (this.headerBackground) {
            case 'secondary':
                return 'bg-surface-default';
            case 'primary':
            default:
                return 'bg-page-default';
        }
    }
    /** Desktop width; mobile uses full width. */
    get _panelStyle() {
        if (this._isMobileFullScreen) {
            return { width: '100vw', maxWidth: '100vw' };
        }
        const w = this.width && this.width !== '' ? this.width : '26rem';
        return { width: w, maxWidth: '100vw' };
    }
    get _panelLayoutClasses() {
        const baseClasses = customTwMerge('fixed top-0 bottom-0', this._sideTransformClass, this.isOpen ? 'translate-x-0' : '', 'flex flex-col', 'items-stretch content-stretch', this._panelBgClass, this._sideRadiusClass, this._panelWidthClass, 'transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)]', 'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]', 'pointer-events-auto', 'h-full max-h-full overflow-visible', 'z-20');
        return `${baseClasses} panel-content`;
    }
    _getHeaderBackgroundColor() {
        if (this._isFloatingButtons)
            return 'bg-transparent';
        switch (this.headerBackground) {
            case 'secondary':
                return this.isBodyScrolled ? 'bg-surface-translucent' : 'bg-surface-default';
            case 'media':
                return this.isBodyScrolled ? 'bg-surface-translucent' : 'bg-transparent';
            case 'primary':
            default:
                return 'bg-page-default';
        }
    }
    get _isFloatingButtons() {
        return this.headerBackground === 'floatingButtons';
    }
    get _headerClasses() {
        const positionClass = this._isFloatingButtons ? 'absolute top-0 left-0 right-0 z-30' : 'sticky top-0 z-30';
        const headerColor = this._getHeaderBackgroundColor();
        let classes = `${positionClass} flex flex-col w-full transition-colors duration-200 ${headerColor} ${this._sideRadiusHeaderClass}`;
        if (this.showElevation && this.isBodyScrolled && !this._isFloatingButtons) {
            classes += ' elevation-xsmall-soft';
        }
        if (this._isFloatingButtons && !this._isMobileFullScreen) {
            classes += ' overflow-hidden';
        }
        return classes;
    }
    _clickPrimary() {
        this.primaryAction.emit();
    }
    _overlayClick() {
        if (this.closeOnBackdrop)
            this._closePanel();
    }
    // ────────────────────── Render-time handlers ──────────────────
    _handleOverlayClick = (ev) => {
        ev.stopPropagation();
        this._overlayClick();
    };
    _handleBackClick = (ev) => {
        ev.stopPropagation();
        this.back.emit();
    };
    _handleCloseClick = (ev) => {
        ev.stopPropagation();
        this._closePanel();
    };
    _handlePrimaryClick = (ev) => {
        ev.stopPropagation();
        this._clickPrimary();
    };
    _handleScrollChange = (ev) => {
        const position = ev?.detail?.position ?? 0;
        if (this.isBodyScrolled !== position > 0) {
            this.isBodyScrolled = position > 0;
        }
    };
    _handleSentinelFocus(isStart) {
        if (!this.isOpen)
            return;
        const target = isStart ? this._lastFocusableEl : this._firstFocusableEl;
        this._isSentinelHandoff = true;
        setTimeout(() => {
            (target ?? this._panelRef).focus();
            this._isSentinelHandoff = false;
        }, 0);
    }
    // ─────────────────────────── Rendering ────────────────────────
    render() {
        const labelledBy = this.titleText ? this._headingId : undefined;
        const ariaLabel = labelledBy ? undefined : this.titleText || 'Panel';
        const hasMediaBackground = this.headerBackground === 'media';
        const headerStyle = this.isBodyScrolled && !this._isFloatingButtons
            ? {
                backdropFilter: 'blur(calc(var(--effect-400, 32px) / 2))',
                WebkitBackdropFilter: 'blur(calc(var(--effect-400, 32px) / 2))',
            }
            : {};
        return (h(Host, { key: '1791dcc71932ce539c0026063db733bb35736c15', style: { '--anim-ms': `${this.animationMs}ms` } }, h("wdpr-overlay", { key: 'dc9a9c3a6dfea748e8ed9e06d9a9db567fa2111e', cover: true, open: this.isOpen, variant: "scrim", role: "presentation", "a11y-label": "Backdrop", onOverlayClick: this._handleOverlayClick }), h("div", { key: 'f2093fd64c29ef60089c543e6f7a2bef71d0c0ca', style: this._panelStyle, class: this._panelLayoutClasses, part: "panel", role: "dialog", "aria-modal": "true", tabIndex: -1, "aria-label": ariaLabel, "aria-labelledby": labelledBy, ref: el => (this._panelRef = el) }, h("div", { key: '167a4fe84337e9254190012b3d9e2059718e49bd', "data-focus-sentinel": "start", tabIndex: this.decorative ? -1 : 0, "aria-hidden": "true", class: "sr-only", onFocus: () => this._handleSentinelFocus(true) }), h("header", { key: '4fcbd0bb5be84db2c4a1aeb2296ae3643493402f', class: this._headerClasses, style: headerStyle, part: "header" }, this._isFloatingButtons && (h("div", { key: '4b3e33234ff251e20ae708d566ccc8b6161c49ef', class: "absolute top-0 left-0 right-0 h-[100px] pointer-events-none z-10", style: {
                background: 'linear-gradient(to bottom, var(--bg-surface-default) 0%, var(--bg-surface-default) 30%, rgba(255, 255, 255, 0) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
            } })), hasMediaBackground && (h("div", { key: '14c8cfa34b58ba231f9b87d35684329d36f63344', class: "absolute inset-0 z-0 overflow-hidden pointer-events-none" }, h("slot", { key: '5726307edab91d2943f01243b090e37db5b8360a', name: "header-background" }))), h("div", { key: '0e9d266dfc563c2f0b2ecbc36ea20f033256b93c', class: "relative w-full z-20" }, h("slot", { key: '2ad954c780066bc6c4220f53be448f5aee55f120', name: "panel-header" }, h("wdpr-page-header", { key: '56cbc299f586ffd0e837e57694f857dbc726274f', class: customTwMerge('w-full block pt-300', this._sideRadiusHeaderClass), titleText: "", sticky: false, showElevation: false, background: "transparent", onLeadingClick: this._handleBackClick, onTrailingClick: this._handleCloseClick }, this.showBackButton && (h("wdpr-icon-button", { key: '862e5b66013362ed2da74b75db9cadcf322c512b', slot: "leading-icon", iconName: "back-thick", a11yLabel: "Back", size: "medium", variant: this._isFloatingButtons ? 'bgPrimary' : 'primary', onClick: this._handleBackClick })), h("div", { key: '660c07162cc75a1dad310111e9b88833b42d095f', slot: "trailing-icon", class: "flex gap-100" }, h("slot", { key: 'ef26d7787b54d91a110dc122ca5093e1f910c33b', name: "header-actions" }), this.isCloseable && (h("wdpr-icon-button", { key: 'af208387b84c7bd2c19c8174066dc9e9318ead8c', iconName: "close-reversed", a11yLabel: "Close", size: "medium", variant: this._isFloatingButtons ? 'bgPrimary' : 'primary', onClick: this._handleCloseClick }))), !this._isFloatingButtons && (h("div", { key: 'e1f32715a35758d1a535613d809102a45e33057e', slot: "below", class: "flex flex-col w-full" }, h("slot", { key: '67233aec5c9ad6e2347b23798685bb1ced42d98f', name: "header" }, h("wdpr-text-header", { key: 'd346e919f0e5fac19d5d42a5f219751e8d5b2621', id: this._headingId, class: "px-150 pb-200", headerLabel: this.titleText, subtextLabel: this.subtitleText }, this.leadingIcon && h("wdpr-icon-library", { key: '0ce52fa0fb9a4d8f41a52d3f3923bd3b1b3b76f7', size: "medium", icon: this.leadingIcon, slot: "leading-icon" }))), h("slot", { key: 'c114de80b424e41a83e96e2155d9f1041a900a0c', name: "header-content" })))))), h("div", { key: 'ccde81e7fa3734897b0325f259b746d27c7b7a3b', style: { display: this.showDivider && this.isBodyScrolled && !this._isFloatingButtons ? 'block' : 'none' }, "aria-hidden": !(this.showDivider && this.isBodyScrolled && !this._isFloatingButtons) ? 'true' : null }, h("wdpr-divider", { key: '281fcb4d657241d25eeea0ebb6819b17ef6467f0', orientation: "horizontal", class: "w-full block relative z-30" }))), h("div", { key: '2e6f6bc3f74050245e4b98eb7e7d9856975c57b7', class: customTwMerge('flex flex-col flex-1 min-h-0 overflow-hidden', this._sideRadiusContentWrapperClass) }, h("section", { key: '962be42c18c34268d49f2851361caa1a110e599a', class: "min-w-0 min-h-0 flex flex-col flex-1 overflow-hidden", part: "content" }, h("wdpr-scrollbar", { key: 'e9321fbd705a56b3ea1385bc73d9c625c055d4f8', orientation: "vertical", size: "medium", class: "flex-1 min-h-0", onScrollChange: this._handleScrollChange }, h("div", { key: '330082e04f8b9eaf0149f9adaeb168caf7bc8560', style: { display: 'block', height: 'auto' } }, this._isFloatingButtons && h("div", { key: 'dfbab4151d0440bf30a0bf0a50dea4886fe91239', class: "h-[60px] shrink-0" }), h("slot", { key: 'f30d99bb6defa6885c7476d2da71e8249ad7b8c1', name: "body" })))), this.showFooter && (h("footer", { key: '0906fd3f847d93d23d01fafaf5f3f6c72cf1adc2', ref: el => (this._footerRef = el), part: "footer", class: customTwMerge('sticky bottom-0 z-[100000] w-full', this._sideRadiusFooterClass) }, h("slot", { key: '10e5cd1fe700acb38650e4d651db56be67d9d735', name: "footer" }, h("wdpr-button-dock", { key: '4d5301a9ce1cd9c8febf46ce12f26c188875cb04' }, h("wdpr-button-bar", { key: '70ed1265f1f17d481bc6a6233ebf8205d2d94ef3', slot: "button-bar", layout: "stacked" }, h("wdpr-button", { key: '2bcd24f85fa42e150a8d27278af59b6ccdf168a6', display: "block", slot: "primary-button", variant: "primary", size: "large", onClick: this._handlePrimaryClick }, this.buttonText)))))))), h("div", { key: '2d9b38da4ab553102f65f1e0f6e793a49c201fe4', "data-focus-sentinel": "end", tabIndex: this.decorative ? -1 : 0, "aria-hidden": "true", class: "sr-only", onFocus: () => this._handleSentinelFocus(false) })));
    }
    static get is() { return "wdpr-panel"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-panel.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-panel.css"]
        };
    }
    static get properties() {
        return {
            "position": {
                "type": "string",
                "attribute": "position",
                "mutable": false,
                "complexType": {
                    "original": "PanelPosition",
                    "resolved": "\"left\" | \"right\"",
                    "references": {
                        "PanelPosition": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-panel/wdpr-panel.tsx",
                            "id": "src/components/wdpr-panel/wdpr-panel.tsx::PanelPosition"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Which side the panel slides from."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'right'"
            },
            "isOpen": {
                "type": "boolean",
                "attribute": "is-open",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Open state (reflects). In uncontrolled mode this is mutated internally."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "titleText": {
                "type": "string",
                "attribute": "title-text",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Title/Subtitle for fallback header + a11y."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Title'"
            },
            "subtitleText": {
                "type": "string",
                "attribute": "subtitle-text",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Subtitle'"
            },
            "leadingIcon": {
                "type": "string",
                "attribute": "leading-icon",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Optional leading icon for fallback header."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "buttonText": {
                "type": "string",
                "attribute": "button-text",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Primary action label for fallback footer."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Primary Action'"
            },
            "isCloseable": {
                "type": "boolean",
                "attribute": "is-closeable",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Enable close affordances (X, ESC, backdrop)."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "true"
            },
            "showBackButton": {
                "type": "boolean",
                "attribute": "show-back-button",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Show optional \"Back\" button in header."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "disableEscClose": {
                "type": "boolean",
                "attribute": "disable-esc-close",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Disable closing with the Escape key."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "width": {
                "type": "string",
                "attribute": "width",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Desktop side-panel width (e.g., \"26rem\")."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'26rem'"
            },
            "headerBackground": {
                "type": "string",
                "attribute": "header-background",
                "mutable": false,
                "complexType": {
                    "original": "HeaderBackgroundVariant",
                    "resolved": "\"floatingButtons\" | \"media\" | \"primary\" | \"secondary\"",
                    "references": {
                        "HeaderBackgroundVariant": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-panel/wdpr-panel.tsx",
                            "id": "src/components/wdpr-panel/wdpr-panel.tsx::HeaderBackgroundVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Header background variant:\n- primary: page default background color (bg-page-default)\n- secondary: surface default background color (bg-surface-default)\n- media: supports image/media background via header-background slot\n- floatingButtons: two floating circular icon buttons only, content scrolls behind"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'primary'"
            },
            "showDivider": {
                "type": "boolean",
                "attribute": "show-divider",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Divider between header and content."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "true"
            },
            "showElevation": {
                "type": "boolean",
                "attribute": "show-elevation",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Show elevation shadow on header when scrolled."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "true"
            },
            "animationMs": {
                "type": "number",
                "attribute": "animation-ms",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Animation duration (ms)."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "240"
            },
            "closeOnBackdrop": {
                "type": "boolean",
                "attribute": "close-on-backdrop",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Close when tapping the backdrop."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "controlled": {
                "type": "boolean",
                "attribute": "controlled",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Controlled mode: do not mutate `isOpen` internally."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "showFooter": {
                "type": "boolean",
                "attribute": "show-footer",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Shows the footer section. by default is true"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "decorative": {
                "type": "boolean",
                "attribute": "decorative",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Decorative mode: disable focus trapping."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "layoutIsMobile": {},
            "isBodyScrolled": {}
        };
    }
    static get events() {
        return [{
                "method": "panelOpened",
                "name": "panelOpened",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "panelClosed",
                "name": "panelClosed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "panelCloseRequested",
                "name": "panelCloseRequested",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "back",
                "name": "back",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "primaryAction",
                "name": "primaryAction",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "isOpen",
                "methodName": "onOpenChanged"
            }];
    }
}
//# sourceMappingURL=wdpr-panel.js.map
