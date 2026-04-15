import { h } from "@stencil/core";
import { twMerge } from "tailwind-merge";
export class WdprWeekHeader {
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
        return twMerge('flex flex-row label-medium !text-text-disclaimer', width);
    }
    render() {
        const localizedWeekdays = this.getLocalizedWeekdays();
        return (h("div", { key: 'e284d4dd2df1b63b54e98498e4f14bdadc7c2b3d', class: this._wrapperClasses, part: "week-header-wrapper", role: "row" }, localizedWeekdays.map(day => (h("span", { class: "flex-1 py-050 text-center", part: "week-header-label", role: "columnheader" }, h("span", { class: "sr-only" }, day), h("span", { "aria-hidden": "true" }, day[0]))))));
    }
    static get is() { return "wdpr-week-header"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "fullWidth": {
                "type": "boolean",
                "attribute": "full-width",
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
}
//# sourceMappingURL=wdpr-week-header.js.map
