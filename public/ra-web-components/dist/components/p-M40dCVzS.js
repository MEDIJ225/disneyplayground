import { p as proxyCustomElement, H, c as createEvent, h, F as Fragment } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { f as formatDateToString } from './p-Ce-taq9l.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { d as defineCustomElement$2 } from './p-CXLG1rnK.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';
import { b as bundleCjsExports } from './p-CF3xLdU_.js';

const WdprDate = /*@__PURE__*/ proxyCustomElement(class WdprDate extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.dateSelected = createEvent(this, "dateSelected", 7);
        this.dateHover = createEvent(this, "dateHover", 7);
    }
    /**
     * @internal Reference to extra cell info container.
     */
    _extraContainer;
    get el() { return this; }
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
            return customTwMerge(containerBaseClasses);
        const isEnabled = !this.cellData.disabled;
        return customTwMerge(containerBaseClasses, containerActiveDateClasses, this.cellData && this.cellData.inRange && isEnabled ? containerInRangeDateClasses : null, this.cellData && this.cellData.isStartDate && isEnabled ? containerStartDateClasses : null, this.cellData && this.cellData.isEndDate && isEnabled ? containerEndDateClasses : null, this.isFocusable ? 'z-10' : null);
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
}, [257, "wdpr-date", {
        "cellData": [16, "cell-data"],
        "isFocusable": [516, "is-focusable"],
        "format": [513],
        "extras": [16],
        "showDisabledSlash": [516, "show-disabled-slash"],
        "isReadOnly": [4, "is-read-only"],
        "fullWidth": [4, "full-width"]
    }]);
const containerBaseClasses = 'flex w-full max-w-[42px] max-h-[42px] aspect-square label-large group focus:outline-none';
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
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-date", "wdpr-calendar-dot", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-date":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprDate);
            }
            break;
        case "wdpr-calendar-dot":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprDate as W, defineCustomElement as d };
//# sourceMappingURL=p-M40dCVzS.js.map

//# sourceMappingURL=p-M40dCVzS.js.map