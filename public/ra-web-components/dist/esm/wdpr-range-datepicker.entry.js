import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CykM8GCN.js';
import { g as generateRandId } from './utils-B2sDCMk6.js';
import { f as formatDateToString, i as isValidDateString, p as parseDateFromString, a as isBeforeDay, b as isAfterDay } from './date.utils-Cvbc0wgY.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import { w as wrapperTextFieldClasses } from './wdpr-datepicker.model-IIS_2Ppz.js';
import { b as bundleCjsExports } from './bundle-cjs-CF3xLdU_.js';
import './index-iWCgRMLC.js';

const WdprRangeDatePicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.rangeDatesSelected = createEvent(this, "rangeDatesSelected", 7);
        this.dateInvalid = createEvent(this, "dateInvalid", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    /**
     * @internal Reference to wdpr-range-datepicker-input component.
     */
    _dualTextFieldElement;
    /**
     * @internal Reference to wdpr-calendar component.
     */
    _calendarElement;
    get el() { return getElement(this); }
    internals;
    /**
     * The flag that expand or not the calendar.
     * @type {boolean}
     */
    _expanded = false;
    /**
     * @internal
     * Tracks which field (start/end) the user last clicked to open the calendar.
     * Used to inform the calendar which date endpoint to update on the first selection.
     */
    _activeField = 'start';
    /**
     * @internal
     * The internal ID for the dialog. It is used internally and is not exposed.
     */
    _internalDialogId;
    /**
     * The disabled state.
     * @type {string}
     */
    disabled = false;
    /**
     * Flag that enables or not an extra week.
     * @type {boolean}
     */
    enableSixWeeks = false;
    /**
     * The start label for the input.
     * @type {string}
     */
    startLabel = 'Start Label';
    /**
     * The end label for the input.
     * @type {string}
     */
    endLabel = 'End Label';
    /**
     * The date format string (uses date-fns format syntax).
     *
     * @default "MM/dd/yyyy"
     * @example "dd-MM-yyyy"
     * @type {string}
     */
    format = 'MM/dd/yyyy';
    /**
     * Default start date for range selection .
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/10/2025"
     * @type {string}
     */
    start;
    /**
     * Default end date for range selection.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/20/2025"
     * @type {string}
     */
    end;
    /**
     * Name for the start date in form submission.
     */
    startName;
    /**
     * Name for the end date in form submission.
     */
    endName;
    /**
     * Min date for the calendar to show.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/10/2025"
     * @type {string}
     */
    min = formatDateToString(new Date(0, 0, 1), this.format);
    /**
     * Max date the calendar to show.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/20/2025"
     * @type {string}
     */
    max;
    /**
     * Error state of the text field
     * @type {boolean}
     */
    error = false;
    /**
     * The calendar display variant.
     * - `single`: one month view
     * - `double`: two months side by side
     * - `swipe`: swipe between months
     *
     * @default "single"
     * @type {"single" | "double" | "swipe"}
     */
    variant = 'single';
    /**
     * Helper text for the wdpr-text-field. Could be for error or just info.
     * @type {string}
     */
    helperText;
    /**
     * (Optional) A unique ID for the component. It is essential for accessibility,
     * If not provided, a random ID will be generated.
     * @type {string}
     */
    dialogId;
    /**
     * Flag that shows or hide the calendar borders
     * @default true
     * @type {boolean}
     */
    displayCalendarBorder = true;
    /**
     * Flag that shows or hide the calendar box shadow
     * @default true
     * @type {boolean}
     */
    showBoxShadow = true;
    /**
     * Readonly state of the text field
     * @type {boolean}
     */
    readonly = false;
    calendarSize = 'medium';
    inputMaxWidth = false;
    /**
     * Fired when a valid range of dates is selected.
     * @event rangeDatesSelected
     * @type {CustomEvent<{ startDate?: string; endDate?: string }>}
     * @property {string} [startDate] - Start date as an ISO string (e.g. "2025-06-19").
     * @property {string} [endDate] - End date as an ISO string (e.g. "2025-06-25").
     */
    rangeDatesSelected;
    /**
     * Fired when an invalid date input is detected (wrong format, out of range, or invalid range).
     * @event dateInvalid
     * @type {CustomEvent<{ type: 'invalid-format' | 'out-of-range' | 'invalid-range'; start?: string; end?: string }>}
     * @property {'invalid-format' | 'out-of-range' | 'invalid-range'} type - Type of invalidity.
     * @property {string} [start] - Start date as an ISO string (if provided).
     * @property {string} [end] - End date as an ISO string (if provided).
     */
    dateInvalid;
    handleClickOutside(event) {
        if (this._expanded && this.el && !event.composedPath().includes(this.el)) {
            this._expanded = false;
        }
    }
    componentWillLoad() {
        this._internalDialogId = this.dialogId || `wdpr-range-datepicker-calendar-${generateRandId()}`;
        this._updateFormValue();
    }
    componentDidLoad() {
        const extras = this._getDateExtras();
        this._calendarElement.setExtras(extras);
    }
    handleFormPropsChanged() {
        this._updateFormValue();
    }
    _toggleExpandCalendar = () => {
        if (!this.disabled) {
            this._expanded = !this._expanded;
        }
    };
    handleRangeDatesSelected = async (event) => {
        const { startDate, endDate } = event.detail;
        event.stopPropagation();
        this.start = startDate;
        this.end = endDate;
        if (endDate) {
            this._expanded = false;
            this._activeField = 'start';
            await this._dualTextFieldElement.setTrailingFocus();
        }
        this.rangeDatesSelected.emit({ startDate: this.start, endDate: this.end });
    };
    _handleRangeDatesChanged = (event) => {
        const { leadingValue: startDate, trailingValue: endDate } = event.detail;
        if (startDate && !isValidDateString(startDate, this.format)) {
            this.dateInvalid.emit({ type: 'invalid-format', start: startDate });
            return;
        }
        if (endDate && !isValidDateString(endDate, this.format)) {
            this.dateInvalid.emit({ type: 'invalid-format', end: endDate });
            return;
        }
        const parsedStart = startDate ? parseDateFromString(startDate, this.format) : undefined;
        const parsedEnd = endDate ? parseDateFromString(endDate, this.format) : undefined;
        const parsedMin = this.min ? parseDateFromString(this.min, this.format) : undefined;
        const parsedMax = this.max ? parseDateFromString(this.max, this.format) : undefined;
        if (parsedStart && ((parsedMin && isBeforeDay(parsedStart, parsedMin)) || (parsedMax && isAfterDay(parsedStart, parsedMax)))) {
            this.dateInvalid.emit({ type: 'out-of-range', start: startDate });
            return;
        }
        if (parsedEnd && ((parsedMin && isBeforeDay(parsedEnd, parsedMin)) || (parsedMax && isAfterDay(parsedEnd, parsedMax)))) {
            this.dateInvalid.emit({ type: 'out-of-range', end: endDate });
            return;
        }
        if (parsedStart && parsedEnd && isAfterDay(parsedStart, parsedEnd)) {
            this.dateInvalid.emit({
                type: 'invalid-range',
                start: startDate,
                end: endDate,
            });
            return;
        }
        this.start = startDate;
        this.end = endDate;
        this.rangeDatesSelected.emit({ startDate: this.start, endDate: this.end });
    };
    _handleInputClick = (event) => {
        if (this.readonly)
            return;
        this._activeField = event.detail?.field === 'trailing' ? 'end' : 'start';
        this._expanded = true;
    };
    _handleInputKeyDown = async (ev) => {
        if (this.readonly)
            return;
        if (ev.key === KEYBOARD_KEYS.ARROW_DOWN) {
            ev.preventDefault();
            this._expanded = true;
            await this._waitForNextRender();
            if (this._calendarElement) {
                const focusDate = this.start || this.min || this._getTodayString();
                this._calendarElement.setFocusDate(parseDateFromString(focusDate, this.format));
            }
        }
        if (ev.key === KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            this._expanded = false;
        }
    };
    _handleCalendarKeyDown = async (ev) => {
        if (ev.key === KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            this._expanded = false;
            await this._dualTextFieldElement.setLeadingFocus();
        }
    };
    _waitForNextRender() {
        return new Promise(resolve => requestAnimationFrame(() => resolve()));
    }
    _getTodayString() {
        const today = new Date();
        return formatDateToString(today, this.format);
    }
    _getDateExtras() {
        const slotNodes = this.el.querySelectorAll('[slot^="date-info-"]');
        const extras = new Map();
        slotNodes.forEach(node => {
            const dateKey = node.getAttribute('slot').replace('date-info-', '');
            if (dateKey)
                extras.set(dateKey, node);
        });
        return extras;
    }
    _updateFormValue() {
        const shouldSubmit = !this.disabled && !!this.startName && !!this.endName;
        if (!shouldSubmit) {
            this.internals?.setFormValue?.(null);
            this.internals?.setValidity?.({});
            return;
        }
        const formData = new FormData();
        formData.append(this.startName, this.start ?? '');
        formData.append(this.endName, this.end ?? '');
        this.internals?.setFormValue?.(formData);
        this.internals?.setValidity?.({});
    }
    get _calendarWrapperClasses() {
        const baseClasses = 'absolute mt-100 left-1/2 -translate-x-1/2 translate-y-0 w-fit bg-surface-default rounded-150 z-10';
        const shadowClass = this.showBoxShadow ? 'p-200 border-solid border-012 border-stroke-neutral-light elevation-medium-soft' : '';
        const _expandedClasses = this._expanded && !this.disabled ? 'block' : 'hidden';
        return bundleCjsExports.twMerge(baseClasses, shadowClass, _expandedClasses);
    }
    get _textFieldWrapperClasses() {
        if (this.inputMaxWidth)
            return 'w-full';
        return bundleCjsExports.twMerge('m-auto md:w-[358px]', wrapperTextFieldClasses[this.calendarSize]);
    }
    render() {
        return (h("div", { key: '74eaf8b7202713007feaa38964d2891b7c26dd54', class: "relative" }, h("div", { key: 'b11fcde63aa1226f338628887cf31e6ac4d61bf7', class: this._textFieldWrapperClasses }, h("wdpr-dual-text-field", { key: '372fa1c445bc71b550d23cb560bb606b36d740e3', ref: el => (this._dualTextFieldElement = el), leadingLabel: this.startLabel, trailingLabel: this.endLabel, leadingValue: this.start, trailingValue: this.end, error: this.error, disabled: this.disabled, helperText: this.helperText, readonly: this.readonly, a11yRole: "combobox", a11yHasPopup: "dialog", a11yControls: this._internalDialogId, a11yExpanded: this._expanded ? 'true' : 'false', onWdprInputClick: this._handleInputClick, onWdprValueChanged: this._handleRangeDatesChanged, onKeyDown: this._handleInputKeyDown }, !this.readonly && (h("wdpr-icon-button", { key: '5abc28cb52075b6c18be0aea9386fbdacf532d7e', size: "medium", iconName: "calendar-month", slot: "trailing-icon-button", a11yLabel: "Choose Dates", disabled: this.disabled, onClicked: this._toggleExpandCalendar, customTabIndex: -1 })))), h("div", { key: '23e251e0fe57038815f350da582296542bb5506a', id: this._internalDialogId, class: this._calendarWrapperClasses, part: "calendar-wrapper", role: "dialog", "aria-label": "Choose Date" }, h("wdpr-calendar", { key: 'cc3854e9c3c5576afb8bfd4bc5e53926ae4e59e7', ref: el => (this._calendarElement = el), mode: "range", enableSixWeeks: this.enableSixWeeks, start: this.start, end: this.end, format: this.format, min: this.min, max: this.max, variant: this.variant, displayBorder: this.displayCalendarBorder, rangeActiveField: this._activeField, onRangeDatesSelected: this.handleRangeDatesSelected, onKeyDown: this._handleCalendarKeyDown, exportparts: "calendar, calendar-surface", size: this.calendarSize }))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "start": ["handleFormPropsChanged"],
        "end": ["handleFormPropsChanged"],
        "disabled": ["handleFormPropsChanged"],
        "startName": ["handleFormPropsChanged"],
        "endName": ["handleFormPropsChanged"]
    }; }
};

export { WdprRangeDatePicker as wdpr_range_datepicker };
//# sourceMappingURL=wdpr-range-datepicker.entry.js.map

//# sourceMappingURL=wdpr-range-datepicker.entry.js.map