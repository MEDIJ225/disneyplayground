import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';

const WdprMediaHero360Chip = /*@__PURE__*/ proxyCustomElement(class WdprMediaHero360Chip extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.view360Toggle = createEvent(this, "view360Toggle", 7);
    }
    isDisabled = false;
    view360Toggle;
    render() {
        return (h("button", { key: '215177f9f29263153274f8c8b3869aa6058fe64f', type: "button", class: chipClasses, disabled: this.isDisabled, onClick: () => !this.isDisabled && this.view360Toggle.emit(), "aria-label": "View in 360 degrees" }, h("wdpr-icon-library", { key: '1cdd51efb1d6307541442137d22c55ee3b2f7dd3', size: "xlarge", icon: "360-video", decorative: true })));
    }
}, [257, "wdpr-media-hero-360-chip", {
        "isDisabled": [4, "is-disabled"]
    }]);
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
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-media-hero-360-chip", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-media-hero-360-chip":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprMediaHero360Chip);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprMediaHero360Chip as W, defineCustomElement as d };
//# sourceMappingURL=p-DOwkjlnY.js.map

//# sourceMappingURL=p-DOwkjlnY.js.map