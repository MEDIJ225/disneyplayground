import { r as registerInstance, c as createEvent, a as getElement, h, H as Host } from './index-CykM8GCN.js';
import { b as forwardCommonHostAttributes } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const wdprToastCss = ":host{--toast-translate-y:var(--theme-motion-toast-translate-y);--toast-duration-opacity:var(--theme-motion-duration-100);--toast-duration-enter:var(--theme-motion-duration-200);--toast-duration-exit:var(--theme-motion-duration-200);--toast-easing-enter:var(--theme-motion-easing-on-stage);--toast-easing-exit:var(--theme-motion-easing-backstage);display:block;opacity:0;transform:translateY(var(--toast-translate-y));transition:opacity var(--toast-duration-opacity) var(--toast-easing-enter),\n    transform var(--toast-duration-enter) var(--toast-easing-enter);will-change:transform, opacity}:host(.toast-enter-300){--toast-duration-enter:var(--theme-motion-duration-300)}:host(.toast-enter-100){--toast-duration-enter:var(--theme-motion-duration-100)}:host(.toast-entered){opacity:1;transform:translateY(0)}:host(.toast-exiting){opacity:0;transform:translateY(var(--toast-translate-y));transition:opacity var(--toast-duration-opacity) var(--toast-easing-exit) var(--theme-motion-duration-100),\n    transform var(--toast-duration-exit) var(--toast-easing-exit)}@media (prefers-reduced-motion: reduce){:host{--toast-translate-y:0;--toast-duration-opacity:0ms;--toast-duration-enter:0ms;--toast-duration-exit:0ms;transition:none;transform:translateY(0)}:host(.toast-entered){opacity:1}:host(.toast-exiting){opacity:0;transition:none}}wdpr-icon-button.toast-close::part(button){padding:var(--spacing-075)}";

const WdprToast = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.actionClicked = createEvent(this, "actionClicked", 7);
        this.toastDismissed = createEvent(this, "toastDismissed", 7);
    }
    _enterRef = null;
    _autoDismissTimer = null;
    _exitFallbackTimer = null;
    _exitTransitionHandler = null;
    get el() { return getElement(this); }
    _isEntered = false;
    _isExiting = false;
    /** Toast type */
    toastStyle = 'success';
    /** Action type (button or close) */
    actionType = 'close';
    /** Show description text */
    showDescription = true;
    /** Title text */
    toastTitle = '';
    /** Action text */
    actionText = '';
    /** Description text */
    description = '';
    /**
     * Auto-dismiss delay in milliseconds. Default 0 (disabled).
     * Suggested durations: 3000ms for &lt;1 line, 4000ms for 2 lines. Consider 0 for error toasts and action toasts.
     */
    autoDismissMs = 0;
    /** Optional ARIA role for live regions (alert/status). Accepts 'alert', 'status'; any other value omits the role. */
    role;
    /** Accessible label for the close icon button */
    closeAriaLabel = 'Close toast';
    /** Accessible label for the inline action button (falls back to actionText) */
    actionAriaLabel;
    /** Emitted when action button or close icon is clicked */
    actionClicked;
    /** Emitted after the exit animation completes (e.g. after close or auto-dismiss). Use to remove the toast from the DOM. */
    toastDismissed;
    onEnteredChange(entered) {
        if (entered)
            this._startAutoDismiss();
    }
    onExitingChange(isExiting) {
        if (isExiting) {
            this._clearAutoDismiss();
            this._attachExitListener();
        }
    }
    connectedCallback() {
        this._enterRef = requestAnimationFrame(() => {
            this._enterRef = null;
            this._isEntered = true;
        });
    }
    disconnectedCallback() {
        if (this._enterRef != null) {
            cancelAnimationFrame(this._enterRef);
            this._enterRef = null;
        }
        this._clearAutoDismiss();
        this._detachExitListener();
        if (this._exitFallbackTimer != null) {
            clearTimeout(this._exitFallbackTimer);
            this._exitFallbackTimer = null;
        }
    }
    handleAction = (ev) => {
        ev?.stopPropagation?.();
        this.actionClicked.emit();
        this._isExiting = true;
    };
    /** Map ToastStyle → wdpr-surface-style variant */
    _getSurfaceVariant() {
        const map = {
            success: 'success-extra-bright-large-elevated',
            informational: 'informational-extra-bright-large-elevated',
            warning: 'warning-extra-bright-large-elevated',
            error: 'critical-dim-large-elevated',
        };
        return map[this.toastStyle];
    }
    _getAccessibleLabel(style) {
        switch (style) {
            case 'success':
                return 'Success';
            case 'warning':
                return 'Warning';
            case 'informational':
                return 'Information';
            case 'error':
                return 'Error';
        }
    }
    /** Icons */
    _getIcon() {
        return h("wdpr-status-icon", { variant: this.toastStyle, size: "xxsmall", ariaLabel: this._getAccessibleLabel(this.toastStyle) });
    }
    _getButtonVariant() {
        switch (this.toastStyle) {
            case 'error':
                return 'tertiary-alt';
            default:
                return 'tertiary';
        }
    }
    /** Keep the original look, but allow wrapping on small screens */
    _getContainerClasses() {
        return `flex flex-wrap sm:flex-nowrap ${this.showDescription ? 'items-start' : 'items-center'} gap-150 w-full`;
    }
    _getTitleClasses() {
        return 'max-w-xs heading-xsmall-alt line-clamp-1' + (this.toastStyle === 'error' ? ' text-text-inverse' : ' text-text-heading');
    }
    _getDescriptionClasses() {
        return 'max-w-xs body-small line-clamp-2' + (this.toastStyle === 'error' ? ' text-text-inverse' : ' text-text-body');
    }
    _getActionClasses() {
        return `toast-close  ${this.toastStyle === 'error' ? ' text-text-inverse' : ''} `;
    }
    /** Allow content to actually shrink when space is tight */
    _getContentClasses() {
        const wrappingClasses = this.actionType === 'button' ? 'flex-wrap sm:flex-nowrap' : '';
        return `min-w-0 flex flex-1 ${wrappingClasses} items-start gap-150`;
    }
    /** Validate role prop. Only 'alert' or 'status' are applied; anything else (including 'none') omits the role. */
    _getValidatedRoleAttr() {
        const value = (this.role || '').trim().toLowerCase();
        if (value === 'alert' || value === 'status') {
            return { role: value };
        }
        return {};
    }
    _clearAutoDismiss() {
        if (this._autoDismissTimer != null) {
            clearTimeout(this._autoDismissTimer);
            this._autoDismissTimer = null;
        }
    }
    _startAutoDismiss() {
        if (this.autoDismissMs <= 0 || this._isExiting)
            return;
        this._autoDismissTimer = setTimeout(() => {
            this._autoDismissTimer = null;
            this._isExiting = true;
        }, this.autoDismissMs);
    }
    _attachExitListener() {
        this._detachExitListener();
        const complete = () => {
            if (this._exitFallbackTimer != null) {
                clearTimeout(this._exitFallbackTimer);
                this._exitFallbackTimer = null;
            }
            this._detachExitListener();
            this.toastDismissed.emit();
        };
        const handler = (e) => {
            if (e.propertyName !== 'transform')
                return;
            complete();
        };
        this._exitTransitionHandler = handler;
        this.el.addEventListener('transitionend', handler);
        this._exitFallbackTimer = setTimeout(complete, 500);
    }
    _detachExitListener() {
        if (this._exitTransitionHandler) {
            this.el.removeEventListener('transitionend', this._exitTransitionHandler);
            this._exitTransitionHandler = null;
        }
        if (this._exitFallbackTimer != null) {
            clearTimeout(this._exitFallbackTimer);
            this._exitFallbackTimer = null;
        }
    }
    _getAction() {
        if (this.actionType === 'close') {
            return (h("wdpr-icon-button", { variant: this.toastStyle === 'error' ? 'tertiary-alt' : 'primary', iconName: "close-reversed", a11yLabel: this.closeAriaLabel, size: "xxsmall", class: this._getActionClasses(), onClick: this.handleAction }));
        }
        return (h("slot", { name: "action" }, h("wdpr-button", { variant: this._getButtonVariant(), onClick: this.handleAction, a11yLabel: this.actionAriaLabel || this.actionText, display: "block", size: "small" }, this.actionText)));
    }
    /** When action is a button, stack it below on small screens; inline from sm and up */
    _getActionContainerClasses() {
        if (this.actionType === 'button') {
            return 'shrink-0 w-full sm:w-auto';
        }
        return 'shrink-0';
    }
    /** Enter duration: 300ms success/informational, 200ms warning, 100ms error. */
    _getHostClass() {
        const classes = [];
        if (this.toastStyle === 'success' || this.toastStyle === 'informational') {
            classes.push('toast-enter-300');
        }
        else if (this.toastStyle === 'error') {
            classes.push('toast-enter-100');
        }
        if (this._isEntered && !this._isExiting)
            classes.push('toast-entered');
        if (this._isExiting)
            classes.push('toast-exiting');
        return classes.length ? classes.join(' ') : undefined;
    }
    render() {
        // Avoid passing through any pre-existing 'role' from forwarded attributes;
        // rely on validated role only.
        const forwarded = { ...(forwardCommonHostAttributes(this.el) || {}) };
        if ('role' in forwarded)
            delete forwarded.role;
        return (h(Host, { key: '085b5b08d40431de3d188ab89a07599efb6c70b9', class: this._getHostClass() }, h("wdpr-surface-style", { key: 'd596b74c511c355caeaed7e23b24b61f7d88cbe0', ...forwarded, ...this._getValidatedRoleAttr(), variant: this._getSurfaceVariant(), padding: "md", class: this._getContainerClasses() }, h("div", { key: '8c249255cc57e4f5ce321db6ca16f4d629dd154e', class: this._getContentClasses() }, h("div", { key: '1cc526281cb086a7a0fa60ba2a0840d97a0a1e2d', class: "shrink-0" }, this._getIcon()), h("div", { key: 'cfc5b6e9f5b9a422744441f9534d11d30d25eaf2', class: "flex-1 items-start flex flex-col gap-050 min-w-0 pt-025" }, h("h2", { key: '20b3b47e4ab7ae25b9835f7aa2ec2e2968679c86', part: "title", class: this._getTitleClasses(), title: this.toastTitle || undefined }, this.toastTitle), this.showDescription && (h("p", { key: '2655c27b23cd881aa143f4fe79d948c5952544c7', part: "description", class: this._getDescriptionClasses(), title: this.description || undefined }, this.description))), h("div", { key: '6cb7bcd766ec8530d2214fc63243c3a8143cf069', class: this._getActionContainerClasses() }, this._getAction())))));
    }
    static get watchers() { return {
        "_isEntered": ["onEnteredChange"],
        "_isExiting": ["onExitingChange"]
    }; }
};
WdprToast.style = wdprToastCss;

export { WdprToast as wdpr_toast };
//# sourceMappingURL=wdpr-toast.entry.js.map

//# sourceMappingURL=wdpr-toast.entry.js.map