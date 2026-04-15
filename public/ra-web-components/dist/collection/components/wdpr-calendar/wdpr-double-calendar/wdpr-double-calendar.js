import { h, Host } from "@stencil/core";
import { startOfMonth, endOfMonth, getNextMonth, getPreviousMonth, isAfterDay, isBeforeDay } from "../../../utils/date.utils";
import { twMerge } from "../../../utils/utils";
import { isMobile } from "../../../utils/breakpoint.utils";
export class WdprDoubleCalendar {
    el;
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
        const lastDayOfPrevMonth = endOfMonth(prevMonth);
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
        const firstMonthEnd = endOfMonth(this.displayDate);
        const firstMonthStart = startOfMonth(this.displayDate);
        const nextMonth = getNextMonth(this.displayDate);
        const secondMonthEnd = endOfMonth(nextMonth);
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
        const nextMonth = getNextMonth(this.displayDate);
        return (h(Host, { key: '224bd745413278d9ce525834dec17e4b22fae10f', class: { 'full-width': this.fullWidth } }, h("section", { key: '13b1fd9df6da3d9c4350c893a661101d7a7e9513', class: this._calendarWrapperClasses, part: "double-calendar" }, h("span", { key: 'c50852bd33ec1eb8887cc9fff28c24e6718da6ba', class: "hidden md:block pt-[165px]" }, h("wdpr-icon-button", { key: '83d9af018fc9c0a5f8d8e1f4bfbb8133fce12b16', variant: "primary", iconName: "previous", onClicked: this._onPreviousMonth, a11yLabel: "Previous Month", disabled: this._isPrevMonthDisabled })), h("div", { key: '8acc8402b31449236812f1c35776ff98ec1ea28d', class: this._containerClasses }, h("wdpr-single-calendar", { key: '0a4ef6fcfe946588d35ece05104335849fe2da9d', ...this._commonCalendarProps, displayDate: this.displayDate, monthHeaderVariant: `${this._isMobileView ? 'with-arrows' : 'default'}`, exportparts: "calendar-surface" }), h("wdpr-single-calendar", { key: 'b85cae9d9262c3023ec31d8d7ead8c92077fa691', class: "hidden md:block", monthHeaderVariant: "default", displayDate: nextMonth, ...this._commonCalendarProps, exportparts: "calendar-surface" })), h("span", { key: '338d900b241a69862eada55742f1486fe3d49646', class: "hidden md:block pt-[165px]" }, h("wdpr-icon-button", { key: '43a30ba45dc1a999c8ad8878953c5dbf51001b09', variant: "primary", iconName: "next", onClicked: this._onNextMonth, a11yLabel: "Next Month", disabled: this._isNextMonthDisabled })))));
    }
    static get is() { return "wdpr-double-calendar"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host(.full-width) { width: 100%; }"; }
    static get properties() {
        return {
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
                    "tags": [{
                            "name": "type",
                            "text": "{Date | null}"
                        }, {
                            "name": "default",
                            "text": "null"
                        }],
                    "text": "Selected date.\nOnly used when `mode=\"single\"`."
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
                    "tags": [{
                            "name": "type",
                            "text": "{Date | null}"
                        }, {
                            "name": "default",
                            "text": "null"
                        }],
                    "text": "The start date of the selected range.\nOnly used when `mode=\"range\"`."
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
                    "tags": [{
                            "name": "type",
                            "text": "{Date | null}"
                        }, {
                            "name": "default",
                            "text": "null"
                        }],
                    "text": "The end date of the selected range.\nOnly used when `mode=\"range\"`."
                },
                "getter": false,
                "setter": false,
                "defaultValue": "null"
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
                    "tags": [{
                            "name": "type",
                            "text": "{Date | null}"
                        }, {
                            "name": "default",
                            "text": "null"
                        }],
                    "text": "Currently hovered date in the calendar."
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
                    "tags": [{
                            "name": "default",
                            "text": "\"single\""
                        }, {
                            "name": "type",
                            "text": "{\"single\" | \"range\"}"
                        }],
                    "text": "The calendar mode.\n- `single`: user selects one date\n- `range`: user selects a start and end date"
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
                    "tags": [{
                            "name": "default",
                            "text": "false"
                        }, {
                            "name": "type",
                            "text": "{boolean}"
                        }],
                    "text": "Whether to always render six weeks in the calendar view.\nUseful for keeping calendar height consistent."
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
                    "tags": [{
                            "name": "default",
                            "text": "\"MM/dd/yyyy\""
                        }, {
                            "name": "example",
                            "text": "\"dd-MM-yyyy\""
                        }, {
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The date format string (uses date-fns format syntax)."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'MM/dd/yyyy'"
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
                    "tags": [{
                            "name": "type",
                            "text": "{ Map<string, HTMLElement>}"
                        }],
                    "text": "The extra info for the date cells"
                },
                "getter": false,
                "setter": false,
                "defaultValue": "new Map()"
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
                    "tags": [{
                            "name": "default",
                            "text": "true"
                        }, {
                            "name": "type",
                            "text": "{boolean}"
                        }],
                    "text": "Flag that shows or hide the calendar borders"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
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
                    "text": "Optional predicate to indicate a day is blocked (disabled).\nProvided by the parent calendar."
                },
                "getter": false,
                "setter": false
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
                    "tags": [{
                            "name": "default",
                            "text": "false"
                        }],
                    "text": "Whether this disabled cells should set a slash in the disabled dates or not."
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
                    "tags": [{
                            "name": "default",
                            "text": "\"medium\""
                        }, {
                            "name": "type",
                            "text": "{\"small\" | \"medium\"}"
                        }],
                    "text": "The calendar size."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'medium'"
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
                    "tags": [{
                            "name": "type",
                            "text": "{Date | null}"
                        }],
                    "text": "The date currently setting as the Maximum end date in Range mode.\nInternal use only."
                },
                "getter": false,
                "setter": false,
                "defaultValue": "null"
            },
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
                    "tags": [{
                            "name": "type",
                            "text": "{Date}"
                        }],
                    "text": "The date that will be used to display the month in the calendar.\nDefault is the current date."
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
                    "tags": [{
                            "name": "type",
                            "text": "{Date | null}"
                        }],
                    "text": "The minimum date formatted."
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
                    "tags": [{
                            "name": "type",
                            "text": "{Date | null}"
                        }],
                    "text": "The maximum date formatted."
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
                    "tags": [{
                            "name": "type",
                            "text": "{Date | null}"
                        }, {
                            "name": "default",
                            "text": "null"
                        }],
                    "text": "Currently focused date in the calendar."
                },
                "getter": false,
                "setter": false,
                "defaultValue": "null"
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
                    "tags": [{
                            "name": "event",
                            "text": undefined
                        }, {
                            "name": "type",
                            "text": "{void}"
                        }],
                    "text": "Fired when the previous month button is clicked."
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
                    "tags": [{
                            "name": "event",
                            "text": undefined
                        }, {
                            "name": "type",
                            "text": "{void}"
                        }],
                    "text": "Fired when the next month button is clicked."
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
                    "tags": [{
                            "name": "event",
                            "text": undefined
                        }, {
                            "name": "type",
                            "text": "{{ date: string }} Object with ISO date string (e.g. { date: \"06/19/2025\" })"
                        }],
                    "text": "Fired when a date is selected.\nEmits an object with the selected date."
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
                    "tags": [{
                            "name": "event",
                            "text": undefined
                        }, {
                            "name": "type",
                            "text": "{{ date: string }} Object with ISO date string (e.g. { date: \"06/19/2025\" })"
                        }],
                    "text": "Fired when a date is hovered."
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
                    "tags": [{
                            "name": "event",
                            "text": undefined
                        }, {
                            "name": "type",
                            "text": "{{ date: string }} Object with ISO date string (e.g. { date: \"06/19/2025\" })"
                        }],
                    "text": "Fired when new date is being focused."
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
            }, {
                "propName": "isMobileView",
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
//# sourceMappingURL=wdpr-double-calendar.js.map
