import { h } from "@stencil/core";
import { twMerge } from "tailwind-merge";
import { formatDateToString, isAfterDay, isBeforeDay, isValidDateString, parseDateFromString } from "../../utils/date.utils";
import { generateRandId } from "../../utils/utils";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
import { wrapperTextFieldClasses } from "./wdpr-datepicker.model";
export class WdprDatepicker {
    /**
     * @internal Reference to wdpr-text-field component.
     */
    _textFieldElement;
    /**
     * @internal Reference to wdpr-calendar component.
     */
    _calendarElement;
    _defaultValue;
    /**
     * Reference to host element
     * @type {HTMLWdprDatepickerElement}
     */
    el;
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
        return twMerge(baseClasses, shadowClass, expandedClasses);
    }
    get _textFieldWrapperClasses() {
        if (this.inputMaxWidth)
            return 'w-full';
        return twMerge('m-auto md:w-[358px]', wrapperTextFieldClasses[this.calendarSize]);
    }
    render() {
        return (h("div", { key: 'f3a6cc6b620a6c23f3c874cdfbd5d101da44469c', class: "relative" }, h("div", { key: 'a40659f19746c51f3ffe2d93961f0aed9bbb1651', class: this._textFieldWrapperClasses }, h("wdpr-text-field", { key: '473df749c6f5cb779e16abe10983f20ef24ca481', ref: el => (this._textFieldElement = el), label: this.label, disabled: this.disabled, value: this.value, error: this.error, helperText: this.helperText, readonly: this.readonly, a11yRole: "combobox", a11yHasPopup: "dialog", a11yControls: this._internalDialogId, a11yExpanded: this._expanded ? 'true' : 'false', onWdprInputClick: this._handleInputClick, onWdprValueChanged: this._handleValueChanged, onKeyDown: this._handleInputKeyDown }, !this.readonly && (h("wdpr-icon-button", { key: 'b397372ce329012a5104678dd642d33d745e2b36', size: "medium", iconName: "calendar-month", slot: "trailing-icon-button", a11yLabel: "Choose Date", disabled: this.disabled, onClicked: this._toggleExpandCalendar, customTabIndex: -1 })))), h("div", { key: 'd5775d952819349a5350670f5f7a1bceb4bc5b96', id: this._internalDialogId, class: this._calendarWrapperClasses, part: "calendar-wrapper", role: "dialog", "aria-label": "Choose Date" }, h("wdpr-calendar", { key: '2239d245b90ea5a8f06694f3a76199d03241398b', ref: el => (this._calendarElement = el), mode: "single", value: this.value, enableSixWeeks: this.enableSixWeeks, format: this.format, min: this.min, max: this.max, variant: this.variant, displayBorder: this.displayCalendarBorder, onDateSelected: this._handleSelectedDate, onKeyDown: this._handleCalendarKeyDown, exportparts: "calendar, calendar-surface", size: this.calendarSize }))));
    }
    static get is() { return "wdpr-datepicker"; }
    static get encapsulation() { return "shadow"; }
    static get formAssociated() { return true; }
    static get properties() {
        return {
            "label": {
                "type": "string",
                "attribute": "label",
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
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The label for wdpr-text-field."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Label'"
            },
            "disabled": {
                "type": "boolean",
                "attribute": "disabled",
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
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The disabled state."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "required": {
                "type": "boolean",
                "attribute": "required",
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
            "name": {
                "type": "string",
                "attribute": "name",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
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
                "reflect": false
            },
            "value": {
                "type": "string",
                "attribute": "value",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The value of the datetime as a valid ISO 8601. Expected format 'MM/dd/yyyy'"
                },
                "getter": false,
                "setter": false,
                "reflect": true
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
                            "name": "type",
                            "text": "{boolean}"
                        }],
                    "text": "Flag that enables or not an extra week."
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
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The ISO 8601 format"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'MM/dd/yyyy'"
            },
            "error": {
                "type": "boolean",
                "attribute": "error",
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
                            "name": "type",
                            "text": "{boolean}"
                        }],
                    "text": "Error state of the text field"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "helperText": {
                "type": "string",
                "attribute": "helper-text",
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
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "Helper text for the wdpr-text-field. Could be for error or just info."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "min": {
                "type": "string",
                "attribute": "min",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "example",
                            "text": "\"06/10/2025\""
                        }, {
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "Min date for the calendar to show.\nMust follow the format specified in the `format` prop."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "formatDateToString(new Date(1, 1, 1), this.format)"
            },
            "max": {
                "type": "string",
                "attribute": "max",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "example",
                            "text": "\"06/20/2025\""
                        }, {
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "Max date the calendar to show.\nMust follow the format specified in the `format` prop."
                },
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "CalendarVariant",
                    "resolved": "\"double\" | \"fourMonth\" | \"single\" | \"swipe\"",
                    "references": {
                        "CalendarVariant": {
                            "location": "import",
                            "path": "../wdpr-calendar/wdpr-calendar.model",
                            "id": "src/components/wdpr-calendar/wdpr-calendar.model.ts::CalendarVariant"
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
                            "text": "{\"single\" | \"double\" | \"swipe\" | \"fourMonth\"}"
                        }],
                    "text": "The calendar display variant.\n- `single`: one month view\n- `double`: two months side by side\n- `swipe`: swipe between months\n- `fourMonth`: four months side by side"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'single'"
            },
            "dialogId": {
                "type": "string",
                "attribute": "dialog-id",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "(Optional) A unique ID for the component. It is essential for accessibility,\nIf not provided, a random ID will be generated."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "displayCalendarBorder": {
                "type": "boolean",
                "attribute": "display-calendar-border",
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
            "showBoxShadow": {
                "type": "boolean",
                "attribute": "show-box-shadow",
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
                    "text": "Flag that shows or hide the calendar box shadow"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "readonly": {
                "type": "boolean",
                "attribute": "readonly",
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
                            "name": "type",
                            "text": "{boolean}"
                        }],
                    "text": "Readonly state of the text field"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "calendarSize": {
                "type": "string",
                "attribute": "calendar-size",
                "mutable": false,
                "complexType": {
                    "original": "CalendarSize",
                    "resolved": "\"medium\" | \"small\" | \"xsmall\"",
                    "references": {
                        "CalendarSize": {
                            "location": "import",
                            "path": "../wdpr-calendar/wdpr-calendar.model",
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
                "reflect": false,
                "defaultValue": "'medium'"
            },
            "inputMaxWidth": {
                "type": "boolean",
                "attribute": "input-max-width",
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
            }
        };
    }
    static get states() {
        return {
            "_expanded": {},
            "_internalDialogId": {}
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
                            "text": "dateSelected"
                        }, {
                            "name": "type",
                            "text": "{CustomEvent<string>}"
                        }, {
                            "name": "property",
                            "text": "{string} detail - Selected date as an ISO string (e.g. \"2025-06-19\")."
                        }],
                    "text": "Fired when a single valid date is selected."
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }, {
                "method": "dateInvalid",
                "name": "dateInvalid",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "event",
                            "text": "dateInvalid"
                        }, {
                            "name": "type",
                            "text": "{CustomEvent<{ date: string; type: 'out-of-range' | 'invalid-format' }>}"
                        }, {
                            "name": "property",
                            "text": "{string} date - The invalid date as an ISO string (e.g. \"2025-06-19\")."
                        }, {
                            "name": "property",
                            "text": "{'out-of-range' | 'invalid-format'} type - Type of invalidity."
                        }],
                    "text": "Fired when a date input is invalid (wrong format or out of range)."
                },
                "complexType": {
                    "original": "{ date: string; type: 'out-of-range' | 'invalid-format' }",
                    "resolved": "{ date: string; type: \"out-of-range\" | \"invalid-format\"; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "formWatch"
            }, {
                "propName": "name",
                "methodName": "formWatch"
            }, {
                "propName": "required",
                "methodName": "formWatch"
            }, {
                "propName": "disabled",
                "methodName": "formWatch"
            }, {
                "propName": "format",
                "methodName": "formWatch"
            }, {
                "propName": "min",
                "methodName": "formWatch"
            }, {
                "propName": "max",
                "methodName": "formWatch"
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "handleClickOutside",
                "target": "document",
                "capture": false,
                "passive": false
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=wdpr-datepicker.js.map
