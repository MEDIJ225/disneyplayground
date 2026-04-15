import { h, Host } from "@stencil/core";
import { twMerge } from "../../utils/utils";
export class WdprDivider {
    el;
    slot = null;
    orientation = 'horizontal';
    align = 'left';
    variant = 'primary';
    componentWillLoad() {
        this._updateSlot();
    }
    _updateSlot = () => {
        this.slot = this.el.querySelector('[slot="label"]');
    };
    get strokeVar() {
        return this.variant === 'secondary' ? 'var(--stroke-050)' : 'var(--stroke-012)';
    }
    get separatorClass() {
        const base = 'bg-stroke-default border-0 m-0 shrink-0';
        return this.orientation === 'horizontal' ? twMerge(base, 'flex-1 w-auto') : twMerge(base, 'h-full');
    }
    get separatorStyle() {
        return this.orientation === 'horizontal' ? { height: this.strokeVar } : { width: this.strokeVar };
    }
    render() {
        const isHorizontal = this.orientation === 'horizontal';
        const hasLabel = !!this.slot;
        if (!isHorizontal) {
            return (h(Host, null, h("hr", { "aria-orientation": "vertical", class: this.separatorClass, style: this.separatorStyle })));
        }
        const labelMarginClass = this.align === 'center' ? 'mx-075' : this.align === 'right' ? 'ml-075' : 'mr-075';
        return (h(Host, null, h("div", { class: "flex items-center w-full" }, this.align !== 'left' && h("hr", { class: this.separatorClass, style: this.separatorStyle }), hasLabel && (h("span", { class: twMerge('inline-block', labelMarginClass) }, h("slot", { name: "label", onSlotchange: this._updateSlot }))), this.align !== 'right' && h("hr", { class: this.separatorClass, style: this.separatorStyle }))));
    }
    static get is() { return "wdpr-divider"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "orientation": {
                "type": "string",
                "attribute": "orientation",
                "mutable": false,
                "complexType": {
                    "original": "DividerOrientation",
                    "resolved": "\"horizontal\" | \"vertical\"",
                    "references": {
                        "DividerOrientation": {
                            "location": "import",
                            "path": "./wdpr-divider.model",
                            "id": "src/components/wdpr-divider/wdpr-divider.model.ts::DividerOrientation"
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
                "defaultValue": "'horizontal'"
            },
            "align": {
                "type": "string",
                "attribute": "align",
                "mutable": false,
                "complexType": {
                    "original": "DividerAlignment",
                    "resolved": "\"center\" | \"left\" | \"right\"",
                    "references": {
                        "DividerAlignment": {
                            "location": "import",
                            "path": "./wdpr-divider.model",
                            "id": "src/components/wdpr-divider/wdpr-divider.model.ts::DividerAlignment"
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
                "defaultValue": "'left'"
            },
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "DividerVariant",
                    "resolved": "\"primary\" | \"secondary\"",
                    "references": {
                        "DividerVariant": {
                            "location": "import",
                            "path": "./wdpr-divider.model",
                            "id": "src/components/wdpr-divider/wdpr-divider.model.ts::DividerVariant"
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
                "defaultValue": "'primary'"
            }
        };
    }
    static get states() {
        return {
            "slot": {}
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-divider.js.map
