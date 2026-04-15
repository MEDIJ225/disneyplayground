import { h } from "@stencil/core";
export class WdprMultiStepLoader {
    /**
     * Reference to host element
     * @type {HTMLWdprLinearLoaderElement}
     */
    el;
    /**
     * An array of steps
     */
    steps = [];
    render() {
        return (h("div", { key: '7135c6a3bde279b4c24bb0a182fff1bf243b7dc8', class: "flex gap-075", role: "group", "aria-label": "Multi-step progress" }, this.steps.map(step => (h("wdpr-linear-loader", { class: "flex-1", progress: step.progress ?? 0, max: step.max ?? 100 })))));
    }
    static get is() { return "wdpr-multi-step-loader"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "steps": {
                "type": "unknown",
                "attribute": "steps",
                "mutable": false,
                "complexType": {
                    "original": "Step[]",
                    "resolved": "Step[]",
                    "references": {
                        "Step": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-multi-step-loader/wdpr-multi-step-loader.tsx",
                            "id": "src/components/wdpr-multi-step-loader/wdpr-multi-step-loader.tsx::Step"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "An array of steps"
                },
                "getter": false,
                "setter": false,
                "defaultValue": "[]"
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-multi-step-loader.js.map
