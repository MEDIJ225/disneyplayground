import { EventEmitter } from '../../../stencil-public-runtime';
import { CalendarMode, CalendarSize } from '../wdpr-calendar.model';
export declare class WdprFourMonthCalendar {
    el: HTMLElement;
    private _visibleMonths;
    private _isMobileView;
    private _isPrevMonthDisabled;
    private _isNextMonthDisabled;
    displayDate: Date;
    minDate: Date | null;
    maxDate: Date | null;
    selectedDate: Date | null;
    startDate: Date | null;
    endDate: Date | null;
    maxRangeDate: Date | null;
    mode: CalendarMode;
    enableSixWeeks: boolean;
    format: string;
    hoverDate: Date | null;
    focusDate: Date | null;
    displayBorder: boolean;
    isReadOnly: boolean;
    fullWidth?: boolean;
    showDisabledSlash: boolean;
    size: CalendarSize;
    extras: Map<string, HTMLElement>;
    isDateBlocked?: (date: Date) => boolean;
    isDateDot?: (date: Date) => boolean;
    getDatePrice?: (date: Date | string) => number | undefined;
    previousMonth: EventEmitter<void>;
    nextMonth: EventEmitter<void>;
    dateSelected: EventEmitter<{
        date: string;
    }>;
    dateHover: EventEmitter<{
        date: string;
    }>;
    focusMoveOut: EventEmitter<{
        date: string;
    }>;
    validateButtons(): void;
    handleFocusDateChanged(): void;
    handleResize(): void;
    componentWillLoad(): void;
    private _monthKey;
    private _monthsBetweenInclusive;
    private _getMonthWithOffset;
    private _computeResponsiveVisibleMonths;
    private _computeVisibleMonths;
    private _recalculateLayout;
    /**
     * Ensures the current month view stays aligned with {@link focusDate} by emitting {@link previousMonth} or {@link nextMonth}
     * when the focused date falls outside the visible month range (including single-month/mobile behavior). */
    private _checkAndCorrectMonthView;
    private _onPreviousMonth;
    private _onNextMonth;
    private _onDateSelected;
    private _onDateHover;
    private _onFocusMoveOut;
    private _getMonthsToRender;
    private get _calendarWrapperClasses();
    private get _containerClasses();
    private get _commonCalendarProps();
    render(): any;
}
