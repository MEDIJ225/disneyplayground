import { EventEmitter } from '../../stencil-public-runtime';
import { StepperSize, StepperVariant } from './wdpr-stepper.model';
export declare class WdprStepper {
    el: HTMLElement;
    private _internals;
    private _inputId;
    private _alertId;
    private _errorId;
    private _defaultValue;
    private _inputRef?;
    constructor();
    /**
     * Size of the stepper component
     */
    size: StepperSize;
    /**
     * Variant of the stepper component
     */
    variant: StepperVariant;
    /**
     * Header text for inline variant (main label)
     */
    header?: string;
    /**
     * Sub-header text for inline variant (optional, 2 lines max)
     */
    subHeader?: string;
    /**
     * Current value of the stepper
     */
    value: number;
    /**
     * HTML input name and id
     */
    fieldName?: string;
    /**
     * Aria label for the increment button
     */
    incrementLabel: string;
    /**
     * Aria label for the decrement button
     */
    decrementLabel: string;
    /**
     * Aria label for the editable input
     */
    inputAriaLabel: string;
    /**
     * Aria describedby attribute for the editable input
     */
    inputAriaDescribedby?: string;
    /**
     * The upper limit for the stepper
     */
    upperLimit: number;
    /**
     * The lower limit for the stepper
     */
    lowerLimit: number;
    /**
     * Error message to display
     */
    errorMessage: string;
    /**
     * Whether the input is valid
     */
    valid: boolean;
    /**
     * Milliseconds the error message is displayed
     */
    messageDuration: number;
    /**
     * Disabled state
     */
    disabled: boolean;
    /**
     * Whether the stepper should be non-text-editable
     */
    nonTextEditable: boolean;
    /**
     * Disabled state for minus button
     */
    minusDisabled: boolean;
    /**
     * Disabled state for plus button
     */
    plusDisabled: boolean;
    /**
     * Only display the number/input
     */
    valueOnly: boolean;
    /**
     * Reset the value to the previous valid value if the new value is invalid
     */
    resetAfterInvalid: boolean;
    /**
     * Custom event emitted upon value change
     */
    updateDispatcher: EventEmitter;
    /**
     * Custom event emitted when the value is invalid
     */
    invalidValueDispatcher: EventEmitter;
    watchHandler(newValue: number, oldValue: number): void;
    disabledChanged(): void;
    componentWillLoad(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleFormReset;
    private _updateFormValue;
    private _countChanged;
    private _updateAriaAlert;
    private _isButtonDisabled;
    private _canIncrement;
    private _canDecrement;
    private _increment;
    private _decrement;
    private _handleKeyDown;
    private _handleChange;
    private _isValueInvalid;
    private _handleInvalidValue;
    private _handleValidValue;
    private _emitNativeEvents;
    /**
     * Programmatically focus the stepper
     */
    setFocus(): Promise<void>;
    private _getButtonSize;
    private _getInputClasses;
    private _getCounterClasses;
    private _getContainerClasses;
    private _getLabelContainerClasses;
    private _getHeaderClasses;
    private _getSubHeaderClasses;
    private _getStepperControlsClasses;
    private _handleInputRef;
    render(): any;
}
