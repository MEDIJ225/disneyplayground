import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprTimePicker {
    /**
     * Reference to host element
     */
    el: HTMLWdprTimePickerElement;
    internals: ElementInternals;
    /**
     * Visible label for the time picker text field (must always be visible for a11y).
     */
    label: string;
    /**
     * Helper text displayed under the field.
     */
    helperText: string;
    /**
     * Disabled state for the entire control.
     */
    disabled: boolean;
    /**
     * Read-only state for the entire control.
     */
    readonly: boolean;
    /**
     * Required state of the field.
     */
    required: boolean;
    name?: string;
    /**
     * Error visual state for the field.
     */
    error: boolean;
    /**
     * Current value in the specified format.
     */
    value: string;
    /**
     * Expected time format (e.g., "HH:mm", "hh:mm aa").
     * Used for validation.
     */
    format: string;
    private _inputValue;
    private _hasValidationError;
    private _textFieldId;
    /**
     * Emits the value whenever selection is committed.
     */
    valueChanged: EventEmitter<string>;
    componentWillLoad(): void;
    protected valueWatch(newVal: string): void;
    protected formatWatch(): void;
    protected formPropsChanged(): void;
    private _validate;
    /**
     * Auto-formats shorthand time inputs:
     * - "3P" -> "3:00 PM"
     * - "3:5" -> "3:05 AM"
     * - "3:5P" -> "3:05 PM"
     * - "15:5" -> "15:05"
     */
    private _autoFormatTime;
    /**
     * Extracts AM/PM period from input string
     */
    private _extractPeriod;
    /**
     * Parses time string into hours and minutes
     */
    private _parseTime;
    /**
     * Normalizes hours to 12-hour format (1-12)
     */
    private _normalizeTo12Hour;
    /**
     * Formats time in 12-hour format
     */
    private _format12Hour;
    /**
     * Formats time in 24-hour format
     */
    private _format24Hour;
    private _handleInputChange;
    private _handleBlur;
    private _updateFormValue;
    private _updateValidity;
    render(): any;
}
