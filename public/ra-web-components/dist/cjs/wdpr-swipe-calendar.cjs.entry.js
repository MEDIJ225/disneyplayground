'use strict';

var index = require('./index-4gPM_TYz.js');
var index$1 = require('./index-oP7sywWN.js');
require('./utils-CARbI7sq.js');
var bundleCjs = require('./bundle-cjs-Cajw0YnV.js');

const WdprSwipeCalendar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.dateSelected = index.createEvent(this, "dateSelected", 7);
        this.dateHover = index.createEvent(this, "dateHover", 7);
        this.focusMoveOut = index.createEvent(this, "focusMoveOut", 7);
    }
    get el() { return index.getElement(this); }
    selectedDate = null;
    startDate = null;
    endDate = null;
    hoverDate = null;
    mode = 'single';
    enableSixWeeks = false;
    format = 'MM/dd/yyyy';
    displayBorder = true;
    maxRangeDate = null;
    minDate = null;
    maxDate = null;
    focusDate = null;
    isReadOnly = false;
    displayDate = new Date();
    extras = new Map();
    showDisabledSlash = false;
    size = 'medium';
    isDateBlocked;
    isDateDot;
    getDatePrice;
    dateSelected;
    dateHover;
    focusMoveOut;
    validateMonths() {
        this._getMonthsToRenderCount();
        this._scheduleHorizontalScrollToDisplayMonth();
    }
    componentDidLoad() {
        this._scheduleHorizontalScrollToDisplayMonth();
    }
    _scheduleHorizontalScrollToDisplayMonth() {
        requestAnimationFrame(() => this._scrollDisplayMonthHorizontally());
    }
    /**
     * Smoothly scrolls the horizontal scroller to center the ".display-month-swipe" element, clamping within bounds and no-op if prerequisites are missing.
     */
    _scrollDisplayMonthHorizontally() {
        const root = this.el?.shadowRoot || this.el;
        const target = root?.querySelector('.display-month-swipe');
        if (!target)
            return;
        const scrollbarEl = root?.querySelector('wdpr-scrollbar');
        const scroller = scrollbarEl?.shadowRoot?.querySelector('.scroll-content');
        if (!scroller)
            return;
        const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
        if (maxScrollLeft <= 0)
            return;
        const scrollerRect = scroller.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const deltaToTargetLeft = targetRect.left - scrollerRect.left;
        const deltaToCenter = deltaToTargetLeft + (targetRect.width / 2 - scrollerRect.width / 2);
        const nextScrollLeft = Math.max(0, Math.min(scroller.scrollLeft + deltaToCenter, maxScrollLeft));
        scroller.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
    }
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
            isReadOnly: this.isReadOnly,
            onDateSelected: this._onDateSelected,
            onDateHover: this._onDateHover,
            onFocusMoveOut: this._onFocusMoveOut,
            isDateBlocked: this.isDateBlocked,
            isDateDot: this.isDateDot,
            getDatePrice: this.getDatePrice,
        };
    }
    _getNextMonth(date, increase) {
        // Normalize to the first day of the month to avoid overflow issues
        const baseYear = date.getFullYear();
        const baseMonth = date.getMonth();
        const totalMonths = baseYear * 12 + baseMonth + increase;
        const newYear = Math.floor(totalMonths / 12);
        const newMonth = totalMonths % 12;
        return new Date(newYear, newMonth, 1);
    }
    _getMonthsToRenderCount() {
        const { minDate, maxDate } = this;
        if (!minDate || !maxDate)
            return 1;
        const startTime = minDate.getTime();
        const endTime = maxDate.getTime();
        if (isNaN(startTime) || isNaN(endTime))
            return 1;
        const startTotalMonths = minDate.getFullYear() * 12 + minDate.getMonth();
        const endTotalMonths = maxDate.getFullYear() * 12 + maxDate.getMonth();
        const diff = endTotalMonths - startTotalMonths;
        return diff >= 0 ? diff + 1 : 1;
    }
    get _calendarWrapperClasses() {
        const margin = this.size === 'xsmall' ? 'gap-100' : 'gap-200';
        return bundleCjs.bundleCjsExports.twMerge('flex flex-nowrap items-start pb-200', margin);
    }
    render() {
        const months = this._getMonthsToRenderCount();
        const baseDate = index$1.dateFnsExports.startOfMonth(this.minDate ?? this.displayDate);
        // Determine which month should scroll in view based on displayDate
        const displayMonthStart = index$1.dateFnsExports.startOfMonth(this.displayDate);
        let displayOffset = displayMonthStart.getFullYear() * 12 + displayMonthStart.getMonth() - (baseDate.getFullYear() * 12 + baseDate.getMonth());
        if (displayOffset < 0)
            displayOffset = 0;
        if (displayOffset >= months)
            displayOffset = months - 1;
        return (index.h("wdpr-scrollbar", { key: '60bee43ee68b4735ead2d8f5aa41f0b7738d38b0', orientation: "horizontal", class: "w-full" }, index.h("section", { key: 'b4e349f6c82ce134b18ad2e68781a42f5ecb2943', class: this._calendarWrapperClasses, part: "swipe-calendar" }, Array(months)
            .fill(null)
            .map((_, offset) => {
            const currentMonth = this._getNextMonth(baseDate, offset);
            return (index.h("wdpr-single-calendar", { key: offset, ...this._commonCalendarProps, displayDate: currentMonth, monthHeaderVariant: "default", exportparts: "calendar-surface", class: `${offset === displayOffset ? 'display-month-swipe' : ''} w-inherit flex-shrink-0` }));
        }))));
    }
    static get watchers() { return {
        "displayDate": ["validateMonths"],
        "minDate": ["validateMonths"],
        "maxDate": ["validateMonths"]
    }; }
};
WdprSwipeCalendar.style = ":host { width: 100%; }";

exports.wdpr_swipe_calendar = WdprSwipeCalendar;
//# sourceMappingURL=wdpr-swipe-calendar.entry.cjs.js.map

//# sourceMappingURL=wdpr-swipe-calendar.cjs.entry.js.map