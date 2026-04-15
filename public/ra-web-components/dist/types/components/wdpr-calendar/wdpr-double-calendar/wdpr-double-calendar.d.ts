import { EventEmitter } from '../../../stencil-public-runtime';
import { CalendarMode, CalendarSize } from '../wdpr-calendar.model';
export declare class WdprDoubleCalendar {
    el: HTMLWdprDoubleCalendarElement;
    private _isMobileView;
    private _isPrevMonthDisabled;
    private _isNextMonthDisabled;
    /**
     * Selected date.
     * Only used when `mode="single"`.
     * @type {Date | null}
     * @default null
     */
    selectedDate: Date | null;
    /**
     * The start date of the selected range.
     * Only used when `mode="range"`.
     *
     * @type {Date | null}
     * @default null
     */
    startDate: Date | null;
    /**
     * The end date of the selected range.
     * Only used when `mode="range"`.
     *
     * @type {Date | null}
     * @default null
     */
    endDate: Date | null;
    /**
     * Currently hovered date in the calendar.
     * @type {Date | null}
     * @default null
     */
    hoverDate: Date | null;
    /**
     * The calendar mode.
     * - `single`: user selects one date
     * - `range`: user selects a start and end date
     *
     * @default "single"
     * @type {"single" | "range"}
     */
    mode: CalendarMode;
    /**
     * Whether to always render six weeks in the calendar view.
     * Useful for keeping calendar height consistent.
     *
     * @default false
     * @type {boolean}
     */
    enableSixWeeks: boolean;
    /**
     * The date format string (uses date-fns format syntax).
     *
     * @default "MM/dd/yyyy"
     * @example "dd-MM-yyyy"
     * @type {string}
     */
    format: string;
    /**
     * The extra info for the date cells
     * @type { Map<string, HTMLElement>}
     */
    extras: Map<string, HTMLElement>;
    /**
     * Flag that shows or hide the calendar borders
     * @default true
     * @type {boolean}
     */
    displayBorder: boolean;
    /**
     * Optional predicate to indicate a day is blocked (disabled).
     * Provided by the parent calendar.
     */
    isDateBlocked?: (date: Date) => boolean;
    /**
     * Whether this disabled cells should set a slash in the disabled dates or not.
     * @default false
     */
    showDisabledSlash: boolean;
    /**
     * The calendar size.
     *
     * @default "medium"
     * @type {"small" | "medium"}
     */
    size: CalendarSize;
    /**
     * The date currently setting as the Maximum end date in Range mode.
     * Internal use only.
     * @type {Date | null}
     */
    maxRangeDate: Date | null;
    /**
     * The date that will be used to display the month in the calendar.
     * Default is the current date.
     * @type {Date}
     */
    displayDate: Date;
    /**
     * The minimum date formatted.
     * @type {Date | null}
     */
    minDate: Date | null;
    /**
     * The maximum date formatted.
     * @type {Date | null}
     */
    maxDate: Date | null;
    /**
     * Currently focused date in the calendar.
     * @type {Date | null}
     * @default null
     */
    focusDate: Date | null;
    isReadOnly: boolean;
    fullWidth?: boolean;
    isDateDot?: (date: Date) => boolean;
    getDatePrice?: (date: Date | string) => number | undefined;
    /**
     * Fired when the previous month button is clicked.
     * @event
     * @type {void}
     */
    previousMonth: EventEmitter<void>;
    /**
     * Fired when the next month button is clicked.
     * @event
     * @type {void}
     */
    nextMonth: EventEmitter<void>;
    /**
     * Fired when a date is selected.
     * Emits an object with the selected date.
     *
     * @event
     * @type {{ date: string }} Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    dateSelected: EventEmitter<{
        date: string;
    }>;
    /**
     * Fired when a date is hovered.
     * @event
     * @type {{ date: string }}  Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    dateHover: EventEmitter<{
        date: string;
    }>;
    /**
     * Fired when new date is being focused.
     * @event
     * @type {{ date: string }}  Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    focusMoveOut: EventEmitter<{
        date: string;
    }>;
    validateButtons(): void;
    handleFocusDateChanged(): void;
    handleResize(): void;
    componentWillLoad(): void;
    private _checkAndCorrectMonthView;
    private _onPreviousMonth;
    private _onNextMonth;
    private _onDateSelected;
    private _onDateHover;
    private _onFocusMoveOut;
    private get _calendarWrapperClasses();
    private get _containerClasses();
    private get _commonCalendarProps();
    render(): any;
}
