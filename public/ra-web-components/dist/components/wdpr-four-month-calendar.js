import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-BRIGwGQo.js';
import { g as getPreviousMonth, a as isBeforeDay, b as isAfterDay, c as getNextMonth } from './p-Ce-taq9l.js';
import { i as isMobile, a as isTablet, b as isDesktop } from './p-B3zeU0l2.js';
import './p-CXZGMLMW.js';
import { d as defineCustomElement$b } from './p-CXLG1rnK.js';
import { d as defineCustomElement$a } from './p-M40dCVzS.js';
import { d as defineCustomElement$9 } from './p-QL-JXwKm.js';
import { d as defineCustomElement$8 } from './p-CqBIcCq6.js';
import { d as defineCustomElement$7 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$6 } from './p-BkjG7axz.js';
import { d as defineCustomElement$5 } from './p-Dv0bMjGg.js';
import { d as defineCustomElement$4 } from './p-BOubPl_u.js';
import { d as defineCustomElement$3 } from './p-BSUElj5O.js';
import { d as defineCustomElement$2 } from './p-C4WlHpas.js';
import { d as dateFnsExports } from './p-iWCgRMLC.js';
import { b as bundleCjsExports } from './p-CF3xLdU_.js';

const WdprFourMonthCalendar$1 = /*@__PURE__*/ proxyCustomElement(class WdprFourMonthCalendar extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.previousMonth = createEvent(this, "previousMonth", 7);
        this.nextMonth = createEvent(this, "nextMonth", 7);
        this.dateSelected = createEvent(this, "dateSelected", 7);
        this.dateHover = createEvent(this, "dateHover", 7);
        this.focusMoveOut = createEvent(this, "focusMoveOut", 7);
    }
    get el() { return this; }
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
        const prevMonth = getPreviousMonth(this.displayDate);
        const lastDayOfPrevMonth = dateFnsExports.endOfMonth(prevMonth);
        this._isPrevMonthDisabled = !!(this.minDate && isBeforeDay(lastDayOfPrevMonth, this.minDate));
        // Next is disabled if shifting forward would make the *new* last visible month start after maxDate.
        const monthAfterLastVisible = this._getMonthWithOffset(this.displayDate, this._visibleMonths);
        this._isNextMonthDisabled = !!(this.maxDate && isAfterDay(monthAfterLastVisible, this.maxDate));
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
        const start = dateFnsExports.startOfMonth(min);
        const end = dateFnsExports.startOfMonth(max);
        const diff = this._monthKey(end) - this._monthKey(start) + 1;
        return Math.max(1, diff);
    }
    // Returns the first day of the month that is `offset` months from `baseMonth` (positive moves forward, negative moves backward)
    _getMonthWithOffset(baseMonth, offset) {
        let month = dateFnsExports.startOfMonth(baseMonth);
        const isMovingForward = offset > 0;
        const isMovingBackward = offset < 0;
        const monthsToMove = Math.abs(offset);
        if (isMovingForward) {
            for (let step = 0; step < monthsToMove; step++) {
                month = getNextMonth(month);
            }
        }
        if (isMovingBackward) {
            for (let step = 0; step < monthsToMove; step++) {
                month = getPreviousMonth(month);
            }
        }
        return month;
    }
    _computeResponsiveVisibleMonths() {
        if (isMobile())
            return 1;
        if (isTablet())
            return 2;
        if (isDesktop())
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
        this._isMobileView = isMobile();
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
        const firstMonthStart = dateFnsExports.startOfMonth(this.displayDate);
        const lastMonthStart = this._getMonthWithOffset(this.displayDate, Math.max(0, this._visibleMonths - 1));
        const lastMonthEnd = dateFnsExports.endOfMonth(lastMonthStart);
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
            const firstMonthEnd = dateFnsExports.endOfMonth(this.displayDate);
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
        let current = dateFnsExports.startOfMonth(this.displayDate);
        for (let i = 0; i < this._visibleMonths; i++) {
            months.push(current);
            current = getNextMonth(current);
        }
        return months;
    }
    get _calendarWrapperClasses() {
        const margin = this.size === 'xsmall' ? 'gap-300' : 'gap-400';
        return bundleCjsExports.twMerge('md:flex', margin);
    }
    get _containerClasses() {
        const width = this.fullWidth ? 'w-full' : '';
        return bundleCjsExports.twMerge('flex gap-200 items-start', width);
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
        return (h(Host, { key: 'ca25a2f65cff7762fc368e1b03466b7f4d2448af', class: { 'full-width': this.fullWidth } }, h("section", { key: '8fccec5dfe327c1fce8c791c3a1f5c50d611b624', class: this._calendarWrapperClasses, part: "four-month-calendar" }, h("span", { key: '30f4eb395979f3c001981a6f973e8e2ad269bedd', class: "hidden md:block pt-[165px]" }, h("wdpr-icon-button", { key: 'c2a8c179be41b64c1d5ba86fefb63e70863b8df3', variant: "primary", iconName: "previous", onClicked: this._onPreviousMonth, a11yLabel: "Previous Month", disabled: this._isPrevMonthDisabled })), h("div", { key: '2ca53a994be7961d26ed865363ac4d55a58e32e0', class: this._containerClasses }, monthsToRender.map((monthDate, index) => (h("wdpr-single-calendar", { ...this._commonCalendarProps, displayDate: monthDate, class: index > 0 ? 'hidden md:block' : undefined, monthHeaderVariant: index === 0 && this._isMobileView ? 'with-arrows' : 'default', exportparts: "calendar-surface" })))), h("span", { key: '9d11978a7635561ce4541ed1bc0716562fed0bf3', class: "hidden md:block pt-[165px]" }, h("wdpr-icon-button", { key: 'f0d3f6b245da6c5df27a1c5419db5b73bd9c5510', variant: "primary", iconName: "next", onClicked: this._onNextMonth, a11yLabel: "Next Month", disabled: this._isNextMonthDisabled })))));
    }
    static get watchers() { return {
        "displayDate": ["validateButtons"],
        "minDate": ["validateButtons"],
        "maxDate": ["validateButtons"],
        "focusDate": ["handleFocusDateChanged"]
    }; }
    static get style() { return ":host(.full-width) { width: 100%; }"; }
}, [257, "wdpr-four-month-calendar", {
        "displayDate": [16, "display-date"],
        "minDate": [16, "min-date"],
        "maxDate": [16, "max-date"],
        "selectedDate": [16, "selected-date"],
        "startDate": [16, "start-date"],
        "endDate": [16, "end-date"],
        "maxRangeDate": [16, "max-range-date"],
        "mode": [1],
        "enableSixWeeks": [4, "enable-six-weeks"],
        "format": [1],
        "hoverDate": [16, "hover-date"],
        "focusDate": [16, "focus-date"],
        "displayBorder": [4, "display-border"],
        "isReadOnly": [4, "is-read-only"],
        "fullWidth": [4, "full-width"],
        "showDisabledSlash": [516, "show-disabled-slash"],
        "size": [513],
        "extras": [16],
        "isDateBlocked": [16, "is-date-blocked"],
        "isDateDot": [16, "is-date-dot"],
        "getDatePrice": [16, "get-date-price"],
        "_visibleMonths": [32],
        "_isMobileView": [32],
        "_isPrevMonthDisabled": [32],
        "_isNextMonthDisabled": [32]
    }, [[9, "resize", "handleResize"]], {
        "displayDate": ["validateButtons"],
        "minDate": ["validateButtons"],
        "maxDate": ["validateButtons"],
        "focusDate": ["handleFocusDateChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-four-month-calendar", "wdpr-calendar-dot", "wdpr-date", "wdpr-divider", "wdpr-icon-button", "wdpr-icon-library", "wdpr-month", "wdpr-month-header", "wdpr-notification-indicator", "wdpr-single-calendar", "wdpr-week-header"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-four-month-calendar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprFourMonthCalendar$1);
            }
            break;
        case "wdpr-calendar-dot":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "wdpr-date":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "wdpr-divider":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "wdpr-icon-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "wdpr-month":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "wdpr-month-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-single-calendar":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-week-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprFourMonthCalendar = WdprFourMonthCalendar$1;
const defineCustomElement = defineCustomElement$1;

export { WdprFourMonthCalendar, defineCustomElement };
//# sourceMappingURL=wdpr-four-month-calendar.js.map

//# sourceMappingURL=wdpr-four-month-calendar.js.map