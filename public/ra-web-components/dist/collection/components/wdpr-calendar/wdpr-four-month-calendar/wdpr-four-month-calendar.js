import { h, Host } from "@stencil/core";
import { startOfMonth, endOfMonth, getNextMonth, getPreviousMonth, isAfterDay, isBeforeDay } from "../../../utils/date.utils";
import { isDesktop, isMobile, isTablet } from "../../../utils/breakpoint.utils";
import { twMerge } from "../../../utils/utils";
export class WdprFourMonthCalendar {
    el;
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
        const lastDayOfPrevMonth = endOfMonth(prevMonth);
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
        const start = startOfMonth(min);
        const end = startOfMonth(max);
        const diff = this._monthKey(end) - this._monthKey(start) + 1;
        return Math.max(1, diff);
    }
    // Returns the first day of the month that is `offset` months from `baseMonth` (positive moves forward, negative moves backward)
    _getMonthWithOffset(baseMonth, offset) {
        let month = startOfMonth(baseMonth);
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
        const firstMonthStart = startOfMonth(this.displayDate);
        const lastMonthStart = this._getMonthWithOffset(this.displayDate, Math.max(0, this._visibleMonths - 1));
        const lastMonthEnd = endOfMonth(lastMonthStart);
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
            const firstMonthEnd = endOfMonth(this.displayDate);
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
        let current = startOfMonth(this.displayDate);
        for (let i = 0; i < this._visibleMonths; i++) {
            months.push(current);
            current = getNextMonth(current);
        }
        return months;
    }
    get _calendarWrapperClasses() {
        const margin = this.size === 'xsmall' ? 'gap-300' : 'gap-400';
        return twMerge('md:flex', margin);
    }
    get _containerClasses() {
        const width = this.fullWidth ? 'w-full' : '';
        return twMerge('flex gap-200 items-start', width);
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
    static get is() { return "wdpr-four-month-calendar"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host(.full-width) { width: 100%; }"; }
    static get properties() {
        return {
            "displayDate": {
                "type": "unknown",
                "attribute": "display-date",
                "mutable": false,
                "complexType": {
                    "original": "Date",
                    "resolved": "Date",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "defaultValue": "new Date()"
            },
            "minDate": {
                "type": "unknown",
                "attribute": "min-date",
                "mutable": false,
                "complexType": {
                    "original": "Date | null",
                    "resolved": "Date",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "defaultValue": "null"
            },
            "maxDate": {
                "type": "unknown",
                "attribute": "max-date",
                "mutable": false,
                "complexType": {
                    "original": "Date | null",
                    "resolved": "Date",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "defaultValue": "null"
            },
            "selectedDate": {
                "type": "unknown",
                "attribute": "selected-date",
                "mutable": false,
                "complexType": {
                    "original": "Date | null",
                    "resolved": "Date",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "defaultValue": "null"
            },
            "startDate": {
                "type": "unknown",
                "attribute": "start-date",
                "mutable": false,
                "complexType": {
                    "original": "Date | null",
                    "resolved": "Date",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "defaultValue": "null"
            },
            "endDate": {
                "type": "unknown",
                "attribute": "end-date",
                "mutable": false,
                "complexType": {
                    "original": "Date | null",
                    "resolved": "Date",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "defaultValue": "null"
            },
            "maxRangeDate": {
                "type": "unknown",
                "attribute": "max-range-date",
                "mutable": false,
                "complexType": {
                    "original": "Date | null",
                    "resolved": "Date",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "defaultValue": "null"
            },
            "mode": {
                "type": "string",
                "attribute": "mode",
                "mutable": false,
                "complexType": {
                    "original": "CalendarMode",
                    "resolved": "\"range\" | \"single\"",
                    "references": {
                        "CalendarMode": {
                            "location": "import",
                            "path": "../wdpr-calendar.model",
                            "id": "src/components/wdpr-calendar/wdpr-calendar.model.ts::CalendarMode"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'single'"
            },
            "enableSixWeeks": {
                "type": "boolean",
                "attribute": "enable-six-weeks",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "format": {
                "type": "string",
                "attribute": "format",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'MM/dd/yyyy'"
            },
            "hoverDate": {
                "type": "unknown",
                "attribute": "hover-date",
                "mutable": false,
                "complexType": {
                    "original": "Date | null",
                    "resolved": "Date",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "defaultValue": "null"
            },
            "focusDate": {
                "type": "unknown",
                "attribute": "focus-date",
                "mutable": false,
                "complexType": {
                    "original": "Date | null",
                    "resolved": "Date",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "defaultValue": "null"
            },
            "displayBorder": {
                "type": "boolean",
                "attribute": "display-border",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "isReadOnly": {
                "type": "boolean",
                "attribute": "is-read-only",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "fullWidth": {
                "type": "boolean",
                "attribute": "full-width",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "showDisabledSlash": {
                "type": "boolean",
                "attribute": "show-disabled-slash",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "CalendarSize",
                    "resolved": "\"medium\" | \"small\" | \"xsmall\"",
                    "references": {
                        "CalendarSize": {
                            "location": "import",
                            "path": "../wdpr-calendar.model",
                            "id": "src/components/wdpr-calendar/wdpr-calendar.model.ts::CalendarSize"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'medium'"
            },
            "extras": {
                "type": "unknown",
                "attribute": "extras",
                "mutable": false,
                "complexType": {
                    "original": "Map<string, HTMLElement>",
                    "resolved": "Map<string, HTMLElement>",
                    "references": {
                        "Map": {
                            "location": "global",
                            "id": "global::Map"
                        },
                        "HTMLElement": {
                            "location": "global",
                            "id": "global::HTMLElement"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "defaultValue": "new Map()"
            },
            "isDateBlocked": {
                "type": "unknown",
                "attribute": "is-date-blocked",
                "mutable": false,
                "complexType": {
                    "original": "(date: Date) => boolean",
                    "resolved": "(date: Date) => boolean",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "isDateDot": {
                "type": "unknown",
                "attribute": "is-date-dot",
                "mutable": false,
                "complexType": {
                    "original": "(date: Date) => boolean",
                    "resolved": "(date: Date) => boolean",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "getDatePrice": {
                "type": "unknown",
                "attribute": "get-date-price",
                "mutable": false,
                "complexType": {
                    "original": "(date: Date | string) => number | undefined",
                    "resolved": "(date: string | Date) => number",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            }
        };
    }
    static get states() {
        return {
            "_visibleMonths": {},
            "_isMobileView": {},
            "_isPrevMonthDisabled": {},
            "_isNextMonthDisabled": {}
        };
    }
    static get events() {
        return [{
                "method": "previousMonth",
                "name": "previousMonth",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "nextMonth",
                "name": "nextMonth",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "dateSelected",
                "name": "dateSelected",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ date: string }",
                    "resolved": "{ date: string; }",
                    "references": {}
                }
            }, {
                "method": "dateHover",
                "name": "dateHover",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ date: string }",
                    "resolved": "{ date: string; }",
                    "references": {}
                }
            }, {
                "method": "focusMoveOut",
                "name": "focusMoveOut",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ date: string }",
                    "resolved": "{ date: string; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "displayDate",
                "methodName": "validateButtons"
            }, {
                "propName": "minDate",
                "methodName": "validateButtons"
            }, {
                "propName": "maxDate",
                "methodName": "validateButtons"
            }, {
                "propName": "focusDate",
                "methodName": "handleFocusDateChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "resize",
                "method": "handleResize",
                "target": "window",
                "capture": false,
                "passive": true
            }];
    }
}
//# sourceMappingURL=wdpr-four-month-calendar.js.map
