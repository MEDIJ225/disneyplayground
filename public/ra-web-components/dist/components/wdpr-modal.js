import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { i as isMobile } from './p-B3zeU0l2.js';

/**
 * Focus management utilities for the modal component.
 */
/** CSS selectors for natively focusable elements. */
const FOCUSABLE_SELECTORS = [
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
/**
 * Gets the deepest active element by traversing through shadow roots.
 */
function getDeepActiveElement() {
    let active = document.activeElement;
    while (active?.shadowRoot?.activeElement) {
        active = active.shadowRoot.activeElement;
    }
    return active;
}
/**
 * Finds all focusable elements within a container, traversing shadow DOM and slots.
 */
function findFocusableElements(root) {
    const elements = [];
    const seen = new WeakSet();
    function walk(node) {
        const children = 'children' in node ? Array.from(node.children) : [];
        for (const child of children) {
            const el = child;
            // Add if focusable and visible
            if (el.matches?.(FOCUSABLE_SELECTORS) && _isVisible(el) && !seen.has(el)) {
                seen.add(el);
                elements.push(el);
            }
            // Traverse shadow root
            if (el.shadowRoot) {
                walk(el.shadowRoot);
            }
            // Handle native slots - traverse assigned elements
            if (child.tagName === 'SLOT') {
                for (const assigned of child.assignedElements({ flatten: true })) {
                    const assignedEl = assigned;
                    if (assignedEl.matches?.(FOCUSABLE_SELECTORS) && _isVisible(assignedEl) && !seen.has(assignedEl)) {
                        seen.add(assignedEl);
                        elements.push(assignedEl);
                    }
                    if (assignedEl.shadowRoot) {
                        walk(assignedEl.shadowRoot);
                    }
                    walk(assigned);
                }
            }
            // Continue to children
            walk(child);
        }
    }
    walk(root);
    return elements;
}
/**
 * Checks if an element is visible, traversing across shadow DOM boundaries.
 */
function _isVisible(el) {
    let current = el;
    while (current) {
        if (current.hasAttribute('hidden')) {
            return false;
        }
        try {
            const style = getComputedStyle(current);
            if (style.display === 'none' || style.visibility === 'hidden') {
                return false;
            }
        }
        catch { }
        // Traverse up, crossing shadow DOM boundaries
        if (current.parentElement) {
            current = current.parentElement;
        }
        else {
            const root = current.getRootNode();
            current = root instanceof ShadowRoot ? root.host : null;
        }
    }
    return true;
}
/**
 * Finds an element by selector, searching through shadow DOM.
 */
function findElementBySelector(root, selector) {
    // Try light DOM first
    const lightEl = root.querySelector(selector);
    if (lightEl)
        return lightEl;
    // Try shadow DOM
    const shadowEl = root.shadowRoot?.querySelector(selector);
    if (shadowEl)
        return shadowEl;
    // Deep search through nested shadow roots
    function deepSearch(el) {
        if (el.shadowRoot) {
            const found = el.shadowRoot.querySelector(selector);
            if (found)
                return found;
            for (const child of Array.from(el.shadowRoot.querySelectorAll('*'))) {
                const result = deepSearch(child);
                if (result)
                    return result;
            }
        }
        return null;
    }
    return deepSearch(root);
}
/**
 * Gets a focusable element from a target (handles shadow DOM hosts).
 */
function getFocusableTarget(target) {
    if (target.matches(FOCUSABLE_SELECTORS)) {
        return target;
    }
    // Check shadow root for focusable element
    const shadowFocusable = target.shadowRoot?.querySelector(FOCUSABLE_SELECTORS);
    if (shadowFocusable)
        return shadowFocusable;
    // Check children
    const childFocusable = target.querySelector(FOCUSABLE_SELECTORS);
    if (childFocusable)
        return childFocusable;
    // Make target focusable as fallback
    if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
    }
    return target;
}
/**
 * Finds the modal's heading element (h1-h6), prioritizing modal header.
 */
function findHeadingElement(root) {
    const headingSelector = 'h1, h2, h3, h4, h5, h6';
    // Check wdpr-modal-header first
    const modalHeader = root.querySelector('wdpr-modal-header');
    const headerHeading = modalHeader?.shadowRoot?.querySelector(headingSelector);
    if (headerHeading)
        return headerHeading;
    // Check direct children's shadow roots
    for (const child of Array.from(root.children)) {
        const shadowHeading = child.shadowRoot?.querySelector(headingSelector);
        if (shadowHeading)
            return shadowHeading;
    }
    // Check light DOM
    const lightHeading = root.querySelector(headingSelector);
    if (lightHeading)
        return lightHeading;
    // Deep search as fallback
    for (const el of Array.from(root.querySelectorAll('*'))) {
        const shadowHeading = el.shadowRoot?.querySelector(headingSelector);
        if (shadowHeading)
            return shadowHeading;
    }
    return null;
}

const wdprModalCss = ":host{display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999}:host dialog::backdrop{background:rgba(0, 0, 0, 0.5)}:host([open]){display:block}";

const WdprModal$1 = /*@__PURE__*/ proxyCustomElement(class WdprModal extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.closedOnBackgroundClick = createEvent(this, "closedOnBackgroundClick", 7);
        this.openChangedEvent = createEvent(this, "open-changed", 7);
        this.closedOnEscape = createEvent(this, "closedOnEscape", 7);
    }
    _dialogEl;
    _focusableElements = [];
    _firstFocusableEl = null;
    _lastFocusableEl = null;
    _isDragging = false;
    _dragOffset = { x: 0, y: 0 };
    _mutationObserver = null;
    _resizeHandler;
    get el() { return this; }
    _isMobileViewport = typeof window !== 'undefined' ? isMobile() : false;
    /** Controls whether the modal is open or closed. */
    open = false;
    /** Controls whether the modal is fullscreen. */
    fullscreen = false;
    /** The aria-label for the modal dialog. */
    ariaLabel = '';
    width = null;
    height = null;
    isDraggable = true;
    initialFocus;
    disableBackgroundClose = false;
    disableEscapeClose = false;
    closedOnBackgroundClick;
    openChangedEvent;
    closedOnEscape;
    handleOpen() {
        this.openChangedEvent.emit();
        if (this.open) {
            this._dialogEl.showModal();
            this._prepareFocusTrap();
            setTimeout(() => {
                const focusTarget = this._getInitialFocusElement();
                if (focusTarget) {
                    focusTarget.focus();
                }
                else {
                    this._dialogEl.focus();
                }
            });
        }
        else {
            this._dialogEl.close();
        }
    }
    _prepareFocusTrap() {
        this._focusableElements = findFocusableElements(this._dialogEl);
        this._firstFocusableEl = this._focusableElements.at(0) || null;
        this._lastFocusableEl = this._focusableElements.at(-1) || null;
    }
    onSlotChange() {
        if (this.open) {
            setTimeout(() => this._prepareFocusTrap(), 100);
        }
    }
    componentDidLoad() {
        this._prepareFocusTrap();
        this._setupMutationObserver();
        this._setupResizeListener();
        if (this.open) {
            this._openDialogAndSetFocus();
        }
    }
    disconnectedCallback() {
        this._mutationObserver?.disconnect();
        this._removeResizeListener();
    }
    _setupResizeListener() {
        this._resizeHandler = () => {
            const isMobile = window.innerWidth < 768;
            if (this._isMobileViewport !== isMobile) {
                this._isMobileViewport = isMobile;
            }
        };
        window.addEventListener('resize', this._resizeHandler);
    }
    _removeResizeListener() {
        if (this._resizeHandler) {
            window.removeEventListener('resize', this._resizeHandler);
        }
    }
    _openDialogAndSetFocus() {
        this._dialogEl.showModal();
        setTimeout(() => {
            const focusTarget = this._getInitialFocusElement();
            if (focusTarget) {
                focusTarget.focus();
            }
            else {
                this._dialogEl.focus();
            }
        });
    }
    _setupMutationObserver() {
        if (typeof MutationObserver === 'undefined') {
            return;
        }
        this._mutationObserver = new MutationObserver(() => {
            if (this.open) {
                setTimeout(() => this._prepareFocusTrap(), 100);
            }
        });
        this._mutationObserver.observe(this.el, {
            childList: true,
            subtree: true,
        });
    }
    _handleTab(e) {
        this._prepareFocusTrap();
        if (this._focusableElements.length === 0) {
            e.preventDefault();
            this._dialogEl?.focus();
            return;
        }
        const active = getDeepActiveElement();
        const currentIndex = this._findCurrentFocusIndex(active);
        const count = this._focusableElements.length;
        if (currentIndex === -1) {
            e.preventDefault();
            if (e.shiftKey) {
                this._lastFocusableEl?.focus();
            }
            else {
                this._firstFocusableEl?.focus();
            }
            return;
        }
        if (e.shiftKey) {
            if (currentIndex === 0) {
                e.preventDefault();
                this._lastFocusableEl?.focus();
            }
        }
        else {
            if (currentIndex === count - 1) {
                e.preventDefault();
                this._firstFocusableEl?.focus();
            }
        }
    }
    _findCurrentFocusIndex(active) {
        if (!active)
            return -1;
        return this._focusableElements.findIndex(el => {
            if (el === active)
                return true;
            if (el.contains(active))
                return true;
            if (el.shadowRoot?.contains(active))
                return true;
            let current = active;
            while (current) {
                const root = current.getRootNode();
                if (root instanceof ShadowRoot && root.host === el) {
                    return true;
                }
                current = current.parentElement;
            }
            return false;
        });
    }
    _shouldModalHandleEscape(originalEvent) {
        const activeElement = getDeepActiveElement() ?? this._dialogEl;
        const escapeRequestEvent = new CustomEvent('wdprEscapeCloseRequest', {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: {
                originalEvent,
            },
        });
        const wasNotCancelled = activeElement.dispatchEvent(escapeRequestEvent);
        return wasNotCancelled;
    }
    _closeFromEscape() {
        if (this.disableEscapeClose) {
            return;
        }
        this.open = false;
        this.closedOnEscape.emit();
    }
    _handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            this._handleTab(e);
            return;
        }
        if (e.key === KEYBOARD_KEYS.ESCAPE || e.key === KEYBOARD_KEYS.ESC) {
            if (e.defaultPrevented) {
                return;
            }
            e.preventDefault();
            const shouldModalHandleEscape = this._shouldModalHandleEscape(e);
            if (!shouldModalHandleEscape) {
                return;
            }
            this._closeFromEscape();
        }
    };
    /**
     * Conditionally prevent native dialog cancel behavior.
     * Only prevent default if disableEscapeClose is true.
     * We manage Escape ourselves in _handleKeyDown so nested interactive components
     * can participate in the hierarchy first.
     */
    _handleCancel = (e) => {
        if (this.disableEscapeClose) {
            e.preventDefault();
        }
    };
    _getInitialFocusElement() {
        if (this.initialFocus) {
            const customTarget = findElementBySelector(this.el, this.initialFocus);
            if (customTarget) {
                return getFocusableTarget(customTarget);
            }
        }
        const heading = findHeadingElement(this.el);
        if (heading) {
            if (!heading.hasAttribute('tabindex')) {
                heading.setAttribute('tabindex', '-1');
            }
            return heading;
        }
        if (this._firstFocusableEl) {
            return this._firstFocusableEl;
        }
        return null;
    }
    _closeOnBackground = (event) => {
        if (event.target === this._dialogEl && !this.disableBackgroundClose) {
            this.open = false;
            this.closedOnBackgroundClick.emit();
        }
    };
    _startDrag = (event) => {
        if (event.button !== 0)
            return;
        if (this._isMobileViewport)
            return;
        const dialog = this._dialogEl;
        if (!dialog)
            return;
        this._isDragging = true;
        this._dragOffset = {
            x: event.clientX - dialog.offsetLeft,
            y: event.clientY - dialog.offsetTop,
        };
        document.addEventListener('mousemove', this._onDrag);
        document.addEventListener('mouseup', this._stopDrag);
    };
    _onDrag = (event) => {
        if (!this._isDragging)
            return;
        const dialog = this._dialogEl;
        dialog.style.position = 'absolute';
        dialog.style.margin = '0';
        dialog.style.left = `${event.clientX - this._dragOffset.x}px`;
        dialog.style.top = `${event.clientY - this._dragOffset.y}px`;
    };
    _stopDrag = () => {
        this._isDragging = false;
        document.removeEventListener('mousemove', this._onDrag);
        document.removeEventListener('mouseup', this._stopDrag);
    };
    _getDialogClasses() {
        const isMobileFullscreen = this.fullscreen && this._isMobileViewport;
        if (isMobileFullscreen) {
            return customTwMerge(dialogBaseClasses, dialogFullscreenClasses);
        }
        if (this.width) {
            return customTwMerge(dialogBaseClasses, dialogBaseWidthClasses);
        }
        return customTwMerge(dialogBaseClasses, dialogResponsiveWidthClasses);
    }
    _getContentClasses() {
        const isMobileFullscreen = this.fullscreen && this._isMobileViewport;
        if (isMobileFullscreen) {
            return customTwMerge(dialogContentBaseClasses, dialogContentFullscreenClasses);
        }
        if (this.height) {
            return customTwMerge(dialogContentBaseClasses, dialogContentCustomHeightClasses);
        }
        return customTwMerge(dialogContentBaseClasses, dialogContentDefaultClasses);
    }
    _getDialogStyles() {
        return {
            width: this.width ?? undefined,
        };
    }
    _getContentStyles() {
        return {
            height: this.height ?? undefined,
        };
    }
    _getDialogFrameClasses() {
        const isMobileFullscreen = this.fullscreen && this._isMobileViewport;
        if (isMobileFullscreen) {
            return customTwMerge(dialogFrameClasses, 'rounded-none');
        }
        return customTwMerge(dialogFrameClasses, 'rounded-200');
    }
    render() {
        const contentClasses = this._getContentClasses();
        const contentStyles = this._getContentStyles();
        const dialogClasses = this._getDialogClasses();
        const dialogStyles = this._getDialogStyles();
        const frameClasses = this._getDialogFrameClasses();
        return (h("dialog", { key: '28a9bb2be84dae2c34b865f8105a8947764dde46', "aria-label": this.ariaLabel, class: dialogClasses, style: dialogStyles, ref: el => (this._dialogEl = el), onClick: this._closeOnBackground, onMouseDown: this.isDraggable ? this._startDrag : undefined, onKeyDown: this._handleKeyDown, onCancel: this._handleCancel }, h("div", { key: 'afe6e6fece5d4bbab823c69d8284e053e9b4e5a7', class: dialogOverlayLayerClasses }, h("slot", { key: '22c7b62f0c92c272a1f27c0fea4a7170dc0f5cee', name: "overlay" })), h("div", { key: '8522a6cc70a5e6b1fe46385168f90a601d811b70', class: frameClasses }, h("div", { key: 'e3364c2dea488ec95d9c46d9ab93c5e140d1f65f', class: contentClasses, style: contentStyles }, h("slot", { key: '0d58864acf644542814d37ba500e3bf0cbe70325' })))));
    }
    static get watchers() { return {
        "open": ["handleOpen"]
    }; }
    static get style() { return wdprModalCss; }
}, [257, "wdpr-modal", {
        "open": [1540],
        "fullscreen": [1540],
        "ariaLabel": [1537, "aria-label"],
        "width": [1],
        "height": [1],
        "isDraggable": [4, "is-draggable"],
        "initialFocus": [1, "initial-focus"],
        "disableBackgroundClose": [4, "disable-background-close"],
        "disableEscapeClose": [4, "disable-escape-close"],
        "_isMobileViewport": [32]
    }, [[0, "slotchange", "onSlotChange"]], {
        "open": ["handleOpen"]
    }]);
const dialogBaseClasses = 'relative overflow-visible select-none focus:outline-none p-0 border-0 bg-transparent';
const dialogFrameClasses = 'relative bg-white overflow-hidden elevation-medium-soft';
const dialogOverlayLayerClasses = 'absolute inset-0 pointer-events-none';
const dialogResponsiveWidthClasses = 'm-auto min-w-[300px] max-w-[300px] md:max-w-[624px] lg:max-w-[956px]';
const dialogBaseWidthClasses = 'm-auto';
const dialogFullscreenClasses = 'w-screen h-screen max-w-[100vw] max-h-[100vh] m-0 rounded-none md:max-w-[624px] lg:max-w-[956px] md:m-auto md:rounded-200';
const dialogContentBaseClasses = 'flex flex-col text-text-heading overflow-visible';
const dialogContentDefaultClasses = 'min-h-[200px] max-h-[90vh]';
const dialogContentCustomHeightClasses = 'max-h-[90vh]';
const dialogContentFullscreenClasses = 'h-[100vh] max-h-full';
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-modal"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-modal":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprModal$1);
            }
            break;
    } });
}

const WdprModal = WdprModal$1;
const defineCustomElement = defineCustomElement$1;

export { WdprModal, defineCustomElement };
//# sourceMappingURL=wdpr-modal.js.map

//# sourceMappingURL=wdpr-modal.js.map