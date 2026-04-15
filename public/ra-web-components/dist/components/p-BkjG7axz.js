import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { a as isBeforeDay, b as isAfterDay, f as formatDateToString } from './p-Ce-taq9l.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { d as defineCustomElement$3 } from './p-CXLG1rnK.js';
import { d as defineCustomElement$2 } from './p-M40dCVzS.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';
import { d as dateFnsExports } from './p-iWCgRMLC.js';

const WdprMonth = /*@__PURE__*/ proxyCustomElement(class WdprMonth extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.dateSelected = createEvent(this, "dateSelected", 7);
        this.dateHover = createEvent(this, "dateHover", 7);
        this.focusMoveOut = createEvent(this, "focusMoveOut", 7);
    }
    get el() { return this; }
    /**
     * @internal
     * Array of cell data used to render the calendar days.
     * Computed from displayDate, startDate, endDate, hoverDate, selectedDate.
     */
    _cellDates = [];
    /**
     * The date that will be used to display the month in the calendar.
     * Default is the current date.
     * @type {Date}
     */
    displayDate = new Date();
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
     * @type {Date | null} ISO date string
     * @default null
     */
    startDate = null;
    /**
     * The end date of the selected range.
     * Only used when `mode="range"`.
     *
     * @type {Date | null} ISO date string
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
     * The calendar Max range in days
     *
     * @default 0
     * @type {Number}
     */
    maxRange = 0;
    /**
     * The date currently setting as the Maximum end date in Range mode.
     * Internal use only.
     * @type {Date | null}
     */
    maxRangeDate = null;
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
    extras;
    /**
     * Whether this disabled cells should set a slash in the disabled dates or not.
     * @default false
     */
    showDisabledSlash = false;
    isReadOnly = false;
    fullWidth = false;
    isDateBlocked;
    isDateDot;
    getDatePrice;
    /**
     * Currently focused date in the calendar.
     * @type {Date | null}
     * @default null
     */
    focusDate = null;
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
    handleDateChange() {
        this._cellDates = this._getCellDates();
    }
    /**
     * Recompute when the blocked predicate changes.
     */
    handleBlockedPredicateChange() {
        this._cellDates = this._getCellDates();
    }
    handleFocusDateChange() {
        requestAnimationFrame(() => {
            this._focusCellDate();
        });
    }
    componentWillLoad() {
        this._cellDates = this._getCellDates();
    }
    _getCellDates() {
        const year = this.displayDate.getFullYear();
        const month = this.displayDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const adjustedStartDay = firstDay.getDay();
        const cellDates = Array(adjustedStartDay).fill(null);
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(year, month, i);
            const isBlocked = this.isDateBlocked ? this.isDateBlocked(currentDate) : false;
            const isDot = this.isDateDot ? this.isDateDot(currentDate) : false;
            const price = this.getDatePrice ? this.getDatePrice(currentDate) : undefined;
            if (this.mode === 'single') {
                cellDates.push({
                    date: currentDate,
                    selected: dateFnsExports.isSameDay(currentDate, this.selectedDate),
                    isStartDate: false,
                    isEndDate: false,
                    inRange: false,
                    disabled: isBeforeDay(currentDate, this.minDate) || isAfterDay(currentDate, this.maxDate) || isBlocked,
                    showDot: isDot,
                    price: price,
                });
            }
            if (this.mode === 'range') {
                let isInRange = false;
                let isEndDate = false;
                const isDisabled = isBeforeDay(currentDate, this.minDate) || isAfterDay(currentDate, this.maxDate) || isAfterDay(currentDate, this.maxRangeDate) || isBlocked;
                if (this.startDate && this.endDate) {
                    isInRange = isAfterDay(currentDate, this.startDate) && isBeforeDay(currentDate, this.endDate);
                    isEndDate = dateFnsExports.isSameDay(currentDate, this.endDate);
                }
                if (this.startDate && !this.endDate && this.hoverDate) {
                    const min = isAfterDay(this.hoverDate, this.startDate) ? this.startDate : this.hoverDate;
                    const max = isBeforeDay(this.hoverDate, this.startDate) ? this.startDate : this.hoverDate;
                    isInRange = (isAfterDay(currentDate, min) || dateFnsExports.isSameDay(currentDate, min)) && (isBeforeDay(currentDate, max) || dateFnsExports.isSameDay(currentDate, min));
                    isEndDate = dateFnsExports.isSameDay(currentDate, this.hoverDate);
                }
                cellDates.push({
                    date: currentDate,
                    selected: false,
                    isStartDate: dateFnsExports.isSameDay(currentDate, this.startDate),
                    isEndDate: isDisabled ? false : isEndDate,
                    inRange: isDisabled ? false : isInRange,
                    disabled: isDisabled,
                    showDot: isDot,
                    price: price,
                });
            }
        }
        if (this.enableSixWeeks) {
            const totalCells = cellDates.length;
            const extraDays = 42 - totalCells;
            for (let i = 1; i <= extraDays; i++) {
                const nextDate = new Date(year, month + 1, i);
                cellDates.push({
                    date: nextDate,
                    selected: false,
                    isStartDate: false,
                    isEndDate: false,
                    inRange: false,
                    disabled: true,
                    showDot: false,
                    price: undefined,
                    isOutsideMonth: true,
                });
            }
        }
        return cellDates;
    }
    _onDateSelected = (event) => {
        event.stopPropagation();
        this.dateSelected.emit(event.detail);
    };
    _onDateHover = (event) => {
        event.stopPropagation();
        this.dateHover.emit(event.detail);
    };
    _handleKeyDown = (ev) => {
        if (!this._cellDates.length || !this.focusDate)
            return;
        let newFocusDate = null;
        switch (ev.key) {
            case KEYBOARD_KEYS.ARROW_RIGHT:
                newFocusDate = dateFnsExports.addDays(this.focusDate, 1);
                break;
            case KEYBOARD_KEYS.ARROW_LEFT:
                newFocusDate = dateFnsExports.subDays(this.focusDate, 1);
                break;
            case KEYBOARD_KEYS.ARROW_DOWN:
                newFocusDate = dateFnsExports.addWeeks(this.focusDate, 1);
                break;
            case KEYBOARD_KEYS.ARROW_UP:
                newFocusDate = dateFnsExports.subWeeks(this.focusDate, 1);
                break;
            default:
                return;
        }
        ev.preventDefault();
        if ((this.minDate && isBeforeDay(newFocusDate, this.minDate)) || (this.maxDate && isAfterDay(newFocusDate, this.maxDate))) {
            return;
        }
        this.focusMoveOut.emit({ date: formatDateToString(newFocusDate, this.format) });
    };
    _focusCellDate() {
        if (!this.focusDate)
            return;
        const index = this._cellDates.findIndex(cell => cell && dateFnsExports.isSameDay(cell.date, this.focusDate));
        if (index === -1)
            return;
        const dayEls = this.el.shadowRoot?.querySelectorAll('wdpr-date');
        if (!dayEls?.length)
            return;
        const target = dayEls[index];
        const gridCell = target.shadowRoot?.querySelector('[role="gridcell"]');
        gridCell?.focus();
    }
    _isFocusableCell(cellData) {
        const blocked = this.isDateBlocked ? this.isDateBlocked(cellData.date) : false;
        return !!this.focusDate && dateFnsExports.isSameDay(cellData.date, this.focusDate) && !(isBeforeDay(cellData.date, this.minDate) || isAfterDay(cellData.date, this.maxDate) || blocked);
    }
    _getWeeks(cellDates) {
        const weeks = [];
        for (let i = 0; i < cellDates.length; i += 7) {
            weeks.push(cellDates.slice(i, i + 7));
        }
        return weeks;
    }
    render() {
        const weeks = this._getWeeks(this._cellDates);
        return (h("div", { key: '2de51aeecb234fc14473a6ef9851db6332b091b6', part: "month", onKeyDown: this._handleKeyDown }, weeks.map((week, weekIdx) => (h("div", { part: `month-row-${weekIdx}`, class: "flex flex-wrap", role: "row", key: weekIdx }, week.map((cellData, dayIdx) => (h("div", { class: "w-1/7" }, h("wdpr-date", { cellData: cellData, onDateSelected: this._onDateSelected, onDateHover: this._onDateHover, isFocusable: cellData && this._isFocusableCell(cellData), format: this.format, key: dayIdx, extras: this.extras, showDisabledSlash: this.showDisabledSlash, fullWidth: this.fullWidth, isReadOnly: this.isReadOnly })))))))));
    }
    static get watchers() { return {
        "displayDate": ["handleDateChange"],
        "startDate": ["handleDateChange"],
        "endDate": ["handleDateChange"],
        "hoverDate": ["handleDateChange"],
        "selectedDate": ["handleDateChange"],
        "maxRangeDate": ["handleDateChange"],
        "minDate": ["handleDateChange"],
        "maxDate": ["handleDateChange"],
        "isDateBlocked": ["handleBlockedPredicateChange"],
        "focusDate": ["handleFocusDateChange"]
    }; }
}, [257, "wdpr-month", {
        "displayDate": [16, "display-date"],
        "selectedDate": [16, "selected-date"],
        "startDate": [16, "start-date"],
        "endDate": [16, "end-date"],
        "hoverDate": [16, "hover-date"],
        "minDate": [16, "min-date"],
        "maxDate": [16, "max-date"],
        "maxRange": [2, "max-range"],
        "maxRangeDate": [16, "max-range-date"],
        "mode": [1],
        "enableSixWeeks": [4, "enable-six-weeks"],
        "format": [1],
        "extras": [16],
        "showDisabledSlash": [516, "show-disabled-slash"],
        "isReadOnly": [4, "is-read-only"],
        "fullWidth": [4, "full-width"],
        "isDateBlocked": [16, "is-date-blocked"],
        "isDateDot": [16, "is-date-dot"],
        "getDatePrice": [16, "get-date-price"],
        "focusDate": [16, "focus-date"],
        "_cellDates": [32]
    }, undefined, {
        "displayDate": ["handleDateChange"],
        "startDate": ["handleDateChange"],
        "endDate": ["handleDateChange"],
        "hoverDate": ["handleDateChange"],
        "selectedDate": ["handleDateChange"],
        "maxRangeDate": ["handleDateChange"],
        "minDate": ["handleDateChange"],
        "maxDate": ["handleDateChange"],
        "isDateBlocked": ["handleBlockedPredicateChange"],
        "focusDate": ["handleFocusDateChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-month", "wdpr-calendar-dot", "wdpr-date", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-month":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprMonth);
            }
            break;
        case "wdpr-calendar-dot":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-date":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprMonth as W, defineCustomElement as d };
//# sourceMappingURL=p-BkjG7axz.js.map

//# sourceMappingURL=p-BkjG7axz.js.map