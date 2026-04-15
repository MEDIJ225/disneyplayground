'use strict';

var index = require('./index-4gPM_TYz.js');
var date_utils = require('./date.utils-Dyxx4VAx.js');
var breakpoint_utils = require('./breakpoint.utils-Clgj_h19.js');
require('./utils-CARbI7sq.js');
var index$1 = require('./index-oP7sywWN.js');
var bundleCjs = require('./bundle-cjs-Cajw0YnV.js');

const WdprFourMonthCalendar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.previousMonth = index.createEvent(this, "previousMonth", 7);
        this.nextMonth = index.createEvent(this, "nextMonth", 7);
        this.dateSelected = index.createEvent(this, "dateSelected", 7);
        this.dateHover = index.createEvent(this, "dateHover", 7);
        this.focusMoveOut = index.createEvent(this, "focusMoveOut", 7);
    }
    get el() { return index.getElement(this); }
    _visibleMonths = 2;
    _isMobileView = false;
    _isPrevMonthDisabled = false;
    _isNextMonthDisabled = false;
    displayDate = new Date();
    minDate = null;
    maxDate = null;
    selectedDate = null;
    startDate = null;
    endDate = null;
    maxRangeDate = null;
    mode = 'single';
    enableSixWeeks = false;
    format = 'MM/dd/yyyy';
    hoverDate = null;
    focusDate = null;
    displayBorder = true;
    isReadOnly = false;
    fullWidth = false;
    showDisabledSlash = false;
    size = 'medium';
    extras = new Map();
    isDateBlocked;
    isDateDot;
    getDatePrice;
    previousMonth;
    nextMonth;
    dateSelected;
    dateHover;
    focusMoveOut;
    validateButtons() {
        // Previous is disabled if the entire previous month ends before minDate.
        const prevMonth = date_utils.getPreviousMonth(this.displayDate);
        const lastDayOfPrevMonth = index$1.dateFnsExports.endOfMonth(prevMonth);
        this._isPrevMonthDisabled = !!(this.minDate && date_utils.isBeforeDay(lastDayOfPrevMonth, this.minDate));
        // Next is disabled if shifting forward would make the *new* last visible month start after maxDate.
        const monthAfterLastVisible = this._getMonthWithOffset(this.displayDate, this._visibleMonths);
        this._isNextMonthDisabled = !!(this.maxDate && date_utils.isAfterDay(monthAfterLastVisible, this.maxDate));
    }
    handleFocusDateChanged() {
        this._checkAndCorrectMonthView();
    }
    handleResize() {
        this._recalculateLayout();
    }
    componentWillLoad() {
        this._recalculateLayout();
    }
    // Computes a unique, monotonically increasing numeric key for the month, useful for month comparisons
    _monthKey(date) {
        return date.getFullYear() * 12 + date.getMonth();
    }
    _monthsBetweenInclusive(min, max) {
        const start = index$1.dateFnsExports.startOfMonth(min);
        const end = index$1.dateFnsExports.startOfMonth(max);
        const diff = this._monthKey(end) - this._monthKey(start) + 1;
        return Math.max(1, diff);
    }
    // Returns the first day of the month that is `offset` months from `baseMonth` (positive moves forward, negative moves backward)
    _getMonthWithOffset(baseMonth, offset) {
        let month = index$1.dateFnsExports.startOfMonth(baseMonth);
        const isMovingForward = offset > 0;
        const isMovingBackward = offset < 0;
        const monthsToMove = Math.abs(offset);
        if (isMovingForward) {
            for (let step = 0; step < monthsToMove; step++) {
                month = date_utils.getNextMonth(month);
            }
        }
        if (isMovingBackward) {
            for (let step = 0; step < monthsToMove; step++) {
                month = date_utils.getPreviousMonth(month);
            }
        }
        return month;
    }
    _computeResponsiveVisibleMonths() {
        if (breakpoint_utils.isMobile())
            return 1;
        if (breakpoint_utils.isTablet())
            return 2;
        if (breakpoint_utils.isDesktop())
            return 3;
        return 4;
    }
    _computeVisibleMonths() {
        const responsive = this._computeResponsiveVisibleMonths();
        let rangeCap = 4;
        if (this.minDate && this.maxDate) {
            rangeCap = Math.min(4, this._monthsBetweenInclusive(this.minDate, this.maxDate));
        }
        return Math.max(1, Math.min(4, responsive, rangeCap));
    }
    _recalculateLayout() {
        this._isMobileView = breakpoint_utils.isMobile();
        const nextVisibleMonths = this._computeVisibleMonths();
        const changed = nextVisibleMonths !== this._visibleMonths;
        this._visibleMonths = nextVisibleMonths;
        // Ensure nav states reflect the new visible window size
        this.validateButtons();
        // If the visible window changed, re-check focus/month correction
        if (changed) {
            this._checkAndCorrectMonthView();
        }
    }
    /**
     * Ensures the current month view stays aligned with {@link focusDate} by emitting {@link previousMonth} or {@link nextMonth}
     * when the focused date falls outside the visible month range (including single-month/mobile behavior). */
    _checkAndCorrectMonthView() {
        if (!this.focusDate)
            return;
        const firstMonthStart = index$1.dateFnsExports.startOfMonth(this.displayDate);
        const lastMonthStart = this._getMonthWithOffset(this.displayDate, Math.max(0, this._visibleMonths - 1));
        const lastMonthEnd = index$1.dateFnsExports.endOfMonth(lastMonthStart);
        if (this.focusDate < firstMonthStart) {
            this.previousMonth.emit();
            return;
        }
        if (this.focusDate > lastMonthEnd) {
            this.nextMonth.emit();
            return;
        }
        // Mobile view only shows 1 month, if focus moves into next month
        if (this._visibleMonths === 1) {
            const firstMonthEnd = index$1.dateFnsExports.endOfMonth(this.displayDate);
            if (this.focusDate > firstMonthEnd) {
                this.nextMonth.emit();
            }
        }
    }
    _onPreviousMonth = () => {
        this.previousMonth.emit();
    };
    _onNextMonth = () => {
        this.nextMonth.emit();
    };
    _onDateSelected = (event) => {
        event.stopPropagation();
        this.dateSelected.emit(event.detail);
    };
    _onDateHover = (event) => {
        event.stopPropagation();
        this.dateHover.emit(event.detail);
    };
    _onFocusMoveOut = (event) => {
        event.stopPropagation();
        this.focusMoveOut.emit(event.detail);
    };
    _getMonthsToRender() {
        const months = [];
        let current = index$1.dateFnsExports.startOfMonth(this.displayDate);
        for (let i = 0; i < this._visibleMonths; i++) {
            months.push(current);
            current = date_utils.getNextMonth(current);
        }
        return months;
    }
    get _calendarWrapperClasses() {
        const margin = this.size === 'xsmall' ? 'gap-300' : 'gap-400';
        return bundleCjs.bundleCjsExports.twMerge('md:flex', margin);
    }
    get _containerClasses() {
        const width = this.fullWidth ? 'w-full' : '';
        return bundleCjs.bundleCjsExports.twMerge('flex gap-200 items-start', width);
    }
    get _commonCalendarProps() {
        return {
            mode: this.mode,
            enableSixWeeks: this.enableSixWeeks,
            startDate: this.startDate,
            endDate: this.endDate,
            hoverDate: this.hoverDate,
            focusDate: this.focusDate,
            selectedDate: this.selectedDate,
            format: this.format,
            minDate: this.minDate,
            maxDate: this.maxDate,
            extras: this.extras,
            displayBorder: this.displayBorder,
            maxRangeDate: this.maxRangeDate,
            showDisabledSlash: this.showDisabledSlash,
            size: this.size,
            fullWidth: this.fullWidth,
            isReadOnly: this.isReadOnly,
            onDateSelected: this._onDateSelected,
            onDateHover: this._onDateHover,
            onFocusMoveOut: this._onFocusMoveOut,
            isDateBlocked: this.isDateBlocked,
            isDateDot: this.isDateDot,
            getDatePrice: this.getDatePrice,
        };
    }
    render() {
        const monthsToRender = this._getMonthsToRender();
        return (index.h(index.Host, { key: 'ca25a2f65cff7762fc368e1b03466b7f4d2448af', class: { 'full-width': this.fullWidth } }, index.h("section", { key: '8fccec5dfe327c1fce8c791c3a1f5c50d611b624', class: this._calendarWrapperClasses, part: "four-month-calendar" }, index.h("span", { key: '30f4eb395979f3c001981a6f973e8e2ad269bedd', class: "hidden md:block pt-[165px]" }, index.h("wdpr-icon-button", { key: 'c2a8c179be41b64c1d5ba86fefb63e70863b8df3', variant: "primary", iconName: "previous", onClicked: this._onPreviousMonth, a11yLabel: "Previous Month", disabled: this._isPrevMonthDisabled })), index.h("div", { key: '2ca53a994be7961d26ed865363ac4d55a58e32e0', class: this._containerClasses }, monthsToRender.map((monthDate, index$1) => (index.h("wdpr-single-calendar", { ...this._commonCalendarProps, displayDate: monthDate, class: index$1 > 0 ? 'hidden md:block' : undefined, monthHeaderVariant: index$1 === 0 && this._isMobileView ? 'with-arrows' : 'default', exportparts: "calendar-surface" })))), index.h("span", { key: '9d11978a7635561ce4541ed1bc0716562fed0bf3', class: "hidden md:block pt-[165px]" }, index.h("wdpr-icon-button", { key: 'f0d3f6b245da6c5df27a1c5419db5b73bd9c5510', variant: "primary", iconName: "next", onClicked: this._onNextMonth, a11yLabel: "Next Month", disabled: this._isNextMonthDisabled })))));
    }
    static get watchers() { return {
        "displayDate": ["validateButtons"],
        "minDate": ["validateButtons"],
        "maxDate": ["validateButtons"],
        "focusDate": ["handleFocusDateChanged"]
    }; }
};
WdprFourMonthCalendar.style = ":host(.full-width) { width: 100%; }";

exports.wdpr_four_month_calendar = WdprFourMonthCalendar;
//# sourceMappingURL=wdpr-four-month-calendar.entry.cjs.js.map

//# sourceMappingURL=wdpr-four-month-calendar.cjs.entry.js.map