import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-BRIGwGQo.js';
import { g as getPreviousMonth, c as getNextMonth, a as isBeforeDay, b as isAfterDay } from './p-Ce-taq9l.js';
import './p-CXZGMLMW.js';
import { i as isMobile } from './p-B3zeU0l2.js';
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

const WdprDoubleCalendar$1 = /*@__PURE__*/ proxyCustomElement(class WdprDoubleCalendar extends H {
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
    _isMobileView = false;
    _isPrevMonthDisabled = false;
    _isNextMonthDisabled = false;
    /**
     * Selected date.
     * Only used when `mode="single"`.
     * @type {Date | null}
     * @default null
     */
    selectedDate = null;
    /**
     * The start date of the selected range.
     * Only used when `mode="range"`.
     *
     * @type {Date | null}
     * @default null
     */
    startDate = null;
    /**
     * The end date of the selected range.
     * Only used when `mode="range"`.
     *
     * @type {Date | null}
     * @default null
     */
    endDate = null;
    /**
     * Currently hovered date in the calendar.
     * @type {Date | null}
     * @default null
     */
    hoverDate = null;
    /**
     * The calendar mode.
     * - `single`: user selects one date
     * - `range`: user selects a start and end date
     *
     * @default "single"
     * @type {"single" | "range"}
     */
    mode = 'single';
    /**
     * Whether to always render six weeks in the calendar view.
     * Useful for keeping calendar height consistent.
     *
     * @default false
     * @type {boolean}
     */
    enableSixWeeks = false;
    /**
     * The date format string (uses date-fns format syntax).
     *
     * @default "MM/dd/yyyy"
     * @example "dd-MM-yyyy"
     * @type {string}
     */
    format = 'MM/dd/yyyy';
    /**
     * The extra info for the date cells
     * @type { Map<string, HTMLElement>}
     */
    extras = new Map();
    /**
     * Flag that shows or hide the calendar borders
     * @default true
     * @type {boolean}
     */
    displayBorder = true;
    /**
     * Optional predicate to indicate a day is blocked (disabled).
     * Provided by the parent calendar.
     */
    isDateBlocked;
    /**
     * Whether this disabled cells should set a slash in the disabled dates or not.
     * @default false
     */
    showDisabledSlash = false;
    /**
     * The calendar size.
     *
     * @default "medium"
     * @type {"small" | "medium"}
     */
    size = 'medium';
    /**
     * The date currently setting as the Maximum end date in Range mode.
     * Internal use only.
     * @type {Date | null}
     */
    maxRangeDate = null;
    /**
     * The date that will be used to display the month in the calendar.
     * Default is the current date.
     * @type {Date}
     */
    displayDate = new Date();
    /**
     * The minimum date formatted.
     * @type {Date | null}
     */
    minDate = null;
    /**
     * The maximum date formatted.
     * @type {Date | null}
     */
    maxDate = null;
    /**
     * Currently focused date in the calendar.
     * @type {Date | null}
     * @default null
     */
    focusDate = null;
    isReadOnly = false;
    fullWidth = false;
    isDateDot;
    getDatePrice;
    /**
     * Fired when the previous month button is clicked.
     * @event
     * @type {void}
     */
    previousMonth;
    /**
     * Fired when the next month button is clicked.
     * @event
     * @type {void}
     */
    nextMonth;
    /**
     * Fired when a date is selected.
     * Emits an object with the selected date.
     *
     * @event
     * @type {{ date: string }} Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    dateSelected;
    /**
     * Fired when a date is hovered.
     * @event
     * @type {{ date: string }}  Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    dateHover;
    /**
     * Fired when new date is being focused.
     * @event
     * @type {{ date: string }}  Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    focusMoveOut;
    validateButtons() {
        const prevMonth = getPreviousMonth(this.displayDate);
        const nextMonth = getNextMonth(this.displayDate);
        const lastDayOfPrevMonth = dateFnsExports.endOfMonth(prevMonth);
        const firstDayOfNextMonth = nextMonth;
        this._isPrevMonthDisabled = this.minDate && isBeforeDay(lastDayOfPrevMonth, this.minDate);
        this._isNextMonthDisabled = this.maxDate && isAfterDay(firstDayOfNextMonth, this.maxDate);
    }
    handleFocusDateChanged() {
        this._checkAndCorrectMonthView();
    }
    handleResize() {
        this._isMobileView = isMobile();
    }
    componentWillLoad() {
        this.validateButtons();
        this.handleResize();
    }
    _checkAndCorrectMonthView() {
        if (!this.focusDate)
            return;
        const firstMonthEnd = dateFnsExports.endOfMonth(this.displayDate);
        const firstMonthStart = dateFnsExports.startOfMonth(this.displayDate);
        const nextMonth = getNextMonth(this.displayDate);
        const secondMonthEnd = dateFnsExports.endOfMonth(nextMonth);
        if (this.focusDate < firstMonthStart) {
            this.previousMonth.emit();
            return;
        }
        if (this.focusDate > secondMonthEnd) {
            this.nextMonth.emit();
            return;
        }
        if (this._isMobileView) {
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
        const nextMonth = getNextMonth(this.displayDate);
        return (h(Host, { key: '224bd745413278d9ce525834dec17e4b22fae10f', class: { 'full-width': this.fullWidth } }, h("section", { key: '13b1fd9df6da3d9c4350c893a661101d7a7e9513', class: this._calendarWrapperClasses, part: "double-calendar" }, h("span", { key: 'c50852bd33ec1eb8887cc9fff28c24e6718da6ba', class: "hidden md:block pt-[165px]" }, h("wdpr-icon-button", { key: '83d9af018fc9c0a5f8d8e1f4bfbb8133fce12b16', variant: "primary", iconName: "previous", onClicked: this._onPreviousMonth, a11yLabel: "Previous Month", disabled: this._isPrevMonthDisabled })), h("div", { key: '8acc8402b31449236812f1c35776ff98ec1ea28d', class: this._containerClasses }, h("wdpr-single-calendar", { key: '0a4ef6fcfe946588d35ece05104335849fe2da9d', ...this._commonCalendarProps, displayDate: this.displayDate, monthHeaderVariant: `${this._isMobileView ? 'with-arrows' : 'default'}`, exportparts: "calendar-surface" }), h("wdpr-single-calendar", { key: 'b85cae9d9262c3023ec31d8d7ead8c92077fa691', class: "hidden md:block", monthHeaderVariant: "default", displayDate: nextMonth, ...this._commonCalendarProps, exportparts: "calendar-surface" })), h("span", { key: '338d900b241a69862eada55742f1486fe3d49646', class: "hidden md:block pt-[165px]" }, h("wdpr-icon-button", { key: '43a30ba45dc1a999c8ad8878953c5dbf51001b09', variant: "primary", iconName: "next", onClicked: this._onNextMonth, a11yLabel: "Next Month", disabled: this._isNextMonthDisabled })))));
    }
    static get watchers() { return {
        "displayDate": ["validateButtons"],
        "minDate": ["validateButtons"],
        "maxDate": ["validateButtons"],
        "focusDate": ["handleFocusDateChanged"],
        "isMobileView": ["handleFocusDateChanged"]
    }; }
    static get style() { return ":host(.full-width) { width: 100%; }"; }
}, [257, "wdpr-double-calendar", {
        "selectedDate": [16, "selected-date"],
        "startDate": [16, "start-date"],
        "endDate": [16, "end-date"],
        "hoverDate": [16, "hover-date"],
        "mode": [1],
        "enableSixWeeks": [4, "enable-six-weeks"],
        "format": [1],
        "extras": [16],
        "displayBorder": [4, "display-border"],
        "isDateBlocked": [16, "is-date-blocked"],
        "showDisabledSlash": [516, "show-disabled-slash"],
        "size": [513],
        "maxRangeDate": [16, "max-range-date"],
        "displayDate": [16, "display-date"],
        "minDate": [16, "min-date"],
        "maxDate": [16, "max-date"],
        "focusDate": [16, "focus-date"],
        "isReadOnly": [4, "is-read-only"],
        "fullWidth": [4, "full-width"],
        "isDateDot": [16, "is-date-dot"],
        "getDatePrice": [16, "get-date-price"],
        "_isMobileView": [32],
        "_isPrevMonthDisabled": [32],
        "_isNextMonthDisabled": [32]
    }, [[9, "resize", "handleResize"]], {
        "displayDate": ["validateButtons"],
        "minDate": ["validateButtons"],
        "maxDate": ["validateButtons"],
        "focusDate": ["handleFocusDateChanged"],
        "isMobileView": ["handleFocusDateChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-double-calendar", "wdpr-calendar-dot", "wdpr-date", "wdpr-divider", "wdpr-icon-button", "wdpr-icon-library", "wdpr-month", "wdpr-month-header", "wdpr-notification-indicator", "wdpr-single-calendar", "wdpr-week-header"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-double-calendar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprDoubleCalendar$1);
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

const WdprDoubleCalendar = WdprDoubleCalendar$1;
const defineCustomElement = defineCustomElement$1;

export { WdprDoubleCalendar, defineCustomElement };
//# sourceMappingURL=wdpr-double-calendar.js.map

//# sourceMappingURL=wdpr-double-calendar.js.map