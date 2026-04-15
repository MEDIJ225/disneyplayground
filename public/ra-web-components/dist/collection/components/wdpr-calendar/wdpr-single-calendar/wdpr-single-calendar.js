import { h, Host } from "@stencil/core";
import { customTwMerge } from "../../../utils/utils";
export class WdprSingleCalendar {
    /**
     * Reference to host element.
     * @type {HTMLWdprSingleCalendarElement}
     */
    el;
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
    static get is() { return "wdpr-single-calendar"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host(.full-width) { width: 100%; }"; }
    static get properties() {
        return {
            "monthHeaderVariant": {
                "type": "string",
                "attribute": "month-header-variant",
                "mutable": false,
                "complexType": {
                    "original": "MonthHeaderVariant",
                    "resolved": "\"default\" | \"with-arrows\"",
                    "references": {
                        "MonthHeaderVariant": {
                            "location": "import",
                            "path": "../wdpr-month-header/wdpr-month-header",
                            "id": "src/components/wdpr-calendar/wdpr-month-header/wdpr-month-header.tsx::MonthHeaderVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "\"default\""
                        }, {
                            "name": "type",
                            "text": "{\"default\" | \"with-arrows\"}"
                        }],
                    "text": "The variant of the month header.\n- `default`: shows navigation and title\n- `minimal`: reduced styling"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'default'"
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
                            "text": "{ \"xsmall\" | \"small\" | \"medium\"}"
                        }],
                    "text": "The calendar size."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'medium'"
            }
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
                    "text": "Fired when a date is selected (in single mode).\nEmits an object with the selected date."
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
                    "text": "On date hover event."
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
                    "text": "On focus of date moves out event."
                },
                "complexType": {
                    "original": "{ date: string }",
                    "resolved": "{ date: string; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
const wrapperBaseClasses = 'flex flex-col gap-100';
const wrapperSizeClasses = {
    xsmall: 'w-[272px]',
    small: 'w-[288px]',
    medium: 'w-[288px] md:w-[324px]',
};
const containerBaseClasses = 'flex flex-col gap-100 rounded-150 px-150 pt-150 pb-200 bg-surface-default';
const containerBorderClasses = 'border-solid border-012 border-stroke-neutral-medium';
//# sourceMappingURL=wdpr-single-calendar.js.map
