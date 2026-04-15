import { EventEmitter } from '../../../stencil-public-runtime';
import { MonthHeaderVariant } from '../wdpr-month-header/wdpr-month-header';
import { CalendarMode, CalendarSize } from '../wdpr-calendar.model';
export declare class WdprSingleCalendar {
    /**
     * Reference to host element.
     * @type {HTMLWdprSingleCalendarElement}
     */
    el: HTMLWdprSingleCalendarElement;
    /**
     * The variant of the month header.
     * - `default`: shows navigation and title
     * - `minimal`: reduced styling
     *
     * @default "default"
     * @type {"default" | "with-arrows"}
     */
    monthHeaderVariant: MonthHeaderVariant;
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
     * Currently focused date in the calendar.
     * @type {Date | null}
     * @default null
     */
    focusDate: Date | null;
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
    isReadOnly: boolean;
    fullWidth?: boolean;
    isDateBlocked?: (date: Date) => boolean;
    isDateDot?: (date: Date) => boolean;
    getDatePrice?: (date: Date | string) => number | undefined;
    /**
     * Whether this disabled cells should set a slash in the disabled dates or not.
     * @default false
     */
    showDisabledSlash: boolean;
    /**
     * The calendar size.
     *
     * @default "medium"
     * @type { "xsmall" | "small" | "medium"}
     */
    size: CalendarSize;
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
     * Fired when a date is selected (in single mode).
     * Emits an object with the selected date.
     *
     * @event
     * @type {{ date: string }} Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    dateSelected: EventEmitter<{
        date: string;
    }>;
    /**
     * On date hover event.
     * @event
     * @type {{ date: string }}  Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    dateHover: EventEmitter<{
        date: string;
    }>;
    /**
     * On focus of date moves out event.
     * @event
     * @type {{ date: string }}  Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    focusMoveOut: EventEmitter<{
        date: string;
    }>;
    private _onPreviousMonth;
    private _onNextMonth;
    private _onFocusMoveOut;
    private _onDateSelected;
    private _onDateHover;
    private get _wrapperClasses();
    private get _containerClasses();
    render(): any;
}
