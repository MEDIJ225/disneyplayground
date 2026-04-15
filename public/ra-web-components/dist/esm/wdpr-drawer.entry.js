import { r as registerInstance, c as createEvent, a as getElement, h, H as Host } from './index-CykM8GCN.js';
import { g as generateRandId, c as customTwMerge } from './utils-B2sDCMk6.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import { b as bundleCjsExports } from './bundle-cjs-CF3xLdU_.js';

const wdprDrawerCss = ":host {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 99999;\n  .drawer-content {\n    box-shadow: var(--theme-effect-000) var(--theme-effect-150) var(--theme-effect-400) var(--theme-effect-000) var(--color-plum-100-a72);\n  }\n}\n\n:host([is-open]) {\n  display: block;\n}\n:host .animating {\n  transition: transform var(--anim-ms) cubic-bezier(.22, .61, .36, 1),\n              height var(--anim-ms) cubic-bezier(.22, .61, .36, 1),\n              opacity var(--anim-ms) cubic-bezier(.22, .61, .36, 1);\n  will-change: transform, height, opacity;\n}";

const WdprDrawer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.drawerOpened = createEvent(this, "drawerOpened", 7);
        this.drawerClosed = createEvent(this, "drawerClosed", 7);
        this.drawerCloseRequested = createEvent(this, "drawerCloseRequested", 7);
        this.back = createEvent(this, "back", 7);
        this.primaryAction = createEvent(this, "primaryAction", 7);
    }
    get el() { return getElement(this); }
    /** Which side the drawer slides from (desktop side-panel mode). */
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
    /** Show optional “Back” button in header. */
    showBackButton = false;
    /** Disable closing with the Escape key. */
    disableEscClose = false;
    /** Desktop side-panel width (e.g., "26rem"). */
    width = '26rem';
    /** Visual theme surface. 'primary' or 'secondary' */
    colorMode = 'primary';
    /** Visual header color mode. 'primary' or 'secondary' */
    headerColorMode = 'primary';
    /** Divider between header and content. */
    showDivider = true;
    /** Show elevation shadow. */
    showElevation = true;
    /** Enable drag on the half-sheet (mobile). */
    isDraggable = true;
    /** Animation duration (ms). */
    animationMs = 240;
    /** Close when tapping the backdrop. */
    closeOnBackdrop = true;
    /** Controlled mode: do not mutate `isOpen` internally. */
    controlled = false;
    /** Half-sheet max width (px). Keeps the sheet centered with margins on large phones/tablets. */
    halfStackMaxWidth = 640;
    /** Avatar image source for mobile half-stack drawer */
    avatarImageSrc;
    /** Shows the footer section. by default is true */
    showFooter = true;
    /** Optional initial open height for mobile half-sheet (percent of viewport). If omitted, uses auto content height. */
    initialOpenPercent;
    // ─────────────────────────── Events ───────────────────────────
    drawerOpened;
    drawerClosed;
    drawerCloseRequested;
    back;
    primaryAction;
    // ───────────────────── Internal state/refs ────────────────────
    _panelRef;
    _bodyRef;
    _footerRef;
    _headingId = `wdpr-drawer-h-${generateRandId()}`;
    _previouslyFocusedEl = null;
    isDragging = false;
    visiblePx = 0;
    startVisiblePx = 0;
    layoutIsMobile = false;
    isBodyScrolled = false;
    isOnPanel = false;
    _prevLayoutIsMobile = null;
    _mq;
    _parentPanelEl = null;
    // drag metrics
    _startY = 0;
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
    ].join(',');
    // ────────────────────────── Layout mode ───────────────────────
    _onMediaChange = (e) => {
        this._prevLayoutIsMobile = this.layoutIsMobile;
        this.layoutIsMobile = e.matches;
        if (this._prevLayoutIsMobile === null || this._prevLayoutIsMobile === this.layoutIsMobile)
            return;
        if (!this._panelRef)
            return;
        if (this.layoutIsMobile) {
            if (this.isOpen) {
                const targetPx = this._resolveInitialMobileVisiblePx();
                this._applyVisible(targetPx, false);
            }
            else {
                this._applyVisible(0, false);
            }
        }
        else {
            // Switched → Desktop side-panel
            if (this.isOpen) {
                this._panelRef.style.transform = 'translateX(0)';
                this._setProgress(this._getViewportHeight());
            }
            else {
                this._panelRef.style.transform = '';
                this._setProgress(0);
            }
        }
    };
    componentWillLoad() {
        this._detectParentPanel();
        if (typeof window !== 'undefined' && 'matchMedia' in window) {
            this._mq = window.matchMedia('(max-width: 767px)');
            this.layoutIsMobile = this._mq.matches;
            this._syncViewportCSSVars();
            this._mq.addEventListener('change', this._onMediaChange);
            window.addEventListener('orientationchange', this._onViewportResize);
            window.visualViewport?.addEventListener('scroll', this._onViewportResize, { passive: true });
        }
    }
    /** Check if a panel element is open (handles both attribute and property). */
    _isPanelOpen(panelEl) {
        if ('isOpen' in panelEl && panelEl.isOpen === true)
            return true;
        const isOpenAttr = panelEl.getAttribute('is-open');
        return isOpenAttr !== null && isOpenAttr !== 'false';
    }
    /** Detect if this drawer is inside an open panel and cache reference. */
    _detectParentPanel() {
        let parent = this.el.parentElement;
        while (parent) {
            if (parent.tagName?.toLowerCase() === 'wdpr-panel' && this._isPanelOpen(parent)) {
                this._parentPanelEl = parent.shadowRoot?.querySelector('[part="panel"]') || parent;
                this.isOnPanel = true;
                return;
            }
            parent = parent.parentElement;
        }
        const panels = document.querySelectorAll('wdpr-panel');
        for (const panel of Array.from(panels)) {
            if (this._isPanelOpen(panel)) {
                this._parentPanelEl = panel.shadowRoot?.querySelector('[part="panel"]') || panel;
                this.isOnPanel = true;
                return;
            }
        }
        this._parentPanelEl = null;
        this.isOnPanel = false;
    }
    componentDidLoad() {
        if (this.isOpen)
            this._onOpen(false);
        window.visualViewport?.addEventListener('resize', this._onViewportResize);
        window.addEventListener('resize', this._onViewportResize);
        this._syncViewportCSSVars();
    }
    disconnectedCallback() {
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
    _getViewportHeight() {
        if (this.isOnPanel && this._parentPanelEl)
            return Math.round(this._parentPanelEl.getBoundingClientRect().height);
        const vv = window.visualViewport?.height;
        return Math.round(vv || document.documentElement?.clientHeight || window.innerHeight || 0);
    }
    /** Sync CSS variables for VisualViewport geometry and derived sheet width. */
    _syncViewportCSSVars() {
        let vw;
        let vh;
        let top;
        let left;
        // When on a panel, use the panel's bounds instead of the window
        if (this.isOnPanel && this._parentPanelEl) {
            const rect = this._parentPanelEl.getBoundingClientRect();
            vw = Math.round(rect.width);
            vh = Math.round(rect.height);
            top = Math.round(rect.top);
            left = Math.round(rect.left);
        }
        else {
            const vv = window.visualViewport;
            vw = Math.round(vv?.width ?? document.documentElement.clientWidth ?? window.innerWidth ?? 0);
            vh = Math.round(vv?.height ?? document.documentElement.clientHeight ?? window.innerHeight ?? 0);
            top = Math.round(vv?.offsetTop ?? 0);
            left = Math.round(vv?.offsetLeft ?? 0);
        }
        this._footerHeight = this._footerRef && this.showFooter ? this._footerRef.clientHeight : 0;
        const sheetW = this.isOnPanel ? vw : Math.max(0, Math.min(vw, this.halfStackMaxWidth));
        const vvh = this._isMobileHalfStack ? vh * 0.9 : vh;
        this.el.style.setProperty('--vvh', `${vvh}px`);
        this.el.style.setProperty('--pbottom', `${this._footerHeight}px`);
        this.el.style.setProperty('--vvw', `${vw}px`);
        this.el.style.setProperty('--vvtop', `${top}px`);
        this.el.style.setProperty('--vvleft', `${left}px`);
        this.el.style.setProperty('--sheet-w', `${sheetW}px`);
    }
    // ─────────────────────── Open / Close flow ────────────────────
    _onOpen(animate) {
        this.drawerOpened.emit();
        this._rememberOpener();
        document.body.classList.add('overflow-hidden');
        this._detectParentPanel();
        if (this._panelRef) {
            this._panelRef.style.transition = 'none';
            if (this._isMobileHalfStack) {
                // Mobile: position below viewport
                this._panelRef.style.transform = 'translateY(100vh)';
            }
            else {
                // Desktop: position off-screen to the side
                const offScreen = this.position === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
                this._panelRef.style.transform = offScreen;
            }
        }
        // Also hide footer immediately
        if (this._footerRef) {
            this._footerRef.style.transition = 'none';
            if (this._isMobileHalfStack) {
                this._footerRef.style.transform = 'translateY(100%)';
            }
            else {
                const offScreen = this.position === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
                this._footerRef.style.transform = offScreen;
            }
        }
        if (typeof MutationObserver !== 'undefined') {
            this._mo?.disconnect();
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
        setTimeout(() => (this._firstFocusableEl ?? this._panelRef).focus({ preventScroll: true }), 0);
    }
    _onClose(animate) {
        this.drawerClosed.emit();
        this._detachGlobalListeners();
        // Only remove overflow-hidden if there's no open panel behind this drawer
        if (!this.isOnPanel) {
            document.body.classList.remove('overflow-hidden');
        }
        this._mo?.disconnect();
        this._mo = undefined;
        if (this._isMobileHalfStack)
            this._applyVisible(0, animate);
        this._focusableEls = [];
        this._firstFocusableEl = null;
        this._lastFocusableEl = null;
        this._restoreFocus();
    }
    // ────────────────────────── Layout sync ───────────────────────
    /** Recompute transforms/targets for current mode. */
    _syncLayoutForCurrentMode(animate, isInitialOpen = false) {
        if (!this._panelRef)
            return;
        if (this._isMobileHalfStack) {
            const targetPx = this._resolveInitialMobileVisiblePx();
            this.visiblePx = targetPx;
            this._applyVisible(targetPx, animate, isInitialOpen);
            return;
        }
        // Desktop side-panel - clear mobile height style
        this._panelRef.style.height = '';
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
                    this._setProgress(this._getViewportHeight());
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
                this._setProgress(this._getViewportHeight());
            }
        }
        else {
            this._panelRef.style.transform = '';
            if (this._footerRef)
                this._footerRef.style.transform = '';
            this._setProgress(0);
        }
    }
    _clamp(n, min, max) {
        return Math.max(min, Math.min(max, n));
    }
    _getAutoOpenVisiblePx(minPx, maxPx) {
        this._syncViewportCSSVars();
        const headerEl = this._panelRef?.querySelector('header');
        const headerH = headerEl ? Math.round(headerEl.getBoundingClientRect().height) : 0;
        const footerH = this._footerRef && this.showFooter ? this._footerRef.clientHeight : 0;
        let bodyContentH = 0;
        const slotEl = this._bodyRef?.querySelector('slot[name="body"]');
        const assigned = slotEl?.assignedElements({ flatten: true }) ?? [];
        if (assigned.length) {
            bodyContentH = assigned.reduce((sum, node) => {
                const el = node;
                const h = Math.max(el.scrollHeight || 0, Math.round(el.getBoundingClientRect().height) || 0, el.offsetHeight || 0);
                return sum + h;
            }, 0);
        }
        else {
            // Fallback: if slot not ready yet
            bodyContentH = this._bodyRef ? Math.round(this._bodyRef.scrollHeight) : 0;
        }
        // Avatar visually extends above header; cushion so it doesn't feel clipped.
        const avatarExtra = this._isMobileHalfStack && this.avatarImageSrc ? 30 : 0;
        const desired = headerH + bodyContentH + footerH + avatarExtra;
        return this._clamp(desired, minPx, maxPx);
    }
    _resolveInitialMobileVisiblePx() {
        const vh = this._getViewportHeight();
        const minPx = Math.round(vh * 0.25);
        const maxPx = Math.round(vh * 0.9);
        // Percent override wins
        if (typeof this.initialOpenPercent === 'number' && Number.isFinite(this.initialOpenPercent)) {
            const pct = this._clamp(this.initialOpenPercent, 25, 90);
            const px = Math.round((pct / 100) * vh);
            return this._clamp(px, minPx, maxPx);
        }
        // Otherwise use auto-fit
        return this._getAutoOpenVisiblePx(minPx, maxPx);
    }
    /** Progress [0..1] exposed as a CSS var for effects. */
    _setProgress(pxVisible) {
        const p = Math.min(1, Math.max(0, pxVisible / this._getViewportHeight()));
        this.el.style.setProperty('--drawer-progress', String(p));
    }
    /** Throttled viewport listener. */
    _onViewportResize = () => {
        if (!this.isOpen || this.isDragging)
            return;
        if (this._resizeRaf)
            cancelAnimationFrame(this._resizeRaf);
        this._resizeRaf = requestAnimationFrame(() => {
            this._syncViewportCSSVars();
            this._syncLayoutForCurrentMode(false);
        });
    };
    // ───────────────────── Drag / Snap mechanics ──────────────────
    _applyVisible(pxVisible, animate, isInitialOpen = false) {
        const vv = window.visualViewport;
        const H = this._getViewportHeight();
        const offsetTop = Math.round(vv?.offsetTop ?? 0);
        const clamped = Math.max(0, Math.min(pxVisible, H));
        this.visiblePx = clamped;
        const ty = H - clamped + offsetTop;
        if (animate && isInitialOpen) {
            // Initial open: set off-screen position, then animate to target
            const initialTy = H + offsetTop;
            this._panelRef.style.transition = 'none';
            this._panelRef.style.transform = `translateY(${initialTy}px)`;
            this._panelRef.style.height = `${clamped}px`;
            if (this._footerRef) {
                this._footerRef.style.transition = 'none';
                this._footerRef.style.transform = 'translateY(100%)';
            }
            // Short delay to ensure initial state is painted, then enable transition and animate
            setTimeout(() => {
                this._panelRef.style.transition = '';
                this._panelRef.classList.add('animating');
                this._panelRef.style.transform = `translateY(${ty}px)`;
                if (this._footerRef) {
                    this._footerRef.style.transition = `transform ${this.animationMs}ms cubic-bezier(.22, .61, .36, 1)`;
                    this._footerRef.style.transform = 'translateY(0)';
                }
                this._setProgress(clamped);
                window.setTimeout(() => {
                    this._panelRef.classList.remove('animating');
                    if (this._footerRef)
                        this._footerRef.style.transition = '';
                }, this.animationMs);
            }, 20);
        }
        else if (animate) {
            this._panelRef.classList.add('animating');
            this._panelRef.style.height = `${clamped}px`;
            this._panelRef.style.transform = `translateY(${ty}px)`;
            this._setProgress(clamped);
            window.setTimeout(() => this._panelRef.classList.remove('animating'), this.animationMs);
        }
        else {
            this._panelRef.style.height = `${clamped}px`;
            this._panelRef.style.transform = `translateY(${ty}px)`;
            this._setProgress(clamped);
        }
    }
    _onPointerDown = (e) => {
        if (!this.isOpen || !this._isMobileHalfStack || !this.isDraggable)
            return;
        const header = this._panelRef.querySelector('header');
        header?.setPointerCapture?.(e.pointerId);
        this.isDragging = true;
        this._panelRef.classList.remove('animating');
        this._startY = e.clientY;
        this.startVisiblePx = this.visiblePx;
        this._panelRef.style.transition = 'none';
        this._panelRef.style.willChange = 'transform';
        e.preventDefault();
        window.addEventListener('pointermove', this._onPointerMove, { passive: false });
        window.addEventListener('pointerup', this._onPointerUp, { passive: false, once: true });
    };
    _onPointerMove = (e) => {
        if (!this.isDragging) {
            return;
        }
        const vv = window.visualViewport;
        const offsetTop = Math.round(vv?.offsetTop ?? 0);
        // Calculate delta from START position
        const dy = this._startY - e.clientY; // Positive = dragging up
        // Calculate new visible pixels based on start position + delta
        let nextVisible = this.startVisiblePx + dy;
        const H = this._getViewportHeight();
        const maxVis = Math.round(H * 0.9);
        const minVis = Math.round(H * 0.3);
        if (nextVisible < minVis) {
            nextVisible = minVis;
        }
        else if (nextVisible > maxVis) {
            nextVisible = maxVis;
        }
        // Clamp to hard limits
        nextVisible = Math.max(minVis * 0.8, Math.min(maxVis * 1.1, nextVisible));
        // Update the transform and height so content scrolls properly during drag
        this._panelRef.style.transform = `translateY(${H - nextVisible + offsetTop}px)`;
        this._panelRef.style.height = `${nextVisible}px`;
        // Update current visible pixels for next frame
        this.visiblePx = nextVisible;
        this._setProgress(nextVisible);
        e.preventDefault();
    };
    _onPointerUp = () => {
        if (!this.isDragging)
            return;
        this.isDragging = false;
        this._panelRef.style.willChange = '';
        // Re-enable transitions for settle animation
        this._panelRef.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        const H = this._getViewportHeight();
        const maxVis = Math.round(H * 0.9);
        const minVis = Math.round(H * 0.25); // keep consistent with _resolveInitialMobileVisiblePx
        // Just clamp and settle where user left it
        const clampedVisible = Math.max(minVis, Math.min(maxVis, this.visiblePx));
        this._applyVisible(clampedVisible, true);
        setTimeout(() => this._recheckScrollState(), this.animationMs + 50);
    };
    // ────────────────────────── A11y / Focus ──────────────────────
    _getLocalActiveElement() {
        // Get the deeply active element, traversing through shadow roots
        let active = document.activeElement;
        while (active?.shadowRoot?.activeElement) {
            active = active.shadowRoot.activeElement;
        }
        return active;
    }
    _rememberOpener() {
        this._previouslyFocusedEl = this._getLocalActiveElement();
    }
    _isFocusable(el) {
        if (!(el instanceof HTMLElement) || !el.isConnected || ((el instanceof HTMLInputElement || el instanceof HTMLButtonElement) && el.disabled))
            return false;
        return typeof el.focus === 'function';
    }
    _focusDeep(el) {
        if (!el)
            return false;
        try {
            el.focus({ preventScroll: true });
        }
        catch { }
        if (this._getLocalActiveElement() === el)
            return true;
        const sr = el.shadowRoot;
        if (sr) {
            const inner = sr.querySelector('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
            if (inner) {
                try {
                    inner.focus({ preventScroll: true });
                }
                catch { }
                const active = this._getLocalActiveElement();
                if (active === el || active === inner)
                    return true;
            }
        }
        return false;
    }
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
        return main && this._isFocusable(main) ? main : document.body;
    }
    _restoreFocus() {
        const target = this._previouslyFocusedEl ?? null;
        requestAnimationFrame(() => {
            if (!this._focusDeep(target))
                this._focusDeep(this._findFallbackFocus());
        });
    }
    _findFocusable(root) {
        const els = [];
        const crawl = (node) => {
            const candidates = Array.from(node.querySelectorAll(WdprDrawer.FOCUSABLE_SELECTORS));
            for (const el of candidates) {
                if (el.hasAttribute('data-focus-sentinel') || el.closest('[data-focus-sentinel]'))
                    continue;
                if (!el.hasAttribute('disabled') && el.tabIndex !== -1 && !els.includes(el))
                    els.push(el);
            }
            node.querySelectorAll('*').forEach(el => {
                const host = el;
                if (host.shadowRoot)
                    crawl(host.shadowRoot);
                if (el.tagName === 'SLOT') {
                    const assigned = el.assignedElements({ flatten: true });
                    for (const a of assigned) {
                        if (a.shadowRoot)
                            crawl(a.shadowRoot);
                        crawl(a);
                    }
                }
            });
        };
        crawl(root);
        return els;
    }
    _prepareFocusTrap() {
        const panelFocusable = this._findFocusable(this._panelRef);
        const footerFocusable = this._footerRef ? this._findFocusable(this._footerRef) : [];
        this._focusableEls = [...panelFocusable, ...footerFocusable];
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
        const active = this.el.getRootNode().activeElement;
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
    _onDocFocusIn = (e) => {
        if (!this.isOpen || this._isRefocusing || this._isSentinelHandoff)
            return;
        const path = (e.composedPath?.() ?? []);
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
        if (e.key === KEYBOARD_KEYS.ESCAPE && !this.disableEscClose) {
            e.stopPropagation();
            this._closeDrawer();
            return;
        }
        if (e.key !== KEYBOARD_KEYS.TAB)
            return;
        this._prepareFocusTrap();
        const count = this._focusableEls.length;
        if (count === 0)
            return;
        const first = this._firstFocusableEl;
        const last = this._lastFocusableEl;
        const current = this._getCurrentFocusableFromEvent(e);
        if (!first || !last) {
            e.preventDefault();
            this._panelRef.focus({ preventScroll: true });
            return;
        }
        if (!current) {
            e.preventDefault();
            first.focus({ preventScroll: true });
            return;
        }
        if (e.shiftKey && current === first) {
            e.preventDefault();
            last.focus({ preventScroll: true });
            return;
        }
        if (!e.shiftKey && current === last) {
            e.preventDefault();
            first.focus({ preventScroll: true });
            return;
        }
    };
    _closeDrawer() {
        if (this.controlled) {
            this.drawerCloseRequested.emit();
        }
        else {
            this.isOpen = false;
        }
    }
    // ─────────────────────── Render helpers ───────────────────────
    get _isMobileHalfStack() {
        return this.layoutIsMobile || this.isOnPanel;
    }
    get _panelWidthClass() {
        return 'max-w-[100vw]';
    }
    get _sideTransformClass() {
        return this.position === 'right' ? 'right-0 left-auto translate-x-full' : 'left-0 right-auto -translate-x-full';
    }
    get _sideRadiusClass() {
        if (!this._isMobileHalfStack) {
            return this.position === 'right' ? 'rounded-tl-400 rounded-bl-400 rounded-tr-none rounded-br-none' : 'rounded-tr-400 rounded-br-400 rounded-tl-none rounded-bl-none';
        }
        return 'rounded-t-400';
    }
    get _sideRadiusHeaderClass() {
        if (!this._isMobileHalfStack) {
            return this.position === 'right' ? 'rounded-tl-400 rounded-bl-none rounded-tr-none rounded-br-none' : 'rounded-tr-400 rounded-br-none rounded-tl-none rounded-bl-none';
        }
        return 'rounded-t-400';
    }
    get _sideRadiusFooterClass() {
        // Desktop mode: clip the footer corner that matches the drawer's rounded edge
        if (!this._isMobileHalfStack) {
            return this.position === 'right' ? 'rounded-bl-400 rounded-tl-none rounded-tr-none rounded-br-none' : 'rounded-br-400 rounded-tr-none rounded-tl-none rounded-bl-none';
        }
        return '';
    }
    get _panelBgClass() {
        return this.colorMode === 'secondary' ? 'bg-page-default-alt' : 'bg-surface-default';
    }
    /** Desktop width; mobile ignores and uses visual-viewport centering. */
    get _panelStyle() {
        const w = this.width && this.width !== '' ? this.width : '26rem';
        return { width: w, maxWidth: '100vw' };
    }
    get _panelLayoutClasses() {
        if (this._isMobileHalfStack) {
            const overflowClass = this.avatarImageSrc ? 'overflow-visible' : 'overflow-hidden';
            return customTwMerge('fixed bottom-0', 'translate-y-full', // JS sets precise transform
            'max-h-[var(--vvh)] pb-[env(safe-area-inset-bottom)]', this._sideRadiusClass, this._panelWidthClass, overflowClass, 'flex flex-col', 'will-change-transform', 'transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)]', this._panelBgClass);
        }
        return customTwMerge('fixed top-0 bottom-0', this._sideTransformClass, this.isOpen ? 'translate-x-0' : '', 'flex flex-col', 'items-stretch content-stretch', this._panelBgClass, this._sideRadiusClass, this._panelWidthClass, 'transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)]', 'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]', 'pointer-events-auto', 'min-w-0 min-h-0 overflow-x-hidden overflow-y-auto');
    }
    get _drawerHeaderClasses() {
        const paddingTop = !this.isDraggable && (!this.avatarImageSrc || !this._isMobileHalfStack) ? 'pt-250' : '';
        const justifyContent = this.showBackButton && this.isCloseable ? 'justify-between' : 'justify-end';
        return bundleCjsExports.twMerge('flex px-300 pb-200', paddingTop, justifyContent);
    }
    get _headerClasses() {
        const headerColor = this.headerColorMode === 'secondary' ? 'bg-surface-default-alt' : 'bg-surface-default';
        // Use JS state for padding to stay in sync with layoutIsMobile
        const paddingTop = this._isMobileHalfStack ? '' : 'pt-400';
        // Allow overflow for avatar to extend above header
        const overflowClass = this._isMobileHalfStack && this.avatarImageSrc ? 'overflow-visible' : '';
        if (this.showDivider && this.isBodyScrolled) {
            const boxShadow = '[box-shadow:var(--theme-effect-000)_var(--theme-effect-025)_var(--theme-effect-100)_var(--theme-effect-000)_var(--color-plum-700-a16)]';
            return customTwMerge('sticky top-0 border-stroke-neutral-light', this._sideRadiusHeaderClass, this.showElevation ? boxShadow : '', 'flow-root', paddingTop, overflowClass, headerColor);
        }
        return customTwMerge('sticky top-0 border-stroke-neutral-light flow-root', paddingTop, overflowClass, headerColor, this._sideRadiusHeaderClass);
    }
    get _handleClasses() {
        const bgColor = this.headerColorMode === 'secondary' ? 'bg-surface-actionable-alt-focus' : 'bg-surface-neutral-light';
        return bundleCjsExports.twMerge('rounded-pill w-500 h-050', bgColor);
    }
    get _contentClasses() {
        const color = this.colorMode === 'secondary' ? 'bg-surface-default-alt' : 'bg-surface-default';
        return bundleCjsExports.twMerge('min-w-0 min-h-0 flex flex-col flex-1 pt-300 overflow-hidden', color);
    }
    _clickPrimary() {
        this.primaryAction.emit();
    }
    _overlayClick() {
        if (this.closeOnBackdrop)
            this._closeDrawer();
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
        this._closeDrawer();
    };
    _handlePrimaryClick = (ev) => {
        ev.stopPropagation();
        this._clickPrimary();
    };
    _handleScrollChange = (ev) => {
        const position = ev.detail?.position ?? 0;
        this.isBodyScrolled = position > 0;
    };
    /** Recheck scroll state after resize - reset scrolled state, scrollbar will update on next scroll */
    _recheckScrollState() {
        this.isBodyScrolled = false;
    }
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
        const ariaLabel = labelledBy ? undefined : this.titleText || 'Drawer';
        return (h(Host, { key: '652a9d77220cdd2346c2ce477d8b7ea14724cf46', style: { '--anim-ms': `${this.animationMs}ms` } }, h("wdpr-overlay", { key: 'e22465e93b7e4e73460c05495af95c7c77cb3fec', cover: true, open: this.isOpen, variant: "scrim", role: "presentation", "a11y-label": "Backdrop", onOverlayClick: this._handleOverlayClick }), h("div", { key: 'e3df08e851ceeb00834e09b8fa4b4cbf9132ab89', style: {
                ...this._panelStyle, // desktop
                ...(this._isMobileHalfStack
                    ? {
                        // Centered within the VisualViewport:
                        touchAction: 'pan-x',
                        width: 'var(--sheet-w)',
                        left: 'calc(var(--vvleft) + (var(--vvw) - var(--sheet-w)) / 2)',
                        top: 'var(--vvtop)',
                    }
                    : {}),
                paddingBottom: this.showFooter ? 'var(--pbottom)' : undefined,
            }, class: this._panelLayoutClasses, role: "dialog", "aria-modal": "true", tabIndex: -1, "aria-label": ariaLabel, "aria-labelledby": labelledBy, ref: el => (this._panelRef = el) }, h("div", { key: '9b0d4c6b8e6af19aa11545cca7fe04f48ff794da', "data-focus-sentinel": "start", tabIndex: 0, "aria-hidden": "true", class: "sr-only", onFocus: () => this._handleSentinelFocus(true) }), h("header", { key: 'ece873e19375037c5ba4f053f12c45db19560615', class: this._headerClasses, part: "header" }, this.isDraggable && this._isMobileHalfStack && !this.avatarImageSrc && (h("div", { key: 'e94de38ea5d5fd01f567aa5090a5c4a9914f2791', class: "mx-auto pt-100 pb-250 h-400 w-500", "data-drag-handle": true, onPointerDown: this._onPointerDown }, h("div", { key: '8eeecf3c0403332c1f9587c4c8017d1518de675f', class: this._handleClasses }))), this._isMobileHalfStack && this.avatarImageSrc && (h("div", { key: 'a594de2fe1237b29b56b93a6698228c732c96241', class: "flex h-400 pt-[34px] flex-col items-center self-stretch", "data-drag-handle": true, onPointerDown: this._onPointerDown }, h("div", { key: '4080f4b61d49d929c746d405ff59e9ee3bf7da60', class: "absolute top-[-34px] mx-auto" }, h("wdpr-avatar", { key: '93d2161f7068957ff751793a60091712bb270fd4', isInteractive: false, showBorder: true, imageSrc: this.avatarImageSrc, size: "large" })))), h("slot", { key: '4870d3bc2e369c00f608026869c4c5856b861c43', name: "drawer-header" }, h("div", { key: '6f3512fdc56a362fd1d8e5dfa1bfd96f88fce0ff', class: this._drawerHeaderClasses }, this.showBackButton && h("wdpr-icon-button", { key: '86e95ea6b6a16cd15a52be9aa0a44411f631d88a', iconName: "back-thick", a11yLabel: "Back", size: "medium", variant: "primary", onClick: this._handleBackClick }), this.isCloseable && h("wdpr-icon-button", { key: '2dd4e5d8181e8bf4df03490a6f59484f262cd7a0', iconName: "close-reversed", a11yLabel: "Close", size: "medium", variant: "primary", onClick: this._handleCloseClick }))), h("div", { key: '23d6ecd929f3951c0bc2644d032b7c40f6a5704d', class: "flex flex-col" }, h("slot", { key: '14648dff9f966468e816a60ec7b61afbaef9d48c', name: "header" }, h("wdpr-text-header", { key: '3c4dccb8b74f2c892185098b2b367e2632c9a862', size: "large", id: this._headingId, class: "px-300", headerLabel: this.titleText, subtextLabel: this.subtitleText }, this.leadingIcon && h("wdpr-icon-library", { key: '36cd286a0238b406c858e73dac92069e531c4fa2', size: "medium", icon: this.leadingIcon, slot: "leading-icon", decorative: true }))), h("slot", { key: '6062b07590d509918bd93a57352ca1027e5bf7d5', name: "header-content" }), this.showDivider && h("div", { key: 'b2047761b49fd7c593e2820378125b1658523a68', class: "mt-200" }, this.isBodyScrolled && h("wdpr-divider", { key: '933397f9406c0087768e26c3d5c82951a4618093', orientation: "horizontal" })))), h("section", { key: '4b9d75c2d43443c465be3b8267e62c954d2bec8d', class: this._contentClasses, part: "content", ref: el => (this._bodyRef = el) }, h("wdpr-scrollbar", { key: 'c3a863f4b6279676ef45405fe7ad4017a897a35e', orientation: "vertical", size: "medium", initialPosition: 0, class: "flex-1 min-h-0", tabIndex: -1, onScrollChange: this._handleScrollChange }, h("slot", { key: '50e9ce8e3c5bdfdf6b219e2d5e9aa651eedac1ae', name: "body" })))), this.showFooter && (h("footer", { key: '666116e163a310c779cd5f54d4b9c9450ad3852e', ref: el => (this._footerRef = el), part: "footer", class: customTwMerge('fixed bottom-0 z-[100000] overflow-hidden', this._sideRadiusFooterClass), style: {
                ...(this._isMobileHalfStack
                    ? {
                        width: 'var(--sheet-w)',
                        left: 'calc(var(--vvleft) + (var(--vvw) - var(--sheet-w)) / 2)',
                    }
                    : {
                        width: this.width || '26rem',
                        maxWidth: '100vw',
                        ...(this.position === 'right' ? { right: '0' } : { left: '0' }),
                    }),
            } }, h("slot", { key: '9efe5a7151eda0685f2032d1cfb1c0b6658b0ba3', name: "footer" }, h("wdpr-button-dock", { key: '1948813bff40a4be55bff0ff626015166cf94d2a' }, h("wdpr-button-bar", { key: '6715ef50f01644671b68f5aeba96aea5f2fec371', slot: "button-bar", layout: "stacked" }, h("wdpr-button", { key: '330413f319a6b3c07d677196262df51f87bbf061', display: "block", slot: "primary-button", variant: "primary", size: "large", onClick: this._handlePrimaryClick }, this.buttonText)))))), h("div", { key: '25c3bf69e21c926298d136f5e76ff8aab5619a8c', "data-focus-sentinel": "end", tabIndex: 0, "aria-hidden": "true", class: "sr-only", onFocus: () => this._handleSentinelFocus(false) })));
    }
    static get watchers() { return {
        "isOpen": ["onOpenChanged"]
    }; }
};
WdprDrawer.style = wdprDrawerCss;

export { WdprDrawer as wdpr_drawer };
//# sourceMappingURL=wdpr-drawer.entry.js.map

//# sourceMappingURL=wdpr-drawer.entry.js.map