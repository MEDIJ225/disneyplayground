import { EventEmitter } from '../../stencil-public-runtime';
export type ToastStyle = 'success' | 'informational' | 'warning' | 'error';
export type ToastAction = 'button' | 'close';
export declare class WdprToast {
    private _enterRef;
    private _autoDismissTimer;
    private _exitFallbackTimer;
    private _exitTransitionHandler;
    el: HTMLElement;
    _isEntered: boolean;
    _isExiting: boolean;
    /** Toast type */
    toastStyle: ToastStyle;
    /** Action type (button or close) */
    actionType: ToastAction;
    /** Show description text */
    showDescription: boolean;
    /** Title text */
    toastTitle: string;
    /** Action text */
    actionText: string;
    /** Description text */
    description: string;
    /**
     * Auto-dismiss delay in milliseconds. Default 0 (disabled).
     * Suggested durations: 3000ms for &lt;1 line, 4000ms for 2 lines. Consider 0 for error toasts and action toasts.
     */
    autoDismissMs: number;
    /** Optional ARIA role for live regions (alert/status). Accepts 'alert', 'status'; any other value omits the role. */
    role: string;
    /** Accessible label for the close icon button */
    closeAriaLabel: string;
    /** Accessible label for the inline action button (falls back to actionText) */
    actionAriaLabel?: string;
    /** Emitted when action button or close icon is clicked */
    actionClicked: EventEmitter<void>;
    /** Emitted after the exit animation completes (e.g. after close or auto-dismiss). Use to remove the toast from the DOM. */
    toastDismissed: EventEmitter<void>;
    onEnteredChange(entered: boolean): void;
    onExitingChange(isExiting: boolean): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleAction: (ev?: Event) => void;
    /** Map ToastStyle → wdpr-surface-style variant */
    private _getSurfaceVariant;
    private _getAccessibleLabel;
    /** Icons */
    private _getIcon;
    private _getButtonVariant;
    /** Keep the original look, but allow wrapping on small screens */
    private _getContainerClasses;
    private _getTitleClasses;
    private _getDescriptionClasses;
    private _getActionClasses;
    /** Allow content to actually shrink when space is tight */
    private _getContentClasses;
    /** Validate role prop. Only 'alert' or 'status' are applied; anything else (including 'none') omits the role. */
    private _getValidatedRoleAttr;
    private _clearAutoDismiss;
    private _startAutoDismiss;
    private _attachExitListener;
    private _detachExitListener;
    private _getAction;
    /** When action is a button, stack it below on small screens; inline from sm and up */
    private _getActionContainerClasses;
    /** Enter duration: 300ms success/informational, 200ms warning, 100ms error. */
    private _getHostClass;
    render(): any;
}
