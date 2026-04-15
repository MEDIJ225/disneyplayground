import { EventEmitter } from '../../stencil-public-runtime';
import { CalendarSize, CalendarVariant } from '../wdpr-calendar/wdpr-calendar.model';
export declare class WdprDatepicker {
    /**
     * @internal Reference to wdpr-text-field component.
     */
    private _textFieldElement;
    /**
     * @internal Reference to wdpr-calendar component.
     */
    private _calendarElement;
    private _defaultValue?;
    /**
     * Reference to host element
     * @type {HTMLWdprDatepickerElement}
     */
    el: HTMLWdprDatepickerElement;
    internals: ElementInternals;
    /**
     * @internal
     * The flag that expand or not the calendar.
     * @type {boolean}
     */
    _expanded: boolean;
    /**
     * @internal
     * The internal ID for the dialog. It is used internally and is not exposed.
     */
    _internalDialogId: string;
    /**
     * The label for wdpr-text-field.
     * @type {string}
     */
    label: string;
    /**
     * The disabled state.
     * @type {string}
     */
    disabled: boolean;
    required: boolean;
    name?: string;
    /**
     * The value of the datetime as a valid ISO 8601. Expected format 'MM/dd/yyyy'
     * @type {string}
     */
    value?: string;
    /**
     * Flag that enables or not an extra week.
     * @type {boolean}
     */
    enableSixWeeks: boolean;
    /**
     * The ISO 8601 format
     * @type {string}
     */
    format: string;
    /**
     * Error state of the text field
     * @type {boolean}
     */
    error: boolean;
    /**
     * Helper text for the wdpr-text-field. Could be for error or just info.
     * @type {string}
     */
    helperText: string;
    /**
     * Min date for the calendar to show.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/10/2025"
     * @type {string}
     */
    min?: string;
    /**
     * Max date the calendar to show.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/20/2025"
     * @type {string}
     */
    max?: string;
    /**
     * The calendar display variant.
     * - `single`: one month view
     * - `double`: two months side by side
     * - `swipe`: swipe between months
     * - `fourMonth`: four months side by side
     * @default "single"
     * @type {"single" | "double" | "swipe" | "fourMonth"}
     */
    variant: CalendarVariant;
    /**
     * (Optional) A unique ID for the component. It is essential for accessibility,
     * If not provided, a random ID will be generated.
     * @type {string}
     */
    dialogId?: string;
    /**
     * Flag that shows or hide the calendar borders
     * @default true
     * @type {boolean}
     */
    displayCalendarBorder: boolean;
    /**
     * Flag that shows or hide the calendar box shadow
     * @default true
     * @type {boolean}
     */
    showBoxShadow: boolean;
    /**
     * Readonly state of the text field
     * @type {boolean}
     */
    readonly: boolean;
    calendarSize: CalendarSize;
    inputMaxWidth: boolean;
    /**
     * Fired when a single valid date is selected.
     * @event dateSelected
     * @type {CustomEvent<string>}
     * @property {string} detail - Selected date as an ISO string (e.g. "2025-06-19").
     */
    dateSelected: EventEmitter<string>;
    /**
     * Fired when a date input is invalid (wrong format or out of range).
     * @event dateInvalid
     * @type {CustomEvent<{ date: string; type: 'out-of-range' | 'invalid-format' }>}
     * @property {string} date - The invalid date as an ISO string (e.g. "2025-06-19").
     * @property {'out-of-range' | 'invalid-format'} type - Type of invalidity.
     */
    dateInvalid: EventEmitter<{
        date: string;
        type: 'out-of-range' | 'invalid-format';
    }>;
    componentWillLoad(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentDidLoad(): void;
    protected formWatch(): void;
    handleClickOutside(event: MouseEvent): void;
    private _toggleExpandCalendar;
    private _handleSelectedDate;
    private _handleValueChanged;
    private _handleInputClick;
    private _handleInputKeyDown;
    private _handleCalendarKeyDown;
    private _waitForNextRender;
    private _getTodayString;
    private _getValidationResult;
    private _updateFormValue;
    private _updateValidity;
    private _getDateExtras;
    private _handleFormReset;
    private get _calendarWrapperClasses();
    private get _textFieldWrapperClasses();
    render(): any;
}
