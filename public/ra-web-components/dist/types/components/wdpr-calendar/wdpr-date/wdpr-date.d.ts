import { EventEmitter } from '../../../stencil-public-runtime';
import { CellData } from './wdpr-date.model';
export declare class WdprDate {
    /**
     * @internal Reference to extra cell info container.
     */
    private _extraContainer?;
    /**
     * Reference to host element.
     * @type {HTMLWdprDateElement}
     */
    el: HTMLWdprDateElement;
    /**
     * Data for this calendar cell.
     * Contains the date and state flags for rendering.
     * @type {CellData | null}
     */
    cellData: CellData;
    /**
     * Whether this cell should receive keyboard focus.
     * Used for roving tabindex and keyboard navigation.
     * @default false
     */
    isFocusable: boolean;
    /**
     * The date format string (uses date-fns format syntax).
     * @default "MM/dd/yyyy"
     * @example "dd-MM-yyyy"
     * @type {string}
     */
    format: string;
    /**
     * The Extra info for the date cell
     * @type { Map<string, HTMLElement>}
     */
    extras: Map<string, HTMLElement>;
    /**
     * Whether this disabled cells should set a slash in the disabled dates or not.
     * @default false
     */
    showDisabledSlash: boolean;
    isReadOnly: boolean;
    fullWidth?: boolean;
    /**
     * Fired when a date is selected.
     * Emits an object with the selected date.
     *
     * @event
     * @type {{ date: string }} Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    dateSelected: EventEmitter<{
        date: string;
    }>;
    /**
     * Fired when a date is hovered.
     * @event
     * @type {{ date: string }}  Object with ISO date string (e.g. { date: "06/19/2025" })
     */
    dateHover: EventEmitter<{
        date: string;
    }>;
    componentDidRender(): void;
    private _onDateHover;
    private _onDateClick;
    private _onKeyDown;
    private get _ariaLabel();
    private get _wrapperClasses();
    private get _containerClasses();
    private get _dateClasses();
    get _dotClasses(): string;
    render(): any;
}
