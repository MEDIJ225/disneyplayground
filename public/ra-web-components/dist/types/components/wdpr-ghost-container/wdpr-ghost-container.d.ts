import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprGhostContainer {
    /**
     * Fired when the container is activated (click, Enter, or Space) while interactive and not disabled.
     */
    wdprGhostContainerClick: EventEmitter<void>;
    /**
     * When true, the container itself is focusable and shows hover/pressed/focus states.
     * Use this when the container is an actionable affordance (e.g., clickable drop zone).
     */
    interactive: boolean;
    disabled: boolean;
    _handleDisabledChange(): void;
    _handleInteractiveChange(): void;
    private get _hostEl();
    private _getSlotEl;
    private _getContainerEl;
    private _isContainerFocusable;
    private _getSlottedRoots;
    private _getFocusableElementsWithin;
    private _isElement;
    private _isEventFromFocusable;
    private _disableTabOrderForSlottedContent;
    private _restoreTabOrderForSlottedContent;
    private _onFocusIn;
    private _syncSlottedInteractivity;
    private _handleSlotChange;
    componentDidLoad(): void;
    private _emitActivate;
    private _onClick;
    private _onKeyDown;
    private get _containerClasses();
    render(): any;
}
