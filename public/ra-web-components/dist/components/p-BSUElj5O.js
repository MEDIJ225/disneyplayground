import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$9 } from './p-CXLG1rnK.js';
import { d as defineCustomElement$8 } from './p-M40dCVzS.js';
import { d as defineCustomElement$7 } from './p-QL-JXwKm.js';
import { d as defineCustomElement$6 } from './p-CqBIcCq6.js';
import { d as defineCustomElement$5 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$4 } from './p-BkjG7axz.js';
import { d as defineCustomElement$3 } from './p-Dv0bMjGg.js';
import { d as defineCustomElement$2 } from './p-BOubPl_u.js';
import { d as defineCustomElement$1 } from './p-C4WlHpas.js';

const WdprSingleCalendar = /*@__PURE__*/ proxyCustomElement(class WdprSingleCalendar extends H {
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
    /**
     * The variant of the month header.
     * - `default`: shows navigation and title
     * - `minimal`: reduced styling
     *
     * @default "default"
     * @type {"default" | "with-arrows"}
     */
    monthHeaderVariant = 'default';
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
     * Currently focused date in the calendar.
     * @type {Date | null}
     * @default null
     */
    focusDate = null;
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
    isReadOnly = false;
    fullWidth = false;
    isDateBlocked;
    isDateDot;
    getDatePrice;
    /**
     * Whether this disabled cells should set a slash in the disabled dates or not.
     * @default false
     */
    showDisabledSlash = false;
    /**
     * The calendar size.
     *
     * @default "medium"
     * @type { "xsmall" | "small" | "medium"}
     */
    size = 'medium';
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
     * Fired when a date is selected (in single mode).
     * Emits an object with the selected date.
     *
     * @event
     * @type {{ date: string }} Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    dateSelected;
    /**
     * On date hover event.
     * @event
     * @type {{ date: string }}  Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    dateHover;
    /**
     * On focus of date moves out event.
     * @event
     * @type {{ date: string }}  Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    focusMoveOut;
    _onPreviousMonth = (event) => {
        event.stopPropagation();
        this.previousMonth.emit();
    };
    _onNextMonth = (event) => {
        event.stopPropagation();
        this.nextMonth.emit();
    };
    _onFocusMoveOut = (event) => {
        event.stopPropagation();
        this.focusMoveOut.emit(event.detail);
    };
    _onDateSelected = (event) => {
        event.stopPropagation();
        this.dateSelected.emit(event.detail);
    };
    _onDateHover = (event) => {
        event.stopPropagation();
        this.dateHover.emit(event.detail);
    };
    get _wrapperClasses() {
        const widthClass = this.fullWidth ? 'w-full' : wrapperSizeClasses[this.size];
        return customTwMerge(wrapperBaseClasses, widthClass);
    }
    get _containerClasses() {
        return customTwMerge(containerBaseClasses, this.displayBorder ? containerBorderClasses : null);
    }
    render() {
        return (h(Host, { key: '2c39bf06e22bf01f77999a95a8e71f52eea79f50', class: { 'full-width': this.fullWidth } }, h("div", { key: 'd8fda6c0a19d646f338f31675052a7be50f44c16', part: "calendar", class: this._wrapperClasses }, h("wdpr-month-header", { key: '2e2582a4006dd4517286bd9e23f3ba3f50688ce0', id: "month-title", displayDate: this.displayDate, variant: this.monthHeaderVariant, minDate: this.minDate, maxDate: this.maxDate, onNextMonth: this._onNextMonth, onPreviousMonth: this._onPreviousMonth }), h("div", { key: '90c802cab46a75693103538244f2911356409974', part: "calendar-surface", class: this._containerClasses, role: "grid", "aria-rowcount": this.enableSixWeeks ? '7' : '6', "aria-colcount": "7", "aria-label": `${this.displayDate.toLocaleString('default', { month: 'long' })} ${this.displayDate.getFullYear()}` }, h("wdpr-week-header", { key: '4ee16426460025c870af0b762ebb3cea281a6676', fullWidth: this.fullWidth }), h("div", { key: '437b646e71b824f2cbfef90dcd0cbff0656960bd', role: "row", "aria-hidden": "true" }, h("wdpr-divider", { key: 'aadf12736dbfa181d1f19110353359d2653036bd' })), h("wdpr-month", { key: 'e96f5ec445077eacbf58723f5ce386a53f1e6691', mode: this.mode, enableSixWeeks: this.enableSixWeeks, startDate: this.startDate, endDate: this.endDate, hoverDate: this.hoverDate, focusDate: this.focusDate, selectedDate: this.selectedDate, displayDate: this.displayDate, format: this.format, minDate: this.minDate, maxDate: this.maxDate, extras: this.extras, showDisabledSlash: this.showDisabledSlash, maxRangeDate: this.maxRangeDate, fullWidth: this.fullWidth, isReadOnly: this.isReadOnly, isDateBlocked: this.isDateBlocked, isDateDot: this.isDateDot, getDatePrice: this.getDatePrice, onFocusMoveOut: this._onFocusMoveOut, onDateSelected: this._onDateSelected, onDateHover: this._onDateHover })))));
    }
    static get style() { return ":host(.full-width) { width: 100%; }"; }
}, [257, "wdpr-single-calendar", {
        "monthHeaderVariant": [1, "month-header-variant"],
        "mode": [1],
        "maxRange": [2, "max-range"],
        "maxRangeDate": [16, "max-range-date"],
        "displayDate": [16, "display-date"],
        "selectedDate": [16, "selected-date"],
        "startDate": [16, "start-date"],
        "endDate": [16, "end-date"],
        "hoverDate": [16, "hover-date"],
        "focusDate": [16, "focus-date"],
        "minDate": [16, "min-date"],
        "maxDate": [16, "max-date"],
        "enableSixWeeks": [4, "enable-six-weeks"],
        "format": [1],
        "extras": [16],
        "displayBorder": [4, "display-border"],
        "isReadOnly": [4, "is-read-only"],
        "fullWidth": [4, "full-width"],
        "isDateBlocked": [16, "is-date-blocked"],
        "isDateDot": [16, "is-date-dot"],
        "getDatePrice": [16, "get-date-price"],
        "showDisabledSlash": [516, "show-disabled-slash"],
        "size": [513]
    }]);
const wrapperBaseClasses = 'flex flex-col gap-100';
const wrapperSizeClasses = {
    xsmall: 'w-[272px]',
    small: 'w-[288px]',
    medium: 'w-[288px] md:w-[324px]',
};
const containerBaseClasses = 'flex flex-col gap-100 rounded-150 px-150 pt-150 pb-200 bg-surface-default';
const containerBorderClasses = 'border-solid border-012 border-stroke-neutral-medium';
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-single-calendar", "wdpr-calendar-dot", "wdpr-date", "wdpr-divider", "wdpr-icon-button", "wdpr-icon-library", "wdpr-month", "wdpr-month-header", "wdpr-notification-indicator", "wdpr-week-header"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-single-calendar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprSingleCalendar);
            }
            break;
        case "wdpr-calendar-dot":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "wdpr-date":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "wdpr-divider":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "wdpr-icon-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-month":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-month-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "wdpr-week-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprSingleCalendar as W, defineCustomElement as d };
//# sourceMappingURL=p-BSUElj5O.js.map

//# sourceMappingURL=p-BSUElj5O.js.map