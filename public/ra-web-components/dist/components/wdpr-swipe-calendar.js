import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { d as dateFnsExports } from './p-iWCgRMLC.js';
import './p-CXZGMLMW.js';
import { d as defineCustomElement$c } from './p-CXLG1rnK.js';
import { d as defineCustomElement$b } from './p-M40dCVzS.js';
import { d as defineCustomElement$a } from './p-QL-JXwKm.js';
import { d as defineCustomElement$9 } from './p-CqBIcCq6.js';
import { d as defineCustomElement$8 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$7 } from './p-BkjG7axz.js';
import { d as defineCustomElement$6 } from './p-Dv0bMjGg.js';
import { d as defineCustomElement$5 } from './p-BOubPl_u.js';
import { d as defineCustomElement$4 } from './p-gk-6CO08.js';
import { d as defineCustomElement$3 } from './p-BSUElj5O.js';
import { d as defineCustomElement$2 } from './p-C4WlHpas.js';
import { b as bundleCjsExports } from './p-CF3xLdU_.js';

const WdprSwipeCalendar$1 = /*@__PURE__*/ proxyCustomElement(class WdprSwipeCalendar extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.dateSelected = createEvent(this, "dateSelected", 7);
        this.dateHover = createEvent(this, "dateHover", 7);
        this.focusMoveOut = createEvent(this, "focusMoveOut", 7);
    }
    get el() { return this; }
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
        return bundleCjsExports.twMerge('flex flex-nowrap items-start pb-200', margin);
    }
    render() {
        const months = this._getMonthsToRenderCount();
        const baseDate = dateFnsExports.startOfMonth(this.minDate ?? this.displayDate);
        // Determine which month should scroll in view based on displayDate
        const displayMonthStart = dateFnsExports.startOfMonth(this.displayDate);
        let displayOffset = displayMonthStart.getFullYear() * 12 + displayMonthStart.getMonth() - (baseDate.getFullYear() * 12 + baseDate.getMonth());
        if (displayOffset < 0)
            displayOffset = 0;
        if (displayOffset >= months)
            displayOffset = months - 1;
        return (h("wdpr-scrollbar", { key: '60bee43ee68b4735ead2d8f5aa41f0b7738d38b0', orientation: "horizontal", class: "w-full" }, h("section", { key: 'b4e349f6c82ce134b18ad2e68781a42f5ecb2943', class: this._calendarWrapperClasses, part: "swipe-calendar" }, Array(months)
            .fill(null)
            .map((_, offset) => {
            const currentMonth = this._getNextMonth(baseDate, offset);
            return (h("wdpr-single-calendar", { key: offset, ...this._commonCalendarProps, displayDate: currentMonth, monthHeaderVariant: "default", exportparts: "calendar-surface", class: `${offset === displayOffset ? 'display-month-swipe' : ''} w-inherit flex-shrink-0` }));
        }))));
    }
    static get watchers() { return {
        "displayDate": ["validateMonths"],
        "minDate": ["validateMonths"],
        "maxDate": ["validateMonths"]
    }; }
    static get style() { return ":host { width: 100%; }"; }
}, [257, "wdpr-swipe-calendar", {
        "selectedDate": [16, "selected-date"],
        "startDate": [16, "start-date"],
        "endDate": [16, "end-date"],
        "hoverDate": [16, "hover-date"],
        "mode": [1],
        "enableSixWeeks": [4, "enable-six-weeks"],
        "format": [1],
        "displayBorder": [4, "display-border"],
        "maxRangeDate": [16, "max-range-date"],
        "minDate": [16, "min-date"],
        "maxDate": [16, "max-date"],
        "focusDate": [16, "focus-date"],
        "isReadOnly": [4, "is-read-only"],
        "displayDate": [16, "display-date"],
        "extras": [16],
        "showDisabledSlash": [516, "show-disabled-slash"],
        "size": [513],
        "isDateBlocked": [16, "is-date-blocked"],
        "isDateDot": [16, "is-date-dot"],
        "getDatePrice": [16, "get-date-price"]
    }, undefined, {
        "displayDate": ["validateMonths"],
        "minDate": ["validateMonths"],
        "maxDate": ["validateMonths"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-swipe-calendar", "wdpr-calendar-dot", "wdpr-date", "wdpr-divider", "wdpr-icon-button", "wdpr-icon-library", "wdpr-month", "wdpr-month-header", "wdpr-notification-indicator", "wdpr-scrollbar", "wdpr-single-calendar", "wdpr-week-header"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-swipe-calendar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprSwipeCalendar$1);
            }
            break;
        case "wdpr-calendar-dot":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "wdpr-date":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "wdpr-divider":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "wdpr-icon-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "wdpr-month":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "wdpr-month-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-scrollbar":
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

const WdprSwipeCalendar = WdprSwipeCalendar$1;
const defineCustomElement = defineCustomElement$1;

export { WdprSwipeCalendar, defineCustomElement };
//# sourceMappingURL=wdpr-swipe-calendar.js.map

//# sourceMappingURL=wdpr-swipe-calendar.js.map