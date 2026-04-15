import { h } from "@stencil/core";
export class WdprProgressBarContinuous {
    el;
    /**
     * When false, renders an indeterminate progress bar.
     * Indeterminate MUST NOT set aria-valuenow/min/max.
     */
    determinate = true;
    progress = 0;
    max = 100;
    a11yLabel;
    a11yLabelledBy;
    get _safeMax() {
        return Number.isFinite(this.max) && this.max > 0 ? this.max : 100;
    }
    get _safeNow() {
        const now = Number.isFinite(this.progress) ? this.progress : 0;
        return Math.min(Math.max(now, 0), this._safeMax);
    }
    get _ariaNameAttrs() {
        const labelledBy = this.a11yLabelledBy?.trim();
        if (labelledBy)
            return { 'aria-labelledby': labelledBy };
        const label = this.a11yLabel?.trim();
        if (label)
            return { 'aria-label': label };
        // Fallback to avoid an unnamed progressbar.
        return { 'aria-label': 'Progress' };
    }
    get _ariaValueAttrs() {
        if (!this.determinate)
            return {};
        return {
            'aria-valuenow': String(this._safeNow),
            'aria-valuemin': '0',
            'aria-valuemax': String(this._safeMax),
        };
    }
    render() {
        return (h("div", { key: '1ebce0a80ee86fafb1db8a92fe0e7e4771f67fad', class: "flex flex-col gap-050 w-full", role: "progressbar", ...this._ariaNameAttrs, ...this._ariaValueAttrs, part: "root" }, h("div", { key: 'e6999f142261df14516df86505f7ad3c2700101e', class: "w-full bg-surface-neutral-light rounded-pill h-075 overflow-hidden", part: "track" }, h("wdpr-progress-indicator", { key: 'ffa7f77808dc9a6e7e19a3ed6378752120016053', progress: this._safeNow, max: this._safeMax, active: true }))));
    }
    static get is() { return "wdpr-progress-bar-continuous"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "determinate": {
                "type": "boolean",
                "attribute": "determinate",
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
                    "text": "When false, renders an indeterminate progress bar.\nIndeterminate MUST NOT set aria-valuenow/min/max."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "true"
            },
            "progress": {
                "type": "number",
                "attribute": "progress",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "reflect": true,
                "defaultValue": "0"
            },
            "max": {
                "type": "number",
                "attribute": "max",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "reflect": true,
                "defaultValue": "100"
            },
            "a11yLabel": {
                "type": "string",
                "attribute": "a11y-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
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
                "reflect": false
            },
            "a11yLabelledBy": {
                "type": "string",
                "attribute": "aria-labelledby",
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
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-progress-bar-continuous.js.map
