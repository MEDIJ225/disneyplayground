import { h } from "@stencil/core";
export class WdprProgressBarSegmented {
    el;
    steps = [];
    label = false;
    labelText;
    _getPosition(index, total) {
        if (total <= 1)
            return 'middle';
        if (index === 0)
            return 'start';
        if (index === total - 1)
            return 'end';
        return 'middle';
    }
    _getDerivedStatus(step) {
        return step.status ?? 'pending';
    }
    get _barLabel() {
        if (this.labelText?.trim())
            return this.labelText.trim();
        const total = this.steps.length;
        const activeIndex = this.steps.findIndex(s => this._getDerivedStatus(s) === 'active');
        if (activeIndex >= 0)
            return `Step ${activeIndex + 1} of ${total}`;
        const hasPending = this.steps.some(s => this._getDerivedStatus(s) === 'pending');
        if (hasPending)
            return 'Pending';
        return 'Complete';
    }
    render() {
        const totalSteps = this.steps.length;
        const ariaLabel = this.label ? this._barLabel : 'Multi-step progress';
        return (h("div", { key: 'e1539c40e3a144696b41f894b65eafabe08b9798', class: "w-full", part: "root" }, h("div", { key: 'e3a21e8a285c8abb6beee9a8a1a6eb2fd8c7544c', class: "flex items-center w-full", role: "list", "aria-label": ariaLabel, part: "segments" }, this.steps.map((step, index) => {
            const status = this._getDerivedStatus(step);
            const isCurrent = status === 'active';
            return (h("div", { class: "flex-1", part: "segment-wrap", role: "listitem", "aria-current": isCurrent ? 'step' : null }, h("wdpr-progress-segment", { status: status, position: this._getPosition(index, totalSteps), exportparts: "segment:segment" })));
        })), this.label ? (h("div", { class: "mt-050", part: "label", "aria-hidden": "true" }, h("div", { class: "label-small text-text-body" }, this._barLabel))) : null));
    }
    static get is() { return "wdpr-progress-bar-segmented"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "steps": {
                "type": "unknown",
                "attribute": "steps",
                "mutable": false,
                "complexType": {
                    "original": "WdprProgressBarSegmentedStep[]",
                    "resolved": "WdprProgressBarSegmentedStep[]",
                    "references": {
                        "WdprProgressBarSegmentedStep": {
                            "location": "import",
                            "path": "../../models/progress-bar.model",
                            "id": "src/models/progress-bar.model.ts::WdprProgressBarSegmentedStep"
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
                "defaultValue": "[]"
            },
            "label": {
                "type": "boolean",
                "attribute": "label",
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
                "defaultValue": "false"
            },
            "labelText": {
                "type": "string",
                "attribute": "label-text",
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
//# sourceMappingURL=wdpr-progress-bar-segmented.js.map
