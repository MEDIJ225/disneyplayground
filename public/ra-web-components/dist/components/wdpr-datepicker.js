import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { b as bundleCjsExports } from './p-CF3xLdU_.js';
import { f as formatDateToString, p as parseDateFromString, i as isValidDateString, a as isBeforeDay, b as isAfterDay } from './p-Ce-taq9l.js';
import { g as generateRandId } from './p-CXZGMLMW.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { w as wrapperTextFieldClasses } from './p-IIS_2Ppz.js';
import { d as defineCustomElement$8 } from './p-CROs5-tu.js';
import { d as defineCustomElement$7 } from './p-CqBIcCq6.js';
import { d as defineCustomElement$6 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$5 } from './p-_QubyXiP.js';
import { d as defineCustomElement$4 } from './p-BOubPl_u.js';
import { d as defineCustomElement$3 } from './p-DsPXJJ-e.js';
import { d as defineCustomElement$2 } from './p-BIWD5pdw.js';

const WdprDatepicker$1 = /*@__PURE__*/ proxyCustomElement(class WdprDatepicker extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.dateSelected = createEvent(this, "dateSelected", 7);
        this.dateInvalid = createEvent(this, "dateInvalid", 7);
        this.internals = this.attachInternals();
    }
    /**
     * @internal Reference to wdpr-text-field component.
     */
    _textFieldElement;
    /**
     * @internal Reference to wdpr-calendar component.
     */
    _calendarElement;
    _defaultValue;
    get el() { return this; }
    internals;
    /**
     * @internal
     * The flag that expand or not the calendar.
     * @type {boolean}
     */
    _expanded = false;
    /**
     * @internal
     * The internal ID for the dialog. It is used internally and is not exposed.
     */
    _internalDialogId;
    /**
     * The label for wdpr-text-field.
     * @type {string}
     */
    label = 'Label';
    /**
     * The disabled state.
     * @type {string}
     */
    disabled = false;
    required = false;
    name;
    /**
     * The value of the datetime as a valid ISO 8601. Expected format 'MM/dd/yyyy'
     * @type {string}
     */
    value;
    /**
     * Flag that enables or not an extra week.
     * @type {boolean}
     */
    enableSixWeeks = false;
    /**
     * The ISO 8601 format
     * @type {string}
     */
    format = 'MM/dd/yyyy';
    /**
     * Error state of the text field
     * @type {boolean}
     */
    error = false;
    /**
     * Helper text for the wdpr-text-field. Could be for error or just info.
     * @type {string}
     */
    helperText;
    /**
     * Min date for the calendar to show.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/10/2025"
     * @type {string}
     */
    min = formatDateToString(new Date(1, 1, 1), this.format);
    /**
     * Max date the calendar to show.
     * Must follow the format specified in the `format` prop.
     *
     * @example "06/20/2025"
     * @type {string}
     */
    max;
    /**
     * The calendar display variant.
     * - `single`: one month view
     * - `double`: two months side by side
     * - `swipe`: swipe between months
     * - `fourMonth`: four months side by side
     * @default "single"
     * @type {"single" | "double" | "swipe" | "fourMonth"}
     */
    variant = 'single';
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
     * Fired when a single valid date is selected.
     * @event dateSelected
     * @type {CustomEvent<string>}
     * @property {string} detail - Selected date as an ISO string (e.g. "2025-06-19").
     */
    dateSelected;
    /**
     * Fired when a date input is invalid (wrong format or out of range).
     * @event dateInvalid
     * @type {CustomEvent<{ date: string; type: 'out-of-range' | 'invalid-format' }>}
     * @property {string} date - The invalid date as an ISO string (e.g. "2025-06-19").
     * @property {'out-of-range' | 'invalid-format'} type - Type of invalidity.
     */
    dateInvalid;
    componentWillLoad() {
        this._internalDialogId = this.dialogId || `wdpr-datepicker-calendar-${generateRandId()}`;
        this._defaultValue = this.value;
        this._updateFormValue();
    }
    connectedCallback() {
        this.internals?.form?.addEventListener('reset', this._handleFormReset);
    }
    disconnectedCallback() {
        this.internals?.form?.removeEventListener('reset', this._handleFormReset);
    }
    componentDidLoad() {
        const extras = this._getDateExtras();
        this._calendarElement.setExtras(extras);
    }
    formWatch() {
        this._updateFormValue();
    }
    handleClickOutside(event) {
        if (this._expanded && this.el && !event.composedPath().includes(this.el)) {
            this._expanded = false;
        }
    }
    _toggleExpandCalendar = async () => {
        if (!this.disabled) {
            this._expanded = !this._expanded;
            if (this._expanded) {
                await this._textFieldElement.setFocus();
            }
        }
    };
    _handleSelectedDate = async (event) => {
        const { detail: selectedDate } = event;
        event.stopPropagation();
        this.value = selectedDate;
        this._updateFormValue();
        this.dateSelected.emit(this.value);
        this._expanded = false;
        await this._textFieldElement.setFocus();
    };
    _handleValueChanged = (event) => {
        const { detail: date } = event;
        const validation = this._getValidationResult(date);
        if (validation) {
            this.dateInvalid.emit({ date, type: validation.type });
            this._updateFormValue();
            return;
        }
        this.value = date;
        this._updateFormValue();
        this.dateSelected.emit(this.value);
    };
    _handleInputClick = () => {
        if (this.readonly)
            return;
        this._expanded = true;
    };
    _handleInputKeyDown = async (ev) => {
        if (ev.key === KEYBOARD_KEYS.ARROW_DOWN) {
            ev.preventDefault();
            this._expanded = true;
            await this._waitForNextRender();
            if (this._calendarElement) {
                const focusDate = this.value || this.min || this._getTodayString();
                this._calendarElement.setFocusDate(parseDateFromString(focusDate, this.format));
            }
        }
        if (ev.key === KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            this._expanded = false;
            await this._textFieldElement.setFocus();
        }
    };
    _handleCalendarKeyDown = async (ev) => {
        if (ev.key === KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            this._expanded = false;
            await this._textFieldElement.setFocus();
        }
    };
    _waitForNextRender() {
        return new Promise(resolve => requestAnimationFrame(() => resolve()));
    }
    _getTodayString() {
        const today = new Date();
        return formatDateToString(today, this.format);
    }
    _getValidationResult(date) {
        if (!date)
            return null;
        if (!isValidDateString(date, this.format)) {
            return { type: 'invalid-format', message: 'Invalid date format' };
        }
        const formattedDate = parseDateFromString(date, this.format);
        const minDate = this.min && parseDateFromString(this.min, this.format);
        const maxDate = this.max && parseDateFromString(this.max, this.format);
        if ((minDate && isBeforeDay(formattedDate, minDate)) || (maxDate && isAfterDay(formattedDate, maxDate))) {
            return { type: 'out-of-range', message: 'Date is out of range' };
        }
        return null;
    }
    _updateFormValue() {
        const validation = this._getValidationResult(this.value);
        const hasValue = !!this.value;
        const shouldSubmit = !this.disabled && !!this.name && hasValue && !validation;
        this.internals?.setFormValue?.(shouldSubmit ? this.value : null);
        this._updateValidity();
    }
    _updateValidity() {
        if (this.disabled || !this.required) {
            this.internals?.setValidity?.({});
            return;
        }
        if (!this.value) {
            this.internals?.setValidity?.({ valueMissing: true }, 'This field is required');
            return;
        }
        const validation = this._getValidationResult(this.value);
        if (validation) {
            this.internals?.setValidity?.({ badInput: true }, validation.message);
            return;
        }
        this.internals?.setValidity?.({});
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
    _handleFormReset = () => {
        this.value = this._defaultValue;
        this._expanded = false;
        this._updateFormValue();
    };
    get _calendarWrapperClasses() {
        const baseClasses = 'absolute mt-100 left-1/2 -translate-x-1/2 translate-y-0 w-fit bg-surface-default rounded-150 z-50';
        const shadowClass = this.showBoxShadow ? 'p-200 border-solid border-012 border-stroke-neutral-light elevation-medium-soft' : '';
        const expandedClasses = this._expanded && !this.disabled ? 'block' : 'hidden';
        return bundleCjsExports.twMerge(baseClasses, shadowClass, expandedClasses);
    }
    get _textFieldWrapperClasses() {
        if (this.inputMaxWidth)
            return 'w-full';
        return bundleCjsExports.twMerge('m-auto md:w-[358px]', wrapperTextFieldClasses[this.calendarSize]);
    }
    render() {
        return (h("div", { key: 'f3a6cc6b620a6c23f3c874cdfbd5d101da44469c', class: "relative" }, h("div", { key: 'a40659f19746c51f3ffe2d93961f0aed9bbb1651', class: this._textFieldWrapperClasses }, h("wdpr-text-field", { key: '473df749c6f5cb779e16abe10983f20ef24ca481', ref: el => (this._textFieldElement = el), label: this.label, disabled: this.disabled, value: this.value, error: this.error, helperText: this.helperText, readonly: this.readonly, a11yRole: "combobox", a11yHasPopup: "dialog", a11yControls: this._internalDialogId, a11yExpanded: this._expanded ? 'true' : 'false', onWdprInputClick: this._handleInputClick, onWdprValueChanged: this._handleValueChanged, onKeyDown: this._handleInputKeyDown }, !this.readonly && (h("wdpr-icon-button", { key: 'b397372ce329012a5104678dd642d33d745e2b36', size: "medium", iconName: "calendar-month", slot: "trailing-icon-button", a11yLabel: "Choose Date", disabled: this.disabled, onClicked: this._toggleExpandCalendar, customTabIndex: -1 })))), h("div", { key: 'd5775d952819349a5350670f5f7a1bceb4bc5b96', id: this._internalDialogId, class: this._calendarWrapperClasses, part: "calendar-wrapper", role: "dialog", "aria-label": "Choose Date" }, h("wdpr-calendar", { key: '2239d245b90ea5a8f06694f3a76199d03241398b', ref: el => (this._calendarElement = el), mode: "single", value: this.value, enableSixWeeks: this.enableSixWeeks, format: this.format, min: this.min, max: this.max, variant: this.variant, displayBorder: this.displayCalendarBorder, onDateSelected: this._handleSelectedDate, onKeyDown: this._handleCalendarKeyDown, exportparts: "calendar, calendar-surface", size: this.calendarSize }))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["formWatch"],
        "name": ["formWatch"],
        "required": ["formWatch"],
        "disabled": ["formWatch"],
        "format": ["formWatch"],
        "min": ["formWatch"],
        "max": ["formWatch"]
    }; }
}, [321, "wdpr-datepicker", {
        "label": [1],
        "disabled": [4],
        "required": [4],
        "name": [1],
        "value": [1537],
        "enableSixWeeks": [4, "enable-six-weeks"],
        "format": [1],
        "error": [4],
        "helperText": [1, "helper-text"],
        "min": [1537],
        "max": [1537],
        "variant": [1],
        "dialogId": [1, "dialog-id"],
        "displayCalendarBorder": [4, "display-calendar-border"],
        "showBoxShadow": [4, "show-box-shadow"],
        "readonly": [4],
        "calendarSize": [1, "calendar-size"],
        "inputMaxWidth": [4, "input-max-width"],
        "_expanded": [32],
        "_internalDialogId": [32]
    }, [[4, "click", "handleClickOutside"]], {
        "value": ["formWatch"],
        "name": ["formWatch"],
        "required": ["formWatch"],
        "disabled": ["formWatch"],
        "format": ["formWatch"],
        "min": ["formWatch"],
        "max": ["formWatch"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-datepicker", "wdpr-calendar", "wdpr-icon-button", "wdpr-icon-library", "wdpr-inline-message", "wdpr-notification-indicator", "wdpr-status-icon", "wdpr-text-field"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-datepicker":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprDatepicker$1);
            }
            break;
        case "wdpr-calendar":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "wdpr-icon-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "wdpr-inline-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-status-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-text-field":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprDatepicker = WdprDatepicker$1;
const defineCustomElement = defineCustomElement$1;

export { WdprDatepicker, defineCustomElement };
//# sourceMappingURL=wdpr-datepicker.js.map

//# sourceMappingURL=wdpr-datepicker.js.map