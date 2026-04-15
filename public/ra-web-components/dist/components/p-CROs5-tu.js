import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-BRIGwGQo.js';
import { b as isAfterDay, f as formatDateToString, i as isValidDateString, p as parseDateFromString, a as isBeforeDay, c as getNextMonth, g as getPreviousMonth } from './p-Ce-taq9l.js';
import { d as dateFnsExports } from './p-iWCgRMLC.js';

const wdprCalendarCss = ":host(.is-swipe){width:100%}:host(.full-width){width:100%}";

const WdprCalendar = /*@__PURE__*/ proxyCustomElement(class WdprCalendar extends H {
    get el() { return this; }
    _internals;
    _defaultValue;
    _defaultStart;
    _defaultEnd;
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.dateSelected = createEvent(this, "dateSelected", 7);
        this.rangeDatesSelected = createEvent(this, "rangeDatesSelected", 7);
        this._internals = this.el.attachInternals();
    }
    /**
     * The date that will be used to display the month in the calendar.
     * Default is the current date.
     * @type {Date}
     */
    _displayDate = new Date();
    /**
     * @internal
     * The date currently hovered in the calendar.
     * Internal use only.
     * @type {Date | null}
     */
    _hoverDate = null;
    /**
     * @internal
     * Currently focused date.
     * @type {Date | null}
     */
    _focusDate = null;
    /**
     * @internal
     * The startDate formatted from start prop.
     * @type {Date | null}
     */
    _startDate = null;
    /**
     * @internal
     * The endDate formatted from end prop.
     * @type {Date | null}
     */
    _endDate = null;
    /**
     * @internal
     * Selected date parsed from the `value` prop (single mode).
     * @type {Date | null}
     */
    _selectedDate = null;
    /**
     * @internal
     * The endDate formatted from end prop.
     * @type {Date | null}
     */
    _minDate = null;
    /**
     * @internal
     * Selected date parsed from the `value` prop (single mode).
     * @type {Date | null}
     */
    _maxDate = null;
    /**
     * The date currently setting as the Maximum end.
     * Internal use only.
     * @type {Date | null}
     */
    _maxRangeDate = null;
    /**
     * @internal
     * The extra info for the date cells
     * @type {Map<string, HTMLElement>}
     */
    _extras = new Map();
    /**
     * @internal
     * A normalized set of blocked day timestamps (midnight) for O(1) lookup.
     */
    _blockedDatesSet = new Set();
    /**
     * Internal set of dot dates for quick lookup.
     */
    _dotDatesSet = new Set();
    /**
     * Internal map of day timestamp to price value for quick lookup.
     */
    _priceDatesMap = new Map();
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
     * The calendar mode.
     * - `single`: user selects one date
     * - `range`: user selects a start and end date
     *
     * @default "single"
     * @type {"single" | "range"}
     */
    mode = 'single';
    /**
     * Name used when participating in form submissions.
     */
    name;
    /**
     * Whether to always render six weeks in the calendar view.
     * Useful for keeping calendar height consistent.
     *
     * @default false
     * @type {boolean}
     */
    enableSixWeeks = false;
    /**
     * The value date in string format.
     * - Used only when `mode="single"`.
     * - Must match the format specified in the `format` prop.
     *
     * @example "06/19/2025"
     *
     * @type {string}
     */
    value;
    /**
     * Start date for range selection.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/10/2025"
     * @type {string}
     */
    start;
    /**
     * End date for range selection.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/20/2025"
     * @type {string}
     */
    end;
    /**
     * Min date for the calendar to show.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/10/2025"
     * @type {string}
     */
    min;
    /**
     * Max date the calendar to show.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/20/2025"
     * @type {string}
     */
    max;
    /**
     * The date format string (uses date-fns format syntax).
     *
     * @default "MM/dd/yyyy"
     * @example "dd-MM-yyyy"
     * @type {string}
     */
    format = 'MM/dd/yyyy';
    /**
     * The calendar max range in days. Number 0 does not block anything
     * @default 0
     * @type {number}
     */
    maxRange = 0;
    /**
     * In `range` mode, indicates which endpoint the user intends to edit when the calendar opens.
     * - `'start'` (default): clicking a date while both endpoints are set starts a new range from that date.
     * - `'end'`: clicking a date while both endpoints are set updates only the end date, preserving the existing start.
     * @default "start"
     * @type {"start" | "end"}
     */
    rangeActiveField = 'start';
    /**
     * Flag that shows or hide the calendar borders
     * @default true
     * @type {boolean}
     */
    displayBorder = true;
    /**
     * Array of dates to block from selection.
     * Must follow the same `format` as the calendar.
     * @example ["06/12/2025", "06/15/2025"]
     * @type {string[]}
     */
    blockedDates;
    /**
     * Whether this disabled cells should set a slash in the disabled dates or not.
     * @default false
     */
    showDisabledSlash = false;
    size = 'medium';
    /**
     * Array of dates to show indicator dots on.
     * Must follow the same `format` as the calendar.
     * @example ["06/12/2025", "06/15/2025"]
     * @type {string[]}
     */
    indicatorDotDates;
    /**
     * Array of dates to show prices on.
     * Must follow the same `format` as the calendar.
     * @example [{day: "06/12/2025", price: 100}, {day: "06/15/2025", price: 150}]
     * @type {{day: string, price: number}[]}
     */
    priceDates;
    isReadOnly = false;
    /**
     * Whether the calendar should take the full width of its container.
     * @default false
     * @type {boolean}
     */
    fullWidth = false;
    /**
     * On date selected event. Sent when calendar mode is 'single'.
     * @event
     * @type {string} ISO date string (e.g. "2025-06-19")
     */
    dateSelected;
    /**
     * On range selected dates event. Sent when calendar mode is 'range'.
     * @event
     * @type {{ startDate?: string; endDate?: string, hasBlockedDates: boolean }}
     * Object containing the start and end dates as ISO strings.
     */
    rangeDatesSelected;
    connectedCallback() {
        this._defaultValue = this.value;
        this._defaultStart = this.start;
        this._defaultEnd = this.end;
        this.el.addEventListener('formreset', this._handleFormReset);
    }
    disconnectedCallback() {
        this.el.removeEventListener('formreset', this._handleFormReset);
    }
    handleMinAndMaxValueChange() {
        this._setMinAndMaxDates();
        this._setDisplayDate();
    }
    handleStartChange(newValue) {
        const processedDate = this._processDate(newValue);
        if (processedDate) {
            this._startDate = processedDate;
            this._displayDate = processedDate;
        }
        else {
            this._startDate = null;
        }
        if (this.mode === 'range') {
            this._maxRangeDate = this._startDate && this.maxRange ? dateFnsExports.addDays(this._startDate, this.maxRange - 1) : null;
        }
        this._syncFormValue();
    }
    handleEndChange(newValue) {
        const processedDate = this._processDate(newValue);
        if (processedDate) {
            this._endDate = processedDate;
        }
        else {
            this._endDate = null;
        }
        // Clear maxRangeDate when end is set in range mode
        if (this.mode === 'range') {
            this._maxRangeDate = null;
        }
        this._syncFormValue();
    }
    handleValueChange(newValue) {
        const processedDate = this._processDate(newValue);
        if (processedDate) {
            this._selectedDate = processedDate;
            this._displayDate = processedDate;
        }
        else {
            this._selectedDate = null;
        }
        this._syncFormValue();
    }
    handleModeChange() {
        this._syncFormValue();
    }
    handleNameChange() {
        this._syncFormValue();
    }
    /**
     * Recompute blocked dates when list changes.
     */
    handleBlockedDatesChange(newValue) {
        this._parseBlockedDates(newValue, this.format);
    }
    _handleIndicatorDotDatesChange(newValue) {
        this._parseDotDates(newValue, this.format);
    }
    _handlePriceDatesChange(newValue) {
        this._parsePriceDates(newValue, this.format);
    }
    /**
     * Recompute blocked/dot/price dates when format changes.
     */
    handleFormatChange() {
        this._parseBlockedDates(this.blockedDates, this.format);
        this._parseDotDates(this.indicatorDotDates, this.format);
        this._parsePriceDates(this.priceDates, this.format);
    }
    async setFocusDate(newDate) {
        this._focusDate = newDate;
    }
    async setExtras(extras) {
        this._extras = extras;
    }
    /**
     * Checks if any blocked date is inside the currently selected range.
     * Returns true if at least one blocked date is within [startDate, endDate].
     */
    async hasBlockedDatesInRange() {
        return this._getBlockedDatesInRange().length > 0;
    }
    /**
     * Returns detailed info for each date in the currently selected range.
     * Output: [{ date: "MM/dd/yyyy", isBlocked: boolean }, ...]
     */
    async getRangeSelectionDetails() {
        if (this.mode !== 'range' || !this._startDate || !this._endDate)
            return [];
        let start = dateFnsExports.startOfDay(this._startDate);
        let end = dateFnsExports.startOfDay(this._endDate);
        // Ensure start <= end
        if (isAfterDay(start, end)) {
            const tmp = start;
            start = end;
            end = tmp;
        }
        const details = [];
        for (let d = start; !isAfterDay(d, end); d = dateFnsExports.addDays(d, 1)) {
            details.push({
                date: formatDateToString(d, this.format),
                isBlocked: this._isDateBlocked(d),
            });
        }
        return details;
    }
    componentWillLoad() {
        if (typeof this.displayBorder === 'string') {
            this.displayBorder = this.displayBorder !== 'false';
        }
        this._setMinAndMaxDates();
        this._setDisplayDate();
        this._setInitialFocus();
        this._setMaxRangeDate();
        this._parseBlockedDates(this.blockedDates, this.format);
        this._parseDotDates(this.indicatorDotDates, this.format);
        this._parsePriceDates(this.priceDates, this.format);
        this._getDateExtras();
        this._syncFormValue();
    }
    // Returns the blocked dates that fall within the selected range as formatted strings.
    _getBlockedDatesInRange() {
        if (this.mode !== 'range' || !this._startDate || !this._endDate || !this._blockedDatesSet.size)
            return [];
        let start = dateFnsExports.startOfDay(this._startDate);
        let end = dateFnsExports.startOfDay(this._endDate);
        // Ensure start <= end
        if (isAfterDay(start, end)) {
            const tmp = start;
            start = end;
            end = tmp;
        }
        const matches = [];
        for (let d = start; !isAfterDay(d, end); d = dateFnsExports.addDays(d, 1)) {
            const key = dateFnsExports.startOfDay(d).getTime();
            if (this._blockedDatesSet.has(key)) {
                matches.push(formatDateToString(d, this.format));
            }
        }
        return matches;
    }
    _processDate(value) {
        if (value && isValidDateString(value, this.format)) {
            return parseDateFromString(value, this.format);
        }
    }
    // Shared helper to parse an array of date strings and populate a Set with their day-start timestamps.
    _parseDateSet(dates, format, targetSet) {
        targetSet.clear();
        if (!Array.isArray(dates) || dates.length === 0)
            return;
        for (const dateString of dates) {
            if (!dateString || !isValidDateString(dateString, format))
                continue;
            const parsedDate = parseDateFromString(dateString, format);
            const dayTimestamp = dateFnsExports.startOfDay(parsedDate).getTime();
            targetSet.add(dayTimestamp);
        }
    }
    _parseBlockedDates(dates, format) {
        this._parseDateSet(dates, format, this._blockedDatesSet);
    }
    _parseDotDates(dates, format) {
        this._parseDateSet(dates, format, this._dotDatesSet);
    }
    // Parse and store price dates into a Map keyed by day-start timestamp.
    _parsePriceDates(priceDates, format) {
        this._priceDatesMap.clear();
        if (!Array.isArray(priceDates) || priceDates.length === 0)
            return;
        for (const entry of priceDates) {
            if (!entry?.day || !isValidDateString(entry.day, format))
                continue;
            const parsedDate = parseDateFromString(entry.day, format);
            const dayTimestamp = dateFnsExports.startOfDay(parsedDate).getTime();
            this._priceDatesMap.set(dayTimestamp, entry.price);
        }
    }
    // Shared helper to check if a date (Date or string) exists in a Set of timestamps.
    _isDateInSet(dateOrString, set) {
        const processedDate = typeof dateOrString === 'string' ? this._processDate(dateOrString) : dateOrString;
        if (!processedDate)
            return false;
        const dayTimestamp = dateFnsExports.startOfDay(processedDate).getTime();
        return set.has(dayTimestamp);
    }
    _isDateBlocked = (dateOrString) => this._isDateInSet(dateOrString, this._blockedDatesSet);
    _isDateDot = (dateOrString) => this._isDateInSet(dateOrString, this._dotDatesSet);
    _isDateDisabled = (date) => {
        return this._isDateBlocked(date) || isBeforeDay(date, this._minDate) || isAfterDay(date, this._maxDate);
    };
    _hasDisabledDateBetween = (startDate, endDate) => {
        let current = dateFnsExports.addDays(startDate, 1);
        while (isBeforeDay(current, endDate)) {
            if (this._isDateDisabled(current)) {
                return true;
            }
            current = dateFnsExports.addDays(current, 1);
        }
        return false;
    };
    _getLastSelectableDateBefore = (startDate, targetDate) => {
        let current = dateFnsExports.addDays(startDate, 1);
        let lastSelectable = null;
        while (isBeforeDay(current, targetDate) || dateFnsExports.isSameDay(current, targetDate)) {
            if (this._isDateDisabled(current)) {
                return lastSelectable;
            }
            lastSelectable = current;
            current = dateFnsExports.addDays(current, 1);
        }
        return lastSelectable;
    };
    // Returns the price value for a given date, or undefined if not present.
    _getDatePrice = (dateOrString) => {
        const processedDate = typeof dateOrString === 'string' ? this._processDate(dateOrString) : dateOrString;
        if (!processedDate)
            return undefined;
        const dayTimestamp = dateFnsExports.startOfDay(processedDate).getTime();
        return this._priceDatesMap.get(dayTimestamp);
    };
    _goNextMonth = () => {
        this._displayDate = getNextMonth(this._displayDate);
        this._resetFocusDateToMonth();
    };
    _goPreviousMonth = () => {
        this._displayDate = getPreviousMonth(this._displayDate);
        this._resetFocusDateToMonth();
    };
    _handleDateSelected = async (event) => {
        const { date } = event.detail;
        const dateFormatted = parseDateFromString(date, this.format);
        event.stopPropagation();
        // Block selection if date is disabled
        if (this._isDateDisabled(dateFormatted)) {
            return;
        }
        if (this.mode === 'single') {
            this._selectedDate = dateFormatted;
            this._focusDate = this._selectedDate;
            this.value = date;
            this.dateSelected.emit(formatDateToString(this._selectedDate, this.format));
        }
        if (this.mode === 'range') {
            // Prevent using disabled dates as start/end
            if (this._isDateDisabled(dateFormatted)) {
                return;
            }
            if (!this._startDate || (this._startDate && this._endDate && this.rangeActiveField !== 'end')) {
                this._startDate = dateFormatted;
                this._endDate = null;
                this._hoverDate = null;
                this._focusDate = this._startDate;
                this.start = date;
            }
            else if (isBeforeDay(dateFormatted, this._startDate)) {
                this._startDate = dateFormatted;
                this._endDate = null;
                this._hoverDate = null;
                this._focusDate = this._startDate;
                this.start = date;
            }
            else if (isAfterDay(dateFormatted, this._startDate) || dateFnsExports.isSameDay(dateFormatted, this._startDate)) {
                // If there are disabled dates between start and clicked date, select the last available date before the disabled date
                let endDateToUse = dateFormatted;
                if (this._hasDisabledDateBetween(this._startDate, dateFormatted)) {
                    const lastSelectable = this._getLastSelectableDateBefore(this._startDate, dateFormatted);
                    if (!lastSelectable || dateFnsExports.isSameDay(lastSelectable, this._startDate)) {
                        return;
                    }
                    endDateToUse = lastSelectable;
                }
                this._endDate = endDateToUse;
                this._focusDate = this._endDate;
                this.end = formatDateToString(endDateToUse, this.format);
            }
            const hasBlockedDates = await this.hasBlockedDatesInRange();
            const rangeDetails = await this.getRangeSelectionDetails();
            this.rangeDatesSelected.emit({
                startDate: formatDateToString(this._startDate, this.format),
                endDate: this._endDate && formatDateToString(this._endDate, this.format),
                hasBlockedDates,
                rangeDetails,
            });
        }
    };
    _handleDateHover = (event) => {
        const { date } = event.detail;
        const dateFormatted = parseDateFromString(date, this.format);
        // Do not show hover state on blocked/disabled dates
        if (this._isDateDisabled(dateFormatted))
            return;
        if (this.mode === 'range' && this._startDate && !this._endDate && dateFormatted > this._startDate) {
            // If there are disabled dates between start and hover, show preview up to the last selectable date
            if (this._hasDisabledDateBetween(this._startDate, dateFormatted)) {
                const lastSelectable = this._getLastSelectableDateBefore(this._startDate, dateFormatted);
                if (lastSelectable && !dateFnsExports.isSameDay(lastSelectable, this._startDate)) {
                    this._hoverDate = lastSelectable;
                }
                return;
            }
            this._hoverDate = dateFormatted;
        }
    };
    _handleFocusMoveOut = (event) => {
        const { date } = event.detail;
        const focusDate = parseDateFromString(date, this.format);
        this._focusDate = focusDate;
        if (this.variant === 'single') {
            const monthStart = dateFnsExports.startOfMonth(this._displayDate);
            const monthEnd = dateFnsExports.endOfMonth(this._displayDate);
            if (focusDate < monthStart) {
                this._goPreviousMonth();
            }
            if (focusDate > monthEnd) {
                this._goNextMonth();
            }
        }
    };
    _setInitialFocus() {
        if (this.mode === 'single' && this._selectedDate) {
            this.setFocusDate(this._selectedDate);
        }
        if (this.mode === 'range' && this._startDate) {
            this.setFocusDate(this._startDate);
        }
        if (!this._focusDate) {
            const firstDayOfMonth = dateFnsExports.startOfMonth(this._displayDate);
            this.setFocusDate(firstDayOfMonth);
        }
    }
    _setDisplayDate() {
        this._selectedDate = this._clampDateToRange(this._processDate(this.value));
        this._startDate = this._clampDateToRange(this._processDate(this.start));
        this._endDate = this._clampDateToRange(this._processDate(this.end));
        if (this.mode === 'single') {
            if (this._selectedDate) {
                this._displayDate = this._selectedDate;
            }
            else {
                // Use today if it's within the allowed range, otherwise use min or max date
                const today = new Date();
                const isTodayInRange = (!this._minDate || !isBeforeDay(today, this._minDate)) && (!this._maxDate || !isAfterDay(today, this._maxDate));
                if (isTodayInRange) {
                    this._displayDate = today;
                }
                else if (this._minDate) {
                    this._displayDate = this._minDate;
                }
                else if (this._maxDate) {
                    this._displayDate = this._maxDate;
                }
            }
        }
        if (this.mode === 'range') {
            if (this._startDate) {
                this._displayDate = this._startDate;
            }
            else if (this._endDate) {
                this._displayDate = this._endDate;
            }
            else {
                // Use today if it's within the allowed range, otherwise use min or max date
                const today = new Date();
                const isTodayInRange = (!this._minDate || !isBeforeDay(today, this._minDate)) && (!this._maxDate || !isAfterDay(today, this._maxDate));
                if (isTodayInRange) {
                    this._displayDate = today;
                }
                else if (this._minDate) {
                    this._displayDate = this._minDate;
                }
                else if (this._maxDate) {
                    this._displayDate = this._maxDate;
                }
            }
        }
    }
    _setMinAndMaxDates() {
        this._minDate = this._processDate(this.min);
        this._maxDate = this._processDate(this.max);
    }
    _clampDateToRange(date) {
        if (!date)
            return null;
        if (this._minDate && isBeforeDay(date, this._minDate))
            return null;
        if (this._maxDate && isAfterDay(date, this._maxDate))
            return null;
        return date;
    }
    _resetFocusDateToMonth() {
        const monthStart = dateFnsExports.startOfMonth(this._displayDate);
        const monthEnd = dateFnsExports.endOfMonth(this._displayDate);
        if (!this._focusDate || isBeforeDay(this._focusDate, monthStart) || isAfterDay(this._focusDate, monthEnd)) {
            if (this._selectedDate && !isBeforeDay(this._selectedDate, monthStart) && !isAfterDay(this._selectedDate, monthEnd)) {
                this._focusDate = this._selectedDate;
            }
            else if (this._startDate && !isBeforeDay(this._startDate, monthStart) && !isAfterDay(this._startDate, monthEnd)) {
                this._focusDate = this._startDate;
            }
            else {
                this._focusDate = monthStart;
            }
        }
    }
    /**
     * Calculates and enforces the maximum selectable end date in range mode.
     *
     * When a start date is selected and `maxRange` is defined, this sets `maxRangeDate`
     * as the last valid date in the allowed range.
     */
    _setMaxRangeDate() {
        if (this.mode === 'range') {
            if (this._startDate && this.maxRange) {
                this._maxRangeDate = this.maxRange && dateFnsExports.addDays(this._startDate, this.maxRange - 1);
            }
            if (this._endDate && this._maxRangeDate && isAfterDay(this._endDate, this._maxRangeDate)) {
                this._endDate = null;
            }
        }
    }
    // This is for setting extra information for specific dates
    _getDateExtras() {
        const slotNodes = this.el.querySelectorAll('[slot^="date-info-"]');
        slotNodes.forEach(node => {
            const dateKey = node.getAttribute('slot').replace('date-info-', '');
            if (dateKey)
                this._extras.set(dateKey, node);
        });
    }
    _handleFormReset = () => {
        if (this.mode === 'single') {
            this.value = this._defaultValue;
        }
        else {
            this.start = this._defaultStart;
            this.end = this._defaultEnd;
        }
    };
    _syncFormValue() {
        if (!this._internals || typeof this._internals.setFormValue !== 'function') {
            return;
        }
        if (!this.name) {
            this._internals.setFormValue?.(null);
            return;
        }
        if (this.mode === 'single') {
            const submissionValue = this.value?.trim();
            this._internals.setFormValue?.(submissionValue ? submissionValue : null);
            return;
        }
        const hasStart = typeof this.start === 'string' && this.start.trim().length > 0;
        const hasEnd = typeof this.end === 'string' && this.end.trim().length > 0;
        if (!hasStart && !hasEnd) {
            this._internals.setFormValue?.(null);
            return;
        }
        const formData = new FormData();
        if (hasStart) {
            formData.append(`${this.name}-start`, this.start.trim());
        }
        if (hasEnd) {
            formData.append(`${this.name}-end`, this.end.trim());
        }
        this._internals.setFormValue?.(formData);
    }
    get _commonCalendarProps() {
        return {
            displayDate: this._displayDate,
            maxRangeDate: this._maxRangeDate,
            selectedDate: this._selectedDate,
            startDate: this._startDate,
            endDate: this._endDate,
            hoverDate: this._hoverDate,
            focusDate: this._focusDate,
            minDate: this._minDate,
            maxDate: this._maxDate,
            extras: this._extras,
            mode: this.mode,
            enableSixWeeks: this.enableSixWeeks,
            format: this.format,
            displayBorder: Boolean(this.displayBorder),
            showDisabledSlash: this.showDisabledSlash,
            size: this.size,
            fullWidth: this.fullWidth,
            isReadOnly: this.isReadOnly,
            isDateBlocked: this._isDateBlocked,
            isDateDot: this._isDateDot,
            getDatePrice: this._getDatePrice,
            onNextMonth: this._goNextMonth,
            onPreviousMonth: this._goPreviousMonth,
            onDateSelected: this._handleDateSelected,
            onDateHover: this._handleDateHover,
            onFocusMoveOut: this._handleFocusMoveOut,
        };
    }
    get calendarLegendLabelClasses() {
        if (this.variant === 'double' || this.variant === 'fourMonth') {
            return 'md:ml-[58px]';
        }
    }
    render() {
        const calendarType = {
            single: 'wdpr-single-calendar',
            double: 'wdpr-double-calendar',
            fourMonth: 'wdpr-four-month-calendar',
            swipe: 'wdpr-swipe-calendar',
        };
        const CalendarTag = this.variant in calendarType ? calendarType[this.variant] : calendarType['single'];
        return (h(Host, { key: '9ebdafb8db9a147829532ef2587180a496e1d2c7', class: { 'is-swipe': this.variant === 'swipe', 'full-width': this.fullWidth } }, h("div", { key: 'a77d7e0712aafd9b810b9a0cacad4ef00d412484', class: "inline-flex flex-col items-start w-full" }, h(CalendarTag, { key: '59c804ed73f7f84ef6ba0ce8833f32f5910f65ab', ...this._commonCalendarProps, monthHeaderVariant: this.variant === 'single' ? 'with-arrows' : 'default', exportparts: "calendar, calendar-surface" }), h("div", { key: '7fcd17a86739396c7aa53cebed18a629deb0e78a', class: this.calendarLegendLabelClasses }, h("slot", { key: 'f475e7e2acb88fa79e62cb15fb6c3c6cd4b8fe7f', name: "calendar-legend-labels" })))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "min": ["handleMinAndMaxValueChange"],
        "max": ["handleMinAndMaxValueChange"],
        "start": ["handleStartChange"],
        "end": ["handleEndChange"],
        "value": ["handleValueChange"],
        "mode": ["handleModeChange"],
        "name": ["handleNameChange"],
        "blockedDates": ["handleBlockedDatesChange"],
        "indicatorDotDates": ["_handleIndicatorDotDatesChange"],
        "priceDates": ["_handlePriceDatesChange"],
        "format": ["handleFormatChange"]
    }; }
    static get style() { return wdprCalendarCss; }
}, [321, "wdpr-calendar", {
        "variant": [1],
        "mode": [1],
        "name": [513],
        "enableSixWeeks": [4, "enable-six-weeks"],
        "value": [1537],
        "start": [1537],
        "end": [1537],
        "min": [1537],
        "max": [1537],
        "format": [1],
        "maxRange": [2, "max-range"],
        "rangeActiveField": [1, "range-active-field"],
        "displayBorder": [1032, "display-border"],
        "blockedDates": [16, "blocked-dates"],
        "showDisabledSlash": [516, "show-disabled-slash"],
        "size": [513],
        "indicatorDotDates": [16, "indicator-dot-dates"],
        "priceDates": [16, "price-dates"],
        "isReadOnly": [4, "is-read-only"],
        "fullWidth": [4, "full-width"],
        "_displayDate": [32],
        "_hoverDate": [32],
        "_focusDate": [32],
        "_startDate": [32],
        "_endDate": [32],
        "_selectedDate": [32],
        "_minDate": [32],
        "_maxDate": [32],
        "_maxRangeDate": [32],
        "_extras": [32],
        "_blockedDatesSet": [32],
        "_dotDatesSet": [32],
        "_priceDatesMap": [32],
        "setFocusDate": [64],
        "setExtras": [64],
        "hasBlockedDatesInRange": [64],
        "getRangeSelectionDetails": [64]
    }, undefined, {
        "min": ["handleMinAndMaxValueChange"],
        "max": ["handleMinAndMaxValueChange"],
        "start": ["handleStartChange"],
        "end": ["handleEndChange"],
        "value": ["handleValueChange"],
        "mode": ["handleModeChange"],
        "name": ["handleNameChange"],
        "blockedDates": ["handleBlockedDatesChange"],
        "indicatorDotDates": ["_handleIndicatorDotDatesChange"],
        "priceDates": ["_handlePriceDatesChange"],
        "format": ["handleFormatChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-calendar"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-calendar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCalendar);
            }
            break;
    } });
}

export { WdprCalendar as W, defineCustomElement as d };
//# sourceMappingURL=p-CROs5-tu.js.map

//# sourceMappingURL=p-CROs5-tu.js.map