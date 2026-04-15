import { h, Host } from "@stencil/core";
export class WdprProgressIndicator {
    progress = 0;
    max = 100;
    active = true;
    get _percentage() {
        if (!Number.isFinite(this.max) || this.max <= 0)
            return 0;
        if (this.progress >= this.max)
            return 100;
        if (this.progress <= 0)
            return 0;
        return (this.progress / this.max) * 100;
    }
    get _fillBgClass() {
        return this.active ? 'bg-surface-neutral-extra-dark' : this._trackBg;
    }
    get _roundingClass() {
        return 'rounded-pill';
    }
    get _trackBg() {
        return 'bg-surface-neutral-light';
    }
    render() {
        return (h(Host, { key: '1033264d23143a918a4a0bb9061a82ba30e3a07d' }, h("div", { key: '398a3c19afd517e1c84eb07e0691964995c8832d', class: "w-full", part: "root" }, h("div", { key: '94d23689ad71104d5ad8f31aaaab6b5abe9f5b74', class: `relative h-075 overflow-hidden ${this._trackBg} ${this._roundingClass}`, part: "track" }, h("div", { key: '1aff55782ecc2a3db6fb5914efdc2dda2fac5e50', class: `h-full ${this._fillBgClass} ${this._roundingClass}`, style: { width: `${this._percentage}%` }, part: "indicator", "aria-hidden": "true" }), this._percentage < 100 && (h("div", { key: 'e77d1233e31eef58016cdebd08dd95ba4f013f4a', class: "absolute top-[1px] right-[1px] w-dimension-050 h-dimension-050 shrink-0 bg-surface-neutral-extra-dark rounded-pill", part: "stop-indicator" }))))));
    }
    static get is() { return "wdpr-progress-indicator"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
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
            "active": {
                "type": "boolean",
                "attribute": "active",
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
                "reflect": true,
                "defaultValue": "true"
            }
        };
    }
}
//# sourceMappingURL=wdpr-progress-indicator.js.map
