import { Rive, ViewModelInstance } from '@rive-app/canvas';
import { EventEmitter } from '../../stencil-public-runtime';
export type RiveFit = 'cover' | 'contain' | 'fill' | 'fit-width' | 'fit-height' | 'none' | 'scale-down';
export type RiveAlignment = 'center' | 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export interface WdprRiveEventDetail {
    element: HTMLWdprRiveElement;
    riveInstance: Rive | null;
}
export interface WdprRiveErrorEventDetail extends WdprRiveEventDetail {
    error: Error;
}
export interface WdprRiveStateChangeEventDetail extends WdprRiveEventDetail {
    states: string[];
}
export declare class WdprRive {
    private _canvasEl;
    private _riveInstance;
    private _canvasId;
    private _resizeObserver;
    el: HTMLWdprRiveElement;
    /**
     * Returns the underlying Rive instance for advanced control
     */
    get riveInstance(): Rive | null;
    /**
     * Returns the underlying ViewModelInstance for advanced control
     */
    get modelInstance(): ViewModelInstance | null;
    _isPlaying: boolean;
    _isLoaded: boolean;
    _hasError: boolean;
    /**
     * URL to the Rive animation file (.riv)
     */
    src: string;
    /**
     * Whether the animation should autoplay on load
     */
    autoplay: boolean;
    /**
     * Whether to automatically bind data to the Rive instance
     */
    autoBind: boolean;
    /**
     * Name of the animation to play. If not provided, plays default animation.
     */
    animation: string;
    /**
     * Name of the state machine to use. Takes precedence over animation.
     */
    stateMachine: string;
    /**
     * Name of the artboard to use. If not provided, uses default artboard.
     */
    artboard: string;
    /**
     * How the animation should fit within the canvas
     */
    fit: RiveFit;
    /**
     * Alignment of the animation within the canvas
     */
    alignment: RiveAlignment;
    /**
     * Width of the canvas (CSS value or number in px)
     */
    width: string;
    /**
     * Height of the canvas (CSS value or number in px)
     */
    height: string;
    /**
     * Emitted when the animation has loaded
     */
    wdprLoad: EventEmitter<WdprRiveEventDetail>;
    /**
     * Emitted when the animation fails to load
     */
    wdprError: EventEmitter<WdprRiveErrorEventDetail>;
    /**
     * Emitted when the animation starts playing
     */
    wdprPlay: EventEmitter<WdprRiveEventDetail>;
    /**
     * Emitted when the animation is paused
     */
    wdprPause: EventEmitter<WdprRiveEventDetail>;
    /**
     * Emitted when the animation stops
     */
    wdprStop: EventEmitter<WdprRiveEventDetail>;
    /**
     * Emitted when a state machine state changes
     */
    wdprStateChange: EventEmitter<WdprRiveStateChangeEventDetail>;
    handleSrcChange(): void;
    handleAnimationChange(): void;
    handleLayoutChange(): void;
    /**
     * Plays the animation
     */
    play(animationName?: string): Promise<void>;
    /**
     * Pauses the animation
     */
    pause(animationName?: string): Promise<void>;
    /**
     * Stops the animation
     */
    stop(animationName?: string): Promise<void>;
    /**
     * Resets the animation to its initial state
     */
    reset(): Promise<void>;
    /**
     * Sets an input value on the state machine
     */
    setInput(inputName: string, value: number | boolean): Promise<void>;
    /**
     * Triggers a trigger input on the state machine
     */
    fireTrigger(triggerName: string): Promise<void>;
    /**
     * Returns the underlying Rive instance for advanced control.
     * Note: This will return null if called before the animation has loaded.
     * Listen for the `wdprLoad` event to know when the instance is ready.
     */
    getRiveInstance(): Promise<Rive | null>;
    /**
     * Returns the underlying ViewModelInstance for advanced control.
     * Note: This will return null if called before the animation has loaded.
     * Listen for the `wdprLoad` event to know when the instance is ready.
     */
    getModelInstance(): Promise<ViewModelInstance | null>;
    /**
     * Returns the state machine inputs for the current state machine.
     * Useful for discovering available inputs, triggers, and their types.
     * Note: This will return null if called before the animation has loaded or if no state machine is set.
     */
    getStateMachineInputs(): Promise<{
        name: string;
        type: 'boolean' | 'number' | 'trigger';
    }[] | null>;
    /**
     * Returns the ViewModel properties exposed by the animation, including nested properties.
     * Useful for discovering data bindings available in the animation.
     * Note: This will return null if called before the animation has loaded or if no ViewModel is bound.
     * @param flatten - If true, recursively flattens nested ViewModels with path notation (e.g., "parent/child/prop")
     */
    getViewModelProperties(flatten?: boolean): Promise<{
        name: string;
        path: string;
        type: string;
    }[] | null>;
    /**
     * Gets a text run value from the animation.
     * @param textRunName - Name of the text run node
     */
    getTextRunValue(textRunName: string): Promise<string | undefined>;
    /**
     * Sets a text run value in the animation.
     * @param textRunName - Name of the text run node
     * @param value - String value to set
     */
    setTextRunValue(textRunName: string, value: string): Promise<void>;
    /**
     * Gets a ViewModel property value by path.
     * @param path - Path to the property (e.g., "score", "player/name")
     * @param type - Type of the property ('string' | 'number' | 'boolean' | 'color')
     */
    getViewModelValue(path: string, type: 'string' | 'number' | 'boolean' | 'color'): Promise<string | number | boolean | null>;
    /**
     * Sets a ViewModel property value by path.
     * @param path - Path to the property (e.g., "score", "player/name")
     * @param type - Type of the property ('string' | 'number' | 'boolean' | 'color')
     * @param value - Value to set
     */
    setViewModelValue(path: string, type: 'string' | 'number' | 'boolean' | 'color', value: string | number | boolean): Promise<void>;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    private _setupResizeObserver;
    private _handleResize;
    private _cleanup;
    private _getFitValue;
    private _getAlignmentValue;
    private _updateLayout;
    private _loadRiveAnimation;
    private _getCanvasStyle;
    render(): any;
}
