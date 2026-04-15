import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { g as getPreviousMonth, c as getNextMonth, a as isBeforeDay, b as isAfterDay } from './p-Ce-taq9l.js';
import { d as defineCustomElement$3 } from './p-CqBIcCq6.js';
import { d as defineCustomElement$2 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$1 } from './p-BOubPl_u.js';
import { d as dateFnsExports } from './p-iWCgRMLC.js';

const WdprMonthHeader = /*@__PURE__*/ proxyCustomElement(class WdprMonthHeader extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.previousMonthClick = createEvent(this, "previousMonth", 7);
        this.nextMonthClick = createEvent(this, "nextMonth", 7);
    }
    get el() { return this; }
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
        const lastDayOfPrevMonth = dateFnsExports.endOfMonth(prevMonth);
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
    static get watchers() { return {
        "displayDate": ["validateButtons", "setTitle"],
        "minDate": ["validateButtons"],
        "maxDate": ["validateButtons"]
    }; }
}, [257, "wdpr-month-header", {
        "variant": [1],
        "displayDate": [16, "display-date"],
        "minDate": [16, "min-date"],
        "maxDate": [16, "max-date"],
        "_isPrevMonthDisabled": [32],
        "_isNextMonthDisabled": [32],
        "_month": [32],
        "_year": [32]
    }, undefined, {
        "displayDate": ["validateButtons", "setTitle"],
        "minDate": ["validateButtons"],
        "maxDate": ["validateButtons"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-month-header", "wdpr-icon-button", "wdpr-icon-library", "wdpr-notification-indicator"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-month-header":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprMonthHeader);
            }
            break;
        case "wdpr-icon-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprMonthHeader as W, defineCustomElement as d };
//# sourceMappingURL=p-Dv0bMjGg.js.map

//# sourceMappingURL=p-Dv0bMjGg.js.map