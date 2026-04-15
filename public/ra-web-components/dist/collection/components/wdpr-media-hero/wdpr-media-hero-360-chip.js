import { h } from "@stencil/core";
export class WdprMediaHero360Chip {
    isDisabled = false;
    view360Toggle;
    render() {
        return (h("button", { key: '215177f9f29263153274f8c8b3869aa6058fe64f', type: "button", class: chipClasses, disabled: this.isDisabled, onClick: () => !this.isDisabled && this.view360Toggle.emit(), "aria-label": "View in 360 degrees" }, h("wdpr-icon-library", { key: '1cdd51efb1d6307541442137d22c55ee3b2f7dd3', size: "xlarge", icon: "360-video", decorative: true })));
    }
    static get is() { return "wdpr-media-hero-360-chip"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "isDisabled": {
                "type": "boolean",
                "attribute": "is-disabled",
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
    static get events() {
        return [{
                "method": "view360Toggle",
                "name": "view360Toggle",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
}
const chipClasses = `
  cursor-pointer rounded-full flex items-center justify-center
  w-[40px] h-[40px]
  bg-surface-actionable-alt-default-a68
  text-icon-actionable-inverse-default
  hover:bg-surface-actionable-alt-hover active:bg-surface-actionable-alt-pressed
  focus:outline-none focus-visible:outline-focus focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid focus-visible:outline-offset-2
  disabled:opacity-500 disabled:cursor-not-allowed
  transition-colors duration-150
`;
//# sourceMappingURL=wdpr-media-hero-360-chip.js.map
