import { h, Host } from "@stencil/core";
import { forwardCommonHostAttributes } from "../../utils/utils";
export class WdprToast {
    _enterRef = null;
    _autoDismissTimer = null;
    _exitFallbackTimer = null;
    _exitTransitionHandler = null;
    el;
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
    static get is() { return "wdpr-toast"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-toast.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-toast.css"]
        };
    }
    static get properties() {
        return {
            "toastStyle": {
                "type": "string",
                "attribute": "toast-style",
                "mutable": false,
                "complexType": {
                    "original": "ToastStyle",
                    "resolved": "\"error\" | \"informational\" | \"success\" | \"warning\"",
                    "references": {
                        "ToastStyle": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-toast/wdpr-toast.tsx",
                            "id": "src/components/wdpr-toast/wdpr-toast.tsx::ToastStyle"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Toast type"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'success'"
            },
            "actionType": {
                "type": "string",
                "attribute": "action-type",
                "mutable": false,
                "complexType": {
                    "original": "ToastAction",
                    "resolved": "\"button\" | \"close\"",
                    "references": {
                        "ToastAction": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-toast/wdpr-toast.tsx",
                            "id": "src/components/wdpr-toast/wdpr-toast.tsx::ToastAction"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Action type (button or close)"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'close'"
            },
            "showDescription": {
                "type": "boolean",
                "attribute": "show-description",
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
                    "text": "Show description text"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "toastTitle": {
                "type": "string",
                "attribute": "toast-title",
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
                    "text": "Title text"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
            "actionText": {
                "type": "string",
                "attribute": "action-text",
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
                    "text": "Action text"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
            "description": {
                "type": "string",
                "attribute": "description",
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
                    "text": "Description text"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
            "autoDismissMs": {
                "type": "number",
                "attribute": "auto-dismiss-ms",
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
                    "text": "Auto-dismiss delay in milliseconds. Default 0 (disabled).\nSuggested durations: 3000ms for &lt;1 line, 4000ms for 2 lines. Consider 0 for error toasts and action toasts."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "0"
            },
            "role": {
                "type": "string",
                "attribute": "role",
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
                    "text": "Optional ARIA role for live regions (alert/status). Accepts 'alert', 'status'; any other value omits the role."
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "closeAriaLabel": {
                "type": "string",
                "attribute": "close-aria-label",
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
                    "text": "Accessible label for the close icon button"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Close toast'"
            },
            "actionAriaLabel": {
                "type": "string",
                "attribute": "action-aria-label",
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
                    "text": "Accessible label for the inline action button (falls back to actionText)"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "_isEntered": {},
            "_isExiting": {}
        };
    }
    static get events() {
        return [{
                "method": "actionClicked",
                "name": "actionClicked",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when action button or close icon is clicked"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "toastDismissed",
                "name": "toastDismissed",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted after the exit animation completes (e.g. after close or auto-dismiss). Use to remove the toast from the DOM."
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
                "propName": "_isEntered",
                "methodName": "onEnteredChange"
            }, {
                "propName": "_isExiting",
                "methodName": "onExitingChange"
            }];
    }
}
//# sourceMappingURL=wdpr-toast.js.map
