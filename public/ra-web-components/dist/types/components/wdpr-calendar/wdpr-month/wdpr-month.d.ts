import { EventEmitter } from '../../../stencil-public-runtime';
import { CalendarMode } from '../wdpr-calendar.model';
export declare class WdprMonth {
    /**
     * Reference to host element.
     * @type {HTMLWdprMonthElement}
     */
    el: HTMLWdprMonthElement;
    /**
     * @internal
     * Array of cell data used to render the calendar days.
     * Computed from displayDate, startDate, endDate, hoverDate, selectedDate.
     */
    private _cellDates;
    /**
     * The date that will be used to display the month in the calendar.
     * Default is the current date.
     * @type {Date}
     */
    displayDate: Date;
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
     * @type {Date | null} ISO date string
     * @default null
     */
    startDate: Date | null;
    /**
     * The end date of the selected range.
     * Only used when `mode="range"`.
     *
     * @type {Date | null} ISO date string
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
     * The calendar Max range in days
     *
     * @default 0
     * @type {Number}
     */
    maxRange: number;
    /**
     * The date currently setting as the Maximum end date in Range mode.
     * Internal use only.
     * @type {Date | null}
     */
    maxRangeDate: Date | null;
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
     * Whether this disabled cells should set a slash in the disabled dates or not.
     * @default false
     */
    showDisabledSlash: boolean;
    isReadOnly: boolean;
    fullWidth?: boolean;
    isDateBlocked?: (date: Date) => boolean;
    isDateDot?: (date: Date) => boolean;
    getDatePrice?: (date: Date | string) => number | undefined;
    /**
     * Currently focused date in the calendar.
     * @type {Date | null}
     * @default null
     */
    focusDate: Date | null;
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
    handleDateChange(): void;
    /**
     * Recompute when the blocked predicate changes.
     */
    handleBlockedPredicateChange(): void;
    handleFocusDateChange(): void;
    componentWillLoad(): void;
    private _getCellDates;
    private _onDateSelected;
    private _onDateHover;
    private _handleKeyDown;
    private _focusCellDate;
    private _isFocusableCell;
    private _getWeeks;
    render(): any;
}
