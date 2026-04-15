import { r as registerInstance, c as createEvent, a as getElement, h, F as Fragment, H as Host } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import { f as formatDateToString, a as isBeforeDay, b as isAfterDay, g as getPreviousMonth, c as getNextMonth } from './date.utils-Cvbc0wgY.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import { b as bundleCjsExports } from './bundle-cjs-CF3xLdU_.js';
import { d as dateFnsExports } from './index-iWCgRMLC.js';

const WdprDate = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.dateSelected = createEvent(this, "dateSelected", 7);
        this.dateHover = createEvent(this, "dateHover", 7);
    }
    /**
     * @internal Reference to extra cell info container.
     */
    _extraContainer;
    get el() { return getElement(this); }
    /**
     * Data for this calendar cell.
     * Contains the date and state flags for rendering.
     * @type {CellData | null}
     */
    cellData;
    /**
     * Whether this cell should receive keyboard focus.
     * Used for roving tabindex and keyboard navigation.
     * @default false
     */
    isFocusable = false;
    /**
     * The date format string (uses date-fns format syntax).
     * @default "MM/dd/yyyy"
     * @example "dd-MM-yyyy"
     * @type {string}
     */
    format = 'MM/dd/yyyy';
    /**
     * The Extra info for the date cell
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
    componentDidRender() {
        if (!this._extraContainer)
            return;
        this._extraContainer.innerHTML = '';
        const key = this.cellData && formatDateToString(this.cellData.date, this.format);
        const node = key ? this.extras?.get(key) : null;
        if (node) {
            const clone = node.cloneNode(true);
            this._extraContainer.appendChild(clone);
        }
    }
    _onDateHover = () => {
        if (!this.cellData || this.cellData.disabled || this.isReadOnly)
            return;
        this.dateHover.emit({ date: formatDateToString(this.cellData.date, this.format) });
    };
    _onDateClick = () => {
        if (!this.cellData || this.cellData.disabled || this.isReadOnly)
            return;
        this.dateSelected.emit({ date: formatDateToString(this.cellData.date, this.format) });
    };
    _onKeyDown = (ev) => {
        if (!this.cellData || this.cellData.disabled || this.isReadOnly)
            return;
        if (ev.key === KEYBOARD_KEYS.ENTER || ev.key === KEYBOARD_KEYS.SPACE) {
            ev.preventDefault();
            this.dateSelected.emit({ date: formatDateToString(this.cellData.date, this.format) });
        }
    };
    get _ariaLabel() {
        if (!this.cellData)
            return;
        const formattedDate = formatDateToString(this.cellData.date, this.format);
        if (this.cellData.selected) {
            return `Selected date: ${formattedDate}`;
        }
        if (this.cellData.isStartDate) {
            return `Start date selected: ${formattedDate}`;
        }
        if (this.cellData.inRange) {
            return `Date in range: ${formattedDate}`;
        }
        if (this.cellData.isEndDate) {
            return `End date selected: ${formattedDate}`;
        }
        return formattedDate;
    }
    get _wrapperClasses() {
        const baseClasses = 'flex flex-col items-center justify-center';
        if (!this.cellData || !this.fullWidth)
            return baseClasses;
        const isEnabled = !this.cellData.disabled;
        const range = this.cellData && this.cellData.inRange && isEnabled ? (this.cellData.price ? priceRangeClasses : containerInRangeDateClasses) : null;
        const firstDate = this.cellData && this.cellData.isStartDate && isEnabled ? (this.cellData.price ? firstDatePriceRangeClasses : firstDateRangeClasses) : null;
        const endDate = this.cellData && this.cellData.isEndDate && isEnabled ? (this.cellData.price ? endDatePriceRangeClasses : endDateRangeClasses) : null;
        return customTwMerge(baseClasses, range, firstDate, endDate);
    }
    get _containerClasses() {
        if (!this.cellData)
            return customTwMerge(containerBaseClasses$1);
        const isEnabled = !this.cellData.disabled;
        return customTwMerge(containerBaseClasses$1, containerActiveDateClasses, this.cellData && this.cellData.inRange && isEnabled ? containerInRangeDateClasses : null, this.cellData && this.cellData.isStartDate && isEnabled ? containerStartDateClasses : null, this.cellData && this.cellData.isEndDate && isEnabled ? containerEndDateClasses : null, this.isFocusable ? 'z-10' : null);
    }
    get _dateClasses() {
        if (!this.cellData)
            return customTwMerge(dateBaseClasses);
        if (this.isReadOnly)
            return customTwMerge(dateBaseClasses, readOnlyDateClasses);
        const isEnabled = !this.cellData.disabled;
        return customTwMerge(dateBaseClasses, this.cellData && this.cellData.disabled ? disabledDateClasses : activeDateClasses, this.cellData && isEnabled && (this.cellData.selected || this.cellData.isStartDate || this.cellData.isEndDate) ? selectedDateClasses : null, this.cellData && isEnabled && this.cellData.inRange ? inRangeDateClasses : null);
    }
    get _dotClasses() {
        return bundleCjsExports.twMerge(this.cellData.selected || this.cellData.isStartDate || this.cellData.isEndDate ? 'bg-surface-default' : '');
    }
    render() {
        const key = this.cellData && formatDateToString(this.cellData.date, this.format);
        const safeKey = key && key.replace(/\//g, '-');
        const hasExtra = key && this.extras?.has(key);
        const parsedPrice = this.cellData && typeof this.cellData.price === 'number' && !isNaN(this.cellData.price) ? `$${this.cellData.price}` : null;
        const priceId = this.cellData && this.cellData.price ? `price-desc-${safeKey}` : undefined;
        return (h("div", { key: 'd486390bf6ae89f02a811129d2b18645a87c2ccb', class: this._wrapperClasses, part: "date-cell-wrapper" }, h("div", { key: '1f37dceff1611b7982014be9783c71b1ec206971', role: "gridcell", class: this._containerClasses, onClick: this._onDateClick, onKeyDown: this._onKeyDown, onMouseEnter: this._onDateHover, tabIndex: this.isFocusable ? 0 : -1, "aria-label": this.cellData && this._ariaLabel, "aria-describedby": [priceId, this.cellData && this.cellData.showDot ? `dot-desc-${safeKey}` : undefined].filter(Boolean).join(' ') || undefined, "aria-disabled": !this.cellData || this.cellData.disabled ? 'true' : null, "aria-selected": this.cellData && (this.cellData.selected || this.cellData.isStartDate || this.cellData.isEndDate) ? 'true' : null, part: "date-cell" }, this.cellData && (h("span", { key: 'f11d227cefbbf19bdac3af338e2e3bb6fd4f5c72', part: "date-label", class: this._dateClasses }, this.cellData.disabled && this.showDisabledSlash && !this.cellData.isOutsideMonth && (h("span", { key: '817f7435eea96e3e454ec3a79903e3625a4a1159', class: "absolute left-[10px] top-[10px]" }, h("wdpr-icon-library", { key: '184d4997bf1137912ba0564b326ea6c99d973bb3', size: "medium", icon: "calendar-icon" }))), this.cellData.date.getDate(), this.cellData.showDot && (h(Fragment, { key: '388c64090733ff0dfb4a41ac305081eff81b0575' }, h("div", { key: 'd513877612d7c66443e097742e83e4c0310114df', class: "absolute bottom-075", part: "date-cell-dot" }, h("wdpr-calendar-dot", { key: '3066750a388da7ecbe0ddede39a8d9556ed5a206', dotStyle: this._dotClasses })), h("span", { key: '27214cf2781a0b4bb4d9ca7969fe3fc55b4f0d40', id: `dot-desc-${safeKey}`, class: "sr-only" }, "This day is marked with an indicator dot.")))))), this.cellData && this.cellData.price && (h("span", { key: 'ebda06f2fd544c76bd2e0db811800f9bff6366ae', id: priceId, class: "label-xsmall text-text-label py-050", part: "date-cell-price" }, h("span", { key: '199ee42832e0f27273b5a3737df0b8eeda56b927', class: "sr-only" }, "Price: "), parsedPrice)), h("div", { key: 'fd8f7864d207ad7c562b02447203867c10c7988e', class: customTwMerge(hasExtra ? 'my-050' : ''), ref: el => (this._extraContainer = el), part: "date-cell-extra-info" })));
    }
};
const containerBaseClasses$1 = 'flex w-full max-w-[42px] max-h-[42px] aspect-square label-large group focus:outline-none';
const containerActiveDateClasses = 'cursor-pointer';
const containerInRangeDateClasses = 'bg-surface-neutral-light';
const containerStartDateClasses = 'rounded-l-pill bg-surface-neutral-light';
const containerEndDateClasses = 'rounded-r-pill bg-surface-neutral-light';
const priceRangeClasses = '[background:linear-gradient(to_bottom,var(--color-surface-neutral-light)_42px,transparent_42px)]';
const firstDatePriceRangeClasses = '[background:linear-gradient(to_top,white_18px,transparent_18px),linear-gradient(to_left,var(--color-surface-neutral-light)_50%,transparent_50%)]';
const firstDateRangeClasses = '[background:linear-gradient(to_left,var(--color-surface-neutral-light)_50%,transparent_50%)]';
const endDatePriceRangeClasses = '[background:linear-gradient(to_top,white_18px,transparent_18px),linear-gradient(to_right,var(--color-surface-neutral-light)_50%,transparent_50%)]';
const endDateRangeClasses = '[background:linear-gradient(to_right,var(--color-surface-neutral-light)_50%,transparent_50%)]';
const dateBaseClasses = 'relative flex justify-center items-center w-full h-full rounded-pill group-focus-visible:text-actionable-default-alt group-focus-visible:outline-050 group-focus-visible:outline-stroke-actionable-focused group-focus-visible:outline-solid group-focus-visible:outline-offset-2';
const readOnlyDateClasses = 'cursor-default text-text-neutral-extra-dark';
const disabledDateClasses = 'relative cursor-not-allowed text-text-disabled';
const activeDateClasses = 'text-text-body group-hover:bg-surface-neutral-light';
const inRangeDateClasses = 'group-hover:bg-surface-actionable-alt-hover group-hover:text-white';
const selectedDateClasses = 'bg-surface-actionable-alt-selected text-white group-hover:bg-surface-actionable-alt-hover';

const WdprMonth = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.dateSelected = createEvent(this, "dateSelected", 7);
        this.dateHover = createEvent(this, "dateHover", 7);
        this.focusMoveOut = createEvent(this, "focusMoveOut", 7);
    }
    get el() { return getElement(this); }
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
                    selected: dateFnsExports.isSameDay(currentDate, this.selectedDate),
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
                    isEndDate = dateFnsExports.isSameDay(currentDate, this.endDate);
                }
                if (this.startDate && !this.endDate && this.hoverDate) {
                    const min = isAfterDay(this.hoverDate, this.startDate) ? this.startDate : this.hoverDate;
                    const max = isBeforeDay(this.hoverDate, this.startDate) ? this.startDate : this.hoverDate;
                    isInRange = (isAfterDay(currentDate, min) || dateFnsExports.isSameDay(currentDate, min)) && (isBeforeDay(currentDate, max) || dateFnsExports.isSameDay(currentDate, min));
                    isEndDate = dateFnsExports.isSameDay(currentDate, this.hoverDate);
                }
                cellDates.push({
                    date: currentDate,
                    selected: false,
                    isStartDate: dateFnsExports.isSameDay(currentDate, this.startDate),
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
                newFocusDate = dateFnsExports.addDays(this.focusDate, 1);
                break;
            case KEYBOARD_KEYS.ARROW_LEFT:
                newFocusDate = dateFnsExports.subDays(this.focusDate, 1);
                break;
            case KEYBOARD_KEYS.ARROW_DOWN:
                newFocusDate = dateFnsExports.addWeeks(this.focusDate, 1);
                break;
            case KEYBOARD_KEYS.ARROW_UP:
                newFocusDate = dateFnsExports.subWeeks(this.focusDate, 1);
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
        const index = this._cellDates.findIndex(cell => cell && dateFnsExports.isSameDay(cell.date, this.focusDate));
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
        return !!this.focusDate && dateFnsExports.isSameDay(cellData.date, this.focusDate) && !(isBeforeDay(cellData.date, this.minDate) || isAfterDay(cellData.date, this.maxDate) || blocked);
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
    static get watchers() { return {
        "displayDate": ["handleDateChange"],
        "startDate": ["handleDateChange"],
        "endDate": ["handleDateChange"],
        "hoverDate": ["handleDateChange"],
        "selectedDate": ["handleDateChange"],
        "maxRangeDate": ["handleDateChange"],
        "minDate": ["handleDateChange"],
        "maxDate": ["handleDateChange"],
        "isDateBlocked": ["handleBlockedPredicateChange"],
        "focusDate": ["handleFocusDateChange"]
    }; }
};

const WdprMonthHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.previousMonthClick = createEvent(this, "previousMonth", 7);
        this.nextMonthClick = createEvent(this, "nextMonth", 7);
    }
    get el() { return getElement(this); }
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
};

const WdprSingleCalendar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.previousMonth = createEvent(this, "previousMonth", 7);
        this.nextMonth = createEvent(this, "nextMonth", 7);
        this.dateSelected = createEvent(this, "dateSelected", 7);
        this.dateHover = createEvent(this, "dateHover", 7);
        this.focusMoveOut = createEvent(this, "focusMoveOut", 7);
    }
    get el() { return getElement(this); }
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
};
const wrapperBaseClasses = 'flex flex-col gap-100';
const wrapperSizeClasses = {
    xsmall: 'w-[272px]',
    small: 'w-[288px]',
    medium: 'w-[288px] md:w-[324px]',
};
const containerBaseClasses = 'flex flex-col gap-100 rounded-150 px-150 pt-150 pb-200 bg-surface-default';
const containerBorderClasses = 'border-solid border-012 border-stroke-neutral-medium';
WdprSingleCalendar.style = ":host(.full-width) { width: 100%; }";

const WdprWeekHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    fullWidth = false;
    getLocalizedWeekdays() {
        const formatter = new Intl.DateTimeFormat(navigator.language || 'default', { weekday: 'long' });
        const weekdays = [];
        const referenceDate = new Date(2025, 8, 14); // Reference date set to Sunday
        for (let day = 0; day < 7; day++) {
            const date = new Date(referenceDate);
            date.setDate(referenceDate.getDate() + day);
            weekdays.push(formatter.format(date));
        }
        return weekdays;
    }
    get _wrapperClasses() {
        const width = this.fullWidth ? 'w-full' : 'max-w-xs';
        return bundleCjsExports.twMerge('flex flex-row label-medium !text-text-disclaimer', width);
    }
    render() {
        const localizedWeekdays = this.getLocalizedWeekdays();
        return (h("div", { key: 'e284d4dd2df1b63b54e98498e4f14bdadc7c2b3d', class: this._wrapperClasses, part: "week-header-wrapper", role: "row" }, localizedWeekdays.map(day => (h("span", { class: "flex-1 py-050 text-center", part: "week-header-label", role: "columnheader" }, h("span", { class: "sr-only" }, day), h("span", { "aria-hidden": "true" }, day[0]))))));
    }
};

export { WdprDate as wdpr_date, WdprMonth as wdpr_month, WdprMonthHeader as wdpr_month_header, WdprSingleCalendar as wdpr_single_calendar, WdprWeekHeader as wdpr_week_header };
//# sourceMappingURL=wdpr-date.wdpr-month.wdpr-month-header.wdpr-single-calendar.wdpr-week-header.entry.js.map

//# sourceMappingURL=wdpr-date_5.entry.js.map