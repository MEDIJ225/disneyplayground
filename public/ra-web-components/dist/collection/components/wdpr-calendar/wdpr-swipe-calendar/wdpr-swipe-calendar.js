import { h } from "@stencil/core";
import { startOfMonth } from "../../../utils/date.utils";
import { twMerge } from "../../../utils/utils";
export class WdprSwipeCalendar {
    el;
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
        return twMerge('flex flex-nowrap items-start pb-200', margin);
    }
    render() {
        const months = this._getMonthsToRenderCount();
        const baseDate = startOfMonth(this.minDate ?? this.displayDate);
        // Determine which month should scroll in view based on displayDate
        const displayMonthStart = startOfMonth(this.displayDate);
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
    static get is() { return "wdpr-swipe-calendar"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host { width: 100%; }"; }
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
    static get events() {
        return [{
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
                "methodName": "validateMonths"
            }, {
                "propName": "minDate",
                "methodName": "validateMonths"
            }, {
                "propName": "maxDate",
                "methodName": "validateMonths"
            }];
    }
}
//# sourceMappingURL=wdpr-swipe-calendar.js.map
