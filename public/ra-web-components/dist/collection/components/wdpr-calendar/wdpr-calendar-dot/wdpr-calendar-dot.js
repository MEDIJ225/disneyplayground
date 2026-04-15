import { h } from "@stencil/core";
import { twMerge } from "../../../utils/utils";
export class WdprCalendarDot {
    dotStyle = '';
    get _dotClasses() {
        const base = 'h-[5px] w-[5px] rounded-pill bg-surface-actionable-alt-selected';
        return twMerge(base, this.dotStyle);
    }
    render() {
        return h("div", { key: '8b0fc3a7979c5634b6e36d59eb9cf29a376aae36', class: this._dotClasses, part: "calendar-dot", "aria-hidden": "true" });
    }
    static get is() { return "wdpr-calendar-dot"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "dotStyle": {
                "type": "string",
                "attribute": "dot-style",
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
                "reflect": false,
                "defaultValue": "''"
            }
        };
    }
}
//# sourceMappingURL=wdpr-calendar-dot.js.map
