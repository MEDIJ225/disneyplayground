import { EventEmitter } from '../../stencil-public-runtime';
import { CalendarSize, CalendarVariant } from '../wdpr-calendar/wdpr-calendar.model';
export declare class WdprRangeDatePicker {
    /**
     * @internal Reference to wdpr-range-datepicker-input component.
     */
    private _dualTextFieldElement;
    /**
     * @internal Reference to wdpr-calendar component.
     */
    private _calendarElement;
    /**
     * Reference to host element
     * @type {HTMLWdprRangeDatepickerElement}
     */
    el: HTMLWdprRangeDatepickerElement;
    internals: ElementInternals;
    /**
     * The flag that expand or not the calendar.
     * @type {boolean}
     */
    _expanded: boolean;
    /**
     * @internal
     * Tracks which field (start/end) the user last clicked to open the calendar.
     * Used to inform the calendar which date endpoint to update on the first selection.
     */
    _activeField: 'start' | 'end';
    /**
     * @internal
     * The internal ID for the dialog. It is used internally and is not exposed.
     */
    _internalDialogId: string;
    /**
     * The disabled state.
     * @type {string}
     */
    disabled: boolean;
    /**
     * Flag that enables or not an extra week.
     * @type {boolean}
     */
    enableSixWeeks: boolean;
    /**
     * The start label for the input.
     * @type {string}
     */
    startLabel: string;
    /**
     * The end label for the input.
     * @type {string}
     */
    endLabel: string;
    /**
     * The date format string (uses date-fns format syntax).
     *
     * @default "MM/dd/yyyy"
     * @example "dd-MM-yyyy"
     * @type {string}
     */
    format: string;
    /**
     * Default start date for range selection .
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/10/2025"
     * @type {string}
     */
    start?: string;
    /**
     * Default end date for range selection.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/20/2025"
     * @type {string}
     */
    end?: string;
    /**
     * Name for the start date in form submission.
     */
    startName?: string;
    /**
     * Name for the end date in form submission.
     */
    endName?: string;
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
     * Error state of the text field
     * @type {boolean}
     */
    error: boolean;
    /**
     * The calendar display variant.
     * - `single`: one month view
     * - `double`: two months side by side
     * - `swipe`: swipe between months
     *
     * @default "single"
     * @type {"single" | "double" | "swipe"}
     */
    variant: CalendarVariant;
    /**
     * Helper text for the wdpr-text-field. Could be for error or just info.
     * @type {string}
     */
    helperText: string;
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
     * Fired when a valid range of dates is selected.
     * @event rangeDatesSelected
     * @type {CustomEvent<{ startDate?: string; endDate?: string }>}
     * @property {string} [startDate] - Start date as an ISO string (e.g. "2025-06-19").
     * @property {string} [endDate] - End date as an ISO string (e.g. "2025-06-25").
     */
    rangeDatesSelected: EventEmitter<{
        startDate?: string;
        endDate?: string;
    }>;
    /**
     * Fired when an invalid date input is detected (wrong format, out of range, or invalid range).
     * @event dateInvalid
     * @type {CustomEvent<{ type: 'invalid-format' | 'out-of-range' | 'invalid-range'; start?: string; end?: string }>}
     * @property {'invalid-format' | 'out-of-range' | 'invalid-range'} type - Type of invalidity.
     * @property {string} [start] - Start date as an ISO string (if provided).
     * @property {string} [end] - End date as an ISO string (if provided).
     */
    dateInvalid: EventEmitter<{
        type: 'invalid-format' | 'out-of-range' | 'invalid-range';
        start?: string;
        end?: string;
    }>;
    handleClickOutside(event: MouseEvent): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    handleFormPropsChanged(): void;
    private _toggleExpandCalendar;
    private handleRangeDatesSelected;
    private _handleRangeDatesChanged;
    private _handleInputClick;
    private _handleInputKeyDown;
    private _handleCalendarKeyDown;
    private _waitForNextRender;
    private _getTodayString;
    private _getDateExtras;
    private _updateFormValue;
    private get _calendarWrapperClasses();
    private get _textFieldWrapperClasses();
    render(): any;
}
