import { h } from "@stencil/core";
import { addDays, addWeeks, formatDateToString, isAfterDay, isBeforeDay, isSameDay, subDays, subWeeks } from "../../../utils/date.utils";
import { KEYBOARD_KEYS } from "../../../models/keycodes.model";
export class WdprMonth {
    /**
     * Reference to host element.
     * @type {HTMLWdprMonthElement}
     */
    el;
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
                    selected: isSameDay(currentDate, this.selectedDate),
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
                    isEndDate = isSameDay(currentDate, this.endDate);
                }
                if (this.startDate && !this.endDate && this.hoverDate) {
                    const min = isAfterDay(this.hoverDate, this.startDate) ? this.startDate : this.hoverDate;
                    const max = isBeforeDay(this.hoverDate, this.startDate) ? this.startDate : this.hoverDate;
                    isInRange = (isAfterDay(currentDate, min) || isSameDay(currentDate, min)) && (isBeforeDay(currentDate, max) || isSameDay(currentDate, min));
                    isEndDate = isSameDay(currentDate, this.hoverDate);
                }
                cellDates.push({
                    date: currentDate,
                    selected: false,
                    isStartDate: isSameDay(currentDate, this.startDate),
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
                newFocusDate = addDays(this.focusDate, 1);
                break;
            case KEYBOARD_KEYS.ARROW_LEFT:
                newFocusDate = subDays(this.focusDate, 1);
                break;
            case KEYBOARD_KEYS.ARROW_DOWN:
                newFocusDate = addWeeks(this.focusDate, 1);
                break;
            case KEYBOARD_KEYS.ARROW_UP:
                newFocusDate = subWeeks(this.focusDate, 1);
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
        const index = this._cellDates.findIndex(cell => cell && isSameDay(cell.date, this.focusDate));
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
        return !!this.focusDate && isSameDay(cellData.date, this.focusDate) && !(isBeforeDay(cellData.date, this.minDate) || isAfterDay(cellData.date, this.maxDate) || blocked);
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
    static get is() { return "wdpr-month"; }
    static get encapsulation() { return "shadow"; }
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
                            "text": "{Date | null} ISO date string"
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
                            "text": "{Date | null} ISO date string"
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
            "maxRange": {
                "type": "number",
                "attribute": "max-range",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "0"
                        }, {
                            "name": "type",
                            "text": "{Number}"
                        }],
                    "text": "The calendar Max range in days"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "0"
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
            }
        };
    }
    static get states() {
        return {
            "_cellDates": {}
        };
    }
    static get events() {
        return [{
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
                "methodName": "handleDateChange"
            }, {
                "propName": "startDate",
                "methodName": "handleDateChange"
            }, {
                "propName": "endDate",
                "methodName": "handleDateChange"
            }, {
                "propName": "hoverDate",
                "methodName": "handleDateChange"
            }, {
                "propName": "selectedDate",
                "methodName": "handleDateChange"
            }, {
                "propName": "maxRangeDate",
                "methodName": "handleDateChange"
            }, {
                "propName": "minDate",
                "methodName": "handleDateChange"
            }, {
                "propName": "maxDate",
                "methodName": "handleDateChange"
            }, {
                "propName": "isDateBlocked",
                "methodName": "handleBlockedPredicateChange"
            }, {
                "propName": "focusDate",
                "methodName": "handleFocusDateChange"
            }];
    }
}
//# sourceMappingURL=wdpr-month.js.map
