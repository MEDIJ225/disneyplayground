'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
var pseudoStates_model = require('./pseudo-states.model-C9hz_K-N.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprGhostContainer = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprGhostContainerClick = index.createEvent(this, "wdprGhostContainerClick", 7);
    }
    /**
     * Fired when the container is activated (click, Enter, or Space) while interactive and not disabled.
     */
    wdprGhostContainerClick;
    /**
     * When true, the container itself is focusable and shows hover/pressed/focus states.
     * Use this when the container is an actionable affordance (e.g., clickable drop zone).
     */
    interactive = true;
    disabled = false;
    _handleDisabledChange() {
        this._handleSlotChange();
    }
    _handleInteractiveChange() {
        this._handleSlotChange();
    }
    get _hostEl() {
        return index.getElement(this);
    }
    _getSlotEl() {
        return this._hostEl.shadowRoot?.querySelector('slot') ?? null;
    }
    _getContainerEl() {
        return this._hostEl.shadowRoot?.querySelector('[part="container"]') ?? null;
    }
    _isContainerFocusable() {
        return this.interactive && !this.disabled;
    }
    _getSlottedRoots(slotEl) {
        return slotEl
            .assignedNodes({ flatten: true })
            .filter((n) => n.nodeType === Node.ELEMENT_NODE);
    }
    _getFocusableElementsWithin(root) {
        const selector = pseudoStates_model.FOCUSABLE_SELECTORS;
        const found = [];
        if (root.matches(selector))
            found.push(root);
        root.querySelectorAll(selector).forEach((el) => found.push(el));
        return found;
    }
    _isElement(node) {
        return node instanceof Element;
    }
    _isEventFromFocusable(event) {
        const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
        return path.some((n) => this._isElement(n) && n.matches(pseudoStates_model.FOCUSABLE_SELECTORS));
    }
    _disableTabOrderForSlottedContent() {
        const slotEl = this._getSlotEl();
        if (!slotEl)
            return;
        const roots = this._getSlottedRoots(slotEl);
        roots.forEach((root) => {
            this._getFocusableElementsWithin(root).forEach((el) => {
                if (!el.hasAttribute('data-wdpr-prev-tabindex')) {
                    const prev = el.getAttribute('tabindex');
                    el.setAttribute('data-wdpr-prev-tabindex', prev ?? '');
                }
                el.setAttribute('tabindex', '-1');
            });
        });
    }
    _restoreTabOrderForSlottedContent() {
        const slotEl = this._getSlotEl();
        if (!slotEl)
            return;
        const roots = this._getSlottedRoots(slotEl);
        roots.forEach((root) => {
            const selector = '[data-wdpr-prev-tabindex]';
            if (root.hasAttribute('data-wdpr-prev-tabindex')) {
                const prev = root.getAttribute('data-wdpr-prev-tabindex');
                if (prev === '')
                    root.removeAttribute('tabindex');
                else if (prev != null)
                    root.setAttribute('tabindex', prev);
                root.removeAttribute('data-wdpr-prev-tabindex');
            }
            root.querySelectorAll(selector).forEach((el) => {
                const prev = el.getAttribute('data-wdpr-prev-tabindex');
                if (prev === null)
                    return;
                if (prev === '')
                    el.removeAttribute('tabindex');
                else
                    el.setAttribute('tabindex', prev);
                el.removeAttribute('data-wdpr-prev-tabindex');
            });
        });
    }
    _onFocusIn = (event) => {
        if (!this.interactive || this.disabled)
            return;
        const container = this._getContainerEl();
        if (!container)
            return;
        if (event.target !== container) {
            event.stopPropagation();
            queueMicrotask(() => container.focus());
        }
    };
    _syncSlottedInteractivity() {
        if (this.disabled || this.interactive)
            this._disableTabOrderForSlottedContent();
        else
            this._restoreTabOrderForSlottedContent();
    }
    _handleSlotChange = () => {
        if (this.disabled)
            utils.propagateToSlot(this._getSlotEl(), 'disabled', true);
        this._syncSlottedInteractivity();
    };
    componentDidLoad() {
        this._handleSlotChange();
    }
    _emitActivate() {
        if (!this._isContainerFocusable())
            return;
        this.wdprGhostContainerClick.emit();
    }
    _onClick = (event) => {
        if (!this._isContainerFocusable())
            return;
        if (this._isEventFromFocusable(event))
            return;
        this._emitActivate();
        event.preventDefault();
    };
    _onKeyDown = (event) => {
        if (!this._isContainerFocusable())
            return;
        const container = this._getContainerEl();
        if (!container || event.target !== container)
            return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this._emitActivate();
        }
    };
    get _containerClasses() {
        const base = utils.customTwMerge('flex justify-center items-center overflow-hidden text-center', 'rounded-200', 'bg-surface-white-000-a48', 'border-025 border-dashed border-stroke-actionable-alt-disabled', 'p-200 max-w-[388px] min-h-[72px]', 'outline-none', 'focus:outline-none');
        const focusRing = this.interactive && !this.disabled
            ? utils.customTwMerge('focus-visible:outline', 'focus-visible:outline-solid', 'focus-visible:outline-offset-2', 'focus-visible:outline-stroke-actionable-focused', 'focus-visible:outline-037')
            : '';
        const interactiveStates = this.interactive && !this.disabled
            ? utils.customTwMerge('cursor-pointer', 'hover:border-stroke-actionable-hover', 'active:border-stroke-actionable-focused')
            : '';
        const disabledState = this.disabled ? utils.customTwMerge('border-stroke-disabled') : '';
        return utils.customTwMerge(base, focusRing, interactiveStates, disabledState);
    }
    render() {
        const isFocusable = this._isContainerFocusable();
        const tabindex = isFocusable ? 0 : undefined;
        return (index.h(index.Host, { key: '7e8326ab42b82797912c7b420539f120c051409d' }, index.h("div", { key: 'a0883746616bb9412bb3f03b763fb3bbb105afb9', part: "container", class: this._containerClasses, tabindex: tabindex, role: this.interactive ? 'button' : null, "aria-disabled": this.disabled ? 'true' : null, onClick: this._onClick, onKeyDown: this._onKeyDown, onFocusin: this._onFocusIn }, index.h("div", { key: '6233aecd610f8fcf46216fecc1c7e2bda793d49a', class: "w-full" }, index.h("slot", { key: 'ce9f51b7bd1f2636b9285fbb260f7be4fe0f593e', onSlotchange: this._handleSlotChange })))));
    }
    static get watchers() { return {
        "disabled": ["_handleDisabledChange"],
        "interactive": ["_handleInteractiveChange"]
    }; }
};

exports.wdpr_ghost_container = WdprGhostContainer;
//# sourceMappingURL=wdpr-ghost-container.entry.cjs.js.map

//# sourceMappingURL=wdpr-ghost-container.cjs.entry.js.map