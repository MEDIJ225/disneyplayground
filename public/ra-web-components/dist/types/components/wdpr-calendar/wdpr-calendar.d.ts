import { EventEmitter } from '../../stencil-public-runtime';
import { CalendarMode, CalendarSize, CalendarVariant } from './wdpr-calendar.model';
export declare class WdprCalendar {
    /**
     * Reference to host element.
     * @type {HTMLWdprCalendarElement}
     */
    el: HTMLWdprCalendarElement;
    private _internals;
    private _defaultValue?;
    private _defaultStart?;
    private _defaultEnd?;
    constructor();
    /**
     * The date that will be used to display the month in the calendar.
     * Default is the current date.
     * @type {Date}
     */
    _displayDate: Date;
    /**
     * @internal
     * The date currently hovered in the calendar.
     * Internal use only.
     * @type {Date | null}
     */
    private _hoverDate;
    /**
     * @internal
     * Currently focused date.
     * @type {Date | null}
     */
    private _focusDate;
    /**
     * @internal
     * The startDate formatted from start prop.
     * @type {Date | null}
     */
    private _startDate;
    /**
     * @internal
     * The endDate formatted from end prop.
     * @type {Date | null}
     */
    private _endDate;
    /**
     * @internal
     * Selected date parsed from the `value` prop (single mode).
     * @type {Date | null}
     */
    private _selectedDate;
    /**
     * @internal
     * The endDate formatted from end prop.
     * @type {Date | null}
     */
    private _minDate;
    /**
     * @internal
     * Selected date parsed from the `value` prop (single mode).
     * @type {Date | null}
     */
    private _maxDate;
    /**
     * The date currently setting as the Maximum end.
     * Internal use only.
     * @type {Date | null}
     */
    _maxRangeDate: Date | null;
    /**
     * @internal
     * The extra info for the date cells
     * @type {Map<string, HTMLElement>}
     */
    private _extras;
    /**
     * @internal
     * A normalized set of blocked day timestamps (midnight) for O(1) lookup.
     */
    private _blockedDatesSet;
    /**
     * Internal set of dot dates for quick lookup.
     */
    private _dotDatesSet;
    /**
     * Internal map of day timestamp to price value for quick lookup.
     */
    private _priceDatesMap;
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
     * The calendar mode.
     * - `single`: user selects one date
     * - `range`: user selects a start and end date
     *
     * @default "single"
     * @type {"single" | "range"}
     */
    mode: CalendarMode;
    /**
     * Name used when participating in form submissions.
     */
    name?: string;
    /**
     * Whether to always render six weeks in the calendar view.
     * Useful for keeping calendar height consistent.
     *
     * @default false
     * @type {boolean}
     */
    enableSixWeeks: boolean;
    /**
     * The value date in string format.
     * - Used only when `mode="single"`.
     * - Must match the format specified in the `format` prop.
     *
     * @example "06/19/2025"
     *
     * @type {string}
     */
    value?: string;
    /**
     * Start date for range selection.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/10/2025"
     * @type {string}
     */
    start?: string;
    /**
     * End date for range selection.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/20/2025"
     * @type {string}
     */
    end?: string;
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
     * The date format string (uses date-fns format syntax).
     *
     * @default "MM/dd/yyyy"
     * @example "dd-MM-yyyy"
     * @type {string}
     */
    format: string;
    /**
     * The calendar max range in days. Number 0 does not block anything
     * @default 0
     * @type {number}
     */
    maxRange: number;
    /**
     * In `range` mode, indicates which endpoint the user intends to edit when the calendar opens.
     * - `'start'` (default): clicking a date while both endpoints are set starts a new range from that date.
     * - `'end'`: clicking a date while both endpoints are set updates only the end date, preserving the existing start.
     * @default "start"
     * @type {"start" | "end"}
     */
    rangeActiveField: 'start' | 'end';
    /**
     * Flag that shows or hide the calendar borders
     * @default true
     * @type {boolean}
     */
    displayBorder: boolean | string;
    /**
     * Array of dates to block from selection.
     * Must follow the same `format` as the calendar.
     * @example ["06/12/2025", "06/15/2025"]
     * @type {string[]}
     */
    blockedDates?: string[];
    /**
     * Whether this disabled cells should set a slash in the disabled dates or not.
     * @default false
     */
    showDisabledSlash: boolean;
    size: CalendarSize;
    /**
     * Array of dates to show indicator dots on.
     * Must follow the same `format` as the calendar.
     * @example ["06/12/2025", "06/15/2025"]
     * @type {string[]}
     */
    indicatorDotDates?: string[];
    /**
     * Array of dates to show prices on.
     * Must follow the same `format` as the calendar.
     * @example [{day: "06/12/2025", price: 100}, {day: "06/15/2025", price: 150}]
     * @type {{day: string, price: number}[]}
     */
    priceDates?: {
        day: string;
        price: number;
    }[];
    isReadOnly: boolean;
    /**
     * Whether the calendar should take the full width of its container.
     * @default false
     * @type {boolean}
     */
    fullWidth?: boolean;
    /**
     * On date selected event. Sent when calendar mode is 'single'.
     * @event
     * @type {string} ISO date string (e.g. "2025-06-19")
     */
    dateSelected: EventEmitter<string>;
    /**
     * On range selected dates event. Sent when calendar mode is 'range'.
     * @event
     * @type {{ startDate?: string; endDate?: string, hasBlockedDates: boolean }}
     * Object containing the start and end dates as ISO strings.
     */
    rangeDatesSelected: EventEmitter<{
        startDate?: string;
        endDate?: string;
        hasBlockedDates: boolean;
        rangeDetails: {
            date: string;
            isBlocked: boolean;
        }[];
    }>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleMinAndMaxValueChange(): void;
    handleStartChange(newValue: string): void;
    handleEndChange(newValue: string): void;
    handleValueChange(newValue: string): void;
    handleModeChange(): void;
    handleNameChange(): void;
    /**
     * Recompute blocked dates when list changes.
     */
    handleBlockedDatesChange(newValue?: string[]): void;
    _handleIndicatorDotDatesChange(newValue?: string[]): void;
    _handlePriceDatesChange(newValue?: {
        day: string;
        price: number;
    }[]): void;
    /**
     * Recompute blocked/dot/price dates when format changes.
     */
    handleFormatChange(): void;
    setFocusDate(newDate: Date): Promise<void>;
    setExtras(extras: Map<string, HTMLElement>): Promise<void>;
    /**
     * Checks if any blocked date is inside the currently selected range.
     * Returns true if at least one blocked date is within [startDate, endDate].
     */
    hasBlockedDatesInRange(): Promise<boolean>;
    /**
     * Returns detailed info for each date in the currently selected range.
     * Output: [{ date: "MM/dd/yyyy", isBlocked: boolean }, ...]
     */
    getRangeSelectionDetails(): Promise<{
        date: string;
        isBlocked: boolean;
    }[]>;
    componentWillLoad(): void;
    private _getBlockedDatesInRange;
    private _processDate;
    private _parseDateSet;
    private _parseBlockedDates;
    private _parseDotDates;
    private _parsePriceDates;
    private _isDateInSet;
    private _isDateBlocked;
    private _isDateDot;
    private _isDateDisabled;
    private _hasDisabledDateBetween;
    private _getLastSelectableDateBefore;
    private _getDatePrice;
    private _goNextMonth;
    private _goPreviousMonth;
    private _handleDateSelected;
    private _handleDateHover;
    private _handleFocusMoveOut;
    private _setInitialFocus;
    private _setDisplayDate;
    private _setMinAndMaxDates;
    private _clampDateToRange;
    private _resetFocusDateToMonth;
    /**
     * Calculates and enforces the maximum selectable end date in range mode.
     *
     * When a start date is selected and `maxRange` is defined, this sets `maxRangeDate`
     * as the last valid date in the allowed range.
     */
    private _setMaxRangeDate;
    private _getDateExtras;
    private _handleFormReset;
    private _syncFormValue;
    private get _commonCalendarProps();
    private get calendarLegendLabelClasses();
    render(): any;
}
