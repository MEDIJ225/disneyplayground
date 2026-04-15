import { h } from "@stencil/core";
import { getPreviousMonth, getNextMonth, isBeforeDay, isAfterDay, endOfMonth } from "../../../utils/date.utils";
export class WdprMonthHeader {
    /**
     * Reference to host element.
     * @type {HTMLWdprMonthHeaderElement}
     */
    el;
    _isPrevMonthDisabled = false;
    _isNextMonthDisabled = false;
    _month;
    _year;
    /**
     * The variant of the month header.
     * - `default`: shows title
     * - `with-arrows`: shows navigation and title
     *
     * @default "default"
     * @type {"default" | "with-arrows"}
     */
    variant = 'default';
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
     * Fired when the previous month button is clicked.
     * @event
     * @type {void}
     */
    previousMonthClick;
    /**
     * Fired when the next month button is clicked.
     * @event
     * @type {void}
     */
    nextMonthClick;
    validateButtons() {
        const prevMonth = getPreviousMonth(this.displayDate);
        const nextMonth = getNextMonth(this.displayDate);
        const lastDayOfPrevMonth = endOfMonth(prevMonth);
        const firstDayOfNextMonth = nextMonth;
        this._isPrevMonthDisabled = this.minDate && isBeforeDay(lastDayOfPrevMonth, this.minDate);
        this._isNextMonthDisabled = this.maxDate && isAfterDay(firstDayOfNextMonth, this.maxDate);
    }
    setTitle() {
        this._month = this.displayDate.toLocaleString(navigator.language || 'default', { month: 'long' });
        this._year = this.displayDate.toLocaleString(navigator.language || 'default', { year: 'numeric' });
    }
    componentWillLoad() {
        this.validateButtons();
        this.setTitle();
    }
    onPreviousMonth = () => {
        if (!this._isPrevMonthDisabled) {
            this.previousMonthClick.emit();
        }
    };
    onNextMonth = () => {
        if (!this._isNextMonthDisabled) {
            this.nextMonthClick.emit();
        }
    };
    render() {
        const withArrows = this.variant === 'with-arrows';
        return (h("section", { key: 'b6a3a805fab81c8c808f75da1ecc53ad7a221ebd', part: "month-header", class: "flex items-center py-100 justify-between" }, withArrows && (h("wdpr-icon-button", { key: '3566798148067d842435fd5d2e9995947fc42424', variant: "primary", iconName: "previous", a11yLabel: "Previous Month", disabled: this._isPrevMonthDisabled, onClicked: this.onPreviousMonth })), h("h2", { key: '27c572cad1843e0f7a169b47ebb7eac69f6e22d7', class: "m-0 flex items-center gap-100", "aria-live": "polite", "aria-atomic": "true", part: "month-header-title" }, h("span", { key: '86c2e9895e91567e98d849593e9f400c234d3742', class: "heading-small !text-text-body" }, this._month), h("span", { key: 'd9a02a7d1f8146c3271e61df3c86fb99419374fb', class: "heading-small-alt !text-text-body" }, this._year)), withArrows && h("wdpr-icon-button", { key: '7df2f363c102fdf99dd6a3ef6062dd6cd3d16035', variant: "primary", iconName: "next", a11yLabel: "Next Month", disabled: this._isNextMonthDisabled, onClicked: this.onNextMonth })));
    }
    static get is() { return "wdpr-month-header"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "MonthHeaderVariant",
                    "resolved": "\"default\" | \"with-arrows\"",
                    "references": {
                        "MonthHeaderVariant": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-calendar/wdpr-month-header/wdpr-month-header.tsx",
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
                    "text": "The variant of the month header.\n- `default`: shows title\n- `with-arrows`: shows navigation and title"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'default'"
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
            }
        };
    }
    static get states() {
        return {
            "_isPrevMonthDisabled": {},
            "_isNextMonthDisabled": {},
            "_month": {},
            "_year": {}
        };
    }
    static get events() {
        return [{
                "method": "previousMonthClick",
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
                "method": "nextMonthClick",
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
                "propName": "displayDate",
                "methodName": "setTitle"
            }];
    }
}
//# sourceMappingURL=wdpr-month-header.js.map
