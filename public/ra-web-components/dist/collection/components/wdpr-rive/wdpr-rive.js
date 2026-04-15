import { Alignment, Fit, Layout, Rive } from "@rive-app/canvas";
import { h } from "@stencil/core";
import { generateRandId } from "../../utils/utils";
export class WdprRive {
    _canvasEl;
    _riveInstance = null;
    _canvasId = `rive-canvas-${generateRandId()}`;
    _resizeObserver = null;
    el;
    /**
     * Returns the underlying Rive instance for advanced control
     */
    get riveInstance() {
        return this._riveInstance;
    }
    /**
     * Returns the underlying ViewModelInstance for advanced control
     */
    get modelInstance() {
        return this._riveInstance?.viewModelInstance ?? null;
    }
    _isPlaying = false;
    _isLoaded = false;
    _hasError = false;
    /**
     * URL to the Rive animation file (.riv)
     */
    src;
    /**
     * Whether the animation should autoplay on load
     */
    autoplay = true;
    /**
     * Whether to automatically bind data to the Rive instance
     */
    autoBind = true;
    /**
     * Name of the animation to play. If not provided, plays default animation.
     */
    animation;
    /**
     * Name of the state machine to use. Takes precedence over animation.
     */
    stateMachine;
    /**
     * Name of the artboard to use. If not provided, uses default artboard.
     */
    artboard;
    /**
     * How the animation should fit within the canvas
     */
    fit = 'contain';
    /**
     * Alignment of the animation within the canvas
     */
    alignment = 'center';
    /**
     * Width of the canvas (CSS value or number in px)
     */
    width = '100%';
    /**
     * Height of the canvas (CSS value or number in px)
     */
    height = '100%';
    /**
     * Emitted when the animation has loaded
     */
    wdprLoad;
    /**
     * Emitted when the animation fails to load
     */
    wdprError;
    /**
     * Emitted when the animation starts playing
     */
    wdprPlay;
    /**
     * Emitted when the animation is paused
     */
    wdprPause;
    /**
     * Emitted when the animation stops
     */
    wdprStop;
    /**
     * Emitted when a state machine state changes
     */
    wdprStateChange;
    handleSrcChange() {
        this._loadRiveAnimation();
    }
    handleAnimationChange() {
        if (this._riveInstance && this._isLoaded) {
            this._loadRiveAnimation();
        }
    }
    handleLayoutChange() {
        if (this._riveInstance && this._isLoaded) {
            this._updateLayout();
        }
    }
    /**
     * Plays the animation
     */
    async play(animationName) {
        if (this._riveInstance) {
            if (animationName) {
                this._riveInstance.play(animationName);
            }
            else {
                this._riveInstance.play();
            }
        }
    }
    /**
     * Pauses the animation
     */
    async pause(animationName) {
        if (this._riveInstance) {
            if (animationName) {
                this._riveInstance.pause(animationName);
            }
            else {
                this._riveInstance.pause();
            }
        }
    }
    /**
     * Stops the animation
     */
    async stop(animationName) {
        if (this._riveInstance) {
            if (animationName) {
                this._riveInstance.stop(animationName);
            }
            else {
                this._riveInstance.stop();
            }
        }
    }
    /**
     * Resets the animation to its initial state
     */
    async reset() {
        if (this._riveInstance) {
            this._riveInstance.reset();
        }
    }
    /**
     * Sets an input value on the state machine
     */
    async setInput(inputName, value) {
        if (this._riveInstance) {
            const inputs = this._riveInstance.stateMachineInputs(this.stateMachine);
            const input = inputs?.find(i => i.name === inputName);
            if (input) {
                input.value = value;
            }
        }
    }
    /**
     * Triggers a trigger input on the state machine
     */
    async fireTrigger(triggerName) {
        if (this._riveInstance) {
            const inputs = this._riveInstance.stateMachineInputs(this.stateMachine);
            const input = inputs?.find(i => i.name === triggerName);
            if (input && 'fire' in input) {
                input.fire();
            }
        }
    }
    /**
     * Returns the underlying Rive instance for advanced control.
     * Note: This will return null if called before the animation has loaded.
     * Listen for the `wdprLoad` event to know when the instance is ready.
     */
    async getRiveInstance() {
        return this._riveInstance;
    }
    /**
     * Returns the underlying ViewModelInstance for advanced control.
     * Note: This will return null if called before the animation has loaded.
     * Listen for the `wdprLoad` event to know when the instance is ready.
     */
    async getModelInstance() {
        return this._riveInstance?.viewModelInstance ?? null;
    }
    /**
     * Returns the state machine inputs for the current state machine.
     * Useful for discovering available inputs, triggers, and their types.
     * Note: This will return null if called before the animation has loaded or if no state machine is set.
     */
    async getStateMachineInputs() {
        if (!this._riveInstance || !this.stateMachine) {
            return null;
        }
        const inputs = this._riveInstance.stateMachineInputs(this.stateMachine);
        if (!inputs) {
            return null;
        }
        // StateMachineInputType enum values: Number=56, Trigger=58, Boolean=59
        return inputs.map(input => {
            const inputType = input.type;
            if (inputType === 58) {
                return { name: input.name, type: 'trigger' };
            }
            else if (inputType === 59) {
                return { name: input.name, type: 'boolean' };
            }
            else {
                return { name: input.name, type: 'number' };
            }
        });
    }
    /**
     * Returns the ViewModel properties exposed by the animation, including nested properties.
     * Useful for discovering data bindings available in the animation.
     * Note: This will return null if called before the animation has loaded or if no ViewModel is bound.
     * @param flatten - If true, recursively flattens nested ViewModels with path notation (e.g., "parent/child/prop")
     */
    async getViewModelProperties(flatten = true) {
        if (!this._riveInstance) {
            return null;
        }
        const viewModelInstance = this._riveInstance.viewModelInstance;
        if (!viewModelInstance) {
            return null;
        }
        const results = [];
        const processProperties = (instance, parentPath = '') => {
            const properties = instance.properties;
            if (!properties || properties.length === 0) {
                return;
            }
            for (const prop of properties) {
                const propType = typeof prop.type === 'string' ? prop.type : String(prop.type);
                const fullPath = parentPath ? `${parentPath}/${prop.name}` : prop.name;
                results.push({
                    name: prop.name,
                    path: fullPath,
                    type: propType,
                });
                // Recursively process nested ViewModels if flattening
                // Check for various possible type names for nested ViewModels
                if (flatten && (propType === 'viewModel' || propType === 'ViewModel' || propType === 'artboard' || propType === 'list')) {
                    // Try to get nested ViewModel
                    const nestedInstance = instance.viewModel(prop.name);
                    if (nestedInstance) {
                        processProperties(nestedInstance, fullPath);
                    }
                }
            }
        };
        processProperties(viewModelInstance);
        return results.length > 0 ? results : null;
    }
    /**
     * Gets a text run value from the animation.
     * @param textRunName - Name of the text run node
     */
    async getTextRunValue(textRunName) {
        return this._riveInstance?.getTextRunValue(textRunName);
    }
    /**
     * Sets a text run value in the animation.
     * @param textRunName - Name of the text run node
     * @param value - String value to set
     */
    async setTextRunValue(textRunName, value) {
        this._riveInstance?.setTextRunValue(textRunName, value);
    }
    /**
     * Gets a ViewModel property value by path.
     * @param path - Path to the property (e.g., "score", "player/name")
     * @param type - Type of the property ('string' | 'number' | 'boolean' | 'color')
     */
    async getViewModelValue(path, type) {
        const viewModelInstance = this._riveInstance?.viewModelInstance;
        if (!viewModelInstance) {
            return null;
        }
        const accessor = viewModelInstance[type](path);
        if (!accessor) {
            return null;
        }
        return accessor.value;
    }
    /**
     * Sets a ViewModel property value by path.
     * @param path - Path to the property (e.g., "score", "player/name")
     * @param type - Type of the property ('string' | 'number' | 'boolean' | 'color')
     * @param value - Value to set
     */
    async setViewModelValue(path, type, value) {
        const viewModelInstance = this._riveInstance?.viewModelInstance;
        if (!viewModelInstance) {
            return;
        }
        const accessor = viewModelInstance[type](path);
        if (accessor) {
            accessor.value = value;
        }
    }
    componentDidLoad() {
        this._setupResizeObserver();
        this._loadRiveAnimation();
    }
    disconnectedCallback() {
        this._cleanup();
    }
    _setupResizeObserver() {
        if (typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver(() => {
                this._handleResize();
            });
            this._resizeObserver.observe(this._canvasEl);
        }
    }
    _handleResize() {
        if (this._riveInstance) {
            this._riveInstance.resizeDrawingSurfaceToCanvas();
        }
    }
    _cleanup() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = null;
        }
        if (this._riveInstance) {
            this._riveInstance.cleanup();
            this._riveInstance = null;
        }
    }
    _getFitValue() {
        const fitMap = {
            'cover': Fit.Cover,
            'contain': Fit.Contain,
            'fill': Fit.Fill,
            'fit-width': Fit.FitWidth,
            'fit-height': Fit.FitHeight,
            'none': Fit.None,
            'scale-down': Fit.ScaleDown,
        };
        return fitMap[this.fit] || Fit.Contain;
    }
    _getAlignmentValue() {
        const alignmentMap = {
            'center': Alignment.Center,
            'top-left': Alignment.TopLeft,
            'top-center': Alignment.TopCenter,
            'top-right': Alignment.TopRight,
            'center-left': Alignment.CenterLeft,
            'center-right': Alignment.CenterRight,
            'bottom-left': Alignment.BottomLeft,
            'bottom-center': Alignment.BottomCenter,
            'bottom-right': Alignment.BottomRight,
        };
        return alignmentMap[this.alignment] || Alignment.Center;
    }
    _updateLayout() {
        if (this._riveInstance) {
            this._riveInstance.layout = new Layout({
                fit: this._getFitValue(),
                alignment: this._getAlignmentValue(),
            });
        }
    }
    _loadRiveAnimation() {
        if (!this.src || !this._canvasEl) {
            return;
        }
        // Cleanup previous instance
        if (this._riveInstance) {
            this._riveInstance.cleanup();
            this._riveInstance = null;
        }
        this._isLoaded = false;
        this._hasError = false;
        const options = {
            src: this.src,
            canvas: this._canvasEl,
            autoplay: this.autoplay,
            autoBind: this.autoBind,
            layout: new Layout({
                fit: this._getFitValue(),
                alignment: this._getAlignmentValue(),
            }),
            onLoad: () => {
                this._riveInstance?.resizeDrawingSurfaceToCanvas();
                this._isLoaded = true;
                this._isPlaying = this.autoplay;
                this.wdprLoad.emit({ element: this.el, riveInstance: this._riveInstance });
            },
            onLoadError: err => {
                this._hasError = true;
                this.wdprError.emit({ element: this.el, riveInstance: this._riveInstance, error: err });
            },
            onPlay: () => {
                this._isPlaying = true;
                this.wdprPlay.emit({ element: this.el, riveInstance: this._riveInstance });
            },
            onPause: () => {
                this._isPlaying = false;
                this.wdprPause.emit({ element: this.el, riveInstance: this._riveInstance });
            },
            onStop: () => {
                this._isPlaying = false;
                this.wdprStop.emit({ element: this.el, riveInstance: this._riveInstance });
            },
            onStateChange: event => {
                this.wdprStateChange.emit({ element: this.el, riveInstance: this._riveInstance, states: event.data });
            },
        };
        // Add optional properties
        if (this.artboard) {
            options.artboard = this.artboard;
        }
        if (this.stateMachine) {
            options.stateMachines = this.stateMachine;
        }
        else if (this.animation) {
            options.animations = this.animation;
        }
        this._riveInstance = new Rive(options);
    }
    _getCanvasStyle() {
        return {
            width: this.width,
            height: this.height,
        };
    }
    render() {
        return (h("div", { key: 'f847af153765adabc33c358729dcc4d3153b890a', class: wrapperClasses, part: "wrapper", "data-loaded": this._isLoaded, "data-playing": this._isPlaying, "data-error": this._hasError }, h("canvas", { key: 'ad3c9829d1db0dbf3ffbbf9910d29c1e7069a52f', ref: el => (this._canvasEl = el), id: this._canvasId, class: canvasClasses, style: this._getCanvasStyle(), part: "canvas" })));
    }
    static get is() { return "wdpr-rive"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "src": {
                "type": "string",
                "attribute": "src",
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
                    "text": "URL to the Rive animation file (.riv)"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "autoplay": {
                "type": "boolean",
                "attribute": "autoplay",
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
                    "text": "Whether the animation should autoplay on load"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "autoBind": {
                "type": "boolean",
                "attribute": "auto-bind",
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
                    "text": "Whether to automatically bind data to the Rive instance"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "animation": {
                "type": "string",
                "attribute": "animation",
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
                    "text": "Name of the animation to play. If not provided, plays default animation."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "stateMachine": {
                "type": "string",
                "attribute": "state-machine",
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
                    "text": "Name of the state machine to use. Takes precedence over animation."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "artboard": {
                "type": "string",
                "attribute": "artboard",
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
                    "text": "Name of the artboard to use. If not provided, uses default artboard."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "fit": {
                "type": "string",
                "attribute": "fit",
                "mutable": false,
                "complexType": {
                    "original": "RiveFit",
                    "resolved": "\"contain\" | \"cover\" | \"fill\" | \"fit-height\" | \"fit-width\" | \"none\" | \"scale-down\"",
                    "references": {
                        "RiveFit": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-rive/wdpr-rive.tsx",
                            "id": "src/components/wdpr-rive/wdpr-rive.tsx::RiveFit"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "How the animation should fit within the canvas"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'contain'"
            },
            "alignment": {
                "type": "string",
                "attribute": "alignment",
                "mutable": false,
                "complexType": {
                    "original": "RiveAlignment",
                    "resolved": "\"bottom-center\" | \"bottom-left\" | \"bottom-right\" | \"center\" | \"center-left\" | \"center-right\" | \"top-center\" | \"top-left\" | \"top-right\"",
                    "references": {
                        "RiveAlignment": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-rive/wdpr-rive.tsx",
                            "id": "src/components/wdpr-rive/wdpr-rive.tsx::RiveAlignment"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Alignment of the animation within the canvas"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'center'"
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
                    "text": "Width of the canvas (CSS value or number in px)"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'100%'"
            },
            "height": {
                "type": "string",
                "attribute": "height",
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
                    "text": "Height of the canvas (CSS value or number in px)"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'100%'"
            }
        };
    }
    static get states() {
        return {
            "_isPlaying": {},
            "_isLoaded": {},
            "_hasError": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprLoad",
                "name": "wdprLoad",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the animation has loaded"
                },
                "complexType": {
                    "original": "WdprRiveEventDetail",
                    "resolved": "WdprRiveEventDetail",
                    "references": {
                        "WdprRiveEventDetail": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-rive/wdpr-rive.tsx",
                            "id": "src/components/wdpr-rive/wdpr-rive.tsx::WdprRiveEventDetail"
                        }
                    }
                }
            }, {
                "method": "wdprError",
                "name": "wdprError",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the animation fails to load"
                },
                "complexType": {
                    "original": "WdprRiveErrorEventDetail",
                    "resolved": "WdprRiveErrorEventDetail",
                    "references": {
                        "WdprRiveErrorEventDetail": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-rive/wdpr-rive.tsx",
                            "id": "src/components/wdpr-rive/wdpr-rive.tsx::WdprRiveErrorEventDetail"
                        }
                    }
                }
            }, {
                "method": "wdprPlay",
                "name": "wdprPlay",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the animation starts playing"
                },
                "complexType": {
                    "original": "WdprRiveEventDetail",
                    "resolved": "WdprRiveEventDetail",
                    "references": {
                        "WdprRiveEventDetail": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-rive/wdpr-rive.tsx",
                            "id": "src/components/wdpr-rive/wdpr-rive.tsx::WdprRiveEventDetail"
                        }
                    }
                }
            }, {
                "method": "wdprPause",
                "name": "wdprPause",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the animation is paused"
                },
                "complexType": {
                    "original": "WdprRiveEventDetail",
                    "resolved": "WdprRiveEventDetail",
                    "references": {
                        "WdprRiveEventDetail": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-rive/wdpr-rive.tsx",
                            "id": "src/components/wdpr-rive/wdpr-rive.tsx::WdprRiveEventDetail"
                        }
                    }
                }
            }, {
                "method": "wdprStop",
                "name": "wdprStop",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the animation stops"
                },
                "complexType": {
                    "original": "WdprRiveEventDetail",
                    "resolved": "WdprRiveEventDetail",
                    "references": {
                        "WdprRiveEventDetail": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-rive/wdpr-rive.tsx",
                            "id": "src/components/wdpr-rive/wdpr-rive.tsx::WdprRiveEventDetail"
                        }
                    }
                }
            }, {
                "method": "wdprStateChange",
                "name": "wdprStateChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when a state machine state changes"
                },
                "complexType": {
                    "original": "WdprRiveStateChangeEventDetail",
                    "resolved": "WdprRiveStateChangeEventDetail",
                    "references": {
                        "WdprRiveStateChangeEventDetail": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-rive/wdpr-rive.tsx",
                            "id": "src/components/wdpr-rive/wdpr-rive.tsx::WdprRiveStateChangeEventDetail"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "play": {
                "complexType": {
                    "signature": "(animationName?: string) => Promise<void>",
                    "parameters": [{
                            "name": "animationName",
                            "type": "string",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Plays the animation",
                    "tags": []
                }
            },
            "pause": {
                "complexType": {
                    "signature": "(animationName?: string) => Promise<void>",
                    "parameters": [{
                            "name": "animationName",
                            "type": "string",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Pauses the animation",
                    "tags": []
                }
            },
            "stop": {
                "complexType": {
                    "signature": "(animationName?: string) => Promise<void>",
                    "parameters": [{
                            "name": "animationName",
                            "type": "string",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Stops the animation",
                    "tags": []
                }
            },
            "reset": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Resets the animation to its initial state",
                    "tags": []
                }
            },
            "setInput": {
                "complexType": {
                    "signature": "(inputName: string, value: number | boolean) => Promise<void>",
                    "parameters": [{
                            "name": "inputName",
                            "type": "string",
                            "docs": ""
                        }, {
                            "name": "value",
                            "type": "number | boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Sets an input value on the state machine",
                    "tags": []
                }
            },
            "fireTrigger": {
                "complexType": {
                    "signature": "(triggerName: string) => Promise<void>",
                    "parameters": [{
                            "name": "triggerName",
                            "type": "string",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Triggers a trigger input on the state machine",
                    "tags": []
                }
            },
            "getRiveInstance": {
                "complexType": {
                    "signature": "() => Promise<Rive | null>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "Rive": {
                            "location": "import",
                            "path": "@rive-app/canvas",
                            "id": "../../node_modules/@rive-app/canvas/rive.d.ts::Rive"
                        }
                    },
                    "return": "Promise<Rive>"
                },
                "docs": {
                    "text": "Returns the underlying Rive instance for advanced control.\nNote: This will return null if called before the animation has loaded.\nListen for the `wdprLoad` event to know when the instance is ready.",
                    "tags": []
                }
            },
            "getModelInstance": {
                "complexType": {
                    "signature": "() => Promise<ViewModelInstance | null>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "ViewModelInstance": {
                            "location": "import",
                            "path": "@rive-app/canvas",
                            "id": "../../node_modules/@rive-app/canvas/rive.d.ts::ViewModelInstance"
                        }
                    },
                    "return": "Promise<ViewModelInstance>"
                },
                "docs": {
                    "text": "Returns the underlying ViewModelInstance for advanced control.\nNote: This will return null if called before the animation has loaded.\nListen for the `wdprLoad` event to know when the instance is ready.",
                    "tags": []
                }
            },
            "getStateMachineInputs": {
                "complexType": {
                    "signature": "() => Promise<{ name: string; type: \"boolean\" | \"number\" | \"trigger\"; }[] | null>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "const": {
                            "location": "global",
                            "id": "global::const"
                        }
                    },
                    "return": "Promise<{ name: string; type: \"number\" | \"boolean\" | \"trigger\"; }[]>"
                },
                "docs": {
                    "text": "Returns the state machine inputs for the current state machine.\nUseful for discovering available inputs, triggers, and their types.\nNote: This will return null if called before the animation has loaded or if no state machine is set.",
                    "tags": []
                }
            },
            "getViewModelProperties": {
                "complexType": {
                    "signature": "(flatten?: boolean) => Promise<{ name: string; path: string; type: string; }[] | null>",
                    "parameters": [{
                            "name": "flatten",
                            "type": "boolean",
                            "docs": "- If true, recursively flattens nested ViewModels with path notation (e.g., \"parent/child/prop\")"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "ViewModelInstance": {
                            "location": "import",
                            "path": "@rive-app/canvas",
                            "id": "../../node_modules/@rive-app/canvas/rive.d.ts::ViewModelInstance"
                        }
                    },
                    "return": "Promise<{ name: string; path: string; type: string; }[]>"
                },
                "docs": {
                    "text": "Returns the ViewModel properties exposed by the animation, including nested properties.\nUseful for discovering data bindings available in the animation.\nNote: This will return null if called before the animation has loaded or if no ViewModel is bound.",
                    "tags": [{
                            "name": "param",
                            "text": "flatten - If true, recursively flattens nested ViewModels with path notation (e.g., \"parent/child/prop\")"
                        }]
                }
            },
            "getTextRunValue": {
                "complexType": {
                    "signature": "(textRunName: string) => Promise<string | undefined>",
                    "parameters": [{
                            "name": "textRunName",
                            "type": "string",
                            "docs": "- Name of the text run node"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<string>"
                },
                "docs": {
                    "text": "Gets a text run value from the animation.",
                    "tags": [{
                            "name": "param",
                            "text": "textRunName - Name of the text run node"
                        }]
                }
            },
            "setTextRunValue": {
                "complexType": {
                    "signature": "(textRunName: string, value: string) => Promise<void>",
                    "parameters": [{
                            "name": "textRunName",
                            "type": "string",
                            "docs": "- Name of the text run node"
                        }, {
                            "name": "value",
                            "type": "string",
                            "docs": "- String value to set"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Sets a text run value in the animation.",
                    "tags": [{
                            "name": "param",
                            "text": "textRunName - Name of the text run node"
                        }, {
                            "name": "param",
                            "text": "value - String value to set"
                        }]
                }
            },
            "getViewModelValue": {
                "complexType": {
                    "signature": "(path: string, type: \"string\" | \"number\" | \"boolean\" | \"color\") => Promise<string | number | boolean | null>",
                    "parameters": [{
                            "name": "path",
                            "type": "string",
                            "docs": "- Path to the property (e.g., \"score\", \"player/name\")"
                        }, {
                            "name": "type",
                            "type": "\"string\" | \"number\" | \"boolean\" | \"color\"",
                            "docs": "- Type of the property ('string' | 'number' | 'boolean' | 'color')"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<string | number | boolean>"
                },
                "docs": {
                    "text": "Gets a ViewModel property value by path.",
                    "tags": [{
                            "name": "param",
                            "text": "path - Path to the property (e.g., \"score\", \"player/name\")"
                        }, {
                            "name": "param",
                            "text": "type - Type of the property ('string' | 'number' | 'boolean' | 'color')"
                        }]
                }
            },
            "setViewModelValue": {
                "complexType": {
                    "signature": "(path: string, type: \"string\" | \"number\" | \"boolean\" | \"color\", value: string | number | boolean) => Promise<void>",
                    "parameters": [{
                            "name": "path",
                            "type": "string",
                            "docs": "- Path to the property (e.g., \"score\", \"player/name\")"
                        }, {
                            "name": "type",
                            "type": "\"string\" | \"number\" | \"boolean\" | \"color\"",
                            "docs": "- Type of the property ('string' | 'number' | 'boolean' | 'color')"
                        }, {
                            "name": "value",
                            "type": "string | number | boolean",
                            "docs": "- Value to set"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Sets a ViewModel property value by path.",
                    "tags": [{
                            "name": "param",
                            "text": "path - Path to the property (e.g., \"score\", \"player/name\")"
                        }, {
                            "name": "param",
                            "text": "type - Type of the property ('string' | 'number' | 'boolean' | 'color')"
                        }, {
                            "name": "param",
                            "text": "value - Value to set"
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "src",
                "methodName": "handleSrcChange"
            }, {
                "propName": "animation",
                "methodName": "handleAnimationChange"
            }, {
                "propName": "stateMachine",
                "methodName": "handleAnimationChange"
            }, {
                "propName": "fit",
                "methodName": "handleLayoutChange"
            }, {
                "propName": "alignment",
                "methodName": "handleLayoutChange"
            }];
    }
}
const wrapperClasses = 'relative block overflow-hidden';
const canvasClasses = 'block';
//# sourceMappingURL=wdpr-rive.js.map
