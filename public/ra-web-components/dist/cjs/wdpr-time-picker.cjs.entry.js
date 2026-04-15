'use strict';

var index = require('./index-4gPM_TYz.js');
var index$1 = require('./index-oP7sywWN.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprTimePicker = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.valueChanged = index.createEvent(this, "valueChanged", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    get el() { return index.getElement(this); }
    internals;
    /**
     * Visible label for the time picker text field (must always be visible for a11y).
     */
    label = 'Time';
    /**
     * Helper text displayed under the field.
     */
    helperText = '';
    /**
     * Disabled state for the entire control.
     */
    disabled = false;
    /**
     * Read-only state for the entire control.
     */
    readonly = false;
    /**
     * Required state of the field.
     */
    required = false;
    name;
    /**
     * Error visual state for the field.
     */
    error = false;
    /**
     * Current value in the specified format.
     */
    value = '';
    /**
     * Expected time format (e.g., "HH:mm", "hh:mm aa").
     * Used for validation.
     */
    format = 'h:mm aa';
    _inputValue = '';
    _hasValidationError = false;
    _textFieldId = `time-textfield-${utils.generateRandId()}`;
    /**
     * Emits the value whenever selection is committed.
     */
    valueChanged;
    componentWillLoad() {
        this._inputValue = this.value || '';
        this._validate(this._inputValue);
        this._updateFormValue();
    }
    valueWatch(newVal) {
        this._inputValue = newVal || '';
        this._validate(this._inputValue);
        this._updateFormValue();
    }
    formatWatch() {
        this._validate(this._inputValue);
        this._updateFormValue();
    }
    formPropsChanged() {
        this._updateFormValue();
    }
    _validate(value) {
        if (!value) {
            this._hasValidationError = false;
            return;
        }
        const parsed = index$1.dateFnsExports.parse(value, this.format, new Date());
        this._hasValidationError = !index$1.dateFnsExports.isValid(parsed);
    }
    /**
     * Auto-formats shorthand time inputs:
     * - "3P" -> "3:00 PM"
     * - "3:5" -> "3:05 AM"
     * - "3:5P" -> "3:05 PM"
     * - "15:5" -> "15:05"
     */
    _autoFormatTime(input) {
        if (!input?.trim())
            return input;
        const trimmed = input.trim().toUpperCase();
        const { timePart, period, hasPeriod } = this._extractPeriod(trimmed);
        const { hours, minutes } = this._parseTime(timePart);
        // Return original input if parsing failed
        if (hours === null || minutes === null)
            return input;
        const is12HourFormat = this.format.toLowerCase().includes('a');
        if (is12HourFormat) {
            return this._format12Hour(hours, minutes, period, hasPeriod);
        }
        else {
            return this._format24Hour(hours, minutes);
        }
    }
    /**
     * Extracts AM/PM period from input string
     */
    _extractPeriod(input) {
        if (input.endsWith('PM') || input.endsWith('AM')) {
            return {
                timePart: input.slice(0, -2).trim(),
                period: input.slice(-2),
                hasPeriod: true,
            };
        }
        if (input.endsWith('P') || input.endsWith('A')) {
            return {
                timePart: input.slice(0, -1).trim(),
                period: input.endsWith('P') ? 'PM' : 'AM',
                hasPeriod: true,
            };
        }
        return { timePart: input, period: 'AM', hasPeriod: false };
    }
    /**
     * Parses time string into hours and minutes
     */
    _parseTime(timePart) {
        let hours;
        let minutes;
        if (timePart.includes(':')) {
            const parts = timePart.split(':');
            if (parts.length !== 2)
                return { hours: null, minutes: null };
            hours = parseInt(parts[0], 10);
            minutes = parseInt(parts[1], 10);
        }
        else {
            hours = parseInt(timePart, 10);
            minutes = 0;
        }
        // Validate parsed values
        if (isNaN(hours) || isNaN(minutes)) {
            return { hours: null, minutes: null };
        }
        // Validate ranges (allow 0-23 for hours, 0-59 for minutes)
        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            return { hours: null, minutes: null };
        }
        return { hours, minutes };
    }
    /**
     * Normalizes hours to 12-hour format (1-12)
     */
    _normalizeTo12Hour(hours) {
        if (hours === 0)
            return 12;
        if (hours > 12)
            return hours - 12;
        return hours;
    }
    /**
     * Formats time in 12-hour format
     */
    _format12Hour(hours, minutes, period, hasPeriod) {
        let finalPeriod = period;
        let finalHours = hours;
        // Determine period if not explicitly provided
        if (!hasPeriod) {
            if (hours >= 12) {
                finalPeriod = 'PM';
            }
            else {
                finalPeriod = 'AM';
            }
        }
        // Normalize hours to 12-hour format
        finalHours = this._normalizeTo12Hour(hours);
        const paddedMinutes = minutes.toString().padStart(2, '0');
        const shouldPadHours = this.format.includes('hh');
        const formattedHours = shouldPadHours ? finalHours.toString().padStart(2, '0') : finalHours.toString();
        return `${formattedHours}:${paddedMinutes} ${finalPeriod}`;
    }
    /**
     * Formats time in 24-hour format
     */
    _format24Hour(hours, minutes) {
        const paddedMinutes = minutes.toString().padStart(2, '0');
        const shouldPadHours = this.format.includes('HH');
        const formattedHours = shouldPadHours ? hours.toString().padStart(2, '0') : hours.toString();
        return `${formattedHours}:${paddedMinutes}`;
    }
    _handleInputChange = (ev) => {
        ev.stopPropagation();
        const val = ev.detail;
        this._inputValue = val;
        this._validate(val);
        this.value = val;
        this._updateFormValue();
        this.valueChanged.emit(this.value);
    };
    _handleBlur = () => {
        const formatted = this._autoFormatTime(this._inputValue);
        if (formatted !== this._inputValue) {
            this._inputValue = formatted;
            this._validate(formatted);
            this.value = formatted;
            this._updateFormValue();
            this.valueChanged.emit(this.value);
        }
    };
    _updateFormValue() {
        const hasValue = !!this.value;
        const isValid = !this._hasValidationError;
        const shouldSubmit = !this.disabled && !!this.name && hasValue && isValid;
        this.internals?.setFormValue?.(shouldSubmit ? this.value : null);
        this._updateValidity();
    }
    _updateValidity() {
        if (this.disabled || !this.required) {
            this.internals?.setValidity?.({});
            return;
        }
        if (!this.value) {
            this.internals?.setValidity?.({ valueMissing: true }, 'This field is required');
            return;
        }
        if (this._hasValidationError) {
            this.internals?.setValidity?.({ badInput: true }, 'Invalid time format');
            return;
        }
        this.internals?.setValidity?.({});
    }
    render() {
        return (index.h("div", { key: '733e04683e624e7e381ba7e38be16548e621a0c3' }, index.h("wdpr-text-field", { key: 'a37e180ab8ada9da2e4bc6f225c57546494778e2', label: this.label, helperText: this.helperText, value: this._inputValue, disabled: this.disabled, readonly: this.readonly, inputId: this._textFieldId, error: this.error || this._hasValidationError, onWdprValueChanged: this._handleInputChange, onWdprInputBlur: this._handleBlur, "a11y-disabled": this.disabled ? 'true' : undefined, "a11y-required": this.required ? 'true' : undefined, "a11y-described-by": this.helperText ? `${this._textFieldId}-helper` : undefined, part: "textfield" }, index.h("wdpr-icon-button", { key: 'f59ebf8213c5ad2e1e002610911a1b752a820837', variant: "primary", slot: "trailing-icon-button", "icon-name": "time-outlined", size: "medium", a11yLabel: "time-outline", "aria-hidden": "true", style: { color: 'var(--color-text-secondary)' } }))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["valueWatch"],
        "format": ["formatWatch"],
        "name": ["formPropsChanged"],
        "required": ["formPropsChanged"],
        "disabled": ["formPropsChanged"]
    }; }
};

exports.wdpr_time_picker = WdprTimePicker;
//# sourceMappingURL=wdpr-time-picker.entry.cjs.js.map

//# sourceMappingURL=wdpr-time-picker.cjs.entry.js.map