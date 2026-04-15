import { EventEmitter } from '../../../stencil-public-runtime';
import { CalendarMode, CalendarSize } from '../wdpr-calendar.model';
export declare class WdprSwipeCalendar {
    el: HTMLElement;
    selectedDate: Date | null;
    startDate: Date | null;
    endDate: Date | null;
    hoverDate: Date | null;
    mode: CalendarMode;
    enableSixWeeks: boolean;
    format: string;
    displayBorder: boolean;
    maxRangeDate: Date | null;
    minDate: Date | null;
    maxDate: Date | null;
    focusDate: Date | null;
    isReadOnly: boolean;
    displayDate: Date;
    extras: Map<string, HTMLElement>;
    showDisabledSlash: boolean;
    size: CalendarSize;
    isDateBlocked?: (date: Date) => boolean;
    isDateDot?: (date: Date) => boolean;
    getDatePrice?: (date: Date | string) => number | undefined;
    dateSelected: EventEmitter<{
        date: string;
    }>;
    dateHover: EventEmitter<{
        date: string;
    }>;
    focusMoveOut: EventEmitter<{
        date: string;
    }>;
    validateMonths(): void;
    componentDidLoad(): void;
    private _scheduleHorizontalScrollToDisplayMonth;
    /**
     * Smoothly scrolls the horizontal scroller to center the ".display-month-swipe" element, clamping within bounds and no-op if prerequisites are missing.
     */
    private _scrollDisplayMonthHorizontally;
    private _onDateSelected;
    private _onDateHover;
    private _onFocusMoveOut;
    private get _commonCalendarProps();
    private _getNextMonth;
    private _getMonthsToRenderCount;
    get _calendarWrapperClasses(): string;
    render(): any;
}
