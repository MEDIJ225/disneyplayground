import { EventEmitter } from '../../../stencil-public-runtime';
export type MonthHeaderVariant = 'default' | 'with-arrows';
export declare class WdprMonthHeader {
    /**
     * Reference to host element.
     * @type {HTMLWdprMonthHeaderElement}
     */
    el: HTMLWdprMonthHeaderElement;
    private _isPrevMonthDisabled;
    private _isNextMonthDisabled;
    private _month;
    private _year;
    /**
     * The variant of the month header.
     * - `default`: shows title
     * - `with-arrows`: shows navigation and title
     *
     * @default "default"
     * @type {"default" | "with-arrows"}
     */
    variant: MonthHeaderVariant;
    /**
     * The date that will be used to display the month in the calendar.
     * Default is the current date.
     * @type {Date}
     */
    displayDate: Date;
    /**
     * The minimum date formatted.
     * @type {Date | null}
     */
    minDate: Date | null;
    /**
     * The maximum date formatted.
     * @type {Date | null}
     */
    maxDate: Date | null;
    /**
     * Fired when the previous month button is clicked.
     * @event
     * @type {void}
     */
    previousMonthClick: EventEmitter<void>;
    /**
     * Fired when the next month button is clicked.
     * @event
     * @type {void}
     */
    nextMonthClick: EventEmitter<void>;
    validateButtons(): void;
    setTitle(): void;
    componentWillLoad(): void;
    private onPreviousMonth;
    private onNextMonth;
    render(): any;
}
